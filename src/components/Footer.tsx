export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal/60">
      <div className="cinema-shell flex flex-col gap-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-white">CineStream</span>{" "}
          <span className="text-emerald">/</span> luxury cyber cinema discovery
        </p>
        <p>Powered by TMDB data. Crafted for Vercel deployment.</p>
      </div>
    </footer>
  );
}
