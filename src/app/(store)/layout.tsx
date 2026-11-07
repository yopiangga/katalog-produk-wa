import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TopBars } from "@/components/top-bars";
import { UIProvider } from "@/components/ui-provider";
import { WhatsAppFloat } from "@/components/wa-float";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <TopBars />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </UIProvider>
  );
}
