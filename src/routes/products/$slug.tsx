import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { categoryLabel, getProduct, relatedProducts } from "@/data/catalog";
import { MATERIALS, useCart, type MaterialId } from "@/lib/cart-store";
import { money } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { btnPrimary, Shell } from "@/components/shell";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
  head: ({ params }) => {
    const product = getProduct(params.slug);
    return {
      meta: [
        { title: product ? `${product.name} · Portwell` : "Part · Portwell" },
        { name: "description", content: product?.blurb ?? "Portwell EV hardware." },
        { name: "keywords", content: product?.keywords.join(", ") ?? "" },
      ],
    };
  },
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const [material, setMaterial] = useState<MaterialId>("petg");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  if (!product) {
    return (
      <main>
        <Shell className="py-20">
          <h1 className="font-display text-5xl leading-none tracking-wide">
            That part is not in the catalog.
          </h1>
          <Link to="/shop" search={{}} className={`${btnPrimary} mt-8`}>
            Back to the shop
          </Link>
        </Shell>
      </main>
    );
  }

  const chosen = MATERIALS.find((m) => m.id === material) ?? MATERIALS[0];
  const unitPrice = product.price + chosen.upcharge;
  const related = relatedProducts(product);

  return (
    <main>
      <Shell className="py-8 lg:py-12">
        <p className="text-sm text-muted">
          <Link to="/shop" search={{}} className="hover:text-ink">
            Shop
          </Link>
          <span aria-hidden="true"> / </span>
          <Link to="/shop" search={{ cat: product.category }} className="hover:text-ink">
            {categoryLabel(product.category)}
          </Link>
        </p>
        <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full bg-surface object-cover"
          />
          <div>
            <p className="text-xs font-medium tracking-widest text-copper uppercase">
              {categoryLabel(product.category)}
            </p>
            <h1 className="mt-2 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-muted">{product.blurb}</p>
            <p className="mt-4 font-display text-4xl leading-none">
              {money(unitPrice)}
              <span className="ml-2 font-sans text-base text-muted">/ {product.unit}</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              Typical shop range {money(product.range[0])}–{money(product.range[1])}. Material adds
              a few dollars when you step up from PETG.
            </p>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium">Material</legend>
              <div className="mt-2 grid gap-2">
                {MATERIALS.map((item) => {
                  const selected = item.id === material;
                  return (
                    <label
                      key={item.id}
                      className={
                        selected
                          ? "flex cursor-pointer items-start gap-3 border border-ink bg-surface p-3"
                          : "flex cursor-pointer items-start gap-3 border border-line p-3"
                      }
                    >
                      <input
                        type="radio"
                        name="material"
                        value={item.id}
                        checked={selected}
                        onChange={() => setMaterial(item.id)}
                        className="mt-1"
                      />
                      <span>
                        <span className="font-medium">
                          {item.label}
                          {item.upcharge > 0 ? ` +${money(item.upcharge)}` : ""}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted">{item.note}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex h-12 items-center border border-line">
                <button
                  type="button"
                  className="inline-flex size-12 items-center justify-center text-lg"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((n) => Math.max(1, n - 1))}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  className="inline-flex size-12 items-center justify-center text-lg"
                  aria-label="Increase quantity"
                  onClick={() => setQty((n) => Math.min(12, n + 1))}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className={btnPrimary}
                onClick={() => {
                  add(product.slug, material, qty);
                  setAdded(true);
                  window.setTimeout(() => setAdded(false), 1600);
                }}
              >
                {added ? "Added to cart" : `Add · ${money(unitPrice * qty)}`}
              </button>
              {added ? (
                <Link to="/cart" className="text-sm font-medium text-pine">
                  View cart
                </Link>
              ) : null}
            </div>

            <p className="mt-6 text-sm">
              <span className="font-medium">Fits. </span>
              <span className="text-muted">{product.fits}</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {product.bullets.map((bullet) => (
                <li key={bullet} className="border-t border-line pt-2">
                  {bullet}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">Search terms: {product.keywords.join(" · ")}</p>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-4xl leading-none tracking-wide">Alongside it</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Shell>
    </main>
  );
}
