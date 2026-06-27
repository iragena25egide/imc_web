import Navbar from "@/components/ui/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  return {
    title: `${dict.headers?.contact?.title || "Contact Us"} | Interafrican Mining Corp`,
    description: dict.headers?.contact?.desc || "Get in touch with our team for inquiries, partnerships, and more information.",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);

  return (
    <main className="flex-1 flex flex-col w-full min-h-screen">
      <Navbar dict={dict.navigation} lang={resolvedParams.lang} />
      <PageHeader 
        title={dict.headers?.contact?.title || "Contact Us"} 
        description={dict.headers?.contact?.desc} 
      />
      <div className="flex-1 bg-white">
        <Contact />
      </div>
      <Footer dict={dict.footer} navDict={dict.navigation} lang={resolvedParams.lang} />
    </main>
  );
}
