import { useState } from 'react';
import './StrategyView.css';
import {
  StrategyIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
} from '../Icons';

export default function StrategyView() {
  // State daftar goal strategi finansial
  const [goals, setGoals] = useState([
    {
      id: '1',
      title: 'Strategi FIRE (Financial Independence, Retire Early)',
      desc: 'Alokasi 40% income bulanan ke instrumen pasar modal dengan strategi DCA berkala.',
      targetAmount: 3500000000,
      targetYear: 2035,
      progress: 68,
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'Dana Darurat Siaga (9 Bulan Pengeluaran)',
      desc: 'Tersimpan aman pada instrumen Reksa Dana Pasar Uang & Deposito Likuid berpenghasilan harian.',
      targetAmount: 120000000,
      targetYear: 2026,
      progress: 100,
      createdAt: '2024-02-15',
    },
    {
      id: '3',
      title: 'Dana Pendidikan Lanjutan & Sertifikasi',
      desc: 'Dikelola secara konservatif dengan instrumen Obligasi Negara Syariah (Sukuk) dan tabungan berjangka.',
      targetAmount: 250000000,
      targetYear: 2028,
      progress: 45,
      createdAt: '2024-03-01',
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    targetAmount: '',
    targetYear: new Date().getFullYear() + 5,
    progress: 0,
  });

  // Editing state
  const [editingId, setEditingId] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

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

  // Handle Form Change
  const handleInputChange = (field, value) => {
    if (field === 'targetAmount') {
      const cleanNumber = value.replace(/\D/g, '');
      const numValue = cleanNumber === '' ? '' : parseInt(cleanNumber, 10);
      setFormData((prev) => ({ ...prev, targetAmount: numValue }));
      return;
    }
    if (field === 'progress' || field === 'targetYear') {
      const num = parseInt(value, 10);
      setFormData((prev) => ({
        ...prev,
        [field]: isNaN(num) ? 0 : num,
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Submit Form (Tambah / Update Goal)
  const handleSubmitGoal = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast('Mohon masukkan nama goal strategi!');
      return;
    }

    const targetNominal = typeof formData.targetAmount === 'number' ? formData.targetAmount : 0;
    if (targetNominal <= 0) {
      showToast('Target nominal harus lebih dari 0!');
      return;
    }

    const validProgress = Math.min(100, Math.max(0, formData.progress || 0));
    const validYear = formData.targetYear || new Date().getFullYear() + 1;

    if (editingId) {
      // Update existing goal
      setGoals((prev) =>
        prev.map((g) =>
          g.id === editingId
            ? {
                ...g,
                title: formData.title.trim(),
                desc: formData.desc.trim(),
                targetAmount: targetNominal,
                targetYear: validYear,
                progress: validProgress,
              }
            : g
        )
      );
      showToast(`Goal "${formData.title}" berhasil diperbarui!`);
      setEditingId(null);
    } else {
      // Add new goal
      const newGoal = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        desc: formData.desc.trim(),
        targetAmount: targetNominal,
        targetYear: validYear,
        progress: validProgress,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setGoals((prev) => [newGoal, ...prev]);
      showToast(`Goal "${newGoal.title}" berhasil ditambahkan ke roadmap!`);
    }

    // Reset form
    setFormData({
      title: '',
      desc: '',
      targetAmount: '',
      targetYear: new Date().getFullYear() + 5,
      progress: 0,
    });
  };

  // Edit Goal Trigger
  const handleStartEdit = (goal) => {
    setEditingId(goal.id);
    setFormData({
      title: goal.title,
      desc: goal.desc,
      targetAmount: goal.targetAmount,
      targetYear: goal.targetYear,
      progress: goal.progress,
    });
    // Scroll smoothly to form if needed
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      desc: '',
      targetAmount: '',
      targetYear: new Date().getFullYear() + 5,
      progress: 0,
    });
  };

  // Delete Goal
  const handleDeleteGoal = (id, title) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
    showToast(`Goal "${title}" telah dihapus dari roadmap.`);
  };

  // Kalkulasi Ringkasan
  const totalGoalsCount = goals.length;
  const completedGoalsCount = goals.filter((g) => g.progress >= 100).length;
  const totalTargetFunds = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const averageProgress =
    totalGoalsCount > 0
      ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / totalGoalsCount)
      : 0;

  return (
    <div className="strategy-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="strategy-toast">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="strategy-header">
        <div>
          <div className="strategy-badge-pill">
            <span className="badge-dot"></span>
            <span>Manual Financial Roadmap</span>
          </div>
          <h1 className="strategy-main-title">Strategi Finansial & Roadmap</h1>
          <p className="strategy-main-subtitle">
            Pecah tujuan finansial Anda menjadi rencana aksi terstruktur, tetapkan target nominal, deadline tahun, serta pantau progres pencapaian secara mandiri.
          </p>
        </div>
      </div>

      {/* Ringkasan Roadmap Hero Box */}
      <div className="strategy-summary-hero">
        <div className="strategy-metric-box">
          <span className="strat-stat-lbl">Total Goal Terdaftar</span>
          <div className="strat-stat-val">{totalGoalsCount} Goal</div>
          <span className="strat-stat-sub">{completedGoalsCount} Goal Telah Tercapai</span>
        </div>

        <div className="strategy-metric-box">
          <span className="strat-stat-lbl">Total Akumulasi Target</span>
          <div className="strat-stat-val">Rp {formatRupiah(totalTargetFunds)}</div>
          <span className="strat-stat-sub">Seluruh Roadmap Finansial</span>
        </div>

        <div className="strategy-metric-box">
          <span className="strat-stat-lbl">Rata-Rata Pencapaian</span>
          <div className="strat-stat-val val-lime">{averageProgress}%</div>
          <span className="strat-stat-sub">Tingkat Kemajuan Roadmap</span>
        </div>
      </div>

      {/* Layout Grid: Form (Kiri) & Daftar Goal (Kanan) */}
      <div className="strategy-grid-layout">
        {/* Kolom Kiri: Form Tambah / Edit Goal */}
        <div className="strategy-form-card">
          <div className="card-header-row">
            <div className="card-icon-circle">
              {editingId ? <EditIcon size={18} /> : <PlusIcon size={18} />}
            </div>
            <div>
              <h3 className="card-title-text">
                {editingId ? 'Edit Goal Finansial' : 'Tambah Goal Baru'}
              </h3>
              <p className="card-subtitle-text">
                {editingId
                  ? 'Perbarui target, deadline tahun, atau catatan strategi'
                  : 'Rencanakan tujuan keuangan baru ke dalam roadmap'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitGoal} className="goal-input-form">
            {/* Field 1: Nama Goal */}
            <div className="form-group-item">
              <label htmlFor="input-goal-title" className="form-label-custom">
                Nama Goal / Rencana
              </label>
              <input
                id="input-goal-title"
                type="text"
                className="form-input-custom"
                placeholder="Contoh: Investasi Saham Perbankan / Beli Rumah 2030"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            {/* Field 2: Deskripsi Strategi */}
            <div className="form-group-item">
              <label htmlFor="input-goal-desc" className="form-label-custom">
                Deskripsi Strategi & Rencana Aksi
              </label>
              <textarea
                id="input-goal-desc"
                className="form-textarea-custom"
                rows="3"
                placeholder="Contoh: Rutin beli saham BMRI tiap bulan sebagai bagian dari portofolio saham bluechip..."
                value={formData.desc}
                onChange={(e) => handleInputChange('desc', e.target.value)}
              />
              <span className="input-hint-text">Catatan bebas strategi yang akan Anda jalankan</span>
            </div>

            {/* Grid 2: Target Nominal & Target Tahun */}
            <div className="form-grid-2">
              <div className="form-group-item">
                <label htmlFor="input-target-amount" className="form-label-custom">
                  Target Nominal (Rp)
                </label>
                <div className="input-currency-wrapper">
                  <span className="currency-tag">Rp</span>
                  <input
                    id="input-target-amount"
                    type="text"
                    className="form-input-custom input-with-prefix"
                    placeholder="0"
                    value={formData.targetAmount ? formatRupiah(formData.targetAmount) : ''}
                    onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group-item">
                <label htmlFor="input-target-year" className="form-label-custom">
                  Target Tahun Selesai
                </label>
                <input
                  id="input-target-year"
                  type="number"
                  min={new Date().getFullYear()}
                  max={2070}
                  className="form-input-custom"
                  placeholder="Contoh: 2030"
                  value={formData.targetYear}
                  onChange={(e) => handleInputChange('targetYear', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Field 4: Pencapaian Saat Ini (Slider & Input) */}
            <div className="form-group-item">
              <div className="slider-label-row">
                <label htmlFor="input-progress-slider" className="form-label-custom">
                  Pencapaian Saat Ini:
                </label>
                <div className="slider-value-badge">{formData.progress}%</div>
              </div>
              <input
                id="input-progress-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                className="form-slider-custom"
                value={formData.progress}
                onChange={(e) => handleInputChange('progress', e.target.value)}
              />
              <div className="slider-ticks-row">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Tombol Action */}
            <div className="form-buttons-row">
              {editingId && (
                <button
                  type="button"
                  className="btn-cancel-edit"
                  onClick={handleCancelEdit}
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                className="btn-submit-goal"
                id="btn-submit-goal"
              >
                {editingId ? (
                  <>
                    <CheckCircleIcon size={18} />
                    <span>Simpan Perubahan</span>
                  </>
                ) : (
                  <>
                    <PlusIcon size={18} />
                    <span>Tambahkan ke Roadmap</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Kolom Kanan: Daftar Goal Card */}
        <div className="strategy-list-section">
          <div className="list-top-header">
            <h3 className="section-title">
              Daftar Roadmap Goal ({goals.length} Sasaran)
            </h3>
          </div>

          {goals.length === 0 ? (
            <div className="empty-goals-card">
              <StrategyIcon size={36} className="empty-icon" />
              <h4>Belum Ada Goal Terdaftar</h4>
              <p>Mulai tambahkan sasaran finansial dan strategi Anda melalui formulir di samping.</p>
            </div>
          ) : (
            <div className="goals-cards-container">
              {goals.map((goal) => {
                const isComplete = goal.progress >= 100;

                return (
                  <div key={goal.id} className="goal-card-item">
                    {/* Card Header */}
                    <div className="goal-card-top">
                      <div className="goal-info-left">
                        {/* Status Badge Otomatis */}
                        <span
                          className={`goal-status-badge ${
                            isComplete ? 'badge-completed' : 'badge-in-progress'
                          }`}
                        >
                          {isComplete ? 'Tercapai 100%' : 'Dalam Progres'}
                        </span>
                        <h4 className="goal-title-text">{goal.title}</h4>
                        {goal.desc && <p className="goal-desc-text">{goal.desc}</p>}
                      </div>

                      {/* Kotak di Kanan: Target Selesai + Tahun & Nominal */}
                      <div className="goal-meta-box-right">
                        <span className="meta-target-label">
                          Target selesai: <strong>{goal.targetYear}</strong>
                        </span>
                        <div className="meta-target-nominal">
                          Rp {formatRupiah(goal.targetAmount)}
                        </div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="goal-progress-container">
                      <div className="goal-progress-label-row">
                        <span className="progress-left-text">
                          Pencapaian: <strong>{goal.progress}%</strong>
                        </span>
                        <span className="progress-right-text">Target: 100%</span>
                      </div>

                      <div className="goal-progress-track">
                        <div
                          className={`goal-progress-fill ${
                            isComplete ? 'fill-completed' : 'fill-active'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(0, goal.progress))}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Footer Actions: Edit & Hapus */}
                    <div className="goal-card-footer">
                      <span className="goal-created-sub">
                        Terdaftar sejak: {goal.createdAt || 'Aktif'}
                      </span>

                      <div className="goal-action-buttons">
                        <button
                          type="button"
                          className="btn-goal-action btn-goal-edit"
                          title="Edit sasaran ini"
                          onClick={() => handleStartEdit(goal)}
                        >
                          <EditIcon size={15} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn-goal-action btn-goal-delete"
                          title="Hapus sasaran ini"
                          onClick={() => handleDeleteGoal(goal.id, goal.title)}
                        >
                          <TrashIcon size={15} />
                          <span>Hapus</span>
                        </button>
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
