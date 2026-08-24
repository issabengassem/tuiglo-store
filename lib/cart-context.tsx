"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { ReactNode } from "react";
import type { CartLine } from "@/data/types";
import { computeCartTotals, type CartTotals } from "./pricing";
import { sanitizeCartLines } from "./cart-sanitize";

const STORAGE_KEY = "tuiglo-cart-v1";

type CartAction =
  | { type: "ADD_LINE"; line: CartLine }
  | { type: "REMOVE_LINE"; productId: string; colorVariantId: string }
  | { type: "SET_QTY"; productId: string; colorVariantId: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; lines: CartLine[] };

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "HYDRATE":
      return action.lines;
    case "ADD_LINE": {
      const existing = state.find(
        (l) => l.productId === action.line.productId && l.colorVariantId === action.line.colorVariantId
      );
      if (existing) {
        return state.map((l) =>
          l === existing ? { ...l, qty: l.qty + action.line.qty } : l
        );
      }
      return [...state, action.line];
    }
    case "REMOVE_LINE":
      return state.filter(
        (l) => !(l.productId === action.productId && l.colorVariantId === action.colorVariantId)
      );
    case "SET_QTY":
      if (action.qty <= 0) {
        return state.filter(
          (l) => !(l.productId === action.productId && l.colorVariantId === action.colorVariantId)
        );
      }
      return state.map((l) =>
        l.productId === action.productId && l.colorVariantId === action.colorVariantId
          ? { ...l, qty: action.qty }
          : l
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  totals: CartTotals;
  itemCount: number;
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, colorVariantId: string) => void;
  setQty: (productId: string, colorVariantId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);

  // Hydrate from localStorage on mount only (client-side). Stored data is
  // untrusted: sanitizeCartLines() validates shape, quantities, and
  // catalog references — malformed storage yields a clean cart (and the
  // persist effect below immediately overwrites the bad entry).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        dispatch({ type: "HYDRATE", lines: sanitizeCartLines(parsed) });
      }
    } catch {
      // Corrupt/unavailable storage — start from an empty cart rather than throw.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage may be unavailable (private browsing, quota) — cart still
      // works for the session, it just won't persist across reloads.
    }
  }, [lines]);

  const addLine = useCallback((line: CartLine) => dispatch({ type: "ADD_LINE", line }), []);
  const removeLine = useCallback(
    (productId: string, colorVariantId: string) =>
      dispatch({ type: "REMOVE_LINE", productId, colorVariantId }),
    []
  );
  const setQty = useCallback(
    (productId: string, colorVariantId: string, qty: number) =>
      dispatch({ type: "SET_QTY", productId, colorVariantId, qty }),
    []
  );
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const totals = useMemo(() => computeCartTotals(lines), [lines]);
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value = useMemo(
    () => ({ lines, totals, itemCount, addLine, removeLine, setQty, clear }),
    [lines, totals, itemCount, addLine, removeLine, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
