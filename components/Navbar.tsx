"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-black">
            <Dumbbell size={21} strokeWidth={2.5} />
          </span>
          <span className="hidden text-sm font-black tracking-[0.2em] sm:block">
            FITLOG
          </span>
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-line p-1">
          <Link href="/" className={`rounded-full px-3 py-2 text-xs font-bold sm:px-5 ${pathname === "/" ? "bg-white text-black" : "text-zinc-400"}`}>Workout</Link>
          <Link href="/my-plan" className={`rounded-full px-3 py-2 text-xs font-bold sm:px-5 ${pathname === "/my-plan" ? "bg-white text-black" : "text-zinc-400"}`}>My Plan</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-2 text-xs font-black text-black">Plan <span className="ml-1">{plan.length}</span></Link>
          <Link href="/my-plan?tab=saved" className="rounded-full border border-zinc-500 px-3 py-2 text-xs font-black text-white">Saved <span className="ml-1">{saved.length}</span></Link>
        </div>
      </div>
    </header>
  );
}