"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { signup, type AuthState } from "@/actions/auth";

export function SignupForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signup, {});

  if (state.success) {
    return (
      <div className="p-6 rounded-xl bg-gradient-to-b from-[#05AEFC]/5 to-transparent text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#05AEFC]/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-[#05AEFC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <p className="text-[15px] font-medium text-[var(--foreground)]">{state.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 text-[15px] rounded-xl bg-gradient-to-b from-white to-[#fdfcfa] shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] border-none outline-none focus:ring-2 focus:ring-[#05AEFC]/30"
          placeholder="Your name"
        />
      </div>

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
        <label htmlFor="password" className="text-sm font-medium text-[var(--foreground)]">
          Password
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
        {pending ? "Creating account..." : "Create account"}
      </motion.button>
    </form>
  );
}
