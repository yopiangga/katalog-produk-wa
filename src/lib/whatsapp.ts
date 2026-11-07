import { store, type Admin } from "@/config/store";
import { rupiah } from "./format";

export type CartLine = {
  key: string;
  slug: string;
  name: string;
  price: number;
  color?: string;
  size?: string;
  qty: number;
  image: string;
};

export type Buyer = {
  name: string;
  phone: string;
  address: string;
  note: string;
};

const ROTATION_KEY = "arunika:admin-turn";

/**
 * Pembagian chat ke beberapa admin secara bergantian (round-robin).
 * Di versi produksi giliran disimpan di server agar merata untuk semua pembeli.
 */
export function nextAdmin(): Admin {
  let turn = 0;
  try {
    turn = Number(localStorage.getItem(ROTATION_KEY) ?? 0) || 0;
    localStorage.setItem(ROTATION_KEY, String(turn + 1));
  } catch {}
  return store.admins[turn % store.admins.length];
}

export function peekAdmin(): Admin {
  let turn = 0;
  try {
    turn = Number(localStorage.getItem(ROTATION_KEY) ?? 0) || 0;
  } catch {}
  return store.admins[turn % store.admins.length];
}

export function waLink(phone: string | null, text: string) {
  const t = encodeURIComponent(text);
  if (store.demoMode || !phone) return `https://wa.me/?text=${t}`;
  return `https://wa.me/${phone}?text=${t}`;
}

export function orderCode() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `ARN-${ymd}-${rnd}`;
}

export function variantText(l: Pick<CartLine, "color" | "size">) {
  return [l.color, l.size].filter(Boolean).join(" / ");
}

export function buildOrderMessage(lines: CartLine[], buyer: Buyer, code: string, admin: Admin) {
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const items = lines
    .map((l, i) => {
      const v = variantText(l);
      return [
        `*${i + 1}. ${l.name}*`,
        v ? `   Varian: ${v}` : null,
        `   Jumlah: ${l.qty} x ${rupiah(l.price)}`,
        `   Subtotal: ${rupiah(l.price * l.qty)}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return [
    `Halo Kak ${admin.name}, saya mau pesan di ${store.name}:`,
    "",
    items,
    "",
    `*Total: ${rupiah(total)}* (${count} barang, belum termasuk ongkir)`,
    "",
    "*Data Pemesan*",
    `Nama: ${buyer.name}`,
    `No. HP: ${buyer.phone}`,
    `Alamat: ${buyer.address}`,
    buyer.note ? `Catatan: ${buyer.note}` : null,
    "",
    `Kode pesanan: ${code}`,
    "Mohon info ongkir dan nomor rekeningnya ya. Terima kasih!",
  ]
    .filter((x) => x !== null)
    .join("\n");
}

export function productQuestion(name: string, url: string) {
  return `Halo ${store.name}, saya mau tanya produk ini:\n*${name}*\n${url}\n\nApakah masih tersedia?`;
}
