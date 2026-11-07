"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Copy, Download, Pencil, Plus, Search, Trash2, Upload } from "lucide-react";
import { categories, displayLabels, getCategory, products } from "@/data/products";
import { photo, rupiah } from "@/lib/format";
import { useDemoToast } from "../demo-toast";
import { Toggle, inputCls, PageHeader } from "../ui";

export function ProductTable() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [visible, setVisible] = useState<Record<string, boolean>>(() => Object.fromEntries(products.map((p) => [p.slug, true])));
  const toast = useDemoToast();

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products.filter((p) => (!cat || p.category === cat) && (!t || `${p.name} ${p.sku}`.toLowerCase().includes(t)));
  }, [q, cat]);

  return (
    <>
      <PageHeader
        title="Produk"
        desc={`${products.length} produk · ${categories.length} kategori`}
        action={
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => toast.show("Demo: pilih file Excel/CSV untuk import banyak produk")} className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3.5 text-sm hover:bg-sand">
              <Upload className="size-4" /> Import
            </button>
            <button type="button" onClick={() => toast.show("Demo: file produk.xlsx akan diunduh")} className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3.5 text-sm hover:bg-sand">
              <Download className="size-4" /> Ekspor
            </button>
            <Link href="/admin/produk/baru" className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-sm text-white hover:bg-ink-soft">
              <Plus className="size-4" /> Tambah produk
            </Link>
          </div>
        }
      />

      <div className="rounded-lg border border-line bg-white">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row">
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama atau SKU" className={`${inputCls} pl-9`} aria-label="Cari produk" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={`${inputCls} sm:w-48`} aria-label="Filter kategori">
            <option value="">Semua kategori</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-[#faf9f7] text-left text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Produk</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 text-right font-medium">Harga</th>
                <th className="px-4 py-3 text-right font-medium">Stok</th>
                <th className="px-4 py-3 font-medium">Label</th>
                <th className="px-4 py-3 font-medium">Tampil</th>
                <th className="px-4 py-3"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((p) => (
                <tr key={p.slug} className={`hover:bg-[#faf9f7] ${visible[p.slug] ? "" : "opacity-50"}`}>
                  <td className="px-4 py-3">
                    <Link href={`/admin/produk/${p.slug}`} className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo(p.gallery[0].id, { w: 80, h: 100, fx: p.gallery[0].fx, fy: p.gallery[0].fy })} alt="" className="h-12 w-10 rounded object-cover" />
                      <div>
                        <p className="font-medium hover:underline">{p.name}</p>
                        <p className="text-xs text-muted">{p.sku} · {p.colors.length} warna{p.sizes.length ? ` · ${p.sizes.length} ukuran` : ""}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{getCategory(p.category)?.name}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {rupiah(p.price)}
                    {p.comparePrice && <s className="block text-xs text-muted">{rupiah(p.comparePrice)}</s>}
                  </td>
                  <td className={`px-4 py-3 text-right tabular-nums ${p.stock === 0 ? "text-accent" : p.stock <= 5 ? "text-accent" : ""}`}>{p.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {displayLabels(p).map((l) => (
                        <span key={l} className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${l === "Habis" ? "bg-ink text-white" : l === "Baru" ? "bg-sand" : "bg-accent-soft text-accent"}`}>{l}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Toggle checked={visible[p.slug]} onChange={(v) => setVisible((s) => ({ ...s, [p.slug]: v }))} label={`Tampilkan ${p.name}`} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1 text-muted">
                      <Link href={`/admin/produk/${p.slug}`} className="grid size-8 place-items-center rounded-md hover:bg-sand hover:text-ink" aria-label="Ubah" title="Ubah">
                        <Pencil className="size-4" />
                      </Link>
                      <button type="button" onClick={() => toast.show(`Demo: "${p.name}" diduplikat`)} className="grid size-8 place-items-center rounded-md hover:bg-sand hover:text-ink" aria-label="Duplikat" title="Duplikat">
                        <Copy className="size-4" />
                      </button>
                      <button type="button" onClick={() => toast.show("Demo: produk tidak benar-benar dihapus")} className="grid size-8 place-items-center rounded-md hover:bg-sand hover:text-accent" aria-label="Hapus" title="Hapus">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <p className="py-12 text-center text-sm text-muted">Tidak ada produk yang cocok.</p>}
        </div>
      </div>
      {toast.node}
    </>
  );
}
