import Link from "next/link";
import { store } from "@/config/store";

export function TopBars() {
  return (
    <>
      {store.demoMode && (
        <div className="bg-ink text-[12px] text-white/80">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center sm:px-6">
            <span className="rounded-sm bg-white/15 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider text-white">Demo</span>
            <span>
              Contoh website <strong className="font-medium text-white">Paket 1 · Katalog WhatsApp</strong>. Produk & toko fiktif.
            </span>
            <Link href="/admin" className="hidden underline underline-offset-2 hover:text-white sm:inline">
              Lihat halaman admin →
            </Link>
          </div>
        </div>
      )}
      <div className="bg-accent text-center text-[12px] tracking-wide text-white">
        <p className="mx-auto max-w-7xl px-4 py-2">{store.promoBar}</p>
      </div>
    </>
  );
}
