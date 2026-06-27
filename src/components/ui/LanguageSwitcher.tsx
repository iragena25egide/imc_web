"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLang = (newLang: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLang; // replace the lang segment
    router.push(segments.join("/"));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", label: "ENG", flag: "https://flagcdn.com/w40/gb.png" },
    { code: "rw", label: "KINY", flag: "https://flagcdn.com/w40/rw.png" },
  ];

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
      >
        <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
          <img src={current.flag} alt={current.label} className="w-full h-full object-cover" />
        </div>
        <span className="font-bold text-sm tracking-wide uppercase text-imc-blue-dark hidden sm:block">
          {current.label}
        </span>
        <ChevronDown className="text-imc-blue-dark w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLang(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors ${currentLang === lang.code ? 'bg-slate-50 font-bold' : ''}`}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                <img src={lang.flag} alt={lang.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium text-slate-700">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
