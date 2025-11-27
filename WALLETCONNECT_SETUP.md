# WalletConnect Project ID Configuration

## Current Status

**WalletConnect Project ID is NOT currently set.**

The application is configured to read the WalletConnect Project ID from the environment variable:
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
```

## Location in Code

The WalletConnect Project ID is configured in:
- **File**: `app/providers.tsx`
- **Line**: 22
- **Code**: 
  ```typescript
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";
  ```

## How to Set It Up

1. **Get a WalletConnect Project ID**:
   - Visit: https://cloud.reown.com/app
   - Sign up or log in
   - Create a new project
   - Copy your Project ID

2. **Create a `.env.local` file** in the root directory:
   ```bash
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id-here
   ```

3. **Restart your development server** after adding the environment variable.

## Current Behavior

- If no Project ID is set: WalletConnect connector is skipped, but other wallet connectors (MetaMask, Coinbase Wallet, Trust Wallet) still work
- If Project ID is set: Full WalletConnect functionality is enabled

## Example `.env.local` file:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=1234567890abcdef1234567890abcdef
```

**Note**: Replace `1234567890abcdef1234567890abcdef` with your actual WalletConnect Project ID from Reown Cloud.

