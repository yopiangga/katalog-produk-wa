import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCategory, getProduct, isSoldOut, products } from "@/data/products";
import { photo, rupiah } from "@/lib/format";
import { store } from "@/config/store";
import { ProductView } from "./product-view";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produk/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const img = photo(p.gallery[0].id, { w: 1200, h: 630, fx: p.gallery[0].fx, fy: p.gallery[0].fy });
  const title = `${p.name} – ${rupiah(p.price)}`;
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: `/produk/${p.slug}` },
    openGraph: { title, description: p.description, images: [{ url: img, width: 1200, height: 630, alt: p.name }] },
    twitter: { card: "summary_large_image", title, description: p.description, images: [img] },
  };
}

export default async function ProductPage({ params }: PageProps<"/produk/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cat = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug && !isSoldOut(p)).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description,
    image: product.gallery.map((s) => photo(s.id, { w: 1000, h: 1250, fx: s.fx, fy: s.fy, z: s.z })),
    brand: { "@type": "Brand", name: store.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: product.price,
      availability: isSoldOut(product) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: `${store.url}/produk/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 md:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">Beranda</Link>
        <span className="mx-2">/</span>
        <Link href={`/katalog?kategori=${product.category}`} className="hover:text-ink">{cat?.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <ProductView key={product.slug} product={product} />

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-3xl font-semibold md:text-4xl">Kamu mungkin juga suka</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
