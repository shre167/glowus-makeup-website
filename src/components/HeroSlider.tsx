import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

const banners = [
  {
    image: "https://img.thecdn.in/365412/wwwglowusin1920x640px-1735565011543.jpeg?width=1200&format=jpeg",
    link: "/shop",
    title: "Branded Authentic Cosmetics",
  },
  {
    image: "https://img.thecdn.in/365412/1-1733680629171.jpeg?width=1200&format=jpeg",
    link: "/shop",
    title: "Swiss Beauty Select Collections",
  },
  {
    image: "https://img.thecdn.in/365412/IKONIC1920x640px-1733070254719.jpeg?width=1200&format=jpeg",
    link: "/shop",
    title: "Ikonic Professional Hair Tools",
  },
  {
    image: "https://img.thecdn.in/365412/biolage1-1733060252840.jpeg?width=1200&format=jpeg",
    link: "/shop",
    title: "Biolage Advanced Hair Therapies",
  },
  {
    image: "https://img.thecdn.in/365412/matrix1920x640px-1733059936364.jpeg?width=1200&format=jpeg",
    link: "/shop",
    title: "Matrix Professional Hair Care",
  },
  {
    image: "https://img.thecdn.in/365412/HI91920x640px-1733680267207.jpeg?width=1200&format=jpeg",
    link: "/shop",
    title: "HI9 Herbal Infused Skincare",
  },
  {
    image: "https://img.thecdn.in/365412/pg12-1723730028198.jpeg?width=1200&format=jpeg",
    link: "/shop",
    title: "Premium Skincare Combos",
  },
  {
    image: "https://img.thecdn.in/365412/PILGRIM1920x640px-1723721945588.jpeg?width=1200&format=jpeg",
    link: "/shop",
    title: "Pilgrim Secrets of Jeju Island",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-muted/20">
      {/* Slider Wrapper */}
      <div className="relative aspect-[2/1] sm:aspect-[2.8/1] md:aspect-[3/1] lg:aspect-[3/1] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <Link to={banners[index].link}>
              <img
                src={banners[index].image}
                alt={banners[index].title}
                className="w-full h-full object-cover object-center select-none cursor-pointer"
                loading="eager"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2.5 rounded-full bg-white/70 hover:bg-white text-foreground shadow-md transition-all z-10 cursor-pointer hidden sm:block"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2.5 rounded-full bg-white/70 hover:bg-white text-foreground shadow-md transition-all z-10 cursor-pointer hidden sm:block"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        {/* Indicators Strip */}
        <div className="absolute bottom-2.5 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === i ? "w-4 md:w-6 bg-[#2A5EE1]" : "w-1.5 md:w-2 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
