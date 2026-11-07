"use client";

import { useRef, useState } from "react";
import { Check, ChevronDown, Ruler } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { Price } from "@/components/price";
import { QtyStepper } from "@/components/qty-stepper";
import { useUI } from "@/components/ui-provider";
import { store } from "@/config/store";
import { displayLabels, getCategory, isSoldOut, type Product } from "@/data/products";
import { cart } from "@/lib/cart-store";
import { photo } from "@/lib/format";
import { peekAdmin, productQuestion, waLink } from "@/lib/whatsapp";

const SIZE_CHART = [
  ["S", "86", "70", "92"],
  ["M", "92", "76", "98"],
  ["L", "98", "82", "104"],
  ["XL", "104", "88", "110"],
];

export function ProductView({ product }: { product: Product }) {
  const { openCart } = useUI();
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState<string | undefined>(product.sizes.length === 1 ? product.sizes[0] : undefined);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const soldOut = isSoldOut(product);
  const labels = displayLabels(product);
  const cat = getCategory(product.category);
  const needsSize = product.sizes.length > 0;

  function addToCart() {
    if (needsSize && !size) {
      setSizeError(true);
      document.getElementById("size-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const s = product.gallery[0];
    cart.add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color,
      size,
      qty,
      image: photo(s.id, { w: 200, h: 250, fx: s.fx, fy: s.fy }),
    });
    openCart();
  }

  function ask() {
    const url = `${store.url}/produk/${product.slug}`;
    window.open(waLink(peekAdmin().phone, productQuestion(product.name, url)), "_blank", "noopener");
  }

  function goTo(i: number) {
    setActive(i);
    const el = scroller.current;
    if (el) el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12 lg:gap-16">
      {/* Galeri */}
      <div className="md:sticky md:top-24 md:self-start">
        <div className="flex gap-3">
          <div className="hidden w-20 shrink-0 flex-col gap-3 md:flex">
            {product.gallery.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`aspect-[4/5] overflow-hidden rounded-sm bg-sand ring-offset-2 ring-offset-paper transition ${i === active ? "ring-1 ring-ink" : "opacity-70 hover:opacity-100"}`}
                aria-label={`Foto ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo(s.id, { w: 160, h: 200, fx: s.fx, fy: s.fy, z: s.z })} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative min-w-0 flex-1">
            <div
              ref={scroller}
              className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-sm bg-sand"
              onScroll={(e) => {
                const el = e.currentTarget;
                const i = Math.round(el.scrollLeft / el.clientWidth);
                if (i !== active) setActive(i);
              }}
            >
              {product.gallery.map((s, i) => (
                <div key={i} className="aspect-[4/5] w-full shrink-0 snap-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo(s.id, { w: 1000, h: 1250, fx: s.fx, fy: s.fy, z: s.z })}
                    alt={i === 0 ? product.name : `${product.name} – detail ${i}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    className={`size-full object-cover ${soldOut ? "grayscale-[30%]" : ""}`}
                  />
                </div>
              ))}
            </div>
            <div className="absolute left-3 top-3 flex gap-1.5">
              {labels.map((l) => (
                <span key={l} className={`rounded-full px-2.5 py-1 text-xs font-medium ${l === "Habis" ? "bg-ink text-white" : l === "Baru" ? "bg-white text-ink" : "bg-accent text-white"}`}>
                  {l}
                </span>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 md:hidden">
              {product.gallery.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-ink" : "w-1.5 bg-ink/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{cat?.name}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.05] md:text-5xl">{product.name}</h1>
        <div className="mt-4">
          <Price price={product.price} compare={product.comparePrice} size="lg" />
        </div>
        <p className="mt-1 text-xs text-muted">SKU {product.sku}</p>

        <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">{product.description}</p>

        {/* Warna */}
        {product.colors.length > 0 && (
          <fieldset className="mt-8">
            <legend className="text-sm">
              Warna: <span className="font-medium">{color}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  className={`grid size-10 place-items-center rounded-full ring-offset-2 ring-offset-paper transition ${color === c.name ? "ring-2 ring-ink" : "ring-1 ring-line hover:ring-ink-soft"}`}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  title={c.name}
                >
                  <span className="size-full rounded-full border border-black/10" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Ukuran */}
        {needsSize && (
          <fieldset id="size-picker" className="mt-7">
            <div className="flex items-center justify-between">
              <legend className="text-sm">
                Ukuran{size ? <>: <span className="font-medium">{size}</span></> : null}
              </legend>
              {product.sizes.includes("M") && (
                <button type="button" onClick={() => setShowChart((v) => !v)} className="inline-flex items-center gap-1.5 text-sm text-muted underline underline-offset-4 hover:text-ink">
                  <Ruler className="size-4" /> Panduan ukuran
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  aria-pressed={size === s}
                  className={`h-11 min-w-12 rounded-full border px-4 text-sm transition ${size === s ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink-soft"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="mt-2 text-sm text-accent" role="alert">Pilih ukuran terlebih dahulu.</p>}
            {showChart && (
              <div className="mt-4 overflow-hidden rounded-sm border border-line bg-white text-sm animate-fade-up">
                <table className="w-full text-center tabular-nums">
                  <thead className="bg-sand text-xs text-muted">
                    <tr>
                      <th className="py-2 font-medium">Ukuran</th>
                      <th className="py-2 font-medium">Dada (cm)</th>
                      <th className="py-2 font-medium">Pinggang</th>
                      <th className="py-2 font-medium">Pinggul</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((r) => (
                      <tr key={r[0]} className="border-t border-line">
                        {r.map((c, i) => (
                          <td key={i} className={`py-2 ${i === 0 ? "font-medium" : ""}`}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </fieldset>
        )}

        {/* Aksi */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {!soldOut && <QtyStepper value={qty} onChange={setQty} max={Math.min(product.stock, 20)} />}
          <button
            type="button"
            onClick={addToCart}
            disabled={soldOut}
            className="h-12 flex-1 rounded-full bg-ink px-8 text-sm font-medium text-white transition hover:bg-ink-soft disabled:cursor-not-allowed disabled:bg-ink/30"
          >
            {soldOut ? "Stok habis" : "Masukkan ke keranjang"}
          </button>
        </div>
        <button
          type="button"
          onClick={ask}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-wa-dark/30 bg-white text-sm font-medium text-wa-dark transition hover:bg-wa/10"
        >
          <WhatsAppIcon className="size-5" />
          {soldOut ? "Tanya kapan restok" : "Tanya produk ini via WhatsApp"}
        </button>
        {!soldOut && product.stock <= 5 && (
          <p className="mt-3 text-sm text-accent">Tinggal {product.stock} lagi, segera amankan.</p>
        )}

        <ul className="mt-8 space-y-2 text-sm text-ink-soft">
          {["Tanpa daftar akun, pesan langsung lewat WhatsApp", "Tukar ukuran gratis dalam 7 hari", "Dikirim 1×24 jam di hari kerja"].map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <Check className="size-4 text-wa-dark" /> {t}
            </li>
          ))}
        </ul>

        <div className="mt-8 divide-y divide-line border-y border-line">
          <Accordion title="Detail produk" defaultOpen>
            <ul className="list-disc space-y-1.5 pl-5">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="Pengiriman & penukaran">
            <p>Pesanan dikirim dari Yogyakarta lewat JNE, J&T atau SiCepat. Ongkir dikonfirmasi admin saat membalas pesanan kamu di WhatsApp.</p>
            <p className="mt-2">Penukaran ukuran gratis maksimal 7 hari setelah barang diterima, selama label masih terpasang dan barang belum dicuci.</p>
          </Accordion>
        </div>
      </div>

      {/* Sticky bar mobile */}
      {!soldOut && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted">{[color, size].filter(Boolean).join(" / ") || product.name}</p>
              <Price price={product.price} compare={product.comparePrice} />
            </div>
            <button type="button" onClick={addToCart} className="ml-auto h-11 shrink-0 rounded-full bg-ink px-5 text-sm font-medium text-white">
              + Keranjang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-ink-soft">{children}</div>
    </details>
  );
}
