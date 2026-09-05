import React, { useState } from 'react';
import './SavingsView.css';
import {
  SavingsIcon,
  PlusIcon,
  CheckCircleIcon,
  TrendUpIcon,
  ShieldIcon,
  FlagIcon,
  SparklesIcon,
  ReceiptIcon,
  CloseIcon,
  TimerIcon,
} from '../Icons';

export default function SavingsView({ onNavigate }) {
  const [pockets, setPockets] = useState([
    {
      id: 1,
      name: 'Pos Dana Darurat Siaga',
      category: 'Proteksi & Darurat',
      targetAmount: 60000000,
      currentAmount: 45000000,
      monthlyAllocation: 1500000,
      targetDate: 'Okt 2026',
      color: '#065f46',
      badge: 'Prioritas Utama',
      notes: 'Disimpan di Reksa Dana Pasar Uang likuid',
    },
    {
      id: 2,
      name: 'Beli Mobil Impian',
      category: 'Target Impian',
      targetAmount: 250000000,
      currentAmount: 65000000,
      monthlyAllocation: 3500000,
      targetDate: 'Agu 2028',
      color: '#15803d',
      badge: 'On Track',
      notes: 'Instrumen obligasi & tabungan berjangka',
    },
    {
      id: 3,
      name: 'Liburan Akhir Tahun Jepang',
      category: 'Gaya Hidup & Travel',
      targetAmount: 35000000,
      currentAmount: 28000000,
      monthlyAllocation: 1000000,
      targetDate: 'Des 2026',
      color: '#0d9488',
      badge: 'Hampir Tercapai',
      notes: 'Tiket & akomodasi keluarga',
    },
    {
      id: 4,
      name: 'Uang Muka / Renovasi Rumah',
      category: 'Properti',
      targetAmount: 150000000,
      currentAmount: 25000000,
      monthlyAllocation: 2000000,
      targetDate: 'Mei 2029',
      color: '#ca8a04',
      badge: 'Jangka Menengah',
      notes: 'Perluasan ruang kerja & interior',
    },
  ]);

  const [history, setHistory] = useState([
    {
      id: 1,
      date: '01 Mei 2025',
      pocketName: 'Pos Dana Darurat Siaga',
      type: 'Autodebit Bulanan',
      amount: 1500000,
      status: 'Berhasil',
    },
    {
      id: 2,
      date: '01 Mei 2025',
      pocketName: 'Beli Mobil Impian',
      type: 'Autodebit Bulanan',
      amount: 3500000,
      status: 'Berhasil',
    },
    {
      id: 3,
      date: '28 Apr 2025',
      pocketName: 'Liburan Akhir Tahun Jepang',
      type: 'Setoran Tambahan Bonus',
      amount: 5000000,
      status: 'Berhasil',
    },
    {
      id: 4,
      date: '15 Apr 2025',
      pocketName: 'Pos Dana Darurat Siaga',
      type: 'Imbal Hasil / Bunga',
      amount: 185000,
      status: 'Berhasil',
    },
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // New pocket form state
  const [newPocket, setNewPocket] = useState({
    name: '',
    category: 'Target Impian',
    targetAmount: '',
    initialAmount: '',
    monthlyAllocation: '',
    targetDate: '',
    notes: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const formatRupiah = (num) => {
    if (isNaN(num) || num === null || num === undefined) return '0';
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Aggregated totals
  const totalCurrent = pockets.reduce((sum, p) => sum + p.currentAmount, 0);
  const totalTarget = pockets.reduce((sum, p) => sum + p.targetAmount, 0);
  const totalMonthly = pockets.reduce((sum, p) => sum + p.monthlyAllocation, 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;

  // Handle Add Pocket
  const handleCreatePocket = (e) => {
    e.preventDefault();
    if (!newPocket.name || !newPocket.targetAmount) return;

    const targetVal = parseInt(newPocket.targetAmount.toString().replace(/\D/g, ''), 10) || 0;
    const initialVal = parseInt(newPocket.initialAmount.toString().replace(/\D/g, ''), 10) || 0;
    const monthlyVal = parseInt(newPocket.monthlyAllocation.toString().replace(/\D/g, ''), 10) || 0;

    const created = {
      id: Date.now(),
      name: newPocket.name,
      category: newPocket.category,
      targetAmount: targetVal,
      currentAmount: initialVal,
      monthlyAllocation: monthlyVal,
      targetDate: newPocket.targetDate || 'Sesuai Rencana',
      color: '#065f46',
      badge: 'Pos Baru',
      notes: newPocket.notes || 'Kantong tabungan personal',
    };

    setPockets([created, ...pockets]);
    setIsAddModalOpen(false);
    setNewPocket({
      name: '',
      category: 'Target Impian',
      targetAmount: '',
      initialAmount: '',
      monthlyAllocation: '',
      targetDate: '',
      notes: '',
    });
    showToast(`Pos Tabungan "${created.name}" berhasil dibuat!`);
  };

  // Open Deposit Modal
  const handleOpenDeposit = (pocket) => {
    setSelectedPocket(pocket);
    setDepositAmount('');
    setIsDepositModalOpen(true);
  };

  // Handle Submit Deposit
  const handleExecuteDeposit = (e) => {
    e.preventDefault();
    if (!selectedPocket || !depositAmount) return;

    const addVal = parseInt(depositAmount.toString().replace(/\D/g, ''), 10) || 0;
    if (addVal <= 0) return;

    setPockets((prev) =>
      prev.map((p) =>
        p.id === selectedPocket.id
          ? { ...p, currentAmount: p.currentAmount + addVal }
          : p
      )
    );

    const newTx = {
      id: Date.now(),
      date: 'Hari ini',
      pocketName: selectedPocket.name,
      type: 'Setoran Tambahan',
      amount: addVal,
      status: 'Berhasil',
    };
    setHistory([newTx, ...history]);

    setIsDepositModalOpen(false);
    showToast(`Berhasil menyetor Rp ${formatRupiah(addVal)} ke "${selectedPocket.name}"!`);
  };

  return (
    <div className="savings-view-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="savings-toast">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Welcome Header */}
      <div className="savings-header">
        <div>
          <div className="savings-badge-top">
            <span className="savings-badge-dot"></span>
            <span>Digital Twin Savings Engine</span>
          </div>
          <h1 className="savings-title">Kelola Tabungan & Pos Dana</h1>
          <p className="savings-subtitle">
            Alokasikan pos tabungan digital, target impian masa depan, dan pantau progres autodebit otomatis.
          </p>
        </div>

        <div className="savings-header-actions">
          <button
            type="button"
            className="btn-add-pocket"
            onClick={() => setIsAddModalOpen(true)}
            id="btn-tambah-pos-tabungan"
          >
            <PlusIcon size={16} />
            <span>Tambah Pos Tabungan</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="savings-metrics-grid">
        {/* Card 1: Total Tabungan */}
        <div className="savings-metric-card highlight-card">
          <div className="metric-top">
            <span className="metric-label">Total Saldo Terkumpul</span>
            <div className="metric-icon-box bg-lime">
              <SavingsIcon size={18} />
            </div>
          </div>
          <div className="metric-value">Rp {formatRupiah(totalCurrent)}</div>
          <div className="metric-footer">
            <span className="badge-growth">+Rp 4.500.000 bulan ini</span>
            <span className="metric-sub">{overallProgress}% dari total target</span>
          </div>
        </div>

        {/* Card 2: Alokasi Bulanan */}
        <div className="savings-metric-card">
          <div className="metric-top">
            <span className="metric-label">Autodebit Bulanan Rutin</span>
            <div className="metric-icon-box bg-green">
              <TrendUpIcon size={18} />
            </div>
          </div>
          <div className="metric-value">
            Rp {formatRupiah(totalMonthly)}
            <span className="metric-unit">/bln</span>
          </div>
          <div className="metric-footer">
            <span className="metric-sub">Tersebar di {pockets.length} pos aktif</span>
          </div>
        </div>

        {/* Card 3: Target Aktif */}
        <div className="savings-metric-card">
          <div className="metric-top">
            <span className="metric-label">Total Akumulasi Target</span>
            <div className="metric-icon-box bg-teal">
              <FlagIcon size={18} />
            </div>
          </div>
          <div className="metric-value">Rp {formatRupiah(totalTarget)}</div>
          <div className="metric-footer">
            <span className="metric-sub">Sisa kebutuhan: Rp {formatRupiah(Math.max(0, totalTarget - totalCurrent))}</span>
          </div>
        </div>

        {/* Card 4: Savings Rate */}
        <div className="savings-metric-card">
          <div className="metric-top">
            <span className="metric-label">Rasio Disiplin Tabungan</span>
            <div className="metric-icon-box bg-amber">
              <ShieldIcon size={18} />
            </div>
          </div>
          <div className="metric-value">28.5%</div>
          <div className="metric-footer">
            <span className="badge-status-healthy">Kategori Sangat Sehat (&gt;20%)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Pos Tabungan List & AI Split Recommendation */}
      <div className="savings-main-grid">
        {/* Left Side: Pos Tabungan Cards List */}
        <div className="savings-pockets-section">
          <div className="section-title-row">
            <div className="section-title-left">
              <h2 className="section-heading">Daftar Pos & Kantong Tabungan</h2>
              <span className="section-count">({pockets.length} Kantong)</span>
            </div>
          </div>

          <div className="pockets-cards-grid">
            {pockets.map((pocket) => {
              const progress =
                pocket.targetAmount > 0
                  ? Math.min(100, Math.round((pocket.currentAmount / pocket.targetAmount) * 100))
                  : 0;

              return (
                <div key={pocket.id} className="pocket-card">
                  <div className="pocket-header">
                    <div>
                      <span className="pocket-category-tag">{pocket.category}</span>
                      <h3 className="pocket-name">{pocket.name}</h3>
                    </div>
                    <span className="pocket-badge-pill">{pocket.badge}</span>
                  </div>

                  <div className="pocket-amounts-row">
                    <div>
                      <span className="pocket-lbl">Terkumpul</span>
                      <div className="pocket-current-val">Rp {formatRupiah(pocket.currentAmount)}</div>
                    </div>
                    <div className="text-right">
                      <span className="pocket-lbl">Target</span>
                      <div className="pocket-target-val">Rp {formatRupiah(pocket.targetAmount)}</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="pocket-progress-track">
                    <div
                      className="pocket-progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="pocket-details-row">
                    <div className="pocket-detail-item">
                      <span className="detail-lbl">Progres:</span>
                      <span className="detail-val-bold">{progress}%</span>
                    </div>
                    <div className="pocket-detail-item">
                      <span className="detail-lbl">Autodebit:</span>
                      <span className="detail-val">Rp {formatRupiah(pocket.monthlyAllocation)}/bln</span>
                    </div>
                    <div className="pocket-detail-item">
                      <span className="detail-lbl">Estimasi:</span>
                      <span className="detail-val">{pocket.targetDate}</span>
                    </div>
                  </div>

                  <div className="pocket-notes">
                    <span>💡 {pocket.notes}</span>
                  </div>

                  {/* Pocket Card Actions */}
                  <div className="pocket-actions-row">
                    <button
                      type="button"
                      className="btn-pocket-deposit"
                      onClick={() => handleOpenDeposit(pocket)}
                    >
                      <PlusIcon size={14} />
                      <span>+ Setor Saldo</span>
                    </button>
                    {onNavigate && (
                      <button
                        type="button"
                        className="btn-pocket-sim"
                        onClick={() => onNavigate('simulasi')}
                      >
                        <span>Uji Proyeksi</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: AI Split & Recent History */}
        <div className="savings-sidebar-section">
          {/* AI Twin Intelligence Card */}
          <div className="content-card savings-ai-card">
            <div className="ai-card-header">
              <div className="ai-badge">
                <SparklesIcon size={14} />
                <span>AI Twin Recommendation</span>
              </div>
            </div>
            <h3 className="ai-title">Optimasi Imbal Hasil Tabungan</h3>
            <p className="ai-desc">
              Saldo dana darurat Anda sebesar <strong>Rp {formatRupiah(pockets[0]?.currentAmount || 45000000)}</strong> sudah mencakup 9 bulan pengeluaran. Anda bisa mengalihkan 20% autodebit bulan depan ke <strong>Target Impian</strong> untuk mempercepat tercapainya mobil impian 7 bulan lebih cepat!
            </p>
            <div className="ai-split-bar-box">
              <div className="split-label-row">
                <span>Alokasi Cerdas Saat Ini:</span>
                <span className="split-percent-sum">100% Terkelola</span>
              </div>
              <div className="multi-split-track">
                <div className="split-segment seg-emerald" style={{ width: '45%' }} title="Darurat & Pokok 45%"></div>
                <div className="split-segment seg-lime" style={{ width: '35%' }} title="Target Impian 35%"></div>
                <div className="split-segment seg-amber" style={{ width: '20%' }} title="Lifestyle 20%"></div>
              </div>
              <div className="split-legend">
                <span className="legend-item"><span className="legend-dot dot-emerald"></span>Darurat (45%)</span>
                <span className="legend-item"><span className="legend-dot dot-lime"></span>Impian (35%)</span>
                <span className="legend-item"><span className="legend-dot dot-amber"></span>Lifestyle (20%)</span>
              </div>
            </div>
          </div>

          {/* Recent History Card */}
          <div className="content-card savings-history-card">
            <div className="history-header">
              <div className="history-title-box">
                <ReceiptIcon size={18} />
                <h3 className="card-title">Riwayat Tabungan Terbaru</h3>
              </div>
            </div>

            <div className="savings-history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-left">
                    <div className="history-icon-circle">
                      <SavingsIcon size={14} />
                    </div>
                    <div>
                      <div className="history-name">{item.pocketName}</div>
                      <div className="history-sub">{item.type} • {item.date}</div>
                    </div>
                  </div>
                  <div className="history-right">
                    <div className="history-amount">+Rp {formatRupiah(item.amount)}</div>
                    <span className="history-status-badge">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Tambah Pos Tabungan Baru */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-badge">
                  <span>Pos Tabungan Baru</span>
                </div>
                <h2 className="modal-title">Buat Pos Tabungan Baru</h2>
                <p className="modal-subtitle">
                  Rencanakan pos dana baru untuk memisahkan rekening impian Anda secara digital.
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePocket} className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="pocket-name">
                  Nama Pos Tabungan
                </label>
                <input
                  id="pocket-name"
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Tabungan DP Rumah / Gadget Baru"
                  value={newPocket.name}
                  onChange={(e) => setNewPocket({ ...newPocket, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="pocket-category">
                    Kategori
                  </label>
                  <select
                    id="pocket-category"
                    className="form-select"
                    value={newPocket.category}
                    onChange={(e) => setNewPocket({ ...newPocket, category: e.target.value })}
                  >
                    <option value="Target Impian">Target Impian</option>
                    <option value="Proteksi & Darurat">Proteksi & Darurat</option>
                    <option value="Properti & Hunian">Properti & Hunian</option>
                    <option value="Gaya Hidup & Travel">Gaya Hidup & Travel</option>
                    <option value="Pendidikan">Pendidikan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pocket-target">
                    Target Dana (Rp)
                  </label>
                  <input
                    id="pocket-target"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: 50.000.000"
                    value={newPocket.targetAmount ? formatRupiah(newPocket.targetAmount) : ''}
                    onChange={(e) =>
                      setNewPocket({
                        ...newPocket,
                        targetAmount: e.target.value.replace(/\D/g, ''),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="pocket-initial">
                    Saldo Awal (Rp)
                  </label>
                  <input
                    id="pocket-initial"
                    type="text"
                    className="form-input"
                    placeholder="0"
                    value={newPocket.initialAmount ? formatRupiah(newPocket.initialAmount) : ''}
                    onChange={(e) =>
                      setNewPocket({
                        ...newPocket,
                        initialAmount: e.target.value.replace(/\D/g, ''),
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pocket-monthly">
                    Alokasi Autodebit / Bln (Rp)
                  </label>
                  <input
                    id="pocket-monthly"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: 1.000.000"
                    value={newPocket.monthlyAllocation ? formatRupiah(newPocket.monthlyAllocation) : ''}
                    onChange={(e) =>
                      setNewPocket({
                        ...newPocket,
                        monthlyAllocation: e.target.value.replace(/\D/g, ''),
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pocket-notes">
                  Catatan / Keterangan
                </label>
                <input
                  id="pocket-notes"
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Disimpan di Bank Digital bunga 5%"
                  value={newPocket.notes}
                  onChange={(e) => setNewPocket({ ...newPocket, notes: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  <PlusIcon size={16} />
                  <span>Simpan Pos Tabungan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Setor Saldo Tambahan */}
      {isDepositModalOpen && selectedPocket && (
        <div className="modal-backdrop" onClick={() => setIsDepositModalOpen(false)}>
          <div className="modal-container modal-compact" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-badge">
                  <span>Setor Tabungan</span>
                </div>
                <h2 className="modal-title">Setor ke {selectedPocket.name}</h2>
                <p className="modal-subtitle">
                  Saldo saat ini: <strong>Rp {formatRupiah(selectedPocket.currentAmount)}</strong> / Target: Rp {formatRupiah(selectedPocket.targetAmount)}
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsDepositModalOpen(false)}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleExecuteDeposit} className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="deposit-input">
                  Nominal Setoran (Rp)
                </label>
                <input
                  id="deposit-input"
                  type="text"
                  className="form-input text-deposit-highlight"
                  placeholder="Contoh: 1.000.000"
                  value={depositAmount ? formatRupiah(depositAmount) : ''}
                  onChange={(e) => setDepositAmount(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                  required
                />
              </div>

              <div className="quick-amount-chips">
                {[500000, 1000000, 2500000, 5000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className="chip-btn"
                    onClick={() => setDepositAmount(amt.toString())}
                  >
                    +Rp {formatRupiah(amt)}
                  </button>
                ))}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsDepositModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  <CheckCircleIcon size={16} />
                  <span>Konfirmasi Setor</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
