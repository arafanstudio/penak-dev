<script lang="ts">
	import { Star, Quote } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Card from '$lib/components/ui/card.svelte';

	gsap.registerPlugin(ScrollTrigger);

	interface Testimonial {
		name: string;
		role: string;
		company: string;
		content: string;
		rating: number;
	}

	const testimonials: Testimonial[] = [
		{
			name: 'Andi Pratama',
			role: 'CEO',
			company: 'TechVibe Indonesia',
			content: 'Penak Dev berhasil mengubah visi bisnis kami menjadi website yang sangat profesional. Performa dan desainnya luar biasa.',
			rating: 5
		},
		{
			name: 'Siti Rahma',
			role: 'Founder',
			company: 'Rahma Boutique',
			content: 'Sangat puas dengan layanan custom store-nya. Timnya sangat responsif dan membantu setiap kendala teknis kami.',
			rating: 5
		},
		{
			name: 'Budi Santoso',
			role: 'Marketing Manager',
			company: 'Global Logistic',
			content: 'Proses pengerjaan cepat dan terstruktur. Hasil akhirnya melebihi ekspektasi kami. Highly recommended!',
			rating: 5
		}
	];

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
			scale: 0.9,
			stagger: 0.1,
			duration: 0.8,
			ease: 'power3.out'
		});
	});
</script>

<section id="testimonials" class="bg-black py-24 relative overflow-hidden" bind:this={sectionRef}>
	<div class="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/95 z-0 pointer-events-none"></div>
	<div class="container relative z-10">
		<div class="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
			<div class="max-w-2xl space-y-4">
				<div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Testimoni</div>
				<h3 class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']">
					Apa Kata Mereka <br /> Tentang Kami
				</h3>
			</div>
			<div class="flex items-center gap-2 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
				<div class="flex">
					{#each Array(5) as _}
						<Star size={18} class="text-yellow-200 fill-yellow-200" />
					{/each}
				</div>
				<span class="text-white font-bold">4.9/5.0</span>
				<span class="text-white/40 text-sm ml-2">dari 100+ klien</span>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each testimonials as item, i}
				<div bind:this={cards[i]}>
					<Card class="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden h-full flex flex-col transition-all duration-500 hover:bg-white/10">
						<div class="absolute -top-4 -right-4 text-yellow-200/10">
							<Quote size={120} />
						</div>
						
						<div class="flex gap-1 mb-6">
							{#each Array(item.rating) as _}
								<Star size={14} class="text-yellow-200 fill-yellow-200" />
							{/each}
						</div>

						<p class="text-white/80 text-lg leading-relaxed mb-8 flex-grow italic">
							"{item.content}"
						</p>

						<div class="flex items-center gap-4">
							<div class="w-12 h-12 rounded-full bg-yellow-200/20 flex items-center justify-center text-yellow-200 font-bold text-xl border border-yellow-200/30">
								{item.name[0]}
							</div>
							<div>
								<h5 class="text-white font-bold">{item.name}</h5>
								<p class="text-white/40 text-sm">{item.role}, {item.company}</p>
							</div>
						</div>
					</Card>
				</div>
			{/each}
		</div>

		<!-- Trust Signals -->
		<div class="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
			{#each ['GOOGLE', 'META', 'SHOPIFY', 'STRIPE', 'AWS'] as brand}
				<span class="text-2xl font-black text-white tracking-tighter">{brand}</span>
			{/each}
		</div>
	</div>
</section>
