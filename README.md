# Demo Paket 1 · Katalog WhatsApp (Fashion)

Contoh website katalog untuk toko fashion fiktif **Arunika**, dipakai sebagai demo penawaran Paket 1.
Hanya tampilan (frontend). Belum ada database atau login. Data produk ada di file.

## Halaman

| URL | Isi |
| --- | --- |
| `/` | Beranda: slider promo, kategori, produk unggulan, koleksi terbaru, cara pesan |
| `/katalog` | Filter kategori, urutan harga/populer/diskon, pencarian, filter "sedang diskon" |
| `/produk/[slug]` | Galeri foto, varian warna & ukuran, harga coret, panduan ukuran, tanya via WA |
| `/keranjang` | Keranjang tanpa akun (disimpan di browser) |
| `/checkout` | Form nama, HP, alamat, catatan, lalu pratinjau pesan dan buka WhatsApp |
| `/tentang`, `/kontak` | Tentang Kami, cara pesan, FAQ & retur, kontak admin |
| `/admin` | Tampilan halaman admin: dashboard, produk, form produk, kategori & banner, pengaturan |

SEO: metadata per halaman, pratinjau link (Open Graph), `sitemap.xml`, `robots.txt`, data terstruktur produk.

## Mengubah isi

- **Info toko, nomor admin, mode demo**: `src/config/store.ts`
- **Produk & kategori**: `src/data/products.ts`
- **Format pesan WhatsApp**: `src/lib/whatsapp.ts`

`demoMode: true` membuka WhatsApp tanpa nomor tujuan (pengunjung memilih kontak sendiri) dan menampilkan bar "Demo".
Untuk website klien sungguhan, set `demoMode: false` dan isi nomor admin asli (format `628xxx`).

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy ke Vercel

1. Push folder ini ke GitHub, lalu **Import Project** di vercel.com (framework otomatis terdeteksi Next.js), atau jalankan `npx vercel` dari folder ini.
2. Tambahkan environment variable `NEXT_PUBLIC_SITE_URL` berisi domain final, misalnya `https://arunika-demo.vercel.app`. Nilai ini dipakai untuk sitemap dan link pratinjau.

Foto produk diambil dari Unsplash (images.unsplash.com) dan sudah dikompres lewat parameter URL.
