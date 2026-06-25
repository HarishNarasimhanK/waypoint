"use client";

import { useActionState } from "react";
import { forgotPassword, type AuthState } from "@/actions/auth";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(forgotPassword, {});

  if (state.success) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-sm text-zinc-500 mt-2">{state.success}</p>
        </div>
        <div className="text-center">
          <Link href="/login" className="text-blue-600 text-sm font-medium hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Forgot password?</h1>
        <p className="text-sm text-zinc-500 mt-1">We&apos;ll send you a reset link</p>
      </div>

      <div className="p-6 rounded-xl border border-zinc-200 bg-white">
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

          <button
            type="submit"
            disabled={pending}
            className="w-full py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-zinc-500">
        <Link href="/login" className="text-blue-600 font-medium hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
