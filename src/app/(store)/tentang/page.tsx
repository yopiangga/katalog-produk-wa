import type { Metadata } from "next";
import Link from "next/link";
import { store } from "@/config/store";
import { photo } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: store.description,
};

const FAQ = [
  { q: "Apakah harus daftar akun untuk memesan?", a: "Tidak perlu. Pilih produk, masukkan ke keranjang, isi nama, nomor HP dan alamat, lalu pesanan terkirim otomatis ke WhatsApp admin." },
  { q: "Bagaimana cara pembayaran?", a: "Setelah menerima pesanan, admin membalas dengan total belanja plus ongkir dan nomor rekening BCA/Mandiri atau QRIS. Pesanan diproses setelah pembayaran dikonfirmasi." },
  { q: "Berapa lama pengiriman?", a: "Pesanan yang sudah dibayar sebelum pukul 15.00 WIB dikirim di hari yang sama. Estimasi tiba 1–3 hari untuk Pulau Jawa dan 3–7 hari untuk luar Jawa." },
  { q: "Bisa tukar ukuran?", a: "Bisa, gratis satu kali dalam 7 hari setelah barang diterima. Pastikan label masih terpasang dan barang belum dicuci. Ongkir pengiriman balik ditanggung pembeli." },
  { q: "Apakah bisa retur uang kembali?", a: "Pengembalian dana hanya untuk barang cacat produksi atau salah kirim. Sertakan video unboxing saat menghubungi admin." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 sm:px-6 md:grid-cols-2 md:items-center md:gap-16 md:pt-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Tentang kami</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.02] md:text-6xl">Pakaian yang tenang, dibuat untuk dipakai lama</h1>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
            {store.name} lahir di sebuah studio jahit kecil di Prawirotaman, Yogyakarta, pada 2019. Kami percaya pakaian yang baik tidak perlu berganti setiap musim. Cukup potongan yang pas, bahan yang jujur dan jahitan yang rapi.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            Setiap koleksi diproduksi dalam jumlah terbatas bersama 12 penjahit lokal. Sisa kain kami olah menjadi pouch dan scrunchie, jadi hampir tidak ada yang terbuang.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              ["2019", "Mulai berjahit"],
              ["12", "Penjahit lokal"],
              ["18rb+", "Pesanan terkirim"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-4xl font-semibold">{n}</dd>
                <dd className="mt-1 text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo("1490481651871-ab68de25d43d", { w: 600, h: 800 })} alt="Koleksi blus di rak studio" className="aspect-[3/4] w-full rounded-sm object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo("1434389677669-e08b4cac3105", { w: 600, h: 800 })} alt="Poncho rajut" className="mt-12 aspect-[3/4] w-full rounded-sm object-cover" />
        </div>
      </section>

      <section id="cara-pesan" className="mx-auto mt-24 max-w-7xl scroll-mt-24 px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-[42px]">Cara pesan</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["Pilih produk", "Buka katalog, pilih warna dan ukuran, lalu tekan Masukkan ke keranjang."],
            ["Checkout", "Isi nama, nomor HP dan alamat. Tidak perlu membuat akun."],
            ["Kirim ke WhatsApp", "Pesanan tersusun otomatis. Tekan kirim di WhatsApp."],
            ["Bayar & terima", "Admin membalas total + ongkir. Setelah transfer, barang dikirim."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-sm border border-line bg-white p-6">
              <span className="font-display text-4xl font-semibold text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-medium">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="mx-auto mt-24 max-w-3xl scroll-mt-24 px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold md:text-[42px]">Pertanyaan umum & kebijakan retur</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-xl leading-none text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Masih ada pertanyaan? <Link href="/kontak" className="text-ink underline underline-offset-4">Hubungi kami</Link>
        </p>
      </section>
    </>
  );
}
