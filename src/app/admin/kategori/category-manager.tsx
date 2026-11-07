"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Plus } from "lucide-react";
import { categories as initial, products } from "@/data/products";
import { store } from "@/config/store";
import { photo } from "@/lib/format";
import { useDemoToast } from "../demo-toast";
import { Card, Label, PageHeader, Toggle, inputCls } from "../ui";

const BANNERS = [
  { id: "1550614000-4895a10e1bfd", title: "Berkilau di setiap perayaan", link: "/katalog?kategori=dress", active: true },
  { id: "1539109136881-3be0616acf4b", title: "Lapisan hangat untuk hari mendung", link: "/katalog?kategori=outer", active: true },
  { id: "1551232864-3f0890e580d9", title: "Kaos yang dipakai setiap hari", link: "/katalog?kategori=atasan", active: true },
];

export function CategoryManager() {
  const [cats, setCats] = useState(initial);
  const [banners, setBanners] = useState(BANNERS);
  const toast = useDemoToast();

  function move(i: number, d: -1 | 1) {
    setCats((cs) => {
      const next = [...cs];
      const j = i + d;
      if (j < 0 || j >= next.length) return cs;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  return (
    <>
      <PageHeader title="Kategori & Banner" desc="Atur kategori, urutan tampil, slider beranda dan teks promo" />

      <div className="grid gap-4 xl:grid-cols-2">
        <Card
          title="Kategori"
          desc="Urutan di sini sama dengan urutan di beranda"
          action={
            <button type="button" onClick={() => toast.show("Demo: form kategori baru")} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-ink px-3 text-sm text-white hover:bg-ink-soft">
              <Plus className="size-4" /> Kategori
            </button>
          }
        >
          <ul className="divide-y divide-line">
            {cats.map((c, i) => (
              <li key={c.slug} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex flex-col">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="grid size-6 place-items-center rounded text-muted hover:bg-sand disabled:opacity-30" aria-label={`Naikkan ${c.name}`}>
                    <ArrowUp className="size-3.5" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === cats.length - 1} className="grid size-6 place-items-center rounded text-muted hover:bg-sand disabled:opacity-30" aria-label={`Turunkan ${c.name}`}>
                    <ArrowDown className="size-3.5" />
                  </button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo(c.cover.id, { w: 120, h: 120, fx: c.cover.fx, fy: c.cover.fy })} alt="" className="size-14 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted">{c.blurb} · {products.filter((p) => p.category === c.slug).length} produk</p>
                </div>
                <button type="button" onClick={() => toast.show(`Demo: ganti gambar kategori ${c.name}`)} className="grid size-9 place-items-center rounded-md text-muted hover:bg-sand hover:text-ink" aria-label="Ganti gambar">
                  <ImagePlus className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card title="Slider beranda" desc="Ganti gambar dan judul tanpa coding">
            <ul className="space-y-3">
              {banners.map((b, i) => (
                <li key={b.id} className="flex items-center gap-3 rounded-md border border-line p-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(b.id, { w: 200, h: 120, fy: 0.35 })} alt="" className="h-14 w-24 shrink-0 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <input
                      value={b.title}
                      onChange={(e) => setBanners((bs) => bs.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
                      className="w-full bg-transparent text-sm font-medium outline-none focus:underline"
                      aria-label="Judul slide"
                    />
                    <p className="truncate text-xs text-muted">{b.link}</p>
                  </div>
                  <Toggle checked={b.active} onChange={(v) => setBanners((bs) => bs.map((x, j) => (j === i ? { ...x, active: v } : x)))} label={`Aktifkan slide ${i + 1}`} />
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => toast.show("Demo: unggah gambar slide baru")} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-line text-sm text-muted hover:border-ink-soft hover:text-ink">
              <ImagePlus className="size-4" /> Tambah slide
            </button>
          </Card>

          <Card title="Teks promo">
            <Label htmlFor="promo" hint="Tampil di bagian paling atas website">Teks bar promo</Label>
            <input id="promo" defaultValue={store.promoBar} className={inputCls} />
            <div className="mt-4 flex justify-end">
              <button type="button" onClick={() => toast.show("Demo: perubahan tidak disimpan")} className="h-10 rounded-md bg-ink px-5 text-sm text-white hover:bg-ink-soft">
                Simpan
              </button>
            </div>
          </Card>
        </div>
      </div>
      {toast.node}
    </>
  );
}
