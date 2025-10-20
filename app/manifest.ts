import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vaulto Swap - Tokenized Stock Trading',
    short_name: 'Vaulto Swap',
    description: 'Trade tokenized stocks with stablecoins on Vaulto Swap. Secure DeFi trading with CoW Protocol integration.',
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

