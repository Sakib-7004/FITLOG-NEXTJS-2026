export default function Loading({ text = "Loading workouts…" }: { text?: string }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-accent" />
      <p className="text-sm text-zinc-400">{text}</p>
    </div>
  );
}