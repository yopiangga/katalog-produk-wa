"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { QtyStepper } from "@/components/qty-stepper";
import { cart, useCart } from "@/lib/cart-store";
import { rupiah } from "@/lib/format";
import { variantText } from "@/lib/whatsapp";

export function CartView() {
  const { items, count, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-sm border border-line bg-white px-6 py-20 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-sand">
          <ShoppingBag className="size-7 text-muted" />
        </div>
        <p className="mt-5 font-display text-2xl font-semibold">Keranjang masih kosong</p>
        <p className="mt-1 text-muted">Kamu bisa belanja tanpa perlu daftar akun.</p>
        <Link href="/katalog" className="mt-6 rounded-full bg-ink px-6 py-3 text-sm text-white hover:bg-ink-soft">
          Lihat katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="hidden grid-cols-[1fr_140px_120px_40px] gap-4 border-b border-line pb-3 text-xs uppercase tracking-wider text-muted md:grid">
          <span>Produk</span>
          <span>Jumlah</span>
          <span className="text-right">Subtotal</span>
          <span />
        </div>
        <ul className="divide-y divide-line">
          {items.map((l) => (
            <li key={l.key} className="grid grid-cols-[80px_1fr] gap-4 py-5 md:grid-cols-[1fr_140px_120px_40px] md:items-center">
              <div className="contents md:flex md:items-center md:gap-4">
                <Link href={`/produk/${l.slug}`} className="row-span-2 md:row-span-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image} alt={l.name} className="h-[100px] w-20 rounded-sm bg-sand object-cover" />
                </Link>
                <div>
                  <Link href={`/produk/${l.slug}`} className="hover:underline">{l.name}</Link>
                  {variantText(l) && <p className="mt-0.5 text-sm text-muted">{variantText(l)}</p>}
                  <p className="mt-1 text-sm tabular-nums text-muted">{rupiah(l.price)}</p>
                </div>
              </div>
              <div className="col-start-2 flex items-center justify-between gap-3 md:contents">
                <QtyStepper value={l.qty} onChange={(q) => cart.setQty(l.key, q)} size="sm" />
                <span className="font-medium tabular-nums md:text-right">{rupiah(l.price * l.qty)}</span>
                <button type="button" onClick={() => cart.remove(l.key)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink" aria-label={`Hapus ${l.name}`}>
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/katalog" className="mt-4 inline-block text-sm text-muted underline underline-offset-4 hover:text-ink">
          ← Lanjut belanja
        </Link>
      </div>

      <aside className="h-fit rounded-sm border border-line bg-white p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-2xl font-semibold">Ringkasan</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Jumlah barang</dt>
            <dd className="tabular-nums">{count}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Ongkos kirim</dt>
            <dd className="text-muted">Dikonfirmasi admin</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base">
            <dt className="font-medium">Subtotal</dt>
            <dd className="font-semibold tabular-nums">{rupiah(total)}</dd>
          </div>
        </dl>
        <Link href="/checkout" className="mt-6 flex h-12 items-center justify-center rounded-full bg-ink text-sm font-medium text-white hover:bg-ink-soft">
          Lanjut ke checkout
        </Link>
        <p className="mt-3 text-center text-xs text-muted">Tidak perlu daftar akun.</p>
      </aside>
    </div>
  );
}
