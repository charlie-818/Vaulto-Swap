"use client";

import { useState, Fragment } from "react";
import { useChainId } from "wagmi";
import { Token, getStablecoins, getTokenizedStocks } from "@/config/tokens";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TokenSelectorProps {
  selectedToken: Token | null;
  onSelectToken: (token: Token) => void;
  otherToken: Token | null;
  filterStablecoins?: boolean;
  showRegulated?: boolean;
}

export default function TokenSelector({
  selectedToken,
  onSelectToken,
  otherToken,
  filterStablecoins = false,
  showRegulated = false,
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const chainId = useChainId();

  const availableTokens = filterStablecoins
    ? getStablecoins(chainId)
    : getTokenizedStocks(chainId, showRegulated);

  const filteredTokens = availableTokens.filter(
    (token) => token.address !== otherToken?.address
  );

  return (
    <div className="relative mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass rounded-xl p-4 flex items-center justify-between hover:glass-strong transition-all"
      >
        {selectedToken ? (
          <div className="flex items-center gap-3">
            {selectedToken.logoURI ? (
              <Image 
                src={selectedToken.logoURI} 
                alt={selectedToken.symbol}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-black font-semibold">
                {selectedToken.symbol.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <div className="text-white font-semibold">{selectedToken.symbol}</div>
              <div className="text-xs text-gray-400">{selectedToken.name}</div>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Select token</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 glass-strong rounded-xl p-2 max-h-64 overflow-y-auto shadow-2xl"
            >
              {filteredTokens.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No tokens available on this chain
                </div>
              ) : (
                filteredTokens.map((token) => (
                  <div
                    key={token.address}
                    className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all group"
                  >
                    <button
                      onClick={() => {
                        onSelectToken(token);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 flex-1"
                    >
                      {token.logoURI ? (
                        <Image 
                          src={token.logoURI} 
                          alt={token.symbol}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-black font-semibold">
                          {token.symbol.charAt(0)}
                        </div>
                      )}
                      <div className="text-left flex-1">
                        <div className="text-white font-semibold text-sm">
                          {token.symbol}
                        </div>
                        <div className="text-xs text-gray-400">{token.name}</div>
                      </div>
                    </button>
                    {token.factsheetUrl && (
                      <a
                        href={token.factsheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all opacity-0 group-hover:opacity-100"
                        title="View Factsheet"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                ))
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

