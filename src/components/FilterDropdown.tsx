"use client";

import { useState } from "react";

const filters = ["All", "Trending", "Popular", "Top Rated"];

export default function FilterDropdown() {
  const [active, setActive] = useState(filters[0]);

  return (
    <label className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-muted">
      <span className="font-medium text-white">Signal</span>
      <select
        value={active}
        onChange={(event) => setActive(event.target.value)}
        className="bg-transparent font-semibold text-emerald outline-none"
      >
        {filters.map((filter) => (
          <option key={filter} value={filter} className="bg-charcoal text-white">
            {filter}
          </option>
        ))}
      </select>
    </label>
  );
}
