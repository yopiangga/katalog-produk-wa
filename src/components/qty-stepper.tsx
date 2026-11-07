"use client";

import { Minus, Plus } from "lucide-react";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-8" : "h-12";
  const w = size === "sm" ? "w-8" : "w-11";
  return (
    <div className={`inline-flex ${h} items-center rounded-full border border-line bg-white`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min - (size === "sm" ? 1 : 0), value - 1))}
        className={`grid ${h} ${w} place-items-center rounded-l-full text-ink-soft hover:bg-sand disabled:opacity-40`}
        disabled={size !== "sm" && value <= min}
        aria-label="Kurangi jumlah"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="min-w-6 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`grid ${h} ${w} place-items-center rounded-r-full text-ink-soft hover:bg-sand disabled:opacity-40`}
        disabled={value >= max}
        aria-label="Tambah jumlah"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
