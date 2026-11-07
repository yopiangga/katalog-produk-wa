import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Eye, MousePointerClick, Package, ShoppingCart } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { store } from "@/config/store";
import { isSoldOut, products } from "@/data/products";
import { photo } from "@/lib/format";
import { Card, PageHeader } from "./ui";
import { VisitsChart, type Day } from "./visits-chart";

export const metadata = { title: "Dashboard" };

const VISITS = [412, 388, 455, 520, 610, 702, 680, 498, 470, 515, 588, 646, 812, 774];
const DAYS: Day[] = VISITS.map((v, i) => {
  const d = new Date(2026, 9, 25 + i);
  return {
    visits: v,
    label: String(d.getDate()),
    date: d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" }),
  };
});

const STATS = [
  { label: "Kunjungan", value: "8.070", delta: 18.4, icon: Eye, note: "14 hari terakhir" },
  { label: "Klik tombol WhatsApp", value: "1.236", delta: 9.1, icon: MousePointerClick, note: "chat & tanya produk" },
  { label: "Checkout ke WhatsApp", value: "214", delta: 12.6, icon: ShoppingCart, note: "pesanan terkirim" },
  { label: "Produk aktif", value: String(products.filter((p) => !isSoldOut(p)).length), delta: 0, icon: Package, note: `${products.filter(isSoldOut).length} produk habis` },
];

const ROTATION = [72, 71, 71];

export default function AdminDashboard() {
  const top = [...products].sort((a, b) => b.views - a.views).slice(0, 6);
  const topMax = top[0].views;
  const lowStock = products.filter((p) => p.stock <= 5).sort((a, b) => a.stock - b.stock);

  return (
    <>
      <PageHeader title="Selamat pagi, Ayu" desc="Ringkasan toko 25 Oktober – 7 November 2026" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-lg border border-line bg-white p-5">
            <div className="flex items-center justify-between text-sm text-muted">
              {s.label}
              <s.icon className="size-4" />
            </div>
            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">{s.value}</p>
            <div className="mt-1 flex items-center gap-2 text-xs">
              {s.delta !== 0 && (
                <span className={`inline-flex items-center gap-0.5 font-medium ${s.delta > 0 ? "text-wa-dark" : "text-accent"}`}>
                  {s.delta > 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                  {Math.abs(s.delta).toLocaleString("id-ID")}%
                </span>
              )}
              <span className="text-muted">{s.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card title="Kunjungan per hari" desc="Arahkan kursor ke batang untuk detail">
          <VisitsChart data={DAYS} />
        </Card>

        <Card title="Pembagian chat admin" desc="Checkout dibagi bergantian ke setiap admin">
          <ul className="space-y-4">
            {store.admins.map((a, i) => (
              <li key={a.phone} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-sm font-semibold">{a.name[0]}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Admin {a.name}</span>
                    <span className="tabular-nums text-muted">{ROTATION[i]} chat · {Math.round((ROTATION[i] / 214) * 100)}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-sand">
                    <div className="h-full rounded-full bg-wa-dark" style={{ width: `${(ROTATION[i] / 214) * 100}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-2 rounded-md bg-wa/10 px-3 py-2.5 text-xs text-wa-dark">
            <WhatsAppIcon className="size-4" /> Rotasi aktif · giliran berikutnya: Admin Sinta
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card title="Produk paling sering dilihat" action={<Link href="/admin/produk" className="text-sm text-muted hover:text-ink">Semua →</Link>}>
          <ol className="space-y-3">
            {top.map((p, i) => (
              <li key={p.slug} className="flex items-center gap-3">
                <span className="w-4 text-sm tabular-nums text-muted">{i + 1}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo(p.gallery[0].id, { w: 80, h: 100, fx: p.gallery[0].fx, fy: p.gallery[0].fy })} alt="" className="h-12 w-10 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2 text-sm">
                    <span className="truncate">{p.name}</span>
                    <span className="shrink-0 tabular-nums text-muted">{p.views.toLocaleString("id-ID")}×</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-sand">
                    <div className="h-full rounded-full bg-ink-soft" style={{ width: `${(p.views / topMax) * 100}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Stok menipis" desc="Stok diatur manual di halaman produk">
          <ul className="divide-y divide-line">
            {lowStock.map((p) => (
              <li key={p.slug} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo(p.gallery[0].id, { w: 80, h: 100, fx: p.gallery[0].fx, fy: p.gallery[0].fy })} alt="" className="h-12 w-10 rounded object-cover" />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate">{p.name}</p>
                  <p className="text-xs text-muted">{p.sku}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.stock === 0 ? "bg-ink text-white" : "bg-accent-soft text-accent"}`}>
                  {p.stock === 0 ? "Habis" : `Sisa ${p.stock}`}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
