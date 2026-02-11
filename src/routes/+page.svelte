<script lang="ts">
	import HeroSection from './components/HeroSection.svelte';
	import ShowcaseSection from './components/ShowcaseSection.svelte';
		
	export let data;
	$: ({ showcases } = data);
		
	import PricingSection from './components/PricingSection.svelte';
	import TestimonialsSection from './components/TestimonialsSection.svelte';
	import FAQSection from './components/FAQSection.svelte';
	import FooterSection from './components/FooterSection.svelte';
	import PaginationSidebar from './components/PaginationSidebar.svelte';
</script>

<PaginationSidebar />
<HeroSection />
<ShowcaseSection {showcases} />
<PricingSection />
<TestimonialsSection />
<FAQSection />
<FooterSection />
