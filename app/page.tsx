"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

// Dynamically import the CoW widget to prevent SSR issues
const CowSwapWidgetWrapper = dynamic(
  () => import("./components/swap/CowSwapWidgetWrapper"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full max-w-4xl flex items-center justify-center h-[500px]">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Loading swap interface...</p>
        </div>
      </div>
    )
  }
);

// Custom wallet component with address and disconnect button
function WalletButton() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <button
        onClick={() => open()}
        className="px-2 py-1 md:px-4 md:py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors duration-200 text-xs md:text-sm"
      >
        Connect
      </button>
    );
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-1 md:gap-2">
      {/* Address bubble - Clickable to open wallet menu */}
      <button
        onClick={() => open()}
        className="px-2 py-1 md:px-3 md:py-2 bg-gray-800/50 border border-amber-500/30 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 hover:border-amber-500/50 transition-all duration-200"
        title="Wallet Settings"
      >
        <span className="text-xs md:text-sm font-medium text-white">
          {formatAddress(address!)}
        </span>
      </button>
      
      {/* Disconnect button - Hidden on mobile, visible on desktop */}
      <button
        onClick={() => disconnect()}
        className="hidden md:block px-3 py-3 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 group"
        title="Disconnect Wallet"
      >
        <svg 
          className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" 
          />
        </svg>
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <main className="relative">
      {/* Subtle Gold Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-left gold glow */}
        <div className="absolute -top-32 -left-32 w-[800px] h-[800px] animate-[float_20s_ease-in-out_infinite]">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/15 via-yellow-600/10 to-transparent blur-3xl"></div>
        </div>
        
        {/* Top-right gold glow */}
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] animate-[float_25s_ease-in-out_infinite_reverse]">
          <div className="w-full h-full bg-gradient-to-bl from-yellow-500/12 via-amber-500/8 to-transparent blur-3xl"></div>
        </div>
        
        {/* Bottom center gold shimmer */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] animate-[pulse_30s_ease-in-out_infinite]">
          <div className="w-full h-full bg-gradient-to-t from-amber-600/15 via-yellow-500/8 to-transparent blur-3xl"></div>
        </div>
      </div>
      {/* Header */}
      <header className="fixed md:sticky top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-sm" role="banner">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Image 
                src="/logo.png" 
                alt="Vaulto Swap" 
                width={120} 
                height={40}
                className="object-contain w-24 h-auto"
                priority
              />
              <nav aria-label="Main navigation" className="hidden md:block">
                <ul className="flex items-center gap-4">
                  <li>
                    <a 
                      href="https://vaulto.ai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Search
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://holdings.vaulto.ai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Holdings
                    </a>
                  </li>
                </ul>
              </nav>
              
              {/* Mobile Navigation */}
              <nav aria-label="Mobile navigation" className="md:hidden">
                <ul className="flex items-center gap-3">
                  <li>
                    <a 
                      href="https://vaulto.ai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Search
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://holdings.vaulto.ai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Holdings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Connect Wallet Button */}
            <WalletButton />
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen py-6 sm:py-8 pt-32 md:pt-6">
        <section aria-label="Token swap interface" className="w-full">
          <h1 className="sr-only">Vaulto Swap - Trade Tokenized Stocks with Stablecoins</h1>
          
          {/* Typography Section */}
          <div className="text-center mb-1 -mt-8 sm:-mt-24">
            <h2 className="text-7xl sm:text-8xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-3 sm:mb-4 tracking-tight">
              Vaulto
            </h2>
            <p className="text-white text-lg sm:text-xl md:text-2xl font-light">
              Trade anywhere anytime
            </p>
          </div>
          
          <div className="w-full max-w-6xl mx-auto">
            <CowSwapWidgetWrapper />
          </div>
        </section>
      </div>

        {/* Private Markets Section */}
        <section className="relative z-10 w-full bg-black pt-8 sm:pt-12 md:pt-16 pb-0 overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Social Media Icons - Mobile only, above Private Markets text */}
            <div className="flex items-center justify-center gap-4 mb-6 md:hidden">
              {/* Twitter */}
              <a 
                href="https://twitter.com/vaultoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-amber-400 transition-colors duration-200 rounded-lg hover:bg-amber-500/10"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://instagram.com/vaultoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-amber-400 transition-colors duration-200 rounded-lg hover:bg-amber-500/10"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/company/vaulto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-amber-400 transition-colors duration-200 rounded-lg hover:bg-amber-500/10"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@VaultoAI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-amber-400 transition-colors duration-200 rounded-lg hover:bg-amber-500/10"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Section Header */}
            <div className="text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-2 sm:mb-3">
                Private Markets, Public Access
              </h2>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-3 sm:mb-4">
                Unlock institutional-grade investment opportunities through tokenized securities
              </p>
              
              {/* Email Signup - Desktop only */}
              <div className="hidden md:block max-w-md mx-auto relative z-10">
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const email = formData.get('EMAIL') as string;
                    
                    try {
                      await fetch('https://vaulto.us15.list-manage.com/subscribe/post?u=4e3f80ec414b40367852952ec&id=dc4af6dff9&f_id=00728ce0f0', {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formData
                      });
                      
                      // Show success message
                      const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                      const originalText = button.textContent;
                      button.textContent = 'Subscribed!';
                      button.className = 'px-6 py-2 bg-amber-500 text-black font-semibold rounded-lg transition-colors duration-200';
                      
                      // Reset after 3 seconds
                      setTimeout(() => {
                        button.textContent = originalText;
                        button.className = 'px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors duration-200';
                        form.reset();
                      }, 3000);
                    } catch (error) {
                      console.error('Subscription error:', error);
                    }
                  }}
                  noValidate
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    name="EMAIL"
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-amber-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 relative z-10"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors duration-200"
                  >
                    Notify Me
                  </button>
                  {/* Hidden fields for Mailchimp */}
                  <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                    <input type="text" name="b_4e3f80ec414b40367852952ec_dc4af6dff9" tabIndex={-1} defaultValue="" />
                  </div>
                </form>
              </div>
            </div>

            {/* Private Markets Image */}
            <div className="flex justify-center -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40 xl:-mt-48 -mb-32 sm:-mb-40 md:-mb-48 lg:-mb-56 xl:-mb-64">
              <Image
                src="/private.avif"
                alt="Private Markets Access"
                width={800}
                height={800}
                className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-auto"
                priority
              />
            </div>
            
            {/* Mobile Email Signup - positioned even further down below private image */}
            <div className="block md:hidden w-full max-w-sm mx-auto relative z-10 mt-24">
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const email = formData.get('EMAIL') as string;
                  
                  try {
                    await fetch('https://vaulto.us15.list-manage.com/subscribe/post?u=4e3f80ec414b40367852952ec&id=dc4af6dff9&f_id=00728ce0f0', {
                      method: 'POST',
                      mode: 'no-cors',
                      body: formData
                    });
                    
                    // Show success message
                    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                    const originalText = button.textContent;
                    button.textContent = 'Subscribed!';
                    button.className = 'w-full px-4 py-3 bg-amber-500 text-black font-semibold rounded-lg transition-colors duration-200 text-sm';
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                      button.textContent = originalText;
                      button.className = 'w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors duration-200 text-sm';
                      form.reset();
                    }, 3000);
                  } catch (error) {
                    console.error('Subscription error:', error);
                  }
                }}
                noValidate
                className="flex flex-col gap-2"
              >
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="Enter your email for updates"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-amber-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm relative z-10"
                  style={{ pointerEvents: 'auto' }}
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors duration-200 text-sm"
                >
                  Get Notified
                </button>
                {/* Hidden fields for Mailchimp */}
                <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                  <input type="text" name="b_4e3f80ec414b40367852952ec_dc4af6dff9" tabIndex={-1} defaultValue="" />
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Fixed at bottom for desktop, positioned after private markets for mobile */}
      <footer className="fixed bottom-0 left-0 right-0 md:block hidden border-t border-amber-500/20 bg-black/90 backdrop-blur-sm z-50" role="contentinfo">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              © 2024 Vaulto. All rights reserved.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-2">
              {/* Twitter */}
              <a 
                href="https://twitter.com/vaultoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://instagram.com/vaultoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/company/vaulto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@VaultoAI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer - Simplified for mobile viewing */}
      <footer className="block md:hidden bg-black/90 backdrop-blur-sm z-50" role="contentinfo">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <p className="text-xs text-gray-400">
              © 2024 Vaulto. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

