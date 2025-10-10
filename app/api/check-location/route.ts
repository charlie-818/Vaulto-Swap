import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Extract IP address from headers
    const ip = 
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
      request.headers.get('x-real-ip') || 
      '8.8.8.8'; // fallback for local development

    // Call ipapi.co to get country code
    const response = await fetch(`https://ipapi.co/${ip}/country_code/`, {
      headers: {
        'User-Agent': 'Vaulto-Swap/1.0',
      },
    });

    if (!response.ok) {
      // If the API fails, default to allowed (not restricted)
      console.warn('Geolocation API failed, defaulting to allowed access');
      return NextResponse.json({ isRestricted: false, error: 'API unavailable' });
    }

    const countryCode = await response.text();
    const isRestricted = countryCode.trim().toUpperCase() === 'US';

    return NextResponse.json({ 
      isRestricted,
      countryCode: countryCode.trim(),
    });
  } catch (error) {
    // On any error, default to allowed (not restricted) for better UX
    console.error('Error checking location:', error);
    return NextResponse.json({ isRestricted: false, error: 'Check failed' });
  }
}

