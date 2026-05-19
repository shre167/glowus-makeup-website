import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Heart, ShoppingBag, Gift, Truck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { HeroSlider } from "@/components/HeroSlider";
import { products } from "@/data/products";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Home,
});

const circleCategories = [
  { name: "Beauty & Glow", img: "https://img.thecdn.in/365412/Untitleddesign2-1720678525423.jpeg?width=200&format=webp" },
  { name: "Skin Care", img: "https://img.thecdn.in/365412/2-1720612518898.jpeg?width=200&format=webp" },
  { name: "Hair Care", img: "https://img.thecdn.in/365412/skintyps-1720783668065.jpeg?width=200&format=webp" },
  { name: "Body Care", img: "https://img.thecdn.in/365412/Untitleddesign-1720678308037.jpeg?width=200&format=webp" },
  { name: "Makeup Kits", img: "https://img.thecdn.in/365412/5-1720612540006.jpeg?width=200&format=webp" },
  { name: "Baby Care", img: "https://img.thecdn.in/365412/4-1720612533401.jpeg?width=200&format=webp" },
  { name: "Hygiene Care", img: "https://img.thecdn.in/365412/6-1720612547076.jpeg?width=200&format=webp" },
  { name: "Fragrance & Gifts", img: "https://img.thecdn.in/365412/young-woman-towel-touching-her-shoulders_1187-5440-1721053910388.jpeg?width=200&format=webp" },
];

const brandList = [
  { name: "Swiss Beauty", desc: "Bold Professional Makeup", color: "from-pink-500 to-rose-600" },
  { name: "Pilgrim", desc: "Jeju Secret Skincare", color: "from-teal-500 to-emerald-600" },
  { name: "Mars", desc: "High Pigment Makeup Kits", color: "from-purple-500 to-indigo-600" },
  { name: "Biolage", desc: "Botanical Hair Therapy", color: "from-green-400 to-emerald-500" },
  { name: "O3+", desc: "Clinical Skin Whitening", color: "from-blue-500 to-cyan-600" },
  { name: "Cetaphil", desc: "Dermatologist Recommended", color: "from-blue-600 to-indigo-800" },
  { name: "Aroma Magic", desc: "Organic Essential Care", color: "from-yellow-400 to-orange-500" },
];

function Home() {
  // Filter products by brands/sections
  const swissBeautyProds = products.filter((p) => p.brand === "Swiss Beauty");
  const pilgrimProds = products.filter((p) => p.brand === "Pilgrim");
  const marsProds = products.filter((p) => p.brand === "Mars");
  const hairProds = products.filter((p) => p.brand === "Biolage" || p.brand === "Matrix");
  const o3Prods = products.filter((p) => p.brand === "O3+");
  const otherProds = products.filter(
    (p) => p.brand === "Cetaphil" || p.brand === "Aroma Magic"
  );

  return (
    <Layout>
      {/* Dynamic auto-playing Hero Slider */}
      <HeroSlider />

      {/* 1. Circular Categories Strip */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#2A5EE1] uppercase tracking-wider">
            Explore Categories
          </h2>
          <div className="h-1 w-12 bg-[#FFA500] mt-2 rounded-full"></div>
        </div>

        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-none justify-start md:justify-center">
          {circleCategories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06 }}
              className="flex flex-col items-center text-center flex-shrink-0 cursor-pointer"
              onClick={() => {
                toast.success(`Showing products in ${cat.name}!`);
              }}
            >
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-[#2A5EE1]/10 hover:border-[#2A5EE1] p-1 bg-white shadow-sm transition-all duration-300">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs font-semibold mt-2.5 text-foreground/80 hover:text-[#2A5EE1] max-w-[90px] leading-tight">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Shop By Brands Grid */}
      <section className="bg-muted/30 py-12 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#2A5EE1] uppercase tracking-wider">
              Shop By Brands
            </h2>
            <div className="h-1 w-12 bg-[#FFA500] mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {brandList.map((brand, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className={`p-4 rounded-xl bg-gradient-to-br ${brand.color} text-white shadow-sm flex flex-col justify-between min-h-[100px] cursor-pointer`}
                onClick={() => {
                  toast.success(`Browsing ${brand.name} collection!`);
                }}
              >
                <span className="text-xs uppercase font-extrabold tracking-widest bg-white/20 px-2 py-0.5 rounded w-max">
                  Brand
                </span>
                <div className="mt-2">
                  <h3 className="font-extrabold text-sm md:text-base leading-tight">
                    {brand.name}
                  </h3>
                  <p className="text-[10px] text-white/80 line-clamp-1 mt-0.5 leading-none">
                    {brand.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Swiss Beauty Section Shelf */}
      <SectionShelf
        title="Swiss Beauty Lip & Cheek Tints"
        subtitle="Vibrant pigment, weightless textures, smudgeproof lock-in."
        viewLink="/shop"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {swissBeautyProds.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </SectionShelf>

      {/* Promo banner grid */}
      <section className="mx-auto max-w-7xl px-5 py-4 md:px-8 grid gap-6 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition group aspect-[2.5/1]">
          <img
            src="https://img.thecdn.in/365412/biolage1-1733060252840.jpeg?width=600&format=jpeg"
            alt="Biolage haircare banner"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-6 text-white">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFA500]">Hair Therapy</span>
            <h3 className="text-lg md:text-xl font-bold mt-1">Professional Biolage Secrets</h3>
            <p className="text-xs text-white/80 mt-1 max-w-[200px]">Tame frizz with Camellia smooth oil.</p>
            <Link to="/shop" className="mt-3 px-4 py-1.5 bg-[#2A5EE1] text-white font-bold text-[10px] uppercase tracking-widest rounded w-max hover:opacity-90 transition">
              Shop Now
            </Link>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition group aspect-[2.5/1]">
          <img
            src="https://img.thecdn.in/365412/PILGRIM1920x640px-1723721945588.jpeg?width=600&format=jpeg"
            alt="Pilgrim skincare banner"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-6 text-white">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFA500]">Anti-Aging</span>
            <h3 className="text-lg md:text-xl font-bold mt-1">Jeju Radiance Glow</h3>
            <p className="text-xs text-white/80 mt-1 max-w-[200px]">Infused with clinical 24K Gold flakes.</p>
            <Link to="/shop" className="mt-3 px-4 py-1.5 bg-[#2A5EE1] text-white font-bold text-[10px] uppercase tracking-widest rounded w-max hover:opacity-90 transition">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Pilgrim Jeju Shelf */}
      <SectionShelf
        title="Pilgrim Skincare & Matte Lipsticks"
        subtitle="Unlocking Korean Jeju secrets combined with active clinical formulations."
        viewLink="/shop"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {pilgrimProds.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </SectionShelf>

      {/* 5. Mars Makeup Kit Shelf */}
      <SectionShelf
        title="Mars City Paradise Makeup Kits"
        subtitle="Compact palettes for complete looks - eyeshadow, blushes, highlighters."
        viewLink="/shop"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {marsProds.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </SectionShelf>

      {/* 6. Professional Hair Care Section */}
      <SectionShelf
        title="Professional Hair Care Products"
        subtitle="Salon smoothing treatments, shine serums, and damage repairs used by stylists."
        viewLink="/shop"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {hairProds.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </SectionShelf>

      {/* 7. O3+ Skin Care Section */}
      <SectionShelf
        title="O3+ Professional Clinical Care"
        subtitle="Professional salon-facial glow kits, anti-spot serums, and peeling solutions."
        viewLink="/shop"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {o3Prods.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </SectionShelf>

      {/* 8. Cetaphil & Aroma Magic Section */}
      <SectionShelf
        title="Cetaphil & Aroma Magic Essences"
        subtitle="Mild daily face washes, hydrating aloe blocks, and clean mineral sunscreens."
        viewLink="/shop"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {otherProds.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </SectionShelf>

      {/* E-Commerce Guarantee Trust badges */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 border-t mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Sparkles, title: "100% Genuine", desc: "Direct from authorized brand distributors" },
            { icon: ShieldCheck, title: "Secure Checkout", desc: "Fully encrypted payment gateways" },
            { icon: Truck, title: "Free Shipping", desc: "Complimentary shipping on orders above ₹999" },
            { icon: Gift, title: "Exclusive Offers", desc: "Use code EXTRA10 at checkout for 10% OFF" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2A5EE1] shadow-sm mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-[180px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href="https://wa.me/919220600692?text=Hi,%20I%20am%20shopping%20at%20Glowus!"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Shop on WhatsApp</span>
        </a>
      </div>
    </Layout>
  );
}

function SectionShelf({
  title,
  subtitle,
  viewLink,
  children,
}: {
  title: string;
  subtitle?: string;
  viewLink: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
      <div className="flex items-end justify-between gap-4 border-b pb-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#2A5EE1] uppercase tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-xs md:text-sm text-muted-foreground max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          to={viewLink}
          className="text-xs font-bold uppercase tracking-wider text-[#2A5EE1] hover:text-[#FFA500] whitespace-nowrap transition-colors flex items-center gap-1 group"
        >
          View All{" "}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div>{children}</div>
    </section>
  );
}
