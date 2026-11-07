"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, GripVertical, ImagePlus, Plus, X } from "lucide-react";
import { categories, type Color, type Label as PLabel, type Product } from "@/data/products";
import { photo } from "@/lib/format";
import { useDemoToast } from "../../demo-toast";
import { Card, Label, Toggle, inputCls } from "../../ui";

const LABELS: PLabel[] = ["Baru", "Unggulan", "Habis"];

export function ProductForm({ product }: { product?: Product }) {
  const isNew = !product;
  const toast = useDemoToast();
  const [colors, setColors] = useState<Color[]>(product?.colors ?? []);
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? []);
  const [labels, setLabels] = useState<PLabel[]>(product?.labels ?? []);
  const [shown, setShown] = useState(true);
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState({ name: "", hex: "#c9a15a" });

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.show(isNew ? "Demo: produk baru tidak disimpan" : "Demo: perubahan tidak disimpan");
  }

  return (
    <form onSubmit={save}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/produk" className="grid size-9 place-items-center rounded-md border border-line bg-white hover:bg-sand" aria-label="Kembali">
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{isNew ? "Tambah produk" : product.name}</h1>
            {!isNew && <p className="text-sm text-muted">{product.sku}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Link href={`/produk/${product.slug}`} target="_blank" className="inline-flex h-10 items-center rounded-md border border-line bg-white px-4 text-sm hover:bg-sand">
              Lihat di toko
            </Link>
          )}
          <button type="submit" className="h-10 rounded-md bg-ink px-5 text-sm text-white hover:bg-ink-soft">
            Simpan
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <Card title="Informasi produk">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nama produk</Label>
                <input id="name" defaultValue={product?.name} placeholder="Contoh: Liana Floral Wrap Dress" className={inputCls} />
              </div>
              <div>
                <Label htmlFor="desc">Deskripsi</Label>
                <textarea id="desc" rows={4} defaultValue={product?.description} className={`${inputCls} h-auto py-2.5`} />
              </div>
              <div>
                <Label hint="Satu poin per baris">Detail</Label>
                <textarea rows={4} defaultValue={product?.details.join("\n")} className={`${inputCls} h-auto py-2.5`} />
              </div>
            </div>
          </Card>

          <Card title="Foto produk" desc="Unggah banyak foto sekaligus. Foto otomatis dikompres. Seret untuk mengatur urutan.">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {product?.gallery.map((s, i) => (
                <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-md bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(s.id, { w: 200, h: 250, fx: s.fx, fy: s.fy, z: s.z })} alt="" className="size-full object-cover" />
                  {i === 0 && <span className="absolute bottom-1.5 left-1.5 rounded bg-ink/80 px-1.5 py-0.5 text-[10px] text-white">Utama</span>}
                  <span className="absolute left-1 top-1 grid size-6 place-items-center rounded bg-white/80 text-muted opacity-0 transition group-hover:opacity-100">
                    <GripVertical className="size-3.5" />
                  </span>
                  <button type="button" onClick={() => toast.show("Demo: foto tidak dihapus")} className="absolute right-1 top-1 grid size-6 place-items-center rounded bg-white/90 opacity-0 transition hover:text-accent group-hover:opacity-100" aria-label="Hapus foto">
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => toast.show("Demo: pilih beberapa foto dari perangkat")}
                className="flex aspect-[4/5] flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed border-line text-xs text-muted hover:border-ink-soft hover:text-ink"
              >
                <ImagePlus className="size-5" />
                Tambah foto
              </button>
            </div>
          </Card>

          <Card title="Varian" desc="Pembeli memilih warna dan ukuran sebelum memasukkan ke keranjang">
            <div className="space-y-5">
              <div>
                <Label>Warna</Label>
                <div className="flex flex-wrap items-center gap-2">
                  {colors.map((c) => (
                    <span key={c.name} className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-white pl-1.5 pr-1 text-sm">
                      <span className="size-6 rounded-full border border-black/10" style={{ background: c.hex }} />
                      {c.name}
                      <button type="button" onClick={() => setColors((cs) => cs.filter((x) => x.name !== c.name))} className="grid size-6 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink" aria-label={`Hapus warna ${c.name}`}>
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                  <span className="inline-flex h-9 items-center gap-1 rounded-full border border-dashed border-line pl-1.5 pr-1">
                    <input type="color" value={newColor.hex} onChange={(e) => setNewColor((c) => ({ ...c, hex: e.target.value }))} className="size-6 cursor-pointer rounded-full border-0 bg-transparent p-0" aria-label="Pilih warna" />
                    <input
                      value={newColor.name}
                      onChange={(e) => setNewColor((c) => ({ ...c, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newColor.name.trim()) {
                            setColors((cs) => [...cs, { name: newColor.name.trim(), hex: newColor.hex }]);
                            setNewColor((c) => ({ ...c, name: "" }));
                          }
                        }
                      }}
                      placeholder="Nama warna + Enter"
                      className="w-36 bg-transparent text-sm outline-none"
                    />
                  </span>
                </div>
              </div>
              <div>
                <Label>Ukuran</Label>
                <div className="flex flex-wrap items-center gap-2">
                  {sizes.map((s) => (
                    <span key={s} className="inline-flex h-9 items-center gap-1 rounded-full border border-line bg-white pl-3.5 pr-1 text-sm">
                      {s}
                      <button type="button" onClick={() => setSizes((ss) => ss.filter((x) => x !== s))} className="grid size-6 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink" aria-label={`Hapus ukuran ${s}`}>
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                  <span className="inline-flex h-9 items-center gap-1 rounded-full border border-dashed border-line pl-3 pr-1">
                    <input
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newSize.trim() && !sizes.includes(newSize.trim())) setSizes((ss) => [...ss, newSize.trim()]);
                          setNewSize("");
                        }
                      }}
                      placeholder="Contoh: XXL"
                      className="w-24 bg-transparent text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newSize.trim() && !sizes.includes(newSize.trim())) setSizes((ss) => [...ss, newSize.trim()]);
                        setNewSize("");
                      }}
                      className="grid size-6 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink"
                      aria-label="Tambah ukuran"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Status">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Tampilkan di website</p>
                  <p className="text-xs text-muted">Sembunyikan tanpa menghapus produk</p>
                </div>
                <Toggle checked={shown} onChange={setShown} label="Tampilkan di website" />
              </div>
              <div>
                <Label>Label</Label>
                <div className="flex gap-2">
                  {LABELS.map((l) => {
                    const on = labels.includes(l);
                    return (
                      <button
                        key={l}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setLabels((ls) => (on ? ls.filter((x) => x !== l) : [...ls, l]))}
                        className={`h-8 rounded-full border px-3 text-sm transition ${on ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink-soft"}`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label htmlFor="cat">Kategori</Label>
                <select id="cat" defaultValue={product?.category ?? ""} className={inputCls}>
                  <option value="" disabled>Pilih kategori</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          <Card title="Harga & stok">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Harga jual</Label>
                <Money id="price" defaultValue={product?.price} />
              </div>
              <div>
                <Label htmlFor="compare" hint="Harga coret">Harga awal</Label>
                <Money id="compare" defaultValue={product?.comparePrice} />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <input id="sku" defaultValue={product?.sku} className={inputCls} />
              </div>
              <div>
                <Label htmlFor="stock">Stok</Label>
                <input id="stock" type="number" min={0} defaultValue={product?.stock ?? 0} className={inputCls} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="weight" hint="Untuk perkiraan ongkir">Berat</Label>
                <div className="relative">
                  <input id="weight" type="number" min={0} defaultValue={product ? 350 : undefined} className={`${inputCls} pr-12`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">gram</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {toast.node}
    </form>
  );
}

function Money({ id, defaultValue }: { id: string; defaultValue?: number }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">Rp</span>
      <input id={id} inputMode="numeric" defaultValue={defaultValue?.toLocaleString("id-ID")} className={`${inputCls} pl-9 tabular-nums`} />
    </div>
  );
}
