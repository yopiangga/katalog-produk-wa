"use client";

import { useSyncExternalStore } from "react";
import type { CartLine } from "./whatsapp";

/**
 * Keranjang disimpan di browser pembeli (localStorage), jadi pembeli
 * tidak perlu daftar akun untuk berbelanja.
 */
const KEY = "arunika:cart";
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) lines = JSON.parse(raw);
  } catch {}
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

export const cart = {
  add(line: Omit<CartLine, "key">) {
    load();
    const key = [line.slug, line.color ?? "", line.size ?? ""].join("|");
    const existing = lines.find((l) => l.key === key);
    commit(
      existing
        ? lines.map((l) => (l.key === key ? { ...l, qty: l.qty + line.qty } : l))
        : [...lines, { ...line, key }],
    );
  },
  setQty(key: string, qty: number) {
    load();
    commit(qty <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, qty } : l)));
  },
  remove(key: string) {
    load();
    commit(lines.filter((l) => l.key !== key));
  },
  clear() {
    commit(EMPTY);
  },
};

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      try {
        lines = e.newValue ? JSON.parse(e.newValue) : EMPTY;
      } catch {
        lines = EMPTY;
      }
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return lines;
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const count = items.reduce((s, l) => s + l.qty, 0);
  const total = items.reduce((s, l) => s + l.qty * l.price, 0);
  return { items, count, total };
}
