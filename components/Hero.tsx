import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-16">
      <div>
        <p className="mb-4 text-xs font-black tracking-[0.3em] text-accent">WORKOUT LIBRARY</p>
        <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">TRAIN WITH INTENT. LOG EVERY SET.</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
        <a href="#library" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-black text-black transition hover:scale-105">BROWSE WORKOUTS <ArrowDownRight size={18} /></a>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-panel">
        <img src="https://raw.githubusercontent.com/ProgrammingHero1/B14-A6-Fit-Log/main/assets/banner.png" alt="FitLog workout banner" className="h-[360px] w-full object-cover sm:h-[470px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-accent/10" />
      </div>
    </section>
  );
}