"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  movieId: number;
  label?: string;
};

export default function FavoriteButton({ movieId, label = "Favorite" }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("cinestream:favorites") ?? "[]") as number[];
    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);

  function toggleFavorite() {
    setIsFavorite((current) => {
      const favorites = JSON.parse(localStorage.getItem("cinestream:favorites") ?? "[]") as number[];
      const next = current
        ? favorites.filter((id) => id !== movieId)
        : Array.from(new Set([...favorites, movieId]));

      localStorage.setItem("cinestream:favorites", JSON.stringify(next));
      return !current;
    });
  }

  return (
    <motion.button
      type="button"
      onClick={toggleFavorite}
      whileTap={{ scale: 0.94 }}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold transition ${
        isFavorite
          ? "border-emerald bg-emerald text-black shadow-[0_0_24px_rgba(0,200,83,0.36)]"
          : "border-white/15 bg-white/10 text-white hover:border-emerald/70 hover:bg-emerald/10"
      }`}
      aria-pressed={isFavorite}
    >
      <span aria-hidden="true" className="mr-2 h-2.5 w-2.5 rounded-full bg-current">
        <span className="sr-only">{isFavorite ? "Selected" : "Not selected"}</span>
      </span>
      {isFavorite ? "Favorited" : label}
    </motion.button>
  );
}
