"use client";

import { CATEGORIAS } from "@/data/products";

export default function CategoriesStrip() {
  return (
    <div className="w-full bg-white py-8 px-4 border-b border-gray-100">
      <div className="max-w-[1360px] mx-auto">
        {/* Title */}
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-6">
          Categorías
        </h2>

        {/* Horizontal Scrollable Categories */}
        <div className="flex gap-8 justify-center flex-wrap">
          {CATEGORIAS.map((categoria, idx) => (
            <button
              key={`${categoria.slug}-${idx}`}
              className="flex flex-col items-center gap-3 flex-shrink-0 group transition-all duration-300 hover:scale-110 active:scale-95"
            >
              {/* Circle with hover effect */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 flex items-center justify-center text-3xl group-hover:border-[#0038FF] group-hover:from-blue-50 group-hover:to-blue-100 group-hover:shadow-lg transition-all duration-300">
                  {categoria.icon}
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-full bg-[#0038FF] opacity-0 group-hover:opacity-10 group-hover:blur-lg transition-all duration-300"></div>
              </div>

              {/* Label */}
              <span className="text-xs font-bold text-gray-700 text-center max-w-20 group-hover:text-[#0038FF] transition-colors duration-300">
                {categoria.nombre}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
