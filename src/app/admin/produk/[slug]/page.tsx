import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { ProductForm } from "./product-form";

export function generateStaticParams() {
  return [{ slug: "baru" }, ...products.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: PageProps<"/admin/produk/[slug]">) {
  const { slug } = await params;
  return { title: slug === "baru" ? "Tambah produk" : `Ubah ${getProduct(slug)?.name ?? "produk"}` };
}

export default async function EditProductPage({ params }: PageProps<"/admin/produk/[slug]">) {
  const { slug } = await params;
  if (slug === "baru") return <ProductForm key="baru" />;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductForm key={slug} product={product} />;
}
