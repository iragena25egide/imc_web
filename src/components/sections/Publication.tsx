"use client";

import { motion } from "framer-motion";
import { Download, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Publication({ limit, dict, dbPublications }: { limit?: number, dict?: any, dbPublications?: any[] }) {
  const params = useParams();
  const lang = params?.lang || "en";

  const items = dbPublications && dbPublications.length > 0 ? dbPublications : (dict?.items || []);
  const sortedItems = [...items].sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt || a.date || 0).getTime();
    const dateB = new Date(b.createdAt || b.date || 0).getTime();
    return dateB - dateA; // Newest first
  });
  const displayedPublications = limit
    ? sortedItems.slice(0, limit)
    : sortedItems;

  return (
    <section
      id="publication"
      className="py-8 lg:py-12 bg-slate-50 bg-mountain-pattern border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 max-w-4xl mx-auto text-left">
          <div>
            <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">
              {dict?.subtitle || "Resources"}
            </h2>
            <p className="mt-4 text-2xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-5xl">
              {dict?.title || "Publications & Reports"}
            </p>
            <div className="mt-6 w-20 h-1 bg-imc-gold rounded-full" />
          </div>
          {limit && (
            <Link
              href={`/${lang}/publication`}
              className="hidden sm:flex items-center text-sm tracking-widest uppercase text-imc-blue font-bold hover:text-imc-blue-light transition-colors mt-8 md:mt-0"
            >
              {dict?.viewAll || "View All"} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {displayedPublications.map((pub: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-imc-blue/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-5">
                <div className="p-4 bg-slate-50 border border-slate-100 group-hover:bg-imc-blue/10 text-imc-blue rounded-xl transition-colors">
                  <FileText className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-xs font-bold text-imc-gold uppercase tracking-widest mb-2">
                    {pub.category || "Document"}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-imc-blue-dark group-hover:text-imc-blue transition-colors">
                    {pub.title}
                  </h3>
                </div>
              </div>
              <a
                href={pub.fileUrl?.startsWith('http') || pub.fileUrl?.startsWith('/') ? pub.fileUrl : `http://localhost:3005${pub.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 text-slate-400 hover:text-white hover:bg-imc-blue rounded-full transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100 block"
              >
                <Download className="h-6 w-6" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
