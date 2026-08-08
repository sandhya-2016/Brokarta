"use client";

import { useEffect, useState } from "react";
import {
  History,
  Search,
  Filter,
  AlertCircle,
  Clock,
  ShieldCheck,
  Globe
} from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters State
  const [actionFilter, setActionFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    loadLogs();
  }, [actionFilter, entityFilter, searchQuery, currentPage]);

  async function loadLogs() {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (actionFilter) queryParams.append("action", actionFilter);
      if (entityFilter) queryParams.append("entity", entityFilter);
      queryParams.append("page", String(currentPage));
      queryParams.append("limit", "15");
      if (searchQuery) queryParams.append("search", searchQuery);

      const res = await fetch(`/api/admin/audit-logs?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load audit logs");
      const data = await res.json();
      setLogs(data.logs || []);
      setTotalRecords(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / 15));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const getActionBadgeClass = (action) => {
    switch (action) {
      case "CREATE":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "UPDATE":
      case "BULK_UPDATE":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "DELETE":
      case "BULK_DELETE":
        return "bg-red-500/10 text-red-600 border-red-200";
      case "LOGIN":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#013144] to-[#02647e] p-6 rounded-[32px] text-white shadow-xl shadow-slate-900/10 border border-white/5 relative overflow-hidden">
        <div className="absolute right-[-100px] top-[-50px] w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#00cc9c]" />
            <h2 className="text-2xl font-black font-oswald tracking-wide uppercase">
              System Audit Logs & Security History
            </h2>
          </div>

          <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed mt-1">
            Complete audit trail of all administrator operations, authentications, bulk edits, and entity modifications.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by email, details, or entity..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none text-xs font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Action Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-none text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="">All Actions</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="BULK_UPDATE">BULK_UPDATE</option>
              <option value="BULK_DELETE">BULK_DELETE</option>
              <option value="LOGIN">LOGIN</option>
            </select>
          </div>

          {/* Entity Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={entityFilter}
              onChange={(e) => {
                setEntityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-none text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="">All Entities</option>
              <option value="Lead">Lead</option>
              <option value="CommunityTestimonial">CommunityTestimonial</option>
              <option value="StoryPanel">StoryPanel</option>
              <option value="WorkflowItem">WorkflowItem</option>
              <option value="PageText">PageText</option>
              <option value="AppUrl">AppUrl</option>
              <option value="SEOPage">SEOPage</option>
              <option value="AdminUser">AdminUser</option>
            </select>
          </div>

          {(actionFilter || entityFilter || searchInput) && (
            <button
              onClick={() => {
                setActionFilter("");
                setEntityFilter("");
                setSearchInput("");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
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
      ) : logs.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-100 rounded-[32px] text-slate-400">
          <History className="w-12 h-12 opacity-30 mx-auto mb-3" />
          <p className="font-semibold text-sm">No audit logs match current filters.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
                <th className="pb-3 pl-2">Timestamp</th>
                <th className="pb-3">Admin</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Target Entity</th>
                <th className="pb-3">Details / Changes</th>
                <th className="pb-3 pr-2 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-xs">
              {logs.map((log) => (
                <tr key={log.id} className="text-slate-700 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pl-2 text-slate-500 font-semibold whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="py-3.5 font-bold text-[#013144]">
                    {log.adminEmail}
                  </td>
                  <td className="py-3.5">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${getActionBadgeClass(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 font-semibold text-slate-800">
                    {log.entity}
                  </td>
                  <td className="py-3.5 text-slate-600 max-w-md truncate" title={log.details}>
                    {log.details || "—"}
                  </td>
                  <td className="py-3.5 pr-2 text-right text-slate-400 font-mono text-[11px]">
                    {log.ipAddress || "127.0.0.1"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6 ">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Showing page {currentPage} of {totalPages} ({totalRecords} total logs)
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
      )}
    </div>
  );
}
