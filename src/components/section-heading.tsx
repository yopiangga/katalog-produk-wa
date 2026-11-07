import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({ kicker, title, href, linkLabel = "Lihat semua" }: { kicker?: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {kicker && <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">{kicker}</p>}
        <h2 className="font-display text-3xl font-semibold leading-tight md:text-[42px]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="group hidden shrink-0 items-center gap-1.5 text-sm text-ink-soft hover:text-ink sm:inline-flex">
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
