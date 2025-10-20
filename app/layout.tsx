import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://app.vaulto.ai'),
  title: {
    default: "Vaulto Swap",
    template: "%s | Vaulto Swap"
  },
  description: "Trade tokenized stocks with stablecoins on Vaulto Swap. Secure DeFi trading with CoW Protocol integration for optimal pricing and MEV protection.",
  keywords: [
    "tokenized stocks",
    "DeFi trading",
    "stablecoin swap",
    "crypto trading",
    "tokenized securities",
    "TSLA token",
    "AAPL token",
    "stock tokens",
    "decentralized exchange",
    "private investing",
    "blockchain trading",
    "Web3 finance"
  ],
  authors: [{ name: "Vaulto" }],
  creator: "Vaulto",
  publisher: "Vaulto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://app.vaulto.ai",
    title: "Vaulto Swap | Trade Anywhere, Anytime",
    description: "Trade tokenized stocks with stablecoins on Vaulto Swap. Secure DeFi trading with CoW Protocol integration.",
    siteName: "Vaulto Swap",
    images: [
      {
        url: "/socialad.png",
        width: 1200,
        height: 630,
        alt: "Vaulto Swap - Tokenized Stock Trading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulto Swap | Tokenized Stock Trading",
    description: "Trade tokenized stocks with stablecoins on Vaulto Swap.",
    creator: "@vaultoai",
    site: "@vaultoai",
    images: ["/socialad.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vaulto Swap",
    "url": "https://app.vaulto.ai",
    "description": "Trade tokenized stocks with stablecoins on Vaulto Swap. Secure DeFi trading with CoW Protocol integration.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "Vaulto",
      "url": "https://vaulto.ai",
      "logo": "https://app.vaulto.ai/favicon.png",
      "sameAs": [
        "https://twitter.com/vaultoai",
        "https://instagram.com/vaultoai",
        "https://linkedin.com/company/vaulto",
        "https://youtube.com/@vaultoai"
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

