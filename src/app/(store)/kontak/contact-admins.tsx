"use client";

import { WhatsAppIcon } from "@/components/icons";
import { store } from "@/config/store";
import { waLink } from "@/lib/whatsapp";

export function ContactAdmins() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {store.admins.map((a, i) => (
        <li key={a.phone} className="flex items-center gap-4 rounded-sm border border-line bg-white p-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand font-display text-xl font-semibold">{a.name[0]}</span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Admin {a.name}</p>
            <p className="text-sm text-muted">{["Pesanan & pembayaran", "Stok & ukuran", "Retur & penukaran"][i] ?? "Customer service"}</p>
          </div>
          <a
            href={waLink(a.phone, `Halo Kak ${a.name}, saya mau tanya.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-wa text-white hover:bg-wa-dark"
            aria-label={`Chat Admin ${a.name} di WhatsApp`}
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
