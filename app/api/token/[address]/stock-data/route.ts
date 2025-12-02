import { NextRequest, NextResponse } from 'next/server';
import { getTokenMetadata, getStockTicker, isTokenizedStock } from '@/lib/utils/token';

export interface StockDataResponse {
  ticker: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  volume: number;
  marketCap?: number;
  high52w?: number;
  low52w?: number;
  open: number;
  previousClose: number;
  historicalData?: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
  error?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;

    if (!address) {
      return NextResponse.json(
        { error: 'Token address is required' },
        { status: 400 }
      );
    }

    // Get token metadata
    const tokenInfo = getTokenMetadata(address);
    if (!tokenInfo) {
      return NextResponse.json(
        { error: 'Token not found' },
        { status: 404 }
      );
    }

    const { token } = tokenInfo;

    // Check if token is a tokenized stock
    if (!isTokenizedStock(token)) {
      return NextResponse.json(
        { error: 'Token is not a tokenized stock' },
        { status: 400 }
      );
    }

    // Get stock ticker
    const ticker = getStockTicker(token);
    if (!ticker) {
      return NextResponse.json(
        { error: 'Stock ticker not found for tokenized stock' },
        { status: 400 }
      );
    }

    // Fetch stock data using yahoo-finance2
    // Note: This will be imported dynamically to avoid SSR issues
    let yahooFinance: any;
    try {
      yahooFinance = await import('yahoo-finance2');
    } catch (importError) {
      console.error('Failed to import yahoo-finance2:', importError);
      return NextResponse.json(
        { error: 'Stock data service unavailable' },
        { status: 503 }
      );
    }
    
    try {
      // Fetch quote data - yahoo-finance2 uses default export
      const yf = yahooFinance.default || yahooFinance;
      const quote = await yf.quote(ticker);
      
      if (!quote) {
        return NextResponse.json(
          { error: `Stock data not found for ticker: ${ticker}` },
          { status: 404 }
        );
      }

      // Fetch historical data (last 30 days)
      const historical = await yf.historical(ticker, {
        period1: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // 30 days ago
        period2: Math.floor(Date.now() / 1000),
        interval: '1d',
      }).catch(() => null);

      const response: StockDataResponse = {
        ticker: ticker,
        currentPrice: quote.regularMarketPrice || quote.price || 0,
        priceChange: (quote.regularMarketPrice || quote.price || 0) - (quote.regularMarketPreviousClose || quote.previousClose || 0),
        priceChangePercent: quote.regularMarketChangePercent || quote.changePercent || 0,
        volume: quote.regularMarketVolume || quote.volume || 0,
        marketCap: quote.marketCap,
        high52w: quote.fiftyTwoWeekHigh,
        low52w: quote.fiftyTwoWeekLow,
        open: quote.regularMarketOpen || quote.open || 0,
        previousClose: quote.regularMarketPreviousClose || quote.previousClose || 0,
        historicalData: historical?.map((item: any) => ({
          date: new Date(item.date).toISOString(),
          open: item.open || 0,
          high: item.high || 0,
          low: item.low || 0,
          close: item.close || 0,
          volume: item.volume || 0,
        })) || undefined,
      };

      return NextResponse.json(response, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      });
    } catch (yahooError: any) {
      console.error(`Error fetching stock data for ${ticker}:`, yahooError);
      return NextResponse.json(
        { error: `Failed to fetch stock data: ${yahooError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in stock-data API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
