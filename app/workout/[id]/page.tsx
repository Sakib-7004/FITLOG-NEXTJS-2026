import { notFound } from "next/navigation";
import { Clock3, Flame, Star } from "lucide-react";
import { getWorkout } from "@/lib/api";
import DetailActions from "@/components/DetailActions";

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const workout = await getWorkout(id);

    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-line bg-panel">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-black tracking-[0.3em] text-accent">
              WORKOUT DETAILS
            </p>
            <h1 className="mt-3 font-display text-4xl leading-none sm:text-6xl">
              {workout.name}
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
              {workout.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {workout.category.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-line">
              {[
                ["EQUIPMENT", workout.equipment],
                ["DIFFICULTY", workout.difficulty],
                ["SETS", workout.sets],
                ["REPS", workout.reps],
                ["DURATION", `${workout.duration} min`],
                ["CALORIES", `${workout.calories} kcal`],
                ["RATING", workout.rating],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="flex justify-between gap-4 border-b border-line px-4 py-3 text-sm last:border-b-0"
                >
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-right font-bold">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-line bg-panel p-3">
                <Clock3 size={17} className="text-accent" />
                <p className="mt-2 text-xs text-zinc-500">Duration</p>
                <p className="font-bold">{workout.duration} min</p>
              </div>
              <div className="rounded-xl border border-line bg-panel p-3">
                <Flame size={17} className="text-accent" />
                <p className="mt-2 text-xs text-zinc-500">Calories</p>
                <p className="font-bold">{workout.calories}</p>
              </div>
              <div className="rounded-xl border border-line bg-panel p-3">
                <Star size={17} className="text-accent" />
                <p className="mt-2 text-xs text-zinc-500">Rating</p>
                <p className="font-bold">{workout.rating}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-2xl">INSTRUCTIONS</h2>
              <ol className="mt-4 space-y-3">
                {workout.instructions.slice(0, 4).map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-400">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-black text-black">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <DetailActions workout={workout} />
          </div>
        </div>
      </section>
    );
  } catch {
    notFound();
  }
}