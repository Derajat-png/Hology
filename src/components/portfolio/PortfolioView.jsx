import React, { useState } from 'react';
import './PortfolioView.css';
import {
  PortfolioIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  TrendUpIcon,
  ShieldIcon,
  ReceiptIcon,
  FlagIcon,
} from '../Icons';

export default function PortfolioView() {
  // Target akumulasi dari Kalkulator Finansial (default Rp 1.000.000.000)
  const [financialGoalTarget, setFinancialGoalTarget] = useState(1000000000);

  // State daftar aset investasi user
  const [assets, setAssets] = useState([
    {
      id: '1',
      name: 'Saham Bluechip BBCA & BBRI',
      category: 'Ekuitas',
      initialInvestment: 320000000,
      currentValue: 380000000,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Surat Berharga Negara (ORI024)',
      category: 'Pendapatan Tetap',
      initialInvestment: 200000000,
      currentValue: 210000000,
      createdAt: '2024-03-20',
    },
    {
      id: '3',
      name: 'Emas Batangan Antam',
      category: 'Komoditas',
      initialInvestment: 110000000,
      currentValue: 125000000,
      createdAt: '2024-02-10',
    },
    {
      id: '4',
      name: 'Deposito Bank Digital Likuid',
      category: 'Pasar Uang',
      initialInvestment: 82000000,
      currentValue: 85000000,
      createdAt: '2024-04-05',
    },
    {
      id: '5',
      name: 'Bitcoin & Ethereum',
      category: 'Alternatif',
      initialInvestment: 50000000,
      currentValue: 42500000,
      createdAt: '2024-05-12',
    },
  ]);

  // State Form Input Aset
  const [formData, setFormData] = useState({
    name: '',
    category: 'Ekuitas',
    initialInvestment: '',
    currentValue: '',
  });

  // State Toast Notifikasi
  const [toastMessage, setToastMessage] = useState(null);
  const [filterCategory, setFilterCategory] = useState('Semua');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper formatting Rupiah
  const formatRupiah = (num) => {
    if (isNaN(num) || num === null || num === undefined) return '0';
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Handle Input Form (Pembersihan format Rupiah)
  const handleInputChange = (field, value) => {
    if (field === 'name' || field === 'category') {
      setFormData((prev) => ({ ...prev, [field]: value }));
      return;
    }
    const cleanNumber = value.replace(/\D/g, '');
    const numValue = cleanNumber === '' ? '' : parseInt(cleanNumber, 10);
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  // Submit Form: Tambah Aset Baru
  const handleAddAsset = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Mohon masukkan nama aset investasi!');
      return;
    }

    const modalNum = typeof formData.initialInvestment === 'number' ? formData.initialInvestment : 0;
    const nilaiNum = typeof formData.currentValue === 'number' ? formData.currentValue : 0;

    if (modalNum <= 0 || nilaiNum <= 0) {
      showToast('Modal awal dan nilai saat ini harus lebih dari 0!');
      return;
    }

    const newAsset = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      category: formData.category,
      initialInvestment: modalNum,
      currentValue: nilaiNum,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAssets((prev) => [newAsset, ...prev]);

    // Reset Form
    setFormData({
      name: '',
      category: 'Ekuitas',
      initialInvestment: '',
      currentValue: '',
    });

    showToast(`Aset "${newAsset.name}" berhasil ditambahkan ke portofolio!`);
  };

  // Hapus Aset
  const handleDeleteAsset = (id, name) => {
    setAssets((prev) => prev.filter((item) => item.id !== id));
    showToast(`Aset "${name}" telah dihapus dari portofolio.`);
  };

  // Kalkulasi Ringkasan Portofolio
  const totalCurrentValue = assets.reduce((sum, item) => sum + item.currentValue, 0);
  const totalInitialInvestment = assets.reduce((sum, item) => sum + item.initialInvestment, 0);
  const totalGainLoss = totalCurrentValue - totalInitialInvestment;
  const isTotalProfit = totalGainLoss >= 0;
  const totalGainLossPercent =
    totalInitialInvestment > 0
      ? ((totalGainLoss / totalInitialInvestment) * 100).toFixed(2).replace('.', ',')
      : '0,00';

  // Progres menuju Target Kalkulator Finansial
  const progressPercentRaw =
    financialGoalTarget > 0 ? (totalCurrentValue / financialGoalTarget) * 100 : 0;
  const progressPercent = Math.min(100, Math.max(0, progressPercentRaw)).toFixed(1).replace('.', ',');

  // Filter Aset berdasarkan Kategori
  const filteredAssets =
    filterCategory === 'Semua'
      ? assets
      : assets.filter((item) => item.category === filterCategory);

  // Kategori badge styling
  const getCategoryClass = (category) => {
    switch (category) {
      case 'Ekuitas':
        return 'cat-ekuitas';
      case 'Pendapatan Tetap':
        return 'cat-pendapatan-tetap';
      case 'Komoditas':
        return 'cat-komoditas';
      case 'Pasar Uang':
        return 'cat-pasar-uang';
      case 'Alternatif':
        return 'cat-alternatif';
      default:
        return 'cat-default';
    }
  };

  return (
    <div className="portfolio-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="portfolio-toast">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="portfolio-header">
        <div>
          <div className="portfolio-badge-pill">
            <span className="badge-dot"></span>
            <span>Manual Portfolio Tracker</span>
          </div>
          <h1 className="portfolio-main-title">Portofolio Aset Terdaftar</h1>
          <p className="portfolio-main-subtitle">
            Catat dan pantau posisi aset investasi riil Anda, alokasi kelas aset, serta progres pencapaian target kalkulator finansial.
          </p>
        </div>
      </div>

      {/* Kartu Ringkasan Portofolio & Target Kalkulator Finansial */}
      <div className="portfolio-summary-hero">
        <div className="hero-top-row">
          <div className="hero-total-box">
            <span className="hero-label">Total Nilai Portofolio Terdaftar</span>
            <h2 className="hero-total-value">Rp {formatRupiah(totalCurrentValue)}</h2>
            <div className="hero-gain-badge-row">
              <span className={`hero-gain-badge ${isTotalProfit ? 'gain-positive' : 'gain-negative'}`}>
                {isTotalProfit ? '+' : '−'} Rp {formatRupiah(Math.abs(totalGainLoss))} ({isTotalProfit ? '+' : '−'}{totalGainLossPercent}%)
              </span>
              <span className="hero-modal-text">
                dari modal awal Rp {formatRupiah(totalInitialInvestment)}
              </span>
            </div>
          </div>

          <div className="hero-goal-box">
            <div className="goal-header">
              <div className="goal-title-wrapper">
                <FlagIcon size={16} className="goal-icon" />
                <span className="goal-label">Target Kalkulator Finansial</span>
              </div>
              <span className="goal-target-val">Rp {formatRupiah(financialGoalTarget)}</span>
            </div>

            {/* Progress Bar ke Target */}
            <div className="goal-progress-track">
              <div
                className="goal-progress-fill"
                style={{ width: `${Math.min(100, Math.max(0, progressPercentRaw))}%` }}
              ></div>
            </div>

            <div className="goal-footer">
              <span className="goal-percent-bold">{progressPercent}% Tercapai</span>
              <span className="goal-remaining-text">
                Sisa Rp {formatRupiah(Math.max(0, financialGoalTarget - totalCurrentValue))} lagi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Grid: Form Input Aset (Kiri) & Daftar Aset (Kanan) */}
      <div className="portfolio-grid-layout">
        {/* Kolom Kiri: Form Input Aset */}
        <div className="portfolio-form-card">
          <div className="card-header-box">
            <div className="card-icon-circle">
              <PlusIcon size={18} />
            </div>
            <div>
              <h3 className="card-title-text">Tambah Aset Investasi</h3>
              <p className="card-subtitle-text">Catat instrumen investasi baru ke dalam portofolio Anda</p>
            </div>
          </div>

          <form onSubmit={handleAddAsset} className="asset-input-form">
            {/* Field 1: Nama Aset */}
            <div className="form-group-item">
              <label htmlFor="input-nama-aset" className="form-label-custom">
                Nama Aset / Instrumen
              </label>
              <input
                id="input-nama-aset"
                type="text"
                className="form-input-custom"
                placeholder="Contoh: Saham BBCA / SBN ORI024 / Emas Antam"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            {/* Field 2: Kategori Aset */}
            <div className="form-group-item">
              <label htmlFor="select-kategori" className="form-label-custom">
                Kategori Kelas Aset
              </label>
              <select
                id="select-kategori"
                className="form-select-custom"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <option value="Ekuitas">Ekuitas (Saham & Reksadana Saham)</option>
                <option value="Pendapatan Tetap">Pendapatan Tetap (Obligasi, SBN, Sukuk)</option>
                <option value="Komoditas">Komoditas (Emas & Logam Mulia)</option>
                <option value="Pasar Uang">Pasar Uang (Deposito & RDPU)</option>
                <option value="Alternatif">Alternatif (Kripto, P2P, Properti)</option>
              </select>
            </div>

            {/* Field 3: Modal Awal */}
            <div className="form-group-item">
              <label htmlFor="input-modal-awal" className="form-label-custom">
                Modal Awal Pembelian
              </label>
              <div className="input-currency-wrapper">
                <span className="currency-tag">Rp</span>
                <input
                  id="input-modal-awal"
                  type="text"
                  className="form-input-custom input-with-prefix"
                  placeholder="0"
                  value={formData.initialInvestment ? formatRupiah(formData.initialInvestment) : ''}
                  onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                  required
                />
              </div>
              <span className="input-hint-text">Total uang pokok yang disetorkan</span>
            </div>

            {/* Field 4: Nilai Saat Ini */}
            <div className="form-group-item">
              <label htmlFor="input-nilai-sekarang" className="form-label-custom">
                Nilai Aset Saat Ini
              </label>
              <div className="input-currency-wrapper">
                <span className="currency-tag tag-highlight">Rp</span>
                <input
                  id="input-nilai-sekarang"
                  type="text"
                  className="form-input-custom input-with-prefix text-highlight-input"
                  placeholder="0"
                  value={formData.currentValue ? formatRupiah(formData.currentValue) : ''}
                  onChange={(e) => handleInputChange('currentValue', e.target.value)}
                  required
                />
              </div>
              <span className="input-hint-text">Nilai valuasi / saldo portofolio terkini</span>
            </div>

            {/* Tombol Submit */}
            <button type="submit" className="btn-submit-asset" id="btn-submit-tambah-aset">
              <PlusIcon size={18} />
              <span>Simpan Aset ke Portofolio</span>
            </button>
          </form>
        </div>

        {/* Kolom Kanan: Daftar Aset & Breakdown */}
        <div className="portfolio-list-section">
          {/* Filter & Judul List */}
          <div className="list-top-bar">
            <div className="list-title-box">
              <h3 className="section-title">Daftar Aset ({filteredAssets.length} Aset)</h3>
            </div>

            <div className="category-filter-chips">
              {['Semua', 'Ekuitas', 'Pendapatan Tetap', 'Komoditas', 'Pasar Uang', 'Alternatif'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-chip ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          {filteredAssets.length === 0 ? (
            <div className="empty-assets-card">
              <PortfolioIcon size={36} className="empty-icon" />
              <h4>Belum Ada Aset Terdaftar</h4>
              <p>Mulai tambahkan instrumen aset Anda melalui formulir di samping untuk memantau performa investasi.</p>
            </div>
          ) : (
            <div className="assets-cards-container">
              {filteredAssets.map((asset) => {
                // Alokasi % = (nilai aset ini ÷ total semua aset) × 100
                const allocPercentRaw =
                  totalCurrentValue > 0 ? (asset.currentValue / totalCurrentValue) * 100 : 0;
                const allocPercent = allocPercentRaw.toFixed(1).replace('.', ',');

                // Kinerja % = (nilai saat ini − modal awal) ÷ modal awal × 100
                const profitLossNominal = asset.currentValue - asset.initialInvestment;
                const isProfit = profitLossNominal >= 0;
                const returnPercentRaw =
                  asset.initialInvestment > 0
                    ? (profitLossNominal / asset.initialInvestment) * 100
                    : 0;
                const returnPercent = returnPercentRaw.toFixed(2).replace('.', ',');

                return (
                  <div key={asset.id} className="asset-item-card">
                    {/* Header Card */}
                    <div className="asset-card-top">
                      <div className="asset-info-left">
                        <span className={`category-tag ${getCategoryClass(asset.category)}`}>
                          {asset.category}
                        </span>
                        <h4 className="asset-title-text">{asset.name}</h4>
                      </div>

                      <button
                        type="button"
                        className="btn-delete-asset"
                        title={`Hapus aset ${asset.name}`}
                        onClick={() => handleDeleteAsset(asset.id, asset.name)}
                        aria-label={`Hapus ${asset.name}`}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>

                    {/* Alokasi Portofolio Bar */}
                    <div className="asset-allocation-bar-section">
                      <div className="allocation-label-row">
                        <span className="alloc-lbl">Porsi Alokasi Portofolio:</span>
                        <span className="alloc-val-bold">{allocPercent}%</span>
                      </div>
                      <div className="alloc-progress-track">
                        <div
                          className="alloc-progress-fill"
                          style={{ width: `${Math.min(100, Math.max(0, allocPercentRaw))}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Matrix Nilai & Kinerja */}
                    <div className="asset-matrix-grid">
                      {/* Nilai Saat Ini */}
                      <div className="matrix-cell">
                        <span className="matrix-lbl">Nilai Saat Ini</span>
                        <div className="matrix-val-primary">
                          Rp {formatRupiah(asset.currentValue)}
                        </div>
                      </div>

                      {/* Modal Awal */}
                      <div className="matrix-cell">
                        <span className="matrix-lbl">Modal Awal</span>
                        <div className="matrix-val-muted">
                          Rp {formatRupiah(asset.initialInvestment)}
                        </div>
                      </div>

                      {/* Kinerja % & Nominal */}
                      <div className="matrix-cell text-right">
                        <span className="matrix-lbl">Kinerja Investasi</span>
                        <div className={`matrix-return-badge ${isProfit ? 'return-positive' : 'return-negative'}`}>
                          {isProfit ? '+' : '−'}{returnPercent}%
                        </div>
                        <span className={`return-subtext ${isProfit ? 'text-profit-green' : 'text-loss-red'}`}>
                          {isProfit ? '+' : '−'} Rp {formatRupiah(Math.abs(profitLossNominal))}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
