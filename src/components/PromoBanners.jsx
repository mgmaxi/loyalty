"use client";

import { ChevronRight, Watch, Sofa } from "lucide-react";

export default function PromoBanners() {
  return (
    <div className="w-full px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Banner - Tech & Electronics */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white group cursor-pointer transition-transform duration-300 hover:scale-105">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500"></div>

          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="mb-4">
              <Watch className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-black mb-2 leading-tight">
              Smartwatch y Proyectores
            </h3>
            <p className="text-base text-white/90 mb-6 font-semibold">
              Acceso a la última tecnología con financiación disponible
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all hover:gap-3">
              Ver productos
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
        </div>

        {/* Right Banner - Home & Furniture */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white group cursor-pointer transition-transform duration-300 hover:scale-105">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500"></div>

          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="mb-4">
              <Sofa className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-black mb-2 leading-tight">
              ¡Dale vida a tus espacios!
            </h3>
            <p className="text-base text-white/90 mb-6 font-semibold">
              Muebles, decoración y electrodomésticos para el hogar
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all hover:gap-3">
              Ver productos
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
        </div>
      </div>
    </div>
  );
}
