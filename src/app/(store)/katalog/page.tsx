import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { CatalogView } from "./catalog-view";

export const metadata: Metadata = {
  title: "Katalog",
  description: "Semua koleksi Arunika: atasan, dress, bawahan, outer, tas, sepatu dan aksesoris. Pesan langsung lewat WhatsApp.",
};

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 md:pt-14">
      <Suspense fallback={<CatalogFallback />}>
        <CatalogView />
      </Suspense>
    </div>
  );
}

function CatalogFallback() {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold md:text-5xl">Semua produk</h1>
      <div className="mt-8 h-24 border-y border-line" />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
