"use client";

import { useState } from "react";
import { X, ChevronRight, AlertTriangle, Rocket, Target } from "lucide-react";
import { getEscenarioCPPG } from "@/lib/segmentation";

/**
 * PopupNoAdherido - Full-screen modal for non-members
 */
export function PopupNoAdherido({ onClose }) {
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#0038FF] via-[#4A8CFF] to-[#EC4899] p-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-4xl animate-bounce">
            ⭐
          </div>
          <h2 className="text-3xl font-black text-white mb-2">
            ¡Sumate al Programa de Fidelización!
          </h2>
          <p className="text-white/90 text-sm font-medium">
            Accedé a beneficios exclusivos
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Benefits List with Icons */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 group hover:bg-blue-50 p-2 rounded-lg transition">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  18 cuotas sin interés en Tienda Macro
                </p>
                <p className="text-xs text-gray-500">Y hasta más como Socio</p>
              </div>
            </div>

            <div className="flex items-start gap-3 group hover:bg-purple-50 p-2 rounded-lg transition">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-600 font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  30% ahorro en Tienda Macro
                </p>
                <p className="text-xs text-gray-500">Desde Nivel 2 en adelante</p>
              </div>
            </div>

            <div className="flex items-start gap-3 group hover:bg-emerald-50 p-2 rounded-lg transition">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Envío gratis
                </p>
                <p className="text-xs text-gray-500">En todos tus envíos</p>
              </div>
            </div>

            <div className="flex items-start gap-3 group hover:bg-amber-50 p-2 rounded-lg transition">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-600 font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Productos y experiencias exclusivos
                </p>
                <p className="text-xs text-gray-500">Solo para Socios</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-col">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-[#0038FF] to-[#4A8CFF] rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              ¡Quiero adherirme!
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Ahora no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * BannerRiesgoBaja - Warning banner for level drop risk
 */
function BannerRiesgoBaja({ escenario, perfil, config }) {
  const nivelActual = config.niveles[perfil.nivelReal];
  const insigniasFaltantesText =
    perfil.insigniasFaltantes === 1
      ? "1 insignia"
      : `${perfil.insigniasFaltantes} insignias`;

  return (
    <div className="w-full bg-gradient-to-r from-red-50 via-orange-50 to-red-50 border-l-4 border-red-500 rounded-xl p-6 mb-6 shadow-md animate-in slide-in-from-top duration-300">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            ⚠️ Riesgo de baja de nivel
          </h3>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Para mantener tu nivel{" "}
            <span className="font-bold text-red-600">{nivelActual?.nombre}</span>, necesitás acumular más insignias CPPG.
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold text-sm">
              Faltan {insigniasFaltantesText}
            </div>
            <p className="text-xs text-gray-500">para recuperar tu posición</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * BannerCercaAscenso - Motivational banner for almost reaching next level
 */
function BannerCercaAscenso({ escenario, perfil, config }) {
  const nivelActual = config.niveles[perfil.nivelReal];
  const nivelProximo = config.niveles[perfil.nivelReal + 1];
  const insigniasAcumuladas = perfil.insigniasAcumuladas;
  const topeMensual = config.reglasCPPG[`topeMensualNivel${perfil.nivelReal + 1}`];
  const progress = Math.min((insigniasAcumuladas / topeMensual) * 100, 100);
  const percentToNext = Math.round(progress);

  return (
    <div className="w-full bg-gradient-to-r from-purple-50 via-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-xl p-6 mb-6 shadow-md animate-in slide-in-from-top duration-300">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">
          <Rocket className="w-7 h-7 text-purple-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            🚀 ¡Casi llegas!
          </h3>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Estás a solo{" "}
            <span className="font-bold text-purple-600">
              {perfil.insigniasFaltantes} insignias
            </span>{" "}
            de alcanzar{" "}
            <span className="font-bold">{nivelProximo?.nombre}</span> {nivelProximo?.icon}
          </p>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-600">
                Progreso: {percentToNext}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-purple-200">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              {insigniasAcumuladas.toLocaleString("es-AR")} /{" "}
              {topeMensual.toLocaleString("es-AR")} insignias
            </span>
            <div className="flex items-center gap-1 font-bold text-purple-600">
              <span>{nivelProximo?.icon}</span>
              <span>{nivelProximo?.nombre}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * BannerNivelMaximo - Celebration banner for premium level
 */
function BannerNivelMaximo({ escenario, config }) {
  return (
    <div className="w-full bg-gradient-to-r from-[#F0F0FF] via-gray-50 to-[#F0F0FF] border-l-4 rounded-xl p-6 mb-6 shadow-md animate-in slide-in-from-top duration-300" style={{ borderColor: "#1A1A2E" }}>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            👑 ¡Sos Socio!
          </h3>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Disfrutá de beneficios exclusivos y una experiencia sin comparación. Tu lealtad es nuestro valor más importante.
          </p>
          <div className="flex gap-2 flex-wrap">
            <div className="text-white px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: "#1A1A2E" }}>
              ⭐ 18 cuotas sin interés
            </div>
            <div className="text-white px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: "#1A1A2E" }}>
              ⭐ 30% ahorro Tienda Macro
            </div>
            <div className="text-white px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: "#1A1A2E" }}>
              ⭐ Atención Concierge
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * BannerTopeCPPG - Banner for reaching monthly CPPG limit
 */
function BannerTopeCPPG({ escenario }) {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-l-4 border-emerald-500 rounded-xl p-6 mb-6 shadow-md animate-in slide-in-from-top duration-300">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">
          <Target className="w-7 h-7 text-emerald-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            🎯 ¡Tope CPPG alcanzado!
          </h3>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Excelente, completaste tu cuota mensual de insignias. Podés seguir comprando y acumulando puntos en otras categorías.
          </p>
          <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
            Explorar Tenencia
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * InlineBanner - Wrapper component that renders the correct banner based on escenario
 */
export function InlineBanner({ escenario, perfil, config }) {
  // Don't show inline banner for non-adheridos - they get the popup instead
  if (!perfil.adherido) {
    return null;
  }

  switch (escenario.tipo) {
    case "riesgo_baja":
      return <BannerRiesgoBaja escenario={escenario} perfil={perfil} config={config} />;

    case "cerca_ascenso":
      return <BannerCercaAscenso escenario={escenario} perfil={perfil} config={config} />;

    case "nivel_maximo":
      return <BannerNivelMaximo escenario={escenario} config={config} />;

    case "tope_cppg":
      return <BannerTopeCPPG escenario={escenario} />;

    default:
      return null;
  }
}
