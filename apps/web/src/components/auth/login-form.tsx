"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { login, type AuthState } from "@/actions/auth";
import Link from "next/link";

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, {});

  return (
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-[var(--foreground)]">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs text-[#05AEFC] hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-4 py-3 text-[15px] rounded-xl bg-gradient-to-b from-white to-[#fdfcfa] shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] border-none outline-none focus:ring-2 focus:ring-[#05AEFC]/30"
          placeholder="Your password"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={pending}
        className="w-full py-3 text-[15px] font-semibold bg-gradient-to-b from-[#1ab8fc] to-[#05AEFC] text-white rounded-xl shadow-[0_4px_14px_rgba(5,174,252,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-50"
      >
        {pending ? "Logging in..." : "Log in"}
      </motion.button>
    </form>
  );
}
