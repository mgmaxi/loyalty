"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({
  title,
  productos,
  perfil,
  config,
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-[1360px] mx-auto">
        {/* Title */}
        <h2 className="text-[28px] font-black text-[#1A1A2E] mb-6">
          {title}
        </h2>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="flex-shrink-0"
                style={{ width: "280px" }}
              >
                <ProductCard
                  producto={producto}
                  perfil={perfil}
                  config={config}
                />
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-[#0038FF]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight className="w-6 h-6 text-[#0038FF]" />
          </button>
        </div>
      </div>
    </div>
  );
}
