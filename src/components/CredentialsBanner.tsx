import { hasTmdbCredentials } from "@/lib/tmdb";

export default function CredentialsBanner() {
  if (hasTmdbCredentials()) {
    return null;
  }

  return (
    <aside className="cinema-shell pt-8">
      <div className="glass-panel rounded-2xl border-emerald/30 p-5">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald">Demo mode</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-200">
          Add <code className="text-emerald">TMDB_ACCESS_TOKEN</code> or{" "}
          <code className="text-emerald">TMDB_API_KEY</code> in <code>.env.local</code>, then
          restart the dev server to load live TMDB data.
        </p>
      </div>
    </aside>
  );
}
