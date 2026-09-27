import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="group overflow-hidden rounded-2xl border border-line bg-panel transition hover:-translate-y-1 hover:border-zinc-500">
      <div className="relative h-52 overflow-hidden bg-zinc-900">
        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {workout.category.slice(0, 2).map((tag) => <span key={tag} className="rounded-full border border-white/20 bg-black/70 px-2 py-1 text-[10px] font-black">{tag.toUpperCase()}</span>)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg tracking-tight">{workout.name}</h3>
        <p className="mt-1 truncate text-xs text-zinc-500">{workout.equipment}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1"><Clock3 size={14} /> {workout.duration} min</span>
          <span className="flex items-center gap-1"><Flame size={14} /> {workout.calories} kcal</span>
          <span className="flex items-center gap-1"><Star size={14} /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}