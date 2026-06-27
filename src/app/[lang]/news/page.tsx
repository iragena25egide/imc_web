import Navbar from "@/components/ui/Navbar";
import News from "@/components/sections/News";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  return {
    title: `${dict.headers?.news?.title || "Company News"} | Interafrican Mining Corp`,
    description: dict.headers?.news?.desc || "Stay updated with the latest news, announcements, and developments at IMC.",
  };
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);

  return (
    <main className="flex-1 flex flex-col w-full min-h-screen">
      <Navbar dict={dict.navigation} lang={resolvedParams.lang} />
      <PageHeader 
        title={dict.headers?.news?.title || "Company News"} 
        description={dict.headers?.news?.desc} 
      />
      <div className="flex-1">
        <News dict={dict.newsData} />
      </div>
      <Footer dict={dict.footer} navDict={dict.navigation} lang={resolvedParams.lang} />
    </main>
  );
}
