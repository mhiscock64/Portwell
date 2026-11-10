import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/data/catalog";
import { MATERIALS, useCart, type MaterialId } from "@/lib/cart-store";
import { money } from "@/lib/utils";
import { btnGhost, btnPrimary, Shell } from "@/components/shell";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [{ title: "Cart · Portwell" }, { name: "description", content: "Your Portwell cart." }],
  }),
});

function materialOf(id: MaterialId) {
  return MATERIALS.find((m) => m.id === id) ?? MATERIALS[0];
}

function CartPage() {
  const ready = useCart((s) => s.ready);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  const detailed = lines
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null;
      const material = materialOf(line.material);
      const unit = product.price + material.upcharge;
      return { line, product, material, unit, total: unit * line.qty };
    })
    .filter((row) => row !== null);

  const subtotal = detailed.reduce((n, row) => n + row.total, 0);

  return (
    <main>
      <Shell className="py-10">
        <h1 className="font-display text-6xl leading-none tracking-wide">Cart</h1>
        {!ready ? (
          <p className="mt-6 text-muted">Loading your cart…</p>
        ) : detailed.length === 0 ? (
          <div className="mt-8 max-w-md">
            <p className="text-muted">Nothing in the cart yet. The holders are the usual place to start.</p>
            <Link to="/shop" search={{ cat: "holders" }} className={`${btnPrimary} mt-6`}>
              Shop holders
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <ul className="lg:col-span-8">
              {detailed.map(({ line, product, material, unit, total }) => (
                <li key={`${line.slug}-${line.material}`} className="flex gap-4 border-t border-line py-5">
                  <img
                    src={product.image}
                    alt=""
                    className="size-24 shrink-0 bg-surface object-cover sm:size-28"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="font-display text-2xl leading-tight tracking-wide hover:text-pine"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      {material.label} · {money(unit)} / {product.unit}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex h-11 items-center border border-line">
                        <button
                          type="button"
                          className="inline-flex size-11 items-center justify-center"
                          aria-label={`Decrease ${product.name}`}
                          onClick={() => setQty(line.slug, line.material, line.qty - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{line.qty}</span>
                        <button
                          type="button"
                          className="inline-flex size-11 items-center justify-center"
                          aria-label={`Increase ${product.name}`}
                          onClick={() => setQty(line.slug, line.material, line.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="h-11 px-2 text-sm text-muted hover:text-ink"
                        onClick={() => remove(line.slug, line.material)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-medium">{money(total)}</p>
                </li>
              ))}
            </ul>
            <aside className="h-fit border border-line bg-surface p-5 lg:col-span-4">
              <h2 className="font-display text-3xl leading-none tracking-wide">Summary</h2>
              <p className="mt-4 flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span>{money(subtotal)}</span>
              </p>
              <p className="mt-2 text-sm text-muted">
                Shipping is calculated as a flat preview rate at checkout. Nothing is charged.
              </p>
              <Link to="/checkout" className={`${btnPrimary} mt-6 w-full`}>
                Checkout
              </Link>
              <Link to="/shop" search={{}} className={`${btnGhost} mt-3 w-full`}>
                Keep shopping
              </Link>
            </aside>
          </div>
        )}
      </Shell>
    </main>
  );
}
