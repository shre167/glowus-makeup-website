import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart, formatINR } from "@/store/cart";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal } = useCart();
  const total = subtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Your edit</p>
                <h3 className="font-serif text-xl">Shopping bag</h3>
              </div>
              <button onClick={close} aria-label="Close" className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-serif text-2xl">Your bag is empty</p>
                  <p className="mt-2 text-sm text-muted-foreground">Discover the rituals our community loves.</p>
                  <Link
                    to="/shop"
                    onClick={close}
                    className="mt-6 rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground"
                  >
                    Shop the edit
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.li
                        key={i.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="flex gap-4"
                      >
                        <img src={i.product.image} alt={i.product.name} className="h-24 w-20 rounded-lg object-cover" />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-serif text-base leading-tight">{i.product.name}</p>
                              <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                                {i.product.category}
                              </p>
                            </div>
                            <button onClick={() => remove(i.product.id)} className="text-xs text-muted-foreground hover:text-foreground">
                              Remove
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-border">
                              <button onClick={() => setQty(i.product.id, i.qty - 1)} className="p-2"><Minus className="h-3 w-3" /></button>
                              <span className="w-6 text-center text-sm">{i.qty}</span>
                              <button onClick={() => setQty(i.product.id, i.qty + 1)} className="p-2"><Plus className="h-3 w-3" /></button>
                            </div>
                            <span className="text-sm">{formatINR(i.product.price * i.qty)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border/60 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-xl">{formatINR(total)}</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Shipping & taxes calculated at checkout.</p>
                <Link
                  to="/checkout"
                  onClick={close}
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Checkout <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/cart"
                  onClick={close}
                  className="mt-3 block text-center text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  View bag
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
