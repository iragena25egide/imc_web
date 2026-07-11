import Navbar from "@/components/ui/Navbar";
import Publication from "@/components/sections/Publication";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  return {
    title: `${dict.headers?.publication?.title || "Publications"} | Interafrican Mining Corp`,
    description: dict.headers?.publication?.desc || "Access our reports, surveys, and framework documents.",
  };
}

export default async function PublicationPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);

  let dbPublications = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/publication`, { cache: 'no-store' });
    if (res.ok) {
      dbPublications = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch publications", err);
  }

  return (
    <main className="flex-1 flex flex-col w-full min-h-screen">
      <Navbar dict={dict.navigation} lang={resolvedParams.lang} />
      <PageHeader 
        title={dict.headers?.publication?.title || "Publications"} 
        description={dict.headers?.publication?.desc} 
      />
      <div className="flex-1">
        <Publication dict={dict.publicationData} dbPublications={dbPublications} />
      </div>
      <Footer dict={dict.footer} navDict={dict.navigation} lang={resolvedParams.lang} />
    </main>
  );
}
