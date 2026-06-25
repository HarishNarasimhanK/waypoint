"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword, type AuthState } from "@/actions/auth";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, action, pending] = useActionState<AuthState, FormData>(resetPassword, {});

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Invalid link</h1>
        <p className="text-sm text-zinc-500">No reset token provided.</p>
        <Link href="/forgot-password" className="text-blue-600 text-sm font-medium hover:underline">
          Request a new link
        </Link>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 flex items-center justify-center">
          <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Password reset</h1>
        <p className="text-sm text-zinc-500">{state.success}</p>
        <Link
          href="/login"
          className="inline-block px-5 py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Set new password</h1>
        <p className="text-sm text-zinc-500 mt-1">Enter your new password below</p>
      </div>

      <div className="p-6 rounded-xl border border-zinc-200 bg-white">
        <form action={action} className="space-y-4">
          <input type="hidden" name="token" value={token} />

          {state.error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
              {state.error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 bg-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              placeholder="Min 8 chars, 1 letter, 1 number"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Resetting..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}
