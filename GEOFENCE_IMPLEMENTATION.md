# Geofence Restriction Implementation

## Overview
This implementation adds a restriction banner and functionality to prevent users from restricted jurisdictions from using the swap interface.

## Components Added/Modified

### 1. New Component: `RestrictionBanner.tsx`
- **Location**: `/app/components/RestrictionBanner.tsx`
- **Features**:
  - Red warning banner with animated entrance/exit
  - Warning icon and clear messaging about restricted access
  - Link to Terms of Use
  - Toggleable close button (for testing purposes)
  - Smooth animations using Framer Motion

### 2. Modified: `page.tsx`
- **Changes**:
  - Added state management for restriction toggle (`isRestricted`)
  - Integrated `RestrictionBanner` component below the header
  - Added testing toggle button in header (remove in production)
  - Modified connect wallet button to turn red when restricted
  - Passes restriction state to `SwapInterface`

### 3. Modified: `SwapInterface.tsx`
- **Changes**:
  - Added `isRestricted` prop to interface
  - Disabled all interactions when restricted (opacity + pointer-events-none)
  - Added overlay message: "Trading Disabled: Restricted Region"
  - Passes disabled state to `SwapButton`

### 4. Modified: `SwapButton.tsx`
- **Changes**:
  - Added `disabled` prop to handle restriction
  - Updated button content to show "Trading Restricted" when disabled
  - Included disabled check in the isDisabled logic

## Testing

### Enable Restriction:
1. Click the "Restrict" toggle button in the header
2. Verify the red banner appears below the header
3. Verify the connect wallet button turns red
4. Verify the swap interface becomes disabled/grayed out
5. Verify all interactions are blocked

### Disable Restriction:
1. Click the "Unrestrict" button or the X on the banner
2. Verify the banner disappears
3. Verify the connect wallet button returns to amber/yellow
4. Verify the swap interface becomes active again

## Production Deployment

### Remove Testing Controls:
1. **In `page.tsx`**: Remove the toggle button (lines ~49-55)
2. **In `RestrictionBanner.tsx`**: Remove or make `onToggle` prop optional

### Implement Real Geolocation:
Replace the manual toggle with actual geolocation detection:

```typescript
// Example implementation
import { useEffect } from 'react';

export default function Home() {
  const [isRestricted, setIsRestricted] = useState(false);
  
  useEffect(() => {
    // Fetch user's location
    fetch('/api/check-location')
      .then(res => res.json())
      .then(data => {
        setIsRestricted(data.isRestricted);
      })
      .catch(() => {
        // Default to restricted on error for safety
        setIsRestricted(true);
      });
  }, []);
  
  // ... rest of component
}
```

### Create Backend Endpoint:
Create `/api/check-location/route.ts`:

```typescript
import { NextResponse } from 'next/server';

const RESTRICTED_COUNTRIES = ['US', 'KP', 'IR', 'SY', 'CU', /* etc */];

export async function GET(request: Request) {
  // Get IP from request
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  
  // Use a geolocation service (e.g., ipapi.co, MaxMind, etc.)
  const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
  const geoData = await geoResponse.json();
  
  const isRestricted = RESTRICTED_COUNTRIES.includes(geoData.country_code);
  
  return NextResponse.json({ isRestricted, country: geoData.country_code });
}
```

## Banner Message
The banner displays the following text:

> You are accessing our products and services from a restricted jurisdiction. We do not allow access from certain jurisdictions including locations subject to sanctions restrictions and other jurisdictions where our services are ineligible for use. For more information, see our Terms of Use.

## Styling Details

### Restriction Banner:
- Background: Red (`bg-red-600/95`)
- Border: Red (`border-red-500`)
- Text: White with high contrast
- Animation: Smooth height/opacity transition

### Connect Button (Restricted):
- Background: Red gradient (`from-red-600 to-red-700`)
- Hover: Darker red (`from-red-700 to-red-800`)
- Text: White

### Connect Button (Normal):
- Background: Amber gradient (`from-yellow-500 to-amber-600`)
- Hover: Darker amber (`from-yellow-600 to-amber-700`)
- Text: Black

### Swap Interface (Restricted):
- Opacity: 50%
- Pointer Events: None
- Overlay: Red semi-transparent with "Trading Disabled" message

## Security Considerations

1. **Server-Side Enforcement**: Always enforce restrictions on the backend/smart contract level
2. **VPN Detection**: Consider using VPN detection services for additional security
3. **Persistent Checking**: Re-check location periodically during the session
4. **Fallback**: Default to restricted if geolocation service fails
5. **Legal Compliance**: Consult with legal team on specific jurisdictions to restrict

## Dependencies Used
- `framer-motion`: For smooth animations (already in project)
- No additional dependencies required

## Files Modified
1. `/app/components/RestrictionBanner.tsx` (new)
2. `/app/page.tsx` (modified)
3. `/app/components/swap/SwapInterface.tsx` (modified)
4. `/app/components/swap/SwapButton.tsx` (modified)

