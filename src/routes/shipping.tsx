import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/shipping")({
  component: ShippingPage,
  head: () => ({
    meta: [
      { title: "Materials & shipping · Portwell" },
      {
        name: "description",
        content:
          "ASA for outdoor EV mounts. PETG or ABS for a shaded garage. Printed to order, ships in 3–5 days.",
      },
    ],
  }),
});

const ROWS = [
  {
    name: "PETG",
    where: "Indoor, shaded garage",
    why: "The default. Tough, easy, and fine where the sun does not sit on the part. No upcharge.",
  },
  {
    name: "ABS",
    where: "Indoor, warmer bays",
    why: "A step up in heat resistance for a closed garage that bakes in the afternoon. +$2.",
  },
  {
    name: "ASA",
    where: "Outdoor and full sun",
    why: "The one to pick for a wall that weathers. UV-stable, same heat class as ABS. +$3.",
  },
];

function ShippingPage() {
  return (
    <main>
      <Shell className="py-12">
        <p className="text-xs font-medium tracking-widest text-copper uppercase">Materials & shipping</p>
        <h1 className="mt-2 max-w-3xl font-display text-6xl leading-none tracking-wide">
          Match the plastic to the wall.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          PLA is not used for these parts. It softens in a hot car bay and chalks in the sun. You
          choose the material on each product. The price on the button updates before you add it.
        </p>

        <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {ROWS.map((row) => (
            <article key={row.name} className="bg-paper p-5">
              <h2 className="font-display text-4xl leading-none tracking-wide">{row.name}</h2>
              <p className="mt-2 text-sm font-medium text-copper">{row.where}</p>
              <p className="mt-3 text-sm text-muted">{row.why}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="font-display text-4xl leading-none tracking-wide">Shipping</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="border-t border-line pt-3">Printed to order. Not a bin of finished stock.</li>
              <li className="border-t border-line pt-3">Ships in 3–5 business days after the print finishes.</li>
              <li className="border-t border-line pt-3">Preview checkout uses a flat $8 shipping line. A live shop would quote the real parcel.</li>
              <li className="border-t border-line pt-3">Parts are packed so a flange does not take the hit in transit.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-4xl leading-none tracking-wide">Install</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="border-t border-line pt-3">Screws and anchors are not included. Match them to drywall, stud, or masonry.</li>
              <li className="border-t border-line pt-3">Most holders take two screws. The port base and the cable hanger take more.</li>
              <li className="border-t border-line pt-3">Plugs are held by friction. They are meant to lift out with one hand.</li>
              <li className="border-t border-line pt-3">
                These are organizers, not electrical devices. They do not carry current.
              </li>
            </ul>
          </section>
        </div>

        <p className="mt-10 text-sm">
          <Link to="/shop" search={{}} className="font-medium text-pine hover:text-ink">
            Choose a part
          </Link>
        </p>
      </Shell>
    </main>
  );
}
