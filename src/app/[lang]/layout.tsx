import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "../globals.css";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import CookieBanner from "@/components/ui/CookieBanner";
import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  const title = dict.meta?.title || "Interafrican Mining Corporation";
  const description = dict.meta?.description || "Leading sustainable mining operations in Rwanda, specializing in cassiterite and coltan.";

  return {
    metadataBase: new URL('https://www.imcrwanda.com'),
    title: {
      default: title,
      template: `%s | Interafrican Mining Corporation`,
    },
    description: description,
    keywords: ["Mining", "Rwanda", "Coltan", "Cassiterite", "Sustainable Mining", "IMC", "Interafrican Mining Corporation", "Minerals"],
    openGraph: {
      title: title,
      description: description,
      url: 'https://www.imcrwanda.com',
      siteName: 'Interafrican Mining Corporation',
      images: [
        {
          url: '/logo.png',
          width: 512,
          height: 512,
          alt: 'Interafrican Mining Corporation Logo',
        },
      ],
      locale: resolvedParams.lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/logo.png'],
    },
    alternates: {
      canonical: `https://www.imcrwanda.com/${resolvedParams.lang}`,
      languages: {
        'en': 'https://www.imcrwanda.com/en',
        'rw': 'https://www.imcrwanda.com/rw',
      },
    },
    icons: {
      icon: '/logo-icon.png',
      shortcut: '/logo-icon.png',
      apple: '/logo-icon.png',
    },
    verification: {
      google: 'googlec260c118dee202b2',
    },
  };
}

// JSON-LD structured data for Google to show logo and organization info
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Interafrican Mining Corporation",
  "alternateName": "IMC Rwanda",
  "url": "https://www.imcrwanda.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.imcrwanda.com/logo.png",
    "width": 512,
    "height": 512,
  },
  "image": "https://www.imcrwanda.com/logo.png",
  "description": "Leading sustainable mining operations in Rwanda, specializing in cassiterite and coltan extraction.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RW",
    "addressRegion": "Rwanda",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+250781579376",
    "contactType": "customer service",
  },
  "sameAs": [
    "https://www.imcrwanda.com",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Interafrican Mining Corporation",
  "url": "https://www.imcrwanda.com",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  return (
    <html
      lang={resolvedParams.lang}
      className={`${libreFranklin.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD structured data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CookieBanner dict={dict.cookieBanner} />
        <WhatsAppWidget dict={dict.whatsapp} />
      </body>
    </html>
  );
}
