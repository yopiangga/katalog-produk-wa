"use client";

import { useState } from "react";
import { ImagePlus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { store } from "@/config/store";
import { useDemoToast } from "../demo-toast";
import { Card, Label, PageHeader, Toggle, inputCls } from "../ui";

const DEFAULT_TEMPLATE = `Halo Kak {admin}, saya mau pesan di {toko}:

{daftar_produk}

*Total: {total}* (belum termasuk ongkir)

*Data Pemesan*
Nama: {nama}
No. HP: {hp}
Alamat: {alamat}
Catatan: {catatan}

Kode pesanan: {kode}`;

const SAMPLE: Record<string, string> = {
  admin: "Sinta",
  toko: store.name,
  daftar_produk: "*1. Liana Floral Wrap Dress*\n   Varian: Ivory / M\n   Jumlah: 1 x Rp379.000",
  total: "Rp379.000",
  nama: "Dewi Lestari",
  hp: "0812 3456 7890",
  alamat: "Jl. Kaliurang Km 5 No. 12, Sleman",
  catatan: "Dibungkus kado ya",
  kode: "ARN-261107-4821",
};

const USERS = [
  { name: "Ayu Nirmala", email: "ayu@arunika.id", role: "Owner" },
  { name: "Sinta Maharani", email: "sinta@arunika.id", role: "Staff" },
  { name: "Rani Puspita", email: "rani@arunika.id", role: "Staff" },
];

export function Settings() {
  const [admins, setAdmins] = useState<{ name: string; phone: string; active: boolean }[]>(store.admins.map((a) => ({ ...a, active: true })));
  const [rotate, setRotate] = useState(true);
  const [tpl, setTpl] = useState(DEFAULT_TEMPLATE);
  const toast = useDemoToast();

  const preview = tpl.replace(/\{(\w+)\}/g, (m, k: string) => SAMPLE[k] ?? m);

  return (
    <>
      <PageHeader
        title="Pengaturan toko"
        desc="Nama toko, nomor WhatsApp admin, format pesan dan akun pengguna"
        action={
          <button type="button" onClick={() => toast.show("Demo: pengaturan tidak disimpan")} className="h-10 rounded-md bg-ink px-5 text-sm text-white hover:bg-ink-soft">
            Simpan perubahan
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          <Card title="Profil toko">
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-lg bg-sand font-display text-2xl font-semibold">a</div>
              <button type="button" onClick={() => toast.show("Demo: unggah logo")} className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-3 text-sm hover:bg-sand">
                <ImagePlus className="size-4" /> Ganti logo
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="sname">Nama toko</Label>
                <input id="sname" defaultValue={store.name} className={inputCls} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <input id="email" defaultValue={store.email} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="addr">Alamat</Label>
                <input id="addr" defaultValue={store.address} className={inputCls} />
              </div>
              <div>
                <Label htmlFor="ig">Instagram</Label>
                <input id="ig" defaultValue="@arunika.id" className={inputCls} />
              </div>
              <div>
                <Label htmlFor="tt">TikTok</Label>
                <input id="tt" defaultValue="@arunika.id" className={inputCls} />
              </div>
            </div>
          </Card>

          <Card title="Jam buka">
            <ul className="space-y-2.5">
              {store.hours.map((h) => (
                <li key={h.day} className="grid grid-cols-[1fr_1.2fr] items-center gap-3 text-sm">
                  <span>{h.day}</span>
                  <input defaultValue={h.time} className={inputCls} aria-label={`Jam buka ${h.day}`} />
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Pengguna admin" desc="Owner bisa mengatur semua menu, Staff hanya produk">
            <ul className="divide-y divide-line">
              {USERS.map((u) => (
                <li key={u.email} className="flex items-center gap-3 py-2.5 first:pt-0">
                  <span className="grid size-9 place-items-center rounded-full bg-sand text-xs font-semibold">
                    {u.name.split(" ").map((x) => x[0]).join("")}
                  </span>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-medium">{u.name}</p>
                    <p className="truncate text-xs text-muted">{u.email}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs ${u.role === "Owner" ? "bg-ink text-white" : "bg-sand"}`}>{u.role}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => toast.show("Demo: undang pengguna baru")} className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-md border border-line px-3 text-sm hover:bg-sand">
              <Plus className="size-4" /> Tambah pengguna
            </button>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted">
              <ShieldCheck className="size-4 text-wa-dark" /> Password terenkripsi · login dibatasi 5× percobaan
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          <Card
            title="Nomor WhatsApp admin"
            desc="Pesanan dari website dikirim ke nomor-nomor ini"
            action={
              <div className="flex items-center gap-2 text-sm">
                <span className="hidden text-muted sm:inline">Bergantian</span>
                <Toggle checked={rotate} onChange={setRotate} label="Bagi chat bergantian" />
              </div>
            }
          >
            <ul className="space-y-2.5">
              {admins.map((a, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wa/15 text-wa-dark">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  <input
                    value={a.name}
                    onChange={(e) => setAdmins((as) => as.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                    className={`${inputCls} w-28! shrink-0`}
                    aria-label="Nama admin"
                  />
                  <input
                    value={`+${a.phone}`}
                    onChange={(e) => setAdmins((as) => as.map((x, j) => (j === i ? { ...x, phone: e.target.value.replace(/[^\d]/g, "") } : x)))}
                    className={`${inputCls} min-w-0 flex-1 tabular-nums`}
                    aria-label="Nomor WhatsApp"
                  />
                  <Toggle checked={a.active} onChange={(v) => setAdmins((as) => as.map((x, j) => (j === i ? { ...x, active: v } : x)))} label={`Aktifkan ${a.name}`} />
                  <button type="button" onClick={() => setAdmins((as) => as.filter((_, j) => j !== i))} className="grid size-9 shrink-0 place-items-center rounded-md text-muted hover:bg-sand hover:text-accent" aria-label="Hapus admin">
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setAdmins((as) => [...as, { name: "", phone: "62", active: true }])}
              className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-md border border-line px-3 text-sm hover:bg-sand"
            >
              <Plus className="size-4" /> Tambah nomor
            </button>
            <p className="mt-4 rounded-md bg-sand px-3 py-2.5 text-xs leading-relaxed text-ink-soft">
              {rotate
                ? `Checkout dibagi bergiliran ke ${admins.filter((a) => a.active).length} admin aktif, jadi tidak ada satu admin yang kewalahan.`
                : "Semua checkout dikirim ke admin pertama yang aktif."}
            </p>
          </Card>

          <Card title="Format pesan WhatsApp" desc="Gunakan kode di dalam kurung kurawal, akan diganti otomatis">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {Object.keys(SAMPLE).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTpl((t) => `${t}{${k}}`)}
                  className="rounded bg-sand px-2 py-1 font-mono text-[11px] text-ink-soft hover:bg-line"
                >
                  {`{${k}}`}
                </button>
              ))}
            </div>
            <textarea value={tpl} onChange={(e) => setTpl(e.target.value)} rows={12} className={`${inputCls} h-auto py-2.5 font-mono text-xs leading-relaxed`} aria-label="Template pesan" />
            <p className="mb-2 mt-4 text-xs font-medium uppercase tracking-wider text-muted">Pratinjau</p>
            <div className="rounded-lg bg-[#e9e2d6] p-3">
              <div className="ml-auto max-w-[92%] whitespace-pre-wrap break-words rounded-lg rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-[12.5px] leading-relaxed text-[#111b21] shadow-sm">
                {preview.split(/(\*[^*\n]+\*)/g).map((part, i) =>
                  part.startsWith("*") && part.endsWith("*") && part.length > 2 ? <strong key={i}>{part.slice(1, -1)}</strong> : <span key={i}>{part}</span>,
                )}
              </div>
            </div>
          </Card>

          <Card title="Halaman info">
            <ul className="divide-y divide-line text-sm">
              {["Tentang Kami", "FAQ", "Kebijakan Retur"].map((p) => (
                <li key={p} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                  {p}
                  <button type="button" onClick={() => toast.show(`Demo: editor halaman ${p}`)} className="text-muted underline underline-offset-4 hover:text-ink">
                    Ubah isi
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
      {toast.node}
    </>
  );
}
