import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-sm space-y-8">
        <Link href="/" className="flex items-center justify-center gap-2.5">
          <Image src="/logo.png" alt="Waypoint" width={32} height={32} />
          <span className="text-[15px] font-semibold tracking-tight">waypoint</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
