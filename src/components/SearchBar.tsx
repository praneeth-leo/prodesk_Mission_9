"use client";

import { useMemo, useState } from "react";

type SearchBarProps = {
  compact?: boolean;
};

export default function SearchBar({ compact = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const tmdbSearchUrl = useMemo(() => {
    const params = new URLSearchParams({ query });
    return `https://www.themoviedb.org/search?${params.toString()}`;
  }, [query]);

  return (
    <form
      action={query.trim() ? tmdbSearchUrl : "/"}
      className={`group relative ${compact ? "w-full md:w-72" : "w-full max-w-2xl"}`}
      role="search"
    >
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-muted">
        S
      </span>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search cinema"
        className="h-12 w-full rounded-full border border-white/10 bg-white/[0.07] pl-11 pr-28 text-sm text-white outline-none transition placeholder:text-muted focus:border-emerald/70 focus:bg-white/[0.1] focus:shadow-[0_0_28px_rgba(0,200,83,0.2)]"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1.5 h-9 rounded-full bg-emerald px-4 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-neon"
      >
        Find
      </button>
    </form>
  );
}
