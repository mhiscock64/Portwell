import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl leading-none tracking-wide">PORTWELL</p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Printed docks for a cleaner charge. Wall hardware for the plug, the cable, and the
            portable brick — made to order.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-muted uppercase">Shop</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/shop" search={{}} className="hover:text-pine">
                All parts
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ cat: "holders" }} className="hover:text-pine">
                Plug holders
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ cat: "docks" }} className="hover:text-pine">
                Wall docks
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ cat: "cable" }} className="hover:text-pine">
                Cable care
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-muted uppercase">The shop</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-pine">
                About
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-pine">
                Materials & shipping
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-pine">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted sm:px-6">
          Screws are not included. ASA for sun, PETG or ABS for a shaded bay. Checkout on this
          preview does not take payment.
        </p>
      </div>
    </footer>
  );
}
