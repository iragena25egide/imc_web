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
      template: `%s | IMC Rwanda`,
    },
    description: description,
    keywords: ["Mining", "Rwanda", "Coltan", "Cassiterite", "Sustainable Mining", "IMC", "Interafrican Mining Corporation", "Minerals"],
    openGraph: {
      title: title,
      description: description,
      url: 'https://www.imcrwanda.com',
      siteName: 'IMC Rwanda',
      images: [
        {
          url: '/logo.png',
          width: 800,
          height: 600,
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
  };
}

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
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CookieBanner dict={dict.cookieBanner} />
        <WhatsAppWidget dict={dict.whatsapp} />
      </body>
    </html>
  );
}
