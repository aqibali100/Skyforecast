import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkyForecast - Accurate Weather Forecasting & Weather Alerts',
  description: 'Get accurate weather forecasts, real-time weather conditions, and severe weather alerts for your location.',
  keywords: 'weather forecast, weather alerts, current weather, temperature, humidity, wind speed, weather conditions, meteorology',
  authors: [{ name: 'SkyForecast Team' }],
  creator: 'SkyForecast',
  publisher: 'SkyForecast',
  openGraph: {
    title: 'SkyForecast - Accurate Weather Forecasting',
    description: 'Professional weather forecasting service with real-time conditions and alerts',
    type: 'website',
    locale: 'en_US',
    siteName: 'SkyForecast',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkyForecast - Weather Forecasting',
    description: 'Accurate weather forecasts and real-time conditions',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#72c6f2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://skyforecast.com" />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'SkyForecast',
              description: 'Accurate weather forecasting and weather alerts',
              url: 'https://skyforecast.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://skyforecast.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        /> */}
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-sky-100 to-blue-50`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}