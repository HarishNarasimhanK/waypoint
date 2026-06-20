import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/auth/tokens";
import Link from "next/link";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Invalid link</h1>
        <p className="text-sm text-[var(--foreground)]/60">No verification token provided.</p>
        <Link href="/login" className="text-[#05AEFC] text-sm font-medium hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  const hashedTokenValue = hashToken(token);

  const storedToken = await prisma.verificationToken.findFirst({
    where: {
      token: hashedTokenValue,
      expires: { gt: new Date() },
    },
  });

  if (!storedToken) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Link expired</h1>
        <p className="text-sm text-[var(--foreground)]/60">This verification link is invalid or has expired.</p>
        <Link href="/signup" className="text-[#05AEFC] text-sm font-medium hover:underline">
          Sign up again
        </Link>
      </div>
    );
  }

  await prisma.user.update({
    where: { email: storedToken.email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { id: storedToken.id },
  });

  return (
    <div className="text-center space-y-4">
      <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-b from-[#10b981]/20 to-[#10b981]/5 flex items-center justify-center">
        <svg className="w-7 h-7 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Email verified</h1>
      <p className="text-sm text-[var(--foreground)]/60">Your account is ready. You can now log in.</p>
      <Link
        href="/login"
        className="inline-block px-6 py-2.5 text-sm font-semibold bg-gradient-to-b from-[#1ab8fc] to-[#05AEFC] text-white rounded-xl shadow-[0_4px_14px_rgba(5,174,252,0.3)]"
      >
        Go to Login
      </Link>
    </div>
  );
}
