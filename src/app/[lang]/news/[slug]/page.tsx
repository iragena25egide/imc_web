import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  const articles = dict.newsData?.articles || [];
  const article = articles.find((a: any) => a.slug === resolvedParams.slug);

  return {
    title: article ? `${article.title} | Interafrican Mining Corp` : "Article Not Found | Interafrican Mining Corp",
    description: article?.excerpt || "Read the latest news from Interafrican Mining Corporation.",
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as Locale);
  
  const articles = dict.newsData?.articles || [];
  const article = articles.find((a: any) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col w-full bg-white bg-mountain-pattern min-h-screen">
      <Navbar dict={dict.navigation} lang={resolvedParams.lang} />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10 w-full flex-1">
        <Link 
          href={`/${resolvedParams.lang}/news`} 
          className="inline-flex items-center text-sm tracking-widest uppercase text-imc-blue font-bold hover:text-imc-blue-light transition-colors mb-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>
        
        <header className="mb-12">
          <div className="text-sm font-bold tracking-widest uppercase text-imc-gold mb-4">
            {article.date}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-imc-blue-dark leading-tight">
            {article.title}
          </h1>
          <div className="mt-8 w-20 h-1 bg-imc-gold rounded-full" />
        </header>

        <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
          {article.content.split('\n\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-6">{paragraph}</p>
          ))}
        </div>
      </article>

      <Footer dict={dict.footer} navDict={dict.navigation} lang={resolvedParams.lang} />
    </main>
  );
}
