export function rupiah(value: number) {
  return "Rp" + value.toLocaleString("id-ID");
}

export function discountPercent(price: number, compare?: number) {
  if (!compare || compare <= price) return 0;
  return Math.round(((compare - price) / compare) * 100);
}

type ImgOpts = {
  w: number;
  h?: number;
  /** focal point 0..1 */
  fx?: number;
  fy?: number;
  /** zoom (1 = none) */
  z?: number;
  q?: number;
};

/** Foto produk dari Unsplash (imgix) dengan crop & kompresi otomatis. */
export function photo(id: string, { w, h, fx = 0.5, fy = 0.5, z = 1, q = 72 }: ImgOpts) {
  const p = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
    crop: "focalpoint",
    "fp-x": String(fx),
    "fp-y": String(fy),
    "fp-z": String(z),
  });
  if (h) p.set("h", String(h));
  return `https://images.unsplash.com/photo-${id}?${p.toString()}`;
}
