"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Plus, Trash2, Edit, X, FileText, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredItems = news.filter((item: any) => 
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
    setContent("");
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setTitle(item.title);
    setContent(item.content);
    setEditingId(item.id);
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/news`)
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch news");
        setIsLoading(false);
      });
  }, []);

  // Helper to strip HTML tags and truncate text
  const getPreviewText = (htmlContent: string) => {
    if (!htmlContent) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = htmlContent;
    const text = tmp.textContent || tmp.innerText || "";
    return text.length > 42 ? text.substring(0, 42) + "..." : text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingId !== null;
    const toastId = toast.loading(isEditing ? "Updating article..." : "Publishing article...");
    try {
      const res = await fetch(isEditing ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/news/${editingId}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'}/news`, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, imageUrl: "" })
      });
      if (res.ok) {
        if (isEditing) {
          const updatedItem = await res.json();
          setNews(news.map((n: any) => n.id === editingId ? updatedItem : n));
          toast.success("Article updated", { id: toastId });
        } else {
          const newItem = await res.json();
          setNews([newItem, ...news]);
          toast.success("Article published", { id: toastId });
        }
        setIsModalOpen(false);
      } else {
        toast.error(isEditing ? "Failed to update" : "Failed to publish", { id: toastId });
      }
    } catch (err) {
      toast.error(isEditing ? "Error updating article" : "Error publishing article", { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    const toastId = toast.loading("Deleting...");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNews(news.filter((n: any) => n.id !== id));
        toast.success("Article deleted", { id: toastId });
      } else {
        toast.error("Failed to delete", { id: toastId });
      }
    } catch (err) {
      toast.error("Error deleting article", { id: toastId });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">News Articles</h1>
        <button 
          onClick={openAddModal}
          className="bg-imc-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-imc-blue-dark transition-colors"
        >
          <Plus size={20} /> Add News
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FileText size={24} className="text-imc-blue" /> {editingId ? "Edit Article" : "New Article"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 flex flex-col">
              <form id="news-form" onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter article title"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-imc-blue outline-none text-slate-800"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                  <div className="border border-slate-200 rounded-xl overflow-hidden flex-1 min-h-[400px] flex flex-col [&_.quill]:flex-1 [&_.quill]:flex [&_.quill]:flex-col [&_.ql-container]:flex-1 [&_.ql-container]:overflow-y-auto [&_.ql-editor]:min-h-full">
                    <RichTextEditor value={content} onChange={setContent} />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-xl font-medium transition-colors">
                Cancel
              </button>
              <button form="news-form" type="submit" className="bg-imc-blue text-white px-6 py-2.5 rounded-xl font-medium hover:bg-imc-blue-dark transition-colors">
                {editingId ? "Save Changes" : "Publish Article"}
              </button>
            </div>
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
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Article</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date Added</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
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
                {paginatedItems.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-slate-800 font-medium">{item.title}</p>
                      <p className="text-slate-500 text-sm mt-1">{getPreviewText(item.content)}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex justify-end gap-3">
                      <button onClick={() => openEditModal(item)} className="text-imc-blue hover:text-imc-blue-dark p-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedItems.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                      <FileText size={48} className="mx-auto mb-4 text-slate-300" />
                      <p className="text-slate-500 font-medium text-lg mb-1">No articles found</p>
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
        title="Delete Article"
        message="Are you sure you want to delete this news article? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
