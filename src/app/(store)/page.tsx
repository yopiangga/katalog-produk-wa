import Link from "next/link";
import { MessageCircle, RefreshCw, ShoppingBag, Truck, Scissors } from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, products, isSoldOut } from "@/data/products";
import { photo } from "@/lib/format";
import { WhatsAppIcon } from "@/components/icons";

const featured = products.filter((p) => p.labels.includes("Unggulan") && !isSoldOut(p)).slice(0, 8);
const newest = [...products].sort((a, b) => b.added - a.added).slice(0, 8);

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Kategori */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 md:mt-24">
        <SectionHeading kicker="Kategori" title="Belanja sesuai kebutuhan" href="/katalog" />
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.slug} href={`/katalog?kategori=${c.slug}`} className="group relative block w-[42%] shrink-0 snap-start overflow-hidden rounded-sm sm:w-auto">
              <div className="aspect-[3/4] bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo(c.cover.id, { w: 420, h: 560, fx: c.cover.fx, fy: c.cover.fy })}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-display text-2xl font-semibold leading-none">{c.name}</p>
                <p className="mt-1 text-xs text-white/80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Unggulan */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 md:mt-28">
        <SectionHeading kicker="Pilihan kami" title="Produk unggulan" href="/katalog?urut=populer" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      </section>

      {/* Banner promo */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 md:mt-28">
        <div className="grid overflow-hidden rounded-sm bg-ink text-white md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo("1595777457583-95e059d581b8", { w: 900, h: 800, fy: 0.4 })} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">Sampai 31 Desember</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
              Diskon hingga 20% <span className="italic text-[#e8b79f]">untuk koleksi pesta</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              Harga coret sudah langsung terpotong di website. Tinggal pilih ukuran, masukkan ke keranjang dan kirim pesanan lewat WhatsApp.
            </p>
            <div className="mt-8">
              <Link href="/katalog?kategori=dress" className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-medium text-ink hover:bg-paper">
                Lihat koleksi pesta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Terbaru */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 md:mt-28">
        <SectionHeading kicker="Baru datang" title="Koleksi terbaru" href="/katalog?urut=terbaru" />
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:gap-6">
          {newest.map((p) => (
            <div key={p.slug} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23%]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Cara pesan */}
      <section id="cara-pesan" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 md:mt-28">
        <div className="rounded-sm border border-line bg-white px-6 py-12 md:px-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Cara pesan</p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight md:text-[42px]">Belanja semudah kirim chat</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">Tidak perlu daftar akun. Pesanan kamu tersusun otomatis dan langsung masuk ke WhatsApp admin kami.</p>
            </div>
            <ol className="grid gap-8 sm:grid-cols-3">
              {[
                { icon: ShoppingBag, t: "Pilih produk", d: "Tentukan warna dan ukuran, lalu masukkan ke keranjang." },
                { icon: MessageCircle, t: "Isi data singkat", d: "Cukup nama, nomor HP dan alamat pengiriman." },
                { icon: WhatsAppIcon, t: "Kirim ke WhatsApp", d: "Pesan pesanan sudah rapi. Admin balas dengan total ongkir." },
              ].map((s, i) => (
                <li key={s.t}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-sand text-ink">
                      <s.icon className="size-5" />
                    </span>
                    <span className="font-display text-4xl font-semibold text-line">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-medium">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <ul className="grid gap-6 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Scissors, t: "Dijahit rapi", d: "Quality control per potong" },
            { icon: Truck, t: "Dikirim 1×24 jam", d: "Pesanan sebelum 15.00 WIB" },
            { icon: RefreshCw, t: "Tukar ukuran 7 hari", d: "Gratis, selama label utuh" },
            { icon: MessageCircle, t: "Admin responsif", d: "Dibalas di jam operasional" },
          ].map((f) => (
            <li key={f.t} className="flex items-center gap-4">
              <f.icon className="size-6 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium">{f.t}</p>
                <p className="text-sm text-muted">{f.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
