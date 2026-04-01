"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import { SEARCH_HINTS } from "@/data/products";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";

export default function Header({ perfil, config, currentView, setCurrentView }) {
  const [hintIdx, setHintIdx] = useState(0);
  const nivelConfig = perfil.adherido && perfil.nivelReal > 0 ? config.niveles[perfil.nivelReal] : null;

  useEffect(() => {
    const t = setInterval(() => setHintIdx((i) => (i + 1) % SEARCH_HINTS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const NAV_ITEMS = [
    { label: "PRODUCTOS", arrow: true },
    { label: "ESPECIAL MUNDIAL", arrow: false },
    { label: "LANZAMIENTO SAMSUNG", arrow: false },
    { label: "ESPECIAL XIAOMI", arrow: false },
    { label: "ENVÍO GRATIS", arrow: false },
    { label: "CAMBIÁ TUS PUNTOS", arrow: true },
    { label: "VIAJES", arrow: false },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top white bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo height="h-9" onClick={() => setCurrentView("tienda")} />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-[600px] relative">
            <input
              type="text"
              placeholder={`Buscar ${SEARCH_HINTS[hintIdx]}`}
              className="w-full py-2.5 pl-4 pr-12 rounded-lg border border-gray-300 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0038FF] focus:ring-1 focus:ring-[#0038FF] transition-colors"
            />
            <button className="absolute right-0 top-0 bottom-0 w-11 bg-gray-100 border border-gray-300 border-l-0 rounded-r-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
            {/* Sacá tu tarjeta */}
            <button className="border-2 border-[#0038FF] text-[#0038FF] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
              Sacá tu tarjeta
            </button>

            {/* User icon */}
            <div className="flex flex-col items-center cursor-pointer group">
              <User className="w-6 h-6 text-gray-600 group-hover:text-[#0038FF] transition-colors" />
              <span className="text-[10px] text-gray-500 group-hover:text-[#0038FF] transition-colors mt-0.5">
                {perfil.nombres?.split(" ")[0] || "Ingresá"}
              </span>
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer flex flex-col items-center group">
              <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-[#0038FF] transition-colors" />
              <span className="absolute -top-1 -right-1 bg-[#EC4899] text-white rounded-full w-[16px] h-[16px] flex items-center justify-center text-[9px] font-bold">
                2
              </span>
              <span className="text-[10px] text-gray-500 group-hover:text-[#0038FF] transition-colors mt-0.5">
                Carrito
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blue nav */}
      <nav className="bg-[#0038FF] overflow-x-auto scrollbar-hide">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1 text-white font-semibold text-[12px] tracking-wide px-4 py-3 hover:bg-white/10 transition-colors whitespace-nowrap flex-shrink-0"
            >
              {item.label}
              {item.arrow && <ChevronDown className="w-3 h-3 opacity-80" />}
            </button>
          ))}

          {/* Nivel X Selecta */}
          {perfil.adherido && perfil.nivelReal > 0 && (
            <button
              onClick={() => setCurrentView(currentView === "loyalty" ? "tienda" : "loyalty")}
              className="ml-auto flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-4 py-1.5 rounded-lg font-semibold text-[12px] transition-all flex-shrink-0"
            >
              <span>{nivelConfig?.icon}</span>
              Nivel {perfil.nivelReal} Selecta
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
