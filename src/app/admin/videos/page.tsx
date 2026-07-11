"use client";

import { useState, useEffect } from "react";
import { Trash2, Video, Plus, Edit, X, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface IVideo {
  id: number;
  title: string;
  youtubeLink: string;
  createdAt: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredItems = videos.filter((item: any) => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedItems = [...filteredItems].sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });
  
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOrder]);

  const openAddModal = () => {
    setTitle("");
    setYoutubeLink("");
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vid: IVideo) => {
    setTitle(vid.title);
    setYoutubeLink(vid.youtubeLink);
    setEditingId(vid.id);
    setIsModalOpen(true);
  };
  const fetchVideos = async () => {
    try {
      const res = await fetch("http://localhost:3005/video");
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
      }
    } catch (err) {
      toast.error("Failed to fetch videos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeLink) {
      toast.error("Please provide a title and YouTube link");
      return;
    }

    const isEditing = editingId !== null;
    const toastId = toast.loading(isEditing ? "Updating video..." : "Adding video...");

    try {
      const res = await fetch(isEditing ? `http://localhost:3005/video/${editingId}` : "http://localhost:3005/video", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, youtubeLink }),
      });

      if (res.ok) {
        setTitle("");
        setYoutubeLink("");
        setIsModalOpen(false);
        toast.success(isEditing ? "Video updated successfully" : "Video added successfully", { id: toastId });
        fetchVideos();
      } else {
        toast.error(isEditing ? "Failed to update video" : "Failed to add video", { id: toastId });
      }
    } catch (err) {
      toast.error("Error connecting to server", { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    try {
      const res = await fetch(`http://localhost:3005/video/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Video deleted");
        fetchVideos();
      } else {
        toast.error("Failed to delete video");
      }
    } catch (err) {
      toast.error("Error connecting to server");
    }
  };

  const getYoutubeEmbed = (link: string) => {
    // Basic extraction
    let videoId = "";
    if (link.includes("v=")) {
      videoId = link.split("v=")[1]?.split("&")[0];
    } else if (link.includes("youtu.be/")) {
      videoId = link.split("youtu.be/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Videos</h1>
          <p className="text-slate-500">Add YouTube video links</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-imc-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-imc-blue-dark transition-colors"
        >
          <Plus size={20} /> Add Video
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Video size={24} className="text-imc-blue" /> {editingId ? "Edit Video" : "Add Video"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Video Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-imc-blue outline-none transition-colors text-slate-800 placeholder-slate-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">YouTube Link</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-imc-blue outline-none transition-colors text-slate-800 placeholder-slate-400"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-imc-blue text-white px-6 py-2.5 rounded-xl font-medium hover:bg-imc-blue-dark transition-colors">
                  {editingId ? "Save Changes" : "Add Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-imc-blue"
          />
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors w-full sm:w-auto font-medium"
        >
          <ArrowUpDown size={18} />
          Sort by Date ({sortOrder === "asc" ? "Oldest First" : "Newest First"})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Video</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date Added</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 bg-slate-200 rounded-lg"></div>
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><div className="h-5 bg-slate-200 rounded w-24"></div></td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
                    <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
                  </td>
                </tr>
              ))
            ) : (
              <>
                {paginatedItems.map((vid) => (
                  <tr key={vid.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          {getYoutubeEmbed(vid.youtubeLink) ? (
                            <iframe
                              width="100%"
                              height="100%"
                              src={getYoutubeEmbed(vid.youtubeLink)!}
                              title={vid.title}
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <Video size={24} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-slate-800 font-medium">{vid.title}</p>
                          <a href={vid.youtubeLink} target="_blank" rel="noreferrer" className="text-sm text-imc-blue hover:underline truncate block mt-1">
                            {vid.youtubeLink}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date(vid.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex justify-end gap-3">
                      <button onClick={() => openEditModal(vid)} className="text-imc-blue hover:text-imc-blue-dark p-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setDeleteId(vid.id)} className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedItems.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                      <Video size={48} className="mx-auto mb-4 text-slate-300" />
                      <p className="text-slate-500 font-medium text-lg mb-1">No videos found</p>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {sortedItems.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <div>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedItems.length)} of {sortedItems.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="font-medium px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
              Page {currentPage} of {totalPages || 1}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={deleteId !== null}
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
