"use client";

import Image from "next/image";

const HERO_IMAGES = {
  smarttv: {
    src: "/images/hero/herotop1smarttv.png",
    alt: "Hero Smart TV",
  },
  xiaomi: {
    src: "/images/hero/herotop2xiaomiseguro.png",
    alt: "Hero Xiaomi Seguro",
  },
};

export default function CarouselHero({ category }) {
  const hero = HERO_IMAGES[category];

  if (!hero) return null;

  return (
    <div className="max-w-[1360px] mx-auto px-6 mb-8">
      <div className="relative w-full h-36 sm:h-48 md:h-64 rounded-xl overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1360px) 90vw, 1360px"
          quality={90}
        />
      </div>
    </div>
  );
}
