import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Gallery from "@/components/sections/Gallery";
import { getDictionary, Locale } from "@/dictionaries";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  return {
    title: `${dict.headers?.gallery?.title || "Photo Gallery"} | Interafrican Mining Corp`,
    description: dict.headers?.gallery?.desc || "A visual journey through our mining operations, facilities, and community initiatives.",
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  
  return (
    <main className="flex-1 flex flex-col w-full">
      <Navbar dict={dict.navigation} lang={resolvedParams.lang} />
      <PageHeader 
        title={dict.headers?.gallery?.title || "Photo Gallery"} 
        description={dict.headers?.gallery?.desc} 
      />
      <Gallery dict={dict.gallery} lang={resolvedParams.lang} />
      <Footer dict={dict.footer} navDict={dict.navigation} lang={resolvedParams.lang} />
    </main>
  );
}
