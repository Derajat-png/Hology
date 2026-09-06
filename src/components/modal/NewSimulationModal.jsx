import { useState } from 'react';
import './NewSimulationModal.css';
import { CloseIcon, PlusIcon } from '../Icons';

export default function NewSimulationModal({ isOpen, onClose, onSaveSimulation }) {
  const [formData, setFormData] = useState({
    title: 'Simulasi Pensiun Dini 2035',
    targetAmount: 2500000000,
    monthlyContribution: 7500000,
    timeHorizonYears: 10,
    riskProfile: 'Moderat',
    expectedReturnRate: 11.5,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'riskProfile' || name === 'title' ? value : Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveSimulation) {
      onSaveSimulation(formData);
    }
    onClose();
  };

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div>
            <div className="modal-badge">
              <span>Financial Twin Engine</span>
            </div>
            <h2 className="modal-title">Buat Simulasi Baru</h2>
            <p className="modal-subtitle">
              Konfigurasikan skenario keuangan digital untuk memproyeksikan portofolio masa depan.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup popup"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Nama Skenario / Simulasi
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Dana Rumah Impian / Pensiun Dini"
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="targetAmount">
                Target Dana Akhir ({formatRupiah(formData.targetAmount)})
              </label>
              <input
                id="targetAmount"
                name="targetAmount"
                type="number"
                step="50000000"
                min="10000000"
                className="form-input"
                value={formData.targetAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="monthlyContribution">
                Kontribusi Bulanan ({formatRupiah(formData.monthlyContribution)})
              </label>
              <input
                id="monthlyContribution"
                name="monthlyContribution"
                type="number"
                step="500000"
                min="500000"
                className="form-input"
                value={formData.monthlyContribution}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label" htmlFor="timeHorizonYears">
                Horizon Waktu (Tahun)
              </label>
              <input
                id="timeHorizonYears"
                name="timeHorizonYears"
                type="number"
                min="1"
                max="40"
                className="form-input"
                value={formData.timeHorizonYears}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="riskProfile">
                Profil Risiko
              </label>
              <select
                id="riskProfile"
                name="riskProfile"
                className="form-select"
                value={formData.riskProfile}
                onChange={handleChange}
              >
                <option value="Konservatif">Konservatif (4-7%)</option>
                <option value="Moderat">Moderat (8-13%)</option>
                <option value="Agresif">Agresif (14-22%)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="expectedReturnRate">
                Ekspektasi Return (%/thn)
              </label>
              <input
                id="expectedReturnRate"
                name="expectedReturnRate"
                type="number"
                step="0.5"
                min="1"
                max="30"
                className="form-input"
                value={formData.expectedReturnRate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Projection Preview Card */}
          <div className="modal-preview-box">
            <div className="preview-indicator">
              <span className="preview-label">Estimasi Hasil Akumulasi:</span>
              <span className="preview-value">
                {formatRupiah(
                  Math.round(
                    formData.monthlyContribution *
                      12 *
                      formData.timeHorizonYears *
                      Math.pow(1 + formData.expectedReturnRate / 100, formData.timeHorizonYears / 2)
                  )
                )}
              </span>
            </div>
            <p className="preview-note">
              Model komputasi Financial Twin akan menyimulasikan 1.000 iterasi Monte Carlo otomatis.
            </p>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-submit"
            >
              <PlusIcon size={16} />
              <span>Jalankan Simulasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
