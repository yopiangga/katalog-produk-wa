import Link from "next/link";
import { displayLabels, type Product } from "@/data/products";
import { discountPercent, photo } from "@/lib/format";
import { Price } from "./price";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [main, second] = product.gallery;
  const labels = displayLabels(product);
  const off = discountPercent(product.price, product.comparePrice);
  const soldOut = labels.includes("Habis");

  return (
    <Link href={`/produk/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo(main.id, { w: 600, h: 750, fx: main.fx, fy: main.fy })}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition duration-500 group-hover:opacity-0 ${soldOut ? "opacity-60 grayscale-[40%]" : ""}`}
        />
        {second && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo(second.id, { w: 600, h: 750, fx: second.fx, fy: second.fy, z: second.z })}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {labels.map((l) => (
            <span
              key={l}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide ${
                l === "Habis" ? "bg-ink text-white" : l === "Baru" ? "bg-white text-ink" : "bg-accent text-white"
              }`}
            >
              {l}
            </span>
          ))}
        </div>
        {off > 0 && !soldOut && (
          <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-accent">
            -{off}%
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm leading-snug text-ink-soft group-hover:underline group-hover:underline-offset-4">{product.name}</h3>
        <Price price={product.price} compare={product.comparePrice} />
        {product.colors.length > 1 && (
          <div className="flex gap-1 pt-1" aria-label={`${product.colors.length} warna`}>
            {product.colors.map((c) => (
              <span key={c.name} className="size-3 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
