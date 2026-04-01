"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { DEFAULT_CONFIG, BENEFICIOS_RECOMPENSAS } from "@/data/config";
import { PERFILES_DEMO } from "@/data/profiles";
import { getEscenarioCPPG } from "@/lib/segmentation";

const ESCENARIOS_CPPG = [
  {
    escenario: "No Adherido",
    senalDatos: "adherido = false",
    objetivo: "Adhesión",
    accion: "Mostrar banner de bienvenida",
  },
  {
    escenario: "Riesgo de Baja",
    senalDatos: "nivelCalculado < nivelReal",
    objetivo: "Retención",
    accion: "Notificación urgente",
  },
  {
    escenario: "Cerca del Ascenso",
    senalDatos: "insigniasFaltantes ≤ 500",
    objetivo: "Upselling",
    accion: "Promoción de siguiente nivel",
  },
  {
    escenario: "Nivel Máximo / Socio",
    senalDatos: "nivelReal = 4",
    objetivo: "Reconocimiento",
    accion: "Beneficios exclusivos Socio",
  },
  {
    escenario: "Tope CPPG",
    senalDatos: "insigniasFaltantes = 0",
    objetivo: "Derivación",
    accion: "Ofrecer productos de tenencia",
  },
];

export default function BackOfficePage() {
  const router = useRouter();
  const [tab, setTab] = useState("niveles");
  const [perfilActivo, setPerfilActivo] = useState(PERFILES_DEMO[0].id);
  const [saveMessage, setSaveMessage] = useState("");
  const [editConfig, setEditConfig] = useState(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editConfig),
      });

      if (response.ok) {
        setSaveMessage("✓ Cambios guardados");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("✗ Error al guardar");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch (error) {
      setSaveMessage("✗ Error de conexión");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleNivelChange = useCallback((nivelId, field, value) => {
    setEditConfig((prev) => ({
      ...prev,
      niveles: {
        ...prev.niveles,
        [nivelId]: { ...prev.niveles[nivelId], [field]: value },
      },
    }));
  }, []);

  const handleReglaChange = useCallback((reglaKey, value) => {
    setEditConfig((prev) => ({
      ...prev,
      reglasCPPG: { ...prev.reglasCPPG, [reglaKey]: value },
    }));
  }, []);

  const handleBeneficioChange = useCallback((nivelId, index, value) => {
    setEditConfig((prev) => ({
      ...prev,
      beneficiosPorNivel: {
        ...prev.beneficiosPorNivel,
        [nivelId]: prev.beneficiosPorNivel[nivelId].map((b, i) =>
          i === index ? value : b
        ),
      },
    }));
  }, []);

  const handleAddBeneficio = useCallback((nivelId) => {
    setEditConfig((prev) => ({
      ...prev,
      beneficiosPorNivel: {
        ...prev.beneficiosPorNivel,
        [nivelId]: [...prev.beneficiosPorNivel[nivelId], "Nuevo beneficio"],
      },
    }));
  }, []);

  const handleDeleteBeneficio = useCallback((nivelId, index) => {
    setEditConfig((prev) => ({
      ...prev,
      beneficiosPorNivel: {
        ...prev.beneficiosPorNivel,
        [nivelId]: prev.beneficiosPorNivel[nivelId].filter((_, i) => i !== index),
      },
    }));
  }, []);

  const perfilSelected = PERFILES_DEMO.find((p) => p.id === perfilActivo);
  const escenario = perfilSelected ? getEscenarioCPPG(perfilSelected, editConfig) : null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Dark Header */}
      <header className="bg-[#1A1A2E] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-xl hover:opacity-80 transition"
          >
            ←
          </button>
          <span className="text-sm font-medium">Volver a Tienda</span>
        </div>

        <Logo height="h-8" />

        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Back Office</h1>
          <button
            onClick={handleSaveChanges}
            className="bg-[#0038FF] hover:bg-[#0028DD] text-white px-4 py-2 rounded font-medium transition flex items-center gap-2"
          >
            Guardar cambios
            {saveMessage && <span className="text-sm">{saveMessage}</span>}
          </button>
        </div>
      </header>

      <div className="flex flex-1 gap-0">
        {/* Left Sidebar */}
        <aside className="w-[260px] bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="p-0">
            {[
              { id: "niveles", label: "Niveles", emoji: "🏅" },
              { id: "reglas", label: "Reglas CPPG", emoji: "⚙️" },
              { id: "beneficios", label: "Recompensas", emoji: "🎁" },
              { id: "simulador", label: "Simulador", emoji: "🔄" },
              { id: "escenarios", label: "Escenarios CPPG", emoji: "📊" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full text-left px-4 py-3 border-l-4 transition ${
                  tab === item.id
                    ? "border-[#0038FF] bg-blue-50 text-[#0038FF] font-medium"
                    : "border-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {tab === "niveles" && (
            <NivelesTab
              config={editConfig}
              onNivelChange={handleNivelChange}
            />
          )}
          {tab === "reglas" && (
            <ReglasTab
              config={editConfig}
              onReglaChange={handleReglaChange}
            />
          )}
          {tab === "beneficios" && (
            <BeneficiosTab config={editConfig} />
          )}
          {tab === "simulador" && (
            <SimuladorTab
              perfiles={PERFILES_DEMO}
              perfilActivo={perfilActivo}
              onSelectPerfil={setPerfilActivo}
              config={editConfig}
            />
          )}
          {tab === "escenarios" && (
            <EscenariosTab
              perfil={perfilSelected}
              escenario={escenario}
              config={editConfig}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ============= TAB COMPONENTS =============

function NivelesTab({ config, onNivelChange }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Niveles</h2>
      <p className="text-gray-600 mb-6">
        Configura los niveles del programa de lealtad y sus parámetros visuales.
      </p>

      <div className="grid gap-6">
        {[1, 2, 3, 4].map((nivelId) => {
          const nivel = config.niveles[nivelId];
          const tmData = BENEFICIOS_RECOMPENSAS.beneficiosAhorros.items.tiendaMacro.niveles[nivelId];
          return (
            <div
              key={nivelId}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: nivel.colorBg }}
                >
                  {nivel.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: nivel.color }}>{nivel.nombre}</h3>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: nivel.colorBg, color: nivel.color }}>
                    {nivel.label}
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200" style={{ backgroundColor: nivel.color }} />
                  <span className="text-xs text-gray-400 font-mono">{nivel.color}</span>
                </div>
              </div>

              {/* Campos editables */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                <InputField
                  label="Nombre"
                  value={nivel.nombre}
                  onChange={(e) => onNivelChange(nivelId, "nombre", e.target.value)}
                />
                <InputField
                  label="Label"
                  value={nivel.label}
                  onChange={(e) => onNivelChange(nivelId, "label", e.target.value)}
                />
                <InputField
                  label="Ícono (emoji)"
                  value={nivel.icon}
                  onChange={(e) => onNivelChange(nivelId, "icon", e.target.value)}
                />
                <InputField
                  label="Color principal"
                  type="color"
                  value={nivel.color}
                  onChange={(e) => onNivelChange(nivelId, "color", e.target.value)}
                />
                <InputField
                  label="Color fondo (hex)"
                  value={nivel.colorBg}
                  onChange={(e) => onNivelChange(nivelId, "colorBg", e.target.value)}
                />
                <InputField
                  label="Cuotas Máx (Tienda Macro)"
                  type="number"
                  value={nivel.cuotasMax}
                  onChange={(e) => onNivelChange(nivelId, "cuotasMax", parseInt(e.target.value))}
                />
              </div>

              {/* Tienda Macro — solo lectura */}
              {tmData && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-[11px] font-black uppercase tracking-widest text-blue-600 mb-3">
                    🛒 Tienda Macro — Beneficio activo
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-white rounded-lg px-3 py-2 border border-blue-100 text-center">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">Cuotas s/interés</p>
                      <p className="text-xl font-black text-[#0038FF]">{tmData.cuotasSinInteres}</p>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 border border-blue-100 text-center">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">Ahorro %</p>
                      <p className="text-xl font-black text-[#0038FF]">{tmData.ahorroPorc > 0 ? `${tmData.ahorroPorc}%` : "—"}</p>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 border border-blue-100 text-center">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">Tope mensual</p>
                      <p className="text-sm font-black text-gray-700">{tmData.tope ? `$${tmData.tope.toLocaleString("es-AR")}` : "Sin tope"}</p>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 border border-blue-100 text-center">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">Label ahorro</p>
                      <p className="text-[10px] font-bold text-gray-700 leading-tight">{tmData.ahorroLabel ?? "—"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Checkboxes */}
              <div className="flex gap-6 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nivel.beneficioEnvio}
                    onChange={(e) => onNivelChange(nivelId, "beneficioEnvio", e.target.checked)}
                    className="w-4 h-4 accent-[#0038FF]"
                  />
                  <span className="text-sm text-gray-700">Envío gratis</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nivel.productosExclusivos}
                    onChange={(e) => onNivelChange(nivelId, "productosExclusivos", e.target.checked)}
                    className="w-4 h-4 accent-[#0038FF]"
                  />
                  <span className="text-sm text-gray-700">Productos exclusivos</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReglasTab({ config, onReglaChange }) {
  const reglas = [
    { key: "topeMensualNivel1", label: "Tope Mensual Nivel 1" },
    { key: "topeMensualNivel2", label: "Tope Mensual Nivel 2" },
    { key: "topeMensualNivel3", label: "Tope Mensual Nivel 3" },
    { key: "topeMensualNivel4", label: "Tope Mensual Socio" },
    { key: "umbralCercaAscenso", label: "Umbral Cerca Ascenso" },
    { key: "periodoGracia", label: "Período Gracia (días)" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Reglas CPPG</h2>
      <p className="text-gray-600 mb-6">
        Configura las reglas del programa de lealtad.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {reglas.map((regla) => (
          <div key={regla.key} className="bg-white rounded-lg p-6 border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {regla.label}
            </label>
            <input
              type="number"
              value={config.reglasCPPG[regla.key]}
              onChange={(e) =>
                onReglaChange(regla.key, parseFloat(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0038FF]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const PILAR_STYLES = {
  beneficiosAhorros: { icon: "💰", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", header: "#1D4ED8" },
  productos:         { icon: "📊", bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", header: "#7C3AED" },
  experiencias:      { icon: "🎭", bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700", header: "#BE185D" },
  servicio:          { icon: "🎯", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", header: "#065F46" },
};

function BeneficiosTab({ config }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Recompensas por Nivel</h2>
      <p className="text-gray-600 mb-8">
        Matriz completa de beneficios del programa organizada por los 4 pilares.
      </p>

      {/* Leyenda de niveles */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {[1, 2, 3, 4].map((n) => {
          const nivel = config.niveles[n];
          return (
            <div key={n} className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold" style={{ borderColor: nivel.color, color: nivel.color, backgroundColor: nivel.colorBg }}>
              <span>{nivel.icon}</span>
              <span>{nivel.nombre}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-8">
        {Object.entries(BENEFICIOS_RECOMPENSAS).map(([pilarKey, pilar]) => {
          const style = PILAR_STYLES[pilarKey];
          return (
            <div key={pilarKey} className={`rounded-2xl border overflow-hidden shadow-sm ${style.border}`}>
              {/* Pilar header */}
              <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: style.header }}>
                <span className="text-2xl">{style.icon}</span>
                <h3 className="text-white font-black text-lg tracking-tight">{pilar.label}</h3>
              </div>

              {/* Items table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className={style.bg}>
                      <th className={`px-5 py-3 text-left text-xs font-black uppercase tracking-wider ${style.text} w-48 border-b ${style.border}`}>
                        Beneficio
                      </th>
                      {[1, 2, 3, 4].map((n) => {
                        const nivel = config.niveles[n];
                        return (
                          <th
                            key={n}
                            className={`px-4 py-3 text-center text-xs font-black uppercase tracking-wider border-b border-l ${style.border}`}
                            style={{ color: nivel.color }}
                          >
                            {nivel.icon} {nivel.nombre}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(pilar.items).map(([itemKey, item], idx) => (
                      <tr key={itemKey} className={idx % 2 === 0 ? "bg-white" : style.bg + "/40"}>
                        <td className={`px-5 py-4 font-bold text-gray-800 text-xs border-r ${style.border} align-top`}>
                          {item.label}
                        </td>
                        {[1, 2, 3, 4].map((n) => {
                          const nd = item.niveles[n];
                          const isNA = !nd || nd.descripcion === "N/A" || nd.disponible === false;
                          const nivel = config.niveles[n];
                          return (
                            <td
                              key={n}
                              className={`px-4 py-4 text-center text-[12px] border-l ${style.border} align-top`}
                            >
                              {isNA ? (
                                <span className="text-gray-300 font-bold text-lg">—</span>
                              ) : (
                                <div>
                                  <p className="font-medium text-gray-800 leading-snug">{nd.descripcion}</p>
                                  {nd.tope && (
                                    <span
                                      className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
                                      style={{ backgroundColor: nivel.colorBg, color: nivel.color }}
                                    >
                                      Tope ${nd.tope.toLocaleString("es-AR")}
                                    </span>
                                  )}
                                  {nd.ahorroLabel && (
                                    <p className="text-[10px] mt-1 font-semibold" style={{ color: nivel.color }}>
                                      {nd.ahorroLabel}
                                    </p>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimuladorTab({ perfiles, perfilActivo, onSelectPerfil, config }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Simulador</h2>
      <p className="text-gray-600 mb-6">
        Simula cómo se vería el programa para diferentes clientes.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {perfiles.map((perfil) => {
          const isActive = perfil.id === perfilActivo;
          const escenario = getEscenarioCPPG(perfil, config);
          const nivelColor = config.niveles[perfil.nivelReal]?.colorBg || "#F5F5F5";

          return (
            <button
              key={perfil.id}
              onClick={() => onSelectPerfil(perfil.id)}
              className={`text-left rounded-lg p-5 transition border-2 ${
                isActive
                  ? "border-[#0038FF] bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              style={isActive ? { backgroundColor: nivelColor } : {}}
            >
              {isActive && (
                <div className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2 font-bold">
                  ACTIVO
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: config.niveles[perfil.nivelReal]?.color || '#6B7280' }}>
                  {perfil.nombres[0]}
                </div>
                <div>
                  <p className="font-bold">{perfil.nombres} {perfil.apellido}</p>
                  <p className="text-xs text-gray-600">
                    {config.niveles[perfil.nivelReal]?.icon} {config.niveles[perfil.nivelReal]?.nombre || 'Sin nivel'} · {perfil.puntosDisponibles.toLocaleString("es-AR")} pts
                  </p>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-300">
                <p className="text-sm font-medium">
                  Insignias acum.: {perfil.insigniasAcumuladas.toLocaleString("es-AR")}
                </p>
                <p className="text-xs text-gray-600">
                  Insignias falt.: {perfil.insigniasFaltantes.toLocaleString("es-AR")}
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <p>
                  <strong>Categoría:</strong> {perfil.categoria}
                </p>
                <p>
                  <strong>Tipo:</strong> {perfil.tipoPersona}
                </p>
                <p>
                  <strong>Escenario:</strong>{" "}
                  <span style={{ color: escenario.color }}>
                    {escenario.objetivo}
                  </span>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EscenariosTab({ perfil, escenario, config }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Escenarios CPPG</h2>
      <p className="text-gray-600 mb-6">
        Visualiza los escenarios activos del programa.
      </p>

      {perfil && escenario && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Escenario Actual</h3>
          <div
            className="rounded-lg p-6 text-white"
            style={{ backgroundColor: escenario.color }}
          >
            <p className="text-sm font-medium mb-1">Tipo de Escenario</p>
            <p className="text-2xl font-bold mb-3">{escenario.tipo}</p>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="text-xs opacity-80">Tipo</p>
                <p className="font-bold">{escenario.tipo}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="text-xs opacity-80">Objetivo</p>
                <p className="font-bold">{escenario.objetivo}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="text-xs opacity-80">Nivel Real</p>
                <p className="font-bold">{perfil.nivelReal}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="text-xs opacity-80">Nivel Calculado</p>
                <p className="font-bold">{perfil.nivelCalculado}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="text-xs opacity-80">Insignias Faltantes</p>
                <p className="font-bold">
                  {perfil.insigniasFaltantes.toLocaleString("es-AR")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-lg font-bold mb-4">Todos los Escenarios CPPG</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-bold">Escenario</th>
              <th className="px-4 py-3 text-left text-sm font-bold">
                Señal de Datos
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold">Objetivo</th>
              <th className="px-4 py-3 text-left text-sm font-bold">
                Acción en Tienda
              </th>
            </tr>
          </thead>
          <tbody>
            {ESCENARIOS_CPPG.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm font-medium">{row.escenario}</td>
                <td className="px-4 py-3 text-sm">{row.senalDatos}</td>
                <td className="px-4 py-3 text-sm">{row.objetivo}</td>
                <td className="px-4 py-3 text-sm">{row.accion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0038FF] ${
          type === "color" ? "h-10 cursor-pointer" : ""
        }`}
      />
    </div>
  );
}
