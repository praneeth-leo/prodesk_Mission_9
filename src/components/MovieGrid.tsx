import type { TmdbMovie } from "@/types/tmdb";
import MovieCard from "@/components/MovieCard";

type MovieGridProps = {
  movies: TmdbMovie[];
};

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} priority={index < 4} />
      ))}
    </div>
  );
}
