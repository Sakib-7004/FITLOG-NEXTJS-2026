import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 font-black tracking-[0.2em]">
          <span className="grid h-8 w-8 place-items-center rounded bg-accent text-black">
            <Dumbbell size={17} />
          </span>
          FITLOG
        </div>
        <p className="text-xs text-zinc-500">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}