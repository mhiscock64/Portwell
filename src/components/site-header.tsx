import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const LINKS = [
  { label: "Shop", to: "/shop" as const, search: {} },
  { label: "Holders", to: "/shop" as const, search: { cat: "holders" } },
  { label: "Docks", to: "/shop" as const, search: { cat: "docks" } },
  { label: "Cable care", to: "/shop" as const, search: { cat: "cable" } },
  { label: "Materials", to: "/shipping" as const, search: {} },
  { label: "About", to: "/about" as const, search: {} },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ready = useCart((s) => s.ready);
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="border-b border-line">
        <p className="px-4 py-2 text-center text-xs tracking-wide text-muted sm:text-sm">
          Printed to order on a P1S · ASA outdoors · PETG or ABS in the garage · Ships in 3–5 days
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-4xl leading-none tracking-wide text-ink">
          PORTWELL
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              search={link.search}
              className="text-sm font-medium text-ink hover:text-pine"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="inline-flex h-11 items-center gap-2 px-2 text-sm font-medium"
            aria-label={ready ? `Cart, ${count} items` : "Cart"}
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            {ready && count > 0 ? (
              <span className="inline-flex h-6 min-w-6 items-center justify-center bg-pine px-1.5 text-xs text-pine-ink">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line lg:hidden" aria-label="Mobile">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              search={link.search}
              className="flex h-12 items-center border-b border-line px-4 text-base font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
