"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, getCategory, isSoldOut, products } from "@/data/products";
import { discountPercent } from "@/lib/format";

const SORTS = [
  { value: "terbaru", label: "Terbaru" },
  { value: "populer", label: "Paling populer" },
  { value: "harga-rendah", label: "Harga terendah" },
  { value: "harga-tinggi", label: "Harga tertinggi" },
  { value: "diskon", label: "Diskon terbesar" },
] as const;

export function CatalogView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const kategori = params.get("kategori") ?? "";
  const urut = params.get("urut") ?? "terbaru";
  const q = params.get("q") ?? "";
  const promo = params.get("promo") === "1";
  const [draft, setDraft] = useState(q);
  const [lastQ, setLastQ] = useState(q);
  if (q !== lastQ) {
    setLastQ(q);
    setDraft(q);
  }

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    const s = sp.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  }

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (kategori && p.category !== kategori) return false;
      if (promo && !p.comparePrice) return false;
      if (term) {
        const hay = `${p.name} ${p.description} ${getCategory(p.category)?.name ?? ""} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase();
        if (!term.split(/\s+/).every((t) => hay.includes(t))) return false;
      }
      return true;
    });
    const sorted = [...filtered].sort((a, b) => {
      switch (urut) {
        case "harga-rendah":
          return a.price - b.price;
        case "harga-tinggi":
          return b.price - a.price;
        case "populer":
          return b.views - a.views;
        case "diskon":
          return discountPercent(b.price, b.comparePrice) - discountPercent(a.price, a.comparePrice);
        default:
          return b.added - a.added;
      }
    });
    // produk habis selalu di bawah
    return sorted.sort((a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b)));
  }, [kategori, urut, q, promo]);

  const cat = getCategory(kategori);
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c.slug, products.filter((p) => p.category === c.slug).length])), []);

  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted">
          Katalog{cat ? ` / ${cat.name}` : ""}
        </p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">{q ? `Hasil untuk “${q}”` : cat ? cat.name : "Semua produk"}</h1>
      </div>

      <div className="mt-8 space-y-4 border-y border-line py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <form
            className="relative md:w-80"
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: draft.trim() || null });
            }}
            role="search"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Cari produk…"
              aria-label="Cari produk"
              className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-10 text-sm outline-none focus:border-ink"
            />
            {draft && (
              <button
                type="button"
                onClick={() => {
                  setDraft("");
                  update({ q: null });
                }}
                className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-sand"
                aria-label="Hapus pencarian"
              >
                <X className="size-4" />
              </button>
            )}
          </form>

          <div className="flex items-center gap-3 md:ml-auto">
            <label className="flex cursor-pointer select-none items-center gap-2 text-sm">
              <input type="checkbox" checked={promo} onChange={(e) => update({ promo: e.target.checked ? "1" : null })} className="size-4 accent-[var(--color-accent)]" />
              Sedang diskon
            </label>
            <div className="relative ml-auto md:ml-0">
              <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <select
                value={urut}
                onChange={(e) => update({ urut: e.target.value === "terbaru" ? null : e.target.value })}
                aria-label="Urutkan"
                className="h-11 appearance-none rounded-full border border-line bg-white pl-10 pr-8 text-sm outline-none focus:border-ink"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Kategori">
          <Chip active={!kategori} onClick={() => update({ kategori: null })}>
            Semua <span className="opacity-60">{products.length}</span>
          </Chip>
          {categories.map((c) => (
            <Chip key={c.slug} active={kategori === c.slug} onClick={() => update({ kategori: c.slug })}>
              {c.name} <span className="opacity-60">{counts[c.slug]}</span>
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">{list.length} produk</p>

      {list.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-3xl font-semibold">Produk tidak ditemukan</p>
          <p className="mt-2 text-muted">Coba kata kunci lain atau hapus filter.</p>
          <button
            type="button"
            onClick={() => {
              setDraft("");
              router.replace(pathname, { scroll: false });
            }}
            className="mt-6 rounded-full bg-ink px-6 py-3 text-sm text-white hover:bg-ink-soft"
          >
            Hapus semua filter
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`h-9 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm transition-colors ${
        active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-soft hover:border-ink-soft"
      }`}
    >
      {children}
    </button>
  );
}
