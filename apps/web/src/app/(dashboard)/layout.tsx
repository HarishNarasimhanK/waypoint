import Image from "next/image";
import Link from "next/link";
import { UserNav } from "@/components/dashboard/user-nav";
import { NavTabs } from "@/components/dashboard/nav-tabs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/radar" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Waypoint" width={28} height={28} />
              <span className="text-[15px] font-semibold tracking-tight">waypoint</span>
            </Link>
            <NavTabs />
          </div>
          <UserNav />
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
