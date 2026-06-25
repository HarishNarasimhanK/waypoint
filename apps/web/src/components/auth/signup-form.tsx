"use client";

import { useActionState } from "react";
import { signup, type AuthState } from "@/actions/auth";

export function SignupForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signup, {});

  if (state.success) {
    return (
      <div className="p-5 rounded-lg bg-blue-50 text-center">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-900">{state.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 bg-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
          placeholder="Your name"
        />
      </div>

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
        <label htmlFor="password" className="text-sm font-medium">
          Password
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
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
