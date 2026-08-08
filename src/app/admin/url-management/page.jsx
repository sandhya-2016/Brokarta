"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Globe, 
  Link2, 
  Search, 
  RotateCcw, 
  AlertCircle, 
  ExternalLink,
  Loader2,
  FileCode,
  CheckCircle2,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Film,
  X
} from "lucide-react";

// Fields that accept file uploads and what type
const UPLOAD_FIELDS = {
  headerLogo:    { accept: "image/*",  label: "Upload Image",  type: "image" },
  unifyLogo:     { accept: "image/*",  label: "Upload Image",  type: "image" },
  heroVideo:     { accept: "video/*",  label: "Upload Video",  type: "video" },
  overviewVideo: { accept: "video/*",  label: "Upload Video",  type: "video" },
};

export default function AdminUrlManagementPage() {
  const [sections, setSections] = useState({});
  const [overrides, setOverrides] = useState({});
  const [originalOverrides, setOriginalOverrides] = useState({});
  
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Per-field upload progress tracking: { [fieldKey]: "idle" | "uploading" | "done" | "error" }
  const [uploadStates, setUploadStates] = useState({});
  const fileInputRefs = useRef({});

  // Load URL schemas & database overrides
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/page-urls");
        if (!res.ok) throw new Error("Failed to load URLs configuration");
        const data = await res.json();
        
        setSections(data.sections || {});
        setOverrides(data.overrides || {});
        setOriginalOverrides(data.overrides || {});
        
        const keys = Object.keys(data.sections || {});
        if (keys.length > 0) {
          setSelectedSection(keys[0]);
        }
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Update a single field override
  const handleFieldChange = (key, value) => {
    setOverrides(prev => ({ ...prev, [key]: value }));
  };

  // Check if a field is modified from database values
  const isFieldModified = (key) => {
    const currentVal = (overrides[key] || "").trim();
    const originalVal = (originalOverrides[key] || "").trim();
    return currentVal !== originalVal;
  };

  // Total unsaved modifications
  const modifiedCount = Object.keys(overrides).filter(key => isFieldModified(key)).length;

  // Upload file and patch field value automatically
  const handleFileUpload = async (fieldKey, file) => {
    if (!file) return;

    setUploadStates(prev => ({ ...prev, [fieldKey]: "uploading" }));
    setErrorMsg("");

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Upload failed");

      handleFieldChange(fieldKey, data.filePath);
      setUploadStates(prev => ({ ...prev, [fieldKey]: "done" }));

      setTimeout(() => {
        setUploadStates(prev => ({ ...prev, [fieldKey]: "idle" }));
      }, 3000);
    } catch (err) {
      setErrorMsg(`Upload failed for "${fieldKey}": ${err.message}`);
      setUploadStates(prev => ({ ...prev, [fieldKey]: "error" }));
      setTimeout(() => {
        setUploadStates(prev => ({ ...prev, [fieldKey]: "idle" }));
      }, 4000);
    }
  };

  // Flat schema defaults helper
  const getFlatDefaults = () => {
    const flat = {};
    Object.values(sections).forEach(sect => {
      sect.fields.forEach(f => { flat[f.key] = f.default; });
    });
    return flat;
  };

  // Save overrides to the database
  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMsg("");
      setSuccessMsg("");

      const res = await fetch("/api/admin/page-urls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overrides })
      });

      if (!res.ok) throw new Error("Failed to save URL overrides");

      setOriginalOverrides(overrides);
      setSuccessMsg("URL and Asset overrides saved successfully – caches flushed.");
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRevert = () => {
    setOverrides(originalOverrides);
    setSuccessMsg("Reverted all unsaved modifications.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleResetToDefaults = () => {
    if (!window.confirm(`Are you sure you want to restore factory default values for all elements in "${sections[selectedSection]?.name}"? You will need to click Save to record changes.`)) return;
    const defaults = getFlatDefaults();
    const newOverrides = { ...overrides };
    (sections[selectedSection]?.fields || []).forEach(f => { newOverrides[f.key] = defaults[f.key]; });
    setOverrides(newOverrides);
    setSuccessMsg(`Restored factory defaults for ${sections[selectedSection]?.name}. Click Save Changes to apply.`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00cc9c] animate-spin mb-4" />
        <p className="text-slate-500 font-semibold text-sm">Loading URL & Asset Configuration...</p>
      </div>
    );
  }

  const activeSectionInfo = sections[selectedSection];
  const filteredFields = (activeSectionInfo?.fields || []).filter(field => {
    const query = searchQuery.toLowerCase();
    return (
      field.label.toLowerCase().includes(query) ||
      field.key.toLowerCase().includes(query) ||
      field.default.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#013144] to-[#02647e] p-6 rounded-[32px] text-white shadow-xl shadow-slate-900/10 border border-white/5 relative overflow-hidden">
        <div className="absolute right-[-100px] top-[-50px] w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00cc9c]" />
            <h2 className="text-2xl font-black font-oswald tracking-wide uppercase">URL & Asset Management</h2>
          </div>
          <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed">
            Manage store links, social channels, support emails, logos, and showcase videos. Upload files directly to the server.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          {modifiedCount > 0 && (
            <>
              <button
                onClick={handleRevert}
                disabled={saving}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
              >
                Discard ({modifiedCount})
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#00cc9c] text-[#013144] font-black text-xs uppercase tracking-wider transition-all hover:bg-[#00e6b0] active:scale-95 disabled:opacity-50 cursor-pointer shadow-md shadow-[#00cc9c]/20 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Alert Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-sm animate-[slideInLeft_0.2s_ease-out]">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-sm animate-[slideInLeft_0.2s_ease-out]">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span className="flex-1">{errorMsg}</span>
          <button onClick={() => setErrorMsg("")} className="text-red-400 hover:text-red-600 shrink-0 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        
        {/* Left Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm space-y-4">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block px-1">SELECT CATEGORY</span>
            <nav className="space-y-1.5">
              {Object.entries(sections).map(([key, info]) => {
                const isSelected = selectedSection === key;
                const sectModifiedCount = info.fields.filter(f => isFieldModified(f.key)).length;
                const hasUploadFields = info.fields.some(f => UPLOAD_FIELDS[f.key]);

                return (
                  <button
                    key={key}
                    onClick={() => { setSelectedSection(key); setSearchQuery(""); }}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left cursor-pointer group
                      ${isSelected 
                        ? "bg-[#013144] text-white shadow-md shadow-slate-900/10 scale-[1.02]" 
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {key === "links"    && <Link2    className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#00cc9c]" : "text-slate-400 group-hover:text-slate-600"}`} />}
                      {key === "contacts" && <Globe    className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#00cc9c]" : "text-slate-400 group-hover:text-slate-600"}`} />}
                      {key === "assets"   && <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#00cc9c]" : "text-slate-400 group-hover:text-slate-600"}`} />}
                      <span className="truncate">{info.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {hasUploadFields && (
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                          <Upload className="w-2.5 h-2.5 inline" />
                        </span>
                      )}
                      {sectModifiedCount > 0 && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0
                          ${isSelected ? "bg-[#f6a200] text-white" : "bg-[#f6a200]/10 text-[#f6a200]"}`}>
                          {sectModifiedCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm p-6 sm:p-8 flex flex-col min-w-0">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                {activeSectionInfo?.name} Elements
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Edit URL values directly or upload media files for logos & videos.
              </p>
            </div>
            <button
              onClick={handleResetToDefaults}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Reset Defaults
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search keys, labels, or paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00cc9c] text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all"
            />
          </div>

          {/* Fields */}
          <div className="space-y-6">
            {filteredFields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
                <Search className="w-10 h-10 text-slate-200" />
                <p className="text-sm font-semibold">No assets found matching your query.</p>
              </div>
            ) : (
              filteredFields.map(field => {
                const isModified   = isFieldModified(field.key);
                const hasCustom    = originalOverrides[field.key] !== undefined;
                const currentValue = overrides[field.key] !== undefined ? overrides[field.key] : field.default;
                const uploadInfo   = UPLOAD_FIELDS[field.key];
                const uploadState  = uploadStates[field.key] || "idle";
                const isUploading  = uploadState === "uploading";
                const uploadDone   = uploadState === "done";

                // Detect whether the current path looks like a local image or video
                const isLocalImage = uploadInfo?.type === "image" && (currentValue.startsWith("/") || currentValue.startsWith("http"));
                const isLocalVideo = uploadInfo?.type === "video" && (currentValue.startsWith("/") || currentValue.startsWith("http"));

                return (
                  <div
                    key={field.key}
                    className={`p-5 rounded-2xl border transition-all duration-300
                      ${isModified 
                        ? "bg-amber-50/30 border-amber-200 shadow-sm"
                        : hasCustom
                          ? "bg-teal-50/10 border-teal-100"
                          : "bg-slate-50/30 border-slate-100 hover:border-slate-200"
                      }`}
                  >
                    {/* Field header row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          {uploadInfo?.type === "image" && <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                          {uploadInfo?.type === "video" && <Film       className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                          <span className="font-extrabold text-sm text-slate-800 tracking-wide">{field.label}</span>
                        </div>
                        <code className="block text-teal-600 text-[10px] font-mono mt-0.5 select-all">{field.key}</code>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isModified && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200 text-[9px] font-black uppercase tracking-wider">
                            Modified
                          </span>
                        )}
                        {hasCustom && !isModified && (
                          <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-700 border border-teal-200 text-[9px] font-black uppercase tracking-wider">
                            Overridden
                          </span>
                        )}
                        {uploadDone && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Uploaded
                          </span>
                        )}
                        {/* External link */}
                        <a
                          href={!currentValue.startsWith("/") && !currentValue.startsWith("mailto:") ? currentValue : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 transition-all ${
                            currentValue.startsWith("/") || currentValue.startsWith("mailto:") ? "pointer-events-none opacity-20" : ""
                          }`}
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* URL text input + upload button row */}
                    <div className={`flex gap-2 ${uploadInfo ? "flex-col sm:flex-row" : ""}`}>
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.default}
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cc9c] text-xs font-semibold placeholder-slate-400 rounded-xl transition-all"
                      />

                      {/* Upload button — only for media fields */}
                      {uploadInfo && (
                        <>
                          {/* Hidden real file input */}
                          <input
                            type="file"
                            accept={uploadInfo.accept}
                            className="hidden"
                            ref={el => { fileInputRefs.current[field.key] = el; }}
                            onChange={(e) => handleFileUpload(field.key, e.target.files?.[0])}
                          />
                          <button
                            type="button"
                            disabled={isUploading}
                            onClick={() => fileInputRefs.current[field.key]?.click()}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer shrink-0
                              ${isUploading
                                ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                                : "bg-[#013144] text-white hover:bg-[#012230] active:scale-95 shadow-sm shadow-slate-900/10"
                              }`}
                          >
                            {isUploading 
                              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...</>
                              : <><Upload className="w-3.5 h-3.5" /> {uploadInfo.label}</>
                            }
                          </button>
                        </>
                      )}
                    </div>

                    {/* Inline media preview */}
                    {uploadInfo && currentValue && (
                      <div className="mt-3">
                        {isLocalImage && (
                          <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 w-full max-h-40 flex items-center justify-center p-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={currentValue}
                              alt="Preview"
                              className="max-h-36 max-w-full object-contain rounded-lg"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                          </div>
                        )}
                        {isLocalVideo && (
                          <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-900">
                            <video
                              src={currentValue}
                              controls
                              className="w-full max-h-40 rounded-xl"
                              preload="metadata"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Default hint on modification */}
                    {isModified && (
                      <div className="mt-2 text-slate-400 text-[10px] font-bold flex flex-wrap items-center gap-1.5">
                        <span className="uppercase text-amber-600">Default:</span>
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 break-all">{field.default}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
