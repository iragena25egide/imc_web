"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({
  dict,
  lang = "en",
}: {
  dict?: any;
  lang?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: dict?.home || "Home", href: `/${lang}` },
    { name: dict?.about || "About Us", href: `/${lang}/about` },
    {
      name: dict?.gallery || "Gallery",
      href: `/${lang}/gallery`,
      hasDropdown: true,
      dropdownItems: [
        {
          name: dict?.galleryImages || "Images",
          href: `/${lang}/gallery?tab=images`,
        },
        {
          name: dict?.galleryVideos || "Videos",
          href: `/${lang}/gallery?tab=videos`,
        },
      ],
    },
    { name: dict?.news || "News", href: `/${lang}/news` },
    { name: dict?.publication || "Publication", href: `/${lang}/publication` },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-md border-b border-white/20" : "bg-white shadow-sm border-b border-slate-100"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-28">
          <div className="flex items-center">
            <Link
              href={`/${lang}`}
              className="flex flex-col items-center justify-center pt-1"
            >
              <Image
                src="/logo-icon.png"
                alt="IMC Logo"
                width={110}
                height={48}
                className="object-contain w-[80px] md:w-[100px] lg:w-[110px] h-auto shrink-0 mb-1"
                priority
              />
              <span className="font-heading text-[8px] sm:text-[9px] md:text-[9px] lg:text-9px] tracking-widest text-imc-blue-dark text-center leading-none uppercase">
                Interafrican Mining Corporation
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-8 items-center">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() =>
                    link.hasDropdown && setIsGalleryDropdownOpen(true)
                  }
                  onMouseLeave={() =>
                    link.hasDropdown && setIsGalleryDropdownOpen(false)
                  }
                >
                  <Link
                    href={link.href}
                    className="font-medium text-xs tracking-widest uppercase text-imc-blue-dark transition-colors hover:text-imc-blue-light flex items-center gap-1"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isGalleryDropdownOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {link.hasDropdown && (
                    <AnimatePresence>
                      {isGalleryDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-2 w-40 bg-white shadow-xl rounded-lg border border-slate-100 overflow-hidden"
                        >
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-3 text-xs tracking-widest uppercase text-slate-700 hover:bg-imc-blue/5 hover:text-imc-blue transition-colors border-b border-slate-50 last:border-0"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 border-l border-slate-200 pl-6 ml-2">
              <Link
                href={`/${lang}/contact`}
                className="flex items-center gap-2 px-6 py-2.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-imc-blue-dark text-white hover:bg-imc-blue-dark/90 shadow-md hover:shadow-lg"
              >
                <span>{dict?.contact || "Contact Us"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-imc-blue-dark"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-2xl relative z-50"
          >
            <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col bg-white">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => !link.hasDropdown && setIsOpen(false)}
                    className="flex justify-between items-center px-4 py-3 text-sm font-bold tracking-widest uppercase text-slate-800 hover:text-imc-blue hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="pl-6 flex flex-col gap-1 border-l-2 border-slate-200 ml-4 mt-2 mb-2">
                      {link.dropdownItems?.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-imc-blue transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href={`/${lang}/contact`}
                onClick={() => setIsOpen(false)}
                className="mt-4 mx-3 px-5 py-3 text-center rounded-xl text-sm tracking-widest uppercase font-bold bg-imc-blue text-white hover:bg-imc-blue-light transition-colors"
              >
                {dict?.contact || "Contact Us"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
