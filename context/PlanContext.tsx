"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/lib/types";

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  done: string[];
  addToPlan: (workout: Workout) => boolean;
  saveWorkout: (workout: Workout) => boolean;
  removeFromPlan: (id: string) => void;
  removeSaved: (id: string) => void;
  markDone: (id: string) => void;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedDone = localStorage.getItem("fitlog-done");

      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedDone) setDone(JSON.parse(storedDone));
    } catch {
      // Keep the beginner app usable if localStorage has invalid data.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("fitlog-done", JSON.stringify(done));
  }, [done]);

  function addToPlan(workout: Workout) {
    if (plan.length >= 5 || plan.some((item) => item.id === workout.id)) {
      return false;
    }

    setPlan((current) => [...current, workout]);
    return true;
  }

  function saveWorkout(workout: Workout) {
    if (saved.some((item) => item.id === workout.id)) {
      return false;
    }

    setSaved((current) => [...current, workout]);
    return true;
  }

  function removeFromPlan(id: string) {
    setPlan((current) => current.filter((item) => item.id !== id));
  }

  function removeSaved(id: string) {
    setSaved((current) => current.filter((item) => item.id !== id));
  }

  function markDone(id: string) {
    setDone((current) => (current.includes(id) ? current : [...current, id]));
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        done,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeSaved,
        markDone,
        isInPlan: (id) => plan.some((item) => item.id === id),
        isSaved: (id) => saved.some((item) => item.id === id),
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}