"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { resetPassword, type AuthState } from "@/actions/auth";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, action, pending] = useActionState<AuthState, FormData>(resetPassword, {});

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Invalid link</h1>
        <p className="text-sm text-[var(--foreground)]/60">No reset token provided.</p>
        <Link href="/forgot-password" className="text-[#05AEFC] text-sm font-medium hover:underline">
          Request a new link
        </Link>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-b from-[#10b981]/20 to-[#10b981]/5 flex items-center justify-center">
          <svg className="w-7 h-7 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Password reset</h1>
        <p className="text-sm text-[var(--foreground)]/60">{state.success}</p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 text-sm font-semibold bg-gradient-to-b from-[#1ab8fc] to-[#05AEFC] text-white rounded-xl shadow-[0_4px_14px_rgba(5,174,252,0.3)]"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Set new password</h1>
        <p className="text-sm text-[var(--foreground)]/60 mt-1">Enter your new password below</p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-b from-white/90 to-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <form action={action} className="space-y-4">
          <input type="hidden" name="token" value={token} />

          {state.error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[var(--foreground)]">
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 text-[15px] rounded-xl bg-gradient-to-b from-white to-[#fdfcfa] shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] border-none outline-none focus:ring-2 focus:ring-[#05AEFC]/30"
              placeholder="Min 8 chars, 1 letter, 1 number"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={pending}
            className="w-full py-3 text-[15px] font-semibold bg-gradient-to-b from-[#1ab8fc] to-[#05AEFC] text-white rounded-xl shadow-[0_4px_14px_rgba(5,174,252,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-50"
          >
            {pending ? "Resetting..." : "Reset password"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
