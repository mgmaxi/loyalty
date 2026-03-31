import './globals.css';

export const metadata = {
  title: 'Tienda Macro - Motor de Segmentación y Personalización',
  description: 'Programa de Lealtad 3.0 - Segmentación Selecta',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
