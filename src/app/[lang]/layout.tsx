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
  return {
    title: dict.meta?.title || "Interafrican Mining Corporation",
    description: dict.meta?.description || "Leading sustainable mining operations in Rwanda.",
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
