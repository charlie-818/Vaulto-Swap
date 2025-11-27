"use client";

import { useState } from 'react';
import { searchTokens } from '@/lib/uniswap/tokenSearch';
import { getPoolsForToken } from '@/lib/uniswap/pools';

export default function UniswapDebugPage() {
  const [chainId, setChainId] = useState<string>('1');
  const [query, setQuery] = useState<string>('USDC');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [directResponse, setDirectResponse] = useState<any>(null);
  const [directLoading, setDirectLoading] = useState(false);
  const [directError, setDirectError] = useState<string | null>(null);
  
  const [serverResponse, setServerResponse] = useState<any>(null);
  const [serverLoading, setServerLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Fetch from API endpoint
  const handleApiFetch = async () => {
    setApiLoading(true);
    setApiError(null);
    setApiResponse(null);

    try {
      const chainIdNum = parseInt(chainId, 10);
      if (isNaN(chainIdNum)) {
        throw new Error('Invalid chainId');
      }

      const response = await fetch('/api/uniswap/liquidity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chainId: chainIdNum,
          query: query.trim(),
        }),
      });

      const data = await response.json();
      setApiResponse(data);
      
      if (!response.ok) {
        setApiError(data.error || 'Failed to fetch');
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setApiLoading(false);
    }
  };

  // Call functions directly (client-side)
  const handleDirectFetch = async () => {
    setDirectLoading(true);
    setDirectError(null);
    setDirectResponse(null);

    try {
      const chainIdNum = parseInt(chainId, 10);
      if (isNaN(chainIdNum)) {
        throw new Error('Invalid chainId');
      }

      console.log('=== DEBUG: Calling searchTokens directly ===');
      console.log('Parameters:', { chainId: chainIdNum, query: query.trim() });
      
      const searchResult = await searchTokens(chainIdNum, query.trim(), 10);
      console.log('searchTokens result:', JSON.stringify(searchResult, null, 2));

      const result: any = {
        searchTokens: searchResult,
        poolsResults: [] as any[],
      };

      // Get pools for first token if available
      if (searchResult.tokens && searchResult.tokens.length > 0) {
        const firstToken = searchResult.tokens[0];
        console.log(`=== DEBUG: Calling getPoolsForToken for ${firstToken.symbol} ===`);
        console.log('Parameters:', { 
          chainId: chainIdNum, 
          tokenAddress: firstToken.address 
        });
        
        const poolsResult = await getPoolsForToken(chainIdNum, firstToken.address, 10);
        console.log('getPoolsForToken result:', JSON.stringify(poolsResult, null, 2));
        
        result.poolsResults.push({
          token: firstToken,
          pools: poolsResult,
        });
      }

      setDirectResponse(result);
      console.log('=== DEBUG: Complete direct fetch result ===');
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('=== DEBUG: Error in direct fetch ===', error);
      setDirectError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setDirectLoading(false);
    }
  };

  // Call functions server-side via API route
  const handleServerFetch = async () => {
    setServerLoading(true);
    setServerError(null);
    setServerResponse(null);

    try {
      const chainIdNum = parseInt(chainId, 10);
      if (isNaN(chainIdNum)) {
        throw new Error('Invalid chainId');
      }

      const response = await fetch(
        `/api/debug/uniswap-direct?chainId=${chainIdNum}&query=${encodeURIComponent(query.trim())}`
      );

      const data = await response.json();
      setServerResponse(data);
      
      if (!response.ok) {
        setServerError(data.error || 'Failed to fetch');
      }
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setServerLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Uniswap Liquidity API Debug</h1>
        
        {/* Input Controls */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Chain ID</label>
              <input
                type="number"
                value={chainId}
                onChange={(e) => setChainId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Query</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                placeholder="USDC"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleApiFetch}
              disabled={apiLoading || directLoading || serverLoading}
              className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {apiLoading ? 'Fetching...' : 'Fetch from API'}
            </button>
            
            <button
              onClick={handleDirectFetch}
              disabled={apiLoading || directLoading || serverLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {directLoading ? 'Calling Functions...' : 'Call Functions Directly (Client)'}
            </button>
            
            <button
              onClick={handleServerFetch}
              disabled={apiLoading || directLoading || serverLoading}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {serverLoading ? 'Calling Server...' : 'Call Functions Directly (Server)'}
            </button>
          </div>
        </div>

        {/* API Response */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">API Response (/api/uniswap/liquidity)</h2>
          
          {apiError && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
              Error: {apiError}
            </div>
          )}
          
          {apiLoading && (
            <div className="text-gray-400">Loading...</div>
          )}
          
          {apiResponse && (
            <pre className="bg-black/50 p-4 rounded-lg overflow-auto max-h-96 text-xs text-gray-300 border border-gray-700">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          )}
        </div>

        {/* Direct Function Calls */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Direct Function Calls</h2>
          <p className="text-gray-400 text-sm mb-4">
            Calls <code className="bg-gray-800 px-2 py-1 rounded">searchTokens</code> and{' '}
            <code className="bg-gray-800 px-2 py-1 rounded">getPoolsForToken</code> directly.
            Check the browser console for detailed logs.
          </p>
          
          {directError && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
              Error: {directError}
            </div>
          )}
          
          {directLoading && (
            <div className="text-gray-400">Calling functions... Check console for logs.</div>
          )}
          
          {directResponse && (
            <pre className="bg-black/50 p-4 rounded-lg overflow-auto max-h-96 text-xs text-gray-300 border border-gray-700">
              {JSON.stringify(directResponse, null, 2)}
            </pre>
          )}
        </div>

        {/* Server-Side Direct Function Calls */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Server-Side Direct Function Calls</h2>
          <p className="text-gray-400 text-sm mb-4">
            Calls <code className="bg-gray-800 px-2 py-1 rounded">searchTokens</code> and{' '}
            <code className="bg-gray-800 px-2 py-1 rounded">getPoolsForToken</code> directly on the server.
            Check the <strong>terminal/server console</strong> for detailed logs.
          </p>
          
          {serverError && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
              Error: {serverError}
            </div>
          )}
          
          {serverLoading && (
            <div className="text-gray-400">Calling functions on server... Check terminal for logs.</div>
          )}
          
          {serverResponse && (
            <div>
              {serverResponse.success && (
                <div className="mb-4 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300">
                  Success! Check terminal for detailed server-side logs.
                </div>
              )}
              <pre className="bg-black/50 p-4 rounded-lg overflow-auto max-h-96 text-xs text-gray-300 border border-gray-700">
                {JSON.stringify(serverResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Comparison Notes */}
        <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-blue-700">
          <h3 className="text-lg font-bold text-blue-300 mb-2">Comparison Notes</h3>
          <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
            <li><strong>API Response:</strong> Shows what the endpoint returns after processing.</li>
            <li><strong>Direct Calls (Client):</strong> Show raw results from the Uniswap subgraph queries. Check browser console (F12) for logs.</li>
            <li><strong>Direct Calls (Server):</strong> Same functions but executed on the server. Check terminal/server console for logs.</li>
            <li>Compare all three to see how data flows: subgraph → functions → API → UI.</li>
            <li>Server-side logs are especially useful for debugging production issues.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

