import type { MetadataRoute } from "next";
import { store } from "@/config/store";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/katalog", "/tentang", "/kontak"].map((p) => ({
    url: `${store.url}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const items = products.map((p) => ({
    url: `${store.url}/produk/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...pages, ...items];
}
