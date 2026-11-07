"use client";

import { useCallback, useEffect, useState } from "react";
import { Info } from "lucide-react";

/** Toast kecil untuk aksi yang di versi demo tidak benar-benar disimpan. */
export function useDemoToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2800);
    return () => clearTimeout(t);
  }, [msg]);
  const show = useCallback((m: string) => setMsg(m), []);
  const node = msg ? (
    <div role="status" className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-white shadow-lg animate-fade-up">
      <Info className="size-4 shrink-0" /> {msg}
    </div>
  ) : null;
  return { show, node };
}
