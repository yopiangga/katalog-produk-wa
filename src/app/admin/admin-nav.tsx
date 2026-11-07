"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings, Tags } from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produk", label: "Produk", icon: Package },
  { href: "/admin/kategori", label: "Kategori & Banner", icon: Tags },
  { href: "/admin/pengaturan", label: "Pengaturan Toko", icon: Settings },
];

export function AdminNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  if (mobile) {
    return (
      <nav className="no-scrollbar flex gap-1 overflow-x-auto px-2 pt-2">
        {ITEMS.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`shrink-0 whitespace-nowrap border-b-2 px-3 pb-2.5 pt-1 text-sm ${active(it.href) ? "border-ink font-medium" : "border-transparent text-muted"}`}
          >
            {it.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="mt-8 space-y-1">
      {ITEMS.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${active(it.href) ? "bg-ink text-white" : "text-ink-soft hover:bg-sand"}`}
        >
          <it.icon className="size-4" />
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
