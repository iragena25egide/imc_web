"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Gallery({
  isCarousel = false,
  dict,
  lang = "en",
}: {
  isCarousel?: boolean;
  dict?: any;
  lang?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [videoItems, setVideoItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fallbackGallery = dict ? [
        { src: "/images/gallery/casetelite.jpg", title: dict.items?.casetelite?.title || "Cassiterite Production", subtitle: dict.items?.casetelite?.subtitle || "Minerals" },
        { src: "/images/gallery/tunnel.jpg", title: dict.items?.tunnel?.title || "Underground Tunnel", subtitle: dict.items?.tunnel?.subtitle || "Extraction" },
        { src: "/images/gallery/workers.jpg", title: dict.items?.workers?.title || "Our Mining Team", subtitle: dict.items?.workers?.subtitle || "Workforce" },
        { src: "/images/gallery/igisubizo tunnel.jpg", title: dict.items?.igisubizo?.title || "Igisubizo Tunnel", subtitle: dict.items?.igisubizo?.subtitle || "Operations" },
        { src: "/images/gallery/work imc.jpg", title: dict.items?.workImc?.title || "Active Operations", subtitle: dict.items?.workImc?.subtitle || "Site Work" },
        { src: "/images/gallery/tools.jpg", title: dict.items?.tools?.title || "Mining Equipment", subtitle: dict.items?.tools?.subtitle || "Tools" },
        { src: "/images/gallery/market.jpg", title: dict.items?.market?.title || "Mineral Market", subtitle: dict.items?.market?.subtitle || "Commercialization" },
        { src: "/images/gallery/tool.jpg", title: dict.items?.tool?.title || "Precision Tools", subtitle: dict.items?.tool?.subtitle || "Equipment" },
        { src: "/images/gallery/umubatizo_2.JPG.jpeg", title: dict.items?.events?.title || "Company Events", subtitle: dict.items?.events?.subtitle || "Community" },
        { src: "/certificate.jpeg", title: dict.items?.certificate?.title || "Company Certificate", subtitle: dict.items?.certificate?.subtitle || "Certification" },
      ] : [];
      
      const fallbackVideos = dict ? [
        { id: "5otZfK3zv54", src: "https://img.youtube.com/vi/5otZfK3zv54/hqdefault.jpg", title: dict.videos?.v1?.title || "Mining Process Overview", subtitle: dict.videos?.v1?.subtitle || "Documentary" },
        { id: "_UKMhL8eBXM", src: "https://img.youtube.com/vi/_UKMhL8eBXM/hqdefault.jpg", title: dict.videos?.v2?.title || "Community Impact", subtitle: dict.videos?.v2?.subtitle || "Initiatives" },
        { id: "syCiyBPRS0Y", src: "https://img.youtube.com/vi/syCiyBPRS0Y/hqdefault.jpg", title: dict.videos?.v3?.title || "Safety First", subtitle: dict.videos?.v3?.subtitle || "Training" }
      ] : [];

      try {
        const [galleryRes, videoRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/gallery`).catch(() => null),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/video`).catch(() => null)
        ]);
        
        let loadedGallery = fallbackGallery;
        if (galleryRes && galleryRes.ok) {
          const galleryData = await galleryRes.json();
          if (galleryData && galleryData.length > 0) {
            const sortedGalleryData = [...galleryData].sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
            loadedGallery = sortedGalleryData.map((item: any) => ({
              src: item.url?.startsWith('http') || item.url?.startsWith('/') ? item.url : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}${item.url}`,
              title: item.title,
              subtitle: "Media"
            }));
          }
        }
        setGalleryItems(loadedGallery);
        
        let loadedVideos = fallbackVideos;
        if (videoRes && videoRes.ok) {
          const videoData = await videoRes.json();
          if (videoData && videoData.length > 0) {
            const sortedVideoData = [...videoData].sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
            loadedVideos = sortedVideoData.map((item: any) => {
              let id = "default";
              try {
                const url = new URL(item.youtubeLink);
                id = url.searchParams.get("v") || url.pathname.split('/').pop() || "default";
              } catch (e) {}
              return {
                id: id,
                src: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
                title: item.title,
                subtitle: "Video"
              };
            });
          }
        }
        setVideoItems(loadedVideos);
      } catch (err) {
        console.error("Failed to fetch gallery items", err);
        setGalleryItems(fallbackGallery);
        setVideoItems(fallbackVideos);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  useEffect(() => {
    // Basic fallback to read query param on mount if next/navigation isn't imported
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get("tab");
      if (tab === "videos") setActiveTab("videos");
    }
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events to update progress bar
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  // Auto-scroll logic for carousel mode
  useEffect(() => {
    if (!isCarousel) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const cardWidth =
          (container.children[0] as HTMLElement)?.offsetWidth || 0;
        const gap = window.innerWidth >= 1024 ? 32 : 24;
        const scrollAmount = cardWidth + gap;

        let nextScroll = container.scrollLeft + scrollAmount;
        if (nextScroll >= container.scrollWidth - container.clientWidth - 10) {
          nextScroll = 0;
        }
        container.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isCarousel]);

  return (
    <section
      id="gallery"
      className="py-16 lg:py-32 bg-slate-50 bg-mountain-pattern overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">
              {dict?.subtitle || "Our Operations"}
            </h2>
            <p className="mt-4 text-4xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-5xl">
              {dict?.title || "Photo Gallery"}
            </p>
            <div className="mt-6 w-20 h-1 bg-imc-gold rounded-full" />
          </div>
          {isCarousel && (
            <Link 
              href={`/${lang}/gallery`}
              className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-imc-blue hover:text-imc-gold transition-colors group"
            >
              {dict?.viewAll || "View All Photos"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {isCarousel ? (
          // Carousel Mode
          <div className="w-full relative">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: Math.min(index * 0.1, 0.5),
                    duration: 0.5,
                  }}
                  onClick={() => setSelectedIndex(index)}
                  className="flex-shrink-0 snap-start w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.3333%-1.33rem)] h-64 sm:h-72 rounded-2xl shadow-sm hover:shadow-xl overflow-hidden relative cursor-pointer border border-slate-200 bg-white flex flex-col transition-all duration-300 group"
                >
                  <div className="relative w-full h-[65%] overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-imc-blue-dark/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="w-full h-[35%] px-5 flex flex-col justify-center bg-white">
                    <p className="font-bold tracking-wide uppercase text-[10px] mb-1 text-imc-gold truncate">
                      {item.subtitle}
                    </p>
                    <p className="font-heading text-base font-semibold text-imc-blue-dark truncate">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Progress Indicator */}
            <div className="w-full max-w-sm mx-auto mt-8 h-1 bg-slate-200 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-imc-gold transition-all duration-300 ease-out"
                style={{ width: `${Math.max(5, scrollProgress)}%` }}
              />
            </div>
          </div>
        ) : (
          // Grid Mode (Gallery Page)
          <div className="flex flex-col">
            <div className="flex justify-center mb-10">
              <div className="bg-white rounded-full shadow-sm p-1 inline-flex w-full max-w-[280px] sm:max-w-none sm:w-auto overflow-hidden">
                <button
                  onClick={() => setActiveTab("images")}
                  className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${activeTab === "images" ? "bg-imc-blue-dark text-white shadow-md" : "text-slate-500 hover:text-imc-blue"}`}
                >
                  {dict?.tabImages || "Images"}
                </button>
                <button
                  onClick={() => setActiveTab("videos")}
                  className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${activeTab === "videos" ? "bg-imc-blue-dark text-white shadow-md" : "text-slate-500 hover:text-imc-blue"}`}
                >
                  {dict?.tabVideos || "Videos"}
                </button>
              </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {(activeTab === "images" ? galleryItems : videoItems).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    onClick={() => setSelectedIndex(index)}
                    className="w-full aspect-[4/5] rounded-3xl shadow-sm hover:shadow-xl overflow-hidden relative cursor-pointer border border-slate-200 bg-white flex flex-col transition-all duration-300 group"
                  >
                    <div className="relative w-full h-[70%] overflow-hidden bg-slate-900">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${activeTab === "videos" ? "opacity-80 group-hover:opacity-100" : "opacity-90"}`}
                        unoptimized={activeTab === "videos"}
                      />
                      {activeTab === "videos" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 bg-imc-gold/90 text-white rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-imc-blue-dark/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                    </div>
                    <div className="w-full h-[30%] px-6 flex flex-col justify-center bg-white">
                      <p className="font-bold tracking-wide uppercase text-xs mb-1 text-imc-gold truncate">
                        {item.subtitle}
                      </p>
                      <p className="font-heading text-lg font-semibold text-imc-blue-dark truncate">
                        {item.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full flex flex-col md:flex-row max-h-[90vh] relative"
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white backdrop-blur-sm text-slate-800 rounded-full shadow-md transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full md:w-3/5 h-64 md:h-[600px] bg-slate-900 flex items-center justify-center">
                {activeTab === "videos" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoItems[selectedIndex]?.id}?autoplay=1`}
                    title={videoItems[selectedIndex]?.title}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={galleryItems[selectedIndex].src}
                    alt={galleryItems[selectedIndex].title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-slate-50">
                <p className="font-bold tracking-widest uppercase text-sm mb-3 text-imc-gold">
                  {(activeTab === "images" ? galleryItems : videoItems)[selectedIndex].subtitle}
                </p>
                <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-imc-blue-dark mb-6 leading-tight">
                  {(activeTab === "images" ? galleryItems : videoItems)[selectedIndex].title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                  {dict?.modalDesc ||
                    "This item gives a closer look at our daily operations and highlights our commitment to excellence, sustainability, and community progress across our facilities."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
