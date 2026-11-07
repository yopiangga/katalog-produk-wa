import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl font-semibold text-line">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-muted">Produk mungkin sudah tidak dijual atau link-nya salah ketik.</p>
      <Link href="/katalog" className="mt-8 rounded-full bg-ink px-6 py-3 text-sm text-white hover:bg-ink-soft">
        Kembali ke katalog
      </Link>
    </div>
  );
}
