import { createFileRoute, Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { CATEGORIES, filterProducts, type CategoryId } from "@/data/catalog";
import { ProductCard } from "@/components/product-card";
import { Shell } from "@/components/shell";

const CATS: CategoryId[] = ["mounts", "holders", "docks", "cable", "custom"];

type ShopSearch = { cat?: CategoryId; q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const cat =
      typeof search.cat === "string" && CATS.includes(search.cat as CategoryId)
        ? (search.cat as CategoryId)
        : undefined;
    const q = typeof search.q === "string" ? search.q : undefined;
    return { cat, q };
  },
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop · Portwell" },
      {
        name: "description",
        content: "EV plug holders, wall docks, cable clips, and mounting bases. Printed to order.",
      },
    ],
  }),
});

function ShopPage() {
  const { cat, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const products = filterProducts(cat, q);
  const active = CATEGORIES.find((c) => c.id === cat);

  return (
    <main>
      <Shell className="py-10">
        <p className="text-xs font-medium tracking-widest text-copper uppercase">Catalog</p>
        <h1 className="mt-2 font-display text-6xl leading-none tracking-wide">
          {active ? active.label : "All parts"}
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          {active
            ? active.line
            : "Eleven parts for the plug, the cable, and the portable brick. Pick a material on the product page."}
        </p>

        <form
          className="mt-6 flex max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const next = String(data.get("q") ?? "");
            void navigate({ search: { cat, q: next || undefined } });
          }}
        >
          <label className="sr-only" htmlFor="shop-q">
            Search parts
          </label>
          <input
            id="shop-q"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search holders, docks, J1772…"
            className="h-12 min-w-0 flex-1 border border-line bg-surface px-3 text-base text-ink"
          />
          <button
            type="submit"
            className="h-12 shrink-0 bg-ink px-4 text-sm font-medium text-paper"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          <FilterChip current={cat} label="All" />
          {CATEGORIES.map((c) => (
            <FilterChip key={c.id} current={cat} id={c.id} label={c.label} />
          ))}
        </div>

        {products.length === 0 ? (
          <p className="mt-12 text-muted">Nothing matches that. Try a plug type, or clear the search.</p>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </Shell>
    </main>
  );
}

function FilterChip({
  current,
  id,
  label,
}: {
  current?: CategoryId;
  id?: CategoryId;
  label: string;
}) {
  const on = current === id || (!current && !id);
  return (
    <Link
      to="/shop"
      search={id ? { cat: id } : {}}
      className={
        on
          ? "inline-flex h-11 shrink-0 items-center bg-ink px-4 text-sm font-medium text-paper"
          : "inline-flex h-11 shrink-0 items-center border border-line bg-surface px-4 text-sm font-medium text-ink"
      }
      aria-current={on ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
