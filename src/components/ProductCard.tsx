import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart, formatINR } from "@/store/cart";
import type { Product } from "@/data/products";
import { toast } from "sonner";
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className="group bg-white dark:bg-card border border-border/40 hover:border-[#2A5EE1]/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        {/* Visual Box */}
        <div className="relative aspect-square overflow-hidden bg-muted/20">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />

          {/* Discount Tag */}
          {product.compareAt && (
            <span className="absolute left-2.5 top-2.5 rounded-md bg-[#FF7222] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
              {Math.round((1 - product.price / product.compareAt) * 100)}% off
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWish(product.id);
              toast(wished ? "Removed from wishlist" : "Added to wishlist");
            }}
            className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white/90 dark:bg-black/80 text-foreground/80 hover:text-rose-500 shadow-sm transition hover:scale-105"
            aria-label="Wishlist"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>

          {/* Add to Cart Quick Trigger */}
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product);
              toast.success(`${product.name} added to cart! 🛒`);
            }}
            className="absolute bottom-2.5 right-2.5 grid h-9 w-9 place-items-center rounded-full bg-[#2A5EE1] text-white shadow-md transition-all duration-300 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Info Block */}
        <div className="p-3.5 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between gap-1">
              {/* Brand & Category Label */}
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2A5EE1]">
                {product.brand}
              </span>
              {/* Rating */}
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-muted-foreground">
                <Star className="h-3 w-3 fill-[#FFA500] text-[#FFA500]" /> {product.rating}
                <span className="text-[9px] font-normal text-muted-foreground/60">({product.reviews})</span>
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-1.5 font-sans font-medium text-sm leading-tight text-foreground line-clamp-2 min-h-[2.5rem] group-hover:text-[#2A5EE1] transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Pricing */}
          <div className="mt-2.5 flex items-baseline gap-2 pt-1 border-t border-border/30">
            <span className="text-sm font-bold text-foreground">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="text-[11px] text-muted-foreground line-through font-medium">
                {formatINR(product.compareAt)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
