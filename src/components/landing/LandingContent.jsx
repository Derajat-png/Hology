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
            {/* Headline */}
            <h1 className="ft-hero-title">
              Kembaran digital untuk{' '}
              <span className="ft-hero-title-accent">uangmu</span>, yang bantu
              kamu memutuskan langkah selanjutnya.
            </h1>

            {/* Subteks yang mudah dipahami */}
            <p className="ft-hero-desc">
              Financial Twin bantu kamu hitung gaji dan sisa uang bulanan, cek
              kecocokan pilihan investasi, serta ngobrol langsung dengan asisten AI
              untuk atur rencana keuanganmu dengan mudah.
            </p>

            {/* Action Buttons */}
            <div className="ft-hero-actions">
              <button
                type="button"
                className="ft-btn-cta-primary"
                onClick={onNavigateToAI}
              >
                Mulai ngobrol dengan AI
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
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: STRIP STATISTIK
          ==================================================================== */}
      <section className="ft-stats-strip">
        <div className="ft-stats-strip-container">
          <div className="ft-strip-item">
            <span className="ft-strip-num">3 Fitur</span>
            <span className="ft-strip-label">
              Hitung Gaji, Cek Investasi & Tanya AI
            </span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">Rp 1,85 Jt</span>
            <span className="ft-strip-label">
              Sisa uang bersih bulanan yang siap ditabung
            </span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">100% Aman</span>
            <span className="ft-strip-label">
              Dana darurat sudah siap dan aman
            </span>
          </div>

          <div className="ft-strip-item">
            <span className="ft-strip-num">24 Jam</span>
            <span className="ft-strip-label">
              Siap bantu jawab pertanyaan keuanganmu
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
              Bukan cuma catat uang, tapi teman diskusi keuanganmu.
            </h2>
            <p className="ft-section-subtext">
              Gabungan kalkulator gaji, pengecekan investasi, dan asisten AI pintar
              yang siap bantu kamu mengambil keputusan finansial terbaik.
            </p>
          </div>

          {/* Baris 1: Visual di Kiri, Teks di Kanan */}
          <div className="ft-feature-row ft-row-visual-left">
            <div className="ft-visual-card">
              <div className="ft-visual-card-header">
                <span className="ft-visual-card-title">
                  Rekomendasi Pembagian Sisa Uang
                </span>
                <span className="ft-visual-tag">Saran AI</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">
                      Tabungan Masa Depan (Saham & Reksadana)
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
                      Investasi Aman (Obligasi Negara / SBN)
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
                      Dana Darurat Siaga
                    </span>
                    <span className="ft-progress-val">100% Aman</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ft-feature-text">
              <span className="ft-feature-num">01</span>
              <h3 className="ft-feature-title">Tanya jawab dengan asisten AI</h3>
              <p className="ft-feature-desc">
                Bingung sisa uang gaji enaknya dipakai buat apa? Tanyakan langsung ke
                asisten AI. Mulai dari cara bagi tabungan, rencana pensiun muda,
                sampai tips memilih investasi yang cocok buat kamu.
              </p>
            </div>
          </div>

          {/* Baris 2: Teks di Kiri, Visual di Kanan */}
          <div className="ft-feature-row ft-row-visual-right">
            <div className="ft-feature-text">
              <span className="ft-feature-num">02</span>
              <h3 className="ft-feature-title">Kalkulator gaji & pengeluaran</h3>
              <p className="ft-feature-desc">
                Masukkan gaji pokok, potongan pajak, cicilan hutang, dan belanja
                bulanan. Aplikasi akan otomatis hitung gaji bersih, tabungan
                impian, dan sisa uang yang bisa kamu tabung setiap bulan.
              </p>
            </div>

            <div className="ft-visual-card">
              <div className="ft-visual-card-header">
                <span className="ft-visual-card-title">
                  Hitung Gaji Bersih & Pengeluaran
                </span>
                <span className="ft-visual-tag">Otomatis</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Gaji Bersih yang Diterima</span>
                    <span className="ft-progress-val">Rp 15.550.000 (100%)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Bayar Cicilan & Kebutuhan Hidup</span>
                    <span className="ft-progress-val">Rp 10.200.000 (65.6%)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '65.6%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Tabungan Impian & Sisa Uang</span>
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
                  Hasil Cek Kecocokan Investasi
                </span>
                <span className="ft-visual-tag">Hasil Cek</span>
              </div>
              <div className="ft-progress-list">
                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Reksadana Pasar Uang untuk Dana Darurat</span>
                    <span className="ft-progress-val">Sesuai (Mudah Dicairkan)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Saham untuk Rencana Pensiun Muda</span>
                    <span className="ft-progress-val">Sesuai (Bagus Jangka Panjang)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Obligasi / SBN untuk Tabungan Sekolah</span>
                    <span className="ft-progress-val">Sesuai (Hasil Pasti)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="ft-progress-item">
                  <div className="ft-progress-info">
                    <span className="ft-progress-label">Saham untuk Dana Darurat</span>
                    <span className="ft-progress-val">Kurang Tepat (Harga Naik Turun)</span>
                  </div>
                  <div className="ft-progress-track">
                    <div className="ft-progress-fill" style={{ width: '25%', backgroundColor: '#f87171' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ft-feature-text">
              <span className="ft-feature-num">03</span>
              <h3 className="ft-feature-title">Cek kecocokan tempat investasi</h3>
              <p className="ft-feature-desc">
                Ingin tahu apakah pilihan investasimu sudah pas dengan tujuanmu?
                Cukup pilih jenis tabungan atau investasinya. Sistem akan langsung beri
                tahu apakah pilihanmu sudah Sesuai, Perlu Ditinjau, atau Kurang Tepat
                agar uangmu tetap aman.
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
              3 Langkah mudah mulai mengatur keuangan.
            </h2>
          </div>

          <div className="ft-steps-grid">
            {/* Langkah 1 */}
            <div className="ft-step-card">
              <div className="ft-step-number-circle">1</div>
              <h3 className="ft-step-title">Isi data keuanganmu</h3>
              <p className="ft-step-desc">
                Masukkan rincian gaji, cicilan, biaya hidup, dan barang impian yang
                ingin kamu beli ke dalam kalkulator.
              </p>
            </div>

            {/* Langkah 2 */}
            <div className="ft-step-card">
              <div className="ft-step-number-circle">2</div>
              <h3 className="ft-step-title">Cek & minta saran AI</h3>
              <p className="ft-step-desc">
                Cek kecocokan tempat menabungmu dan tanyakan tips pembagian sisa uang
                langsung ke asisten AI.
              </p>
            </div>

            {/* Langkah 3 */}
            <div className="ft-step-card">
              <div className="ft-step-number-circle">3</div>
              <h3 className="ft-step-title">Jalankan rencana</h3>
              <p className="ft-step-desc">
                Terapkan rencana menabung dengan tenang dan lihat tabungan impianmu
                terus bertambah setiap bulan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
