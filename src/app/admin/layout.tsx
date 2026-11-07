import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { store } from "@/config/store";
import { AdminNav } from "./admin-nav";

export const metadata: Metadata = {
  title: { default: "Admin", template: `%s · Admin ${store.name}` },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#f4f2ef] text-ink">
      <div className="bg-ink px-4 py-1.5 text-center text-[12px] text-white/80">
        <span className="mr-2 rounded-sm bg-white/15 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider text-white">Demo</span>
        Tampilan halaman admin. Perubahan tidak disimpan.
      </div>
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-white px-4 py-6 lg:flex">
          <Link href="/admin" className="px-3 font-display text-2xl font-semibold">
            {store.name.toLowerCase()} <span className="font-sans text-xs font-normal text-muted">admin</span>
          </Link>
          <AdminNav />
          <div className="mt-auto space-y-3 border-t border-line px-3 pt-4">
            <Link href="/" target="_blank" className="flex items-center gap-2 text-sm text-muted hover:text-ink">
              <ExternalLink className="size-4" /> Lihat website
            </Link>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-sand text-sm font-semibold">AN</span>
              <div className="text-sm leading-tight">
                <p className="font-medium">Ayu Nirmala</p>
                <p className="text-xs text-muted">Owner</p>
              </div>
            </div>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-20 border-b border-line bg-white lg:hidden">
            <div className="flex items-center justify-between px-4 pt-3">
              <Link href="/admin" className="font-display text-xl font-semibold">
                {store.name.toLowerCase()} <span className="font-sans text-xs font-normal text-muted">admin</span>
              </Link>
              <Link href="/" className="text-sm text-muted">Lihat website →</Link>
            </div>
            <AdminNav mobile />
          </div>
          <main className="px-4 py-6 sm:px-8 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
