"use client";

import { useEffect, useState } from "react";
import { Globe, Edit2, Search, Upload, X, ShieldAlert, Sparkles, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import AdminPopupModal from "@/components/ui/AdminPopupModal";

export default function AdminSeoPage() {
  const [seoPages, setSeoPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit Form Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImagePreview, setOgImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

  // Standard predefined page keys for real estate platform
  const pageDetails = {
    home: { name: "Home Welcome Page", path: "/" },
    "about-us": { name: "About Us Page", path: "/about-us" },
    "what-we-offer": { name: "What We Offer Page", path: "/what-we-offer" },
    "become-a-user": { name: "Become A User Page", path: "/become-a-user" },
    "connect-now": { name: "Connect Now Wizard Page", path: "/connect-now" },
  };

  useEffect(() => {
    loadSeoPages();
  }, []);

  async function loadSeoPages() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/seo");
      if (!res.ok) throw new Error("Failed to load SEO pages");
      const data = await res.json();

      // Merge with predefined pages if any are missing in database
      const dbPages = data.seoPages || [];
      const merged = Object.keys(pageDetails).map((key) => {
        const found = dbPages.find((p) => p.pageKey === key);
        return found || {
          pageKey: key,
          metaTitle: `${pageDetails[key].name} | Brokarta`,
          metaDescription: "The digital network for the modern real estate broker.",
          keywords: "real estate, broker, broker network, brokarta",
          canonicalUrl: `https://brokarta.com${pageDetails[key].path}`,
          ogImage: "",
        };
      });

      setSeoPages(merged);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenEdit = (p) => {
    setSelectedKey(p.pageKey);
    setMetaTitle(p.metaTitle || "");
    setMetaDescription(p.metaDescription || "");
    setKeywords(p.keywords || "");
    setCanonicalUrl(p.canonicalUrl || "");
    setImageFile(null);
    setOgImagePreview(p.ogImage || "");
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setOgImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);
      formData.append("keywords", keywords);
      formData.append("canonicalUrl", canonicalUrl);
      if (imageFile) {
        formData.append("ogImage", imageFile);
      }

      const res = await fetch(`/api/admin/seo/${selectedKey}`, {
        method: "PUT",
        body: formData,
      });

      const errorData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(errorData.message || errorData.error || "Failed to update SEO config");
      }

      setModalOpen(false);
      showAlert("SEO settings saved successfully", "Success", "success");
      loadSeoPages();
    } catch (err) {
      showAlert(err.message, "Save Failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-brand-dark to-brand-blue p-6 rounded-4xl text-white shadow-xl shadow-slate-900/10 border border-white/5 relative overflow-hidden">
        <div className="absolute -right-25 -top-12.5 w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-teal" />
            <h2 className="text-2xl font-black font-oswald tracking-wide uppercase">
              SEO Metadata Hub
            </h2>
          </div>

          <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed mt-1">
            Configure page meta tags, descriptions, canonical URLs, and OpenGraph assets to improve search visibility and social sharing previews.
          </p>
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
          <div className="w-8 h-8 rounded-full border-4 border-brand-dark border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seoPages.map((p) => {
            const predefined = pageDetails[p.pageKey] || { name: p.pageKey, path: "" };
            return (
              <div
                key={p.pageKey}
                className="bg-white border border-slate-100 rounded-4xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Page Indicator */}
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-brand-dark/5 flex items-center justify-center text-brand-dark shrink-0">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm truncate">{predefined.name}</h4>
                      <span className="text-[10px] text-slate-400 block font-semibold truncate">
                        Route: {predefined.path || "dynamic"}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description preview */}
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block">
                        Meta Title
                      </span>
                      <p className="text-xs font-bold text-slate-750 line-clamp-1">{p.metaTitle}</p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block">
                        Meta Description
                      </span>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{p.metaDescription}</p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block">
                        Keywords
                      </span>
                      <p className="text-[10px] text-slate-400 truncate font-semibold">{p.keywords || "None configured"}</p>
                    </div>

                    {p.canonicalUrl && (
                      <div className="flex items-center gap-1.5 pt-1.5 text-[10px] text-brand-dark font-bold">
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span className="truncate max-w-50">{p.canonicalUrl}</span>
                      </div>
                    )}
                  </div>

                  {/* OG Image Preview */}
                  {p.ogImage && (
                    <div className="rounded-2xl overflow-hidden border border-slate-150 h-28 relative bg-slate-50 mt-2">
                      <Image
                        src={p.ogImage}
                        alt="OG Preview"
                        fill
                        className="object-cover"
                        sizes="240px"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 flex items-end p-2.5">
                        <span className="text-[9px] font-extrabold text-white bg-slate-900/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          OpenGraph Image
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Edit Button */}
                <div className="border-t border-slate-100 pt-4 mt-6">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-bold border border-brand-dark hover:bg-brand-dark hover:text-white rounded-xl transition-all cursor-pointer text-brand-dark"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Configure Metadata
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE/EDIT SEO MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-slate-100 rounded-4xl w-full max-w-lg p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-brand-dark capitalize">
                SEO Config: {selectedKey.replace("-", " ")}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* OG Image Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 py-2 border-b border-slate-100 pb-4">
                <div className="w-28 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative shrink-0">
                  {ogImagePreview ? (
                    <img
                      src={ogImagePreview}
                      alt="OG Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-350">
                      <Globe2 className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="space-y-1.5 flex-1 w-full text-center sm:text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                    OpenGraph Image (Social Preview)
                  </label>
                  <div className="relative inline-block w-full sm:w-auto">
                    <input
                      type="file"
                      accept="image/*"
                      id="og-image"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="og-image"
                      className="flex items-center justify-center sm:justify-start gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Image File
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Aspect ratio 1.91:1 recommended (e.g. 1200x630px).
                  </p>
                </div>
              </div>

              {/* Meta Title */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Page title for search engines"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-sm font-semibold"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                  Meta Description
                </label>
                <textarea
                  required
                  placeholder="Provide page summary under 160 characters..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-sm font-semibold h-24 resize-none"
                />
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                  Meta Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="real estate, brokers, brokarta"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-sm font-semibold"
                />
              </div>

              {/* Canonical URL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  placeholder="https://brokarta.com/about-us"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-sm font-semibold"
                />
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
                  className="px-6 py-3 bg-brand-dark hover:bg-[#012230] text-white rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] font-semibold text-xs cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  ) : (
                    "Save SEO Metadata"
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
