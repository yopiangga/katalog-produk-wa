/**
 * Pengaturan toko. Di versi produksi, semua nilai ini diubah dari
 * Halaman Admin > Pengaturan Toko (tanpa coding).
 */
export const store = {
  name: "Arunika",
  tagline: "Busana harian yang tenang dan tahan lama",
  description:
    "Arunika adalah label busana lokal dari Yogyakarta. Kami membuat pakaian wanita yang nyaman dipakai setiap hari, dijahit rapi dan dirancang untuk awet bertahun-tahun.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arunika-demo.vercel.app",

  /**
   * Mode demo: pesan WhatsApp dibuka tanpa nomor tujuan supaya calon klien
   * bisa mengirim pesan contoh ke dirinya sendiri. Set ke `false` dan isi
   * nomor admin asli untuk website klien.
   */
  demoMode: true,

  /** Chat checkout dibagi ke beberapa admin secara bergantian. */
  admins: [
    { name: "Sinta", phone: "6281200000001" },
    { name: "Rani", phone: "6281200000002" },
    { name: "Dimas", phone: "6281200000003" },
  ],

  promoBar: "Gratis ongkir se-Jawa untuk pembelian di atas Rp300.000",
  address: "Jl. Prawirotaman No. 21, Mergangsan, Yogyakarta 55153",
  hours: [
    { day: "Senin – Jumat", time: "09.00 – 20.00" },
    { day: "Sabtu", time: "10.00 – 18.00" },
    { day: "Minggu", time: "Online saja" },
  ],
  email: "halo@arunika.id",
  socials: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
  },
} as const;

export type Admin = (typeof store.admins)[number];
