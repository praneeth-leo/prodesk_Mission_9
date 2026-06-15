import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ThemePulse from "@/components/ThemePulse";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/72 backdrop-blur-2xl">
      <nav className="cinema-shell flex min-h-20 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald/40 bg-emerald/10 font-mono text-lg font-black text-emerald green-glow">
            CS
          </span>
          <span className="text-xl font-black tracking-[0.18em] text-white">CineStream</span>
        </Link>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <SearchBar compact />
          <div className="flex items-center gap-5 text-sm font-medium text-muted">
            <a href="#trending" className="transition hover:text-emerald">
              Trending
            </a>
            <a href="#popular" className="transition hover:text-emerald">
              Popular
            </a>
            <a href="#top-rated" className="transition hover:text-emerald">
              Top Rated
            </a>
            <ThemePulse />
          </div>
        </div>
      </nav>
    </header>
  );
}
