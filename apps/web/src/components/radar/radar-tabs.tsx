"use client";

import Link from "next/link";

const tabs = [
  { key: "all", label: "All Jobs", href: "/radar" },
  { key: "foryou", label: "For You", href: "/radar?tab=foryou" },
];

export function RadarTabs({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex items-center gap-1 border-b border-zinc-100 -mx-6 px-6">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.key
              ? "border-zinc-900 text-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-700"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
