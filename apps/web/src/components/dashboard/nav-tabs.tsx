"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/radar", label: "Radar" },
  { href: "/tracker", label: "Tracker" },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              active
                ? "text-zinc-900 bg-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
