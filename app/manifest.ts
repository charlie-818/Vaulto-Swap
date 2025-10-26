import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vaulto | Trade Tokenized Equities 24/7',
    short_name: 'Vaulto',
    description: 'Trade tokenized equities with stablecoins. Advanced DeFi infrastructure with MEV protection and institutional-grade security.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['finance', 'business'],
    orientation: 'portrait',
  };
}

