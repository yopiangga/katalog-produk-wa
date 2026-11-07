"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { cart, useCart } from "@/lib/cart-store";
import { rupiah } from "@/lib/format";
import { variantText } from "@/lib/whatsapp";
import { QtyStepper } from "./qty-stepper";
import { useUI } from "./ui-provider";

export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { items, count, total } = useCart();

  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Keranjang belanja">
      <button type="button" className="absolute inset-0 bg-ink/40" onClick={closeCart} aria-label="Tutup keranjang" />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl animate-slide-in">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <h2 className="font-display text-2xl font-semibold">Keranjang ({count})</h2>
          <button type="button" onClick={closeCart} className="grid size-10 place-items-center rounded-full hover:bg-sand" aria-label="Tutup">
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-sand">
              <ShoppingBag className="size-7 text-muted" />
            </div>
            <p className="text-muted">Keranjang masih kosong. Yuk lihat koleksi terbaru kami.</p>
            <Link href="/katalog" onClick={closeCart} className="rounded-full bg-ink px-6 py-3 text-sm text-white hover:bg-ink-soft">
              Mulai belanja
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((l) => (
                <li key={l.key} className="flex gap-4 py-4">
                  <Link href={`/produk/${l.slug}`} onClick={closeCart} className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.image} alt={l.name} className="h-24 w-20 rounded-sm bg-sand object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link href={`/produk/${l.slug}`} onClick={closeCart} className="text-sm leading-snug hover:underline">
                        {l.name}
                      </Link>
                      <button type="button" onClick={() => cart.remove(l.key)} className="-mr-1 -mt-1 grid size-7 shrink-0 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink" aria-label={`Hapus ${l.name}`}>
                        <X className="size-4" />
                      </button>
                    </div>
                    {variantText(l) && <p className="mt-0.5 text-xs text-muted">{variantText(l)}</p>}
                    <div className="mt-auto flex items-end justify-between pt-2">
                      <QtyStepper value={l.qty} onChange={(q) => cart.setQty(l.key, q)} size="sm" />
                      <span className="text-sm font-medium tabular-nums">{rupiah(l.price * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-line bg-white/60 px-5 pb-6 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="text-lg font-semibold tabular-nums">{rupiah(total)}</span>
              </div>
              <p className="text-xs text-muted">Ongkir dikonfirmasi admin lewat WhatsApp.</p>
              <Link href="/checkout" onClick={closeCart} className="flex h-12 items-center justify-center rounded-full bg-ink text-sm font-medium text-white hover:bg-ink-soft">
                Checkout
              </Link>
              <Link href="/keranjang" onClick={closeCart} className="block text-center text-sm text-muted underline underline-offset-4 hover:text-ink">
                Lihat keranjang
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
