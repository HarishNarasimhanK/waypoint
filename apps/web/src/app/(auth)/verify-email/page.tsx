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
        <h1 className="text-2xl font-bold">Invalid link</h1>
        <p className="text-sm text-zinc-500">No verification token provided.</p>
        <Link href="/login" className="text-blue-600 text-sm font-medium hover:underline">
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
        <h1 className="text-2xl font-bold">Link expired</h1>
        <p className="text-sm text-zinc-500">This verification link is invalid or has expired.</p>
        <Link href="/signup" className="text-blue-600 text-sm font-medium hover:underline">
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
      <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 flex items-center justify-center">
        <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold">Email verified</h1>
      <p className="text-sm text-zinc-500">Your account is ready. You can now log in.</p>
      <Link
        href="/login"
        className="inline-block px-5 py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
      >
        Go to Login
      </Link>
    </div>
  );
}
