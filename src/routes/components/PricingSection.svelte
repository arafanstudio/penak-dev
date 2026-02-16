<script lang="ts">
	import { Check, X, ChevronDown } from 'lucide-svelte';
	import { onMount } from 'svelte';
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
		'Free Domain (1th)',
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
			{ text: 'Free Domain (Subdomain)', included: true },
			{ text: 'Support & Maintenance (Limited)', included: true },
			{ text: 'Custom Functionality', included: false },
			{ text: 'CMS Integration', included: false }
		],
		details: {
			services: [
				{ text: 'Website Profile Sekolah', included: true },
				{ text: 'Halaman Informasi & Berita', included: true },
				{ text: 'Formulir Kontak Dasar', included: true },
				{ text: 'Galeri Foto', included: true },
				{ text: 'Custom Branding', included: false }
			],
			maintenance: [
				{ text: 'Update Konten Gratis', included: true },
				{ text: 'Backup Mingguan', included: true },
				{ text: 'Monitoring 24/7', included: false },
				{ text: 'Support Email', included: true },
				{ text: 'SLA Guarantee', included: false }
			],
			features: [
				{ text: 'SEO Basic', included: true },
				{ text: 'Mobile Responsive', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Analytics Dashboard', included: false },
				{ text: 'API Integration', included: false }
			]
		},
		cta: 'Daftar Sekarang',
		note: '*Terbatas, tidak bisa kustom'
	};

	const starterPlan: Plan = {
		name: 'Starter',
		price: 'Rp 1.5jt',
		description: 'Cocok untuk profil pribadi atau landing page sederhana.',
		features: [
			{ text: 'Single Page Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Basic)', included: true },
			{ text: 'Free Domain .com (1th)', included: true },
			{ text: 'Support & Maintenance (1 bln)', included: true },
			{ text: 'Custom Functionality', included: false },
			{ text: 'CMS Integration', included: false }
		],
		details: {
			services: [
				{ text: 'Landing Page Profesional', included: true },
				{ text: 'Contact Form Integration', included: true },
				{ text: 'Social Media Links', included: true },
				{ text: 'Email Newsletter Setup', included: true },
				{ text: 'Custom Pages', included: false }
			],
			maintenance: [
				{ text: 'Monthly Updates', included: true },
				{ text: 'Backup Mingguan', included: true },
				{ text: 'Email Support', included: true },
				{ text: 'Phone Support', included: false },
				{ text: 'Dedicated Manager', included: false }
			],
			features: [
				{ text: 'SEO Optimization', included: true },
				{ text: 'Mobile Responsive', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Basic Analytics', included: true },
				{ text: 'Third-party Integration', included: false }
			]
		},
		cta: 'Pilih Starter'
	};

	const businessPlan: Plan = {
		name: 'Business',
		price: 'Rp 3.5jt',
		description: 'Solusi profesional untuk bisnis yang sedang berkembang.',
		features: [
			{ text: 'Up to 5 Pages Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Standard)', included: true },
			{ text: 'Free Domain .com (1th)', included: true },
			{ text: 'Support & Maintenance (3 bln)', included: true },
			{ text: 'Custom Functionality', included: true },
			{ text: 'CMS Integration', included: true }
		],
		details: {
			services: [
				{ text: 'Multi-page Website', included: true },
				{ text: 'CMS Management System', included: true },
				{ text: 'E-commerce Ready', included: true },
				{ text: 'Google Maps Integration', included: true },
				{ text: 'Advanced Contact Forms', included: true }
			],
			maintenance: [
				{ text: 'Monthly Updates', included: true },
				{ text: 'Weekly Backups', included: true },
				{ text: 'Email & Chat Support', included: true },
				{ text: 'Performance Monitoring', included: true },
				{ text: 'Security Patches', included: true }
			],
			features: [
				{ text: 'Advanced SEO', included: true },
				{ text: 'Mobile Responsive', included: true },
				{ text: 'SSL Certificate', included: true },
				{ text: 'Advanced Analytics', included: true },
				{ text: 'API Integration', included: true }
			]
		},
		recommended: true,
		cta: 'Pilih Business'
	};

	const enterprisePlan: Plan = {
		name: 'Enterprise',
		price: 'Rp 7.5jt',
		description: 'Solusi enterprise lengkap untuk organisasi besar.',
		features: [
			{ text: 'Unlimited Pages Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Advanced)', included: true },
			{ text: 'Free Domain .com (1th)', included: true },
			{ text: 'Support & Maintenance (12 bln)', included: true },
			{ text: 'Custom Functionality', included: true },
			{ text: 'CMS Integration (Advanced)', included: true }
		],
		details: {
			services: [
				{ text: 'Unlimited Pages & Features', included: true },
				{ text: 'Advanced CMS with Workflows', included: true },
				{ text: 'Full E-commerce Platform', included: true },
				{ text: 'Multi-location Support', included: true },
				{ text: 'Custom Integrations', included: true }
			],
			maintenance: [
				{ text: 'Weekly Updates', included: true },
				{ text: 'Daily Backups', included: true },
				{ text: 'Priority Support 24/7', included: true },
				{ text: 'Dedicated Account Manager', included: true },
				{ text: 'Proactive Monitoring', included: true }
			],
			features: [
				{ text: 'Enterprise SEO Suite', included: true },
				{ text: 'Mobile & PWA Ready', included: true },
				{ text: 'Advanced SSL/TLS', included: true },
				{ text: 'Real-time Analytics', included: true },
				{ text: 'Multi-API Integration', included: true }
			]
		},
		cta: 'Pilih Enterprise'
	};

	const customPlan: Plan = {
		name: 'Custom',
		price: 'Kontak Kami',
		description: 'Sistem custom yang disesuaikan dengan kebutuhan bisnis Anda.',
		features: [
			{ text: 'Unlimited Pages Design', included: true },
			{ text: 'Responsive Mobile Friendly', included: true },
			{ text: 'SEO Optimization (Custom)', included: true },
			{ text: 'Free Domain (Included)', included: true },
			{ text: 'Support & Maintenance (Custom)', included: true },
			{ text: 'Custom Functionality', included: true },
			{ text: 'CMS Integration (Custom)', included: true }
		],
		details: {
			services: [
				{ text: 'Fully Custom Architecture', included: true },
				{ text: 'Advanced CMS Solutions', included: true },
				{ text: 'Complex Business Logic', included: true },
				{ text: 'Multiple Third-party APIs', included: true },
				{ text: 'Custom Database Design', included: true }
			],
			maintenance: [
				{ text: 'Bi-weekly Updates', included: true },
				{ text: 'Real-time Backups', included: true },
				{ text: 'Dedicated Support Team', included: true },
				{ text: 'Custom SLA', included: true },
				{ text: 'Proactive Monitoring', included: true }
			],
			features: [
				{ text: 'Enterprise Security', included: true },
				{ text: 'Custom Performance Optimization', included: true },
				{ text: 'Advanced SSL/TLS', included: true },
				{ text: 'Custom Analytics', included: true },
				{ text: 'Unlimited API Integration', included: true }
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
			{ text: 'SEO Optimization (Enterprise)', included: true },
			{ text: 'Free Domain (Included)', included: true },
			{ text: 'Support & Maintenance (24/7)', included: true },
			{ text: 'Custom Functionality (SaaS)', included: true },
			{ text: 'CMS Integration (Multi-tenant)', included: true }
		],
		details: {
			services: [
				{ text: 'Multi-tenant SaaS Platform', included: true },
				{ text: 'Unlimited User Accounts', included: true },
				{ text: 'Advanced Workflow Automation', included: true },
				{ text: 'White-label Options', included: true },
				{ text: 'Scalable Infrastructure', included: true }
			],
			maintenance: [
				{ text: 'Continuous Deployment', included: true },
				{ text: 'Real-time Backups & Redundancy', included: true },
				{ text: '24/7 Premium Support', included: true },
				{ text: 'Dedicated DevOps Team', included: true },
				{ text: 'Automatic Security Updates', included: true }
			],
			features: [
				{ text: 'Enterprise-grade Security', included: true },
				{ text: 'Auto-scaling Infrastructure', included: true },
				{ text: 'Advanced SSL/TLS & Encryption', included: true },
				{ text: 'Real-time Analytics & Reporting', included: true },
				{ text: 'Unlimited API Integration', included: true }
			]
		},
		cta: 'Hubungi Kami'
	};

	let activeFirstCardTab: 'free' | 'starter' = 'starter';
	$: currentFirstPlan = activeFirstCardTab === 'free' ? freePlan : starterPlan;

	let activeSecondCardTab: 'business' | 'enterprise' = 'business';
	$: currentSecondPlan = activeSecondCardTab === 'business' ? businessPlan : enterprisePlan;

	let activeThirdCardTab: 'custom' | 'saas' = 'custom';
	$: currentThirdPlan = activeThirdCardTab === 'custom' ? customPlan : saasPlan;

	// Global Expand State
	let isAllExpanded = false;

	let sectionRef: HTMLElement;
	let cards: HTMLElement[] = [];

	onMount(() => {
		gsap.from(cards, {
			scrollTrigger: {
				trigger: sectionRef,
				start: 'top 70%',
				end: 'top 20%',
				scrub: 0.5
			},
			opacity: 0,
			y: 50,
			stagger: 0.1,
			duration: 0.8,
			ease: 'power3.out'
		});
	});
</script>

<section id="pricing" bind:this={sectionRef} class="py-24 relative overflow-hidden bg-[#000000]">
	<ParticleBackground />
	
	<div class="container relative z-10">
		<div class="text-center mb-16 space-y-4">
			<div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Investasi Digital</div>
			<h3 class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']">
				Paket Harga Transparan
			</h3>
			<p class="text-white/60 max-w-2xl mx-auto text-lg">
				Pilih paket yang paling sesuai dengan kebutuhan Anda. Kami menyediakan solusi dari profil sekolah hingga sistem kustom.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
			<!-- Card 1: Toggle between Free and Starter -->
			<div bind:this={cards[0]} class="h-full">
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
						<div class="mb-6 space-y-6 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
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
						{#if currentFirstPlan.note}
							<p class="text-[10px] text-yellow-200/60 italic text-center">{currentFirstPlan.note}</p>
						{/if}
						<Button 
							variant="outline" 
							class="w-full h-12 rounded-xl font-bold transition-all duration-300 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-yellow-200/50 hover:text-yellow-200"
						>
							{currentFirstPlan.cta}
						</Button>
					</div>
				</Card>
			</div>

			<!-- Card 2: Business / Enterprise -->
			<div bind:this={cards[1]} class="h-full">
				<Card class="relative bg-white/5 border border-yellow-200/30 rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-200/50 hover:scale-105 hover:z-20 shadow-2xl shadow-yellow-200/5 {isAllExpanded ? 'ring-1 ring-yellow-200/40' : ''}">
					<div class="absolute -top-4 left-1/2 -translate-x-1/2">
						<Badge class="bg-yellow-200 text-black font-bold px-4 py-1 rounded-full border-none shadow-lg">PALING POPULER</Badge>
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
						<div class="mb-6 space-y-6 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
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
			<div bind:this={cards[2]} class="h-full">
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
						<div class="mb-6 space-y-6 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
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
		<div class="flex justify-center mt-16">
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
