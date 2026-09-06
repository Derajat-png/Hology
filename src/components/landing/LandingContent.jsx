import './LandingContent.css';

export default function LandingContent({ onNavigateToAI }) {
  const scrollToCaraKerja = (e) => {
    e.preventDefault();
    const target = document.getElementById('cara-kerja-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="ft-landing">
      {/* ====================================================================
          SECTION 1: HERO
          ==================================================================== */}
      <section className="ft-hero-section">
        <div className="ft-hero-container">
          {/* Kolom Kiri: Copywriting & CTA */}
          <div className="ft-hero-content">
            {/* Pill Badge Hology 2026 */}
            <div className="ft-hero-badge">
              <span className="ft-badge-icon">H</span>
              <span className="ft-badge-text">
                Hology 2026 — Fakultas Ilmu Komputer, Universitas Brawijaya
              </span>
            </div>

            {/* Headline */}
            <h1 className="ft-hero-title">
              Kembaran digital untuk{' '}
              <span className="ft-hero-title-accent">uangmu</span>, yang bantu
              kamu memutuskan langkah selanjutnya.
            </h1>

            {/* Subteks */}
            <p className="ft-hero-desc">
              Financial Twin memantau dinamika keuanganmu secara real-time dan
              mengajak diskusi AI untuk memvalidasi setiap keputusan menabung,
              alokasi portofolio, hingga simulasi masa depan.
            </p>

            {/* Action Buttons */}
            <div className="ft-hero-actions">
              <button
                type="button"
                className="ft-btn-cta-primary"
                onClick={onNavigateToAI}
              >
                Mulai diskusi dengan AI
              </button>
              <a
                href="#cara-kerja-section"
                className="ft-btn-cta-outline"
                onClick={scrollToCaraKerja}
              >
                Lihat cara kerja
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Mockup Card Chat AI */}
          <div className="ft-mockup-wrapper">
            {/* Floating Chip Kanan Atas: Skor Finansial */}
            <div className="ft-chip-floating ft-chip-top-right">
              <span className="ft-chip-icon" style={{ color: 'var(--gold)' }}>
                {/* Target / Bullseye Icon (Gold) */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </span>
              <span className="ft-chip-text">Skor finansial 88/100</span>
            </div>

            {/* Main AI Chat Card */}
            <div className="ft-mockup-card">
              {/* Card Mini Header */}
              <div className="ft-mockup-header">
                <div className="ft-mockup-title">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--lime)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  <span>Asisten Strategi</span>
                </div>
                <div className="ft-mockup-status">
                  <span className="ft-status-dot">●</span> Terhubung dengan roadmap
                </div>
              </div>

              {/* 3 Alternating Chat Bubbles */}
              <div className="ft-chat-stream">
                {/* 1. Bubble AI */}
                <div className="ft-bubble ft-bubble-ai">
                  Progres target FIRE kamu mencapai 71%. Ada sisa surplus Rp
                  2.500.000 bulan ini yang belum dialokasikan ke roadmap.
                </div>

                {/* 2. Bubble User */}
                <div className="ft-bubble ft-bubble-user">
                  Bagusnya dialokasikan ke SBN atau tambah porsi dividen saham?
                </div>

                {/* 3. Bubble AI */}
                <div className="ft-bubble ft-bubble-ai">
                  Untuk amankan target cashflow 2027, alokasi 60% ke SBN (yield
                  6.6%) dan 40% re-investasi dividen adalah opsi paling optimal.
                </div>
              </div>

              {/* 2 Mini Stat Boxes */}
              <div className="ft-mockup-stats-row">
                <div className="ft-stat-box">
                  <span className="ft-stat-box-label">Net Worth Twin</span>
                  <span className="ft-stat-box-val">Rp 148.500.000</span>
                </div>
                <div className="ft-stat-box">
                  <span className="ft-stat-box-label">Progres Target</span>
                  <span className="ft-stat-box-val accent-lime">71.4% On-Track</span>
                </div>
              </div>
            </div>

            {/* Floating Chip Kiri Bawah: Dana Darurat */}
            <div className="ft-chip-floating ft-chip-bottom-left">
              <span className="ft-chip-icon" style={{ color: 'var(--lime-deep)' }}>
                {/* Checkmark Circle Icon (Lime Deep) */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              <span className="ft-chip-text">Dana darurat 100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: STRIP STATISTIK
          ==================================================================== */}
      <section className="ft-stats-strip">
        <div className="ft-stats-strip-container">
          <div className="ft-strip-item">
            <span className="ft-strip-num">3 goal</span>
            <span className="ft-strip-label">Dipantau dalam satu roadmap</span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">Rp 3,87M</span>
            <span className="ft-strip-label">Total akumulasi target</span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">71%</span>
            <span className="ft-strip-label">Rata-rata pencapaian</span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">24/7</span>
            <span className="ft-strip-label">Diskusi strategi dengan AI</span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: FITUR UTAMA (Asymmetric Rows)
          ==================================================================== */}
      <section className="ft-features-section">
        <div className="ft-features-container">
          {/* Header Section */}
          <div className="ft-section-header">
            <span className="ft-eyebrow">FITUR UTAMA</span>
            <h2 className="ft-section-title">
              Bukan sekadar pencatat, tapi teman diskusi keuangan.
            </h2>
            <p className="ft-section-subtext">
              Kombinasi model proyeksi komprehensif dan penalaran AI untuk
              membantumu mengambil keputusan dengan percaya diri di setiap fase.
            </p>
          </div>

          {/* Baris 1: Visual di Kiri, Teks di Kanan */}
          <div className="ft-feature-row ft-row-visual-left">
            <div className="ft-visual-card">
              <div className="ft-visual-card-header">
                <span className="ft-visual-card-title">
                  Simulasi Rekomendasi Alokasi Investasi
                </span>
                <span className="ft-visual-tag">AI Optimal</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Saham Indeks & ETF</span>
                    <span className="ft-progress-val">45% (Rp 67.500.000)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">SBN & Sukuk Ritel</span>
                    <span className="ft-progress-val">35% (Rp 52.500.000)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Kas Siaga & RDPU</span>
                    <span className="ft-progress-val">20% (Rp 30.000.000)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ft-feature-text">
              <span className="ft-feature-num">01</span>
              <h3 className="ft-feature-title">Strategi & konsultasi AI</h3>
              <p className="ft-feature-desc">
                Konsultasikan setiap rencana finansial secara interaktif. AI
                Financial Twin menganalisis profil risiko, arus kas bulanan, dan
                memberikan rekomendasi alokasi yang adaptif terhadap targetmu.
              </p>
            </div>
          </div>

          {/* Baris 2: Teks di Kiri, Visual di Kanan */}
          <div className="ft-feature-row ft-row-visual-right">
            <div className="ft-feature-text">
              <span className="ft-feature-num">02</span>
              <h3 className="ft-feature-title">Kalkulator finansial</h3>
              <p className="ft-feature-desc">
                Hitung proyeksi akumulasi dana, bunga majemuk, dan skenario
                pensiun dengan parameter dinamis. Uji dampak inflasi dan
                perubahan kontribusi bulanan secara instan.
              </p>
            </div>

            <div className="ft-visual-card">
              <div className="ft-visual-card-header">
                <span className="ft-visual-card-title">
                  Proyeksi Akumulasi Horizon Dana
                </span>
                <span className="ft-visual-tag">Compounding</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Tahun 1 (Akumulasi Awal)</span>
                    <span className="ft-progress-val">Rp 45.000.000 (35%)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Tahun 5 (Fase Pertumbuhan)</span>
                    <span className="ft-progress-val">Rp 185.000.000 (70%)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Tahun 10 (Target Mandiri)</span>
                    <span className="ft-progress-val">Rp 420.000.000 (100%)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Baris 3: Visual di Kiri, Teks di Kanan */}
          <div className="ft-feature-row ft-row-visual-left">
            <div className="ft-visual-card">
              <div className="ft-visual-card-header">
                <span className="ft-visual-card-title">
                  Alokasi Portofolio & Toleransi Rebalancing
                </span>
                <span className="ft-visual-tag">Seimbang</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Saham Bluechip & Ekuitas</span>
                    <span className="ft-progress-val">50%</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '50%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Obligasi Negara / SBN</span>
                    <span className="ft-progress-val">30%</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Kas Siaga & Deposito</span>
                    <span className="ft-progress-val">20%</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ft-feature-text">
              <span className="ft-feature-num">03</span>
              <h3 className="ft-feature-title">Portofolio & rebalancing</h3>
              <p className="ft-feature-desc">
                Pantau pergeseran bobot aset secara otomatis. Dapatkan sinyal
                rebalancing berkala agar tingkat risiko investasimu tetap selaras
                dengan roadmap jangka panjang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: CARA KERJA
          ==================================================================== */}
      <section className="ft-how-section" id="cara-kerja-section">
        <div className="ft-how-container">
          <div className="ft-how-header">
            <span className="ft-eyebrow">CARA KERJA</span>
            <h2 className="ft-section-title">
              Tiga langkah dari data ke keputusan.
            </h2>
          </div>

          <div className="ft-steps-grid">
            {/* Langkah 1 */}
            <div className="ft-step-card">
              <div className="ft-step-number-circle">1</div>
              <h3 className="ft-step-title">Hubungkan datamu</h3>
              <p className="ft-step-desc">
                Sinkronisasi target keuangan, rekening tabungan, dan instrumen
                investasimu ke dalam sistem twin digital yang aman dan
                terenkripsi.
              </p>
            </div>

            {/* Langkah 2 */}
            <div className="ft-step-card">
              <div className="ft-step-number-circle">2</div>
              <h3 className="ft-step-title">Diskusikan pilihan</h3>
              <p className="ft-step-desc">
                Ajukan pertanyaan dan eksplorasi skenario keputusan bersama
                asisten AI yang memahami konteks profil serta data finansialmu.
              </p>
            </div>

            {/* Langkah 3 */}
            <div className="ft-step-card">
              <div className="ft-step-number-circle">3</div>
              <h3 className="ft-step-title">Ambil langkah</h3>
              <p className="ft-step-desc">
                Uji dampak strategi di kalkulator simulasi, lalu eksekusi
                langkah terbaik dan pantau progres pencapaiannya secara terukur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
