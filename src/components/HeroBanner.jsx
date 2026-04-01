"use client";

export default function HeroBanner({ perfil, config }) {
  const isAdherido = perfil?.adherido || false;
  const nivelReal = perfil?.nivelReal || 0;
  const nivelConfig = nivelReal > 0 ? config?.niveles?.[nivelReal] : null;
  const cuotasInfo = nivelConfig?.cuotasMax || 12;

  // Seleccionar imagen y campaña según nivel
  const campanas = {
    0: {
      titulo: "Especial",
      subtitulo: "Programa Selecta",
      imagen: "/images/products/Celulares/Celular-Quantum-Q30-Octa-Core-6.png",
      bg: "#E8F4FF",
      badge: "Adherite ahora",
    },
    1: {
      titulo: "Especial",
      subtitulo: "Nivel Inicial",
      imagen: "/images/products/Smart-Tv/Smart-TV-UHD-4-K-Samsung-80.png",
      bg: "#F0F4FF",
      badge: "Productos seleccionados",
    },
    2: {
      titulo: "Especial",
      subtitulo: "Nivel Intermedio",
      imagen: "/images/products/Smart-Tv/Smart-TV-UHD-4-K-Samsung-80.png",
      bg: "#EFF6FF",
      badge: "5% descuento",
    },
    3: {
      titulo: "Especial",
      subtitulo: "Nivel Avanzado",
      imagen: "/images/products/Samsung-S26/Galaxy-S26+-Black-512GB.png",
      bg: "#F5F3FF",
      badge: "10% descuento",
    },
    4: {
      titulo: "Especial",
      subtitulo: "Premium Selecta",
      imagen: "/images/products/Samsung-S26/Galaxy-S26-Ultra-Black-512GB.png",
      bg: "#FFFBEB",
      badge: "15% descuento",
    },
  };

  const campana = campanas[nivelReal] || campanas[0];

  return (
    <div className="w-full bg-white border-b border-gray-200 overflow-hidden mb-8 md:mb-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center min-h-[220px] md:min-h-[340px]">

        {/* Image — top on mobile, left on desktop */}
        <div className="relative flex-1 flex items-center justify-center py-5 md:py-8 w-full md:w-auto">
          {/* Oval background */}
          <div
            className="absolute w-[200px] h-[140px] md:w-[420px] md:h-[300px] rounded-[50%]"
            style={{ backgroundColor: campana.bg }}
          />
          <img
            src={campana.imagen}
            alt="Producto destacado"
            className="relative z-10 h-[160px] md:h-[280px] w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Text — below image on mobile, right on desktop */}
        <div className="flex-1 flex flex-col items-center md:items-start pb-6 md:pb-0 md:pl-8 text-center md:text-left">
          {/* Badge */}
          <span className="text-xs md:text-sm font-semibold text-gray-500 mb-1 uppercase tracking-widest">
            {campana.badge}
          </span>

          {/* Title */}
          <h2 className="text-[28px] md:text-[52px] font-black text-gray-800 leading-none mb-1">
            {campana.titulo}{" "}
            <span className="text-[#0038FF]">{nivelConfig?.label || campana.subtitulo}</span>
          </h2>

          {/* Cuotas block */}
          <div className="flex items-center gap-2 md:gap-3 my-3 md:my-4">
            <span className="text-lg md:text-2xl font-semibold text-gray-700">Hasta</span>
            <span className="text-[56px] md:text-[90px] font-black text-[#0038FF] leading-none">{cuotasInfo}</span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-2xl font-semibold text-gray-700">cuotas</span>
              <span className="text-lg md:text-2xl font-semibold text-gray-700">sin interés</span>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-2 bg-[#EC4899] hover:bg-[#D81B60] text-white font-bold px-8 md:px-12 py-2.5 md:py-3 rounded-full text-sm md:text-base transition-colors shadow-md">
            {isAdherido ? "Ver beneficios" : "Ver más"}
          </button>
        </div>

      </div>
    </div>
  );
}
