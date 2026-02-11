<script lang="ts">
	import { Check, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card.svelte';
	import Badge from '$lib/components/ui/badge.svelte';
	import ParticleBackground from './ParticleBackground.svelte';

	gsap.registerPlugin(ScrollTrigger);

	interface Plan {
		name: string;
		price: string;
		description: string;
		features: { text: string; included: boolean }[];
		recommended?: boolean;
		cta: string;
		note?: string;
	}

	const freePlan: Plan = {
		name: 'Web Sekolah',
		price: 'FREE',
		description: 'Kontribusi kami untuk dunia pendidikan Indonesia.',
		features: [
			{ text: 'Single Page Profile', included: true },
			{ text: 'Informasi Sekolah & Kontak', included: true },
			{ text: 'Responsive Design', included: true },
			{ text: 'Custom Domain', included: false },
			{ text: 'Support Prioritas', included: false }
		],
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
			{ text: 'SEO Basic Optimization', included: true },
			{ text: 'Free Domain .com (1th)', included: true },
			{ text: 'Support 1 Bulan', included: true },
			{ text: 'Custom Functionality', included: false }
		],
		cta: 'Pilih Starter'
	};

	const businessPlan: Plan = {
		name: 'Business',
		price: 'Rp 3.5jt',
		description: 'Solusi profesional untuk bisnis yang sedang berkembang.',
		features: [
			{ text: 'Up to 5 Pages', included: true },
			{ text: 'CMS Integration', included: true },
			{ text: 'Premium Design Assets', included: true },
			{ text: 'Google Maps & Contact Form', included: true },
			{ text: 'Speed Optimization', included: true },
			{ text: 'Support 3 Bulan', included: true },
			{ text: 'Custom Functionality', included: true },
		],
		recommended: true,
		cta: 'Pilih Business'
	};

	const customPlan: Plan = {
		name: 'Custom / SaaS',
		price: 'Kontak Kami',
		description: 'Sistem kompleks yang disesuaikan dengan kebutuhan bisnis Anda.',
		features: [
			{ text: 'Unlimited Pages', included: true },
			{ text: 'Custom Functionality', included: true },
			{ text: 'Third-party API Integration', included: true },
			{ text: 'High Security Standards', included: true },
			{ text: 'Dedicated Support', included: true },
			{ text: 'Maintenance Plan', included: true }
		],
		cta: 'Hubungi Kami'
	};

	let activeFirstCardTab: 'free' | 'starter' = 'starter';
	$: currentFirstPlan = activeFirstCardTab === 'free' ? freePlan : starterPlan;

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

<section id="pricing" class="bg-black py-24 relative overflow-hidden" bind:this={sectionRef}>
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

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
			<!-- Card 1: Toggle between Free and Starter -->
			<div bind:this={cards[0]} class="h-full">
				<Card class="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-200/30">
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
							<div class="flex items-start gap-3">
								<div class="mt-1 {feature.included ? 'bg-yellow-200/20' : 'bg-white/5'} rounded-full p-1">
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

					<div class="space-y-4">
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

			<!-- Card 2: Business (Recommended) -->
			<div bind:this={cards[1]} class="h-full">
				<Card class="relative bg-white/5 border border-yellow-200/30 rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-200/50 hover:scale-105 hover:z-20 shadow-2xl shadow-yellow-200/5">
					<div class="absolute -top-4 left-1/2 -translate-x-1/2">
						<Badge class="bg-yellow-200 text-black font-bold px-4 py-1 rounded-full border-none shadow-lg">PALING POPULER</Badge>
					</div>

					<div class="mb-6">
						<h4 class="text-xl font-bold text-white mb-2">{businessPlan.name}</h4>
						<div class="flex items-baseline gap-1">
							<span class="text-3xl font-black text-yellow-200">{businessPlan.price}</span>
						</div>
						<p class="text-white/60 mt-4 text-sm leading-relaxed h-12 overflow-hidden">{businessPlan.description}</p>
					</div>

					<div class="space-y-4 mb-8 flex-grow">
						{#each businessPlan.features as feature}
							<div class="flex items-start gap-3">
								<div class="mt-1 {feature.included ? 'bg-yellow-200/20' : 'bg-white/5'} rounded-full p-1">
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

					<div class="space-y-4">
						<Button 
							variant="default" 
							class="w-full h-12 rounded-xl font-bold transition-all duration-300 bg-yellow-200 text-black hover:bg-yellow-100 shadow-lg shadow-yellow-200/10"
						>
							{businessPlan.cta}
						</Button>
					</div>
				</Card>
			</div>

			<!-- Card 3: Custom -->
			<div bind:this={cards[2]} class="h-full">
				<Card class="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-200/30">
					<div class="mb-6">
						<h4 class="text-xl font-bold text-white mb-2">{customPlan.name}</h4>
						<div class="flex items-baseline gap-1">
							<span class="text-3xl font-black text-yellow-200">{customPlan.price}</span>
						</div>
						<p class="text-white/60 mt-4 text-sm leading-relaxed h-12 overflow-hidden">{customPlan.description}</p>
					</div>

					<div class="space-y-4 mb-8 flex-grow">
						{#each customPlan.features as feature}
							<div class="flex items-start gap-3">
								<div class="mt-1 {feature.included ? 'bg-yellow-200/20' : 'bg-white/5'} rounded-full p-1">
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

					<div class="space-y-4">
						<Button 
							variant="outline" 
							class="w-full h-12 rounded-xl font-bold transition-all duration-300 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-yellow-200/50 hover:text-yellow-200"
						>
							{customPlan.cta}
						</Button>
					</div>
				</Card>
			</div>
		</div>
	</div>
</section>
