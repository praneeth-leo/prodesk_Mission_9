export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
};

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbMovieDetails = TmdbMovie & {
  runtime: number | null;
  genres: TmdbGenre[];
  tagline: string;
  status: string;
};

export type TmdbListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
