import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PMD Consulting - Strategic Business Solutions & Digital Transformation",
  description: "Transform your business with PMD Consulting. We provide strategic planning, digital transformation, process optimization, and market analysis services to drive sustainable growth and innovation.",
  keywords: [
    "business consulting",
    "strategic planning",
    "digital transformation",
    "process optimization",
    "market analysis",
    "change management",
    "performance consulting",
    "PMD Consulting"
  ],
  authors: [{ name: "PMD Consulting" }],
  creator: "PMD Consulting",
  publisher: "PMD Consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pmdconsulting.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PMD Consulting - Strategic Business Solutions",
    description: "Transform your business with PMD Consulting. Strategic solutions that drive growth, innovation, and sustainable success.",
    url: "https://pmdconsulting.com",
    siteName: "PMD Consulting",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PMD Consulting - Strategic Business Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PMD Consulting - Strategic Business Solutions",
    description: "Transform your business with PMD Consulting. Strategic solutions that drive growth, innovation, and sustainable success.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#ff6b35" />
        <meta name="msapplication-TileColor" content="#ff6b35" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PMD Consulting",
              "url": "https://pmdconsulting.com",
              "logo": "https://pmdconsulting.com/logo.png",
              "description": "Strategic business consulting services specializing in digital transformation, process optimization, and market analysis.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Business District, Suite 100",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "postalCode": "10001",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "hello@pmdconsulting.com"
              },
              "sameAs": [
                "https://linkedin.com/company/pmd-consulting",
                "https://twitter.com/pmdconsulting"
              ],
              "serviceType": [
                "Strategic Planning",
                "Digital Transformation",
                "Process Optimization",
                "Market Analysis",
                "Change Management",
                "Performance Consulting"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
