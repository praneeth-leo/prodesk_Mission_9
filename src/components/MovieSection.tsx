import FilterDropdown from "@/components/FilterDropdown";
import MotionSection from "@/components/MotionSection";
import MovieGrid from "@/components/MovieGrid";
import { getPopularMovies, getTopRatedMovies, getTrendingMovies } from "@/lib/tmdb";

type MovieSectionProps = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  variant: "trending" | "popular" | "top-rated";
  withFilter?: boolean;
};

async function getMoviesByVariant(variant: MovieSectionProps["variant"]) {
  if (variant === "trending") {
    return getTrendingMovies();
  }

  if (variant === "top-rated") {
    return getTopRatedMovies();
  }

  return getPopularMovies();
}

export default async function MovieSection({
  id,
  title,
  eyebrow,
  description,
  variant,
  withFilter = false,
}: MovieSectionProps) {
  const movies = await getMoviesByVariant(variant);

  return (
    <MotionSection id={id} className="cinema-shell space-y-8 py-14">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald">{eyebrow}</p>
          <h2 className="text-3xl font-black text-white sm:text-5xl">{title}</h2>
          <p className="text-base leading-7 text-muted">{description}</p>
        </div>
        {withFilter ? <FilterDropdown /> : null}
      </div>

      <MovieGrid movies={movies.results.slice(0, 12)} />
    </MotionSection>
  );
}
