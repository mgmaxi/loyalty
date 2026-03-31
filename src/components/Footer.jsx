"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#0038FF] via-[#1e40af] to-[#0038FF] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Logo and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 mb-12 border-b border-white/20">

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">
              Información
            </h4>
            <div className="space-y-3">
              <button className="block text-white/80 hover:text-white transition text-sm font-medium">
                Términos y Condiciones
              </button>
              <button className="block text-white/80 hover:text-white transition text-sm font-medium">
                Preguntas frecuentes
              </button>
              <button className="block text-white/80 hover:text-white transition text-sm font-medium">
                Botón de arrepentimiento
              </button>
              <button className="block text-white/80 hover:text-white transition text-sm font-medium">
                Política de privacidad
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">
              Contáctanos
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">0800-MACRO-10</span>
              </div>
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">contacto@tiendamacro.com</span>
              </div>
              <div className="flex items-start gap-3 text-white/80 hover:text-white transition">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Payment Methods and Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 mb-12 border-b border-white/20">
          {/* Left - Payment Methods */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-5">
              Métodos de Pago
            </h4>
            <div className="flex items-center gap-4 flex-wrap">
              {/* VISA */}
              <div className="h-10 flex items-center justify-center bg-white/90 rounded-lg px-3 hover:bg-white transition">
                <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#1434CB"/>
                  <text x="24" y="20" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">VISA</text>
                </svg>
              </div>

              {/* Mastercard */}
              <div className="h-10 flex items-center justify-center bg-white/90 rounded-lg px-3 hover:bg-white transition">
                <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#FF5F00"/>
                  <circle cx="16" cy="16" r="8" fill="#EB001B"/>
                  <circle cx="32" cy="16" r="8" fill="#FF5F00"/>
                  <circle cx="24" cy="16" r="8" fill="#FF5F00" opacity="0.8"/>
                </svg>
              </div>

              {/* AMEX */}
              <div className="h-10 flex items-center justify-center bg-white/90 rounded-lg px-3 hover:bg-white transition">
                <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#016FD0"/>
                  <text x="24" y="20" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">AMEX</text>
                </svg>
              </div>

              {/* MODO */}
              <div className="h-10 flex items-center justify-center bg-white/90 rounded-lg px-3 hover:bg-white transition">
                <div className="text-center">
                  <div className="text-xs font-bold text-[#0038FF]">MODO</div>
                </div>
              </div>

              {/* Maestro */}
              <div className="h-10 flex items-center justify-center bg-white/90 rounded-lg px-3 hover:bg-white transition">
                <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#0066B2"/>
                  <circle cx="16" cy="16" r="7" fill="#EB001B"/>
                  <circle cx="32" cy="16" r="7" fill="#FF5F00"/>
                </svg>
              </div>

              {/* Naranja X */}
              <div className="h-10 flex items-center justify-center bg-white/90 rounded-lg px-3 hover:bg-white transition">
                <div className="text-center">
                  <div className="text-xs font-bold text-orange-500">NARANJA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Security Information */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-5">
              Compra Segura
            </h4>
            <div className="space-y-3">
              <p className="text-white/80 text-sm font-medium">
                ✓ Conexión SSL segura
              </p>
              <p className="text-white/80 text-sm font-medium">
                ✓ Datos protegidos y encriptados
              </p>
              <p className="text-white/80 text-sm font-medium">
                ✓ Garantía en todos los productos
              </p>
            </div>
          </div>
        </div>

        {/* Bottom - Legal Text and Copyright */}
        <div className="text-center space-y-3">
          <p className="text-xs text-white/70 leading-relaxed">
            TEA: 0,00% - TNA: 0,00%<br /><br />
            C.F.T.N.A.: 0,00%<br /><br />
            CFTNA: Costo Financiero Total Nominal Anual. TEA: Tasa Efectiva Anual. TNA: Tasa Nominal Anual.
          </p>
        </div>
      </div>

    </footer>
  );
}
