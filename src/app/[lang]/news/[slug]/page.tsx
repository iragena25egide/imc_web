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
  let article = null;
  const identifier = resolvedParams.slug;
  
  try {
    const res = await fetch(`http://localhost:3005/news`);
    if (res.ok) {
      const data = await res.json();
      article = data.find((a: any) => {
        const generatedSlug = a.title ? a.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '';
        return generatedSlug === identifier || a.id.toString() === identifier;
      });
    }
  } catch (e) {}

  if (!article) {
    const articles = dict.newsData?.articles || [];
    article = articles.find((a: any) => a.slug === identifier || a.id?.toString() === identifier);
  }

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
  
  let article = null;
  const identifier = resolvedParams.slug; // Could be an id or a slug
  
  // Try fetching from backend first
  try {
    const res = await fetch(`http://localhost:3005/news`);
    if (res.ok) {
      const data = await res.json();
      // Assume the backend returns an array of news articles
      // Try to match by ID if it's a number, or generated slug
      article = data.find((a: any) => {
        const generatedSlug = a.title ? a.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '';
        return generatedSlug === identifier || a.id.toString() === identifier;
      });
    }
  } catch (error) {
    console.error("Failed to fetch article from backend", error);
  }

  // Fallback to local dictionary data
  if (!article) {
    const articles = dict.newsData?.articles || [];
    article = articles.find((a: any) => a.slug === identifier || a.id?.toString() === identifier);
  }

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
            {article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : article.date}
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
