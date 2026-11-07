import { discountPercent, rupiah } from "@/lib/format";

export function Price({ price, compare, size = "sm" }: { price: number; compare?: number; size?: "sm" | "lg" }) {
  const off = discountPercent(price, compare);
  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 ${size === "lg" ? "text-2xl" : "text-sm"}`}>
      <span className={`font-medium tabular-nums ${off ? "text-accent" : "text-ink"}`}>{rupiah(price)}</span>
      {off > 0 && (
        <>
          <s className={`tabular-nums text-muted ${size === "lg" ? "text-base" : "text-xs"}`}>{rupiah(compare!)}</s>
          {size === "lg" && (
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">Hemat {off}%</span>
          )}
        </>
      )}
    </div>
  );
}
