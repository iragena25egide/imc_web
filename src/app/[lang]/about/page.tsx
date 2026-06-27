import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";
import About from "@/components/sections/About";
import CompanyBackground from "@/components/sections/CompanyBackground";
import Stats from "@/components/sections/Stats";
import Board from "@/components/sections/Board";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  return {
    title: `${dict.headers?.about?.title || "About Us"} | Interafrican Mining Corp`,
    description: dict.headers?.about?.desc || "Learn about our journey, mission, and commitment to sustainable mining in Rwanda.",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);

  return (
    <main className="flex-1 flex flex-col w-full">
      <Navbar dict={dict.navigation} lang={resolvedParams.lang} />
      <PageHeader 
        title={dict.headers?.about?.title || "About Us"} 
        description={dict.headers?.about?.desc} 
      />
      <CompanyBackground dict={dict.companyBackground} />
      <Stats dict={dict.stats} />
      <Board dict={dict.board} />
      <Footer dict={dict.footer} navDict={dict.navigation} lang={resolvedParams.lang} />
    </main>
  );
}
