<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    let sectionTitle: HTMLElement;
    let scrollContainer: HTMLElement;

    const products = [
        {
            title: "Personal/Corporate Website",
            description: "Website profesional untuk membangun branding diri atau perusahaan Anda dengan desain modern dan responsif.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "SaaS Solution",
            description: "Solusi perangkat lunak berbasis cloud yang scalable untuk membantu operasional bisnis Anda menjadi lebih efisien.",
            image: "https://images.unsplash.com/photo-1551288049-bbda6465fba1?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "Custom Web App",
            description: "Aplikasi web kustom yang dirancang khusus sesuai dengan kebutuhan unik dan alur kerja bisnis Anda.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        }
    ];

    onMount(() => {
        gsap.from(sectionTitle, {
            scrollTrigger: {
                trigger: sectionTitle,
                start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".product-card", {
            scrollTrigger: {
                trigger: scrollContainer,
                start: "top 80%",
            },
            opacity: 0,
            x: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    });
</script>

<section id="top-products" class="bg-black py-24 relative overflow-hidden">
    <!-- Optional gradient to match other sections -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/95 z-0 pointer-events-none"></div>

    <div class="container mx-auto px-4 relative z-10">
        <div bind:this={sectionTitle} class="mb-16 space-y-4">
            <div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Rekomendasi</div>
            <h2 
                class="text-white text-3xl md:text-5xl font-extrabold leading-tight font-['Playfair_Display']"
            >
                CHECK OUR TOP PRODUCT
            </h2>
        </div>

        <!-- Scrollable Container with 1.5 Card Peek Effect -->
        <div class="overflow-hidden">
            <div 
                bind:this={scrollContainer}
                class="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar"
                style="scrollbar-width: none; -ms-overflow-style: none;"
            >
                {#each products as product, i}
                    <div class="product-card flex-none snap-start">
                        <div class="bg-white/5 border border-white/10 p-4 md:p-6 flex flex-col md:flex-row gap-6 h-full hover:border-yellow-200/30 transition-all duration-300 rounded-2xl">
                            <!-- Image Container -->
                            <div class="w-32 md:w-40 h-32 md:h-40 flex-none overflow-hidden rounded-xl">
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    class="w-full h-full object-cover"
                                />
                            </div>
                            
                            <!-- Content -->
                            <div class="flex flex-col justify-center flex-1">
                                <h3 class="text-white text-lg md:text-xl font-bold mb-3 tracking-tight">
                                    {product.title}
                                </h3>
                                <p class="text-white/60 text-xs md:text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    
    /* Mobile: Each card takes 85vw to ensure visibility */
    @media (max-width: 768px) {
        .product-card {
            width: 85vw;
            min-width: 85vw;
        }
    }

    /* Desktop: Each card takes 40vw */
    @media (min-width: 769px) {
        .product-card {
            width: 40vw;
            min-width: 40vw;
        }
    }

    h2 {
        letter-spacing: 0.02em;
    }
</style>
