import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useCart, formatINR } from "@/store/cart";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your bag — Luné Beauty" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const sub = subtotal();
  const shipping = sub > 999 || sub === 0 ? 0 : 99;
  const total = Math.max(0, sub - discount + shipping);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Your edit</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Shopping <span className="italic">bag</span></h1>

        {items.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-border p-16 text-center">
            <p className="font-serif text-3xl">Your bag is empty.</p>
            <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground">Begin a ritual</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_380px]">
            <ul className="divide-y divide-border/60">
              {items.map((i) => (
                <li key={i.product.id} className="flex gap-5 py-6">
                  <img src={i.product.image} alt={i.product.name} className="h-32 w-28 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{i.product.category}</p>
                        <h3 className="mt-1 font-serif text-xl">{i.product.name}</h3>
                      </div>
                      <span className="font-serif text-lg">{formatINR(i.product.price * i.qty)}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button onClick={() => setQty(i.product.id, i.qty - 1)} className="p-2"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.product.id, i.qty + 1)} className="p-2"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => remove(i.product.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-[var(--cream)] p-7">
              <h2 className="font-serif text-2xl">Order summary</h2>
              <div className="mt-5 space-y-3 text-sm">
                <Row label="Subtotal" value={formatINR(sub)} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
                {discount > 0 && <Row label="Discount" value={`− ${formatINR(discount)}`} />}
              </div>
              <div className="mt-5 flex gap-2">
                <input
                  value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Promo code" className="flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm outline-none"
                />
                <button
                  onClick={() => {
                    if (coupon === "LUNE10") { setDiscount(Math.round(sub * 0.1)); toast.success("10% applied"); }
                    else { toast.error("Invalid code"); }
                  }}
                  className="rounded-full bg-primary px-5 text-xs uppercase tracking-[0.2em] text-primary-foreground"
                >Apply</button>
              </div>
              <div className="mt-5 border-t border-border/70 pt-4">
                <Row label={<span className="text-base">Total</span>} value={<span className="font-serif text-2xl">{formatINR(total)}</span>} />
              </div>
              <Link
                to="/checkout"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">Try <span className="font-medium">LUNE10</span> for 10% off</p>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
