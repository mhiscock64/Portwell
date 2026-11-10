import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MaterialId = "petg" | "abs" | "asa";

export const MATERIALS: {
  id: MaterialId;
  label: string;
  note: string;
  upcharge: number;
}[] = [
  { id: "petg", label: "PETG", note: "Shaded garage. Easy, tough, fine indoors.", upcharge: 0 },
  { id: "abs", label: "ABS", note: "Indoors, where the bay runs warmer.", upcharge: 2 },
  { id: "asa", label: "ASA", note: "Outdoors and full sun. Best UV resistance.", upcharge: 3 },
];

export type CartLine = {
  slug: string;
  material: MaterialId;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  ready: boolean;
  add: (slug: string, material: MaterialId, qty?: number) => void;
  setQty: (slug: string, material: MaterialId, qty: number) => void;
  remove: (slug: string, material: MaterialId) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      ready: false,
      add: (slug, material, qty = 1) =>
        set((s) => {
          const index = s.lines.findIndex((l) => l.slug === slug && l.material === material);
          if (index === -1) return { lines: [...s.lines, { slug, material, qty }] };
          const lines = s.lines.slice();
          const current = lines[index];
          if (!current) return { lines };
          lines[index] = { ...current, qty: current.qty + qty };
          return { lines };
        }),
      setQty: (slug, material, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => !(l.slug === slug && l.material === material))
              : s.lines.map((l) =>
                  l.slug === slug && l.material === material ? { ...l, qty } : l,
                ),
        })),
      remove: (slug, material) =>
        set((s) => ({
          lines: s.lines.filter((l) => !(l.slug === slug && l.material === material)),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "portwell-cart",
      skipHydration: true,
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

export function lineKey(line: CartLine) {
  return `${line.slug}:${line.material}`;
}
