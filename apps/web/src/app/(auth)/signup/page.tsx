import { SignupForm } from "@/components/auth/signup-form";
import { SocialButtons } from "@/components/auth/social-buttons";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Create your account</h1>
        <p className="text-sm text-[var(--foreground)]/60 mt-1">Start discovering opportunities</p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-b from-white/90 to-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <SocialButtons />

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-black/[0.06]" />
          <span className="text-xs text-[var(--foreground)]/40">or</span>
          <div className="flex-1 h-px bg-black/[0.06]" />
        </div>

        <SignupForm />
      </div>

      <p className="text-center text-sm text-[var(--foreground)]/60">
        Already have an account?{" "}
        <Link href="/login" className="text-[#05AEFC] font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
