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
              Financial Twin menyelaraskan kalkulator slip gaji, portofolio aset,
              dan 3 sasaran roadmap Anda ke dalam asisten AI untuk memvalidasi
              setiap keputusan menabung, investasi, dan proyeksi masa depan.
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
                  Progres target FIRE 2035 Anda mencapai 68% dan Dana Darurat
                  100% aman. Ada sisa surplus Rp 1.850.000 bulan ini yang siap
                  dialokasikan.
                </div>

                {/* 2. Bubble User */}
                <div className="ft-bubble ft-bubble-user">
                  Bagusnya surplus dialokasikan ke SBN ORI024 atau tambah porsi saham BBCA & BBRI?
                </div>

                {/* 3. Bubble AI */}
                <div className="ft-bubble ft-bubble-ai">
                  Untuk amankan target FIRE 2035 dan yield kupon 6.6%, alokasi 60%
                  ke saham ekuitas dan 40% ke SBN ORI024 adalah opsi paling
                  optimal bulan ini.
                </div>
              </div>

              {/* 2 Mini Stat Boxes */}
              <div className="ft-mockup-stats-row">
                <div className="ft-stat-box">
                  <span className="ft-stat-box-label">Net Worth Twin</span>
                  <span className="ft-stat-box-val">
                    <span className="ft-stat-curr">Rp</span>
                    <span className="ft-stat-num">842.500.000</span>
                  </span>
                </div>
                <div className="ft-stat-box">
                  <span className="ft-stat-box-label">Rata-rata Roadmap</span>
                  <span className="ft-stat-box-val accent-lime">
                    <span className="ft-stat-num">71.0%</span>
                    <span className="ft-stat-subtag">On-Track</span>
                  </span>
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
            <span className="ft-strip-label">
              Dipantau dalam satu roadmap (FIRE, Darurat, Pendidikan)
            </span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">Rp 3,87M</span>
            <span className="ft-strip-label">
              Total akumulasi target sasaran finansial
            </span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">71%</span>
            <span className="ft-strip-label">
              Rata-rata pencapaian roadmap aktif
            </span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">24/7</span>
            <span className="ft-strip-label">
              Diskusi strategi dengan asisten AI terpadu
            </span>
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
              Menghubungkan kalkulator slip gaji, alokasi aset portofolio, dan
              penalaran asisten AI untuk memandu setiap keputusan finansial Anda.
            </p>
          </div>

          {/* Baris 1: Visual di Kiri, Teks di Kanan */}
          <div className="ft-feature-row ft-row-visual-left">
            <div className="ft-visual-card">
              <div className="ft-visual-card-header">
                <span className="ft-visual-card-title">
                  Rekomendasi Alokasi Surplus Bulanan
                </span>
                <span className="ft-visual-tag">AI Optimal</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">
                      Saham Bluechip & Ekuitas (FIRE)
                    </span>
                    <span className="ft-progress-val">60% (Rp 1.110.000)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">
                      Surat Berharga Negara / SBN ORI024
                    </span>
                    <span className="ft-progress-val">40% (Rp 740.000)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">
                      Dana Darurat Siaga (Likuid)
                    </span>
                    <span className="ft-progress-val">100% Aman (Rp 120 Jt)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ft-feature-text">
              <span className="ft-feature-num">01</span>
              <h3 className="ft-feature-title">Strategi & konsultasi AI</h3>
              <p className="ft-feature-desc">
                Konsultasikan setiap rencana finansial langsung bersama AI yang
                membaca konteks 3 sasaran roadmap Anda: Strategi FIRE 2035 (68%),
                Dana Darurat Siaga (100%), dan Dana Pendidikan (45%). AI
                memberikan rekomendasi alokasi surplus secara adaptif.
              </p>
            </div>
          </div>

          {/* Baris 2: Teks di Kiri, Visual di Kanan */}
          <div className="ft-feature-row ft-row-visual-right">
            <div className="ft-feature-text">
              <span className="ft-feature-num">02</span>
              <h3 className="ft-feature-title">Kalkulator finansial</h3>
              <p className="ft-feature-desc">
                Simulasikan slip gaji pokok Rp 16,5 Jt, potongan pajak PPh21,
                cicilan KPR, pinjaman, dan beban hidup. Hitung surplus bersih Rp
                1,85 Jt/bulan dan uji skenario percepatan target secara instan.
              </p>
            </div>

            <div className="ft-visual-card">
              <div className="ft-visual-card-header">
                <span className="ft-visual-card-title">
                  Kalkulator Slip Gaji & Alokasi Kas
                </span>
                <span className="ft-visual-tag">Auto-Kalkulasi</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Take Home Pay (Gaji Bersih)</span>
                    <span className="ft-progress-val">Rp 15.550.000 (100%)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Kewajiban & Biaya Hidup</span>
                    <span className="ft-progress-val">Rp 10.200.000 (65.6%)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '65.6%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Alokasi Tabungan & Surplus</span>
                    <span className="ft-progress-val">Rp 5.350.000 (34.4%)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '34.4%' }}></div>
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
                  Struktur Portofolio Aset (Rp 842.500.000)
                </span>
                <span className="ft-visual-tag">Untung +10.56%</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Ekuitas (Saham BBCA & BBRI)</span>
                    <span className="ft-progress-val">45% (Rp 380.000.000)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Pendapatan Tetap (SBN ORI024)</span>
                    <span className="ft-progress-val">25% (Rp 210.000.000)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Emas, Deposito Likuid & Kripto</span>
                    <span className="ft-progress-val">30% (Rp 252.500.000)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ft-feature-text">
              <span className="ft-feature-num">03</span>
              <h3 className="ft-feature-title">Portofolio & rebalancing</h3>
              <p className="ft-feature-desc">
                Pantau akumulasi modal awal Rp 762 Jt yang telah bertumbuh
                menjadi Rp 842,5 Jt (+10,56%). Dapatkan rekomendasi rebalancing
                otomatis ketika pergeseran bobot aset melewati batas toleransi
                risiko.
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
                Masukkan rincian slip gaji, aset portofolio, dan target roadmap
                ke dalam kembaran digital Financial Twin yang terenkripsi aman.
              </p>
            </div>

            {/* Langkah 2 */}
            <div className="ft-step-card">
              <div className="ft-step-number-circle">2</div>
              <h3 className="ft-step-title">Diskusikan pilihan</h3>
              <p className="ft-step-desc">
                Tanyakan strategi penempatan surplus, evaluasi dividen vs SBN,
                atau skenario percepatan FIRE bersama asisten AI yang memahami
                seluruh data Anda.
              </p>
            </div>

            {/* Langkah 3 */}
            <div className="ft-step-card">
              <div className="ft-step-number-circle">3</div>
              <h3 className="ft-step-title">Ambil langkah</h3>
              <p className="ft-step-desc">
                Uji simulasi di kalkulator finansial, terapkan rekomendasi
                terbaik, dan pantau kenaikan net worth serta progres roadmap
                secara real-time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
