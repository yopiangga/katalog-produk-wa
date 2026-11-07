"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { store, type Admin } from "@/config/store";
import { cart, useCart } from "@/lib/cart-store";
import { rupiah } from "@/lib/format";
import { buildOrderMessage, nextAdmin, orderCode, peekAdmin, variantText, waLink, type Buyer } from "@/lib/whatsapp";

const BUYER_KEY = "arunika:buyer";
const EMPTY_BUYER: Buyer = { name: "", phone: "", address: "", note: "" };

type Errors = Partial<Record<keyof Buyer, string>>;

function validate(b: Buyer): Errors {
  const e: Errors = {};
  if (b.name.trim().length < 2) e.name = "Nama wajib diisi.";
  const digits = b.phone.replace(/[^\d]/g, "");
  if (!/^(0|62)8\d{7,12}$/.test(digits)) e.phone = "Masukkan nomor HP yang valid, contoh 0812xxxxxxx.";
  if (b.address.trim().length < 15) e.address = "Tulis alamat lengkap: jalan, kecamatan, kota dan kode pos.";
  return e;
}

export function CheckoutView() {
  const { items, count, total } = useCart();
  const [buyer, setBuyer] = useState<Buyer>(EMPTY_BUYER);
  const [errors, setErrors] = useState<Errors>({});
  const [order, setOrder] = useState<{ code: string; admin: Admin; message: string; total: number } | null>(null);
  const [sent, setSent] = useState(false);
  const [nextAdminName, setNextAdminName] = useState<string>(store.admins[0].name);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(BUYER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- membaca data tersimpan di browser setelah mount
      if (saved) setBuyer({ ...EMPTY_BUYER, ...JSON.parse(saved), note: "" });
    } catch {}
    setNextAdminName(peekAdmin().name);
  }, []);

  function field<K extends keyof Buyer>(k: K) {
    return {
      value: buyer[k],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBuyer((b) => ({ ...b, [k]: e.target.value }));
        if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
      },
      "aria-invalid": Boolean(errors[k]),
      "aria-describedby": errors[k] ? `${k}-error` : undefined,
    };
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er = validate(buyer);
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(Object.keys(er)[0])?.focus();
      return;
    }
    try {
      localStorage.setItem(BUYER_KEY, JSON.stringify({ name: buyer.name, phone: buyer.phone, address: buyer.address }));
    } catch {}
    const admin = nextAdmin();
    const code = orderCode();
    setOrder({ code, admin, total, message: buildOrderMessage(items, buyer, code, admin) });
  }

  function send() {
    if (!order) return;
    window.open(waLink(order.admin.phone, order.message), "_blank", "noopener");
    setSent(true);
    cart.clear();
  }

  if (sent && order) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-sm border border-line bg-white px-6 py-14 text-center">
        <CheckCircle2 className="mx-auto size-14 text-wa-dark" strokeWidth={1.5} />
        <h2 className="mt-5 font-display text-3xl font-semibold">Terima kasih, {buyer.name.split(" ")[0]}!</h2>
        <p className="mt-3 text-muted">
          Pesanan <strong className="font-medium text-ink">{order.code}</strong> sudah diteruskan ke WhatsApp Admin {order.admin.name}. Admin akan membalas dengan total ongkir dan info pembayaran.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={send} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm hover:bg-sand">
            <WhatsAppIcon className="size-4" /> Buka WhatsApp lagi
          </button>
          <Link href="/katalog" className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm text-white hover:bg-ink-soft">
            Lanjut belanja
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-sm border border-line bg-white px-6 py-16 text-center">
        <p className="font-display text-2xl font-semibold">Keranjang kamu kosong</p>
        <Link href="/katalog" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm text-white hover:bg-ink-soft">
          Lihat katalog
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px]">
        <form onSubmit={submit} noValidate className="space-y-5">
          <Field id="name" label="Nama lengkap" error={errors.name}>
            <input id="name" autoComplete="name" placeholder="Nama penerima" className={inputCls(errors.name)} {...field("name")} />
          </Field>
          <Field id="phone" label="Nomor HP / WhatsApp" error={errors.phone}>
            <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0812 3456 7890" className={inputCls(errors.phone)} {...field("phone")} />
          </Field>
          <Field id="address" label="Alamat pengiriman" error={errors.address}>
            <textarea id="address" rows={3} autoComplete="street-address" placeholder="Nama jalan, nomor rumah, kelurahan, kecamatan, kota, kode pos" className={`${inputCls(errors.address)} h-auto py-3`} {...field("address")} />
          </Field>
          <Field id="note" label="Catatan" hint="Opsional">
            <textarea id="note" rows={2} placeholder="Contoh: tolong dibungkus kado" className={`${inputCls()} h-auto py-3`} {...field("note")} />
          </Field>

          <div className="flex items-start gap-3 rounded-sm bg-sand px-4 py-3 text-sm text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>
              Chat pesanan dibagi bergantian ke beberapa admin supaya cepat dibalas. Pesanan ini akan dilayani oleh <strong className="font-medium">Admin {nextAdminName}</strong>.
            </p>
          </div>

          <button type="submit" className="flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-wa-dark py-3.5 text-[15px] font-medium text-white transition hover:bg-[#0f7a40]">
            <WhatsAppIcon className="size-5" />
            Kirim pesanan via WhatsApp
          </button>
        </form>

        <aside className="h-fit rounded-sm border border-line bg-white p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-semibold">Pesanan kamu</h2>
          <ul className="mt-4 divide-y divide-line">
            {items.map((l) => (
              <li key={l.key} className="flex gap-3 py-3">
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image} alt="" className="h-[70px] w-14 rounded-sm bg-sand object-cover" />
                  <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-ink text-[10px] text-white">{l.qty}</span>
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate">{l.name}</p>
                  {variantText(l) && <p className="text-xs text-muted">{variantText(l)}</p>}
                </div>
                <span className="text-sm tabular-nums">{rupiah(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal ({count} barang)</dt>
              <dd className="tabular-nums">{rupiah(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Ongkos kirim</dt>
              <dd className="text-muted">Dikonfirmasi admin</dd>
            </div>
            <div className="flex justify-between pt-2 text-base">
              <dt className="font-medium">Total</dt>
              <dd className="font-semibold tabular-nums">{rupiah(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>

      {order && <PreviewModal order={order} onClose={() => setOrder(null)} onSend={send} />}
    </>
  );
}

function PreviewModal({ order, onClose, onSend }: { order: { code: string; admin: Admin; message: string }; onClose: () => void; onSend: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="preview-title">
      <button type="button" className="absolute inset-0 bg-ink/50" onClick={onClose} aria-label="Tutup" />
      <div className="relative flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-paper shadow-2xl animate-fade-up sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 id="preview-title" className="font-medium">Pesan siap dikirim</h2>
            <p className="text-xs text-muted">Ke Admin {order.admin.name} · {order.code}</p>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full hover:bg-sand" aria-label="Tutup">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#e9e2d6] px-4 py-5" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
          <div className="ml-auto max-w-[92%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#111b21] shadow-sm">
            <WaText text={order.message} />
            <p className="mt-1 text-right text-[10px] text-[#667781]">baru saja ✓✓</p>
          </div>
        </div>

        <div className="space-y-3 border-t border-line px-5 py-4">
          {store.demoMode && (
            <p className="rounded-sm bg-sand px-3 py-2 text-xs leading-relaxed text-ink-soft">
              <strong className="font-medium">Mode demo:</strong> WhatsApp akan meminta kamu memilih kontak tujuan. Di website asli, pesan ini langsung masuk ke nomor Admin {order.admin.name}.
            </p>
          )}
          <button type="button" onClick={onSend} className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-wa-dark text-[15px] font-medium text-white hover:bg-[#0f7a40]">
            <WhatsAppIcon className="size-5" />
            Buka WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

/** Render format tebal WhatsApp (*teks*) di pratinjau. */
function WaText({ text }: { text: string }) {
  return (
    <div className="whitespace-pre-wrap break-words">
      {text.split(/(\*[^*\n]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? <strong key={i}>{part.slice(1, -1)}</strong> : <span key={i}>{part}</span>,
      )}
    </div>
  );
}

function inputCls(error?: string) {
  return `h-12 w-full rounded-sm border bg-white px-4 text-[15px] outline-none transition placeholder:text-muted/70 focus:border-ink ${error ? "border-accent" : "border-line"}`;
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium">
        {label}
        {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
