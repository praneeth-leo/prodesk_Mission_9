import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import MotionSection from "@/components/MotionSection";
import { getMovieDetails } from "@/lib/tmdb";
import { formatRating, formatRuntime, getTmdbImage } from "@/lib/movie-utils";

export const dynamic = "force-dynamic";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const movie = await getMovieDetails(id);

    return {
      title: `${movie.title} | CineStream`,
      description: movie.overview || `Explore ${movie.title} on CineStream.`,
      openGraph: {
        title: `${movie.title} | CineStream`,
        description: movie.overview,
        images: movie.backdrop_path ? [getTmdbImage(movie.backdrop_path, "w1280")!] : [],
      },
    };
  } catch {
    return {
      title: "Movie Not Found | CineStream",
      description: "This movie could not be loaded from TMDB.",
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id).catch(() => null);

  if (!movie) {
    notFound();
  }

  const backdrop = getTmdbImage(movie.backdrop_path, "original");
  const poster = getTmdbImage(movie.poster_path, "w500");

  return (
    <article className="relative min-h-screen overflow-hidden">
      {backdrop ? (
        <Image
          src={backdrop}
          alt={`${movie.title} backdrop`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-42"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.92)_38%,rgba(5,5,5,0.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-background to-transparent" />

      <MotionSection className="cinema-shell relative grid gap-10 py-16 lg:grid-cols-[360px_1fr] lg:py-24">
        <div className="glass-panel green-glow relative aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl p-3">
          {poster ? (
            <Image
              src={poster}
              alt={`${movie.title} poster`}
              fill
              sizes="(max-width: 1024px) 80vw, 360px"
              className="rounded-[1rem] object-cover p-3"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-[1rem] bg-white/[0.05] text-muted">
              Poster unavailable
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            {movie.tagline ? (
              <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald">
                {movie.tagline}
              </p>
            ) : null}
            <h1 className="text-balance text-5xl font-black leading-none text-white sm:text-7xl">
              {movie.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-zinc-200">{movie.overview}</p>
          </div>

          <div className="grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Rating", formatRating(movie.vote_average)],
              ["Runtime", formatRuntime(movie.runtime)],
              ["Release", movie.release_date || "TBA"],
              ["Status", movie.status],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
                <p className="mt-2 text-lg font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-sm font-semibold text-emerald"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <FavoriteButton movieId={movie.id} label="Add to Watchlist" />
        </div>
      </MotionSection>
    </article>
  );
}
