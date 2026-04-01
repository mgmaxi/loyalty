'use client';

import { getPrecioPersonalizado, formatPrecio } from '@/lib/segmentation';

export default function FeaturedProduct({ producto, perfil, config }) {
	const { precio, cuotas, descuentoAplicado } = getPrecioPersonalizado(
		producto,
		perfil,
		config,
	);
	const precioOriginal = producto.precioOriginal || producto.precio;
	const ahorroTotal =
		precio < precioOriginal
			? Math.round(((precioOriginal - precio) / precioOriginal) * 100)
			: 0;
	const cuotaValor = Math.round(precio / cuotas);

	// Badges dinámicos según nivel
	const getBadges = () => {
		const badges = [];

		// Badge de exclusividad según nivel
		if (perfil?.adherido && producto.exclusivoNivel) {
			if (perfil?.nivelReal >= producto.exclusivoNivel) {
				const nivelInfo = config?.niveles?.[producto.exclusivoNivel];
				const labelExclusivo = `${nivelInfo?.icon} Exclusivo ${nivelInfo?.label}`;
				let badgeColor = 'bg-gray-100 text-gray-800';

				if (producto.exclusivoNivel === 2) {
					badgeColor = 'bg-blue-100 text-blue-800';
				} else if (producto.exclusivoNivel === 3) {
					badgeColor = 'bg-purple-100 text-purple-800';
				} else if (producto.exclusivoNivel === 4) {
					badgeColor = 'bg-amber-100 text-amber-800';
				}

				badges.push({ label: labelExclusivo, color: badgeColor });
			}
		}

		if (descuentoAplicado > 0) {
			badges.push({
				label: `${descuentoAplicado}% ahorro Tienda Macro`,
				color: 'bg-green-100 text-green-800',
			});
		}
		if (producto.envioGratis) {
			badges.push({ label: '🚚 Envío Gratis', color: 'bg-blue-100 text-blue-800' });
		}
		return badges;
	};

	const badges = getBadges();

	return (
		<div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
			{/* Top badge section */}
			<div className="px-4 md:px-6 pt-3 md:pt-4 pb-2 flex flex-wrap gap-2">
				<span className="inline-block px-4 py-1 border-2 border-[#EC4899] text-[#EC4899] font-bold text-[11px] rounded-full">
					Producto destacado
				</span>
				{badges.map((badge, idx) => (
					<span
						key={idx}
						className={`inline-block px-3 py-1 text-[11px] font-semibold rounded-full ${badge.color}`}
					>
						{badge.label}
					</span>
				))}
			</div>

			{/* Image and discount circle container */}
			<div className="relative px-4 md:px-6 pt-2 pb-4 md:pb-6 bg-gradient-to-b from-gray-50 to-white">
				{/* Image */}
				<div className="relative bg-white rounded-lg flex items-center justify-center h-[180px] sm:h-[220px] md:h-[280px] mb-2 border border-gray-100">
					{producto.imagen ? (
						<img
							src={producto.imagen}
							alt={producto.nombre}
							className="h-full w-full object-contain p-4 hover:scale-110 transition-transform duration-300"
						/>
					) : (
						<span className="text-6xl">📦</span>
					)}
				</div>

				{/* Discount circle */}
				{ahorroTotal > 0 && (
					<div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#EC4899] to-[#C2185B] text-white rounded-full flex flex-col items-center justify-center font-bold shadow-xl border-2 md:border-4 border-white">
						<span className="text-[9px] md:text-sm">Hasta</span>
						<span className="text-2xl md:text-4xl leading-none">{ahorroTotal}%</span>
						<span className="text-[7px] md:text-[8px] leading-tight">De ahorro</span>
					</div>
				)}
			</div>

			{/* Content section */}
			<div className="px-4 md:px-6 pb-4 md:pb-6 flex flex-col flex-1">
				{/* Product name */}
				<h3 className="text-[13px] md:text-[15px] font-bold text-[#0038FF] mb-2 md:mb-3 line-clamp-2 leading-tight">
					{producto.nombre}
				</h3>

				{/* Price */}
				<div className="mb-3">
					<div className="flex items-baseline gap-2 mb-1">
						<span className="text-sm text-gray-600">$</span>
						<span className="text-2xl md:text-4xl font-black text-[#EC4899]">
							{formatPrecio(precio)}
						</span>
					</div>
					{precioOriginal > precio && (
						<span className="text-[13px] text-gray-400 line-through">
							${formatPrecio(precioOriginal)}
						</span>
					)}
				</div>

				{/* Additional info */}
				<p className="text-[11px] text-gray-600 mb-3 leading-tight">
					Precio sin impuestos nacionales $
					{formatPrecio(producto.precioOriginal || producto.precio)}
				</p>

				{/* Cuotas */}
				<div className="mb-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
					<p className="text-[12px] text-gray-700">
						<span className="font-bold">Hasta</span>{' '}
						<span className="font-black text-[#0038FF] text-base">
							{cuotas}
						</span>{' '}
						<span className="font-bold">cuotas</span>{' '}
						<span className="font-bold">sin interés</span> de
						<span className="font-bold text-[#0038FF] ml-1">
							${formatPrecio(cuotaValor)}
						</span>
					</p>
				</div>

				{/* CTA Button */}
				<button className="w-full mt-auto bg-[#0038FF] hover:bg-[#0028D4] text-white font-bold py-3 rounded-lg transition-all duration-300 text-[14px] shadow-md hover:shadow-lg transform hover:scale-105">
					COMPRAR
				</button>
			</div>
		</div>
	);
}
