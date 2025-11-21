/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/Uniswap/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'token-icons.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'vaulto.dev',
      },
      {
        protocol: 'https',
        hostname: '*.vaulto.dev',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@cowprotocol/widget-react', 'wagmi', '@web3modal/wagmi'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false, 
      net: false, 
      tls: false,
      '@react-native-async-storage/async-storage': false
    };
    
    // Push externals to prevent bundling of unnecessary packages
    config.externals.push('pino-pretty', 'encoding', '@react-native-async-storage/async-storage');
    
    // Ignore React Native modules during build
    config.ignoreWarnings = [
      { module: /@react-native-async-storage\/async-storage/ }
    ];
    
    // Optimize bundle splitting - simplified to avoid module resolution issues
    if (!isServer && config.optimization && config.optimization.splitChunks && config.optimization.splitChunks !== false) {
      if (!config.optimization.splitChunks.cacheGroups) {
        config.optimization.splitChunks.cacheGroups = {};
      }
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        wagmi: {
          test: /[\\/]node_modules[\\/](wagmi|viem)[\\/]/,
          name: 'wagmi',
          chunks: 'all',
          priority: 20,
        },
        cowprotocol: {
          test: /[\\/]node_modules[\\/]@cowprotocol[\\/]/,
          name: 'cowprotocol',
          chunks: 'all',
          priority: 20,
        },
      };
    }
    
    return config;
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        source: '/favicon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*.(png|jpg|jpeg|gif|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
    ];
  },
};

export default nextConfig;