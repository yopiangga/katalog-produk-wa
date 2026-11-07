"use client";

import { usePathname } from "next/navigation";
import { store } from "@/config/store";
import { peekAdmin, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const lifted = pathname.startsWith("/produk/");
  function open() {
    const admin = peekAdmin();
    const url = waLink(admin.phone, `Halo ${store.name}, saya mau tanya-tanya dulu.`);
    window.open(url, "_blank", "noopener");
  }

  return (
    <button
      type="button"
      onClick={open}
      className={`group fixed right-5 ${lifted ? "bottom-24 md:bottom-5" : "bottom-5"} z-30 flex items-center gap-2 rounded-full bg-wa p-3.5 text-white shadow-lg shadow-black/15 transition hover:bg-wa-dark sm:px-5`}
      aria-label="Chat WhatsApp"
    >
      <WhatsAppIcon className="size-6" />
      <span className="hidden text-sm font-medium sm:inline">Chat Admin</span>
    </button>
  );
}
