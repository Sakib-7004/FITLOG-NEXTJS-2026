"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import { SortOption, Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";
import Loading from "./Loading";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("duration");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch {
        setError("Can't load workouts right now.");
      } finally {
        setLoading(false);
      }
    }
    loadWorkouts();
  }, []);

  const filtered = workouts.filter((workout) => {
    const value = search.toLowerCase();
    return workout.name.toLowerCase().includes(value) || workout.category.some((tag) => tag.toLowerCase().includes(value));
  }).sort((a, b) => {
    if (sort === "calories") return a.calories - b.calories;
    if (sort === "rating") return b.rating - a.rating;
    return a.duration - b.duration;
  });

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-black tracking-[0.25em] text-accent">WORKOUT COLLECTION</p>
          <h2 className="font-display text-4xl sm:text-5xl">THE LIBRARY</h2>
          <p className="mt-2 text-sm text-zinc-500">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2 rounded-xl border border-line bg-panel px-3">
            <Search size={16} className="text-zinc-500" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search workout or tag" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-600 sm:w-56" />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-line bg-panel px-3 text-sm">
            <SlidersHorizontal size={16} className="text-zinc-500" />
            <span className="text-zinc-500">Sort By</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="bg-transparent py-3 font-bold outline-none">
              <option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option>
            </select>
          </label>
        </div>
      </div>
      {loading && <Loading />}
      {!loading && error && <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-sm text-red-300">{error}</div>}
      {!loading && !error && filtered.length === 0 && <div className="rounded-2xl border border-line bg-panel p-10 text-center"><h3 className="font-display text-2xl">NO WORKOUTS FOUND</h3><p className="mt-2 text-sm text-zinc-500">Try a different workout name or category.</p></div>}
      {!loading && !error && filtered.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div>}
    </section>
  );
}