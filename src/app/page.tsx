import CredentialsBanner from "@/components/CredentialsBanner";
import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection";
import { getPopularMovies } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function Home() {
  const popular = await getPopularMovies();
  const featured = popular.results.find((movie) => movie.backdrop_path) ?? popular.results[0];

  return (
    <>
      <Hero movie={featured} />
      <CredentialsBanner />
      <MovieSection
        id="trending"
        eyebrow="Live market heat"
        title="Trending Movies"
        description="The week's strongest signals from global cinema culture, tuned for a premium evening queue."
        variant="trending"
        withFilter
      />
      <MovieSection
        id="popular"
        eyebrow="Audience velocity"
        title="Popular Movies"
        description="Blockbusters and fresh discoveries with the kind of momentum that fills a room."
        variant="popular"
      />
      <MovieSection
        id="top-rated"
        eyebrow="Critical shine"
        title="Top Rated"
        description="Highly rated films with durable craft, sharp stories, and serious rewatch gravity."
        variant="top-rated"
      />
    </>
  );
}
