"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function News({ limit, dict, dbArticles }: { limit?: number, dict?: any, dbArticles?: any[] }) {
  const params = useParams();
  const lang = params?.lang || "en";

  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/news`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        } else {
          setArticles(dict?.articles || []);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setArticles(dict?.articles || []);
        setIsLoading(false);
      });
  }, []);

  const sortedArticles = [...articles].sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt || a.date || 0).getTime();
    const dateB = new Date(b.createdAt || b.date || 0).getTime();
    return dateB - dateA;
  });
  const displayedArticles = limit ? sortedArticles.slice(0, limit) : sortedArticles;

  return (
    <section
      id="news"
      className="py-8 lg:py-12 bg-white bg-mountain-pattern overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">
              {dict?.subtitle || "Latest Updates"}
            </h2>
            <p className="mt-4 text-2xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-5xl">
              {dict?.title || "Company News"}
            </p>
            <div className="mt-6 w-20 h-1 bg-imc-gold rounded-full" />
          </div>
          {limit && (
            <Link
              href={`/${lang}/news`}
              className="hidden sm:flex items-center text-sm tracking-widest uppercase text-imc-blue font-bold hover:text-imc-blue-light transition-colors mt-8 md:mt-0"
            >
              {dict?.viewAll || "View All News"} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-3 flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-imc-blue border-t-transparent rounded-full animate-spin" />
            </div>
          ) : displayedArticles.length === 0 ? (
            <p className="col-span-3 text-center text-slate-400 py-12">No news articles available yet.</p>
          ) : (
            displayedArticles.map((article: any, index: number) => (
              <motion.div
                key={article.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-slate-50 rounded-3xl p-10 border border-slate-200 hover:shadow-lg hover:border-imc-blue/30 transition-all duration-300 group relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-imc-gold transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div className="text-xs font-bold tracking-widest uppercase text-imc-gold mb-4">
                  {article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : article.date}
                </div>
                <h3 className="text-2xl font-bold font-heading text-imc-blue-dark mb-4 group-hover:text-imc-blue transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                  {article.excerpt || (article.content ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '')}
                </p>
                <Link
                  href={`/${lang}/news/${article.slug || (article.title ? article.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : article.id)}`}
                  className="text-sm tracking-widest uppercase text-imc-blue-dark font-bold group-hover:text-imc-blue transition-colors inline-flex items-center self-start mt-auto"
                >
                  {dict?.readMore || "Read More"}
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
