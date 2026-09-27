"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import Loading from "@/components/Loading";
import { SortOption } from "@/lib/types";

export default function MyPlanPage() {
  const { plan, saved } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const currentList = tab === "plan" ? plan : saved;

  const filtered = useMemo(() => {
    return currentList
      .filter((workout) => {
        const value = search.toLowerCase();
        return (
          workout.name.toLowerCase().includes(value) ||
          workout.category.some((tag) => tag.toLowerCase().includes(value))
        );
      })
      .slice()
      .sort((a, b) => {
        if (sort === "calories") return a.calories - b.calories;
        if (sort === "rating") return b.rating - a.rating;
        return a.duration - b.duration;
      });
  }, [currentList, search, sort]);

  const minutes = plan.reduce((total, item) => total + item.duration, 0);
  const calories = plan.reduce((total, item) => total + item.calories, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div>
        <p className="text-xs font-black tracking-[0.3em] text-accent">YOUR LOG</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl">MY PLAN</h1>
        <p className="mt-3 text-sm text-zinc-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["Exercises", plan.length],
          ["Minutes", minutes],
          ["Calories", calories],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-2xl border border-line bg-panel p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              {label}
            </p>
            <p className="mt-2 font-display text-4xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button onClick={() => setTab("plan")} className={`rounded-full px-4 py-2 text-xs font-black ${tab === "plan" ? "bg-accent text-black" : "border border-line"}`}>
            Today&apos;s Plan
          </button>
          <button onClick={() => setTab("saved")} className={`rounded-full px-4 py-2 text-xs font-black ${tab === "saved" ? "bg-accent text-black" : "border border-line"}`}>
            Saved
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2 rounded-xl border border-line bg-panel px-3">
            <Search size={16} className="text-zinc-500" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or tag" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-600" />
          </label>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="rounded-xl border border-line bg-panel px-3 py-3 text-sm font-bold outline-none">
            <option value="duration">Sort By: Duration</option>
            <option value="calories">Sort By: Calories</option>
            <option value="rating">Sort By: Rating</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loading text="Loading workouts…" />
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-line bg-panel px-6 py-16 text-center">
          <h2 className="font-display text-3xl">NOTHING HERE YET</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-black text-black">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((workout) => (
            <PlanWorkoutCard key={workout.id} workout={workout} savedTab={tab === "saved"} />
          ))}
        </div>
      )}
    </section>
  );
}