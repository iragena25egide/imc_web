"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, FileText, Download, Edit, X, UploadCloud, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function AdminPublicationsPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredItems = items.filter((item: any) => 
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
    setFile(null);
    setEditingId(null);
    setIsAdding(true);
  };

  const openEditModal = (item: any) => {
    setTitle(item.title);
    setFile(null);
    setEditingId(item.id);
    setIsAdding(true);
  };
  
  useEffect(() => {
    fetch("http://localhost:3005/publication")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch publications");
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingId !== null;

    if (!title || (!file && !isEditing)) {
      toast.error("Please provide title and file");
      return;
    }

    const toastId = toast.loading(isEditing ? "Updating document..." : "Uploading document...");

    try {
      if (isEditing && !file) {
        // Just update title
        const res = await fetch(`http://localhost:3005/publication/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });
        if (res.ok) {
          const updatedItem = await res.json();
          setItems(items.map((i: any) => i.id === editingId ? updatedItem : i));
          setIsAdding(false);
          setEditingId(null);
          toast.success("Document updated", { id: toastId });
        } else {
          toast.error("Update failed", { id: toastId });
        }
        return;
      }

      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("title", title);

      if (!isEditing) {
        const res = await fetch("http://localhost:3005/publication/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const newItem = await res.json();
          setItems([newItem, ...items]);
          setIsAdding(false);
          setFile(null);
          setTitle("");
          toast.success("Document uploaded", { id: toastId });
        } else {
          toast.error("Upload failed", { id: toastId });
        }
      }
    } catch (err) {
      toast.error("Error saving document", { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    const toastId = toast.loading("Deleting...");
    try {
      const res = await fetch(`http://localhost:3005/publication/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter((n: any) => n.id !== id));
        toast.success("Document deleted", { id: toastId });
      } else {
        toast.error("Failed to delete", { id: toastId });
      }
    } catch (err) {
      toast.error("Error deleting", { id: toastId });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Publications & Documents</h1>
        <button 
          onClick={openAddModal}
          className="bg-imc-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-imc-blue-dark transition-colors"
        >
          <Plus size={20} /> Add Document
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <UploadCloud size={24} className="text-imc-blue" /> {editingId ? "Edit Document Title" : "Upload Document"}
              </h2>
              <button onClick={() => { setIsAdding(false); setFile(null); setEditingId(null); }} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
                <input 
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter document title"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-imc-blue outline-none text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload PDF</label>
                {file ? (
                  <div className="relative w-full h-32 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 mb-3 group">
                    <div className="flex items-center gap-3 text-imc-blue">
                      <FileText size={32} />
                      <span className="font-medium">{file.name}</span>
                    </div>
                    {!editingId && (
                      <button 
                        type="button"
                        onClick={() => setFile(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                      <FileText size={32} className="mb-2 text-slate-400" />
                      <p className="text-sm font-medium">Click to upload PDF document</p>
                    </div>
                    <input 
                      type="file" 
                      accept=".pdf"
                      required={!editingId}
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                )}
                {editingId && <p className="text-xs text-slate-500 mt-2">Note: To change the PDF file, please delete this document and create a new one.</p>}
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => { setIsAdding(false); setFile(null); setEditingId(null); }} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={!file && !editingId} className="bg-imc-blue text-white px-6 py-2.5 rounded-xl font-medium hover:bg-imc-blue-dark transition-colors disabled:opacity-50">
                  {editingId ? "Save Changes" : "Upload Document"}
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
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Document</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date Added</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
                      <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><div className="h-5 bg-slate-200 rounded w-24"></div></td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
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
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                          <FileText size={20} />
                        </div>
                        <span className="text-slate-800 font-medium">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex justify-end gap-3">
                      <a 
                        href={item.fileUrl.startsWith('http') ? item.fileUrl : `http://localhost:3005${item.fileUrl}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-imc-blue hover:text-imc-blue-dark p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Download size={18} />
                      </a>
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
                      <p className="text-slate-500 font-medium text-lg mb-1">No publications found</p>
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
        title="Delete Document"
        message="Are you sure you want to delete this publication? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
