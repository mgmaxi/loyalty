"use client";

import { DEFAULT_CONFIG } from "@/data/config";
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

export default function LoyaltyHome({ perfil, config = DEFAULT_CONFIG }) {
  const nivelActual = config.niveles[perfil.nivelReal];
  const topeMensual = config.reglasCPPG[`topeMensualNivel${perfil.nivelReal}`];
  const progressPercent = Math.min(
    (perfil.insigniasAcumuladas / topeMensual) * 100,
    100
  );

  // Check if in grace period
  const enPeriodoGracia = perfil.nivelCalculado < perfil.nivelReal;
  const diasRestantes = 60; // Fixed grace period

  return (
    <div className="w-full px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-slideUp">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl animate-float">{nivelActual?.icon}</span>
            <div>
              <h1 className="text-4xl font-black text-gray-900">
                Mi Programa Selecta
              </h1>
              <p className="text-gray-600 text-sm font-medium mt-1">
                Seguí tu progreso y disfrutá de beneficios exclusivos
              </p>
            </div>
          </div>
        </div>

        {/* Grace Period Alert */}
        {enPeriodoGracia && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-xl p-5 mb-8 animate-in slide-in-from-top">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">
                  ⚠️ Período de gracia activo
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  Tu nivel calculado bajó a{" "}
                  <span className="font-bold">
                    {config.niveles[perfil.nivelCalculado]?.nombre}
                  </span>
                  . Tenés <span className="font-bold text-orange-600">{diasRestantes} días</span> para recuperar tus insignias. Si no lo logras,
                  bajará tu nivel permanentemente.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    style={{ width: `${(diasRestantes / 60) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3-Column Grid: Level, Points, Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Level Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden animate-slideUp animate-stagger-1">
            <div className="relative overflow-hidden">
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundColor: nivelActual?.color }}
              ></div>

              <div className="relative p-8">
                <div className="flex justify-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-lg animate-glow"
                    style={{ backgroundColor: nivelActual?.colorBg }}
                  >
                    {nivelActual?.icon}
                  </div>
                </div>
                <h2 className="text-center text-2xl font-black text-gray-900 mt-4 mb-1">
                  {nivelActual?.nombre}
                </h2>
                <p className="text-center text-gray-600 font-semibold text-sm mb-6">
                  {nivelActual?.label}
                </p>
                <div
                  className="w-full h-3 rounded-full shadow-sm"
                  style={{
                    background: `linear-gradient(to right, ${nivelActual?.color}, ${nivelActual?.colorBg})`,
                  }}
                ></div>
                <p className="text-center text-xs text-gray-500 mt-3 font-medium">
                  Nivel {perfil.nivelReal} de 4
                </p>
              </div>
            </div>
          </div>

          {/* Insignias Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 p-8 animate-slideUp animate-stagger-2">
            <div className="mb-2">
              <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mb-4">
                🏆 Insignias CPPG
              </p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-[#0038FF] animate-countUp">
                  {perfil.insigniasAcumuladas.toLocaleString("es-AR")}
                </span>
                <span className="text-gray-500 font-semibold text-sm">
                  / {topeMensual.toLocaleString("es-AR")}
                </span>
              </div>
              <p className="text-gray-600 text-xs font-medium">
                {Math.round(progressPercent)}% del objetivo mensual
              </p>
            </div>
            {/* Animated Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300">
                <div
                  className="h-full bg-gradient-to-r from-[#0038FF] via-[#4A8CFF] to-[#EC4899] rounded-full shadow-sm animate-progressFill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-[10px] text-gray-500 font-bold">0</p>
                <p className="text-[10px] text-gray-500 font-bold">
                  {topeMensual.toLocaleString("es-AR")}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 p-8 animate-slideUp animate-stagger-3">
            <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mb-5">
              ✨ Beneficios activos
            </p>
            <div className="space-y-3">
              {config.beneficiosPorNivel[perfil.nivelReal]?.map(
                (beneficio, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-[#0038FF] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-semibold text-sm leading-snug">
                      {beneficio}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Comparativa de Niveles */}
        <div className="mb-8 animate-slideUp animate-stagger-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-[#0038FF]" />
            <h2 className="text-3xl font-black text-gray-900">
              Comparativa de Niveles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((nivelNum) => {
              const nivel = config.niveles[nivelNum];
              const isCurrentLevel = perfil.nivelReal === nivelNum;
              const isUpcoming = nivelNum > perfil.nivelReal;

              return (
                <div
                  key={nivelNum}
                  className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden group animate-slideUp
                    ${
                      isCurrentLevel
                        ? "border-[#0038FF] bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg scale-105 animate-scalePulse"
                        : isUpcoming
                        ? "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md opacity-80"
                        : "border-gray-200 bg-white hover:shadow-md"
                    }
                  `}
                  style={{
                    animationDelay: `${0.1 + nivelNum * 0.15}s`
                  }}
                >
                  {/* Header */}
                  <div
                    className="p-6 text-white text-center"
                    style={{ backgroundColor: nivel?.color }}
                  >
                    {/* Current Level Badge */}
                    {isCurrentLevel && (
                      <div className="inline-block bg-white/30 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
                        TU NIVEL ACTUAL
                      </div>
                    )}
                    {isUpcoming && (
                      <div className="inline-block bg-white/30 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
                        PRÓXIMO
                      </div>
                    )}

                    {/* Level Icon and Name */}
                    <div className="text-5xl mb-3">{nivel?.icon}</div>
                    <h3 className="text-xl font-black mb-1">
                      {nivel?.nombre}
                    </h3>
                    <p className="text-sm font-semibold opacity-90">
                      {nivel?.label}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Benefits List */}
                    <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                      {config.beneficiosPorNivel[nivelNum]?.map((beneficio, idx) => (
                        <div key={idx} className="flex items-start gap-2 group/item">
                          <span className="text-[#0038FF] font-bold flex-shrink-0 group-hover/item:text-[#EC4899] transition">
                            ✓
                          </span>
                          <span className="text-sm text-gray-700 font-medium leading-snug">
                            {beneficio}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Requirements */}
                    <div className="text-center pt-3">
                      <p className="text-[11px] text-gray-600 font-bold uppercase tracking-wider mb-1">
                        Tope mensual
                      </p>
                      <p className="text-2xl font-black text-gray-900">
                        ${(config.reglasCPPG[`topeMensualNivel${nivelNum}`] / 1000).toFixed(0)}k
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {config.reglasCPPG[`topeMensualNivel${nivelNum}`]?.toLocaleString(
                          "es-AR"
                        )}{" "}
                        insignias
                      </p>
                    </div>

                    {/* Progress indicator for current level */}
                    {isCurrentLevel && (
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                        <p className="text-[11px] text-gray-600 font-semibold mt-2 text-center">
                          {Math.round(progressPercent)}% alcanzado este mes
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
