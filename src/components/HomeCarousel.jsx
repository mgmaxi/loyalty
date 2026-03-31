"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const CAROUSEL_IMAGES = [
  { id: 1, src: "/images/carousel/img1carrousel.png", alt: "Promoción 1" },
  { id: 2, src: "/images/carousel/img2carousel.png", alt: "Promoción 2" },
  { id: 3, src: "/images/carousel/img3carousel.png", alt: "Promoción 3" },
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length
    );
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    setAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 mb-12">
      <div
        className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden bg-gray-900 group"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {/* Carousel slides */}
        <div className="relative w-full h-full">
          {CAROUSEL_IMAGES.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1360px) 90vw, 1360px"
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {CAROUSEL_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/70 w-2"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
