import { useState } from 'react';
import './AssetSuitabilityView.css';

// Matrix Penilaian Logika Kecocokan Aset
const SUITABILITY_MATRIX = {
  'Dana Darurat': {
    'Reksa Dana Pasar Uang': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Sangat Ideal.</strong> Likuiditas tinggi dengan pencairan cepat (T+1), fluktuasi nilai sangat rendah, dan tidak ada penalti pencairan sewaktu-waktu dibutuhkan.',
    },
    'Deposito Berjangka': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Cukup Sesuai & Terjamin LPS.</strong> Pokok investasi aman, namun <strong>likuiditas terbatas tenor</strong> dan berpotensi terkena penalti bunga jika dicairkan mendadak sebelum jatuh tempo.',
    },
    'SBN/Obligasi Negara': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Kurang Likuid untuk Kondisi Genting.</strong> Sangat aman karena dijamin negara, tetapi memiliki minimum holding period atau jadwal early redemption tertentu sehingga <strong>sulit dicairkan seketika</strong>.',
    },
    'Reksa Dana Pendapatan Tetap': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Masih Memiliki Fluktuasi NAB.</strong> Terpengaruh oleh pergerakan suku bunga pasar obligasi. Ada potensi <strong>penurunan nilai sesaat</strong> ketika dana darurat mendesak ditarik.',
    },
    'Emas/Logam Mulia': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Spread Jual-Beli Lebar.</strong> Emas aman sebagai safe haven, tetapi ada selisih harga beli & buyback (3-10%) serta <strong>membutuhkan waktu/proses fisik</strong> untuk dicairkan.',
    },
    'Reksa Dana Campuran': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Terlalu Fluktuatif.</strong> Mengandung porsi saham yang rentan terkoreksi tajam. Dana darurat <strong>tidak boleh ditaruh pada aset dengan risiko penurunan modal</strong>.',
    },
    'Reksa Dana Saham': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Risiko Volatilitas Tinggi.</strong> Nilai aset bisa turun signifikan saat pasar jatuh. Berbahaya jika terpaksa dicairkan dalam posisi <strong>floating loss</strong> saat darurat.',
    },
    'Saham Langsung': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Sangat Berisiko & Tidak Tepat.</strong> Fluktuasi harga harian sangat tajam. Anda berisiko <strong>kehilangan modal saat butuh uang cepat</strong>.',
    },
    'P2P Lending': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Risiko Gagal Bayar & Dana Terkunci.</strong> Dana terkunci hingga peminjam melunasi dengan adanya risiko <strong>kredit macet (default)</strong>. Bertolak belakang dengan syarat dana darurat.',
    },
  },
  'Dana Pensiun/FIRE (jangka panjang)': {
    'Saham Langsung': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Sangat Sesuai untuk Horizon Panjang.</strong> Saham berfundamental kuat memiliki <strong>potensi pertumbuhan kapital & dividen tertinggi</strong> untuk mengalahkan inflasi dalam 10-20+ tahun.',
    },
    'Reksa Dana Saham': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Pilihan Utama Akumulasi.</strong> Memberikan diversifikasi ke puluhan emiten dengan manajemen profesional untuk <strong>memaksimalkan efek compounding jangka panjang</strong>.',
    },
    'Reksa Dana Campuran': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Pertumbuhan Terdiversifikasi.</strong> Fleksibilitas alokasi saham dan obligasi membantu pertumbuhan modal dengan <strong>volatilitas yang lebih terukur</strong> menuju masa pensiun.',
    },
    'SBN/Obligasi Negara': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Aman tapi Kurang Optimal.</strong> Kupon stabil, namun jika dijadikan komponen tunggal pensiun, <strong>daya beli berisiko tergerus inflasi jangka panjang</strong>.',
    },
    'Reksa Dana Pendapatan Tetap': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Bagus sebagai Penyeimbang.</strong> Menjaga stabilitas portofolio, namun perlu dipadukan dengan aset ekuitas agar <strong>target nilai pensiun tercapai optimal</strong>.',
    },
    'Emas/Logam Mulia': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Pelindung Nilai Riil (Hedging).</strong> Emas menjaga daya beli terhadap inflasi, namun <strong>tidak menghasilkan arus kas produktif (dividen/bunga)</strong>.',
    },
    'P2P Lending': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Imbal Hasil Tinggi namun Risiko Kredit.</strong> Hanya cocok untuk porsi kecil (satelit) karena adanya <strong>risiko gagal bayar berkepanjangan</strong>.',
    },
    'Deposito Berjangka': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Tergilas Inflasi Jangka Panjang.</strong> Bunga deposito setelah pajak 20% sering kali <strong>di bawah inflasi riil</strong>, membuat nilai riil dana pensiun menyusut dalam horizon puluhan tahun.',
    },
    'Reksa Dana Pasar Uang': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Terlalu Konservatif.</strong> Imbal hasil rendah hanya cocok memarkir dana sementara, bukan untuk <strong>mengakumulasi dana pensiun</strong> yang membutuhkan pertumbuhan modal signifikan.',
    },
  },
  'Dana Pendidikan Anak (jangka menengah)': {
    'Reksa Dana Campuran': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Paling Seimbang.</strong> Memadukan potensi pertumbuhan saham dengan stabilitas obligasi, sangat cocok untuk <strong>horizon menengah 3-7 tahun</strong>.',
    },
    'Reksa Dana Pendapatan Tetap': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Stabil & Imbal Hasil Menarik.</strong> Volatilitas terukur dengan yield obligasi memberikan <strong>kepastian pertumbuhan modal</strong> menjelang waktu pembayaran sekolah/kuliah.',
    },
    'SBN/Obligasi Negara': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Pasti & Terjamin 100%.</strong> Tenor 3-5 tahun (ORI/SR/FR) sangat pas disinkronkan dengan <strong>jadwal pembayaran uang pangkal sekolah</strong>.',
    },
    'Reksa Dana Saham': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Tergantung Sisa Waktu.</strong> Masih layak jika kebutuhan >7 tahun lagi, namun <strong>wajib dipindahkan (de-risk)</strong> ke instrumen stabil saat mendekati 2-3 tahun sebelum dana dipakai.',
    },
    'Saham Langsung': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Butuh Pengawasan Ketat.</strong> Potensi hasil tinggi, tetapi risiko drawdown pasar modal mendekati tahun masuk sekolah dapat <strong>mengganggu rencana pembayaran</strong>.',
    },
    'Reksa Dana Pasar Uang': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Aman tapi Kurang Optimal.</strong> Imbal hasil sulit mengejar <strong>inflasi biaya pendidikan 10-15%/tahun</strong> jika waktu pakai masih lebih dari 3 tahun.',
    },
    'Deposito Berjangka': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Aman namun Pertumbuhan Rendah.</strong> Tepat jika sisa waktu tinggal <1 tahun, tetapi kurang efektif untuk <strong>mengejar kenaikan uang pangkal jangka menengah</strong>.',
    },
    'Emas/Logam Mulia': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Bagus untuk Hedging Biaya Kuliah.</strong> Cukup efektif menahan inflasi pendidikan, namun <strong>fluktuasi harga emas jangka 3-5 tahun</strong> perlu diperhitungkan saat pencairan.',
    },
    'P2P Lending': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Risiko Gagal Bayar Berbahaya.</strong> Dana pendidikan memiliki <strong>tenggat waktu pasti yang tidak bisa ditunda</strong>; risiko macet sangat berisiko mengorbankan sekolah anak.',
    },
  },
  'Tabungan Jangka Pendek/Liburan (<2 tahun)': {
    'Reksa Dana Pasar Uang': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Sangat Sesuai.</strong> Imbal hasil di atas tabungan biasa, bebas pajak, dan <strong>likuid tanpa risiko fluktuasi modal</strong> saat target liburan tiba.',
    },
    'Deposito Berjangka': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Disiplin & Terjamin.</strong> Mengunci dana dengan tenor terencana sehingga <strong>tidak terpakai untuk konsumsi harian</strong> dan pokok terlindungi penuh.',
    },
    'SBN/Obligasi Negara': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Perhatikan Tenor & Likuiditas.</strong> Hanya sesuai jika memilih seri SBN yang <strong>jatuh tempo tepat sebelum dana dibutuhkan</strong> agar tidak terpaksa menjual saat harga diskon.',
    },
    'Reksa Dana Pendapatan Tetap': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Masih Ada Fluktuasi Yield.</strong> Pergerakan suku bunga jangka pendek dapat membuat <strong>nilai dana sedikit terpotong saat butuh ditarik</strong>.',
    },
    'Emas/Logam Mulia': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Kurang Efektif Akibat Selisih Harga.</strong> Horizon <2 tahun berisiko <strong>rugi spread beli-jual</strong> meskipun harga emas global cenderung stabil.',
    },
    'Reksa Dana Campuran': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Terlalu Berisiko.</strong> Dalam horizon <2 tahun, pasar saham di dalamnya bisa turun dan <strong>tidak memiliki cukup waktu untuk recovery</strong>.',
    },
    'Reksa Dana Saham': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Sangat Berbahaya.</strong> Volatilitas saham terlalu tinggi untuk horizon pendek. Anda berisiko <strong>gagal liburan karena portofolio sedang merah</strong>.',
    },
    'Saham Langsung': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Spekulatif untuk Kebutuhan Dekat.</strong> Fluktuasi harga saham harian sangat tajam. <strong>Sangat rentan kehilangan modal</strong> dalam jangka pendek.',
    },
    'P2P Lending': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Dana Terkunci & Risiko Macet.</strong> Dana tidak bisa ditarik mendadak dan ada <strong>risiko dana tidak kembali tepat waktu</strong> saat liburan.',
    },
  },
  'Investasi Jangka Panjang Umum': {
    'Reksa Dana Saham': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Optimal untuk Pertumbuhan Kekayaan.</strong> Horizon panjang mampu meredam volatilitas jangka pendek dan <strong>memaksimalkan hasil investasi di atas inflasi</strong>.',
    },
    'Saham Langsung': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Peluang Capital Gain & Dividen Maksimal.</strong> Kepemilikan langsung pada bisnis unggulan adalah pilar utama <strong>akumulasi kekayaan jangka panjang</strong>.',
    },
    'Reksa Dana Campuran': {
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Pertumbuhan dengan Risiko Terkelola.</strong> Kombinasi dinamis saham dan surat utang memberikan <strong>pertumbuhan aset stabil dengan volatilitas moderat</strong>.',
    },
    'SBN/Obligasi Negara': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Bagus untuk Arus Kas Pasif.</strong> Sangat aman dan terprediksi, namun untuk pertumbuhan kekayaan jangka panjang sebaiknya <strong>didampingi instrumen saham</strong>.',
    },
    'Reksa Dana Pendapatan Tetap': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Penjaga Stabilitas Portofolio.</strong> Sangat baik sebagai jangkar risiko, tetapi <strong>potensi imbal hasil jangka panjangnya di bawah ekuitas</strong>.',
    },
    'Emas/Logam Mulia': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Penyimpan Nilai yang Tangguh.</strong> Bagus sebagai aset safe haven (5-15%), namun emas <strong>tidak menghasilkan produktivitas bisnis atau laba kas</strong>.',
    },
    'P2P Lending': {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Diversifikasi Alternatif.</strong> Menghasilkan imbal hasil tinggi namun memiliki risiko kredit unik; <strong>batasi alokasi maksimal 5-10%</strong> dari total aset.',
    },
    'Reksa Dana Pasar Uang': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Terlalu Konservatif.</strong> Imbal hasil hanya setara inflasi dasar. Menaruh dana investasi panjang di RDPU membuat Anda <strong>kehilangan potensi pertumbuhan modal</strong>.',
    },
    'Deposito Berjangka': {
      verdict: 'Kurang Tepat',
      tone: 'bad',
      reason: '<strong>Tidak Efisien untuk Jangka Panjang.</strong> Terkena pajak 20% dan tingkat bunga riil rendah membuat dana <strong>sulit bertumbuh signifikan</strong> dalam waktu lama.',
    },
  },
};

const INSTRUMENT_OPTIONS = [
  'Reksa Dana Pasar Uang',
  'Deposito Berjangka',
  'SBN/Obligasi Negara',
  'Reksa Dana Pendapatan Tetap',
  'Reksa Dana Campuran',
  'Reksa Dana Saham',
  'Saham Langsung',
  'Emas/Logam Mulia',
  'P2P Lending',
];

const GOAL_OPTIONS = [
  'Dana Darurat',
  'Dana Pensiun/FIRE (jangka panjang)',
  'Dana Pendidikan Anak (jangka menengah)',
  'Tabungan Jangka Pendek/Liburan (<2 tahun)',
  'Investasi Jangka Panjang Umum',
];

// Helper untuk format Rupiah
const formatRupiahDisplay = (val) => {
  if (!val && val !== 0) return 'Rp 0';
  const num = typeof val === 'number' ? val : parseInt(String(val).replace(/\D/g, ''), 10) || 0;
  return 'Rp ' + num.toLocaleString('id-ID');
};

export default function AssetSuitabilityView() {
  // Initial default item specified in requirements:
  // "Dana Darurat Siaga" — Reksa Dana Pasar Uang — tujuan Dana Darurat — Rp120.000.000 (verdict "Sesuai")
  const [analyzedAssets, setAnalyzedAssets] = useState([
    {
      id: 'default-1',
      name: 'Dana Darurat Siaga',
      instrument: 'Reksa Dana Pasar Uang',
      goal: 'Dana Darurat',
      amount: 120000000,
      verdict: 'Sesuai',
      tone: 'ok',
      reason: '<strong>Sangat Ideal.</strong> Likuiditas tinggi dengan pencairan cepat (T+1), fluktuasi nilai sangat rendah, dan tidak ada penalti pencairan sewaktu-waktu dibutuhkan.',
      timestamp: Date.now(),
    },
  ]);

  // Form State
  const [assetName, setAssetName] = useState('');
  const [instrument, setInstrument] = useState(INSTRUMENT_OPTIONS[0]);
  const [goal, setGoal] = useState(GOAL_OPTIONS[0]);
  const [amountRaw, setAmountRaw] = useState('');

  // Handle format Rupiah input
  const handleAmountChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    if (!rawVal) {
      setAmountRaw('');
      return;
    }
    const num = parseInt(rawVal, 10);
    setAmountRaw(num.toLocaleString('id-ID'));
  };

  // Evaluate suitability based on Matrix
  const evaluateSuitability = (selectedGoal, selectedInstrument) => {
    const goalData = SUITABILITY_MATRIX[selectedGoal];
    if (goalData && goalData[selectedInstrument]) {
      return goalData[selectedInstrument];
    }
    // Default fallback
    return {
      verdict: 'Perlu Ditinjau',
      tone: 'review',
      reason: '<strong>Perlu Analisis Lebih Lanjut.</strong> Kombinasi instrumen dan tujuan dana ini belum umum dianalisis secara standar. Sebaiknya diskusikan profil risiko dan horizon waktu Anda lebih mendalam.',
    };
  };

  // Submit Handler: prepend to list & reset name/amount
  const handleAnalyze = (e) => {
    e.preventDefault();

    const cleanName = assetName.trim() || `${instrument} (${goal.split(' ')[0]})`;
    const cleanAmount = parseInt(amountRaw.replace(/\D/g, ''), 10) || 0;
    const result = evaluateSuitability(goal, instrument);

    const newAsset = {
      id: 'asset-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: cleanName,
      instrument,
      goal,
      amount: cleanAmount,
      verdict: result.verdict,
      tone: result.tone,
      reason: result.reason,
      timestamp: Date.now(),
    };

    // Prepend (terbaru di atas)
    setAnalyzedAssets((prev) => [newAsset, ...prev]);

    // Reset input nama dan nominal
    setAssetName('');
    setAmountRaw('');
  };

  // Delete Card Handler
  const handleDeleteAsset = (id) => {
    setAnalyzedAssets((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate Summary Counts
  const countSesuai = analyzedAssets.filter((a) => a.verdict === 'Sesuai').length;
  const countReview = analyzedAssets.filter((a) => a.verdict === 'Perlu Ditinjau').length;
  const countKurang = analyzedAssets.filter((a) => a.verdict === 'Kurang Tepat').length;

  return (
    <div className="suitability-container" id="suitability-main-content">
      {/* Header Halaman */}
      <header className="suitability-header">
        <div className="suitability-pill-badge" id="badge-pill-header">
          <span className="pill-dot">●</span>
          <span>ANALISIS KECOCOKAN ASET</span>
        </div>
        <h1 className="suitability-title">
          Apakah Aset Anda Ditempatkan di Tempat yang Tepat?
        </h1>
        <p className="suitability-subtitle">
          Fokus evaluasi ini bukan untung-rugi harga pasar, melainkan memastikan instrumen investasi
          yang Anda pilih <strong>sesuai dengan fungsi dan horizon waktu dana</strong> (contoh: Dana Darurat
          wajib likuid & minim risiko di RDPU, sedangkan Dana Pensiun butuh pertumbuhan saham).
        </p>
      </header>

      {/* Strip Ringkasan (3 Kotak Sejajar) */}
      <section className="suitability-summary-strip" aria-label="Ringkasan Hasil Analisis">
        {/* Kotak Sesuai */}
        <div className="summary-card card-sesuai" id="summary-card-sesuai">
          <div className="summary-card-header">
            <span className="summary-indicator indicator-sesuai"></span>
            <span className="summary-label">Sesuai</span>
          </div>
          <div className="summary-count count-sesuai" id="count-sesuai">
            {countSesuai}
          </div>
          <div className="summary-caption">Penempatan instrumen sudah optimal</div>
        </div>

        {/* Kotak Perlu Ditinjau */}
        <div className="summary-card card-review" id="summary-card-review">
          <div className="summary-card-header">
            <span className="summary-indicator indicator-review"></span>
            <span className="summary-label">Perlu Ditinjau</span>
          </div>
          <div className="summary-count count-review" id="count-review">
            {countReview}
          </div>
          <div className="summary-caption">Pertimbangkan risiko atau likuiditas</div>
        </div>

        {/* Kotak Kurang Tepat */}
        <div className="summary-card card-kurang" id="summary-card-kurang">
          <div className="summary-card-header">
            <span className="summary-indicator indicator-kurang"></span>
            <span className="summary-label">Kurang Tepat</span>
          </div>
          <div className="summary-count count-kurang" id="count-kurang">
            {countKurang}
          </div>
          <div className="summary-caption">Potensi mismatch fungsi & risiko dana</div>
        </div>
      </section>

      {/* Layout Utama Grid 2 Kolom (360px - 1fr) */}
      <div className="suitability-grid-layout">
        {/* KOLOM KIRI: Form Tambah Aset */}
        <aside className="suitability-form-panel">
          <div className="form-card">
            <div className="form-card-header">
              <div className="icon-mint-box" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <div className="form-header-text">
                <h2 className="form-title">Tambah Aset untuk Dianalisis</h2>
                <p className="form-desc">Evaluasi kesesuaian instrumen terhadap tujuan alokasi</p>
              </div>
            </div>

            <form onSubmit={handleAnalyze} className="suitability-form" id="form-add-asset">
              {/* Input Nama Aset */}
              <div className="form-group">
                <label htmlFor="input-asset-name" className="form-label">
                  Nama Aset / Instrumen
                </label>
                <input
                  type="text"
                  id="input-asset-name"
                  className="form-input"
                  placeholder="Contoh: Tabungan Mandiri, BBCA, RDPU Syariah"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                />
              </div>

              {/* Select Jenis Instrumen */}
              <div className="form-group">
                <label htmlFor="select-asset-type" className="form-label">
                  Jenis Instrumen <span className="label-required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="select-asset-type"
                    className="form-select"
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                  >
                    {INSTRUMENT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="select-arrow">▾</span>
                </div>
              </div>

              {/* Select Tujuan Dana */}
              <div className="form-group">
                <label htmlFor="select-asset-goal" className="form-label">
                  Tujuan Dana Ini <span className="label-required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="select-asset-goal"
                    className="form-select"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    {GOAL_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="select-arrow">▾</span>
                </div>
              </div>

              {/* Input Nominal (Prefix Rp) */}
              <div className="form-group">
                <label htmlFor="input-asset-amount" className="form-label">
                  Nominal Dialokasikan <span className="label-note">(opsional)</span>
                </label>
                <div className="suitability-input-prefix-wrapper">
                  <span className="suitability-currency-prefix">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    id="input-asset-amount"
                    className="form-input suitability-input-with-prefix"
                    placeholder="120.000.000"
                    value={amountRaw}
                    onChange={handleAmountChange}
                  />
                </div>
              </div>

              {/* Tombol Full-Width */}
              <button
                type="submit"
                className="btn-submit-analyze"
                id="btn-analyze-asset"
              >
                + Analisis Kecocokan
              </button>
            </form>
          </div>
        </aside>

        {/* KOLOM KANAN: Hasil Analisis Kecocokan */}
        <section className="suitability-results-panel" aria-label="Daftar Kartu Hasil Analisis">
          <div className="results-header-row">
            <h2 className="results-title">Hasil Analisis Kecocokan</h2>
            <span className="results-badge-count">{analyzedAssets.length} Aset Terdaftar</span>
          </div>

          <div className="results-cards-list" id="results-container">
            {analyzedAssets.length === 0 ? (
              <div className="results-empty-state">
                <div className="empty-icon-circle">📋</div>
                <h3 className="empty-title">Belum Ada Aset yang Dianalisis</h3>
                <p className="empty-desc">
                  Gunakan formulir di sebelah kiri untuk memasukkan aset Anda dan melihat evaluasi kecocokannya.
                </p>
              </div>
            ) : (
              analyzedAssets.map((asset) => {
                const badgeClass =
                  asset.tone === 'ok'
                    ? 'verdict-badge-sesuai'
                    : asset.tone === 'review'
                    ? 'verdict-badge-review'
                    : 'verdict-badge-kurang';

                return (
                  <article key={asset.id} className="asset-result-card" id={`card-${asset.id}`}>
                    {/* Header Card: Nama Aset + Badge Verdict + Tombol Hapus */}
                    <div className="asset-card-top">
                      <h3 className="asset-card-name" title={asset.name}>
                        {asset.name}
                      </h3>
                      <div className="asset-card-actions">
                        <span className={`verdict-pill-badge ${badgeClass}`}>
                          {asset.verdict}
                        </span>
                        <button
                          type="button"
                          className="btn-delete-asset"
                          onClick={() => handleDeleteAsset(asset.id)}
                          title="Hapus analisis aset ini"
                          aria-label={`Hapus ${asset.name}`}
                          id={`btn-delete-${asset.id}`}
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Metadata Line */}
                    <div className="asset-card-metadata">
                      <span>{asset.instrument}</span>
                      <span className="meta-separator">·</span>
                      <span>{asset.goal}</span>
                      {asset.amount > 0 && (
                        <>
                          <span className="meta-separator">·</span>
                          <span className="meta-amount">{formatRupiahDisplay(asset.amount)}</span>
                        </>
                      )}
                    </div>

                    {/* Reason Box */}
                    <div className="asset-card-reason-box">
                      <p
                        className="reason-text"
                        dangerouslySetInnerHTML={{ __html: asset.reason }}
                      />
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Catatan Kaki / Disclaimer Finansial */}
      <footer className="suitability-disclaimer">
        <p>
          ℹ️ <strong>Catatan Edukasi:</strong> Analisis ini merupakan rule-of-thumb dan pedoman umum alokasi aset berdasarkan karakteristik instrumen & horizon waktu, bukan pengganti nasihat keuangan berlisensi.
        </p>
      </footer>
    </div>
  );
}
