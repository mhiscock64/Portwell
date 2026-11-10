import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/data/catalog";
import { MATERIALS, useCart, type CartLine, type MaterialId } from "@/lib/cart-store";
import { money } from "@/lib/utils";
import { btnPrimary, Shell } from "@/components/shell";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout · Portwell" },
      { name: "description", content: "Preview checkout for a Portwell order. No payment is taken." },
    ],
  }),
});

type Placed = {
  id: string;
  name: string;
  email: string;
  city: string;
  lines: { title: string; detail: string; total: number }[];
  subtotal: number;
  shipping: number;
};

const SHIPPING = 8;

function CheckoutPage() {
  const ready = useCart((s) => s.ready);
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [placed, setPlaced] = useState<Placed | null>(null);

  const rows = lines
    .map((line) => priceLine(line))
    .filter((row) => row !== null);
  const subtotal = rows.reduce((n, row) => n + row.total, 0);

  if (!ready) {
    return (
      <main>
        <Shell className="py-12">
          <p className="text-muted">Loading checkout…</p>
        </Shell>
      </main>
    );
  }

  if (placed) {
    return (
      <main>
        <Shell className="max-w-2xl py-12">
          <p className="text-xs font-medium tracking-widest text-copper uppercase">Preview order</p>
          <h1 className="mt-2 font-display text-6xl leading-none tracking-wide">Order {placed.id}</h1>
          <p className="mt-4 text-muted">
            Saved on this device for {placed.name}. No card was charged and nothing was sent. A real
            shop would take payment here and email {placed.email}.
          </p>
          <ul className="mt-8 border-t border-line">
            {placed.lines.map((line) => (
              <li key={line.title + line.detail} className="flex justify-between gap-4 border-b border-line py-3 text-sm">
                <span>
                  {line.title}
                  <span className="block text-muted">{line.detail}</span>
                </span>
                <span>{money(line.total)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between text-sm">
            <span>Ship to {placed.city}</span>
            <span>{money(placed.subtotal + placed.shipping)}</span>
          </p>
          <Link to="/shop" search={{}} className={`${btnPrimary} mt-8`}>
            Back to the shop
          </Link>
        </Shell>
      </main>
    );
  }

  if (rows.length === 0) {
    return (
      <main>
        <Shell className="py-12">
          <h1 className="font-display text-5xl leading-none tracking-wide">The cart is empty.</h1>
          <Link to="/shop" search={{}} className={`${btnPrimary} mt-8`}>
            Shop parts
          </Link>
        </Shell>
      </main>
    );
  }

  return (
    <main>
      <Shell className="grid gap-10 py-10 lg:grid-cols-12">
        <form
          className="lg:col-span-7"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const snapshot: Placed = {
              id: `PW-${Math.floor(1000 + Math.random() * 9000)}`,
              name: String(data.get("name") ?? ""),
              email: String(data.get("email") ?? ""),
              city: String(data.get("city") ?? ""),
              shipping: SHIPPING,
              subtotal,
              lines: rows.map((row) => ({
                title: `${row.product.name} × ${row.line.qty}`,
                detail: row.material.label,
                total: row.total,
              })),
            };
            clear();
            setPlaced(snapshot);
          }}
        >
          <h1 className="font-display text-6xl leading-none tracking-wide">Checkout</h1>
          <p className="mt-3 text-sm text-muted">
            This is a preview. Place the order to see a confirmation. No payment is taken.
          </p>
          <div className="mt-6 grid gap-4">
            <Field label="Name" name="name" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" />
            <Field label="City" name="city" autoComplete="address-level2" />
            <label className="block text-sm font-medium">
              Note for the print
              <textarea
                name="note"
                rows={3}
                className="mt-1 w-full border border-line bg-surface px-3 py-2 font-normal"
                placeholder="Plug type, logo text, or where it will be mounted"
              />
            </label>
          </div>
          <button type="submit" className={`${btnPrimary} mt-6`}>
            Place preview order · {money(subtotal + SHIPPING)}
          </button>
        </form>
        <aside className="h-fit border border-line bg-surface p-5 lg:col-span-5">
          <h2 className="font-display text-3xl leading-none tracking-wide">Your print</h2>
          <ul className="mt-4">
            {rows.map((row) => (
              <li key={`${row.line.slug}-${row.line.material}`} className="flex justify-between gap-3 border-t border-line py-3 text-sm">
                <span>
                  {row.product.name}
                  <span className="block text-muted">
                    {row.material.label} × {row.line.qty}
                  </span>
                </span>
                <span>{money(row.total)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 flex justify-between text-sm">
            <span className="text-muted">Shipping preview</span>
            <span>{money(SHIPPING)}</span>
          </p>
          <p className="mt-2 flex justify-between text-sm font-medium">
            <span>Total</span>
            <span>{money(subtotal + SHIPPING)}</span>
          </p>
        </aside>
      </Shell>
    </main>
  );
}

function priceLine(line: CartLine) {
  const product = getProduct(line.slug);
  if (!product) return null;
  const material = MATERIALS.find((m) => m.id === line.material) ?? MATERIALS[0];
  const unit = product.price + material.upcharge;
  return { line, product, material, total: unit * line.qty };
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        required
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-1 h-12 w-full border border-line bg-surface px-3 font-normal"
      />
    </label>
  );
}
