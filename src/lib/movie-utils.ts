const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getTmdbImage(path: string | null, size = "w780") {
  if (!path) {
    return null;
  }

  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function formatRating(rating: number) {
  return Number.isFinite(rating) ? rating.toFixed(1) : "NR";
}

export function formatRuntime(minutes: number | null) {
  if (!minutes) {
    return "Runtime TBA";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}
