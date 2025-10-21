# Wallet Connection Issues

This guide helps you troubleshoot common wallet connection problems on Vaulto Swap.

## Common Issues and Solutions

### **"Connection Failed" Error**

#### **Possible Causes**
- Browser extension not installed or enabled
- Wallet not unlocked
- Network connectivity issues
- Browser cache problems

#### **Solutions**
1. **Check Wallet Installation**
   - Ensure MetaMask or your wallet is installed
   - Verify the extension is enabled in browser
   - Try refreshing the browser page

2. **Unlock Your Wallet**
   - Open your wallet extension
   - Enter your password or use biometric authentication
   - Ensure wallet is unlocked before connecting

3. **Clear Browser Cache**
   - Clear browser cache and cookies
   - Try in incognito/private mode
   - Disable browser extensions temporarily

4. **Try Different Browser**
   - Test in Chrome, Firefox, or Safari
   - Ensure browser is updated to latest version

### **"Network Not Supported" Error**

#### **Possible Causes**
- Wrong network selected in wallet
- Network not added to wallet
- Incorrect network configuration

#### **Solutions**
1. **Switch Network in Wallet**
   - Click network dropdown in MetaMask
   - Select supported network (Ethereum, Arbitrum, etc.)
   - Wait for network switch to complete

2. **Add Network Manually**
   ```
   Arbitrum One:
   - Network Name: Arbitrum One
   - RPC URL: https://arb1.arbitrum.io/rpc
   - Chain ID: 42161
   - Currency Symbol: ETH
   - Block Explorer: https://arbiscan.io
   ```

3. **Verify Network Settings**
   - Check chain ID matches expected network
   - Ensure RPC URL is correct
   - Verify block explorer URL

### **"Transaction Rejected" Error**

#### **Possible Causes**
- User rejected transaction in wallet
- Insufficient funds for gas
- Gas limit too low
- Network congestion

#### **Solutions**
1. **Check Wallet Balance**
   - Ensure sufficient ETH for gas fees
   - Check token balance for trading
   - Add funds if necessary

2. **Adjust Gas Settings**
   - Increase gas limit in wallet
   - Use higher gas price during congestion
   - Wait for network congestion to decrease

3. **Retry Transaction**
   - Try transaction again after a few minutes
   - Use different network if available
   - Check network status

### **"Wallet Not Detected" Error**

#### **Possible Causes**
- Wallet extension not installed
- Wallet not enabled
- Browser compatibility issues
- JavaScript disabled

#### **Solutions**
1. **Install Wallet Extension**
   - Download MetaMask from metamask.io
   - Install Coinbase Wallet from coinbase.com/wallet
   - Enable extension in browser

2. **Enable JavaScript**
   - Ensure JavaScript is enabled in browser
   - Check browser security settings
   - Disable ad blockers temporarily

3. **Browser Compatibility**
   - Use supported browser (Chrome, Firefox, Safari, Edge)
   - Update browser to latest version
   - Try different browser

## Mobile Wallet Issues

### **QR Code Not Working**

#### **Solutions**
1. **Check Camera Permissions**
   - Allow camera access for wallet app
   - Ensure good lighting for QR code scanning
   - Clean camera lens

2. **Try Manual Connection**
   - Use wallet's manual connection option
   - Enter connection details manually
   - Try different connection method

### **Connection Timeout**

#### **Solutions**
1. **Check Internet Connection**
   - Ensure stable internet on both devices
   - Try different network (WiFi vs mobile data)
   - Restart network connection

2. **Restart Apps**
   - Close and reopen wallet app
   - Refresh browser page
   - Try reconnecting

## Advanced Troubleshooting

### **Reset Wallet Connection**

1. **Disconnect Wallet**
   - Click wallet address in Vaulto Swap
   - Select "Disconnect"
   - Clear connection from wallet

2. **Clear Browser Data**
   - Clear cookies and site data
   - Clear browser cache
   - Restart browser

3. **Reconnect Wallet**
   - Click "Connect Wallet"
   - Select your wallet
   - Approve connection

### **Network-Specific Issues**

#### **Ethereum Mainnet**
- High gas fees during congestion
- Slow transaction confirmation
- Network congestion delays

#### **Arbitrum**
- Withdrawal delays to Ethereum
- RPC endpoint issues
- Network maintenance

#### **Optimism**
- Sequencer downtime
- Withdrawal delays
- RPC connectivity issues

### **Hardware Wallet Issues**

#### **Connection Problems**
1. **Check Hardware Connection**
   - Ensure hardware wallet is connected
   - Unlock hardware wallet
   - Check USB connection

2. **Update Firmware**
   - Update hardware wallet firmware
   - Update wallet software
   - Restart hardware wallet

3. **Browser Compatibility**
   - Use supported browser
   - Enable hardware wallet support
   - Check browser permissions

## Prevention Tips

### **Best Practices**
- Keep wallet software updated
- Use secure, private networks
- Verify website URLs before connecting
- Never share private keys or seed phrases

### **Regular Maintenance**
- Clear browser cache regularly
- Update wallet extensions
- Check network status before trading
- Monitor wallet security

## Getting Help

### **Support Resources**
- **[FAQ](getting-started/faq.md)** - Common questions
- **[Support](resources/support.md)** - Community help
- **GitHub Issues** - Report bugs and issues

### **Emergency Procedures**
- **Funds Stuck**: Contact wallet support
- **Security Breach**: Immediately transfer funds
- **Lost Access**: Use seed phrase recovery

---

**Still having issues?** Check our [Support](resources/support.md) page or join our community Discord for real-time help!
