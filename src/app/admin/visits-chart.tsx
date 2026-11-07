"use client";

import { useState } from "react";

export type Day = { label: string; date: string; visits: number };

/** Grafik batang satu seri: kunjungan per hari. */
export function VisitsChart({ data }: { data: Day[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.ceil(Math.max(...data.map((d) => d.visits)) / 100) * 100;
  const ticks = [0, max / 2, max];
  const H = 200;

  return (
    <figure>
      <div className="relative flex gap-3" style={{ height: H + 24 }}>
        <div className="relative w-8 shrink-0 text-right text-[11px] tabular-nums text-muted" aria-hidden>
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 -translate-y-1/2" style={{ top: H - (t / max) * H }}>
              {t}
            </span>
          ))}
        </div>
        <div className="relative flex-1">
          {ticks.map((t) => (
            <div key={t} className={`absolute inset-x-0 border-t ${t === 0 ? "border-ink/30" : "border-line/70 border-dashed"}`} style={{ top: H - (t / max) * H }} />
          ))}
          <div className="absolute inset-x-0 top-0 flex items-end gap-[2px]" style={{ height: H }} onMouseLeave={() => setHover(null)}>
            {data.map((d, i) => {
              const h = (d.visits / max) * H;
              return (
                <div
                  key={d.date}
                  className="group relative flex h-full flex-1 cursor-default items-end justify-center"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  aria-label={`${d.date}: ${d.visits} kunjungan`}
                >
                  <div
                    className={`w-full max-w-7 rounded-t-[4px] transition-colors ${hover === i ? "bg-accent" : hover === null ? "bg-ink-soft" : "bg-ink-soft/35"}`}
                    style={{ height: h }}
                  />
                  {hover === i && (
                    <div className="pointer-events-none absolute z-10 -translate-y-2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 text-xs text-white shadow-lg" style={{ bottom: h }}>
                      <p className="text-white/70">{d.date}</p>
                      <p className="font-medium tabular-nums">{d.visits.toLocaleString("id-ID")} kunjungan</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="absolute inset-x-0 flex gap-[2px] text-[11px] text-muted" style={{ top: H + 6 }} aria-hidden>
            {data.map((d, i) => (
              <span key={d.date} className="flex-1 text-center">
                {i % 2 === 0 ? d.label : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="sr-only">Kunjungan website per hari selama 14 hari terakhir</figcaption>
    </figure>
  );
}
