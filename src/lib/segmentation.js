/**
 * Motor de Segmentación y Personalización - Programa de Lealtad 3.0
 *
 * Matriz: Nivel de Rentabilidad x Valor/Nivel del cliente
 * 2026: Solo Selecta (Renta Alta) segmentado en 4 niveles
 *
 * Token: EnteMis | Apellido | Nombres | Puntos | Categoría | TipoPersona |
 *        NivelCalculado | *NivelReal* | InsigniasAcumuladas CPPG | InsigniasFaltantes CPPG
 */

/**
 * Determina el escenario CPPG activo para un perfil dado
 */
export function getEscenarioCPPG(perfil, config) {
  // Escenario 1: Cliente no adherido
  if (!perfil.adherido) {
    return {
      tipo: "no_adherido",
      objetivo: "Adhesión",
      mensaje: "¡Sumate al Programa de Lealtad Selecta y accedé a beneficios exclusivos!",
      color: "#0038FF",
    };
  }

  // Escenario 2: Riesgo de baja (Calculado < Real = periodo de gracia)
  if (perfil.nivelCalculado < perfil.nivelReal) {
    return {
      tipo: "riesgo_baja",
      objetivo: "Retención",
      mensaje: `No pierdas tus beneficios de ${config.niveles[perfil.nivelReal]?.nombre}. Con esta compra sumás las insignias que te faltan.`,
      color: "#EF4444",
    };
  }

  // Escenario 3: Cerca del ascenso (Faltantes <= umbral)
  const umbral = config.reglasCPPG.umbralCercaAscenso;
  if (
    perfil.nivelReal < 4 &&
    perfil.insigniasFaltantes > 0 &&
    perfil.insigniasFaltantes <= umbral
  ) {
    return {
      tipo: "cerca_ascenso",
      objetivo: "Upselling",
      mensaje: `¡Estás a solo ${perfil.insigniasFaltantes.toLocaleString("es-AR")} insignias de ser ${config.niveles[perfil.nivelReal + 1]?.nombre}!`,
      color: "#8B5CF6",
    };
  }

  // Escenario 4: Nivel máximo con alto engagement
  if (
    perfil.nivelReal === 4 &&
    perfil.insigniasAcumuladas >= config.reglasCPPG.topeMensualNivel4 * 0.8
  ) {
    return {
      tipo: "nivel_maximo",
      objetivo: "Reconocimiento",
      mensaje: "¡Sos cliente Premium! Disfrutá beneficios exclusivos: 22 cuotas sin interés y envío gratis en todo.",
      color: "#D97706",
    };
  }

  // Escenario 5: Tope CPPG alcanzado
  if (perfil.insigniasFaltantes === 0 && perfil.adherido) {
    return {
      tipo: "tope_cppg",
      objetivo: "Derivación",
      mensaje: "¡Alcanzaste el tope mensual de insignias CPPG! Sumá más insignias contratando productos de Tenencia (seguros, inversiones).",
      color: "#059669",
    };
  }

  // Escenario normal
  return {
    tipo: "normal",
    objetivo: "Engagement",
    mensaje: `Tenés ${perfil.puntosDisponibles.toLocaleString("es-AR")} puntos disponibles.`,
    color: "#0038FF",
  };
}

/**
 * Calcula precio personalizado según el nivel del cliente
 */
export function getPrecioPersonalizado(producto, perfil, config) {
  if (!perfil.adherido || perfil.nivelReal === 0) {
    return {
      precio: producto.precio,
      cuotas: Math.min(producto.cuotas, 12),
      descuentoAplicado: 0,
    };
  }

  const nivel = config.niveles[perfil.nivelReal];
  if (!nivel) {
    return { precio: producto.precio, cuotas: producto.cuotas, descuentoAplicado: 0 };
  }

  const precioFinal = Math.round(producto.precio * (1 - nivel.tasaDescuento / 100));
  return {
    precio: precioFinal,
    cuotas: Math.max(producto.cuotas, nivel.cuotasMax),
    descuentoAplicado: nivel.tasaDescuento,
  };
}

/**
 * Determina si un producto es visible para el perfil dado
 */
export function esProductoVisible(producto, perfil) {
  if (!producto.exclusivoNivel) return true;
  if (!perfil.adherido) return false;
  return perfil.nivelReal >= producto.exclusivoNivel;
}

/**
 * Formatea precio en formato argentino
 */
export function formatPrecio(precio) {
  return precio.toLocaleString("es-AR");
}
