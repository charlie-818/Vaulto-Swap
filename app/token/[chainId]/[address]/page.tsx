"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createChart, ColorType, IChartApi, ISeriesApi, LineData, LineSeries } from 'lightweight-charts';
import { chainConfig } from '@/config/chains';
import type { TokenDetailsApiResponse } from '@/lib/types/tokenDetails';
import type { TokenHistoryPoint } from '@/lib/uniswap/tokenDetails';
import { formatCurrency, formatNumber, truncateAddress } from '@/lib/utils/formatters';
import toast from 'react-hot-toast';

type TimeFilter = '24h' | '7d' | '30d';

export default function TokenDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const chainId = params?.chainId ? parseInt(params.chainId as string, 10) : null;
  const address = params?.address as string | undefined;

  const [data, setData] = useState<TokenDetailsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7d');
  
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Line', LineData> | null>(null);

  // Fetch token details
  useEffect(() => {
    if (!chainId || !address) {
      setError('Invalid chain ID or address');
      setLoading(false);
      return;
    }

    const fetchTokenDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/uniswap/token-details?chainId=${chainId}&address=${encodeURIComponent(address)}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch token details');
        }

        const result: TokenDetailsApiResponse = await response.json();
        
        if (result.error) {
          throw new Error(result.error);
        }

        // Debug: Log the price data
        console.log('[TokenDetailsPage] Received data:', {
          symbol: result.token?.symbol,
          priceUSD: result.token?.priceUSD,
          hasPriceHistory: (result.token?.priceHistory?.length || 0) > 0,
          priceHistoryLength: result.token?.priceHistory?.length || 0,
          firstPriceFromHistory: result.token?.priceHistory?.[0]?.priceUSD,
        });

        setData(result);
      } catch (err) {
        console.error('Error fetching token details:', err);
        setError(err instanceof Error ? err.message : 'Failed to load token details');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
  }, [chainId, address]);

  // Initialize and update chart
  useEffect(() => {
    if (!chartContainerRef.current || !data || loading) return;

    // Clean up existing chart
    if (chartRef.current) {
      chartRef.current.remove();
    }

    // Filter price history based on time filter
    const now = Date.now() / 1000;
    const filterTime = {
      '24h': now - 24 * 60 * 60,
      '7d': now - 7 * 24 * 60 * 60,
      '30d': now - 30 * 24 * 60 * 60,
    }[timeFilter];

    const filteredHistory = data.token.priceHistory.filter(
      (point) => point.timestamp >= filterTime
    );

    if (filteredHistory.length === 0) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#FFFFFF',
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
      leftPriceScale: {
        visible: false,
      },
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: '#FCD34D',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
    });

    // Prepare data for chart (timestamp needs to be in seconds, not milliseconds)
    // lightweight-charts expects time as a number (Unix timestamp in seconds) or a string in format 'YYYY-MM-DD'
    const chartData = filteredHistory.map((point) => ({
      time: point.timestamp as number, // Unix timestamp in seconds
      value: point.priceUSD,
    }));

    lineSeries.setData(chartData);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = lineSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, timeFilter, loading]);

  // Copy address to clipboard
  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  // Calculate 24h price change
  const priceChange24h = data
    ? (() => {
        const now = Date.now() / 1000;
        const yesterday = now - 24 * 60 * 60;
        const priceHistory = data.token.priceHistory;
        const todayPrice = data.token.priceUSD;
        const yesterdayPrice = priceHistory.find(
          (p) => p.timestamp >= yesterday
        )?.priceUSD || todayPrice;
        
        if (!yesterdayPrice || yesterdayPrice === 0) return 0;
        return ((todayPrice - yesterdayPrice) / yesterdayPrice) * 100;
      })()
    : 0;

  // Get chain name
  const chainName = chainId && chainConfig[chainId as keyof typeof chainConfig]
    ? chainConfig[chainId as keyof typeof chainConfig].name
    : 'Unknown';

  // Navigate to swap page with token pair
  const handleTradePool = (pool: TokenDetailsApiResponse['pools'][0]) => {
    // Navigate to swap page with token prefilled
    router.push(`/?buyToken=${data?.token.symbol}&chainId=${chainId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading token details...</div>
      </div>
    );
  }

  // Check if we have a token (even if no Uniswap data)
  const hasToken = data && data.token && data.token.address && data.token.symbol;

  if (error && !hasToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">
            {error || 'Failed to load token details'}
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!hasToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">
            Token not found
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { token, pools } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            ← Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{token.symbol}</h1>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                  {chainName}
                </span>
              </div>
              <p className="text-gray-400">{token.name}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <code className="px-3 py-2 bg-gray-900 text-gray-300 rounded-lg font-mono text-sm">
                {truncateAddress(token.address)}
              </code>
              <button
                onClick={copyAddress}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                title="Copy address"
              >
                📋
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Price</div>
            <div className="text-xl font-bold text-white mb-1">
              {(() => {
                // Always prioritize priceUSD from API (which should already be calculated from history)
                // But add fallback to history as safety net
                let displayPrice = token.priceUSD;
                
                // If priceUSD is invalid, try to get from price history
                if ((!displayPrice || displayPrice === 0 || isNaN(displayPrice) || !isFinite(displayPrice)) && token.priceHistory && token.priceHistory.length > 0) {
                  const sortedHistory = [...token.priceHistory].sort((a, b) => b.timestamp - a.timestamp);
                  const recentPrice = sortedHistory.find(p => {
                    const price = p.priceUSD;
                    return price && typeof price === 'number' && price > 0 && !isNaN(price) && isFinite(price);
                  })?.priceUSD;
                  if (recentPrice) {
                    displayPrice = recentPrice;
                  }
                }
                
                // Format and display
                if (displayPrice && displayPrice > 0 && !isNaN(displayPrice) && isFinite(displayPrice)) {
                  return formatCurrency(displayPrice);
                }
                return 'N/A';
              })()}
            </div>
            {token.priceHistory && token.priceHistory.length > 0 && priceChange24h !== 0 ? (
              <div
                className={`text-sm ${
                  priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {priceChange24h >= 0 ? '+' : ''}
                {priceChange24h.toFixed(2)}% (24h)
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No price data
              </div>
            )}
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">TVL</div>
            <div className="text-xl font-bold text-white">
              {formatCurrency(token.tvlUSD)}
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">24h Volume</div>
            <div className="text-xl font-bold text-white">
              {token.volumeHistory && token.volumeHistory.length > 0
                ? formatCurrency(
                    token.volumeHistory
                      .filter((v) => v.timestamp >= Date.now() / 1000 - 24 * 60 * 60)
                      .reduce((sum, v) => sum + v.volumeUSD, 0)
                  )
                : 'N/A'}
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Pools</div>
            <div className="text-xl font-bold text-white">{pools.length}</div>
          </div>
        </div>

        {/* Price Chart */}
        {data.token.priceHistory && data.token.priceHistory.length > 0 ? (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Price Chart</h2>
              <div className="flex gap-2">
                {(['24h', '7d', '30d'] as TimeFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      timeFilter === filter
                        ? 'bg-yellow-400 text-black font-semibold'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div ref={chartContainerRef} className="w-full" style={{ height: '400px' }} />
          </div>
        ) : (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-800">
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg mb-2">Price Chart</p>
              <p className="text-sm">No price history available for this token</p>
            </div>
          </div>
        )}

        {/* Pools Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Pools</h2>
          </div>
          
          {pools.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No pools found for this token
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Pair
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Fee Tier
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                      TVL
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                      24h Volume
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pools.map((pool) => {
                    const pairSymbol = `${pool.token0.symbol}/${pool.token1.symbol}`;
                    const feePercent = pool.feeTierBps / 10000;
                    
                    return (
                      <tr
                        key={pool.poolAddress}
                        className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">{pairSymbol}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {feePercent}%
                        </td>
                        <td className="px-6 py-4 text-right text-white">
                          {formatCurrency(pool.tvlUSD)}
                        </td>
                        <td className="px-6 py-4 text-right text-white">
                          {formatCurrency(pool.volumeUSD24h)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleTradePool(pool)}
                            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

