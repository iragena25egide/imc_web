import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
export default function Footer({ dict, navDict, lang = "en" }: { dict?: any, navDict?: any, lang?: string }) {
  return (
    <footer className="relative bg-imc-blue-dark text-white pt-12 pb-8 border-t-0 ">
      {/* GetWave SVG Divider at top of footer */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 transform -translate-y-full translate-y-[1px]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[30px] lg:h-[60px]"
          style={{ fill: "#00366D" }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6 inline-block">
              <h2 className="text-lg md:text-xl font-heading font-extrabold tracking-tight text-white uppercase leading-none">
                Interafrican
                <br />
                <span className="text-imc-gold">Mining Corp</span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 mb-6 max-w-sm leading-relaxed">
              {dict?.desc || "Interafrican Mining Corporation. Leading sustainable and responsible mining operations in the heart of Rwanda."}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xs tracking-widest uppercase mb-5 text-imc-gold">
              {dict?.links || "Quick Links"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}#home`}
                  className="text-xs tracking-wide uppercase text-slate-300 hover:text-white transition-colors"
                >
                  {navDict?.home || "Home"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#about`}
                  className="text-xs tracking-wide uppercase text-slate-300 hover:text-white transition-colors"
                >
                  {navDict?.about || "About Us"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#gallery`}
                  className="text-xs tracking-wide uppercase text-slate-300 hover:text-white transition-colors"
                >
                  {navDict?.gallery || "Gallery"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#news`}
                  className="text-xs tracking-wide uppercase text-slate-300 hover:text-white transition-colors"
                >
                  {navDict?.news || "News"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#publication`}
                  className="text-xs tracking-wide uppercase text-slate-300 hover:text-white transition-colors"
                >
                  {navDict?.publication || "Publication"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-xs tracking-wide uppercase text-slate-300 hover:text-white transition-colors"
                >
                  {navDict?.contact || "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xs tracking-widest uppercase mb-5 text-imc-gold">
              {dict?.contact || "Contact Us"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-imc-gold mt-0.5 shrink-0" size={16} />
                <span className="text-xs text-slate-300 leading-relaxed">
                  {dict?.location1 || "Muhanga District, Southern Province"}
                  <br />
                  {dict?.location2 || "Rwanda"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-imc-gold shrink-0" size={16} />
                <span className="text-xs text-slate-300">
                  {dict?.phone || "+250 (0) 788 000 000"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-imc-gold shrink-0" size={16} />
                <span className="text-xs text-slate-300">
                  {dict?.email || "info@interafricanmining.com"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-slate-200 text-[10px] uppercase tracking-widest flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Interafrican Mining Corporation.
            {dict?.rights || "All rights reserved."}
          </p>
          <p className="mt-2 md:mt-0">POWERED BY PIN MEDIA.</p>
        </div>
      </div>
    </footer>
  );
}
