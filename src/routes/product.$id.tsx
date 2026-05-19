import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Star, Truck, RefreshCw, Leaf } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/data/products";
import { useCart, formatINR } from "@/store/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Luné Beauty` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl">Not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] underline">Back to shop</Link>
      </div>
    </Layout>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "ingredients" | "usage">("description");
  const { add, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(product.id);

  const related: typeof products = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <Link to="/shop">Shop</Link> / {product.category}
        </p>

        <div className="mt-6 grid gap-12 md:grid-cols-2">
          {/* Gallery */}
          <div className="grid gap-3">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
              className="group overflow-hidden rounded-[1.75rem] bg-[var(--cream)]"
            >
              <img
                src={product.image} alt={product.name}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image, ...products.slice(0, 3).map(p => p.image)].map((img, i) => (
                <div key={i} className="overflow-hidden rounded-xl bg-[var(--cream)]">
                  <img src={img} alt="" className="aspect-square w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="md:pt-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{product.category}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{product.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>

            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-[var(--gold)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />
                ))}
              </span>
              <span className="text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl">{formatINR(product.price)}</span>
              {product.compareAt && <span className="text-sm text-muted-foreground line-through">{formatINR(product.compareAt)}</span>}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3"><Plus className="h-4 w-4" /></button>
              </div>
              <button
                onClick={() => { add(product, qty); toast.success(`${product.name} added`); }}
                className="flex-1 min-w-[200px] rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:opacity-90"
              >
                Add to bag — {formatINR(product.price * qty)}
              </button>
              <button
                onClick={() => toggleWish(product.id)}
                aria-label="Wishlist"
                className="grid h-[52px] w-[52px] place-items-center rounded-full border border-border"
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-[var(--rose)] text-[var(--rose)]" : ""}`} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-1 sm:gap-3 rounded-2xl bg-[var(--cream)] p-4 sm:p-5">
              {[
                { icon: Truck, label: "Free shipping over ₹999" },
                { icon: RefreshCw, label: "30-day returns" },
                { icon: Leaf, label: "Clean formulas" },
              ].map((b, i) => (
                <div key={i} className="text-center px-1">
                  <b.icon className="mx-auto h-4 w-4 text-foreground/70" />
                  <p className="mt-2 text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold text-muted-foreground leading-tight">{b.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-10 border-t border-border/60 pt-6">
              <div className="flex gap-6 border-b border-border/60">
                {(["description", "ingredients", "usage"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`pb-3 text-xs uppercase tracking-[0.22em] ${tab === t ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground"}`}
                  >{t}</button>
                ))}
              </div>
              <div className="pt-5 text-sm leading-relaxed text-muted-foreground">
                {tab === "description" && <p>{product.description}</p>}
                {tab === "ingredients" && (
                  <ul className="grid grid-cols-2 gap-2">
                    {product.ingredients.map((i: string) => <li key={i}>· {i}</li>)}
                  </ul>
                )}
                {tab === "usage" && <p>{product.usage}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Routine */}
        <section className="mt-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Complete the routine</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Pairs <span className="italic">beautifully</span> with</h2>
          <div className="mt-8 grid grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-6">
            {related.map((p: typeof products[number], i: number) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </Layout>
  );
}
