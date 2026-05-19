import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Lock, Truck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useCart, formatINR } from "@/store/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Luné Beauty" }] }),
  component: Checkout,
});

const steps = ["Address", "Delivery", "Payment"] as const;

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const sub = subtotal();
  const shipping = sub > 999 ? 0 : 99;
  const total = sub + shipping;

  if (done) {
    return (
      <Layout>
        <div className="mx-auto max-w-xl px-6 py-32 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--blush)]">
            <Check className="h-8 w-8 text-foreground" />
          </motion.div>
          <h1 className="mt-8 font-serif text-5xl">Thank you.</h1>
          <p className="mt-4 text-muted-foreground">Your ritual is on its way. A confirmation will arrive in your inbox shortly.</p>
          <Link to="/shop" className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground">Continue shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <h1 className="font-serif text-4xl md:text-5xl">Checkout</h1>

        {/* Stepper */}
        <div className="mt-8 flex items-center gap-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`grid h-8 w-8 place-items-center rounded-full text-xs ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>{i + 1}</div>
              <span className={`text-xs uppercase tracking-[0.2em] ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <span className="mx-2 h-px w-8 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {step === 0 && <AddressForm />}
              {step === 1 && <DeliveryForm />}
              {step === 2 && <PaymentForm />}
              <div className="flex items-center justify-between pt-4">
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)} className="text-xs uppercase tracking-[0.2em] text-muted-foreground">← Back</button>
                ) : <span />}
                <button
                  onClick={() => {
                    if (step < 2) setStep(step + 1);
                    else { setDone(true); clear(); }
                  }}
                  className="rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground"
                >
                  {step < 2 ? "Continue" : `Pay ${formatINR(total)}`}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <aside className="h-fit rounded-2xl border border-border bg-[var(--cream)] p-7">
            <h2 className="font-serif text-xl">Order</h2>
            <ul className="mt-5 space-y-4">
              {items.map((i) => (
                <li key={i.product.id} className="flex gap-3">
                  <img src={i.product.image} alt="" className="h-16 w-14 rounded-lg object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="leading-tight">{i.product.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Qty {i.qty}</p>
                  </div>
                  <span className="text-sm">{formatINR(i.product.price * i.qty)}</span>
                </li>
              ))}
              {items.length === 0 && <li className="text-sm text-muted-foreground">Bag is empty.</li>}
            </ul>
            <div className="mt-6 space-y-2 border-t border-border/70 pt-4 text-sm">
              <Row l="Subtotal" v={formatINR(sub)} />
              <Row l="Shipping" v={shipping === 0 ? "Free" : formatINR(shipping)} />
              <div className="flex items-center justify-between pt-2"><span className="text-base">Total</span><span className="font-serif text-xl">{formatINR(total)}</span></div>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3" /> Secure checkout
            </p>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

function Row({ l, v }: { l: string; v: React.ReactNode }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{l}</span><span>{v}</span></div>;
}

function Field({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <input
        {...p}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/40"
      />
    </label>
  );
}

function AddressForm() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="First name" placeholder="Aanya" />
      <Field label="Last name" placeholder="Sharma" />
      <div className="md:col-span-2"><Field label="Email" type="email" placeholder="you@email.com" /></div>
      <Field label="Phone" placeholder="+91" />
      <Field label="Pincode" placeholder="400001" />
      <div className="md:col-span-2"><Field label="Address" placeholder="House, street, area" /></div>
      <Field label="City" placeholder="Mumbai" />
      <Field label="State" placeholder="Maharashtra" />
    </div>
  );
}

function DeliveryForm() {
  const [opt, setOpt] = useState("standard");
  const options = [
    { id: "standard", title: "Standard delivery", note: "4–6 business days", price: "Free over ₹999" },
    { id: "express",  title: "Express delivery",  note: "1–2 business days", price: "₹199" },
  ];
  return (
    <div className="space-y-3">
      {options.map((o) => (
        <button
          key={o.id} onClick={() => setOpt(o.id)}
          className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
            opt === o.id ? "border-foreground/60 bg-background" : "border-border"
          }`}
        >
          <div className="flex items-center gap-4">
            <Truck className="h-4 w-4 text-foreground/70" />
            <div>
              <p className="font-serif text-lg">{o.title}</p>
              <p className="text-xs text-muted-foreground">{o.note}</p>
            </div>
          </div>
          <span className="text-sm">{o.price}</span>
        </button>
      ))}
    </div>
  );
}

function PaymentForm() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border p-5">
        <div className="flex items-center gap-3">
          <CreditCard className="h-4 w-4" />
          <p className="font-serif text-lg">Razorpay</p>
          <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Placeholder</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2"><Field label="Card number" placeholder="1234 5678 9012 3456" /></div>
          <Field label="Expiry" placeholder="MM / YY" />
          <Field label="CVC" placeholder="•••" />
          <div className="md:col-span-2"><Field label="Name on card" placeholder="Aanya Sharma" /></div>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground">
        This is a demo checkout. No real payment will be processed.
      </p>
    </div>
  );
}
