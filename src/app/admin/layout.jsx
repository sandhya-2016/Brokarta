"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  Compass,
  Layers3,
  MailOpen,
  Globe2,
  Settings,
  LogOut,
  Menu,
  X,
  UserCheck,
  BookOpen,
  Link2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  ShieldCheck,
  History
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [status, pathname, router]);

  // If path is /admin/login, don't wrap it with the sidebar layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
          <span className="text-sm font-semibold text-slate-500">Loading admin session...</span>
        </div>
      </div>
    );
  }

  // Redirect client side if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  const menuGroups = [
    {
      title: "Content & CMS",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Community Testimonials", href: "/admin/community", icon: Users2 },
        { label: "Pages Management", href: "/admin/pages-management", icon: BookOpen },
        { label: "Story Panels", href: "/admin/about-us", icon: Compass },
        { label: "Leads CRM", href: "/admin/leads", icon: MailOpen },
        { label: "URL/Asset Management", href: "/admin/url-management", icon: Link2 },
      ]
    },
    {
      title: "System & Audit",
      items: [
        { label: "SEO Metadata", href: "/admin/seo", icon: Globe2 },
        { label: "Audit Logs", href: "/admin/audit-logs", icon: History },
        { label: "Settings", href: "/admin/settings", icon: Settings },
      ]
    }
  ];

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100/80 text-slate-900 flex overflow-hidden admin-scope font-roboto relative">

      {/* ───── Ambient Glassmorphism Glow Background Auras ───── */}
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-[#00cc9c]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-1/3 -right-32 w-96 h-96 bg-[#013144]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* ───── Sidebar - Desktop ───── */}
      <aside
        className={`hidden lg:flex flex-col bg-white/80 backdrop-blur-2xl border-r border-slate-200/80 shrink-0 h-full transition-all duration-300 ease-in-out relative z-30 shadow-xs
          ${collapsed ? "w-20" : "w-72"}`}
      >
        {/* Logo Section */}
        <div className={`h-20 flex items-center border-b border-slate-100/80 shrink-0 overflow-hidden transition-all duration-300
          ${collapsed ? "px-0 justify-center" : "px-6 gap-3.5"}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#013144] via-[#024965] to-[#00cc9c] flex items-center justify-center text-white font-black text-base shadow-md shadow-[#013144]/20 shrink-0 border border-white/20">
            B
          </div>
          <div className={`flex flex-col transition-all duration-300 overflow-hidden ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
            <div className="flex items-center gap-2">
              <span className="font-black text-base text-[#013144] tracking-tight whitespace-nowrap">
                Brokarta
              </span>
              <span className="text-[10px] font-extrabold bg-[#00cc9c]/15 text-[#014050] px-1.5 py-0.5 rounded-md tracking-wider uppercase border border-[#00cc9c]/30 backdrop-blur-xs">
                Admin
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 truncate">Control Center</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className={`flex-1 py-4 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-thin ${collapsed ? "px-2.5" : "px-3"}`}>
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed ? (
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 pb-1.5 ">
                  {group.title}
                </h4>
              ) : idx > 0 ? (
                <div className="my-3 border-t border-slate-200/80 mx-2" />
              ) : null}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <div key={item.href} className="relative group/nav flex justify-center">
                    <Link
                      href={item.href}
                      className={`flex items-center transition-all duration-200 relative
                        ${collapsed
                          ? "w-11 h-11 justify-center rounded-xl mx-auto"
                          : "gap-3.5 px-3.5 py-2.5 rounded-xl w-full"
                        }
                        ${isActive
                          ? "bg-[#013144] text-white shadow-md shadow-[#013144]/20 font-bold border border-[#00cc9c]/40"
                          : "text-slate-650 hover:bg-slate-100/70 hover:text-slate-900"
                        }`}
                    >
                      {isActive && !collapsed && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#00cc9c] rounded-r-full shadow-xs" />
                      )}
                      <Icon className={`shrink-0 transition-transform duration-200 group-hover/nav:scale-110 ${collapsed ? "w-5 h-5" : "w-4 h-4 sm:w-5 sm:h-5"} ${isActive ? "text-[#00cc9c]" : "text-slate-400 group-hover/nav:text-slate-700"}`} />

                      {!collapsed && (
                        <span className="whitespace-nowrap transition-all duration-300 overflow-hidden">
                          {item.label}
                        </span>
                      )}
                    </Link>

                    {/* Tooltip when collapsed */}
                    {collapsed && (
                      <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50
                        opacity-0 group-hover/nav:opacity-100 transition-opacity duration-150">
                        <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl flex items-center gap-2 border border-white/10">
                          {item.label}
                          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/90" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Card & Logout */}
        <div className={`border-t border-slate-100/80 transition-all duration-300 ${collapsed ? "p-3 flex flex-col items-center gap-3" : "p-4"}`}>
          {collapsed ? (
            <>
              {/* Collapsed Avatar */}
              <div className="relative group/avatar">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-[#013144] border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-xs">
                  {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "A"}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>

                {/* Tooltip for User Info when collapsed */}
                <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-150">
                  <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                    <p className="text-[10px] text-[#00cc9c] font-bold uppercase">{session?.user?.role || "ADMIN"}</p>
                    <p className="font-bold">{session?.user?.name || "Administrator"}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{session?.user?.email}</p>
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/90" />
                  </div>
                </div>
              </div>

              {/* Collapsed Logout Button */}
              <div className="relative group/logout w-full flex justify-center">
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="w-11 h-11 rounded-xl border border-slate-200/80 bg-white/60 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 active:scale-[0.98] transition-all font-bold text-xs cursor-pointer flex items-center justify-center backdrop-blur-xs"
                  title="Logout Session"
                >
                  <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover/logout:-translate-x-0.5" />
                </button>

                <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 opacity-0 group-hover/logout:opacity-100 transition-opacity duration-150">
                  <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                    Logout Session
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/90" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-50/80 backdrop-blur-xs border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 mb-3 shadow-2xs">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-[#013144] border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-xs">
                    {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "A"}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-extrabold text-[#00cc9c] uppercase tracking-widest leading-none mb-1">
                    {session?.user?.role || "ADMIN"}
                  </p>
                  <p className="text-xs font-bold truncate text-slate-800 leading-tight">
                    {session?.user?.name || "Administrator"}
                  </p>
                </div>
              </div>

              <div className="relative group/logout">
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="flex items-center gap-2.5 w-full py-2.5 rounded-xl border border-slate-200 bg-white/60 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 active:scale-[0.98] transition-all font-bold text-xs cursor-pointer justify-center px-3 backdrop-blur-xs"
                >
                  <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover/logout:-translate-x-0.5" />
                  <span>Logout Session</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Collapse / Expand toggle button */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="absolute -right-3.5 top-[72px] w-7 h-7 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-[#013144] hover:border-[#013144] hover:scale-110 transition-all duration-200 cursor-pointer z-40"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed
            ? <ChevronRight className="w-3.5 h-3.5" />
            : <ChevronLeft className="w-3.5 h-3.5" />
          }
        </button>
      </aside>

      {/* ───── Main Container ───── */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-20 bg-white/75 backdrop-blur-xl border-b border-slate-200/80 px-6 lg:px-10 flex items-center justify-between shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black text-slate-800 capitalize tracking-tight font-oswald">
              {pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100/70 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold text-slate-650 border border-slate-200/70 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-[#00cc9c]" />
              Logged in as <strong className="text-slate-800 font-bold">{session?.user?.email}</strong>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-3 py-16">
                <div className="w-10 h-10 rounded-full border-4 border-[#013144] border-t-transparent animate-spin"></div>
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Loading admin view...</span>
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </div>

      {/* ───── Mobile Drawer ───── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex flex-col w-72 max-w-xs bg-white h-full shadow-2xl animate-[slideInLeft_0.2s_ease-out] z-10">
            <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#013144] flex items-center justify-center text-white font-black text-sm">
                  B
                </div>
                <span className="font-extrabold text-lg text-[#013144]">Brokarta</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-5 space-y-4 overflow-y-auto">
              {menuGroups.map((group, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 pb-1 ">
                    {group.title}
                  </h4>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200
                          ${isActive
                            ? "bg-[#013144] text-white shadow-md shadow-[#013144]/20"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                      >
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-[#00cc9c]" : "text-slate-400"}`} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut({ callbackUrl: "/admin/login" });
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-[0.98] transition-all font-semibold text-sm cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
