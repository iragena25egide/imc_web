import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import News from "@/components/sections/News";
import Publication from "@/components/sections/Publication";
import OperationsMap from "@/components/sections/OperationsMap";
import Footer from "@/components/ui/Footer";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  return {
    title: `Home | Interafrican Mining Corp`,
    description: dict.headers?.about?.desc || "Interafrican Mining Corporation. Leading sustainable and responsible mining operations in the heart of Rwanda.",
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  return (
    <main className="flex-1 flex flex-col w-full">
      <Navbar dict={dict.navigation} lang={resolvedParams.lang} />
      <Hero dict={dict.hero} lang={resolvedParams.lang} />
      <About dict={dict.about} />
      <Gallery isCarousel={true} dict={dict.gallery} lang={resolvedParams.lang} />
      <News limit={3} dict={dict.newsData} />
      <Publication limit={2} dict={dict.publicationData} />
      <OperationsMap dict={dict.operations} />
      <Footer dict={dict.footer} navDict={dict.navigation} lang={resolvedParams.lang} />
    </main>
  );
}
