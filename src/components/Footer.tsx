import { Link } from "@tanstack/react-router";
import { Instagram, Send, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing! Check your inbox for 10% discount coupon code 'EXTRA10'. 🎉");
  };

  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4 md:px-8">
        
        {/* About Section */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img
              src="https://img.thecdn.in/365412/Untitleddesign_20240414_124858_0000-1713289020241-1713289118675.jpeg?height=200&format=webp"
              alt="Glowus"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-sans font-black text-2xl text-[#2A5EE1] tracking-tight">Glowus</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Glowus is your ultimate destination for premium beauty, cosmetics, and skincare. We bring 100% trusted, branded salon-quality products directly to your doorstep. Glow brighter with us! ✨💄
          </p>
          
          <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-border/80 bg-white dark:bg-[#111827] px-4 py-1.5 shadow-sm">
            <input
              type="email"
              placeholder="Join our glow list for exclusive discount coupons"
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              required
            />
            <button
              type="submit"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#2A5EE1] text-white hover:opacity-90 transition shadow-md"
              aria-label="Subscribe"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* Categories / Shopping links */}
        <div>
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#2A5EE1]">Shop Categories</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/shop" search={{ category: "Lipstick" } as any} className="hover:text-[#2A5EE1] transition">Makeup & Glow</Link></li>
            <li><Link to="/shop" search={{ category: "Serum" } as any} className="hover:text-[#2A5EE1] transition">Premium Skincare</Link></li>
            <li><Link to="/shop" search={{ category: "Hair Care" } as any} className="hover:text-[#2A5EE1] transition">Professional Hair Care</Link></li>
            <li><Link to="/shop" className="hover:text-[#2A5EE1] transition">Bestselling Bundles</Link></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#2A5EE1]">Help & Support</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#FFA500]" />
              <span>+91 9350912929</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#FFA500]" />
              <span>support@glowus.in</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#FFA500]" />
              <span>New Delhi, India</span>
            </li>
          </ul>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/919220600692?text=Hi,%20I%20am%20interested%20in%20shopping%20at%20Glowus!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-md transition"
            >
              <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
              WhatsApp Help
            </a>
            <a
              href="https://instagram.com/glowus.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8.5 w-8.5 rounded-full bg-[#E1306C] hover:opacity-90 text-white shadow-md transition"
              aria-label="Instagram"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 px-6 py-6 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <div>
          © {new Date().getFullYear()} Glowus Online Shopping. 100% Trusted & Branded Products.
        </div>
        <div className="flex gap-4">
          <Link to="/shop" className="hover:underline">Privacy Policy</Link>
          <Link to="/shop" className="hover:underline">Terms of Service</Link>
          <Link to="/shop" className="hover:underline">Return & Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}
