# Netlify Deployment Guide

This guide explains how to deploy Vaulto Swap on Netlify.

## Prerequisites

1. A Netlify account
2. WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

## Required Environment Variables

Before deploying, you must configure the following environment variable in your Netlify project settings:

### Required:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Your WalletConnect Project ID (Required for wallet connections)

### Optional (for better performance):
- `NEXT_PUBLIC_MAINNET_RPC_URL` - Custom Ethereum Mainnet RPC URL
- `NEXT_PUBLIC_ARBITRUM_RPC_URL` - Custom Arbitrum RPC URL
- `NEXT_PUBLIC_OPTIMISM_RPC_URL` - Custom Optimism RPC URL
- `NEXT_PUBLIC_BASE_RPC_URL` - Custom Base RPC URL
- `NEXT_PUBLIC_POLYGON_RPC_URL` - Custom Polygon RPC URL
- `NEXT_PUBLIC_SEPOLIA_RPC_URL` - Custom Sepolia testnet RPC URL
- `NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL` - Custom Arbitrum Sepolia RPC URL

## Deployment Steps

### Option 1: Deploy via Netlify UI

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** 20
5. Add environment variables:
   - Go to Site settings → Environment variables
   - Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` with your WalletConnect Project ID
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Build Configuration

The project includes a `netlify.toml` configuration file with:
- Next.js plugin for optimal performance
- Security headers
- Static asset caching
- Proper redirects for SPA routing

## Post-Deployment Checklist

- [ ] Verify environment variables are set in Netlify dashboard
- [ ] Test wallet connection functionality
- [ ] Verify all routes are working correctly
- [ ] Check that images and static assets load properly
- [ ] Test on multiple devices and browsers

## Troubleshooting

### Build fails with "WalletConnect Project ID is required"
- Ensure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set in your Netlify environment variables

### Module not found errors
- Clear build cache in Netlify: Site settings → Build & deploy → Clear cache and retry deploy

### Pages not loading correctly
- Ensure the Next.js plugin is installed: `npm install -D @netlify/plugin-nextjs`

## Environment Variable Setup Example

In Netlify Dashboard → Site settings → Environment variables → Add a variable:

```
Key: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
Value: 1a2b3c4d5e6f7g8h9i0j
Scopes: All (All deploys)
```

## Local Development

For local development, create a `.env` file in the project root:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

## Performance Optimization

The Netlify deployment includes:
- Static asset caching (1 year)
- Compression enabled
- Security headers
- Next.js optimization plugin

## Support

For issues related to:
- Netlify deployment: [Netlify Support](https://www.netlify.com/support/)
- WalletConnect: [WalletConnect Docs](https://docs.walletconnect.com/)
- Next.js: [Next.js Documentation](https://nextjs.org/docs)

