"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { forgotPassword, type AuthState } from "@/actions/auth";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(forgotPassword, {});

  if (state.success) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Check your email</h1>
          <p className="text-sm text-[var(--foreground)]/60 mt-2">{state.success}</p>
        </div>
        <div className="text-center">
          <Link href="/login" className="text-[#05AEFC] text-sm font-medium hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Forgot password?</h1>
        <p className="text-sm text-[var(--foreground)]/60 mt-1">We&apos;ll send you a reset link</p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-b from-white/90 to-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <form action={action} className="space-y-4">
          {state.error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 text-[15px] rounded-xl bg-gradient-to-b from-white to-[#fdfcfa] shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] border-none outline-none focus:ring-2 focus:ring-[#05AEFC]/30"
              placeholder="you@example.com"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={pending}
            className="w-full py-3 text-[15px] font-semibold bg-gradient-to-b from-[#1ab8fc] to-[#05AEFC] text-white rounded-xl shadow-[0_4px_14px_rgba(5,174,252,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-50"
          >
            {pending ? "Sending..." : "Send reset link"}
          </motion.button>
        </form>
      </div>

      <p className="text-center text-sm text-[var(--foreground)]/60">
        <Link href="/login" className="text-[#05AEFC] font-medium hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
