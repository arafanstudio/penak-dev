<script lang="ts">
	import { Check, X, ChevronDown } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card.svelte';
	import Badge from '$lib/components/ui/badge.svelte';
	import ParticleBackground from './ParticleBackground.svelte';

	gsap.registerPlugin(ScrollTrigger);

	interface DetailItem {
		text: string;
		included: boolean;
	}

	interface PlanDetails {
		services: DetailItem[];
		maintenance: DetailItem[];
		features: DetailItem[];
	}

	interface Plan {
		name: string;
		price: string;
		description: string;
		features: { text: string; included: boolean }[];
		details?: PlanDetails;
		recommended?: boolean;
		cta: string;
		note?: string;
	}

	// Define common feature keys for 1:1 comparison
	const COMMON_FEATURES = [
		'Single Page Design',
		'Responsive Mobile Friendly',
		'SEO Optimization',
		'Free Domain (1 thn)',
		'Support & Maintenance',
		'Custom Functionality',
		'CMS Integration'
	];

	const freePlan: Plan = {
		name: 'Web Sekolah',
		price: 'FREE',
		description: 'Kontribusi kami untuk dunia pendidikan Indonesia.',
		features: [
			{ text: 'Single Page Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Basic)', included: true },
			{ text: 'Free Domain .sch.id (1 thn)', included: true },
			{ text: 'Support & Maintenance (Limited)', included: true },
			{ text: 'Custom Functionality', included: false },
			{ text: 'CMS Integration', included: false }
		],
		details: {
			services: [
				{ text: '7 Hari Kerja', included: true },
				{ text: 'cPanel', included: false },
				{ text: 'Free Domain .sch.id', included: true },
				{ text: 'Email Domain (1 akun)', included: true },
				{ text: 'Editing Gambar', included: false }
			],
			maintenance: [
				{ text: 'Free Update Page (1 Hal / bln)', included: true },
				{ text: 'Edit Hal. Tambahan (Rp 30.000)', included: true },
				{ text: 'Buat Hal. Baru (Rp 40.000)', included: true },
				{ text: 'Basic Image Editing (Rp 15.000)', included: true },
				{ text: 'Backup Rutin', included: false }
			],
			features: [
				{ text: 'Pilihan Template (limited)', included: true },
				{ text: 'SEO Power (Simple Meta Tag)', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Analytics', included: false },
				{ text: 'API Integration', included: false }
			]
		},
		cta: 'Daftar Sekarang',
		note: '*Terbatas, tidak bisa kustom'
	};

	const starterPlan: Plan = {
		name: 'Starter',
		price: 'IDR 499.600',
		description: 'Cocok untuk Profil Pribadi atau UMKM yang sedang Berkembang.',
		features: [
			{ text: 'Up to 5 Pages Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Basic)', included: true },
			{ text: 'Free Domain .web.id (1 thn)', included: true },
			{ text: 'Support & Maintenance (1 bln)', included: true },
			{ text: 'Custom Functionality (Limited)', included: true },
			{ text: 'CMS Integration', included: false }
		],
		details: {
			services: [
				{ text: '3 Hari Kerja', included: true },
				{ text: 'cPanel', included: false },
				{ text: 'Free .my.id / .web.id / .biz.id', included: true },
				{ text: 'Email Domain (3 akun)', included: true },
				{ text: 'Editing Gambar (5 Image + 1 Logo)', included: true }
			],
			maintenance: [
				{ text: 'Free Update Page (1 Hal / bln)', included: true },
				{ text: 'Edit Hal. Tambahan (Rp 20.000)', included: true },
				{ text: 'Buat Hal. Baru (Rp 30.000)', included: true },
				{ text: 'Basic Image Editing (Rp 15.000)', included: true },
				{ text: 'Backup Rutin', included: false }
			],
			features: [
				{ text: 'Pilihan Template (Bebas)', included: true },
				{ text: 'SEO Power (Keyword Setup)', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Analytics', included: false },
				{ text: 'API Integration', included: false }
			]
		},
		cta: 'Pilih Starter'
	};

	const businessPlan: Plan = {
		name: 'Business',
		price: 'IDR 1.215.800',
		description: 'Solusi profesional untuk bisnis yang sedang berkembang.',
		features: [
			{ text: 'Up to 10 Pages Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Standard)', included: true },
			{ text: 'Free Domain .com (1 thn)', included: true },
			{ text: 'Support & Maintenance (2 bln)', included: true },
			{ text: 'Custom Functionality', included: true },
			{ text: 'CMS Integration', included: true }
		],
		details: {
			services: [
				{ text: '3 Hari Kerja', included: true },
				{ text: '5 GB (shared)', included: true },
				{ text: 'Free .com / .id / .net', included: true },
				{ text: 'Email Domain (unlimited)', included: true },
				{ text: 'Editing Gambar (10 Image + 1 Logo)', included: true }
			],
			maintenance: [
				{ text: 'Free Update Page (2 Hal / bln)', included: true },
				{ text: 'Edit Hal. Tambahan (Rp 25.000)', included: true },
				{ text: 'Buat Hal. Baru (Rp 35.000)', included: true },
				{ text: 'Basic Image Editing (Rp 15.000)', included: true },
				{ text: 'Backup Rutin (Bulanan)', included: true }
			],
			features: [
				{ text: 'Pilihan Template (Bebas)', included: true },
				{ text: 'SEO Power (Indexing & Sitemap)', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Analytics', included: false },
				{ text: 'API Integration (basic)', included: true }
			]
		},
		recommended: true,
		cta: 'Pilih Business'
	};

	const enterprisePlan: Plan = {
		name: 'Enterprise',
		price: 'IDR 2.348.400',
		description: 'Solusi enterprise lengkap untuk organisasi besar.',
		features: [
			{ text: 'Up to 15 Pages Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Advanced)', included: true },
			{ text: 'Free Domain .com (1 thn)', included: true },
			{ text: 'Support & Maintenance (3 bln)', included: true },
			{ text: 'Custom Functionality', included: true },
			{ text: 'CMS Integration (Advanced)', included: true }
		],
		details: {
			services: [
				{ text: '5 Hari Kerja', included: true },
				{ text: '12 GB (shared)', included: true },
				{ text: 'Free .com / .id / .net / .co.id', included: true },
				{ text: 'Email Domain (unlimited)', included: true },
				{ text: 'Editing Gambar (15 Image + 1 Logo)', included: true }
			],
			maintenance: [
				{ text: 'Free Update Page (3 Hal / bln)', included: true },
				{ text: 'Edit Hal. Tambahan (Rp 35.000)', included: true },
				{ text: 'Buat Hal. Baru (Rp 45.000)', included: true },
				{ text: 'Basic Image Editing (Rp 15.000)', included: true },
				{ text: 'Backup Rutin (Mingguan)', included: true }
			],
			features: [
				{ text: 'Pilihan Template (Custom Layout)', included: true },
				{ text: 'SEO Power (Indexing & Sitemap)', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Analytics (Google Analytics)', included: true },
				{ text: 'API Integration (basic)', included: true }
			]
		},
		cta: 'Pilih Enterprise'
	};

	const customPlan: Plan = {
		name: 'Custom',
		price: 'IDR 4.297.000+',
		description: 'Website custom yang disesuaikan dengan kebutuhan bisnis Anda.',
		features: [
			{ text: 'Custom Pages Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Custom)', included: true },
			{ text: 'Free Domain .co / .io (1 thn)', included: true },
			{ text: 'Support & Maintenance (Custom)', included: true },
			{ text: 'Custom Functionality', included: true },
			{ text: 'CMS Integration (Custom)', included: true }
		],
		details: {
			services: [
				{ text: '14+ Hari Kerja', included: true },
				{ text: '40 GB (cloud)', included: true },
				{ text: 'Free .co / .info / .io', included: true },
				{ text: 'Email Domain (unlimited)', included: true },
				{ text: 'Custom UI/UX', included: true }
			],
			maintenance: [
				{ text: 'Free Update Page (5 Hal / bln)', included: true },
				{ text: 'Edit Hal. Tambahan (Rp 40.000)', included: true },
				{ text: 'Buat Hal. Baru (Rp 50.000)', included: true },
				{ text: 'Basic Image Editing (Rp 15.000)', included: true },
				{ text: 'Backup Rutin (Harian)', included: true }
			],
			features: [
				{ text: 'Pilihan Template (Custom Layout)', included: true },
				{ text: 'SEO Power (Full SEO Strategy)', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Analytics (Custom Dashboard)', included: true },
				{ text: 'API Integration (Full API)', included: true }
			]
		},
		cta: 'Hubungi Kami'
	};

	const saasPlan: Plan = {
		name: 'SaaS',
		price: 'Kontak Kami',
		description: 'Platform SaaS yang scalable dan dapat digunakan oleh multiple users.',
		features: [
			{ text: 'Unlimited Pages Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Full Optimization)', included: true },
			{ text: 'Free Any Domain (1 thn)', included: true },
			{ text: 'Support & Maintenance (6 bln)', included: true },
			{ text: 'Custom Functionality (SaaS)', included: true },
			{ text: 'CMS Integration (Multi-tenant)', included: true }
		],
		details: {
			services: [
				{ text: 'Sesuai Scope', included: true },
				{ text: 'VPS', included: true },
				{ text: 'All Ext.', included: true },
				{ text: 'Email Domain (unlimited)', included: true },
				{ text: 'Bespoke', included: true }
			],
			maintenance: [
				{ text: 'Free Update Page (Managed Service)', included: true },
				{ text: 'Edit Hal. Tambahan (Custom Fee)', included: true },
				{ text: 'Buat Hal. Baru (Custom Fee)', included: true },
				{ text: 'Basic Image Editing (Include)', included: true },
				{ text: 'Backup Rutin (Harian)', included: true }
			],
			features: [
				{ text: 'Pilihan Template (Bespoke)', included: true },
				{ text: 'SEO Power (Full SEO Strategy)', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Analytics (Advanced BI)', included: true },
				{ text: 'API Integration (Full API)', included: true }
			]
		},
		cta: 'Hubungi Kami'
	};

	let activeFirstCardTab: 'free' | 'starter' = 'starter';
	let activeSecondCardTab: 'business' | 'enterprise' = 'business';
	let activeThirdCardTab: 'custom' | 'saas' = 'custom';
	let isAllExpanded = false;

	$: currentFirstPlan = activeFirstCardTab === 'free' ? freePlan : starterPlan;
	$: currentSecondPlan = activeSecondCardTab === 'business' ? businessPlan : enterprisePlan;
	$: currentThirdPlan = activeThirdCardTab === 'custom' ? customPlan : saasPlan;

	let sectionRef: HTMLElement;
	let cards: HTMLElement[] = [];

	onMount(() => {
		gsap.from(cards, {
			scrollTrigger: {
				trigger: sectionRef,
				start: 'top 80%',
				end: 'top 20%',
				scrub: 1
			},
			y: 100,
			opacity: 0,
			stagger: 0.2,
			duration: 1,
			ease: 'power3.out'
		});
	});
</script>

<section id="pricing" class="bg-black py-24 relative overflow-hidden" bind:this={sectionRef}>
	<div class="absolute inset-0 h-[1000px] pointer-events-none overflow-hidden">
		<ParticleBackground />
	</div>
	<div class="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/95 z-0 pointer-events-none"></div>
	
	<div class="relative z-10">
		<div class="container mx-auto px-4 mb-8">
			<div class="max-w-3xl mx-auto text-center space-y-4">
				<div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Paket Harga</div>
				<h3 class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']">
					Pilih Porsi <br class="block md:hidden" />Realisasi Visi
				</h3>
				<p class="text-sm md:text-lg text-white/60 leading-relaxed">
					Mewujudkan ambisi melalui proporsi tepat, melahirkan kualitas tanpa kompromi
				</p>
			</div>
		</div>

		<div class="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory carousel-inner pt-4">
			<!-- Card 1: Starter / Free -->
			<div bind:this={cards[0]} class="h-full flex-shrink-0 w-[85%] md:w-auto snap-center">
				<Card class="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-200/30 {isAllExpanded ? 'ring-1 ring-yellow-200/20' : ''}">
					<div class="flex p-1 bg-white/5 rounded-xl mb-6 border border-white/10">
						<button 
							class="flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 {activeFirstCardTab === 'free' ? 'bg-yellow-200 text-black shadow-lg' : 'text-white/60 hover:text-white'}"
							on:click={() => activeFirstCardTab = 'free'}
						>
							FREE
						</button>
						<button 
							class="flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 {activeFirstCardTab === 'starter' ? 'bg-yellow-200 text-black shadow-lg' : 'text-white/60 hover:text-white'}"
							on:click={() => activeFirstCardTab = 'starter'}
						>
							STARTER
						</button>
					</div>

					<div class="mb-6">
						<h4 class="text-xl font-bold text-white mb-2">{currentFirstPlan.name}</h4>
						<div class="flex items-baseline gap-1">
							<span class="text-3xl font-black text-yellow-200">{currentFirstPlan.price}</span>
						</div>
						<p class="text-white/60 mt-4 text-sm leading-relaxed h-12 overflow-hidden">{currentFirstPlan.description}</p>
					</div>

					<div class="space-y-4 mb-8 flex-grow">
						{#each currentFirstPlan.features as feature}
							<div class="flex items-end gap-3">
								<div class="{feature.included ? 'bg-yellow-200/20' : 'bg-white/5'} rounded-full p-1">
									{#if feature.included}
										<Check size={14} class="text-yellow-200" />
									{:else}
										<X size={14} class="text-white/20" />
									{/if}
								</div>
								<span class="text-sm {feature.included ? 'text-white/80' : 'text-white/30 line-through'}">{feature.text}</span>
							</div>
						{/each}
					</div>

					<!-- Expanded Details Section -->
						{#if isAllExpanded && currentFirstPlan.details}
							<div transition:slide={{ duration: 500 }} class="mb-6 space-y-6">
							<!-- Services -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Layanan</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentFirstPlan.details.services as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Maintenance -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Maintenance</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentFirstPlan.details.maintenance as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Features -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Fitur</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentFirstPlan.details.features as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					<div class="space-y-4 mt-auto">
						<Button 
							variant="outline" 
							class="w-full h-12 rounded-xl font-bold transition-all duration-300 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-yellow-200/50 hover:text-yellow-200"
						>
							{currentFirstPlan.cta}
						</Button>
						{#if currentFirstPlan.note}
							<p class="text-[10px] text-white/40 text-center italic">{currentFirstPlan.note}</p>
						{/if}
					</div>
				</Card>
			</div>

			<!-- Card 2: Business / Enterprise (Recommended) -->
			<div bind:this={cards[1]} class="h-full flex-shrink-0 w-[85%] md:w-auto snap-center">
				<Card class="relative bg-white/5 border border-yellow-200/30 rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-200/50 ring-1 ring-yellow-200/20">
					<div class="absolute -top-4 left-1/2 -translate-x-1/2">
						<Badge class="bg-yellow-200 text-black font-bold px-4 py-1 rounded-full shadow-lg shadow-yellow-200/20">
							PALING POPULER
						</Badge>
					</div>

					<div class="flex p-1 bg-white/5 rounded-xl mb-6 border border-white/10">
						<button 
							class="flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 {activeSecondCardTab === 'business' ? 'bg-yellow-200 text-black shadow-lg' : 'text-white/60 hover:text-white'}"
							on:click={() => activeSecondCardTab = 'business'}
						>
							BUSINESS
						</button>
						<button 
							class="flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 {activeSecondCardTab === 'enterprise' ? 'bg-yellow-200 text-black shadow-lg' : 'text-white/60 hover:text-white'}"
							on:click={() => activeSecondCardTab = 'enterprise'}
						>
							ENTERPRISE
						</button>
					</div>

					<div class="mb-6">
						<h4 class="text-xl font-bold text-white mb-2">{currentSecondPlan.name}</h4>
						<div class="flex items-baseline gap-1">
							<span class="text-3xl font-black text-yellow-200">{currentSecondPlan.price}</span>
						</div>
						<p class="text-white/60 mt-4 text-sm leading-relaxed h-12 overflow-hidden">{currentSecondPlan.description}</p>
					</div>

					<div class="space-y-4 mb-8 flex-grow">
						{#each currentSecondPlan.features as feature}
							<div class="flex items-end gap-3">
								<div class="{feature.included ? 'bg-yellow-200/20' : 'bg-white/5'} rounded-full p-1">
									{#if feature.included}
										<Check size={14} class="text-yellow-200" />
									{:else}
										<X size={14} class="text-white/20" />
									{/if}
								</div>
								<span class="text-sm {feature.included ? 'text-white/80' : 'text-white/30 line-through'}">{feature.text}</span>
							</div>
						{/each}
					</div>

					<!-- Expanded Details Section -->
						{#if isAllExpanded && currentSecondPlan.details}
							<div transition:slide={{ duration: 500 }} class="mb-6 space-y-6">
							<!-- Services -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Layanan</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentSecondPlan.details.services as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Maintenance -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Maintenance</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentSecondPlan.details.maintenance as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Features -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Fitur</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentSecondPlan.details.features as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					<div class="space-y-4 mt-auto">
						<Button 
							class="w-full h-12 rounded-xl font-bold transition-all duration-300 bg-yellow-200 text-black hover:bg-yellow-300 hover:scale-[1.02] shadow-xl shadow-yellow-200/10"
						>
							{currentSecondPlan.cta}
						</Button>
					</div>
				</Card>
			</div>

			<!-- Card 3: Custom / SaaS -->
			<div bind:this={cards[2]} class="h-full flex-shrink-0 w-[85%] md:w-auto snap-center">
				<Card class="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-200/30 {isAllExpanded ? 'ring-1 ring-yellow-200/20' : ''}">
					<div class="flex p-1 bg-white/5 rounded-xl mb-6 border border-white/10">
						<button 
							class="flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 {activeThirdCardTab === 'custom' ? 'bg-yellow-200 text-black shadow-lg' : 'text-white/60 hover:text-white'}"
							on:click={() => activeThirdCardTab = 'custom'}
						>
							CUSTOM
						</button>
						<button 
							class="flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 {activeThirdCardTab === 'saas' ? 'bg-yellow-200 text-black shadow-lg' : 'text-white/60 hover:text-white'}"
							on:click={() => activeThirdCardTab = 'saas'}
						>
							SAAS
						</button>
					</div>

					<div class="mb-6">
						<h4 class="text-xl font-bold text-white mb-2">{currentThirdPlan.name}</h4>
						<div class="flex items-baseline gap-1">
							<span class="text-3xl font-black text-yellow-200">{currentThirdPlan.price}</span>
						</div>
						<p class="text-white/60 mt-4 text-sm leading-relaxed h-12 overflow-hidden">{currentThirdPlan.description}</p>
					</div>

					<div class="space-y-4 mb-8 flex-grow">
						{#each currentThirdPlan.features as feature}
							<div class="flex items-end gap-3">
								<div class="{feature.included ? 'bg-yellow-200/20' : 'bg-white/5'} rounded-full p-1">
									{#if feature.included}
										<Check size={14} class="text-yellow-200" />
									{:else}
										<X size={14} class="text-white/20" />
									{/if}
								</div>
								<span class="text-sm {feature.included ? 'text-white/80' : 'text-white/30 line-through'}">{feature.text}</span>
							</div>
						{/each}
					</div>

					<!-- Expanded Details Section -->
						{#if isAllExpanded && currentThirdPlan.details}
							<div transition:slide={{ duration: 500 }} class="mb-6 space-y-6">
							<!-- Services -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Layanan</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentThirdPlan.details.services as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Maintenance -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Maintenance</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentThirdPlan.details.maintenance as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Features -->
							<div>
								<div class="flex items-center gap-2 mb-4">
									<div class="h-px flex-grow bg-yellow-200/20"></div>
									<h5 class="text-[10px] font-black text-yellow-200 uppercase tracking-widest">Fitur</h5>
									<div class="h-px flex-grow bg-yellow-200/20"></div>
								</div>
								<div class="space-y-2.5">
									{#each currentThirdPlan.details.features as item}
										<div class="flex items-start gap-2">
											<div class="mt-0.5 {item.included ? 'text-yellow-200' : 'text-white/20'}">
												{#if item.included}
													<Check size={12} />
												{:else}
													<X size={12} />
												{/if}
											</div>
											<span class="text-xs {item.included ? 'text-white/70' : 'text-white/30 line-through'}">{item.text}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					<div class="space-y-4 mt-auto">
						<Button 
							variant="outline" 
							class="w-full h-12 rounded-xl font-bold transition-all duration-300 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-yellow-200/50 hover:text-yellow-200"
						>
							{currentThirdPlan.cta}
						</Button>
					</div>
				</Card>
			</div>
		</div>

		<!-- Global Toggle Button Below Cards -->
		<div class="flex justify-center mt-8">
			<button
				on:click={() => isAllExpanded = !isAllExpanded}
				class="group relative px-8 py-3 rounded-full bg-white/5 border border-yellow-200/30 text-yellow-200 font-bold text-sm transition-all duration-300 hover:bg-yellow-200 hover:text-black hover:border-yellow-200 flex items-center gap-3 shadow-lg shadow-yellow-200/5"
			>
				{isAllExpanded ? 'Sembunyikan' : 'Lihat'} Detail Perbandingan
				<ChevronDown size={18} class="transition-transform duration-500 {isAllExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}" />
			</button>
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

	.snap-center {
		scroll-snap-align: center;
		scroll-snap-stop: always;
	}

	.carousel-inner {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	@media (min-width: 768px) {
		.carousel-inner {
			padding-left: 0;
			padding-right: 0;
			max-width: 80rem; /* 1280px / container max-width */
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
