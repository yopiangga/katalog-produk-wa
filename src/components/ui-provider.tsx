"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type UI = {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const Ctx = createContext<UI | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const value = useMemo(() => ({ cartOpen, openCart, closeCart }), [cartOpen, openCart, closeCart]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUI must be used inside UIProvider");
  return v;
}
