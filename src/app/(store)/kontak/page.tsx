import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { store } from "@/config/store";
import { ContactAdmins } from "./contact-admins";

export const metadata: Metadata = {
  title: "Kontak",
  description: `Hubungi ${store.name} lewat WhatsApp, email, atau kunjungi studio kami di Yogyakarta.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-16">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Kontak</p>
      <h1 className="mt-3 max-w-2xl font-display text-5xl font-semibold leading-[1.02] md:text-6xl">Ada yang bisa kami bantu?</h1>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        Cara tercepat adalah chat WhatsApp. Pilih salah satu admin di bawah, semuanya bisa membantu soal stok, ukuran dan status pesanan.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <ContactAdmins />

        <div className="space-y-6 rounded-sm border border-line bg-white p-6 md:p-8">
          <div className="flex gap-4">
            <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Studio & showroom</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{store.address}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
            <div className="flex-1">
              <p className="font-medium">Jam operasional</p>
              <ul className="mt-1 space-y-1 text-sm text-muted">
                {store.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="tabular-nums text-ink-soft">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Email</p>
              <a href={`mailto:${store.email}`} className="mt-1 block text-sm text-muted underline underline-offset-4 hover:text-ink">
                {store.email}
              </a>
            </div>
          </div>
          <div className="flex gap-3 border-t border-line pt-6 text-sm">
            <a href={store.socials.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-4 py-2 hover:bg-sand">Instagram</a>
            <a href={store.socials.tiktok} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-4 py-2 hover:bg-sand">TikTok</a>
          </div>
        </div>
      </div>
    </div>
  );
}
