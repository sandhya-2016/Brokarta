"use client";

import { useEffect, useState } from "react";
import {
  Users2,
  Plus,
  Edit2,
  Trash2,
  X,
  ArrowUp,
  ArrowDown,
  Upload,
  AlertCircle,
  Search,
  CheckSquare,
  Square
} from "lucide-react";
import Image from "next/image";
import AdminPopupModal from "@/components/ui/AdminPopupModal";

export default function AdminCommunityPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Multi-Selection State for Bulk Actions
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    loadTestimonials();
  }, [searchQuery, currentPage]);

  async function loadTestimonials() {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append("page", String(currentPage));
      queryParams.append("limit", "10");
      if (searchQuery) queryParams.append("search", searchQuery);

      const res = await fetch(`/api/admin/testimonials?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load testimonials");
      const data = await res.json();
      setTestimonials(data.testimonials || []);
      setTotalRecords(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / 10));
      setSelectedIds([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setIsEdit(false);
    setEditingId(null);
    setName("");
    setTestimonialText("");
    setIsActive(true);
    setSortOrder(totalRecords);
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEdit(true);
    setEditingId(item.id);
    setName(item.name);
    setTestimonialText(item.testimonial);
    setIsActive(item.isActive);
    setSortOrder(item.sortOrder);
    setImageFile(null);
    setImagePreview(item.imageUrl);
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Custom Popup Modal State
  const [popup, setPopup] = useState({
    isOpen: false,
    type: "alert",
    title: "",
    message: "",
    onConfirm: null,
  });

  const showAlert = (message, title = "Notice", type = "error") => {
    setPopup({
      isOpen: true,
      type,
      title,
      message,
      onConfirm: null,
    });
  };

  const showConfirmDialog = (message, onConfirmAction, title = "Are you sure?", type = "delete") => {
    setPopup({
      isOpen: true,
      type,
      title,
      message,
      onConfirm: () => {
        setPopup((prev) => ({ ...prev, isOpen: false }));
        onConfirmAction();
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !testimonialText) {
      showAlert("Name and testimonial text are required", "Missing Information", "error");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("testimonial", testimonialText);
      formData.append("isActive", String(isActive));
      formData.append("sortOrder", String(sortOrder));
      if (imageFile) formData.append("image", imageFile);

      let res;
      if (isEdit) {
        res = await fetch(`/api/admin/testimonials/${editingId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/admin/testimonials", {
          method: "POST",
          body: formData,
        });
      }

      const errorData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(errorData.message || "Failed to save testimonial");
      }

      setModalOpen(false);
      showAlert(isEdit ? "Testimonial updated successfully" : "Testimonial created successfully", "Success", "success");
      loadTestimonials();
    } catch (err) {
      showAlert(err.message, "Save Failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "Are you sure you want to delete this testimonial? This action cannot be undone.",
      async () => {
        try {
          const res = await fetch(`/api/admin/testimonials/${id}`, {
            method: "DELETE",
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data.message || "Failed to delete testimonial");

          showAlert("Testimonial deleted successfully", "Success", "success");
          loadTestimonials();
        } catch (err) {
          showAlert(err.message, "Delete Failed", "error");
        }
      },
      "Delete Testimonial",
      "delete"
    );
  };

  const handleToggleActive = async (item) => {
    try {
      const formData = new FormData();
      formData.append("isActive", String(!item.isActive));

      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to update status");
      loadTestimonials();
    } catch (err) {
      showAlert(err.message, "Status Error", "error");
    }
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= testimonials.length) return;

    const list = [...testimonials];
    const temp = list[index].sortOrder;
    list[index].sortOrder = list[targetIndex].sortOrder;
    list[targetIndex].sortOrder = temp;

    try {
      const saveItem = async (item) => {
        const formData = new FormData();
        formData.append("sortOrder", String(item.sortOrder));
        return fetch(`/api/admin/testimonials/${item.id}`, {
          method: "PUT",
          body: formData,
        });
      };

      await Promise.all([saveItem(list[index]), saveItem(list[targetIndex])]);
      loadTestimonials();
    } catch (err) {
      showAlert("Failed to save ordering", "Reorder Failed", "error");
    }
  };

  // Bulk actions
  const toggleSelectAll = () => {
    if (selectedIds.length === testimonials.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(testimonials.map((i) => i.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkAction = async (action, extraData = {}) => {
    if (selectedIds.length === 0) return;

    const executeBulk = async () => {
      try {
        const res = await fetch("/api/admin/testimonials/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, ids: selectedIds, ...extraData }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Bulk action failed");

        showAlert(data.message || "Bulk operation completed successfully", "Success", "success");
        loadTestimonials();
      } catch (err) {
        showAlert(err.message, "Bulk Action Failed", "error");
      }
    };

    if (action === "DELETE") {
      showConfirmDialog(
        `Are you sure you want to delete ${selectedIds.length} testimonials?`,
        executeBulk,
        "Bulk Delete Testimonials",
        "delete"
      );
    } else {
      executeBulk();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#013144] to-[#02647e] p-6 rounded-[32px] text-white shadow-xl shadow-slate-900/10 border border-white/5 relative overflow-hidden">
        <div className="absolute right-[-100px] top-[-50px] w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users2 className="w-5 h-5 text-[#00cc9c]" />
              <h2 className="text-2xl font-black font-oswald tracking-wide uppercase">
                Community Testimonials
              </h2>
            </div>

            <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed">
              Manage client reviews and testimonials displayed across homepage and marketing pages.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00cc9c] text-[#013144] font-black text-xs uppercase tracking-wider transition-all hover:bg-[#00e6b0] active:scale-95 shadow-md shadow-[#00cc9c]/20 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* Toolbar / Search / Bulk Action */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search testimonials by name or text..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none text-xs font-medium"
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl text-xs font-bold animate-[fadeIn_0.2s_ease-out]">
            <span>{selectedIds.length} Selected</span>
            <div className="h-4 w-px bg-white/20 mx-1" />
            <button
              onClick={() => handleBulkAction("TOGGLE_ACTIVE", { isActive: true })}
              className="hover:text-[#00cc9c] cursor-pointer"
            >
              Activate
            </button>
            <button
              onClick={() => handleBulkAction("TOGGLE_ACTIVE", { isActive: false })}
              className="hover:text-amber-400 cursor-pointer"
            >
              Deactivate
            </button>
            <button
              onClick={() => handleBulkAction("DELETE")}
              className="hover:text-red-400 cursor-pointer ml-1"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-4 border-[#013144] border-t-transparent animate-spin"></div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-100 rounded-[32px] text-slate-400">
          <Users2 className="w-12 h-12 opacity-30 mx-auto mb-3" />
          <p className="font-semibold text-sm">No testimonials match search filters.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="py-4 px-6 w-12 text-center">
                    <button onClick={toggleSelectAll} className="text-slate-400 hover:text-[#013144] cursor-pointer">
                      {selectedIds.length === testimonials.length && testimonials.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-[#00cc9c]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-4 px-6">User / Author</th>
                  <th className="py-4 px-6">Testimonial Quote</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Sort Order</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {testimonials.map((item, idx) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        isSelected ? "bg-[#00cc9c]/5" : ""
                      }`}
                    >
                      <td className="py-4 px-6 text-center">
                        <button onClick={() => toggleSelect(item.id)} className="text-slate-400 hover:text-[#013144] cursor-pointer">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#00cc9c]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 relative shrink-0 bg-slate-100 shadow-xs">
                            <img
                              src={item.imageUrl || "/images/logo1.jpeg"}
                              alt={item.name}
                              loading="lazy"
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.src = "/images/logo1.jpeg"; }}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#013144] text-xs">{item.name}</h4>
                            <span className="text-[10px] text-slate-400">ID: {item.id.slice(0, 8)}...</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-xs text-slate-600 italic line-clamp-2 leading-relaxed">
                          "{item.testimonial}"
                        </p>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleToggleActive(item)}
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all cursor-pointer inline-block ${
                            item.isActive
                              ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            #{item.sortOrder}
                          </span>
                          <div className="flex flex-col gap-0.5">
                            <button
                              disabled={idx === 0 && currentPage === 1}
                              onClick={() => handleMove(idx, -1)}
                              className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              disabled={idx === testimonials.length - 1 && currentPage === totalPages}
                              onClick={() => handleMove(idx, 1)}
                              className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 text-slate-500 hover:text-[#013144] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                            title="Edit Testimonial"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                            title="Delete Testimonial"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6  bg-white p-4 rounded-3xl">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Page {currentPage} of {totalPages} ({totalRecords} total testimonials)
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-xl text-xs font-bold cursor-pointer text-slate-700"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-xl text-xs font-bold cursor-pointer text-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-slate-100 rounded-[32px] w-full max-w-lg p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#013144]">
                {isEdit ? "Edit Testimonial" : "Create Testimonial"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. James Thompson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] text-sm font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                  Testimonial Quote Text
                </label>
                <textarea
                  required
                  placeholder="Client feedback..."
                  value={testimonialText}
                  onChange={(e) => setTestimonialText(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] text-sm font-semibold h-28 resize-none"
                />
              </div>

              <div className="flex items-center gap-4 py-2 border-t border-b border-slate-100">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-50 relative shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/images/logo1.jpeg"; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-350">
                      <Upload className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div>
                  <input type="file" accept="image/*" id="t-img" onChange={handleImageChange} className="hidden" />
                  <label htmlFor="t-img" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" /> Choose Avatar Image
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3">
                  <input
                    type="checkbox"
                    id="isActiveT"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-[#00cc9c] border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="isActiveT" className="text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer">
                    Show Publicly
                  </label>
                </div>
                <input
                  type="number"
                  placeholder="Sort Order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value || "0", 10))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-sm font-semibold"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#013144] hover:bg-[#012230] text-white rounded-xl font-semibold text-xs cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : isEdit ? "Save Testimonial" : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Custom Admin Popup Modal */}
      <AdminPopupModal
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onConfirm={popup.onConfirm}
        onClose={() => setPopup((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
