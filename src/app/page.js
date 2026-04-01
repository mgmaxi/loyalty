'use client';

import { useState } from 'react';
import { DEFAULT_CONFIG } from '@/data/config';
import { PRODUCTOS } from '@/data/products';
import { PERFILES_DEMO } from '@/data/profiles';
import { getEscenarioCPPG, esProductoVisible } from '@/lib/segmentation';

import { Crown } from 'lucide-react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import HomeCarousel from '@/components/HomeCarousel';
import FeaturedProduct from '@/components/FeaturedProduct';
import ProductCarousel from '@/components/ProductCarousel';
import ProductCard from '@/components/ProductCard';
import CategoriesStrip from '@/components/CategoriesStrip';
import PromoBanners from '@/components/PromoBanners';
import BrandsStrip from '@/components/BrandsStrip';
import Footer from '@/components/Footer';
import LoyaltyHome from '@/components/LoyaltyHome';
import { PopupNoAdherido, InlineBanner } from '@/components/CPPGBanners';
import ProfileSwitcher from '@/components/ProfileSwitcher';
import CarouselHero from '@/components/CarouselHero';

export default function TiendaPage() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [perfilActivo, setPerfilActivo] = useState(PERFILES_DEMO[0]);
	const [showAdhesion, setShowAdhesion] = useState(true);
	const [currentView, setCurrentView] = useState('tienda');

	const escenario = getEscenarioCPPG(perfilActivo, config);

	const handleSelectPerfil = p => {
		setPerfilActivo(p);
		setShowAdhesion(true);
		setCurrentView('tienda');
	};

	// Product groups
	const tecnologia = PRODUCTOS.filter(
		p => p.categoria === 'tecnologia' && !p.exclusivoNivel && p.id !== 4,
	);
	const celulares = PRODUCTOS.filter(
		p =>
			p.categoria === 'celulares' &&
			!p.exclusivoNivel &&
			(p.id === 9 || p.id === 10 || p.id === 36 || p.id === 37 || p.id === 38 || p.id === 39 || p.id === 40),
	);
	const samsungS26 = PRODUCTOS.filter(
		p =>
			p.categoria === 'celulares' &&
			!p.exclusivoNivel &&
			p.id >= 28 &&
			p.id <= 32,
	);
	const heladerias = PRODUCTOS.filter(
		p =>
			p.categoria === 'electrodomesticos' &&
			!p.exclusivoNivel &&
			(p.id === 17 || p.id === 18 || p.id === 25 || p.id === 26 || p.id === 27),
	);
	const exclusivos = PRODUCTOS.filter(p => p.exclusivoNivel);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header
				perfil={perfilActivo}
				config={config}
				currentView={currentView}
				setCurrentView={setCurrentView}
			/>

			{/* CPPG: Adhesion popup */}
			{escenario.tipo === 'no_adherido' && showAdhesion && (
				<PopupNoAdherido onClose={() => setShowAdhesion(false)} />
			)}

			{/* CPPG: Inline banners */}
			{escenario.tipo !== 'no_adherido' && escenario.tipo !== 'normal' && (
				<div className="max-w-[1360px] mx-auto px-4 md:px-6 mt-4 md:mt-6">
					<InlineBanner
						escenario={escenario}
						perfil={perfilActivo}
						config={config}
					/>
				</div>
			)}

			{currentView === 'tienda' ? (
				<>
					<HeroBanner perfil={perfilActivo} config={config} />

					{/* Home Carousel - Promotional images */}
					<HomeCarousel />

					{/* Featured products */}
					<div className="max-w-[1360px] mx-auto px-4 md:px-6 mb-8 md:mb-12">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
							<FeaturedProduct
								producto={PRODUCTOS[0]}
								perfil={perfilActivo}
								config={config}
							/>
							<FeaturedProduct
								producto={PRODUCTOS[24]}
								perfil={perfilActivo}
								config={config}
							/>
						</div>
					</div>

					<CarouselHero category="smarttv" />

					<ProductCarousel
						title="Tecnología"
						productos={tecnologia}
						perfil={perfilActivo}
						config={config}
					/>

					<CategoriesStrip />

					<CarouselHero category="xiaomi" />

					<ProductCarousel
						title="Celulares"
						productos={celulares}
						perfil={perfilActivo}
						config={config}
					/>

					<ProductCarousel
						title="Samsung Galaxy S26"
						productos={samsungS26}
						perfil={perfilActivo}
						config={config}
					/>

					{/* Exclusive products */}
					{perfilActivo.adherido &&
						perfilActivo.nivelReal >= 3 &&
						exclusivos.filter(p => esProductoVisible(p, perfilActivo)).length >
							0 && (
							<div className="max-w-[1360px] mx-auto px-4 md:px-6 mb-10">
								<div className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] rounded-2xl p-4 md:p-8">
									<div className="flex items-center gap-3 mb-4 md:mb-6">
										<Crown className="w-6 h-6 text-yellow-400" />
										<h2 className="text-lg md:text-xl font-extrabold text-white">
											Productos Exclusivos{' '}
											{config.niveles[perfilActivo.nivelReal]?.label}
										</h2>
									</div>
									<div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
										{exclusivos
											.filter(p => esProductoVisible(p, perfilActivo))
											.map(p => (
												<div key={p.id} className="w-[220px] sm:w-[240px] md:w-[260px] flex-shrink-0">
													<ProductCard
														producto={p}
														perfil={perfilActivo}
														config={config}
													/>
												</div>
											))}
									</div>
								</div>
							</div>
						)}

					<PromoBanners />

					<ProductCarousel
						title="Heladeras"
						productos={heladerias}
						perfil={perfilActivo}
						config={config}
					/>
				</>
			) : (
				<LoyaltyHome perfil={perfilActivo} config={config} />
			)}

			{/* Brands Strip - At the bottom */}
			<BrandsStrip />

			<Footer />

			<ProfileSwitcher
				perfiles={PERFILES_DEMO}
				perfilActivo={perfilActivo}
				onSelect={handleSelectPerfil}
				config={config}
				onGoAdmin={() => (window.location.href = '/backoffice')}
			/>
		</div>
	);
}
