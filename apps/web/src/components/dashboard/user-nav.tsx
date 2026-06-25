"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";

export function UserNav() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={28}
            height={28}
            className="rounded-full"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-medium text-zinc-600">
            {initials}
          </div>
        )}
        <span className="text-sm font-medium text-zinc-700 hidden sm:block">
          {user?.name || "User"}
        </span>
        <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 py-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-50">
          <div className="px-3 py-2 border-b border-zinc-100">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Profile
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 cursor-pointer"
            >
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
