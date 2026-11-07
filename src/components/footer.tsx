import Link from "next/link";
import { store } from "@/config/store";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-3xl font-semibold text-white">{store.name.toLowerCase()}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{store.tagline}. Dijahit di Yogyakarta, dikirim ke seluruh Indonesia.</p>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={store.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            <a href={store.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white">Belanja</p>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/katalog?kategori=${c.slug}`} className="hover:text-white">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white">Info</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/tentang" className="hover:text-white">Tentang Kami</Link></li>
            <li><Link href="/tentang#cara-pesan" className="hover:text-white">Cara Pesan</Link></li>
            <li><Link href="/tentang#faq" className="hover:text-white">FAQ & Retur</Link></li>
            <li><Link href="/kontak" className="hover:text-white">Kontak</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white">Toko</p>
          <p className="text-sm leading-relaxed">{store.address}</p>
          <ul className="mt-3 space-y-1 text-sm">
            {store.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="tabular-nums text-white/90">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs sm:flex-row sm:justify-between sm:px-6">
          <p>© 2026 {store.name}. Semua hak dilindungi.</p>
          <p>Foto produk: Unsplash · Toko & produk fiktif untuk demonstrasi.</p>
        </div>
      </div>
    </footer>
  );
}
