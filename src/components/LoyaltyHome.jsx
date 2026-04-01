"use client";

import { useState, useEffect } from "react";
import { DEFAULT_CONFIG, BENEFICIOS_RECOMPENSAS } from "@/data/config";
import { CheckCircle2, AlertCircle, TrendingUp, XCircle, Star, Zap, Shield, Award } from "lucide-react";

// ─── Constantes de UI ───────────────────────────────────────────────────────

const PILAR_ICONS = {
  beneficiosAhorros: "💰",
  productos: "📊",
  experiencias: "🎭",
  servicio: "🎯",
};

// Copy de pertenencia por nivel
const NIVEL_IDENTITY = {
  1: {
    headline: "Comenzaste tu camino",
    sub: "Cada compra te acerca a más beneficios. Seguí sumando insignias.",
    motivacion: "Próximo paso: accedé al 30% ahorro en Tienda Macro alcanzando Nivel 2.",
  },
  2: {
    headline: "Avanzás con ventaja",
    sub: "Ya tenés 30% ahorro con Tarjeta de Crédito todos los días. Seguí creciendo.",
    motivacion: "Próximo paso: sumate el débito, Turismo y Ejecutivo Asignado en Nivel 3.",
  },
  3: {
    headline: "Sos parte del grupo élite",
    sub: "Disfrutás de los beneficios más completos del programa. Estás cerca del máximo.",
    motivacion: "Próximo paso: convertite en Socio y accedé a Concierge + YPF Full.",
  },
  4: {
    headline: "Bienvenido, Socio",
    sub: "Formas parte de un grupo exclusivo. Tu relación con el Banco está en su nivel más alto.",
    motivacion: null,
  },
};

// Logros / achievements por nivel (acumulativos)
const LOGROS = [
  { id: "primer_nivel",   icon: "🏁", label: "Primer nivel",       desc: "Te uniste al programa",           desde: 1 },
  { id: "ahorro_tc",      icon: "💳", label: "30% con TC",         desc: "30% ahorro con Tarjeta de Crédito", desde: 2 },
  { id: "supermercados",  icon: "🛒", label: "Super Miércoles",    desc: "Ahorro en supermercados",           desde: 2 },
  { id: "debito",         icon: "🏦", label: "Débito activado",    desc: "Sumás Tarjeta de Débito al ahorro", desde: 3 },
  { id: "plazo_fijo",     icon: "📈", label: "Plazo Fijo",         desc: "Tasa preferencial disponible",      desde: 3 },
  { id: "preventa",       icon: "🎟️", label: "Preventa exclusiva", desc: "Acceso anticipado a espectáculos",  desde: 3 },
  { id: "concierge",      icon: "🤝", label: "Concierge",          desc: "Atención personalizada 24/7",       desde: 4 },
  { id: "ypf_full",       icon: "⛽", label: "YPF Full",           desc: "Beneficio combustible premium",     desde: 4 },
  { id: "vip",            icon: "👑", label: "Espacio VIP",        desc: "Acceso VIP en espectáculos",        desde: 4 },
];

// Beneficio destacado del mes por nivel
const BENEFICIO_DESTACADO = {
  1: { emoji: "⛽", titulo: "Este miércoles en YPF", desc: "30% ahorro en combustible · Tope $25.000", color: "#0038FF" },
  2: { emoji: "🛒", titulo: "Este miércoles en supermercados", desc: "30% ahorro con TC · Tope $40.000", color: "#3B82F6" },
  3: { emoji: "🏠", titulo: "Turismo nacional hoy", desc: "12 cuotas s/interés + 30% ahorro", color: "#8B5CF6" },
  4: { emoji: "🎟️", titulo: "Preventa exclusiva activa", desc: "Tickets con Espacio VIP · Meet & Greet", color: "#1A1A2E" },
};

function formatTope(tope) {
  if (!tope) return null;
  return `Tope $${tope.toLocaleString("es-AR")}`;
}

// ─── Componente ─────────────────────────────────────────────────────────────

export default function LoyaltyHome({ perfil, config = DEFAULT_CONFIG }) {
  const nivelActual   = config.niveles[perfil.nivelReal];
  const nivelSiguiente = perfil.nivelReal < 4 ? config.niveles[perfil.nivelReal + 1] : null;
  const topeMensual   = config.reglasCPPG[`topeMensualNivel${perfil.nivelReal}`];
  const topeSiguiente = perfil.nivelReal < 4
    ? config.reglasCPPG[`topeMensualNivel${perfil.nivelReal + 1}`]
    : null;

  const progressPercent = Math.min((perfil.insigniasAcumuladas / topeMensual) * 100, 100);
  const progressSiguiente = topeSiguiente
    ? Math.min((perfil.insigniasAcumuladas / topeSiguiente) * 100, 100)
    : 100;

  const enPeriodoGracia = perfil.nivelCalculado < perfil.nivelReal;
  const identity        = NIVEL_IDENTITY[perfil.nivelReal];
  const destacado       = BENEFICIO_DESTACADO[perfil.nivelReal];
  const logrosActivos   = LOGROS.filter((l) => perfil.nivelReal >= l.desde);
  const logrosPendientes = LOGROS.filter((l) => perfil.nivelReal < l.desde);

  // Animación de nivel: dispara al montar el componente
  const [showLevelAnim, setShowLevelAnim] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowLevelAnim(true), 100);
    return () => clearTimeout(t);
  }, [perfil.nivelReal]);

  return (
    <div className="w-full px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* ── HERO HEADER ──────────────────────────────────────────────── */}
        <div className="mb-10 animate-slideUp">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg flex-shrink-0
                ${showLevelAnim ? "animate-levelUpBurst" : "opacity-0"}`}
              style={{ backgroundColor: nivelActual?.colorBg, border: `2px solid ${nivelActual?.color}` }}
            >
              {nivelActual?.icon}
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                {identity?.headline}
              </h1>
              <p className="text-gray-500 text-sm font-medium mt-1 max-w-xl">
                {identity?.sub}
              </p>
            </div>
          </div>
        </div>

        {/* ── ALERTA PERÍODO DE GRACIA ─────────────────────────────────── */}
        {enPeriodoGracia && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-xl p-5 mb-8 animate-slideDown">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">⚠️ Período de gracia activo</p>
                <p className="text-gray-700 text-sm mb-2">
                  Tu nivel calculado bajó a{" "}
                  <span className="font-bold">{config.niveles[perfil.nivelCalculado]?.nombre}</span>.
                  Tenés <span className="font-bold text-orange-600">60 días</span> para recuperar tus insignias.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FILA 1: nivel + insignias + beneficio destacado ──────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Card Nivel */}
          <div
            className="rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slideUp animate-stagger-1 flex flex-col justify-center p-8"
            style={{ backgroundColor: nivelActual?.colorBg }}
          >
            <div className="flex justify-center mb-4">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-lg bg-white
                  ${showLevelAnim ? "animate-levelUpBurst" : "opacity-0"}`}
              >
                {nivelActual?.icon}
              </div>
            </div>
            <h2 className="text-center text-2xl font-black text-gray-900 mb-1">
              {nivelActual?.nombre}
            </h2>
            <div
              className="w-full h-3 rounded-full shadow-sm mt-6 mb-3 animate-progressFill"
              style={{ background: `linear-gradient(to right, ${nivelActual?.color}, #fff)` }}
            />
            <p className="text-center text-xs text-gray-500 font-medium">
              {perfil.nivelReal < 4 ? `Nivel ${perfil.nivelReal} de 4` : "Nivel máximo · Socio"}
            </p>
          </div>

          {/* Card Insignias + progreso hacia siguiente nivel */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-slideUp animate-stagger-2">
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-4">
              🏆 Insignias CPPG
            </p>
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black text-[#0038FF] animate-countUp">
                  {perfil.insigniasAcumuladas.toLocaleString("es-AR")}
                </span>
                <span className="text-gray-400 font-semibold text-sm">
                  / {topeMensual.toLocaleString("es-AR")}
                </span>
              </div>
              <p className="text-gray-500 text-xs font-medium">
                {Math.round(progressPercent)}% del objetivo mensual
              </p>
            </div>

            {/* Barra mensual */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-[#0038FF] via-[#4A8CFF] to-[#EC4899] rounded-full animate-progressFill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Progreso hacia siguiente nivel */}
            {nivelSiguiente && (
              <div
                className="rounded-xl p-4 animate-ringPulse"
                style={{ backgroundColor: nivelSiguiente.colorBg, border: `1px solid ${nivelSiguiente.color}30` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: nivelSiguiente.color }}>
                    {nivelSiguiente.icon} Próximo: {nivelSiguiente.nombre}
                  </p>
                  <span className="text-[11px] font-bold text-gray-500">
                    {Math.round(progressSiguiente)}%
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progressSiguiente}%`,
                      backgroundColor: nivelSiguiente.color,
                    }}
                  />
                </div>
                {identity?.motivacion && (
                  <p className="text-[10px] text-gray-500 mt-2 leading-snug">
                    {identity.motivacion}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Beneficio destacado del mes */}
          <div className="rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slideUp animate-stagger-3 flex flex-col">
            <div
              className="px-6 pt-5 pb-4 text-white"
              style={{ backgroundColor: destacado.color }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">
                Destacado del mes
              </p>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{destacado.emoji}</span>
                <div>
                  <p className="font-black text-base leading-tight">{destacado.titulo}</p>
                  <p className="text-[11px] opacity-85 mt-0.5">{destacado.desc}</p>
                </div>
              </div>
            </div>

            {/* Resumen rápido de recompensas activas */}
            <div className="bg-white flex-1 p-5 overflow-y-auto">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
                ✨ Tus recompensas
              </p>
              <div className="space-y-3">
                {Object.entries(BENEFICIOS_RECOMPENSAS).map(([pilarKey, pilar]) => (
                  <div key={pilarKey}>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <span>{PILAR_ICONS[pilarKey]}</span>
                      {pilar.label}
                    </p>
                    <div className="space-y-1.5">
                      {Object.entries(pilar.items).map(([itemKey, item]) => {
                        const nd = item.niveles[perfil.nivelReal];
                        const activo = nd?.disponible !== false && nd?.descripcion !== "N/A";
                        return (
                          <div key={itemKey} className="flex items-start gap-1.5">
                            {activo ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0038FF] flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-gray-200 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className="text-[11px] font-bold text-gray-700 leading-snug">{item.label}</p>
                              <p className="text-[10px] text-gray-400 leading-snug">
                                {nd?.descripcion}
                                {nd?.tope && (
                                  <span className="text-[#0038FF] font-semibold ml-1">
                                    · {formatTope(nd.tope)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FILA 2: Logros desbloqueados ─────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 animate-slideUp animate-stagger-4">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-5 h-5 text-[#0038FF]" />
            <h2 className="text-xl font-black text-gray-900">Tus logros</h2>
            <span className="ml-auto text-xs font-bold text-gray-400">
              {logrosActivos.length} / {LOGROS.length} desbloqueados
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {LOGROS.map((logro) => {
              const desbloqueado = perfil.nivelReal >= logro.desde;
              return (
                <div
                  key={logro.id}
                  className={`relative rounded-xl p-3 text-center transition-all duration-300 ${
                    desbloqueado
                      ? "bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      : "bg-gray-50 border border-gray-100 opacity-40"
                  }`}
                >
                  {desbloqueado && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <div className="animate-unlockShine absolute inset-0" />
                    </div>
                  )}
                  <div className="text-2xl mb-1.5">{logro.icon}</div>
                  <p className={`text-[11px] font-black leading-tight ${desbloqueado ? "text-gray-800" : "text-gray-400"}`}>
                    {logro.label}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{logro.desc}</p>
                  {!desbloqueado && (
                    <p className="text-[9px] font-bold mt-1" style={{ color: config.niveles[logro.desde]?.color }}>
                      {config.niveles[logro.desde]?.nombre}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FILA 3: Tabla comparativa ────────────────────────────────── */}
        <div className="mb-8 animate-slideUp animate-stagger-5">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#0038FF]" />
            <h2 className="text-3xl font-black text-gray-900">Descubrí tus recompensas</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-gray-50 px-4 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider w-52">
                    Beneficio
                  </th>
                  {[1, 2, 3, 4].map((n) => {
                    const nivel = config.niveles[n];
                    const isCurrent = perfil.nivelReal === n;
                    return (
                      <th
                        key={n}
                        className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider"
                        style={{ backgroundColor: isCurrent ? nivel.color : "#1A1A2E", color: "#fff" }}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {isCurrent && (
                            <span className="bg-white/30 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
                              TU NIVEL
                            </span>
                          )}
                          <span>{nivel.icon}</span>
                          <span>{nivel.nombre}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Object.entries(BENEFICIOS_RECOMPENSAS).map(([pilarKey, pilar]) => (
                  <>
                    <tr key={`pilar-${pilarKey}`}>
                      <td
                        colSpan={5}
                        className="px-4 py-2 text-xs font-black uppercase tracking-wider text-white"
                        style={{ backgroundColor: "#0038FF" }}
                      >
                        {PILAR_ICONS[pilarKey]} {pilar.label}
                      </td>
                    </tr>
                    {Object.entries(pilar.items).map(([itemKey, item], itemIdx) => (
                      <tr key={`${pilarKey}-${itemKey}`} className={itemIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-bold text-gray-800 text-xs border-r border-gray-100">
                          {item.label}
                          {item.sublabel && (
                            <span className="block text-gray-400 font-normal text-[10px]">{item.sublabel}</span>
                          )}
                        </td>
                        {[1, 2, 3, 4].map((n) => {
                          const nd = item.niveles[n];
                          const isCurrent = perfil.nivelReal === n;
                          const isNA = !nd || nd.descripcion === "N/A" || nd.disponible === false;
                          return (
                            <td
                              key={n}
                              className={`px-3 py-3 text-center text-[11px] leading-tight border-r border-gray-100 ${
                                isCurrent ? "bg-blue-50 font-semibold text-blue-900" : "text-gray-600"
                              }`}
                            >
                              {isNA ? (
                                <span className="text-gray-300 font-bold">—</span>
                              ) : (
                                <>
                                  <span>{nd.descripcion}</span>
                                  {nd.tope && (
                                    <span className="block text-[10px] text-[#0038FF] font-bold mt-0.5">
                                      Tope ${nd.tope.toLocaleString("es-AR")}
                                    </span>
                                  )}
                                </>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-right">(CUADRO NO EXHAUSTIVO)</p>
        </div>

      </div>
    </div>
  );
}
