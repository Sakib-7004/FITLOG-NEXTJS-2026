import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-black tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-3 font-display text-5xl sm:text-7xl">PAGE NOT FOUND</h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">
        The workout route you requested does not exist. Go back to the library
        and choose another lift.
      </p>
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-black text-black"
      >
        <ArrowLeft size={17} /> Go to workouts
      </Link>
    </section>
  );
}