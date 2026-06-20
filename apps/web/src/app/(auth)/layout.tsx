import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#F6F2EC] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(5,174,252,0.04),transparent)]">
      <div className="w-full max-w-sm space-y-8">
        <Link href="/" className="flex items-center justify-center gap-2.5">
          <Image src="/logo.png" alt="Waypoint" width={36} height={36} />
          <span className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            waypoint
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
}
