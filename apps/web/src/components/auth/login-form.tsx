"use client";

import { useActionState } from "react";
import { login, type AuthState } from "@/actions/auth";
import Link from "next/link";

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, {});

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 bg-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 bg-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
          placeholder="Your password"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
