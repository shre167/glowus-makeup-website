import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Search, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Luné Beauty" },
      { name: "description", content: "Shop Luné Beauty skincare and cosmetics — bestsellers, new arrivals and edits." },
    ],
  }),
  component: Shop,
});

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Top rated"] as const;
type Sort = typeof sortOptions[number];

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("Featured");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      (!cat || p.category === cat) &&
      p.price <= maxPrice &&
      (q ? (p.name + p.category + p.tagline).toLowerCase().includes(q.toLowerCase()) : true)
    );
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Top rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, cat, sort, maxPrice]);

  return (
    <Layout>
      <section className="border-b border-border/60 bg-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">The edit</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Shop <span className="italic">all</span></h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            {filtered.length} pieces, considered and ready.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-10 md:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block space-y-8 bg-white dark:bg-card p-5 md:p-0 rounded-2xl border border-border/50 md:border-0`}>
            <div>
              <label className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search rituals…"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </label>
            </div>
            <Filter title="Category">
              <button
                onClick={() => setCat(null)}
                className={`block w-full text-left text-sm py-1 ${!cat ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >All</button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`block w-full text-left text-sm py-1 ${cat === c ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >{c}</button>
              ))}
            </Filter>
            <Filter title="Price">
              <input
                type="range" min={299} max={2000} step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--rose)]"
              />
              <p className="mt-2 text-xs text-muted-foreground">Up to ₹{maxPrice}</p>
            </Filter>
            <Filter title="Skin type">
              {["All", "Dry", "Normal", "Sensitive", "Dull"].map((s) => (
                <label key={s} className="flex items-center gap-2 py-1 text-sm text-muted-foreground">
                  <input type="checkbox" className="accent-[var(--rose)]" /> {s}
                </label>
              ))}
            </Filter>
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center">
                  <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
                  {filtered.length} results
                </p>
                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white text-[10px] font-bold uppercase tracking-wider text-[#2A5EE1] cursor-pointer shadow-sm hover:bg-muted/30"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-border bg-background px-4 py-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] outline-none w-full sm:w-auto text-center"
              >
                {sortOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3.5 md:gap-6 md:grid-cols-3">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-16 text-center">
                <p className="font-serif text-2xl">Nothing matches — yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try a softer filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Filter({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-[0.22em] text-foreground/70">{title}</h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}
