"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, FileText, Video, UploadCloud } from "lucide-react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    gallery: 0,
    news: 0,
    publications: 0,
    videos: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [galleryRes, newsRes, publicationsRes, videosRes] = await Promise.all([
          fetch("http://localhost:3005/gallery"),
          fetch("http://localhost:3005/news"),
          fetch("http://localhost:3005/publication"),
          fetch("http://localhost:3005/video"),
        ]);

        const [galleryData, newsData, publicationsData, videosData] = await Promise.all([
          galleryRes.json(),
          newsRes.json(),
          publicationsRes.json(),
          videosRes.json(),
        ]);

        setCounts({
          gallery: galleryData.length || 0,
          news: newsData.length || 0,
          publications: publicationsData.length || 0,
          videos: videosData.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-500 rounded-xl">
            <ImageIcon size={32} />
          </div>
          <div>
            <h2 className="text-slate-500 font-medium mb-1">Gallery Media</h2>
            <p className="text-3xl font-bold text-slate-800">{loading ? "..." : counts.gallery}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-xl">
            <FileText size={32} />
          </div>
          <div>
            <h2 className="text-slate-500 font-medium mb-1">News Articles</h2>
            <p className="text-3xl font-bold text-slate-800">{loading ? "..." : counts.news}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-red-50 text-red-500 rounded-xl">
            <Video size={32} />
          </div>
          <div>
            <h2 className="text-slate-500 font-medium mb-1">Video Links</h2>
            <p className="text-3xl font-bold text-slate-800">{loading ? "..." : counts.videos}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-500 rounded-xl">
            <UploadCloud size={32} />
          </div>
          <div>
            <h2 className="text-slate-500 font-medium mb-1">Publications</h2>
            <p className="text-3xl font-bold text-slate-800">{loading ? "..." : counts.publications}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
