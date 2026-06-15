import "server-only";

import { cache } from "react";
import type { TmdbListResponse, TmdbMovie, TmdbMovieDetails } from "@/types/tmdb";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const DEMO_MOVIES: TmdbMovieDetails[] = [
  {
    id: 693134,
    title: "Dune: Part Two",
    overview:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    release_date: "2024-02-27",
    vote_average: 8.1,
    vote_count: 6400,
    runtime: 167,
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
    ],
    tagline: "Long live the fighters.",
    status: "Released",
  },
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    overview:
      "A listless Wade Wilson is pulled into a mission that changes the history of the Marvel Cinematic Universe.",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    release_date: "2024-07-24",
    vote_average: 7.6,
    vote_count: 5200,
    runtime: 128,
    genres: [
      { id: 28, name: "Action" },
      { id: 35, name: "Comedy" },
      { id: 878, name: "Science Fiction" },
    ],
    tagline: "Come together.",
    status: "Released",
  },
  {
    id: 786892,
    title: "Furiosa: A Mad Max Saga",
    overview:
      "Young Furiosa is swept into a ruthless wasteland war and begins the long road back to her homeland.",
    poster_path: "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    backdrop_path: "/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
    release_date: "2024-05-22",
    vote_average: 7.5,
    vote_count: 3300,
    runtime: 149,
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
    ],
    tagline: "Fury is born.",
    status: "Released",
  },
  {
    id: 157336,
    title: "Interstellar",
    overview:
      "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    release_date: "2014-11-05",
    vote_average: 8.5,
    vote_count: 36500,
    runtime: 169,
    genres: [
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
      { id: 878, name: "Science Fiction" },
    ],
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    status: "Released",
  },
  {
    id: 27205,
    title: "Inception",
    overview:
      "A skilled thief who steals secrets through dream-sharing technology is offered a chance to erase his past.",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-15",
    vote_average: 8.4,
    vote_count: 37000,
    runtime: 148,
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
    ],
    tagline: "Your mind is the scene of the crime.",
    status: "Released",
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview:
      "Batman faces a criminal mastermind whose chaos forces Gotham and its guardian to confront impossible choices.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
    vote_count: 33000,
    runtime: 152,
    genres: [
      { id: 18, name: "Drama" },
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
    ],
    tagline: "Why so serious?",
    status: "Released",
  },
];

type FetchOptions = {
  revalidate?: number;
};

export function hasTmdbCredentials() {
  return Boolean(process.env.TMDB_ACCESS_TOKEN || process.env.TMDB_API_KEY);
}

function makeDemoResponse(page = 1): TmdbListResponse<TmdbMovie> {
  return {
    page,
    results: DEMO_MOVIES,
    total_pages: 1,
    total_results: DEMO_MOVIES.length,
  };
}

function getAuthHeaders() {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  return accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : undefined;
}

function getTmdbUrl(path: string, params: Record<string, string> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  if (!process.env.TMDB_ACCESS_TOKEN && process.env.TMDB_API_KEY) {
    url.searchParams.set("api_key", process.env.TMDB_API_KEY);
  }

  return url;
}

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string> = {},
  options: FetchOptions = {},
): Promise<T> {
  if (!hasTmdbCredentials()) {
    throw new Error("TMDB credentials are missing.");
  }

  const response = await fetch(getTmdbUrl(path, params), {
    headers: getAuthHeaders(),
    next: { revalidate: options.revalidate ?? 1800 },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const getPopularMovies = cache((page = 1) => {
  if (!hasTmdbCredentials()) {
    return Promise.resolve(makeDemoResponse(page));
  }

  return tmdbFetch<TmdbListResponse<TmdbMovie>>(
    "/movie/popular",
    { page: String(page), region: "US" },
    { revalidate: 900 },
  );
});

export const getTrendingMovies = cache(() => {
  if (!hasTmdbCredentials()) {
    return Promise.resolve(makeDemoResponse());
  }

  return tmdbFetch<TmdbListResponse<TmdbMovie>>("/trending/movie/week", {}, { revalidate: 900 });
});

export const getTopRatedMovies = cache(() => {
  if (!hasTmdbCredentials()) {
    return Promise.resolve(makeDemoResponse());
  }

  return tmdbFetch<TmdbListResponse<TmdbMovie>>(
    "/movie/top_rated",
    { page: "1", region: "US" },
    { revalidate: 3600 },
  );
});

export const getMovieDetails = cache((id: string) => {
  if (!hasTmdbCredentials()) {
    const demoMovie = DEMO_MOVIES.find((movie) => movie.id === Number(id));

    if (demoMovie) {
      return Promise.resolve(demoMovie);
    }

    return Promise.reject(new Error("Demo movie not found."));
  }

  return tmdbFetch<TmdbMovieDetails>(`/movie/${id}`, {}, { revalidate: 3600 });
});
