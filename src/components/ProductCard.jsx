"use client";

import { Truck, ShoppingCart, Star } from "lucide-react";
import { getPrecioPersonalizado, esProductoVisible, formatPrecio } from "@/lib/segmentation";

export default function ProductCard({ producto, perfil, config }) {
  if (!esProductoVisible(producto, perfil)) {
    return null;
  }

  const { precio, cuotas, descuentoAplicado } = getPrecioPersonalizado(producto, perfil, config);

  // Calculate display values
  const precioBase = producto.precio;
  const precioOriginal = producto.precioOriginal || producto.precio;
  const tieneDescuentoProducto = producto.descuento > 0;
  const tieneDescuentoNivel = descuentoAplicado > 0;
  const cuotaValor = Math.round(precio / cuotas);
  const tieneEnvioGratis = producto.envioGratis || false;
  const esExclusivo = producto.exclusivoNivel ? true : false;

  const nivelConfig = perfil.adherido && perfil.nivelReal > 0 ? config.niveles[perfil.nivelReal] : null;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative bg-gray-50 h-56 flex items-center justify-center overflow-hidden border-b border-gray-100">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-3xl">📦</span>
            </div>
          </div>
        )}

        {/* Badges container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {/* Product discount badge */}
          {tieneDescuentoProducto && (
            <span className="bg-[#EC4899] text-white px-2.5 py-1 rounded-md font-bold text-[11px] shadow-sm">
              {producto.descuento}% OFF
            </span>
          )}

          {/* Level discount badge */}
          {tieneDescuentoNivel && (
            <span
              className="text-white px-2.5 py-1 rounded-md font-bold text-[11px] shadow-sm flex items-center gap-1"
              style={{ backgroundColor: nivelConfig?.color || "#3B82F6" }}
            >
              <Star className="w-3 h-3" />
              {descuentoAplicado}% Nivel
            </span>
          )}
        </div>

        {/* Exclusive badge */}
        {esExclusivo && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2.5 py-1 rounded-md font-bold text-[10px] tracking-wider shadow-sm">
            EXCLUSIVO
          </div>
        )}

        {/* Free shipping */}
        {tieneEnvioGratis && (
          <div className="absolute bottom-3 left-3 bg-emerald-500 text-white px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1 shadow-sm">
            <Truck className="w-3 h-3" />
            Envío Gratis
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Seller */}
        <p className="text-[11px] text-gray-400 font-medium mb-1.5 uppercase tracking-wide">
          {producto.vendedor || "Vendedor"}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-[13px] text-gray-900 line-clamp-2 mb-3 leading-snug min-h-[36px]">
          {producto.nombre}
        </h3>

        {/* Price section */}
        <div className="mb-2">
          {/* Original price (strikethrough) */}
          {(tieneDescuentoProducto || tieneDescuentoNivel) && precioOriginal > precio && (
            <p className="text-[12px] text-gray-400 line-through mb-0.5">
              ${formatPrecio(precioOriginal)}
            </p>
          )}

          {/* Current price */}
          <p className={`text-xl font-bold ${tieneDescuentoNivel ? "text-[#0038FF]" : "text-gray-900"}`}>
            ${formatPrecio(precio)}
          </p>
        </div>

        {/* Installments */}
        <p className="text-[12px] text-gray-600 mb-1">
          Hasta{" "}
          <span className="font-bold text-[#0038FF]">{cuotas}</span>{" "}
          cuotas sin interés de{" "}
          <span className="font-semibold">${formatPrecio(cuotaValor)}</span>
        </p>

        {/* Tax notice */}
        <p className="text-[10px] text-gray-400 mb-4">
          *Precio sin Impuestos Nacionales
        </p>

        {/* Add to cart button */}
        <button className="w-full mt-auto bg-[#0038FF] hover:bg-[#0030DD] text-white py-2.5 rounded-lg font-semibold text-[13px] transition-colors flex items-center justify-center gap-2 shadow-sm">
          <ShoppingCart className="w-4 h-4" />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
