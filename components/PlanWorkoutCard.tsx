"use client";

import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

type Props = { workout: Workout; savedTab?: boolean; };

export default function PlanWorkoutCard({ workout, savedTab = false }: Props) {
  const { done, removeFromPlan, removeSaved, markDone } = usePlan();
  const { showToast } = useToast();
  const completed = done.includes(workout.id);

  function handleRemove() {
    if (savedTab) { removeSaved(workout.id); showToast("Removed from saved list"); }
    else { removeFromPlan(workout.id); showToast("Removed from today's plan"); }
  }

  function handleDone() { markDone(workout.id); showToast("Workout marked as done"); }

  return (
    <article className={`rounded-2xl border bg-panel p-3 ${completed ? "border-accent/60" : "border-line"}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img src={workout.image} alt={workout.name} className="h-32 w-full rounded-xl object-cover sm:h-28 sm:w-40"
          onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80"; }} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            {workout.category.slice(0, 2).map((tag) => <span key={tag} className="rounded-full bg-zinc-800 px-2 py-1 text-[10px] font-black text-zinc-300">{tag}</span>)}
            {completed && <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-black text-black">DONE</span>}
          </div>
          <h3 className="mt-2 truncate font-display text-xl">{workout.name}</h3>
          <p className="mt-1 text-xs text-zinc-500">{workout.equipment}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1"><Clock3 size={14} /> {workout.duration} min</span>
            <span className="flex items-center gap-1"><Flame size={14} /> {workout.calories} kcal</span>
            <span className="flex items-center gap-1"><Star size={14} /> {workout.rating}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:w-44 sm:justify-end">
          <Link href={`/workout/${workout.id}`} className="rounded-lg border border-line px-3 py-2 text-xs font-bold">View Details</Link>
          {!savedTab && <button onClick={handleDone} disabled={completed} className="flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40"><Check size={14} /> Mark as Done</button>}
          <button onClick={handleRemove} aria-label={`Remove ${workout.name}`} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-zinc-400 hover:text-white"><X size={16} /></button>
        </div>
      </div>
    </article>
  );
}