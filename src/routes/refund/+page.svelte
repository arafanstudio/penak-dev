<script lang="ts">
    import FooterSection from '../components/FooterSection.svelte';
</script>

<svelte:head>
    <title>Refund Policy - Penak.online</title>
</svelte:head>

<div class="min-h-screen bg-black text-white pt-32 pb-20">
    <div class="container max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-black mb-8 font-['Playfair_Display']">Refund Policy</h1>
        <p class="text-white/60 mb-12 italic text-sm">Terakhir diperbarui: 16 Februari 2026</p>

        <div class="space-y-8 text-lg leading-relaxed">
            <section>
                <h2 class="text-2xl font-bold text-yellow-200 mb-4 font-['Playfair_Display']">Kebijakan Pengembalian Dana</h2>
                <p class="text-white/80">Kami ingin Anda puas dengan layanan kami. Jika Anda mengalami masalah teknis yang tidak dapat kami selesaikan dalam waktu 7 hari kerja, Anda berhak mengajukan pengembalian dana penuh.</p>
                <p class="text-white/80 mt-4">Pengembalian dana tidak berlaku untuk:</p>
                <ul class="list-disc pl-6 space-y-2 mt-4 text-white/80">
                    <li>Kesalahan pengguna dalam pengoperasian layanan.</li>
                    <li>Perubahan pikiran setelah layanan dikirimkan atau dikerjakan.</li>
                    <li>Pelanggaran terhadap Terms of Service kami.</li>
                </ul>
            </section>

            <section>
                <h2 class="text-2xl font-bold text-yellow-200 mb-4 font-['Playfair_Display']">Proses Pengajuan</h2>
                <p class="text-white/80">Untuk mengajukan pengembalian dana, silakan hubungi tim dukungan kami melalui WhatsApp atau email dengan melampirkan bukti transaksi dan detail masalah yang dialami.</p>
            </section>
        </div>
        
        <div class="mt-16 pt-8 border-t border-white/10">
            <a href="/" class="text-yellow-200 font-bold hover:text-yellow-100 transition-colors">← Kembali ke Beranda</a>
        </div>
    </div>
</div>

<FooterSection />
