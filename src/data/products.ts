export type Shot = { id: string; fx?: number; fy?: number; z?: number };
export type Color = { name: string; hex: string };
export type Label = "Baru" | "Unggulan" | "Habis";

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  cover: Shot;
};

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  comparePrice?: number;
  gallery: Shot[];
  colors: Color[];
  sizes: string[];
  description: string;
  details: string[];
  labels: Label[];
  /** urutan terbaru: angka lebih besar = lebih baru */
  added: number;
  stock: number;
  views: number;
};

export const categories: Category[] = [
  { slug: "atasan", name: "Atasan", blurb: "Kaos, blus & knit", cover: { id: "1490481651871-ab68de25d43d", fy: 0.45 } },
  { slug: "dress", name: "Dress", blurb: "Midi, maxi & pesta", cover: { id: "1539008835657-9e8e9680c956", fy: 0.35 } },
  { slug: "bawahan", name: "Bawahan", blurb: "Jeans & celana", cover: { id: "1475178626620-a4d074967452", fy: 0.5 } },
  { slug: "outer", name: "Outer", blurb: "Jaket, blazer & coat", cover: { id: "1483985988355-763728e1935b", fy: 0.35 } },
  { slug: "tas-sepatu", name: "Tas & Sepatu", blurb: "Pelengkap gaya", cover: { id: "1543163521-1bf539c55dd2", fy: 0.5 } },
  { slug: "aksesoris", name: "Aksesoris", blurb: "Perhiasan & kacamata", cover: { id: "1617038260897-41a1f14a8ca0", fy: 0.5 } },
];

/** Galeri: foto utama + dua foto detail (zoom) dari foto yang sama. */
function g(id: string, main: Omit<Shot, "id"> = {}, details: [number, number][] = [[0.5, 0.3], [0.5, 0.7]]): Shot[] {
  return [{ id, ...main }, ...details.map(([fx, fy]) => ({ id, fx, fy, z: 2 }))];
}

const SML = ["S", "M", "L", "XL"];
const ALL = ["All Size"];

const C = {
  ivory: { name: "Ivory", hex: "#EFE8DA" },
  white: { name: "Putih", hex: "#FAFAF7" },
  black: { name: "Hitam", hex: "#1D1D1F" },
  navy: { name: "Navy", hex: "#22304A" },
  mocca: { name: "Mocca", hex: "#8A6A52" },
  sage: { name: "Sage", hex: "#9DAA8E" },
  misty: { name: "Biru Muda", hex: "#A9C1DA" },
  grey: { name: "Abu Muda", hex: "#C9C9C6" },
  red: { name: "Merah", hex: "#B4232C" },
  plum: { name: "Plum", hex: "#5B1F3E" },
  terra: { name: "Terracotta", hex: "#B86A4B" },
  dusty: { name: "Dusty Pink", hex: "#D9AFA3" },
  denimLight: { name: "Light Wash", hex: "#9DB6D1" },
  denimDark: { name: "Dark Indigo", hex: "#2A3446" },
  wine: { name: "Wine", hex: "#6E1E2B" },
  tan: { name: "Tan", hex: "#C98A55" },
  gold: { name: "Emas", hex: "#C9A15A" },
  rose: { name: "Rose Gold", hex: "#D8A48F" },
  yellow: { name: "Kuning Mustard", hex: "#E3A72F" },
};

const BASE_DETAILS = (bahan: string, fit: string) => [
  `Bahan: ${bahan}`,
  `Potongan: ${fit}`,
  "Cuci dengan tangan atau mesin mode lembut, jangan diputih",
  "Model memakai ukuran M, tinggi 165 cm",
];

export const products: Product[] = [
  // ATASAN
  {
    slug: "kaia-knit-poncho", sku: "ARN-AT-001", name: "Kaia Knit Poncho", category: "atasan",
    price: 289000, comparePrice: 349000, gallery: g("1434389677669-e08b4cac3105", { fy: 0.45 }),
    colors: [C.ivory, C.mocca], sizes: ALL,
    description: "Poncho rajut dengan rumbai di ujungnya. Ringan, tidak gerah, dan mudah dipadukan dengan kaos polos atau dress tanpa lengan.",
    details: BASE_DETAILS("Rajut katun akrilik", "Longgar, lingkar dada hingga 120 cm"),
    labels: ["Unggulan"], added: 21, stock: 14, views: 1840,
  },
  {
    slug: "basic-crew-tee", sku: "ARN-AT-002", name: "Basic Crew Tee Organic", category: "atasan",
    price: 129000, gallery: g("1521572163474-6864f9cf17ab", { fy: 0.4 }, [[0.5, 0.25], [0.35, 0.6]]),
    colors: [C.white, C.black, C.navy], sizes: SML,
    description: "Kaos basic leher bulat dari katun organik 24s. Jatuhnya pas di badan tanpa terlalu ketat, cocok untuk dipakai harian.",
    details: BASE_DETAILS("Katun organik combed 24s", "Regular fit"),
    labels: ["Unggulan"], added: 12, stock: 62, views: 2410,
  },
  {
    slug: "daily-tee-melange", sku: "ARN-AT-003", name: "Daily Tee Melange", category: "atasan",
    price: 119000, comparePrice: 149000, gallery: g("1564584217132-2271feaeb3c5", { fy: 0.45 }),
    colors: [C.misty, C.grey], sizes: SML,
    description: "Kaos dengan tekstur melange yang lembut. Warna kalem, tidak mudah pudar setelah dicuci berulang kali.",
    details: BASE_DETAILS("Cotton melange 30s", "Regular fit"),
    labels: [], added: 9, stock: 28, views: 960,
  },
  {
    slug: "nara-oversized-sweatshirt", sku: "ARN-AT-004", name: "Nara Oversized Sweatshirt", category: "atasan",
    price: 249000, gallery: g("1620799140408-edc6dcb6d633", { fy: 0.45 }),
    colors: [C.ivory, C.grey], sizes: ["S/M", "L/XL"],
    description: "Sweatshirt oversized berbahan fleece tipis. Hangat untuk ruangan ber-AC namun tetap nyaman di cuaca tropis.",
    details: BASE_DETAILS("Cotton fleece 280 gsm", "Oversized, bahu turun"),
    labels: ["Baru"], added: 29, stock: 20, views: 1210,
  },
  {
    slug: "peace-graphic-tee", sku: "ARN-AT-005", name: "Peace Graphic Tee", category: "atasan",
    price: 139000, gallery: g("1503342217505-b0a15ec3261c", { fy: 0.4 }, [[0.45, 0.45], [0.5, 0.25]]),
    colors: [C.black], sizes: SML,
    description: "Kaos hitam dengan sablon plastisol yang tidak mudah retak. Potongan sedikit cropped, enak dipadukan dengan jeans high-waist.",
    details: BASE_DETAILS("Katun combed 24s", "Semi crop"),
    labels: [], added: 7, stock: 0, views: 780,
  },
  {
    slug: "colour-pack-tee", sku: "ARN-AT-006", name: "Colour Pack Tee (isi 3)", category: "atasan",
    price: 329000, comparePrice: 387000, gallery: g("1562157873-818bc0726f68", {}, [[0.3, 0.3], [0.7, 0.7]]),
    colors: [{ name: "Campur Warna", hex: "#8B3A3A" }], sizes: SML,
    description: "Paket hemat tiga kaos basic dengan warna pilihan kami. Lebih murah Rp58.000 dibanding beli satuan.",
    details: BASE_DETAILS("Katun combed 24s", "Regular fit"),
    labels: ["Unggulan"], added: 15, stock: 33, views: 1560,
  },
  {
    slug: "monogram-tee-hitam", sku: "ARN-AT-007", name: "Monogram Tee Hitam", category: "atasan",
    price: 135000, gallery: g("1618354691373-d851c5c3a990", { fy: 0.45 }, [[0.65, 0.4], [0.5, 0.6]]),
    colors: [C.black, C.white], sizes: SML,
    description: "Kaos hitam dengan bordir monogram kecil di dada kiri. Simpel, rapi dan cocok untuk gaya kasual maupun semi formal.",
    details: BASE_DETAILS("Katun combed 24s", "Regular fit"),
    labels: [], added: 5, stock: 40, views: 640,
  },
  {
    slug: "sunny-hoodie-set", sku: "ARN-AT-008", name: "Sunny Hoodie & Jogger Set", category: "atasan",
    price: 459000, comparePrice: 529000, gallery: g("1515886657613-9f3515b0c78f", { fy: 0.4 }, [[0.5, 0.3], [0.5, 0.65]]),
    colors: [C.yellow, C.grey], sizes: SML,
    description: "Satu set hoodie cropped dan jogger dengan warna cerah. Bisa dipakai bersamaan atau dipisah.",
    details: BASE_DETAILS("Cotton fleece", "Hoodie cropped, jogger relaxed"),
    labels: ["Baru"], added: 27, stock: 11, views: 1330,
  },

  // DRESS
  {
    slug: "liana-floral-wrap-dress", sku: "ARN-DR-001", name: "Liana Floral Wrap Dress", category: "dress",
    price: 379000, comparePrice: 459000, gallery: g("1496747611176-843222e1e57c", { fy: 0.4 }),
    colors: [C.ivory, C.dusty], sizes: SML,
    description: "Wrap dress motif bunga dengan tali pinggang yang bisa diatur. Rok jatuh dan melambai saat berjalan.",
    details: BASE_DETAILS("Rayon premium", "Wrap, panjang midi"),
    labels: ["Unggulan"], added: 24, stock: 17, views: 3120,
  },
  {
    slug: "rosa-midi-dress", sku: "ARN-DR-002", name: "Rosa Midi Dress", category: "dress",
    price: 399000, gallery: g("1572804013309-59a88b7e92f1", { fy: 0.4 }),
    colors: [C.red], sizes: SML,
    description: "Midi dress merah dengan motif bunga kecil dan rok mengembang. Dilengkapi ikat pinggang dengan gesper.",
    details: BASE_DETAILS("Katun rayon", "Fit and flare"),
    labels: [], added: 18, stock: 9, views: 1490,
  },
  {
    slug: "scarlet-flowy-maxi", sku: "ARN-DR-003", name: "Scarlet Flowy Maxi", category: "dress",
    price: 549000, gallery: g("1595777457583-95e059d581b8", { fy: 0.4 }),
    colors: [C.red, C.plum], sizes: SML,
    description: "Maxi dress berbahan chiffon berlapis. Siluetnya mengalir, pas untuk kondangan, foto prewedding, atau acara malam.",
    details: BASE_DETAILS("Chiffon double layer", "Maxi, tali spageti"),
    labels: ["Unggulan"], added: 20, stock: 6, views: 2280,
  },
  {
    slug: "senja-slit-maxi", sku: "ARN-DR-004", name: "Senja Slit Maxi Dress", category: "dress",
    price: 429000, comparePrice: 499000, gallery: g("1539008835657-9e8e9680c956", { fy: 0.35 }),
    colors: [C.misty, C.ivory], sizes: SML,
    description: "Maxi dress biru muda dengan belahan samping. Ringan dan sejuk, teman liburan ke pantai.",
    details: BASE_DETAILS("Satin crepe", "Wrap maxi dengan belahan"),
    labels: ["Baru"], added: 30, stock: 12, views: 1980,
  },
  {
    slug: "plum-off-shoulder-gown", sku: "ARN-DR-005", name: "Plum Off-Shoulder Gown", category: "dress",
    price: 589000, gallery: g("1566174053879-31528523f8ae", { fy: 0.35 }, [[0.55, 0.35], [0.45, 0.65]]),
    colors: [C.plum], sizes: SML,
    description: "Gaun sabrina dengan bahan scuba yang membentuk badan. Elegan untuk acara formal.",
    details: BASE_DETAILS("Scuba premium", "Bodycon, off-shoulder"),
    labels: [], added: 14, stock: 5, views: 1120,
  },
  {
    slug: "carmine-drape-dress", sku: "ARN-DR-006", name: "Carmine Drape Dress", category: "dress",
    price: 499000, gallery: g("1612336307429-8a898d10e223", { fy: 0.4 }),
    colors: [C.red], sizes: SML,
    description: "Dress lengan panjang dengan detail drape di samping yang menjuntai sampai lantai.",
    details: BASE_DETAILS("Crepe stretch", "Mini dress dengan drape panjang"),
    labels: [], added: 11, stock: 7, views: 890,
  },
  {
    slug: "sparkle-two-piece-set", sku: "ARN-DR-007", name: "Sparkle Two-Piece Set", category: "dress",
    price: 619000, comparePrice: 749000, gallery: g("1550614000-4895a10e1bfd", { fy: 0.35 }, [[0.65, 0.35], [0.65, 0.75]]),
    colors: [C.wine], sizes: ["S", "M", "L"],
    description: "Set atasan sabrina dan rok tiered dengan payet. Siap untuk pesta akhir tahun.",
    details: BASE_DETAILS("Sequin mesh + furing", "Crop top & rok mini"),
    labels: ["Baru", "Unggulan"], added: 28, stock: 8, views: 2650,
  },

  // BAWAHAN
  {
    slug: "rumi-jogger-pants", sku: "ARN-BW-001", name: "Rumi Jogger Pants", category: "bawahan",
    price: 219000, gallery: g("1594633312681-425c7b97ccd1", { fy: 0.45 }),
    colors: [C.dusty, C.sage, C.black], sizes: SML,
    description: "Jogger berbahan twill ringan dengan pinggang karet dan saku tempel. Rapi dipakai ke kantor kasual.",
    details: BASE_DETAILS("Twill rayon", "Relaxed, ujung karet"),
    labels: [], added: 16, stock: 24, views: 1050,
  },
  {
    slug: "mom-jeans-light-wash", sku: "ARN-BW-002", name: "Mom Jeans Light Wash", category: "bawahan",
    price: 299000, comparePrice: 359000, gallery: g("1475178626620-a4d074967452", { fy: 0.5 }),
    colors: [C.denimLight], sizes: ["27", "28", "29", "30", "31"],
    description: "Jeans high-waist potongan mom fit dengan warna light wash. Bahan denim sedikit stretch agar tetap nyaman.",
    details: BASE_DETAILS("Denim 12 oz, 2% spandex", "Mom fit, high waist"),
    labels: ["Unggulan"], added: 19, stock: 31, views: 2870,
  },
  {
    slug: "straight-jeans-dark-indigo", sku: "ARN-BW-003", name: "Straight Jeans Dark Indigo", category: "bawahan",
    price: 319000, gallery: g("1624378439575-d8705ad7ae80", { fy: 0.5 }),
    colors: [C.denimDark], sizes: ["27", "28", "29", "30", "31"],
    description: "Jeans potongan lurus warna indigo gelap. Mudah dipadukan dan terlihat rapi untuk berbagai acara.",
    details: BASE_DETAILS("Denim rigid 13 oz", "Straight leg"),
    labels: [], added: 8, stock: 19, views: 870,
  },
  {
    slug: "stripe-wide-pants", sku: "ARN-BW-004", name: "Stripe Wide Pants", category: "bawahan",
    price: 259000, gallery: g("1509631179647-0177331693ae", { fy: 0.6 }, [[0.5, 0.55], [0.4, 0.8]]),
    colors: [C.black], sizes: SML,
    description: "Celana kulot motif garis vertikal yang membuat kaki tampak lebih jenjang.",
    details: BASE_DETAILS("Katun linen", "Wide leg, high waist"),
    labels: ["Baru"], added: 26, stock: 15, views: 990,
  },

  // OUTER
  {
    slug: "terra-bomber-jacket", sku: "ARN-OT-001", name: "Terra Bomber Jacket", category: "outer",
    price: 389000, comparePrice: 449000, gallery: g("1591047139829-d91aecb6caea", { fy: 0.5 }),
    colors: [C.terra, C.black], sizes: SML,
    description: "Bomber jacket ringan berbahan parasut halus dengan furing. Tahan angin dan gerimis tipis.",
    details: BASE_DETAILS("Parasut taslan + furing", "Regular fit"),
    labels: ["Unggulan"], added: 23, stock: 13, views: 2140,
  },
  {
    slug: "skye-long-coat", sku: "ARN-OT-002", name: "Skye Long Coat", category: "outer",
    price: 689000, gallery: g("1539109136881-3be0616acf4b", { fy: 0.4 }),
    colors: [C.misty, C.ivory], sizes: SML,
    description: "Coat panjang warna biru langit dengan kerah lebar. Cocok untuk perjalanan ke negara empat musim.",
    details: BASE_DETAILS("Wool blend", "Oversized, panjang di bawah lutut"),
    labels: [], added: 13, stock: 4, views: 1260,
  },
  {
    slug: "tartan-oversized-blazer", sku: "ARN-OT-003", name: "Tartan Oversized Blazer", category: "outer",
    price: 459000, gallery: g("1485968579580-b6d095142e6e", { fy: 0.45 }),
    colors: [C.navy], sizes: SML,
    description: "Blazer oversized motif tartan. Pakai dengan kaos dan jeans untuk tampilan smart casual.",
    details: BASE_DETAILS("Poly wool", "Oversized, satu kancing"),
    labels: ["Baru"], added: 25, stock: 10, views: 1410,
  },
  {
    slug: "biker-leather-jacket", sku: "ARN-OT-004", name: "Biker Leather Jacket", category: "outer",
    price: 799000, comparePrice: 899000, gallery: g("1520975954732-35dd22299614", { fy: 0.4 }, [[0.45, 0.4], [0.55, 0.6]]),
    colors: [C.black], sizes: SML,
    description: "Jaket biker berbahan kulit sintetis premium yang lentur. Unisex.",
    details: BASE_DETAILS("PU leather premium", "Regular fit, unisex"),
    labels: [], added: 6, stock: 3, views: 1720,
  },
  {
    slug: "wine-wool-coat", sku: "ARN-OT-005", name: "Wine Wool Coat", category: "outer",
    price: 719000, gallery: g("1483985988355-763728e1935b", { fy: 0.4 }),
    colors: [C.wine], sizes: SML,
    description: "Coat warna wine dengan kerah tegak. Memberi kesan mewah tanpa terlihat berlebihan.",
    details: BASE_DETAILS("Wool blend", "Regular, sebatas paha"),
    labels: [], added: 10, stock: 0, views: 930,
  },

  // TAS & SEPATU
  {
    slug: "ruby-top-handle-bag", sku: "ARN-TS-001", name: "Ruby Top Handle Bag", category: "tas-sepatu",
    price: 459000, gallery: g("1584917865442-de89df76afd3", { fy: 0.55 }),
    colors: [C.red, C.black], sizes: [],
    description: "Tas jinjing kulit glossy dengan tali selempang yang bisa dilepas. Muat ponsel, dompet dan pouch kecil.",
    details: ["Bahan: kulit sintetis glossy", "Ukuran: 24 × 18 × 10 cm", "Tali selempang bisa dilepas", "Kompartemen dalam dengan resleting"],
    labels: ["Unggulan"], added: 22, stock: 9, views: 1940,
  },
  {
    slug: "rattan-weekend-bag", sku: "ARN-TS-002", name: "Rattan Weekend Bag", category: "tas-sepatu",
    price: 349000, comparePrice: 399000, gallery: g("1590874103328-eac38a683ce7", { fy: 0.55 }),
    colors: [C.tan], sizes: [],
    description: "Tas anyaman rotan dengan tutup kulit. Dikerjakan pengrajin di Lombok.",
    details: ["Bahan: rotan & kulit sintetis", "Ukuran: 30 × 25 × 14 cm", "Handmade, setiap tas sedikit berbeda", "Furing kain katun"],
    labels: [], added: 17, stock: 7, views: 1060,
  },
  {
    slug: "bloom-stiletto-heels", sku: "ARN-TS-003", name: "Bloom Stiletto Heels", category: "tas-sepatu",
    price: 399000, gallery: g("1543163521-1bf539c55dd2", { fy: 0.5 }, [[0.4, 0.65], [0.55, 0.3]]),
    colors: [{ name: "Floral Biru", hex: "#2E5B9A" }], sizes: ["36", "37", "38", "39", "40"],
    description: "Stiletto 9 cm berbahan satin motif bunga. Bantalan empuk di bagian depan telapak.",
    details: ["Bahan: satin printed", "Tinggi hak: 9 cm", "Insole busa memori", "Ukuran normal, pilih sesuai ukuran biasa"],
    labels: [], added: 4, stock: 6, views: 720,
  },
  {
    slug: "cloud-chunky-sneakers", sku: "ARN-TS-004", name: "Cloud Chunky Sneakers", category: "tas-sepatu",
    price: 449000, gallery: g("1560769629-975ec94e6a86", { fy: 0.5 }, [[0.35, 0.3], [0.6, 0.65]]),
    colors: [{ name: "Multi Pastel", hex: "#E9D8C4" }], sizes: ["36", "37", "38", "39", "40", "41"],
    description: "Sneakers dengan sol tebal yang ringan. Kombinasi warna pastel yang playful.",
    details: ["Bahan: mesh & suede sintetis", "Sol EVA ringan, tinggi 5 cm", "Insole bisa dilepas", "Ukuran pas, naik 1 nomor untuk kaki lebar"],
    labels: ["Baru"], added: 27.5, stock: 14, views: 1380,
  },

  // AKSESORIS
  {
    slug: "aurel-round-sunglasses", sku: "ARN-AK-001", name: "Aurel Round Sunglasses", category: "aksesoris",
    price: 179000, gallery: g("1511499767150-a48a237f0083", { fy: 0.5 }, [[0.3, 0.5], [0.7, 0.45]]),
    colors: [C.gold], sizes: [],
    description: "Kacamata hitam frame bulat logam tipis dengan lensa polarized UV400.",
    details: ["Frame: logam ringan", "Lensa: polarized UV400", "Termasuk pouch & lap", "Garansi frame 3 bulan"],
    labels: [], added: 3, stock: 22, views: 610,
  },
  {
    slug: "twist-gold-ring-set", sku: "ARN-AK-002", name: "Twist Gold Ring Set", category: "aksesoris",
    price: 99000, comparePrice: 129000, gallery: g("1617038260897-41a1f14a8ca0", { fy: 0.5 }, [[0.6, 0.3], [0.45, 0.75]]),
    colors: [C.gold], sizes: ["6", "7", "8"],
    description: "Set dua cincin model pilin berlapis emas 18K. Tidak mudah hitam dan aman untuk kulit sensitif.",
    details: ["Bahan: stainless steel lapis emas 18K", "Isi 2 cincin", "Anti karat & hipoalergenik", "Hindari parfum langsung"],
    labels: [], added: 2, stock: 40, views: 540,
  },
  {
    slug: "lacey-chain-bracelet", sku: "ARN-AK-003", name: "Lacey Chain Bracelet", category: "aksesoris",
    price: 119000, gallery: g("1611591437281-460bfbe1220a", { fy: 0.5 }, [[0.35, 0.5], [0.7, 0.5]]),
    colors: [C.rose, C.gold], sizes: [],
    description: "Gelang rantai motif renda dengan pengait lobster. Panjang bisa diatur.",
    details: ["Bahan: stainless steel lapis rose gold", "Panjang 16 cm + 4 cm extender", "Anti karat & hipoalergenik", "Dikemas dalam kotak hadiah"],
    labels: [], added: 1, stock: 35, views: 480,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function isSoldOut(p: Product) {
  return p.stock <= 0;
}

export function displayLabels(p: Product): Label[] {
  return isSoldOut(p) ? ["Habis"] : p.labels;
}
