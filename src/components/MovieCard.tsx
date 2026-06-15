"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { TmdbMovie } from "@/types/tmdb";
import { formatRating, getTmdbImage } from "@/lib/movie-utils";

type MovieCardProps = {
  movie: TmdbMovie;
  priority?: boolean;
};

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
  const poster = getTmdbImage(movie.poster_path, "w500");
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA";

  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.025 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="group relative"
    >
      <Link
        href={`/movie/${movie.id}`}
        className="block overflow-hidden rounded-2xl border border-white/10 bg-charcoal shadow-[0_18px_60px_rgba(0,0,0,0.36)] transition duration-300 group-hover:border-emerald/60 group-hover:shadow-[0_0_36px_rgba(0,200,83,0.18)]"
      >
        <div className="relative aspect-[2/3] overflow-hidden bg-white/[0.04]">
          {poster ? (
            <Image
              src={poster}
              alt={`${movie.title} poster`}
              fill
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 28vw, 220px"
              priority={priority}
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted">
              Poster unavailable
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent opacity-90" />
          <div className="absolute left-3 top-3 rounded-full border border-emerald/40 bg-black/70 px-3 py-1 text-xs font-bold text-emerald backdrop-blur">
            {formatRating(movie.vote_average)}
          </div>
        </div>
        <div className="space-y-2 p-4">
          <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-white">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
            <span>{year}</span>
            <span className="text-emerald">View</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
