import Link from "next/link";

export default function NotFound() {
  return (
    <div className="cinema-shell flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald">Signal lost</p>
      <h1 className="text-5xl font-black text-white">Movie not found</h1>
      <p className="max-w-xl text-muted">
        The requested title could not be loaded. Return to the main discovery feed and keep browsing.
      </p>
      <Link
        href="/"
        className="rounded-full bg-emerald px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-neon"
      >
        Back Home
      </Link>
    </div>
  );
}
