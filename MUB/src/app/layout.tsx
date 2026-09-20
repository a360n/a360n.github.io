import type { Metadata, Viewport } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import generalInfo from '@/data/scraped/general_info.json';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  fallback: ['Tahoma', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mub.edu.iq'),
  title: {
    default: 'Malaysian University of Baghdad (MUB) | الجامعة الماليزية في بغداد',
    template: '%s | MUB — Malaysian University of Baghdad',
  },
  description: generalInfo.description.en,
  keywords: [
    'Malaysian University of Baghdad',
    'الجامعة الماليزية في بغداد',
    'MUB',
    'Palestine Street Baghdad',
    'Artificial Intelligence Iraq',
    'Mechatronics Engineering',
    'Computer Engineering',
    'Sustainable Energy',
    'Cyber Law Iraq',
    'UTP Malaysia Partner',
    'UMPSA Malaysia Partner',
    'MoHESR Accredited',
  ],
  authors: [{ name: 'Malaysian University of Baghdad' }],
  creator: 'Malaysian University of Baghdad',
  publisher: 'Malaysian University of Baghdad',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_IQ',
    url: 'https://mub.edu.iq',
    siteName: 'Malaysian University of Baghdad',
    title: 'Malaysian University of Baghdad (MUB) | Leading Digital Transformation',
    description: generalInfo.description.en,
    images: [
      {
        url: '/logo.png',
        width: 600,
        height: 600,
        alt: 'Malaysian University of Baghdad Official Emblem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malaysian University of Baghdad (MUB)',
    description: generalInfo.description.en,
    images: ['/logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0F1E36',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Malaysian University of Baghdad',
    alternateName: ['MUB', 'الجامعة الماليزية في بغداد'],
    url: 'https://mub.edu.iq',
    logo: 'https://mub.edu.iq/logo.png',
    description: generalInfo.description.en,
    address: {
      '@type': 'PostalAddress',
      streetAddress: generalInfo.address.street,
      addressLocality: generalInfo.address.city,
      postalCode: generalInfo.address.postalCode,
      addressCountry: 'IQ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: generalInfo.contact.phone,
      contactType: 'Admissions & Inquiries',
      email: generalInfo.contact.email,
      availableLanguage: ['English', 'Arabic'],
    },
  };

  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen selection:bg-amber-100 selection:text-amber-950">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
