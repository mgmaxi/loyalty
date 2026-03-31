"use client";

export default function BrandsStrip() {
  const MARCAS_LOGOS = [
    { nombre: "HP", logo: "https://cdn.simpleicons.org/hp/0096D6" },
    { nombre: "Xiaomi", logo: "https://cdn.simpleicons.org/xiaomi/FF6900" },
    { nombre: "Sony", logo: "https://cdn.simpleicons.org/sony/000000" },
    { nombre: "Apple", logo: "https://cdn.simpleicons.org/apple/000000" },
    { nombre: "Samsung", logo: "https://cdn.simpleicons.org/samsung/1428A0" },
    { nombre: "JBL", logo: "https://cdn.simpleicons.org/jbl/000000" },
    { nombre: "Google", logo: "https://cdn.simpleicons.org/google/4285F4" },
    { nombre: "Motorola", logo: "https://cdn.simpleicons.org/motorola/E1000F" },
  ];

  return (
    <div className="w-full bg-white py-8 px-4 border-t border-gray-200">
      <div className="max-w-[1360px] mx-auto">
        {/* Title (optional) */}
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 text-center">
          Marcas disponibles
        </h3>

        {/* Brands grid */}
        <div className="flex gap-8 justify-center flex-wrap pb-4">
          {MARCAS_LOGOS.map((marca, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center flex-shrink-0 group cursor-pointer transition"
            >
              {/* Logo container */}
              <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 group-hover:bg-gray-100 group-hover:border-gray-300 transition-all">
                <img
                  src={marca.logo}
                  alt={marca.nombre}
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/48?text=" + marca.nombre.charAt(0);
                  }}
                />
              </div>
              {/* Brand name */}
              <p className="text-[12px] font-semibold text-gray-700 mt-2 text-center group-hover:text-[#0038FF] transition">
                {marca.nombre}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
