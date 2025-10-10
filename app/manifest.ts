import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vaulto Swap - Tokenized Stock Trading',
    short_name: 'Vaulto Swap',
    description: 'Swap stablecoins for tokenized stocks seamlessly. Trade TSLA, AAPL, GOOGL, AMZN, and MSFT tokens with USDT, USDC, and DAI.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['finance', 'business'],
    orientation: 'portrait',
  };
}

