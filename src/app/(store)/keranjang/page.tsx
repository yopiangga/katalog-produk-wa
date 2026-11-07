import type { Metadata } from "next";
import { CartView } from "./cart-view";

export const metadata: Metadata = {
  title: "Keranjang",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">Keranjang belanja</h1>
      <CartView />
    </div>
  );
}
