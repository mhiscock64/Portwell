export type CategoryId = "mounts" | "holders" | "docks" | "cable" | "custom";

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  range: [number, number];
  unit: string;
  blurb: string;
  bullets: string[];
  keywords: string[];
  image: string;
  fits: string;
  featured?: boolean;
};

export const CATEGORIES: { id: CategoryId; label: string; line: string }[] = [
  {
    id: "mounts",
    label: "Mounts",
    line: "Square bases that screw to the wall and locate a port or cable entry.",
  },
  {
    id: "holders",
    label: "Plug holders",
    line: "Holsters for Type 1, Type 2, NACS, and mixed plugs.",
  },
  {
    id: "docks",
    label: "Wall docks",
    line: "A home for the whole portable charger, not just the handle.",
  },
  {
    id: "cable",
    label: "Cable care",
    line: "Clips, hangers, and caps so the lead stays coiled and covered.",
  },
  {
    id: "custom",
    label: "Custom",
    line: "A small plate if you want the holder to look like it belongs to the car.",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "port-adapter-base",
    name: "Port Adapter Mounting Base",
    category: "mounts",
    price: 32,
    range: [28, 36],
    unit: "pair",
    blurb:
      "A two-piece square base for an EV charger port or cable entry. One half carries a notched collar. The other is a low plate with a round opening. Both take four screws.",
    bullets: [
      "Two-piece set: tall collar and low opening plate",
      "Four countersunk screw holes on each square flange",
      "Notch in the collar and plate for the cable path",
      "Prints flat, so the flange stays stiff under the screws",
      "Use it where a charger body or inlet needs a printed seat",
      "Screws not included — #8 or M4 pan heads fit the holes",
    ],
    keywords: [
      "EV charger adapter",
      "charger port mount",
      "3D printed EV base",
      "cable entry flange",
      "wall mount charger bracket",
    ],
    image: "/products/port-adapter.jpg",
    fits: "A square wall seat for a charger port, inlet, or cable gland.",
    featured: true,
  },
  {
    slug: "type-1-holder",
    name: "Type 1 J1772 Plug & Cable Holder",
    category: "holders",
    price: 22,
    range: [18, 24],
    unit: "each",
    blurb:
      "A wall holster for a SAE J1772 handle, with room under it to hang the cable so it never sits on the garage floor.",
    bullets: [
      "Friction cradle sized for a standard J1772 handle",
      "Lower hook keeps the cable in one loop",
      "Two-screw wall mount, no supports in the print",
      "Keeps the plug face off concrete and out of tire paths",
      "Scale note: if your handle is a tight fit, say so and we loosen it",
      "Best in ASA on an exterior wall, PETG inside the garage",
    ],
    keywords: [
      "J1772 holder",
      "Type 1 EV holster",
      "EV plug wall mount",
      "Level 2 cable holder",
      "J1772 dock",
    ],
    image: "/products/type1.jpg",
    fits: "SAE J1772 (Type 1) charging handles.",
    featured: true,
  },
  {
    slug: "type-2-holder",
    name: "Type 2 Plug & Cable Holder",
    category: "holders",
    price: 22,
    range: [18, 24],
    unit: "each",
    blurb:
      "A wall holder for an IEC Type 2 plug. The handle sits in a round cradle and the cable wraps beneath it.",
    bullets: [
      "Cradle shaped for a Type 2 / Mennekes-style handle",
      "Cable stays looped on the holder instead of the ground",
      "Two mounting holes, hidden enough to look finished",
      "Drain path so rain does not pool in the socket",
      "Single-piece print you can screw up in a few minutes",
      "Pick ASA if the wall gets direct sun",
    ],
    keywords: [
      "Type 2 EV holder",
      "Mennekes plug dock",
      "IEC 62196 wall mount",
      "EV cable organizer",
      "Type 2 holster",
    ],
    image: "/products/type2.jpg",
    fits: "IEC 62196 Type 2 charging handles.",
  },
  {
    slug: "nacs-holder",
    name: "NACS Plug & Cable Holder",
    category: "holders",
    price: 24,
    range: [18, 26],
    unit: "each",
    blurb:
      "A slim wall holster for a NACS handle. The connector stands in the cradle and the lead hangs in a single tidy loop.",
    bullets: [
      "Shaped for the slimmer NACS connector, not a J1772 handle",
      "Vertical plate with two screw holes",
      "Open cradle so the handle lifts straight out",
      "Short loop keeps a mobile connector lead off the floor",
      "Matte print, no gloss that shows every scuff",
      "Indoor PETG or outdoor ASA",
    ],
    keywords: [
      "NACS holder",
      "NACS wall mount",
      "EV connector holster",
      "charging handle dock",
      "NACS cable holder",
    ],
    image: "/products/nacs.jpg",
    fits: "NACS charging handles.",
  },
  {
    slug: "universal-holder",
    name: "Universal Plug & Cable Holder",
    category: "holders",
    price: 26,
    range: [22, 30],
    unit: "each",
    blurb:
      "One holder when the garage sees more than one plug. A wide cradle takes the handle. A lower hook takes the cable.",
    bullets: [
      "Open cradle works across common Level 1 and Level 2 handles",
      "Separate cable hook so the plug is not asked to hold the weight",
      "Two-screw mount on drywall, stud, or masonry with anchors",
      "Useful if you switch between a portable cord and a guest's plug",
      "Thick walls so a heavy 40-amp lead does not creep the print",
      "Not a substitute for a plug-specific holster if you want a locked-in fit",
    ],
    keywords: [
      "universal EV holder",
      "EV cable wall hook",
      "charging plug organizer",
      "garage EV mount",
      "any plug holder",
    ],
    image: "/products/universal.jpg",
    fits: "Most Level 1 and Level 2 handles. Not a precision fit for one standard.",
    featured: true,
  },
  {
    slug: "low-profile-holder",
    name: "Low-Profile Plug Holder",
    category: "holders",
    price: 19,
    range: [16, 22],
    unit: "each",
    blurb:
      "The handle sits sideways, parallel to the wall, so the whole dock sticks out less than a standard cradle.",
    bullets: [
      "Plug axis turned 90 degrees to save depth in a tight bay",
      "Retaining lip keeps the handle from walking out",
      "Slotted lower screw hole for a small angle adjustment",
      "Cable still hangs on the holder, not on the slab",
      "Good beside a door where a deep holster would catch a shoulder",
      "Two screws. No adhesive.",
    ],
    keywords: [
      "low profile EV holder",
      "slim EV plug mount",
      "flat wall charger dock",
      "space saving EV holster",
      "garage plug holder",
    ],
    image: "/products/low-profile.jpg",
    fits: "Type 1 and Type 2 handles where wall depth is tight.",
  },
  {
    slug: "portable-wall-dock",
    name: "Portable Charger Wall Dock",
    category: "docks",
    price: 42,
    range: [36, 48],
    unit: "each",
    blurb:
      "A dock for the whole portable EVSE: the brick stands in the cradle and the cable wraps the body, with the plug parked at the side.",
    bullets: [
      "Holds a typical portable Level 1 or Level 2 brick upright",
      "Cable wraps the dock so it is not a pile on the floor",
      "Side cradle parks the plug when you are done",
      "Screw-mounted. The charger is not glued in.",
      "Printed with extra walls because the cable is the heavy part",
      "Tell us the brick's rough size if yours is unusually tall",
    ],
    keywords: [
      "portable EV charger mount",
      "EVSE wall dock",
      "mobile connector holder",
      "Level 1 charger organizer",
      "garage charger dock",
    ],
    image: "/products/wall-dock.jpg",
    fits: "Common portable EVSE bricks. Message us the dimensions if it is an odd shape.",
    featured: true,
  },
  {
    slug: "cable-clips",
    name: "Modular Cable Organizer Clips",
    category: "cable",
    price: 14,
    range: [12, 18],
    unit: "set of 4",
    blurb:
      "Four clips that snap around a thick charging cable so it coils the same way every time. Zip-tie the first clip if you want it to stay put.",
    bullets: [
      "Set of four identical clips",
      "Sized for charging cable around 16–20 mm across",
      "Snap on, no tools, and add more sets for a longer lead",
      "A zip-tie slot keeps the anchor clip from migrating",
      "Use them with a wall hook or on their own on the floor coil",
      "PETG is enough. These live on the cable, not in the sun all day.",
    ],
    keywords: [
      "EV cable clips",
      "charging cable organizer",
      "EV cord management",
      "cable coil clips",
      "thick cable holder",
    ],
    image: "/products/clips.jpg",
    fits: "Charging cables about 16–20 mm in diameter.",
  },
  {
    slug: "cable-hanger",
    name: "Wall Cable Hanger",
    category: "cable",
    price: 18,
    range: [16, 24],
    unit: "each",
    blurb:
      "A wide hook with a round screw plate. It carries a heavy coiled lead and keeps the bend gentle.",
    bullets: [
      "Broad saddle so the jacket is not kinked over a thin peg",
      "Three-screw round plate spreads the load",
      "Holds a full portable-cord coil off the floor",
      "Open front — drop the coil on, lift it off",
      "Print orientation follows the hook so the layers are not the weak plane",
      "Pair it with a plug holder if you want the handle parked too",
    ],
    keywords: [
      "EV cable hanger",
      "charging cord hook",
      "garage cable rack",
      "heavy cable wall hook",
      "EV lead storage",
    ],
    image: "/products/hanger.jpg",
    fits: "Any heavy EV charging cable you coil by hand.",
  },
  {
    slug: "plug-dust-cap",
    name: "Plug Dust Cap",
    category: "cable",
    price: 9,
    range: [8, 12],
    unit: "each",
    blurb:
      "A short cap for the plug face when the handle lives on the wall. A tether loop keeps it from walking off.",
    bullets: [
      "Covers the plug face against dust in a workshop bay",
      "Friction fit — it is a cover, not a weather seal",
      "Tether loop for a short cord or zip tie",
      "Prints in a few minutes, so it is an easy add-on",
      "Does not replace the holster. It just keeps the pins cleaner.",
      "Say which plug you have if you want the bore matched",
    ],
    keywords: [
      "EV plug cap",
      "charger dust cover",
      "J1772 cap",
      "charging plug cover",
      "EV connector cap",
    ],
    image: "/products/dust-cap.jpg",
    fits: "Most plug faces. Tell us Type 1, Type 2, or NACS for a closer bore.",
  },
  {
    slug: "logo-plate",
    name: "Custom Logo Plate",
    category: "custom",
    price: 8,
    range: [6, 12],
    unit: "each",
    blurb:
      "A small plate that screws or snaps onto a Portwell holder. We print a simple mark you send — a word, initials, or a plain symbol that is yours to use.",
    bullets: [
      "Fits the plate pocket on Portwell holders",
      "One M3 screw or a snap fit, depending on the holder",
      "Send text or a simple silhouette. We do not reproduce car badges.",
      "Swap the plate later without reprinting the whole dock",
      "Two-color if you want the mark in a second filament",
      "Sold on its own or added to any holder",
    ],
    keywords: [
      "custom EV holder plate",
      "personalized charger dock",
      "EV mount nameplate",
      "3D printed logo plate",
      "charger holder badge",
    ],
    image: "/products/logo-plate.jpg",
    fits: "Portwell holders with a plate pocket. Ask if you want it matched to a holder you already have.",
  },
];

export function categoryLabel(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function filterProducts(cat?: CategoryId, q?: string) {
  const query = (q ?? "").trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (!query) return true;
    const hay = [p.name, p.blurb, p.fits, categoryLabel(p.category), ...p.keywords]
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  });
}

export function relatedProducts(product: Product) {
  return PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
}
