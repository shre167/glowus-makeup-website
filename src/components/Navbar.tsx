import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "All Shop" },
  { to: "/shop", label: "Skincare", search: { category: "Serum" } },
  { to: "/shop", label: "Makeup", search: { category: "Lipstick" } },
  { to: "/shop", label: "Haircare", search: { category: "Hair Care" } },
];

export function Navbar() {
  const { open, count } = useCart();
  const c = count();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate({
        to: "/shop",
        search: { q: searchVal } as any,
      });
      toast.success(`Searching for "${searchVal}"...`);
    }
  };

  const handleLocationClick = () => {
    toast.info("Deliveries available across all pincodes in India! 🚚", {
      description: "Default shipping location set to: New Delhi, India.",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Notice/Announcement Marquee Bar */}
      <div className="bg-[#FFA500] text-white text-[10px] md:text-xs py-2.5 select-none overflow-hidden relative marquee-container border-b border-white/10 shadow-sm">
        <div className="marquee-content flex items-center gap-12 font-semibold uppercase tracking-wider">
          <span>🔥 Buy Swiss Beauty & Pilgrim Cosmetics & Skincare at just ₹999 and get 10% OFF! Code: <span className="underline decoration-2 font-black">EXTRA10</span></span>
          <span>⚡ FREE SHIPPING ON ORDERS ABOVE ₹999 • COD AVAILABLE NATIONWIDE 🚚</span>
          <span>💎 100% AUTHENTIC COSMETICS DIRECTLY FROM BRAND AUTHORIZED DISTRIBUTORS 🛡️</span>
          <span>💄 SPECIAL DISCOUNTS ON MATTE LIPSTICKS & REJUVENATING SERUMS NOW ACTIVE ✨</span>
          {/* Duplicate set for seamless looping */}
          <span>🔥 Buy Swiss Beauty & Pilgrim Cosmetics & Skincare at just ₹999 and get 10% OFF! Code: <span className="underline decoration-2 font-black">EXTRA10</span></span>
          <span>⚡ FREE SHIPPING ON ORDERS ABOVE ₹999 • COD AVAILABLE NATIONWIDE 🚚</span>
          <span>💎 100% AUTHENTIC COSMETICS DIRECTLY FROM BRAND AUTHORIZED DISTRIBUTORS 🛡️</span>
          <span>💄 SPECIAL DISCOUNTS ON MATTE LIPSTICKS & REJUVENATING SERUMS NOW ACTIVE ✨</span>
        </div>
      </div>

      {/* Main Navbar Row */}
      <div
        className={`w-full py-3.5 px-5 md:px-8 border-b border-border/60 transition-all duration-300 ${
          scrolled ? "glass shadow-md" : "bg-white dark:bg-[#0B0F19]"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          
          {/* Left Block: Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobile(true)}
              className="md:hidden p-1.5 text-foreground hover:bg-muted rounded-full"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="https://img.thecdn.in/365412/Untitleddesign_20240414_124858_0000-1713289020241-1713289118675.jpeg?height=200&format=webp"
                alt="Glowus"
                className="h-10 w-10 rounded-full object-cover border border-[#2A5EE1]/20 shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-xl md:text-2xl text-[#2A5EE1] leading-none tracking-tight">
                  Glowus
                </span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest leading-tight hidden xs:block">
                  Beauty & Cosmetics
                </span>
              </div>
            </Link>
          </div>

          {/* Middle Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((l, i) => (
              <Link
                key={i}
                to={l.to}
                search={l.search}
                className="text-xs uppercase tracking-widest font-semibold text-foreground/80 hover:text-[#2A5EE1] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Search bar inside header */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-sm relative mx-4"
          >
            <input
              type="text"
              placeholder="Search Swiss Beauty, Pilgrim, O3+..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full pl-4 pr-10 py-1.5 rounded-full border border-border bg-muted/40 text-xs focus:outline-none focus:ring-1 focus:ring-[#2A5EE1]"
            />
            <button type="submit" className="absolute right-3 text-muted-foreground hover:text-[#2A5EE1]">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 md:gap-4.5 text-foreground/80">
            {/* Delivery Location Selector */}
            <button
              onClick={handleLocationClick}
              className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#2A5EE1] transition-colors"
            >
              <MapPin className="h-4 w-4 text-[#FFA500]" />
              <span className="max-w-[100px] truncate font-medium">India</span>
            </button>

            {/* Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 p-1 hover:text-[#2A5EE1] rounded-full hover:bg-muted/30 transition-all cursor-pointer border border-[#2A5EE1]/10 bg-white dark:bg-[#111827] shadow-sm"
                  aria-label="User profile"
                >
                  <div className="h-6 w-6 rounded-full bg-[#EFF6FF] text-[#2A5EE1] font-black text-[10px] flex items-center justify-center border border-[#2A5EE1]/20 uppercase">
                    {user.first_name ? user.first_name[0] : user.email[0]}
                  </div>
                  <span className="hidden md:inline text-[10px] font-bold text-foreground/80 pr-1 max-w-[80px] truncate">
                    {user.first_name || "User"}
                  </span>
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2.5 w-52 bg-white dark:bg-[#111827] rounded-xl border border-border shadow-lg py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-border/60">
                        <p className="text-[9px] uppercase font-black text-[#2A5EE1] tracking-wider">Logged In As</p>
                        <p className="text-xs font-bold text-foreground truncate mt-0.5">
                          {user.first_name} {user.last_name || ""}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate leading-none mt-0.5">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/shop"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs text-foreground/80 hover:bg-muted/50 hover:text-[#2A5EE1] transition-colors"
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/shop"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs text-foreground/80 hover:bg-muted/50 hover:text-[#2A5EE1] transition-colors"
                        >
                          My Wishlist
                        </Link>
                        <Link
                          to="/shop"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs text-foreground/80 hover:bg-muted/50 hover:text-[#2A5EE1] transition-colors"
                        >
                          Loyalty Rewards
                        </Link>
                      </div>
                      <div className="border-t border-border/60 pt-1.5 mt-1">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 font-bold transition-colors cursor-pointer"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" aria-label="Account" className="p-1.5 hover:text-[#2A5EE1] rounded-full hover:bg-muted/30 transition-colors">
                <User className="h-[19px] w-[19px]" />
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/shop" aria-label="Wishlist" className="hidden xs:block p-1.5 hover:text-[#2A5EE1] rounded-full hover:bg-muted/30 transition-colors">
              <Heart className="h-[19px] w-[19px]" />
            </Link>

            {/* Cart Bag */}
            <button
              onClick={open}
              aria-label="Cart"
              className="relative p-1.5 hover:text-[#2A5EE1] rounded-full hover:bg-muted/30 transition-colors"
            >
              <ShoppingBag className="h-[19px] w-[19px]" />
              {c > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-[#FFA500] text-[9px] font-bold text-white shadow-sm">
                  {c}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobile(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="h-full w-80 max-w-[85vw] bg-background p-6 shadow-xl flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b pb-4">
                <span className="font-sans font-black text-xl text-[#2A5EE1]">Glowus</span>
                <button
                  onClick={() => setMobile(false)}
                  className="p-1 text-foreground hover:bg-muted rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Search Input */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-full border bg-muted/40 text-sm focus:outline-none"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-muted-foreground">
                  <Search className="h-4.5 w-4.5" />
                </button>
              </form>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4 mt-2">
                {links.map((l, i) => (
                  <Link
                    key={i}
                    to={l.to}
                    search={l.search}
                    onClick={() => setMobile(false)}
                    className="font-medium text-lg text-foreground hover:text-[#2A5EE1] transition-colors py-1"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Pin Location Display */}
              <div className="mt-auto border-t pt-4 flex items-center gap-2 text-muted-foreground text-xs">
                <MapPin className="h-4.5 w-4.5 text-[#FFA500]" />
                <span>Shipping Nationwide in India 🚚</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
