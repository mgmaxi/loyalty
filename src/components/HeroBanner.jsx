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
    <div className="w-full bg-white border-b border-gray-200 overflow-hidden mb-12">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center min-h-[340px]">

        {/* Left — Product image with oval bg */}
        <div className="relative flex-1 flex items-center justify-center py-8">
          {/* Oval background */}
          <div
            className="absolute w-[420px] h-[300px] rounded-[50%]"
            style={{ backgroundColor: campana.bg }}
          />
          <img
            src={campana.imagen}
            alt="Producto destacado"
            className="relative z-10 h-[280px] w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right — Text */}
        <div className="flex-1 flex flex-col items-start pl-8">
          {/* Badge */}
          <span className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-widest">
            {campana.badge}
          </span>

          {/* Title */}
          <h2 className="text-[52px] font-black text-gray-800 leading-none mb-1">
            {campana.titulo}{" "}
            <span className="text-[#0038FF]">{nivelConfig?.label || campana.subtitulo}</span>
          </h2>

          {/* Cuotas block */}
          <div className="flex items-center gap-3 my-4">
            <span className="text-2xl font-semibold text-gray-700">Hasta</span>
            <span className="text-[90px] font-black text-[#0038FF] leading-none">{cuotasInfo}</span>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-semibold text-gray-700">cuotas</span>
              <span className="text-2xl font-semibold text-gray-700">sin interés</span>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-2 bg-[#EC4899] hover:bg-[#D81B60] text-white font-bold px-12 py-3 rounded-full text-base transition-colors shadow-md">
            {isAdherido ? "Ver beneficios" : "Ver más"}
          </button>
        </div>

      </div>
    </div>
  );
}
