import { LoginForm } from "@/components/auth/login-form";
import { SocialButtons } from "@/components/auth/social-buttons";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-zinc-500 mt-1">Log in to your account</p>
      </div>

      <div className="p-6 rounded-xl border border-zinc-200 bg-white">
        <SocialButtons />

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-zinc-100" />
          <span className="text-xs text-zinc-400">or</span>
          <div className="flex-1 h-px bg-zinc-100" />
        </div>

        <LoginForm />
      </div>

      <p className="text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
