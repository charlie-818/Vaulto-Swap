/**
 * Comprehensive test script for Jupiter market cap fetching
 * Tests HTML parsing and market cap extraction
 */

import * as cheerio from 'cheerio';

// Test token address from user's example
const TEST_TOKEN_ADDRESS = 'PreANxuXjsy2pvisWWMNB6YaJNzr7681wJJr2rHsfTh';

/**
 * Fetch market cap from Jupiter token page HTML
 */
async function fetchJupiterMarketCap(tokenAddress: string): Promise<{ value: string | null; debug: any }> {
  const debug: any = {
    url: `https://www.jup.ag/tokens/${tokenAddress}`,
    steps: [],
    errors: [],
  };

  try {
    debug.steps.push('Starting fetch...');
    const url = `https://www.jup.ag/tokens/${tokenAddress}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    debug.steps.push(`Response status: ${response.status}`);
    debug.responseStatus = response.status;
    debug.responseOk = response.ok;

    if (!response.ok) {
      debug.errors.push(`Failed to fetch: ${response.status} ${response.statusText}`);
      return { value: null, debug };
    }

    const html = await response.text();
    debug.htmlLength = html.length;
    debug.steps.push(`HTML fetched, length: ${html.length} characters`);

    // Save a snippet of HTML for inspection
    const htmlSnippet = html.substring(0, 5000);
    debug.htmlSnippet = htmlSnippet;

    const $ = cheerio.load(html);

    // Strategy 1: Find button containing "Stock MC"
    debug.steps.push('Looking for buttons with "Stock MC" text...');
    const allButtons = $('button');
    debug.totalButtons = allButtons.length;
    
    const stockMCButtons = $('button').filter((_, el) => {
      const buttonText = $(el).text();
      return buttonText.includes('Stock MC');
    });
    
    debug.stockMCButtonsFound = stockMCButtons.length;
    debug.steps.push(`Found ${stockMCButtons.length} button(s) with "Stock MC"`);

    if (stockMCButtons.length > 0) {
      const firstButton = stockMCButtons.first();
      const buttonHtml = $.html(firstButton);
      debug.firstButtonHtml = buttonHtml.substring(0, 500);
      debug.steps.push('Found button, extracting HTML...');

      // Find span with translate="no" within the button
      const marketCapSpan = firstButton.find('span[translate="no"]');
      debug.marketCapSpansFound = marketCapSpan.length;
      debug.steps.push(`Found ${marketCapSpan.length} span(s) with translate="no"`);

      if (marketCapSpan.length > 0) {
        const value = marketCapSpan.first().text().trim();
        debug.extractedValue = value;
        debug.steps.push(`Extracted value: "${value}"`);

        if (value && value !== '$0') {
          return { value, debug };
        } else {
          debug.errors.push(`Value is empty or $0: "${value}"`);
        }
      } else {
        // Try finding any span with a dollar value
        const allSpans = firstButton.find('span');
        debug.allSpansInButton = allSpans.length;
        debug.steps.push(`Found ${allSpans.length} total spans in button`);

        // Look for spans containing dollar signs
        const dollarSpans = allSpans.filter((_, el) => {
          const text = $(el).text();
          return text.includes('$');
        });
        debug.dollarSpansFound = dollarSpans.length;

        if (dollarSpans.length > 0) {
          dollarSpans.each((_, el) => {
            const text = $(el).text().trim();
            debug.steps.push(`Found span with $: "${text}"`);
          });
        }
      }
    }

    // Strategy 2: Look for any element with "Stock MC" text
    debug.steps.push('Trying alternative strategy: looking for any element with "Stock MC"');
    const stockMCElements = $('*').filter((_, el) => {
      const text = $(el).text();
      return text.includes('Stock MC');
    });
    debug.stockMCElementsFound = stockMCElements.length;

    if (stockMCElements.length > 0) {
      stockMCElements.each((i, el) => {
        if (i < 3) { // Log first 3
          const html = $.html(el);
          debug.steps.push(`Stock MC element ${i + 1} HTML (first 300 chars): ${html.substring(0, 300)}`);
        }
      });
    }

    // Strategy 3: Look for the specific structure from user's example
    // Button with aria-haspopup="dialog" containing "Stock MC"
    debug.steps.push('Trying strategy 3: button with aria-haspopup="dialog"');
    const dialogButtons = $('button[aria-haspopup="dialog"]');
    debug.dialogButtonsFound = dialogButtons.length;

    dialogButtons.each((i, el) => {
      const text = $(el).text();
      if (text.includes('Stock MC') && i < 3) {
        const html = $.html(el);
        debug.steps.push(`Dialog button ${i + 1} with Stock MC (first 500 chars): ${html.substring(0, 500)}`);
        
        // Try to find span with translate="no"
        const span = $(el).find('span[translate="no"]');
        if (span.length > 0) {
          const value = span.first().text().trim();
          debug.steps.push(`Found value in dialog button: "${value}"`);
          if (value && value !== '$0') {
            return { value, debug };
          }
        }
      }
    });

    // Strategy 4: Search in __NEXT_DATA__ script tag (server-side rendered data)
    debug.steps.push('Trying strategy 4: looking for __NEXT_DATA__ script tag');
    const nextDataScript = $('script#__NEXT_DATA__');
    if (nextDataScript.length > 0) {
      try {
        const nextDataText = nextDataScript.html();
        if (nextDataText) {
          const nextData = JSON.parse(nextDataText);
          debug.steps.push('Found __NEXT_DATA__, parsing JSON...');
          
          // Look for stockData.mcap in the data
          const pageProps = nextData?.props?.pageProps;
          if (pageProps) {
            const dehydratedState = pageProps?.dehydratedState;
            if (dehydratedState) {
              const queries = dehydratedState?.queries || [];
              for (const query of queries) {
                const data = query?.state?.data;
                if (data?.stockData?.mcap) {
                  const mcap = data.stockData.mcap;
                  debug.steps.push(`Found stockData.mcap: ${mcap}`);
                  // Format it like Jupiter does (convert to B, M, K format)
                  if (typeof mcap === 'number' && mcap > 0) {
                    const formatted = formatMarketCap(mcap);
                    debug.steps.push(`Formatted value: ${formatted}`);
                    return { value: formatted, debug };
                  }
                }
              }
            }
          }
        }
      } catch (e: any) {
        debug.errors.push(`Error parsing __NEXT_DATA__: ${e.message}`);
      }
    }

    debug.errors.push('Could not find market cap value using any strategy');
    return { value: null, debug };

  } catch (error: any) {
    debug.errors.push(`Error: ${error.message}`);
    debug.errorStack = error.stack;
    return { value: null, debug };
  }
}

/**
 * Format market cap number to Jupiter's format (e.g., $472B)
 */
function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(0)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(0)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/**
 * Test the API endpoint
 */
async function testAPIEndpoint() {
  console.log('\n=== Testing API Endpoint ===\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/solana/token-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        addresses: [TEST_TOKEN_ADDRESS],
      }),
    });

    console.log(`API Response Status: ${response.status}`);
    
    if (!response.ok) {
      const text = await response.text();
      console.log(`API Error: ${text}`);
      return;
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    const token = data.tokens?.[0];
    if (token) {
      console.log(`\nToken Address: ${token.address}`);
      console.log(`Market Cap Formatted: ${token.marketCapFormatted || 'NOT FOUND'}`);
      console.log(`Market Cap (numeric): ${token.marketCap || 'NOT FOUND'}`);
      console.log(`TVL: ${token.tvlUSD || 'NOT FOUND'}`);
      console.log(`Volume: ${token.volumeUSD || 'NOT FOUND'}`);
    }
  } catch (error: any) {
    console.error('API Test Error:', error.message);
  }
}

/**
 * Main test function
 */
async function runTests() {
  console.log('=== Jupiter Market Cap Fetching Test ===\n');
  console.log(`Testing with token address: ${TEST_TOKEN_ADDRESS}\n`);

  const result = await fetchJupiterMarketCap(TEST_TOKEN_ADDRESS);
  
  console.log('\n=== Test Results ===\n');
  console.log(`Market Cap Value: ${result.value || 'NOT FOUND'}\n`);
  
  console.log('=== Debug Information ===\n');
  console.log(JSON.stringify(result.debug, null, 2));

  if (!result.value) {
    console.log('\n❌ FAILED: Could not extract market cap value');
    console.log('\nDebugging steps taken:');
    result.debug.steps.forEach((step: string, idx: number) => {
      console.log(`  ${idx + 1}. ${step}`);
    });
    
    if (result.debug.errors.length > 0) {
      console.log('\nErrors encountered:');
      result.debug.errors.forEach((error: string) => {
        console.log(`  - ${error}`);
      });
    }
  } else {
    console.log(`\n✅ SUCCESS: Found market cap value: ${result.value}`);
  }

  // Test API endpoint if server is running
  console.log('\n\n=== Testing API Endpoint ===');
  console.log('Note: Make sure the dev server is running (npm run dev)');
  await testAPIEndpoint();
}

// Run tests
runTests().catch(console.error);

