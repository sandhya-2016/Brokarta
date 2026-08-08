import { getDashboardMetrics } from "@/lib/dashboard/getDashboardMetrics";
import {
  MailOpen,
  Users2,
  Compass,
  Layers3,
  ArrowRight,
  ShieldCheck,
  History,
  Activity,
  UserCheck,
  Building2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardMetrics();

  const statCards = [
    {
      label: "Total CRM Leads",
      value: stats.totalLeads,
      badge: `${stats.pendingLeads} pending action`,
      badgeColor: "bg-amber-100/80 text-amber-800 border-amber-200",
      icon: MailOpen,
      iconBg: "bg-blue-50 text-blue-600 border-blue-100",
      accentGlow: "group-hover:border-blue-300",
      link: "/admin/leads",
    },
    {
      label: "Community Testimonials",
      value: stats.totalTestimonials,
      badge: `${stats.activeTestimonials} active on site`,
      badgeColor: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
      icon: Users2,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accentGlow: "group-hover:border-emerald-300",
      link: "/admin/community",
    },
    {
      label: "Story Panels",
      value: stats.totalPanels,
      badge: `${stats.activePanels} active timeline blocks`,
      badgeColor: "bg-sky-100/80 text-sky-800 border-sky-200",
      icon: Compass,
      iconBg: "bg-sky-50 text-sky-600 border-sky-100",
      accentGlow: "group-hover:border-sky-300",
      link: "/admin/about-us",
    },
    {
      label: "Workflow & SEO",
      value: stats.totalWorkflowItems || 5,
      badge: "Indexed search metadata",
      badgeColor: "bg-purple-100/80 text-purple-800 border-purple-200",
      icon: Layers3,
      iconBg: "bg-purple-50 text-purple-600 border-purple-100",
      accentGlow: "group-hover:border-purple-300",
      link: "/admin/seo",
    },
  ];

  const totalStatusLeads = stats.totalLeads || 1; // avoid divide by 0
  const pendingPct = Math.round((stats.pendingLeads / totalStatusLeads) * 100);
  const contactedPct = Math.round((stats.contactedLeads / totalStatusLeads) * 100);
  const qualifiedPct = Math.round((stats.qualifiedLeads / totalStatusLeads) * 100);
  const closedPct = Math.round((stats.closedLeads / totalStatusLeads) * 100);
  const rejectedPct = Math.round((stats.rejectedLeads / totalStatusLeads) * 100);

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">Pending</span>;
      case "CONTACTED":
        return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider">Contacted</span>;
      case "QUALIFIED":
        return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 uppercase tracking-wider">Qualified</span>;
      case "CLOSED":
        return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">Closed</span>;
      case "REJECTED":
        return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wider">Rejected</span>;
      default:
        return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">{status}</span>;
    }
  };

  const getActionBadgeColor = (action) => {
    if (action.includes("CREATE")) return "bg-emerald-500/15 text-emerald-700 border-emerald-200";
    if (action.includes("UPDATE")) return "bg-blue-500/15 text-blue-700 border-blue-200";
    if (action.includes("DELETE")) return "bg-rose-500/15 text-rose-700 border-rose-200";
    return "bg-slate-500/15 text-slate-700 border-slate-200";
  };

  return (
    <div className="space-y-8  animate-[fadeIn_0.3s_ease-out]">

      {/* ───── Welcome Header Banner ───── */}
      <div className="bg-gradient-to-r from-[#013144] via-[#024965] to-[#013144] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute right-[-20px] top-[-40px] w-80 h-80 bg-[#00cc9c]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00cc9c]" />
              <span className="absolute w-4 h-4 rounded-full bg-[#00cc9c]/40 animate-ping" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00cc9c] bg-[#00cc9c]/10 px-2.5 py-1 rounded-md border border-[#00cc9c]/20">
              Control Center Active
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-oswald uppercase">
            Brokarta Dashboard
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
            Real-time analytics for B2B real estate inquiries, marketing page text overrides, timeline panels, and system logs.
          </p>
        </div>

        {/* Quick Actions Header Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
          <Link
            href="/admin/leads"
            className="px-5 py-3 bg-[#00cc9c] hover:bg-[#00b88d] text-[#013144] rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-[#00cc9c]/20 hover:shadow-[#00cc9c]/30 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <MailOpen className="w-4 h-4" />
            <span>Manage CRM Leads</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/15 rounded-2xl font-bold text-xs active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00cc9c]" />
          </a>
        </div>
      </div>

      {/* ───── Top Metric Cards Grid ───── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              href={card.link}
              key={i}
              className={`p-6 bg-white border border-slate-200 rounded-3xl flex flex-col justify-between gap-4 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group ${card.accentGlow}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block">
                    {card.label}
                  </span>
                  <h3 className="text-3xl font-black text-[#013144] group-hover:text-[#00cc9c] transition-colors tracking-tight">
                    {card.value}
                  </h3>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.iconBg} shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${card.badgeColor}`}>
                  {card.badge}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#013144] group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ───── Main Dashboard Analytics Row ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (2 Cols): Lead Pipeline & User Type Distribution */}
        <div className="lg:col-span-2 space-y-8">

          {/* Pipeline Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2.5">
                  <Activity className="w-5 h-5 text-[#00cc9c]" />
                  CRM Lead Conversion Pipeline
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Real-time status breakdown across all broker inquiries</p>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs font-bold text-[#013144] hover:text-[#00cc9c] bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all shadow-xs"
              >
                <span>View All Leads</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              {/* Pending */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-amber-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Pending Action ({stats.pendingLeads})
                  </span>
                  <span className="text-slate-500 font-mono">{pendingPct}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500" style={{ width: `${pendingPct}%` }} />
                </div>
              </div>

              {/* Contacted */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-blue-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Contacted ({stats.contactedLeads})
                  </span>
                  <span className="text-slate-500 font-mono">{contactedPct}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500" style={{ width: `${contactedPct}%` }} />
                </div>
              </div>

              {/* Qualified */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-purple-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Qualified Lead ({stats.qualifiedLeads})
                  </span>
                  <span className="text-slate-500 font-mono">{qualifiedPct}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${qualifiedPct}%` }} />
                </div>
              </div>

              {/* Closed */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Closed / Won ({stats.closedLeads})
                  </span>
                  <span className="text-slate-500 font-mono">{closedPct}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${closedPct}%` }} />
                </div>
              </div>

              {/* Rejected */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-rose-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Rejected ({stats.rejectedLeads})
                  </span>
                  <span className="text-slate-500 font-mono">{rejectedPct}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-500" style={{ width: `${rejectedPct}%` }} />
                </div>
              </div>
            </div>

            {/* User Type Cards */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-5 text-center">
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#00cc9c]" />
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Brokers</span>
                </div>
                <span className="text-2xl font-black text-slate-800">{stats.leadsByUserType.BROKER}</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Agencies</span>
                </div>
                <span className="text-2xl font-black text-slate-800">{stats.leadsByUserType.AGENCY}</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Others</span>
                </div>
                <span className="text-2xl font-black text-slate-800">{stats.leadsByUserType.OTHERS}</span>
              </div>
            </div>
          </div>

          {/* Recent Inquiries List */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <MailOpen className="w-4 h-4 text-blue-600" />
                Recent CRM Inquiries
              </h3>
              <Link href="/admin/leads" className="text-xs font-bold text-blue-600 hover:underline">
                View All CRM Leads
              </Link>
            </div>

            <div className="space-y-3">
              {stats.recentLeads.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-6 text-center">No leads submitted yet.</p>
              ) : (
                stats.recentLeads.map((lead) => (
                  <div key={lead.id} className="p-4 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800 truncate">{lead.fullName}</span>
                        {getStatusBadge(lead.status)}
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {lead.email} {lead.companyName ? `• ${lead.companyName}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700 uppercase tracking-wider border border-slate-300/60">
                        {lead.userType}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Audit Feed & Quick Shortcuts */}
        <div className="space-y-8">

          {/* Audit Stream */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <History className="w-4 h-4 text-purple-600" />
                Recent Audit Trail
              </h3>
              <Link href="/admin/audit-logs" className="text-xs font-bold text-purple-600 hover:underline">
                Audit Logs
              </Link>
            </div>

            <div className="space-y-3">
              {stats.recentAuditLogs.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-6 text-center">No system activity logged yet.</p>
              ) : (
                stats.recentAuditLogs.map((log) => (
                  <div key={log.id} className="p-3.5 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5 transition-all">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider ${getActionBadgeColor(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 truncate">
                      {log.entity} {log.entityId ? `#${log.entityId.slice(0, 6)}` : ""}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{log.details || log.adminEmail}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Management Grid */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#013144] tracking-tight">System Module Shortcuts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/admin/pages-management"
                className="p-3.5 bg-slate-50 hover:bg-[#013144] hover:text-white rounded-2xl border border-slate-200 text-slate-700 transition-all font-bold text-xs flex items-center justify-between group shadow-xs"
              >
                <span>Page Texts</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00cc9c] transition-colors" />
              </Link>

              <Link
                href="/admin/community"
                className="p-3.5 bg-slate-50 hover:bg-[#013144] hover:text-white rounded-2xl border border-slate-200 text-slate-700 transition-all font-bold text-xs flex items-center justify-between group shadow-xs"
              >
                <span>Testimonials</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00cc9c] transition-colors" />
              </Link>

              <Link
                href="/admin/about-us"
                className="p-3.5 bg-slate-50 hover:bg-[#013144] hover:text-white rounded-2xl border border-slate-200 text-slate-700 transition-all font-bold text-xs flex items-center justify-between group shadow-xs"
              >
                <span>Story Panels</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00cc9c] transition-colors" />
              </Link>

              <Link
                href="/admin/seo"
                className="p-3.5 bg-slate-50 hover:bg-[#013144] hover:text-white rounded-2xl border border-slate-200 text-slate-700 transition-all font-bold text-xs flex items-center justify-between group shadow-xs"
              >
                <span>SEO Metadata</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00cc9c] transition-colors" />
              </Link>

              <Link
                href="/admin/url-management"
                className="p-3.5 bg-slate-50 hover:bg-[#013144] hover:text-white rounded-2xl border border-slate-200 text-slate-700 transition-all font-bold text-xs flex items-center justify-between group shadow-xs"
              >
                <span>URL Assets</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00cc9c] transition-colors" />
              </Link>

              <Link
                href="/admin/audit-logs"
                className="p-3.5 bg-slate-50 hover:bg-[#013144] hover:text-white rounded-2xl border border-slate-200 text-slate-700 transition-all font-bold text-xs flex items-center justify-between group shadow-xs"
              >
                <span>Audit Logs</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00cc9c] transition-colors" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
