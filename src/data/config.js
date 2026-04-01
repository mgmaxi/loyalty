export const DEFAULT_CONFIG = {
  niveles: {
    1: {
      nombre: "Nivel 1",
      color: "#94A3B8",
      colorBg: "#F1F5F9",
      icon: "🥉",
      cuotasMax: 12,
      tasaDescuento: 0,
      beneficioEnvio: false,
      productosExclusivos: false,
      label: "Nivel 1",
    },
    2: {
      nombre: "Nivel 2",
      color: "#3B82F6",
      colorBg: "#EFF6FF",
      icon: "🥈",
      cuotasMax: 12,
      tasaDescuento: 0,
      beneficioEnvio: true,
      productosExclusivos: false,
      label: "Nivel 2",
    },
    3: {
      nombre: "Nivel 3",
      color: "#8B5CF6",
      colorBg: "#F5F3FF",
      icon: "🥇",
      cuotasMax: 12,
      tasaDescuento: 0,
      beneficioEnvio: true,
      productosExclusivos: true,
      label: "Nivel 3",
    },
    4: {
      nombre: "Socio",
      color: "#1A1A2E",
      colorBg: "#F0F0FF",
      icon: "👑",
      cuotasMax: 18,
      tasaDescuento: 0,
      beneficioEnvio: true,
      productosExclusivos: true,
      label: "Socio",
    },
  },
  reglasCPPG: {
    topeMensualNivel1: 5000,
    topeMensualNivel2: 10000,
    topeMensualNivel3: 20000,
    topeMensualNivel4: 50000,
    umbralCercaAscenso: 500,
    periodoGracia: 60,
  },
  // Legacy: mantenido para compatibilidad con backoffice
  beneficiosPorNivel: {
    1: ["12 cuotas sin interés en Tienda Macro", "Gastronomía 30% ahorro · Tope $30.000", "Combustible YPF 30% ahorro · Tope $25.000"],
    2: ["12 cuotas sin interés + TC 30% ahorro en Tienda Macro · Tope $500.000", "Gastronomía 30% ahorro · Tope $60.000", "Combustible YPF 30% ahorro · Tope $50.000", "Supermercados Miércoles 30% ahorro · Tope $40.000"],
    3: ["12 cuotas sin interés + 30% ahorro en Tienda Macro · Tope $100.000", "Gastronomía 30% ahorro · Tope $120.000", "Combustible YPF 30% ahorro · Tope $100.000", "Plazo Fijo Tasa Preferencial", "Preventa exclusiva Tickets"],
    4: ["18 cuotas sin interés + 30% ahorro en Tienda Macro", "Gastronomía Nuevos Comercios sin tope", "YPF Full", "Concierge personalizado", "Espacio VIP en espectáculos"],
  },
};

export const BENEFICIOS_RECOMPENSAS = {
  beneficiosAhorros: {
    label: "Tus beneficios / ahorros",
    items: {
      gastronomia: {
        label: "Gastronomía",
        sublabel: "Comercios adheridos",
        niveles: {
          1: { descripcion: "TC todos los días 30% ahorro", tope: 30000 },
          2: { descripcion: "TC todos los días 30% ahorro", tope: 60000 },
          3: { descripcion: "TC y Débito + Comercios Exclusivos 30% ahorro", tope: 120000 },
          4: { descripcion: "Nuevos comercios sin tope", tope: null },
        },
      },
      supermercados: {
        label: "Supermercados",
        sublabel: null,
        niveles: {
          1: { descripcion: "Dar, La Gallega, La Reina", tope: null },
          2: { descripcion: "Miércoles TC en cualquier supermercado 30% ahorro", tope: 40000 },
          3: { descripcion: "Miércoles TC y Débito 30% ahorro", tope: 80000 },
          4: { descripcion: "+ Tope superior", tope: null },
        },
      },
      combustible: {
        label: "Combustible YPF",
        sublabel: null,
        niveles: {
          1: { descripcion: "Miércoles TC Visa 30% ahorro", tope: 25000 },
          2: { descripcion: "Miércoles TC Visa 30% ahorro", tope: 50000 },
          3: { descripcion: "Miércoles TC Visa + Débito 30% ahorro", tope: 100000 },
          4: { descripcion: "+ YPF Full (1er)", tope: null },
        },
      },
      turismo: {
        label: "Turismo",
        sublabel: "Almundo",
        niveles: {
          1: { descripcion: "12 cuotas s/interés en productos nacionales", tope: null },
          2: { descripcion: "12 cuotas s/interés en productos nacionales", tope: null },
          3: { descripcion: "12 cuotas s/interés + 30% ahorro todos los días (nacional e internacional)", tope: 300000 },
          4: { descripcion: "+ Cuotas superiores", tope: null },
        },
      },
      tiendaMacro: {
        label: "Tienda Macro",
        sublabel: null,
        niveles: {
          1: { descripcion: "12 cuotas sin interés", cuotasSinInteres: 12, ahorroPorc: 0, ahorroLabel: null, tope: null },
          2: { descripcion: "12 cuotas sin interés + Tarjeta de Crédito · Todos los días 30% ahorro", cuotasSinInteres: 12, ahorroPorc: 30, ahorroLabel: "30% ahorro con Tarjeta de Crédito", tope: 500000 },
          3: { descripcion: "12 cuotas sin interés + Tarjeta de Crédito y Débito · Todos los días 30% ahorro", cuotasSinInteres: 12, ahorroPorc: 30, ahorroLabel: "30% ahorro con Tarjeta de Crédito y Débito", tope: 100000 },
          4: { descripcion: "+ Tope y cuotas mejoradas", cuotasSinInteres: 18, ahorroPorc: 30, ahorroLabel: "30% ahorro · + Tope y cuotas", tope: null },
        },
      },
    },
  },
  productos: {
    label: "Tus productos",
    items: {
      plazoFijo: {
        label: "Plazo Fijo Tasa Preferencial",
        sublabel: null,
        niveles: {
          1: { disponible: false, descripcion: "N/A" },
          2: { disponible: false, descripcion: "N/A" },
          3: { disponible: true, descripcion: "+ Tasa por canal digital" },
          4: { disponible: true, descripcion: "++ Tasa por canal digital" },
        },
      },
    },
  },
  experiencias: {
    label: "Tus experiencias",
    items: {
      tickets: {
        label: "Tickets para espectáculos",
        sublabel: null,
        niveles: {
          1: { descripcion: "N/A" },
          2: { descripcion: "6 cuotas sin interés" },
          3: { descripcion: "Preventa exclusiva + 6 cuotas sin interés" },
          4: { descripcion: "Preventa exclusiva + Espacio VIP, Parking, Obsequios, Meet & Greet" },
        },
      },
      gastronomiaEspectaculos: {
        label: "Gastronomía + Merchandising",
        sublabel: "en espectáculos",
        niveles: {
          1: { descripcion: "TC Visa 30% ahorro", tope: 30000 },
          2: { descripcion: "TC Visa 30% ahorro", tope: 60000 },
          3: { descripcion: "TC Visa + Débito 30% ahorro", tope: 120000 },
          4: { descripcion: "Experiencias exclusivas en gastronomía, deportes y espectáculos", tope: null },
        },
      },
    },
  },
  servicio: {
    label: "Tu servicio",
    items: {
      atencion: {
        label: "Atención",
        sublabel: null,
        niveles: {
          1: { descripcion: "WhatsApp" },
          2: { descripcion: "+ Prioridad" },
          3: { descripcion: "+ Ejecutivo Asignado" },
          4: { descripcion: "+ Concierge" },
        },
      },
    },
  },
};
