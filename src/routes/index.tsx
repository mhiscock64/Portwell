import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/product-card";
import { btnGhost, btnPrimary, Shell } from "@/components/shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <main>
      <Shell className="grid items-end gap-10 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-6">
          <p className="text-xs font-medium tracking-widest text-copper uppercase">
            3D-printed EV hardware
          </p>
          <h1 className="mt-3 font-display text-6xl leading-none tracking-wide text-ink sm:text-7xl">
            The plug stays on the wall.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Portwell prints docks, holders, and cable hardware that screw up in minutes and keep
            the lead off the floor. Printed docks for a cleaner charge.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" search={{}} className={btnPrimary}>
              Shop the parts
            </Link>
            <Link to="/shipping" className={btnGhost}>
              Materials & shipping
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <img
            src="/products/hero.jpg"
            alt="A black 3D-printed EV plug holder on a garage wall, cable coiled off the floor"
            className="aspect-video w-full object-cover"
          />
          <p className="mt-2 text-xs text-muted">Holder screwed to the wall. Cable off the slab.</p>
        </div>
      </Shell>

      <section className="border-y border-line">
        <Shell className="grid gap-8 py-10 md:grid-cols-3">
          <Benefit
            index="01"
            title="Off the concrete"
            body="Plugs and leads stay dry, clean, and out of the path of tires."
          />
          <Benefit
            index="02"
            title="Screws on in minutes"
            body="Two or four holes. No adhesive that lets go when the garage heats up."
          />
          <Benefit
            index="03"
            title="Printed for the weather"
            body="ASA when the part faces the sun. PETG or ABS when it lives in the shade."
          />
        </Shell>
      </section>

      <Shell className="py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-5xl leading-none tracking-wide">Start here</h2>
          <Link to="/shop" search={{}} className="text-sm font-medium text-pine hover:text-ink">
            All 11 parts
          </Link>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Shell>

      <section className="border-t border-line bg-surface">
        <Shell className="py-14">
          <h2 className="font-display text-5xl leading-none tracking-wide">The catalog</h2>
          <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to="/shop"
                search={{ cat: cat.id }}
                className="flex min-h-36 flex-col justify-between bg-surface p-5 hover:bg-paper"
              >
                <span className="font-display text-3xl leading-none tracking-wide">{cat.label}</span>
                <span className="mt-4 text-sm text-muted">{cat.line}</span>
              </Link>
            ))}
          </div>
        </Shell>
      </section>

      <Shell className="grid gap-8 py-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium tracking-widest text-muted uppercase">The shop</p>
          <h2 className="mt-2 font-display text-5xl leading-none tracking-wide">
            A garage fix, printed to order.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg text-muted">
            Portwell started with a portable charger that lived on the floor and a cable that kinked
            at the handle. The hardware store did not stock the bracket. A P1S did. Every part here
            is printed when you order it, in the plastic that matches the wall it will live on.
          </p>
          <Link to="/about" className={`${btnGhost} mt-6`}>
            Read the story
          </Link>
        </div>
      </Shell>
    </main>
  );
}

function Benefit({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div>
      <p className="font-display text-xl tracking-widest text-copper">{index}</p>
      <h2 className="mt-2 font-display text-3xl leading-none tracking-wide">{title}</h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}
