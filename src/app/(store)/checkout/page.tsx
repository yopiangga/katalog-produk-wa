import type { Metadata } from "next";
import { CheckoutView } from "./checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">Checkout</h1>
      <p className="mt-2 text-muted">Isi data singkat di bawah. Pesanan kamu akan dikirim ke WhatsApp admin kami.</p>
      <CheckoutView />
    </div>
  );
}
