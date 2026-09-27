"use client";

import { Bookmark, Plus } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { plan, addToPlan, saveWorkout, isInPlan, isSaved } = usePlan();
  const { showToast } = useToast();

  function handlePlan() {
    const added = addToPlan(workout);
    if (added) showToast("Added to today's plan");
    else if (plan.length >= 5) showToast("Today's plan is full");
    else showToast("Already in today's plan");
  }

  function handleSave() {
    const saved = saveWorkout(workout);
    showToast(saved ? "Saved for later" : "Already saved");
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button onClick={handlePlan} disabled={plan.length >= 5 || isInPlan(workout.id)} className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black text-black disabled:cursor-not-allowed disabled:opacity-40">
        <Plus size={18} /> {isInPlan(workout.id) ? "Already in today's plan" : "Add to today's plan"}
      </button>
      <button onClick={handleSave} disabled={isSaved(workout.id)} className="flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-black disabled:cursor-not-allowed disabled:opacity-40">
        <Bookmark size={18} /> {isSaved(workout.id) ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}