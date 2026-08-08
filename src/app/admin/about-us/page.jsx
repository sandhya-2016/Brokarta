"use client";

import { useEffect, useState } from "react";
import {
  Compass,
  Plus,
  Edit2,
  Trash2,
  X,
  ArrowUp,
  ArrowDown,
  Upload,
  AlertCircle,
  PlusCircle,
  MinusCircle,
  Eye,
  EyeOff,
  ScrollText
} from "lucide-react";
import Image from "next/image";
import AdminPopupModal from "@/components/ui/AdminPopupModal";

export default function AdminAboutUsPage() {
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accentColor, setAccentColor] = useState("#f6a200");
  const [gradientFrom, setGradientFrom] = useState("from-[#FFF9F2]");
  const [gradientTo, setGradientTo] = useState("to-[#FFF1E0]");
  const [quote, setQuote] = useState("");
  const [quoteBadge, setQuoteBadge] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [bullets, setBullets] = useState([]); // Array of strings
  const [newBulletText, setNewBulletText] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPanels();
  }, []);

  async function loadPanels() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/story-panels");
      if (!res.ok) throw new Error("Failed to load story panels");
      const data = await res.json();
      setPanels(data.panels || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setIsEdit(false);
    setEditingId(null);
    setTitle("");
    setDescription("");
    setAccentColor("#f6a200");
    setGradientFrom("from-[#FFF9F2]");
    setGradientTo("to-[#FFF1E0]");
    setQuote("");
    setQuoteBadge("");
    setIsActive(true);
    setSortOrder(panels.length);
    setBullets([]);
    setNewBulletText("");
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setIsEdit(true);
    setEditingId(p.id);
    setTitle(p.title);
    setDescription(p.description);
    setAccentColor(p.accentColor);
    setGradientFrom(p.gradientFrom);
    setGradientTo(p.gradientTo);
    setQuote(p.quote);
    setQuoteBadge(p.quoteBadge);
    setIsActive(p.isActive);
    setSortOrder(p.sortOrder);
    setBullets(p.bullets ? p.bullets.map((b) => b.bulletText) : []);
    setNewBulletText("");
    setImageFile(null);
    setImagePreview(p.imageUrl);
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddBullet = () => {
    if (newBulletText.trim() === "") return;
    setBullets([...bullets, newBulletText.trim()]);
    setNewBulletText("");
  };

  const handleRemoveBullet = (index) => {
    setBullets(bullets.filter((_, idx) => idx !== index));
  };

  const handleBulletEdit = (index, value) => {
    const list = [...bullets];
    list[index] = value;
    setBullets(list);
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
    if (!title || !description) {
      showAlert("Title and description are required", "Missing Information", "error");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("accentColor", accentColor);
      formData.append("gradientFrom", gradientFrom);
      formData.append("gradientTo", gradientTo);
      formData.append("quote", quote);
      formData.append("quoteBadge", quoteBadge);
      formData.append("isActive", String(isActive));
      formData.append("sortOrder", String(sortOrder));

      const cleanBullets = bullets.filter((b) => b.trim() !== "");
      formData.append("bullets", JSON.stringify(cleanBullets));

      if (imageFile) formData.append("image", imageFile);

      let res;
      if (isEdit) {
        res = await fetch(`/api/admin/story-panels/${editingId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/admin/story-panels", {
          method: "POST",
          body: formData,
        });
      }

      const errorData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(errorData.message || errorData.error || "Failed to save story panel");
      }

      setModalOpen(false);
      showAlert(isEdit ? "Story panel updated successfully" : "Story panel created successfully", "Success", "success");
      loadPanels();
    } catch (err) {
      showAlert(err.message, "Save Failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "Are you sure you want to delete this story panel? This will also delete all nested bullets.",
      async () => {
        try {
          const res = await fetch(`/api/admin/story-panels/${id}`, {
            method: "DELETE",
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data.message || "Failed to delete panel");

          showAlert("Story panel deleted successfully", "Success", "success");
          loadPanels();
        } catch (err) {
          showAlert(err.message, "Delete Failed", "error");
        }
      },
      "Delete Story Panel",
      "delete"
    );
  };

  const handleToggleActive = async (p) => {
    try {
      const formData = new FormData();
      formData.append("isActive", String(!p.isActive));

      const res = await fetch(`/api/admin/story-panels/${p.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to update status");
      loadPanels();
    } catch (err) {
      showAlert(err.message, "Status Error", "error");
    }
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= panels.length) return;

    const list = [...panels];
    const temp = list[index].sortOrder;
    list[index].sortOrder = list[targetIndex].sortOrder;
    list[targetIndex].sortOrder = temp;

    try {
      const saveItem = async (item) => {
        const formData = new FormData();
        formData.append("sortOrder", String(item.sortOrder));
        return fetch(`/api/admin/story-panels/${item.id}`, {
          method: "PUT",
          body: formData,
        });
      };

      await Promise.all([saveItem(list[index]), saveItem(list[targetIndex])]);
      loadPanels();
    } catch (err) {
      showAlert("Failed to save ordering", "Reorder Failed", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Popup Modal */}
      <AdminPopupModal
        isOpen={popup.isOpen}
        onClose={() => setPopup({ ...popup, isOpen: false })}
        onConfirm={popup.onConfirm}
        title={popup.title}
        message={popup.message}
        type={popup.type}
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#013144] to-[#02647e] p-6 rounded-[32px] text-white shadow-xl shadow-slate-900/10 border border-white/5 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute right-[-100px] top-[-50px] w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-[#00cc9c]" />
              <h2 className="text-2xl font-black font-oswald tracking-wide uppercase">
                Story Panels
              </h2>
            </div>

            <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed">
              Configure About Us interactive timeline panels and showcase key company milestones, achievements, and brand history.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00cc9c] text-[#013144] font-black text-xs uppercase tracking-wider transition-all hover:bg-[#00e6b0] active:scale-95 shadow-md shadow-[#00cc9c]/20 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Story Panel
          </button>
        </div>
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
      ) : panels.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-100 rounded-[32px] text-slate-400">
          <Compass className="w-12 h-12 opacity-30 mx-auto mb-3" />
          <p className="font-semibold text-sm">No story panels configured.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {panels.map((p, idx) => (
            <div
              key={p.id}
              className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group overflow-hidden"
            >
              {/* Panel Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                <button
                  onClick={() => handleToggleActive(p)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all cursor-pointer
                    ${p.isActive
                      ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                      : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                    }`}
                >
                  {p.isActive ? "Active" : "Inactive"}
                </button>
              </div>

              {/* Panel Details */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 relative shrink-0">
                    <img
                      src={p.imageUrl || "/images/1aa.png"}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/images/1aa.png"; }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#013144] text-base leading-snug">{p.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">
                      Accent: <span style={{ color: p.accentColor }}>{p.accentColor}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Gradients: {p.gradientFrom} → {p.gradientTo}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {p.description}
                </p>

                {/* Bullets preview */}
                {p.bullets && p.bullets.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Nested Bullet List ({p.bullets.length})
                    </h4>
                    <ul className="list-disc pl-4 text-xs text-slate-650 space-y-1 font-semibold">
                      {p.bullets.map((b) => (
                        <li key={b.id}>{b.bulletText}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quote block preview */}
                {p.quote && (
                  <div className="border-l-4 border-slate-200 pl-3 py-1">
                    <p className="text-xs italic text-slate-500">"{p.quote}"</p>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mt-1">
                      {p.quoteBadge || "Quote Badge"}
                    </span>
                  </div>
                )}
              </div>

              {/* Footer controls */}
              <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                {/* Order controls */}
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, -1)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === panels.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-slate-200 text-[#013144] hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-red-100 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE/EDIT PANEL MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-slate-100 rounded-[32px] w-full max-w-2xl p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#013144]">
                {isEdit ? "Edit Story Panel" : "Create Story Panel"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 py-2 border-b border-slate-100 pb-4">
                <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-slate-200 bg-slate-50 relative shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/images/1aa.png"; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-350">
                      <Compass className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="space-y-1.5 flex-1 w-full text-center sm:text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                    Story Image File
                  </label>
                  <div className="relative inline-block w-full sm:w-auto">
                    <input
                      type="file"
                      accept="image/*"
                      id="story-image"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="story-image"
                      className="flex items-center justify-center sm:justify-start gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Image File
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Supports JPG, PNG, WEBP.
                  </p>
                </div>
              </div>

              {/* Title & Description */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                    Panel Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Every Broker Has A Story"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] focus:border-transparent transition-all text-sm font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                    Accent Color Hex
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="#f6a200"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] focus:border-transparent transition-all text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                  Panel Description
                </label>
                <textarea
                  required
                  placeholder="Tell the story details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] focus:border-transparent transition-all text-sm font-semibold h-24 resize-none"
                />
              </div>

              {/* Gradients row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                    Tailwind Gradient From
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="from-[#FFF9F2]"
                    value={gradientFrom}
                    onChange={(e) => setGradientFrom(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] focus:border-transparent transition-all text-sm font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                    Tailwind Gradient To
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="to-[#FFF1E0]"
                    value={gradientTo}
                    onChange={(e) => setGradientTo(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] focus:border-transparent transition-all text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Quote details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                    Highlight Quote text
                  </label>
                  <input
                    type="text"
                    placeholder="Collaboration is seamless, not stressful."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] focus:border-transparent transition-all text-sm font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                    Quote Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="Verified Networks"
                    value={quoteBadge}
                    onChange={(e) => setQuoteBadge(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] focus:border-transparent transition-all text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Dynamic Bullets Editor */}
              <div className="space-y-3 bg-slate-50 p-6 rounded-[24px] border border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  Nested Bullet Management
                </label>

                {/* List of current bullets */}
                {bullets.length > 0 && (
                  <div className="space-y-2">
                    {bullets.map((bullet, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleBulletEdit(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-250 rounded-xl bg-white text-slate-800 focus:outline-none text-xs font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBullet(index)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <MinusCircle className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new bullet row */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Enter new bullet point text..."
                    value={newBulletText}
                    onChange={(e) => setNewBulletText(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-250 rounded-xl bg-white text-slate-800 focus:outline-none text-xs font-semibold"
                  />
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="text-[#013144] hover:text-[#02647e] cursor-pointer"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Status and Order */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border border-slate-200 rounded-2xl bg-slate-50 px-4 py-3.5">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-[#00cc9c] border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="isActive" className="text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer">
                    Show Panel Publicly
                  </label>
                </div>

                <div className="space-y-1">
                  <input
                    type="number"
                    placeholder="Sort Order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value || "0", 10))}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] focus:border-transparent transition-all text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 active:scale-[0.98] font-semibold text-xs cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-[#013144] hover:bg-[#012230] text-white rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] font-semibold text-xs cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  ) : isEdit ? (
                    "Save Story Panel"
                  ) : (
                    "Create Story Panel"
                  )}
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
