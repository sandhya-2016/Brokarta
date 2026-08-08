"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Settings,
  Lock,
  User,
  Shield,
  Server,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();

  // Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      setSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Settings Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Account Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 rounded-4xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-4">Account Information</h3>
            <div className="flex flex-col items-center py-4 border-b border-slate-100 mb-4">
              <div className="w-20 h-20 rounded-full bg-brand-dark flex items-center justify-center text-white font-extrabold text-2xl mb-3 shadow-lg shadow-teal-900/10">
                {session?.user?.name?.[0] || "A"}
              </div>
              <h4 className="font-bold text-slate-800 text-base">{session?.user?.name || "Admin User"}</h4>
              <span className="text-[10px] text-teal-600 bg-teal-500/10 px-2.5 py-0.5 rounded-full font-extrabold uppercase mt-1 tracking-wider">
                {session?.user?.role || "ADMIN"}
              </span>
            </div>
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Email Address</span>
                <span className="font-bold text-slate-700 block mt-0.5">{session?.user?.email}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Authentication</span>
                <span className="font-bold text-slate-700 block mt-0.5">JWT Session / Credentials</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Password Form & Platform details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-4xl p-8 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-slate-500" />
              Change Credentials Password
            </h3>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm animate-[fadeIn_0.2s_ease-out]">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm animate-[fadeIn_0.2s_ease-out]">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-semibold">{success}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    required
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-sm font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      required
                      placeholder="Minimum 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-sm font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all text-sm font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="py-3.5 px-6 bg-brand-dark hover:bg-[#012230] text-white font-bold rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 mt-4 disabled:opacity-50 text-xs"
              >
                {loading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                ) : (
                  "Update Credentials Password"
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
