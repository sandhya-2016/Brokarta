"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Save,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Info,
  Layers
} from "lucide-react";

export default function AdminPagesManagementPage() {
  const [pageTexts, setPageTexts] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Track changes locally: { [fieldKey]: newValue }
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/page-texts");
      const data = await res.json();
      if (res.ok && data.success) {
        const textData = data.pageTexts || data.data || {};
        setPageTexts(textData);
        const keys = Object.keys(textData);
        if (keys.length > 0 && (!activeTab || !textData[activeTab])) {
          setActiveTab(keys[0]);
        }
      } else {
        setError(data.message || "Failed to load page text configurations.");
      }
    } catch (err) {
      setError("An unexpected network error occurred while fetching texts.");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (key, value) => {
    setChangedFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    if (e) e.preventDefault();
    if (Object.keys(changedFields).length === 0 || !activeTab || !pageTexts?.[activeTab]) return;
    const pageName = pageTexts[activeTab]?.name || "this page";

    try {
      setSaving(true);
      setError("");
      setSuccessMsg("");

      const updateCount = Object.keys(changedFields).length;

      const res = await fetch("/api/admin/page-texts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: activeTab, fields: changedFields }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`Successfully saved ${updateCount} text elements for "${pageName}".`);
        setChangedFields({});
        await fetchTexts();
      } else {
        setError(data.message || "Failed to update page texts.");
      }
    } catch (err) {
      setError("An unexpected error occurred while saving changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!activeTab || !pageTexts?.[activeTab]) return;
    const pageName = pageTexts[activeTab]?.name || "this page";

    if (!window.confirm(`Are you sure you want to reset all text overrides for "${pageName}" back to hardcoded defaults? Custom edits for this page will be removed.`)) {
      return;
    }

    try {
      setResetting(true);
      setError("");
      setSuccessMsg("");

      const res = await fetch(`/api/admin/page-texts?pageKey=${activeTab}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`All custom overrides for "${pageName}" have been reset to default values.`);
        setChangedFields({});
        await fetchTexts();
      } else {
        setError(data.message || "Failed to reset page texts.");
      }
    } catch (err) {
      setError("An unexpected error occurred while resetting defaults.");
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
        <div className="w-12 h-12 rounded-2xl border-4 border-slate-200 border-t-brand-teal animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Loading Page Text Configurations...</p>
      </div>
    );
  }

  const activePageData = pageTexts?.[activeTab];
  const unsavedCount = Object.keys(changedFields).length;

  // Filter fields based on search query
  const filteredFields = activePageData?.fields?.filter((f) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.key.toLowerCase().includes(q) ||
      f.label.toLowerCase().includes(q) ||
      f.default.toLowerCase().includes(q) ||
      (f.customValue && f.customValue.toLowerCase().includes(q)) ||
      (f.section && f.section.toLowerCase().includes(q))
    );
  }) || [];

  // Group fields by section title
  const groupedFields = filteredFields.reduce((acc, field) => {
    const sectionName = field.section || "📄 General Page Elements";
    if (!acc[sectionName]) acc[sectionName] = [];
    acc[sectionName].push(field);
    return acc;
  }, {});

  return (
    <div className="space-y-8  animate-[fadeIn_0.3s_ease-out]">

      {/* ───── Page Header ───── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-brand-dark to-brand-blue p-6 rounded-4xl text-white shadow-xl shadow-slate-900/10 border border-white/5 relative overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {unsavedCount > 0 && (
              <span className="text-[10px] font-extrabold text-brand-orange bg-amber-50 px-2.5 py-1 rounded-md uppercase tracking-wider border border-amber-200 animate-pulse">
                {unsavedCount} Unsaved {unsavedCount === 1 ? "Edit" : "Edits"}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 font-oswald">
            <BookOpen className="w-7 h-7 text-white" />
            Page Text Management
          </h2>
          <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed">
            Directly update headings, hero titles, descriptions, and CTA labels across marketing pages without code redeployments.
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
          <button
            onClick={handleResetDefaults}
            disabled={resetting || saving}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            title="Reset active page text overrides to code default values"
          >
            <RotateCcw className={`w-4 h-4 ${resetting ? "animate-spin" : ""}`} />
            <span>{resetting ? "Resetting..." : "Reset Defaults"}</span>
          </button>

          <button
            onClick={handleSaveChanges}
            disabled={saving || unsavedCount === 0}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer
              ${unsavedCount > 0
                ? "bg-[#013144] hover:bg-[#024965] text-white shadow-[#013144]/20 active:scale-95"
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
          >
            <Save className={`w-4 h-4 ${saving ? "animate-spin" : ""}`} />
            <span>{saving ? "Saving Changes..." : `Save Edits ${unsavedCount > 0 ? `(${unsavedCount})` : ""}`}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-sm animate-[slideInLeft_0.2s_ease-out]">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-sm animate-[slideInLeft_0.2s_ease-out]">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

        {/* Sidebar Navigation */}
        <div className="space-y-4 lg:sticky lg:top-6 self-start">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Select Page</span>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                {Object.keys(pageTexts || {}).length} Pages
              </span>
            </div>
            <nav className="space-y-1.5">
              {Object.keys(pageTexts || {}).map((key) => {
                const isActive = activeTab === key;
                const page = pageTexts[key];
                const activeOverrides = page.fields.filter(f => f.customValue !== null).length;

                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (unsavedCount > 0 && !window.confirm("You have unsaved changes. Switch pages anyway? Unsaved modifications will be lost.")) {
                        return;
                      }
                      setActiveTab(key);
                      setChangedFields({});
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all text-left cursor-pointer group relative
                      ${isActive
                        ? "bg-[#013144] text-white shadow-md shadow-[#013144]/15 translate-x-1"
                        : "text-slate-650 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-0.5"
                      }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-[#00cc9c]" : "text-slate-400 group-hover:text-slate-600"}`} />
                      <span className="truncate">{page.name}</span>
                    </div>
                    {activeOverrides > 0 && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0
                        ${isActive ? "bg-[#00cc9c] text-[#013144]" : "bg-slate-100 text-slate-500"}`}>
                        {activeOverrides}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {activePageData?.path && (
            <a
              href={activePageData.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 text-xs font-extrabold text-slate-700 rounded-2xl hover:bg-[#013144] hover:text-white hover:border-[#013144] active:scale-[0.98] transition-all shadow-2xs group"
            >
              <span>View Live Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00cc9c] transition-colors" />
            </a>
          )}
        </div>

        {/* Content Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xs p-6 sm:p-8 flex flex-col min-w-0">

          {/* Active Page Header & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight font-oswald">
                {activePageData?.name} Text Elements
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Customize specific copy blocks and override browser texts by page section.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search text keys or values..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveChanges} className="space-y-8 flex-1">
            {filteredFields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
                <Search className="w-10 h-10 text-slate-200" />
                <p className="text-sm font-semibold">No text elements found matching your query.</p>
              </div>
            ) : (
              Object.entries(groupedFields).map(([sectionTitle, fields]) => (
                <div key={sectionTitle} className="space-y-4">
                  {/* Section Group Banner Header */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-[#00cc9c]" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#013144] font-oswald">
                        {sectionTitle}
                      </h4>
                    </div>
                    <span className="text-[10px] font-extrabold bg-white text-slate-600 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {fields.length} {fields.length === 1 ? "element" : "elements"}
                    </span>
                  </div>

                  {/* Grid of Fields for this Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fields.map((field) => {
                      const hasCustom = field.customValue !== null;
                      const isModified = changedFields[field.key] !== undefined;
                      const currentValue = isModified ? changedFields[field.key] : (field.customValue ?? "");
                      const isFullWidth = field.type === "textarea";

                      return (
                        <div
                          key={field.key}
                          className={`p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between
                            ${isFullWidth ? "md:col-span-2" : ""}
                            ${isModified
                              ? "bg-amber-50/20 border-amber-200 shadow-sm"
                              : hasCustom
                                ? "bg-teal-50/10 border-teal-200"
                                : "bg-slate-50/30 border-slate-200 hover:border-slate-300"
                            }`}
                        >
                          {/* Top labels */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-extrabold text-slate-700 tracking-wide">
                                {field.label}
                              </label>
                              <span className="text-[10px] text-slate-400 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                                {field.key}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {isModified ? (
                                <span className="text-[9px] font-extrabold uppercase text-brand-orange bg-amber-100/50 px-2 py-0.5 rounded-md tracking-wider">
                                  Unsaved Edit
                                </span>
                              ) : hasCustom ? (
                                <span className="text-[9px] font-extrabold uppercase text-brand-teal bg-teal-100/50 px-2 py-0.5 rounded-md tracking-wider">
                                  Custom Override
                                </span>
                              ) : (
                                <span className="text-[9px] font-extrabold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md tracking-wider">
                                  Default Fallback
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Input / Textarea Field */}
                          <div className="space-y-2">
                            {field.type === "textarea" ? (
                              <textarea
                                placeholder={field.default}
                                value={currentValue}
                                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-xs font-semibold h-24 resize-none leading-relaxed"
                              />
                            ) : (
                              <input
                                type="text"
                                placeholder={field.default}
                                value={currentValue}
                                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-xs font-semibold leading-relaxed"
                              />
                            )}

                            {/* Readonly Default Fallback Preview */}
                            {(hasCustom || isModified || currentValue !== "") && (
                              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-start gap-2 animate-[fadeIn_0.2s_ease-out]">
                                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Original Default Text</span>
                                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5 wrap-break-word">
                                    {field.default}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </form>

        </div>
      </div>
    </div>
  );
}