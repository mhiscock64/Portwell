import { createFileRoute, Link } from "@tanstack/react-router";
import { btnPrimary, Shell } from "@/components/shell";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About · Portwell" },
      {
        name: "description",
        content:
          "Portwell prints EV charger docks and cable hardware to order. The name is the port, kept well.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <main>
      <Shell className="max-w-3xl py-12">
        <p className="text-xs font-medium tracking-widest text-copper uppercase">About</p>
        <h1 className="mt-2 font-display text-6xl leading-none tracking-wide">
          Printed docks for a cleaner charge.
        </h1>
        <div className="mt-8 space-y-5 text-lg text-muted">
          <p>
            The shop is Portwell. The name is plain on purpose: the charge port, kept well. Not a
            gadget brand. A small catalog of parts that screw to a wall and do one job.
          </p>
          <p>
            It started as a garage problem. A portable charger lived on the floor. The cable kinked
            where it left the handle. The inlet wanted a flange the hardware store did not sell. A
            Bambu Lab P1S could print the missing piece the same day, in a plastic that would not
            go soft in July.
          </p>
          <p>
            That is still the whole offer. Holders for Type 1, Type 2, and NACS handles. A dock for
            the portable brick. Clips and a hanger so the lead coils the same way every night. A
            two-piece mounting base when the port itself needs a seat. A small plate if you want
            initials on the holder — your mark, not a car badge.
          </p>
          <p>
            Every order is printed when it is placed. ASA if the wall sees the sun. PETG or ABS if
            it lives in a shaded bay. Screws are yours to match the wall. The fit is friction, not a
            latch, unless a listing says otherwise. If a handle is tight or loose, say so — the
            model scales.
          </p>
        </div>
        <Link to="/shop" search={{}} className={`${btnPrimary} mt-8`}>
          Shop the catalog
        </Link>
      </Shell>
    </main>
  );
}
