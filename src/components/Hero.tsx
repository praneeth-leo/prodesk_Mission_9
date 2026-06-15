import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import MotionSection from "@/components/MotionSection";
import SearchBar from "@/components/SearchBar";
import type { TmdbMovie } from "@/types/tmdb";
import { formatRating, getTmdbImage } from "@/lib/movie-utils";

type HeroProps = {
  movie: TmdbMovie;
};

export default function Hero({ movie }: HeroProps) {
  const backdrop = getTmdbImage(movie.backdrop_path, "original");
  const poster = getTmdbImage(movie.poster_path, "w500");
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA";

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      {backdrop ? (
        <Image
          src={backdrop}
          alt={`${movie.title} backdrop`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.9)_30%,rgba(5,5,5,0.5)_62%,#050505_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="cinema-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.55fr]">
        <MotionSection className="max-w-4xl space-y-8">
          <div className="inline-flex rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald">
            Featured transmission
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-none tracking-normal text-white sm:text-7xl lg:text-8xl">
              {movie.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">{movie.overview}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-emerald">
              {formatRating(movie.vote_average)} rating
            </span>
            <span>{year}</span>
            <span>{movie.vote_count.toLocaleString()} votes</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/movie/${movie.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-neon hover:shadow-[0_0_30px_rgba(57,255,20,0.28)]"
            >
              View Details
            </Link>
            <FavoriteButton movieId={movie.id} label="Add Favorite" />
          </div>

          <SearchBar />
        </MotionSection>

        {poster ? (
          <MotionSection className="hidden lg:block">
            <div className="glass-panel green-glow relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl p-3">
              <Image
                src={poster}
                alt={`${movie.title} poster`}
                fill
                sizes="360px"
                className="rounded-[1rem] object-cover p-3"
                priority
              />
            </div>
          </MotionSection>
        ) : null}
      </div>
    </section>
  );
}
