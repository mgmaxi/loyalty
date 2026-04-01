"use client";

import { useState } from "react";
import { ChevronUp, Settings } from "lucide-react";
import { getEscenarioCPPG } from "@/lib/segmentation";
import { DEFAULT_CONFIG } from "@/data/config";

export default function ProfileSwitcher({
  perfiles,
  perfilActivo,
  onSelect,
  config = DEFAULT_CONFIG,
  onGoAdmin,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLevelColor = (nivelReal) => {
    const nivel = config.niveles[nivelReal];
    return nivel?.color || "#94A3B8";
  };

  const getScenarioLabel = (perfil) => {
    const escenario = getEscenarioCPPG(perfil, config);
    const labels = {
      no_adherido: "No adherido",
      riesgo_baja: "En riesgo",
      cerca_ascenso: "Ascenso cerca",
      nivel_maximo: "Premium",
      tope_cppg: "Tope",
      normal: "Activo",
    };
    return labels[escenario.tipo] || "Activo";
  };

  const handleSelectProfile = (perfil) => {
    onSelect(perfil);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 mb-4">
      {/* Expanded List - Positioned above pill */}
      {isExpanded && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200 w-[calc(100vw-2rem)] max-w-sm md:w-96">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0038FF] to-[#4A8CFF] px-6 py-4">
              <h3 className="font-black text-white text-lg">Cambiar perfil</h3>
              <p className="text-white/80 text-xs font-medium mt-1">
                Selecciona un cliente para simular experiencia
              </p>
            </div>

            {/* Profile List */}
            <div className="divide-y divide-gray-100">
              {perfiles.map((perfil) => {
                const isActive = perfilActivo?.id === perfil.id;
                const nivel = config.niveles[perfil.nivelReal];
                const escenario = getEscenarioCPPG(perfil, config);

                return (
                  <button
                    key={perfil.id}
                    onClick={() => handleSelectProfile(perfil)}
                    className={`w-full px-6 py-4 flex items-center gap-4 transition hover:bg-gray-50 ${
                      isActive ? "bg-blue-50" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md"
                      style={{ backgroundColor: getLevelColor(perfil.nivelReal) }}
                    >
                      {`${perfil.nombres.charAt(0)}${perfil.apellido.charAt(0)}`.toUpperCase()}
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900 text-sm">
                          {perfil.nombres} {perfil.apellido}
                        </p>
                        {isActive && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                            ACTUAL
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{nivel?.icon}</span>
                        <span className="text-xs text-gray-600 font-semibold">
                          {nivel?.nombre}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded font-bold"
                          style={{
                            backgroundColor: `${escenario.color}20`,
                            color: escenario.color,
                          }}
                        >
                          {getScenarioLabel(perfil)}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200"></div>

            {/* Back Office Button */}
            <button
              onClick={() => {
                setIsExpanded(false);
                onGoAdmin?.();
              }}
              className="w-full px-6 py-4 flex items-center gap-3 hover:bg-blue-50 transition text-[#0038FF] font-bold text-sm"
            >
              <Settings className="w-4 h-4" />
              Ir al Back Office
            </button>
          </div>
        </div>
      )}

      {/* Collapsed Pill */}
      <div className="flex items-center gap-3 mx-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-5 py-3 bg-gradient-to-r from-[#0038FF] to-[#2563EB] rounded-full shadow-xl hover:shadow-2xl transition flex items-center gap-3 text-white font-bold"
        >
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
            style={{
              backgroundColor: getLevelColor(perfilActivo?.nivelReal || 0),
            }}
          >
            {`${perfilActivo?.nombres?.charAt(0)}${perfilActivo?.apellido?.charAt(0)}`.toUpperCase()}
          </div>

          {/* Profile Name and Scenario */}
          <div className="text-left">
            <p className="text-sm font-bold leading-tight">
              {perfilActivo?.nombres}
            </p>
            <p className="text-xs opacity-80 leading-tight">
              {getScenarioLabel(perfilActivo)}
            </p>
          </div>

          {/* Chevron */}
          <ChevronUp
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Back Office Quick Button */}
        <button
          onClick={() => onGoAdmin?.()}
          className="px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-sm transition border border-white/20"
          title="Ir al Back Office"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
