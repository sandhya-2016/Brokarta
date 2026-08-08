"use client";

import { useEffect, useState } from "react";
import {
  MailOpen,
  Search,
  Filter,
  Eye,
  Calendar,
  AlertCircle,
  X,
  Building2,
  Phone,
  Mail,
  User,
  Briefcase,
  CheckCircle2,
  UsersRound,
  Trash2,
  CheckSquare,
  Square
} from "lucide-react";
import AdminPopupModal from "@/components/ui/AdminPopupModal";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters State
  const [statusFilter, setStatusFilter] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Multi-Selection State for Bulk Actions
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("CONTACTED");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Detail Drawer State
  const [selectedLead, setSelectedLead] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Search Input Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    loadLeads();
  }, [statusFilter, userTypeFilter, startDate, endDate, searchQuery, currentPage]);

  async function loadLeads() {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();
      if (statusFilter) queryParams.append("status", statusFilter);
      if (userTypeFilter) queryParams.append("userType", userTypeFilter);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);
      queryParams.append("page", String(currentPage));
      queryParams.append("limit", "10");
      if (searchQuery) queryParams.append("search", searchQuery);

      const res = await fetch(`/api/admin/leads?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load leads");

      const data = await res.json();
      setLeads(data.leads || []);
      setTotalRecords(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / 10));
      setSelectedIds([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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

  const handleUpdateStatus = async (leadId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to update status");

      setLeads(leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err) {
      showAlert(err.message, "Update Failed", "error");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteLead = (leadId) => {
    showConfirmDialog(
      "Are you sure you want to delete this lead record? This action cannot be undone.",
      async () => {
        try {
          const res = await fetch(`/api/admin/leads/${leadId}`, {
            method: "DELETE",
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data.message || "Failed to delete lead");

          if (selectedLead?.id === leadId) setSelectedLead(null);
          loadLeads();
          showAlert("Lead record deleted successfully", "Success", "success");
        } catch (err) {
          showAlert(err.message, "Delete Failed", "error");
        }
      },
      "Delete Lead Record",
      "delete"
    );
  };

  // Bulk Actions
  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map((l) => l.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkAction = async (action) => {
    if (selectedIds.length === 0) return;

    const executeBulk = async () => {
      try {
        const payload = { action, ids: selectedIds };
        if (action === "UPDATE_STATUS") payload.status = bulkStatus;

        const res = await fetch("/api/admin/leads/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Bulk action failed");

        showAlert(data.message || "Bulk operation completed successfully", "Success", "success");
        loadLeads();
      } catch (err) {
        showAlert(err.message, "Bulk Action Failed", "error");
      }
    };

    if (action === "DELETE") {
      showConfirmDialog(
        `Are you sure you want to delete ${selectedIds.length} lead records? This cannot be undone.`,
        executeBulk,
        "Bulk Delete Leads",
        "delete"
      );
    } else {
      executeBulk();
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "CONTACTED":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "QUALIFIED":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "CLOSED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "REJECTED":
        return "bg-red-500/10 text-red-600 border-red-200";
      default:
        return "bg-slate-100 text-slate-650 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Page Title */}
      <div className="bg-gradient-to-r from-[#013144] to-[#02647e] p-6 rounded-[32px] text-white shadow-xl shadow-slate-900/10 border border-white/5 relative overflow-hidden">
        <div className="absolute right-[-100px] top-[-50px] w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <UsersRound className="w-5 h-5 text-[#00cc9c]" />
            <h2 className="text-2xl font-black font-oswald tracking-wide uppercase">
              Leads CRM Dashboard
            </h2>
          </div>

          <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed mt-1">
            Track, follow up, and manage network partnership inquiries. Filter by status, perform bulk updates, and review lead inquiry details.
          </p>
        </div>
      </div>

      {/* CRM Actions & Filters bar */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
        {/* Row 1: Search & Dynamic Filters */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 md:col-span-2">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or firm..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none text-xs"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={userTypeFilter}
              onChange={(e) => {
                setUserTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent border-none text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="">All User Types</option>
              <option value="BROKER">Broker</option>
              <option value="AGENCY">Agency</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2">
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent border-none text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="CLOSED">Closed</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {(statusFilter || userTypeFilter || startDate || endDate || searchInput) && (
            <button
              onClick={() => {
                setStatusFilter("");
                setUserTypeFilter("");
                setStartDate("");
                setEndDate("");
                setSearchInput("");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="text-xs font-bold text-red-500 hover:text-red-700 text-center cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Row 2: Date Filters & Bulk Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-550 text-xs font-bold">
              <Calendar className="w-4 h-4" />
              Date Range:
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
              />
              <span className="text-slate-400 text-xs">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Bulk Action Controls */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-2xl text-xs font-bold animate-[fadeIn_0.2s_ease-out]">
              <span>{selectedIds.length} Selected</span>
              <select
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value)}
                className="bg-slate-800 text-white text-xs px-2.5 py-1 rounded-xl focus:outline-none cursor-pointer border border-slate-700"
              >
                <option value="PENDING">Set Pending</option>
                <option value="CONTACTED">Set Contacted</option>
                <option value="QUALIFIED">Set Qualified</option>
                <option value="CLOSED">Set Closed</option>
                <option value="REJECTED">Set Rejected</option>
              </select>
              <button
                onClick={() => handleBulkAction("UPDATE_STATUS")}
                className="bg-[#00cc9c] text-[#013144] px-3 py-1 rounded-xl font-bold hover:bg-[#00e6b0] cursor-pointer"
              >
                Apply Status
              </button>
              <button
                onClick={() => handleBulkAction("DELETE")}
                className="bg-red-500 text-white px-3 py-1 rounded-xl font-bold hover:bg-red-600 cursor-pointer"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-[#013144] border-t-transparent animate-spin"></div>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <MailOpen className="w-12 h-12 opacity-30 mx-auto mb-3" />
            <p className="font-semibold text-sm">No leads match filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="pb-3 pl-2 w-10">
                    <button onClick={toggleSelectAll} className="text-slate-400 hover:text-[#013144] cursor-pointer">
                      {selectedIds.length === leads.length ? (
                        <CheckSquare className="w-4 h-4 text-[#00cc9c]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3">Client Info</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Looking For</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {leads.map((lead) => {
                  const isSelected = selectedIds.includes(lead.id);
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`hover:bg-slate-50/50 cursor-pointer transition-colors ${isSelected ? "bg-teal-50/40" : ""
                        }`}
                    >
                      <td className="py-4 pl-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => toggleSelect(lead.id)} className="text-slate-400 hover:text-[#013144] cursor-pointer">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#00cc9c]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-4">
                        <p className="font-bold text-slate-850 truncate max-w-[160px]">{lead.fullName}</p>
                        <span className="text-[10px] text-slate-400 block font-normal mt-0.5">
                          Submitted {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4 text-xs font-semibold">
                        <p className="text-slate-700">{lead.email}</p>
                        <p className="text-slate-400 text-[10px] mt-0.5">{lead.phoneNumber}</p>
                      </td>
                      <td className="py-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-650 rounded-full">
                          {lead.userType}
                        </span>
                      </td>
                      <td className="py-4 text-xs text-slate-600 truncate max-w-[140px]">
                        {lead.lookingFor?.replace(/_/g, " ")}
                      </td>
                      <td className="py-4 text-xs text-slate-600">
                        {lead.companyName ? (
                          <>
                            <p className="font-semibold text-slate-750">{lead.companyName}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{lead.companyRole}</p>
                          </>
                        ) : (
                          <span className="text-slate-350 italic">—</span>
                        )}
                      </td>
                      <td className="py-4">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${getStatusStyle(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 pr-2 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 text-[#013144] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                            title="Delete Lead"
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
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6 ">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Showing page {currentPage} of {totalPages} ({totalRecords} total leads)
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
      </div>

      {/* DETAIL DRAWER / SLIDE-OUT OVERLAY */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease-out]">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedLead(null)}
          />
          <aside className="relative flex flex-col w-full max-w-lg bg-white h-full shadow-2xl animate-[slideInRight_0.2s_ease-out] z-10 p-6 md:p-8 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00cc9c]">
                  Lead Record Detail
                </span>
                <h3 className="text-lg font-black text-[#013144] mt-1">
                  Inquiry Status Card
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 flex-1">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#013144]/5 flex items-center justify-center text-[#013144]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-base">{selectedLead.fullName}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Submitted on {new Date(selectedLead.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Change Lead Status
                  </label>
                  <select
                    disabled={updatingStatus}
                    value={selectedLead.status}
                    onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-250 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUALIFIED">Qualified</option>
                    <option value="CLOSED">Closed (Won)</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3.5 pl-2">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Contact Information
                </h4>

                <div className="flex items-center gap-3 text-xs font-semibold text-slate-650">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline text-slate-800">
                    {selectedLead.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold text-slate-650">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`tel:${selectedLead.phoneNumber}`} className="hover:underline text-slate-800">
                    {selectedLead.phoneNumber}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-5">
                <div>
                  <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    User Type
                  </h5>
                  <p className="text-xs font-bold text-[#013144] mt-1 bg-[#013144]/5 px-2.5 py-1 rounded-lg inline-block">
                    {selectedLead.userType}
                  </p>
                </div>

                <div>
                  <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Looking For
                  </h5>
                  <p className="text-xs font-bold text-[#013144] mt-1 bg-[#013144]/5 px-2.5 py-1 rounded-lg inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                    {selectedLead.lookingFor?.replace(/_/g, " ")}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 pl-2">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Company / Firm Details
                </h4>

                {selectedLead.companyName ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-650">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{selectedLead.companyName}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-650">
                      <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{selectedLead.companyRole}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No company information provided.</p>
                )}
              </div>

              <div className="space-y-2.5 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Feedback or Query Message
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  {selectedLead.feedback ? `"${selectedLead.feedback}"` : "No message provided."}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 mt-6 flex gap-3">
              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="flex-1 py-3 bg-[#013144] text-white font-bold text-xs rounded-xl hover:bg-[#012230] transition-colors cursor-pointer"
              >
                Close Details Card
              </button>
            </div>
          </aside>
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
