# Geographic Restrictions

Vaulto Swap implements geographic restrictions to ensure compliance with applicable laws and regulations. This guide explains the restrictions, compliance requirements, and how they affect users.

## Overview

### **Why Geographic Restrictions?**
Tokenized stocks are regulated financial instruments that may be subject to restrictions in certain jurisdictions. Vaulto Swap implements geographic restrictions to:
- Comply with securities regulations
- Protect users from legal issues
- Ensure regulatory compliance
- Maintain platform integrity

### **How Restrictions Work**
- **IP-based Detection**: System detects user's geographic location
- **Restriction Banner**: Clear warning displayed to restricted users
- **Trading Disabled**: Swap interface disabled for restricted users
- **Compliance Toggle**: Users can enable/disable regulated asset access

## Restricted Jurisdictions

### **Currently Restricted**
- **United States**: Complex regulatory environment for tokenized securities
- **Sanctioned Countries**: Countries subject to international sanctions
- **Prohibited Jurisdictions**: Where tokenized securities are illegal

### **Restriction Types**
- **Complete Restriction**: No access to platform
- **Regulated Asset Restriction**: Access to platform but not tokenized stocks
- **Compliance Warning**: Access with compliance warnings

## Compliance Features

### **Restriction Banner**
When accessing from a restricted jurisdiction, users see:
- **Red Warning Banner**: Clear visual indication of restriction
- **Warning Message**: Explanation of restriction and legal implications
- **Terms of Use Link**: Access to detailed terms and conditions
- **Close Button**: Ability to dismiss banner (for testing)

### **Trading Interface Disabled**
For restricted users:
- **Interface Grayed Out**: Visual indication of disabled state
- **Overlay Message**: "Trading Disabled: Restricted Region"
- **No Interactions**: All trading functions disabled
- **Clear Messaging**: Explanation of why trading is disabled

### **Compliance Toggle**
Users can control regulated asset access:
- **Enable Regulated Assets**: Access to tokenized stocks
- **Disable Regulated Assets**: Hide tokenized stocks from interface
- **Compliance Warning**: Clear warning about regulatory implications
- **User Responsibility**: Users must ensure compliance

## Legal Considerations

### **User Responsibility**
Users are responsible for:
- **Compliance Verification**: Ensuring they're eligible to trade
- **Legal Compliance**: Following local laws and regulations
- **Risk Understanding**: Understanding regulatory risks
- **Professional Advice**: Consulting legal/financial professionals

### **Regulatory Landscape**
Tokenized securities are subject to:
- **Securities Laws**: Traditional securities regulations
- **Crypto Regulations**: Cryptocurrency-specific laws
- **Cross-border Issues**: International regulatory complexity
- **Evolving Regulations**: Changing regulatory landscape

## Implementation Details

### **Geolocation Detection**
- **IP-based Detection**: Primary method for location detection
- **VPN Detection**: Consideration of VPN usage
- **Fallback Behavior**: Default to restricted on detection failure
- **Privacy Considerations**: Minimal data collection

### **User Experience**
- **Clear Messaging**: Transparent communication about restrictions
- **Graceful Degradation**: Smooth user experience despite restrictions
- **Educational Content**: Information about compliance requirements
- **Support Access**: Help for users with questions

## Technical Implementation

### **Frontend Components**
```typescript
// RestrictionBanner component
interface RestrictionBannerProps {
  isRestricted: boolean;
  onToggle: () => void;
}

// SwapInterface component
interface SwapInterfaceProps {
  isRestricted: boolean;
  // ... other props
}
```

### **State Management**
- **Restriction State**: Boolean flag for restriction status
- **Compliance State**: User's compliance toggle preference
- **UI State**: Interface enabled/disabled state
- **Warning State**: Compliance warning display state

### **Styling**
- **Restriction Banner**: Red background with warning styling
- **Disabled Interface**: Grayed out with overlay message
- **Warning Colors**: Red for restrictions, amber for warnings
- **Accessibility**: High contrast for compliance messaging

## User Guidance

### **For Restricted Users**
1. **Understand Restrictions**: Read compliance information carefully
2. **Verify Eligibility**: Ensure you're legally allowed to trade
3. **Seek Professional Advice**: Consult legal/financial professionals
4. **Consider Alternatives**: Explore other investment options

### **For Eligible Users**
1. **Enable Compliance**: Toggle regulated assets if eligible
2. **Read Warnings**: Understand compliance requirements
3. **Stay Informed**: Monitor regulatory changes
4. **Comply with Laws**: Follow all applicable regulations

## Compliance Resources

### **Legal Information**
- **Terms of Use**: Detailed terms and conditions
- **Privacy Policy**: Data handling and privacy information
- **Risk Disclosures**: Comprehensive risk information
- **Regulatory Updates**: Information about regulatory changes

### **Professional Resources**
- **Legal Counsel**: Consult with securities lawyers
- **Financial Advisors**: Professional investment advice
- **Compliance Officers**: Corporate compliance guidance
- **Regulatory Bodies**: Official regulatory information

## FAQ

### **Why am I seeing a restriction banner?**
You're accessing from a jurisdiction where tokenized securities trading may be restricted or prohibited.

### **Can I still use Vaulto Swap?**
Access depends on your jurisdiction and the type of restriction. Some users may have limited access.

### **How do I know if I'm eligible to trade?**
Consult with legal and financial professionals in your jurisdiction to determine eligibility.

### **What should I do if I think I'm eligible?**
Review the compliance requirements and seek professional advice before trading.

### **Will restrictions change?**
Restrictions may change based on regulatory developments. Monitor official communications for updates.

## Support

### **Compliance Questions**
- **Legal Questions**: Consult with legal professionals
- **Technical Issues**: Contact technical support
- **General Questions**: Check FAQ and documentation

### **Contact Information**
- **Legal Inquiries**: legal@vaulto.ai
- **Compliance Questions**: compliance@vaulto.ai
- **General Support**: [Support](resources/support.md)

---

**Important**: Geographic restrictions are implemented for regulatory compliance. Always ensure you understand and comply with applicable laws before trading tokenized securities.
