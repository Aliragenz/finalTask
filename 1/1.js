function hitungTotalUangInvestasi() {
    // Modalnya
    const modalAwal = 1000000000; // 1 miliar

    // Investasi
    const deposito = 350000000; // 350 juta
    const obligasi = 650000000; // 650 juta
    const obligasi_negara = 0.30 * obligasi ; //30%

    const sahamA = 0.35 * obligasi; // 35% dari sisa
    const sahamB = obligasi - obligasi_negara - sahamA; // Sisanya

    // Keuntungan per tahun
    const bungaDeposito = 0.035; // 3.5%
    const bungaObligasi = 0.13; // 13%
    const bungaSahamA = 0.145; // 14.5%
    const bungaSahamB = 0.125; // 12.5%

    // Hitung total masing-masing
    const totalDeposito = deposito * bungaDeposito;
    const totalObligasi = obligasi_negara * bungaObligasi;
    const totalSahamA = sahamA * bungaSahamA;
    const totalSahamB = sahamB * bungaSahamB;

    // const 

    const totalUang = (totalDeposito + totalObligasi + totalSahamA + totalSahamB) * 2;

    // Hasil total uang investor setelah 2 tahun
    console.log(`Total uang investor setelah 2 tahun: Rp ${totalUang}`);
    
}

hitungTotalUangInvestasi();
