"use client";

import { useState } from "react";
import SwapInterface from "./components/swap/SwapInterface";
import RestrictionBanner from "./components/RestrictionBanner";
import Image from "next/image";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export default function Home() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [isRestricted, setIsRestricted] = useState(true); // Restricted by default, can be toggled off
  return (
    <main className="relative bg-gradient-to-br from-black via-gray-900 to-black pb-0">
      {/* Subtle Gold Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-left gold glow */}
        <div className="absolute -top-32 -left-32 w-[800px] h-[800px]">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/30 via-yellow-600/20 to-transparent blur-3xl"></div>
        </div>
        
        {/* Top-right gold glow */}
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px]">
          <div className="w-full h-full bg-gradient-to-bl from-yellow-500/25 via-amber-500/15 to-transparent blur-3xl"></div>
        </div>
        
        {/* Bottom center gold shimmer */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px]">
          <div className="w-full h-full bg-gradient-to-t from-amber-600/30 via-yellow-500/15 to-transparent blur-3xl"></div>
        </div>
      </div>
      {/* Header */}
      <header className="relative z-10 border-b border-amber-500/20" role="banner">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Image 
                src="/logo.png" 
                alt="Vaulto Swap - Tokenized Stock Trading Platform Logo" 
                width={120} 
                height={40}
                className="object-contain cursor-pointer"
                priority
                onDoubleClick={() => setIsRestricted(!isRestricted)}
              />
              <nav aria-label="Main navigation">
                <ul className="flex items-center gap-6">
                  <li>
                    <a 
                      href="https://vaulto.fi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      Search
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://vaulto.holdings" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      Holdings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Connect Wallet Button */}
            <button
                onClick={() => !isRestricted && open()}
                disabled={isRestricted}
                className={`px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg ${
                  isRestricted
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white cursor-not-allowed opacity-90"
                    : "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {isConnected && address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "Connect"}
            </button>
          </div>
        </div>
      </header>

      {/* Restriction Banner */}
      <RestrictionBanner 
        isRestricted={isRestricted} 
        onToggle={() => setIsRestricted(false)} 
      />

      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-140px)]">
        <section aria-label="Token swap interface">
          <h1 className="sr-only">Vaulto Swap - Trade Tokenized Stocks with Stablecoins</h1>
          <SwapInterface isRestricted={isRestricted} />
        </section>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-amber-500/20 bg-black z-10" role="contentinfo">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Media Links */}
            <nav aria-label="Social media links">
              <ul className="flex items-center gap-4">
              <li>
                <a 
                  href="https://instagram.com/vaultoai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label="Follow Vaulto on Instagram"
                >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              </li>
              <li>
                <a 
                  href="https://x.com/vaultoai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label="Follow Vaulto on X (formerly Twitter)"
                >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/company/vaulto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label="Connect with Vaulto on LinkedIn"
                >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/@vaultoai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label="Subscribe to Vaulto on YouTube"
                >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              </li>
              </ul>
            </nav>

            {/* Legal Links */}
            <nav aria-label="Legal information">
              <ul className="flex items-center gap-6 text-xs">
              <li>
                <a 
                  href="/privacy-policy" 
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a 
                  href="/disclaimers" 
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Disclaimers
                </a>
              </li>
              <li>
                <a 
                  href="/terms-of-service" 
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Terms
                </a>
              </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      {/* Private Markets Section */}
      <section className="relative z-10 w-full bg-black pt-24 pb-0 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-1">
              Private Markets, Public Access
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-2">
              Unlock institutional-grade investment opportunities through tokenized securities
            </p>
            <p className="text-amber-500 text-xl md:text-2xl font-semibold">
              Coming Soon
            </p>
          </div>

          {/* Private Markets Image */}
          <div className="flex justify-center -mt-56 -mb-80">
            <Image
              src="/private.avif"
              alt="Private Markets Access"
              width={800}
              height={800}
              className="w-full max-w-4xl h-auto"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}

