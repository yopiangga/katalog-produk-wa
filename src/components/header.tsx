"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { store } from "@/config/store";
import { categories } from "@/data/products";
import { useCart } from "@/lib/cart-store";
import { useUI } from "./ui-provider";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const { openCart } = useUI();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    setSearchOpen(false);
    router.push(q ? `/katalog?q=${encodeURIComponent(q)}` : "/katalog");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="-ml-2 grid size-10 place-items-center rounded-full hover:bg-sand md:hidden"
          aria-label="Buka menu"
        >
          <Menu className="size-5" />
        </button>

        <Link href="/" className="font-display text-[28px] font-semibold leading-none tracking-wide max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2">
          {store.name.toLowerCase()}
        </Link>

        <nav className="ml-8 hidden items-center gap-7 md:flex" aria-label="Menu utama">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm transition-colors hover:text-ink ${isActive(n.href) ? "text-ink underline decoration-accent decoration-2 underline-offset-[10px]" : "text-muted"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full hover:bg-sand"
            aria-label="Cari produk"
            aria-expanded={searchOpen}
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            onClick={openCart}
            className="relative grid size-10 place-items-center rounded-full hover:bg-sand"
            aria-label={`Keranjang, ${count} barang`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-[18px] text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line bg-paper animate-fade-up">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
            <Search className="size-5 shrink-0 text-muted" />
            <input
              ref={inputRef}
              name="q"
              type="search"
              placeholder="Cari dress, jeans, tas…"
              className="h-11 w-full bg-transparent text-base outline-none placeholder:text-muted"
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
            />
            <button type="submit" className="h-10 shrink-0 rounded-full bg-ink px-5 text-sm text-white hover:bg-ink-soft">
              Cari
            </button>
          </form>
        </div>
      )}

      {menuOpen &&
        createPortal(
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="absolute inset-0 bg-ink/40" onClick={() => setMenuOpen(false)} aria-label="Tutup menu" />
          <div className="absolute inset-y-0 left-0 flex w-[84%] max-w-sm flex-col bg-paper animate-fade-up">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <span className="font-display text-2xl font-semibold">{store.name.toLowerCase()}</span>
              <button type="button" onClick={() => setMenuOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-sand" aria-label="Tutup menu">
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block border-b border-line py-3.5 text-lg ${isActive(n.href) ? "text-accent" : ""}`}
                >
                  {n.label}
                </Link>
              ))}
              <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted">Kategori</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/katalog?kategori=${c.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-sm bg-sand px-3 py-2.5 text-sm"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>,
          document.body,
        )}
    </header>
  );
}
