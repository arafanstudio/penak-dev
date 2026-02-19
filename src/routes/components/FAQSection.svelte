<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	interface FAQ {
		question: string;
		answer: string;
		open: boolean;
	}

	let faqs: FAQ[] = [
		{
			question: 'Berapa lama proses pembuatan website?',
			answer: 'Waktu pengerjaan bervariasi tergantung kompleksitas. Untuk landing page sederhana biasanya memakan waktu 3-7 hari kerja, sedangkan sistem custom bisa 2-4 minggu.',
			open: true
		},
		{
			question: 'Apakah saya mendapatkan akses admin?',
			answer: 'Ya, setiap website yang kami bangun (kecuali paket statis tertentu) dilengkapi dengan Content Management System (CMS) yang memudahkan Anda mengelola konten sendiri.',
			open: false
		},
		{
			question: 'Bagaimana dengan maintenance setelah website jadi?',
			answer: 'Kami menyediakan dukungan teknis gratis selama 1-3 bulan tergantung paket. Setelah itu, Anda bisa memilih paket maintenance bulanan atau tahunan.',
			open: false
		},
		{
			question: 'Apakah website sudah termasuk SEO?',
			answer: 'Tentu. Kami menerapkan praktik SEO On-Page dasar pada semua proyek kami untuk memastikan website Anda mudah ditemukan oleh mesin pencari.',
			open: false
		}
	];

	function toggleFAQ(index: number) {
		faqs = faqs.map((faq, i) => ({
			...faq,
			open: i === index ? !faq.open : false
		}));
	}

	let sectionRef: HTMLElement;

	onMount(() => {
		gsap.from(sectionRef?.querySelectorAll('.faq-item'), {
			scrollTrigger: {
				trigger: sectionRef,
				start: 'top 80%',
				end: 'top 20%',
				scrub: 0.5
			},
			opacity: 0,
			x: -20,
			stagger: 0.1,
			duration: 0.8,
			ease: 'power3.out'
		});
	});
</script>

<section id="faq" class="bg-black py-24 relative overflow-hidden" bind:this={sectionRef}>
	<div class="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/95 z-0 pointer-events-none"></div>
	<div class="container relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
			<!-- Sidebar -->
			<div class="lg:col-span-5 space-y-6 text-center lg:text-left">
				<div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">
					FAQ
				</div>
				
				<h3 class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']">
					Pertanyaan yang <br class="hidden lg:block" /> Sering Diajukan
				</h3>
				
				<p class="text-white/60 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
					Punya pertanyaan lain? Jangan ragu untuk menghubungi tim kami melalui WhatsApp atau Email.
				</p>
				
				<div class="pt-4">
					<a href="#contact" class="inline-flex items-center gap-2 text-yellow-200 font-bold hover:underline">
						Hubungi Customer Service →
					</a>
				</div>
			</div>

			<!-- FAQ List -->
			<div class="lg:col-span-7 space-y-4">
				{#each faqs as faq, i}
					<div class="faq-item group">
						<button 
							class="w-full text-left p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] transition-all duration-300 hover:bg-white/10 flex justify-between items-center gap-4 {faq.open ? 'border-yellow-200/30 bg-white/10' : ''}"
							on:click={() => toggleFAQ(i)}
						>
							<span class="text-lg md:text-xl font-bold text-white group-hover:text-yellow-200 transition-colors">
								{faq.question}
							</span>
							<div class="shrink-0 transition-transform duration-300 {faq.open ? 'rotate-180 text-yellow-200' : 'text-white/40'}">
								<ChevronDown size={24} />
							</div>
						</button>
						
						{#if faq.open}
							<div class="px-8 py-6 text-white/60 leading-relaxed text-lg animate-in fade-in slide-in-from-top-4 duration-300">
								{faq.answer}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
