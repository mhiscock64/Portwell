import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";

export function CartHydrator() {
  useEffect(() => {
    const mark = () => useCart.setState({ ready: true });
    const unsub = useCart.persist.onFinishHydration(mark);
    void useCart.persist.rehydrate();
    if (useCart.persist.hasHydrated()) mark();
    return unsub;
  }, []);
  return null;
}
