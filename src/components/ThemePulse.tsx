"use client";

import { useState } from "react";

export default function ThemePulse() {
  const [enabled, setEnabled] = useState(true);

  return (
    <button
      type="button"
      onClick={() => setEnabled((current) => !current)}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-emerald transition hover:border-emerald/70 hover:bg-emerald/10"
      aria-label="Toggle cinematic glow"
      title="Toggle cinematic glow"
    >
      <span
        className={`h-2.5 w-2.5 rounded-full bg-emerald transition ${
          enabled ? "shadow-[0_0_18px_8px_rgba(0,200,83,0.22)]" : "opacity-45"
        }`}
      />
    </button>
  );
}
