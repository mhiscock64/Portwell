import { Link } from "@tanstack/react-router";
import { categoryLabel, type Product } from "@/data/catalog";
import { money } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col"
    >
      <div className="aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-xs font-medium tracking-widest text-muted uppercase">
        {categoryLabel(product.category)}
      </p>
      <h3 className="font-display text-2xl leading-tight tracking-wide text-ink">{product.name}</h3>
      <p className="mt-1 text-sm text-ink">
        {money(product.price)}
        <span className="text-muted"> / {product.unit}</span>
      </p>
    </Link>
  );
}
