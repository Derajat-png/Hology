import { useState } from 'react';
import './SimulationView.css';
import {
  RefreshIcon,
  IncomeIcon,
  LiabilityIcon,
  ExpenseIcon,
  SummaryIcon,
  TrendUpIcon,
  ReceiptIcon,
  CheckCircleIcon,
  SparklesIcon,
  PortfolioIcon,
  FlagIcon,
  TimerIcon,
  LightbulbIcon,
} from '../Icons';

export default function SimulationView() {
  // Default values matching the design (Gambar 2 & Target Impian)
  const defaultValues = {
    gajiPokok: 16500000,
    pajakPPh21: 950000,
    hutangPinjaman: 1500000,
    cicilanKPR: 3500000,
    makanMinum: 3200000,
    belanjaRumahTangga: 2000000,
    // Target & Impian Finansial
    namaTarget: 'Beli Mobil Impian',
    bebanDarurat: 4500000,
    biayaTarget: 250000000,
    alokasiTabungan: 3500000,
  };

  const emptyValues = {
    gajiPokok: 0,
    pajakPPh21: 0,
    hutangPinjaman: 0,
    cicilanKPR: 0,
    makanMinum: 0,
    belanjaRumahTangga: 0,
    namaTarget: '',
    bebanDarurat: 0,
    biayaTarget: 0,
    alokasiTabungan: 0,
  };

  const [formData, setFormData] = useState({ ...defaultValues });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper formatting for Indonesian Rupiah
  const formatNumber = (num) => {
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const handleInputChange = (field, rawValue) => {
    if (field === 'namaTarget') {
      setFormData((prev) => ({ ...prev, [field]: rawValue }));
      return;
    }
    // Remove non-digit characters
    const cleanValue = rawValue.replace(/\D/g, '');
    const numValue = cleanValue === '' ? 0 : parseInt(cleanValue, 10);
    setFormData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleReset = () => {
    setFormData({ ...emptyValues });
    showToast('Semua data simulasi telah direset ke 0.');
  };

  const handleFinishAnalysis = () => {
    showToast('Analisis Finansial Terpadu Selesai! Rekomendasi siap dieksekusi.');
  };

  // Real-time Comprehensive Calculations
  const takeHomePay = Math.max(0, formData.gajiPokok - formData.pajakPPh21);
  const totalLiabilitas = formData.hutangPinjaman + formData.cicilanKPR;
  const totalOperasional = formData.makanMinum + formData.belanjaRumahTangga;
  const totalKewajiban = totalLiabilitas + totalOperasional;

  // Sisa Kas Operasional sebelum tabungan target
  const sisaKasSebelumTarget = takeHomePay - totalKewajiban;

  // Sisa Uang Akhir (Take Home Pay - Pengeluaran - Tabungan Target)
  const sisaUangAkhir = sisaKasSebelumTarget - formData.alokasiTabungan;

  // Surplus percentage based on Take Home Pay
  const surplusPercent =
    takeHomePay > 0
      ? ((sisaUangAkhir / takeHomePay) * 100).toFixed(1).replace('.', ',')
      : '0';

  const isSurplusPositive = sisaUangAkhir >= 0;

  // Dynamic Target & Impian Calculations
  const akumulasiTahunan = formData.alokasiTabungan * 12;
  const totalBulan =
    formData.alokasiTabungan > 0 && formData.biayaTarget > 0
      ? Math.round(formData.biayaTarget / formData.alokasiTabungan)
      : 0;
  const totalTahun =
    totalBulan > 0 ? (totalBulan / 12).toFixed(1).replace('.', ',') : '0';

  // Dynamic Milestones
  const persenTahun1 =
    formData.biayaTarget > 0 && formData.alokasiTabungan > 0
      ? Math.min(100, Math.round(((formData.alokasiTabungan * 12) / formData.biayaTarget) * 100))
      : 0;
  const persenTahun3 =
    formData.biayaTarget > 0 && formData.alokasiTabungan > 0
      ? Math.min(100, Math.round(((formData.alokasiTabungan * 36) / formData.biayaTarget) * 100))
      : 0;

  // Accelerated Simulation (+Rp 1.000.000 / bln)
  const tabunganCepat = formData.alokasiTabungan > 0 ? formData.alokasiTabungan + 1000000 : 0;
  const bulanCepat =
    tabunganCepat > 0 && formData.biayaTarget > 0
      ? Math.round(formData.biayaTarget / tabunganCepat)
      : 0;
  const tahunCepat =
    bulanCepat > 0 ? (bulanCepat / 12).toFixed(1).replace('.', ',') : '0';

  return (
    <div className="sim-view-wrapper">
      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="sim-toast">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Section */}
      <div className="sim-top-header">
        <div className="sim-header-info">
          <div className="sim-status-badge-row">
            <span className="sim-badge-connected">
              <span className="sim-badge-dot"></span>
              Kembaran Finansial Terhubung
            </span>
            <span className="sim-sync-time">Data Sinkronisasi: Mei 2025</span>
          </div>
          <h1 className="sim-main-title">Kalkulator Finansial & Proyeksi Finansial</h1>
          <p className="sim-main-subtitle">
            Simulasikan slip gaji, pengeluaran gaya hidup, serta uji skenario pengeluaran modal atau cicilan secara real-time.
          </p>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="sim-main-card">
        {/* Card Header */}
        <div className="sim-card-header">
          <div className="sim-card-brand">
            <div className="sim-wallet-icon-box">
              <PortfolioIcon size={22} className="sim-wallet-icon" />
            </div>
            <div>
              <h2 className="sim-card-title">Kalkulator Finansial Terpadu</h2>
              <p className="sim-card-desc">
                Masukkan rincian pendapatan, potongan pajak, cicilan, dan beban pengeluaran Anda
              </p>
            </div>
          </div>
          <div className="sim-auto-calc-badge">
            <span className="auto-calc-dot"></span>
            <span>Auto-Kalkulasi Aktif</span>
          </div>
        </div>

        {/* Section 1 & 2 Grid */}
        <div className="sim-sections-grid-2">
          {/* Box 1: PENDAPATAN & PAJAK WAJIB */}
          <div className="sim-section-box">
            <div className="sim-section-title-bar">
              <IncomeIcon size={18} className="section-title-icon" />
              <h3 className="sim-section-heading">PENDAPATAN & PAJAK WAJIB</h3>
            </div>

            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-gaji">
                Masukkan Slip Gaji / Gaji Pokok
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix">Rp</span>
                <input
                  id="input-gaji"
                  type="text"
                  className="sim-currency-input"
                  value={formData.gajiPokok ? formatNumber(formData.gajiPokok) : ''}
                  onChange={(e) => handleInputChange('gajiPokok', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="sim-input-helper">Penghasilan bruto bulanan tetap</span>
            </div>

            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-pajak">
                Pajak Penghasilan (PPh 21)
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix text-tax">Rp</span>
                <input
                  id="input-pajak"
                  type="text"
                  className="sim-currency-input text-tax"
                  value={formData.pajakPPh21 ? formatNumber(formData.pajakPPh21) : ''}
                  onChange={(e) => handleInputChange('pajakPPh21', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="sim-input-helper">Potongan resmi pajak penghasilan</span>
            </div>
          </div>

          {/* Box 2: LIABILITAS & CICILAN RUTIN */}
          <div className="sim-section-box">
            <div className="sim-section-title-bar">
              <LiabilityIcon size={18} className="section-title-icon" />
              <h3 className="sim-section-heading">LIABILITAS & CICILAN RUTIN</h3>
            </div>

            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-hutang">
                Hutang / Cicilan Pinjaman
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix">Rp</span>
                <input
                  id="input-hutang"
                  type="text"
                  className="sim-currency-input"
                  value={formData.hutangPinjaman ? formatNumber(formData.hutangPinjaman) : ''}
                  onChange={(e) => handleInputChange('hutangPinjaman', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="sim-input-helper">Kredit konsumen, perbankan, atau gadget</span>
            </div>

            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-kpr">
                Cicilan KPR Rumah
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix">Rp</span>
                <input
                  id="input-kpr"
                  type="text"
                  className="sim-currency-input"
                  value={formData.cicilanKPR ? formatNumber(formData.cicilanKPR) : ''}
                  onChange={(e) => handleInputChange('cicilanKPR', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="sim-input-helper">Kewajiban bulanan hunian primer</span>
            </div>
          </div>
        </div>

        {/* Section 3: BEBAN KEBUTUHAN HARIAN & OPERASIONAL */}
        <div className="sim-section-box sim-section-full">
          <div className="sim-section-title-bar">
            <ExpenseIcon size={18} className="section-title-icon" />
            <h3 className="sim-section-heading">BEBAN KEBUTUHAN HARIAN & OPERASIONAL</h3>
          </div>

          <div className="sim-fields-row-2">
            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-makan">
                Keseharian Makan & Minum
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix">Rp</span>
                <input
                  id="input-makan"
                  type="text"
                  className="sim-currency-input"
                  value={formData.makanMinum ? formatNumber(formData.makanMinum) : ''}
                  onChange={(e) => handleInputChange('makanMinum', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="sim-input-helper">Konsumsi pribadi dan keluarga</span>
            </div>

            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-belanja">
                Belanja & Kebutuhan Rumah Tangga
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix">Rp</span>
                <input
                  id="input-belanja"
                  type="text"
                  className="sim-currency-input"
                  value={formData.belanjaRumahTangga ? formatNumber(formData.belanjaRumahTangga) : ''}
                  onChange={(e) => handleInputChange('belanjaRumahTangga', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="sim-input-helper">Utilitas, listrik, air, dan perlengkapan rumah</span>
            </div>
          </div>
        </div>

        {/* Section: TARGET & IMPIAN FINANSIAL */}
        <div className="sim-section-box sim-section-full target-impian-container">
          <div className="target-impian-header">
            <div className="sim-section-title-bar">
              <FlagIcon size={18} className="section-title-icon-flag" />
              <h3 className="sim-section-heading">TARGET & IMPIAN FINANSIAL</h3>
            </div>
            <div className="target-badge-active">
              <span className="target-dot"></span>
              <span>Proyeksi Impian Aktif</span>
            </div>
          </div>

          {/* 4 Input Columns */}
          <div className="target-inputs-grid-4">
            {/* Field 1: Nama Target */}
            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-nama-target">
                Nama Target / Impian
              </label>
              <div className="sim-input-wrapper">
                <input
                  id="input-nama-target"
                  type="text"
                  className="sim-currency-input text-target-name"
                  value={formData.namaTarget}
                  onChange={(e) => handleInputChange('namaTarget', e.target.value)}
                  placeholder="Nama Impian"
                />
              </div>
              <span className="sim-input-helper">Tujuan finansial jangka menengah</span>
            </div>

            {/* Field 2: Beban Darurat */}
            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-beban-darurat">
                Beban Darurat / Tak Terduga
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix">Rp</span>
                <input
                  id="input-beban-darurat"
                  type="text"
                  className="sim-currency-input"
                  value={formData.bebanDarurat ? formatNumber(formData.bebanDarurat) : ''}
                  onChange={(e) => handleInputChange('bebanDarurat', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="sim-input-helper">Alokasi beban darurat insidental</span>
            </div>

            {/* Field 3: Estimasi Harga */}
            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-biaya-target">
                Estimasi Harga / Biaya Target
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix">Rp</span>
                <input
                  id="input-biaya-target"
                  type="text"
                  className="sim-currency-input"
                  value={formData.biayaTarget ? formatNumber(formData.biayaTarget) : ''}
                  onChange={(e) => handleInputChange('biayaTarget', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="sim-input-helper">Total dana target yang dibutuhkan</span>
            </div>

            {/* Field 4: Alokasi Tabungan Bulanan */}
            <div className="sim-field-group">
              <label className="sim-input-label" htmlFor="input-alokasi-tabungan">
                Alokasi Tabungan Bulanan
              </label>
              <div className="sim-input-wrapper">
                <span className="sim-currency-prefix">Rp</span>
                <input
                  id="input-alokasi-tabungan"
                  type="text"
                  className="sim-currency-input"
                  value={formData.alokasiTabungan ? formatNumber(formData.alokasiTabungan) : ''}
                  onChange={(e) => handleInputChange('alokasiTabungan', e.target.value)}
                  placeholder="0"
                />
                <span className="currency-suffix-unit">/ bln</span>
              </div>
              <span className="sim-input-helper">
                Dari sisa kas operasional Rp {formatNumber(sisaKasSebelumTarget)}/bln
              </span>
            </div>
          </div>

          {/* Sub-Card: Estimasi Waktu Terwujud & Timeline */}
          <div className="target-projection-subcard">
            <div className="target-proj-header">
              <div className="target-time-left">
                <div className="target-time-title">
                  <TimerIcon size={16} className="target-timer-icon" />
                  <span>Estimasi Waktu Terwujud</span>
                </div>
                <div className="target-time-value-row">
                  <span className="target-years-bold">~{totalTahun} Tahun</span>
                  <span className="target-months-pill">(sekitar {totalBulan} Bulan)</span>
                </div>
              </div>

              <div className="target-accum-right">
                <span className="target-accum-lbl">Proyeksi Akumulasi:</span>
                <span className="target-accum-val">
                  Rp {formatNumber(akumulasiTahunan)} <span className="stat-unit">/ tahun</span>
                </span>
              </div>
            </div>

            {/* Target Progress Bar & Milestones */}
            <div className="target-milestone-section">
              <div className="target-range-header">
                <span className="range-now">Terkumpul Sekarang: Rp 0</span>
                <span className="range-goal">Target: Rp {formatNumber(formData.biayaTarget)}</span>
              </div>

              <div className="target-progress-bar-track">
                <div
                  className="target-progress-fill-initial"
                  style={{
                    width: formData.biayaTarget > 0 && formData.alokasiTabungan > 0 ? '14%' : '0%',
                  }}
                ></div>
              </div>

              <div className="target-timeline-ticks">
                <span className="tick-start">Mulai Bulan Ini</span>
                <span className="tick-year1">Tahun ke-1 ({persenTahun1}%)</span>
                <span className="tick-year3">Tahun ke-3 ({persenTahun3}%)</span>
                <span className="tick-end">Tercapai (~{totalBulan} bln)</span>
              </div>
            </div>

            {/* Acceleration Tip Alert */}
            <div className="target-acceleration-tip">
              <LightbulbIcon size={18} className="tip-bulb-icon" />
              {formData.biayaTarget > 0 && formData.alokasiTabungan > 0 ? (
                <p className="tip-text">
                  <strong>Simulasi Percepatan:</strong> Jika menambah tabungan target jadi{' '}
                  <span className="tip-highlight">Rp {formatNumber(tabunganCepat)}/bln</span>, target
                  impian Anda tercapai lebih cepat dalam{' '}
                  <span className="tip-highlight">~{tahunCepat} Tahun</span> (sekitar {bulanCepat} Bulan).
                </p>
              ) : (
                <p className="tip-text">
                  <strong>Simulasi Percepatan:</strong> Masukkan estimasi harga target dan alokasi tabungan untuk melihat proyeksi percepatan impian Anda.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: RINGKASAN ARUS KAS & REKOMENDASI ALOKASI */}
        <div className="sim-summary-container">
          <div className="sim-summary-header">
            <div className="sim-section-title-bar">
              <SummaryIcon size={18} className="section-title-icon" />
              <h3 className="sim-section-heading">RINGKASAN ARUS KAS & REKOMENDASI ALOKASI</h3>
            </div>
            <div className={`sim-ratio-badge ${isSurplusPositive ? 'status-healthy' : 'status-deficit'}`}>
              <span className="ratio-dot"></span>
              <span>
                {isSurplusPositive
                  ? `Rasio Sehat (Sisa ${surplusPercent}%)`
                  : `Defisit Arus Kas (${surplusPercent}%)`}
              </span>
            </div>
          </div>

          {/* 3 Summary Cards Grid: Tabungan Target, Pengeluaran, Sisa Uang */}
          <div className="sim-summary-cards-grid">
            {/* Card 1: Tabungan Target */}
            <div className="summary-stat-card card-investment-highlight">
              <div className="stat-card-top">
                <span className="stat-card-lbl">Tabungan Target</span>
                <TrendUpIcon size={16} className="stat-icon-trend" />
              </div>
              <div className="stat-card-val">
                Rp {formatNumber(formData.alokasiTabungan)}
                <span className="stat-unit">/bln</span>
              </div>
              <div className="stat-card-sub">
                Untuk {formData.namaTarget || 'Target Impian'}
              </div>
            </div>

            {/* Card 2: Pengeluaran */}
            <div className="summary-stat-card card-obligations">
              <div className="stat-card-top">
                <span className="stat-card-lbl">Pengeluaran</span>
                <ReceiptIcon size={16} className="stat-icon-muted" />
              </div>
              <div className="stat-card-val">
                Rp {formatNumber(totalKewajiban)}
              </div>
              <div className="stat-card-sub">
                Cicilan & Kebutuhan Harian
              </div>
            </div>

            {/* Card 3: Sisa Uang */}
            <div className="summary-stat-card card-surplus">
              <div className="stat-card-top">
                <span className="stat-card-lbl">Sisa Uang</span>
                <CheckCircleIcon size={16} className="stat-icon-surplus" />
              </div>
              <div className={`stat-card-val ${isSurplusPositive ? 'text-surplus-green' : 'text-deficit-red'}`}>
                Rp {formatNumber(sisaUangAkhir)}
              </div>
              <div className="stat-card-sub">
                {isSurplusPositive
                  ? 'Surplus bersih setelah tabungan target'
                  : 'Tabungan & pengeluaran melebihi pemasukan'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="sim-card-footer">
          <button
            type="button"
            className="btn-sim-reset-bottom"
            onClick={handleReset}
            id="btn-reset-hitung-ulang"
          >
            <RefreshIcon size={16} />
            <span>Reset / Hitung Ulang</span>
          </button>

          <button
            type="button"
            className="btn-sim-finish"
            onClick={handleFinishAnalysis}
            id="btn-selesai-analisis"
          >
            <SparklesIcon size={18} className="btn-sparkle-icon" />
            <span>Selesai & Analisis Finansial</span>
          </button>
        </div>
      </div>
    </div>
  );
}
