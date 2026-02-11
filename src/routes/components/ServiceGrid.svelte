<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { urlFor } from '$lib/sanity/client';

	gsap.registerPlugin(ScrollTrigger);

	interface Service {
		id: string;
		title: string;
		image: any;
		url?: string;
	}

	export let services: Service[] = [];

	// Fallback jika data belum ada atau kosong
	const defaultServices: Service[] = [
		{
			id: 'apparel',
			title: 'Penak Apparel',
			image: '/images/services/apparel.svg',
			url: 'https://apparel.penak.online'
		},
		{
			id: 'shortener',
			title: 'Penak Shortener',
			image: '/images/services/shortener.svg',
			url: 'https://url.penak.online'
		},
		{
			id: 'dev',
			title: 'Penak Dev',
			image: '/images/services/dev.svg',
			url: 'https://dev.penak.online'
		},
		{
			id: 'cloud',
			title: 'Penak Cloud',
			image: '/images/services/cloud.svg',
			url: 'https://cloud.penak.online'
		},
		{
			id: 'store',
			title: 'Penak Store',
			image: '/images/services/store.svg',
			url: 'https://store.penak.online'
		},
		{
			id: 'creative',
			title: 'Penak Creative',
			image: '/images/services/creative.svg',
			url: 'https://creative.penak.online'
		}
	];

	$: displayServices = services && services.length > 0 ? services : defaultServices;

	// Split services into two rows if there are enough
	$: row1Services = displayServices.length >= 4 ? displayServices.slice(0, Math.ceil(displayServices.length / 2)) : displayServices;
	$: row2Services = displayServices.length >= 4 ? displayServices.slice(Math.ceil(displayServices.length / 2)) : [...displayServices].reverse();

	// Duplicate services for infinite scroll effect
	$: duplicatedRow1 = [...row1Services, ...row1Services, ...row1Services];
	$: duplicatedRow2 = [...row2Services, ...row2Services, ...row2Services];

	let row1Container: HTMLElement;
	let row2Container: HTMLElement;
	let sectionHeader: HTMLElement;
	let row1Tween: gsap.core.Tween | null = null;
	let row2Tween: gsap.core.Tween | null = null;

	function startAutoScroll(container: HTMLElement, direction: 'left' | 'right', duration: number = 40) {
		if (!container) return null;
		
		const totalWidth = container.scrollWidth;
		const scrollDistance = totalWidth / 3;

		if (direction === 'left') {
			return gsap.to(container, {
				scrollLeft: scrollDistance,
				duration: duration,
				ease: 'none',
				repeat: -1,
				onRepeat: () => {
					container.scrollLeft = 0;
				}
			});
		} else {
			// Start from middle and scroll backwards
			container.scrollLeft = scrollDistance;
			return gsap.to(container, {
				scrollLeft: 0,
				duration: duration,
				ease: 'none',
				repeat: -1,
				onRepeat: () => {
					container.scrollLeft = scrollDistance;
				}
			});
		}
	}

	onMount(() => {
		// Entrance Animation for Header
		gsap.from(sectionHeader.children, {
			scrollTrigger: {
				trigger: sectionHeader,
				start: 'top 85%',
			},
			y: 50,
			opacity: 0,
			duration: 1,
			stagger: 0.2,
			ease: 'power3.out'
		});

		// Initialize animations
		setTimeout(() => {
			row1Tween = startAutoScroll(row1Container, 'left', 50);
			row2Tween = startAutoScroll(row2Container, 'right', 50);
		}, 100);

		// Hover controls for Row 1
		row1Container?.addEventListener('mouseenter', () => row1Tween?.pause());
		row1Container?.addEventListener('mouseleave', () => row1Tween?.resume());
		row1Container?.addEventListener('touchstart', () => row1Tween?.pause());
		row1Container?.addEventListener('touchend', () => row1Tween?.resume());

		// Hover controls for Row 2
		row2Container?.addEventListener('mouseenter', () => row2Tween?.pause());
		row2Container?.addEventListener('mouseleave', () => row2Tween?.resume());
		row2Container?.addEventListener('touchstart', () => row2Tween?.pause());
		row2Container?.addEventListener('touchend', () => row2Tween?.resume());

		return () => {
			row1Tween?.kill();
			row2Tween?.kill();
		};
	});

	function getImageUrl(image: any) {
		if (typeof image === 'string') return image;
		try {
			return urlFor(image).url();
		} catch (e) {
			return '/images/services/apparel.svg'; // fallback
		}
	}

	function handleCardClick(url?: string) {
		if (url) {
			window.open(url, '_blank', 'noopener,noreferrer');
		}
	}
</script>

<section id="layanan" class="bg-black py-24 relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/95 z-0 pointer-events-none"></div>
	
	<div class="relative z-10">
		<div bind:this={sectionHeader} class="max-w-3xl mx-auto text-center mb-16 space-y-4 px-4">
			<div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Ekosistem Kami</div>
			<h3 class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']">
				Pilih layanan yang <br class="hidden md:block" /> kamu butuhkan
			</h3>
			<p class="text-lg text-white/60 leading-relaxed">
				Satu platform untuk semua kebutuhan digital Anda. Kami menyediakan solusi yang terintegrasi untuk membantu bisnis Anda tumbuh lebih cepat.
			</p>
		</div>

		<div class="carousel-outer-wrapper space-y-8">
			<!-- Row 1: Moves Left -->
			<div 
				bind:this={row1Container}
				class="carousel-inner flex gap-6 overflow-x-auto scrollbar-hide"
				style="scroll-behavior: auto;"
			>
				{#each duplicatedRow1 as service, index (index)}
					<div
						class="card-wrapper flex-shrink-0"
						on:click={() => handleCardClick(service.url)}
						on:keydown={(e) => e.key === 'Enter' && handleCardClick(service.url)}
						role="button"
						tabindex="0"
					>
						<div class="relative w-80 md:w-[400px] h-48 md:h-60 rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 group">
							<!-- Image Container -->
							<div class="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
								<img
									src={getImageUrl(service.image)}
									alt={service.title}
									class="w-full h-full object-contain opacity-80 group-hover:opacity-40 transition-opacity duration-500"
								/>
							</div>

							<!-- Dark Overlay on Hover -->
							<div class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
								<h4 class="text-xl md:text-2xl font-bold text-white text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
									{service.title}
								</h4>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Row 2: Moves Right -->
			<div 
				bind:this={row2Container}
				class="carousel-inner flex gap-6 overflow-x-auto scrollbar-hide"
				style="scroll-behavior: auto;"
			>
				{#each duplicatedRow2 as service, index (index)}
					<div
						class="card-wrapper flex-shrink-0"
						on:click={() => handleCardClick(service.url)}
						on:keydown={(e) => e.key === 'Enter' && handleCardClick(service.url)}
						role="button"
						tabindex="0"
					>
						<div class="relative w-80 md:w-[400px] h-48 md:h-60 rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 group">
							<!-- Image Container -->
							<div class="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
								<img
									src={getImageUrl(service.image)}
									alt={service.title}
									class="w-full h-full object-contain opacity-80 group-hover:opacity-40 transition-opacity duration-500"
								/>
							</div>

							<!-- Dark Overlay on Hover -->
							<div class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
								<h4 class="text-xl md:text-2xl font-bold text-white text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
									{service.title}
								</h4>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Side Gradients for smooth fade -->
			<div class="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none"></div>
			<div class="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none"></div>
		</div>
	</div>
</section>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.carousel-outer-wrapper {
		position: relative;
		overflow: visible;
		padding: 1rem 0;
	}

	.carousel-inner {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	@media (min-width: 768px) {
		.carousel-inner {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	.card-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		will-change: transform;
	}

	.card-wrapper > div {
		will-change: transform;
		transform-origin: center;
		transition: all 0.3s ease;
	}
	
	.card-wrapper:hover > div {
		border-color: rgba(254, 240, 138, 0.3);
		box-shadow: 0 0 30px rgba(254, 240, 138, 0.1);
	}
</style>
