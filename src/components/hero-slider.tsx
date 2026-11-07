"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photo } from "@/lib/format";

const SLIDES = [
  {
    kicker: "Koleksi Pesta 2026",
    title: "Berkilau di setiap perayaan",
    text: "Payet, satin dan chiffon pilihan untuk acara akhir tahun. Diskon hingga 20% sampai 31 Desember.",
    cta: "Belanja dress",
    href: "/katalog?kategori=dress",
    img: { id: "1550614000-4895a10e1bfd", fx: 0.5, fy: 0.3 },
  },
  {
    kicker: "Outer Musim Hujan",
    title: "Lapisan hangat untuk hari mendung",
    text: "Bomber, blazer dan coat dengan bahan yang tetap nyaman di udara tropis. Mulai Rp389 ribu.",
    cta: "Lihat outer",
    href: "/katalog?kategori=outer",
    img: { id: "1539109136881-3be0616acf4b", fx: 0.5, fy: 0.35 },
  },
  {
    kicker: "Basic Everyday",
    title: "Kaos yang dipakai setiap hari",
    text: "Katun organik yang adem dan awet. Beli paket isi 3, hemat Rp58 ribu.",
    cta: "Belanja atasan",
    href: "/katalog?kategori=atasan",
    img: { id: "1551232864-3f0890e580d9", fx: 0.5, fy: 0.5 },
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((d: number) => setI((v) => (v + d + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section
      className="relative mx-auto max-w-7xl px-0 sm:px-6 sm:pt-6"
      aria-roledescription="carousel"
      aria-label="Promo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative grid overflow-hidden bg-sand sm:rounded-sm">
        {SLIDES.map((s, idx) => (
          <div
            key={s.title}
            className={`col-start-1 row-start-1 grid transition-opacity duration-700 md:grid-cols-[1fr_1.15fr] ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={idx !== i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} dari ${SLIDES.length}`}
          >
            <div className="order-2 flex flex-col justify-center px-6 pb-14 pt-8 md:order-1 md:px-14 md:py-20">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{s.kicker}</p>
              <h1 className="mt-4 max-w-md font-display text-[40px] font-semibold leading-[1.02] md:text-6xl">{s.title}</h1>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">{s.text}</p>
              <div className="mt-8">
                <Link href={s.href} tabIndex={idx === i ? 0 : -1} className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-white hover:bg-ink-soft">
                  {s.cta}
                </Link>
              </div>
            </div>
            <div className="relative order-1 aspect-[4/3.6] md:order-2 md:aspect-auto md:min-h-[560px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo(s.img.id, { w: 1100, h: 1000, fx: s.img.fx, fy: s.img.fy })}
                alt=""
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "auto"}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-6 pb-5 md:right-auto md:w-[46.5%] md:px-14 md:pb-8">
          <div className="pointer-events-auto flex gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-ink" : "w-3 bg-ink/25 hover:bg-ink/40"}`}
                aria-label={`Ke slide ${idx + 1}`}
                aria-current={idx === i}
              />
            ))}
          </div>
          <div className="pointer-events-auto flex gap-2">
            <button type="button" onClick={() => go(-1)} className="grid size-10 place-items-center rounded-full border border-ink/15 bg-paper/70 hover:bg-paper" aria-label="Slide sebelumnya">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={() => go(1)} className="grid size-10 place-items-center rounded-full border border-ink/15 bg-paper/70 hover:bg-paper" aria-label="Slide berikutnya">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
