import { useState } from 'react';
import './SettingsView.css';
import { UserIcon, LockIcon, LogoutIcon } from '../Icons';

export default function SettingsView({
  currentUser,
  onOpenAuth,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
}) {
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiModel, setAiModel] = useState('Twin-Neural-Engine-v2');

  return (
    <div className="view-page">
      <div className="view-header">
        <div>
          <h1 className="view-title">Pengaturan Sistem & Twin</h1>
          <p className="view-subtitle">
            Kelola preferensi tema tampilan, sinkronisasi, model AI Financial Twin, dan akun Anda.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Theme & Display Settings */}
        <div className="content-card">
          <h3 className="card-title">Tampilan & Tema Layar</h3>
          <p className="settings-section-desc">
            Sesuaikan pencahayaan layar agar mata terasa nyaman saat digunakan di ruangan redup maupun malam hari.
          </p>

          <div className="setting-toggle-row">
            <div>
              <strong>Mode Gelap (Dark Mode)</strong>
              <div className="setting-subtext">
                {isDarkMode
                  ? 'Mode gelap aktif: Latar belakang redup/gelap, tidak membuat mata lelah.'
                  : 'Mode terang aktif: Tampilan cerah dan kontras standar.'}
              </div>
            </div>
            <label className="switch" htmlFor="toggle-dark-mode-switch">
              <input
                id="toggle-dark-mode-switch"
                type="checkbox"
                checked={isDarkMode || false}
                onChange={(e) => onToggleDarkMode && onToggleDarkMode(e.target.checked)}
                aria-label="Toggle Mode Gelap"
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Account Profile & Auth Section */}
        <div className="content-card">
          <h3 className="card-title">Profil & Akun Pengguna</h3>
          <p className="settings-section-desc">
            Informasi akun Financial Twin yang aktif saat ini.
          </p>

          <div className="settings-user-card">
            <div className="settings-user-avatar">
              {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'FT'}
            </div>
            <div>
              <div className="settings-user-name">
                {currentUser?.name || 'Budi Santoso'}
              </div>
              <div className="settings-user-meta">
                {currentUser?.email || 'user.demo@financialtwin.id'} • <span className="settings-user-role">{currentUser?.role || 'Platinum Member'}</span>
              </div>
            </div>
          </div>

          <div className="settings-action-buttons">
            <button
              type="button"
              className="btn-header-primary"
              onClick={() => onOpenAuth && onOpenAuth('login')}
            >
              <LockIcon size={16} />
              <span>Buka Halaman Login / Registrasi</span>
            </button>
            <button
              type="button"
              className="btn-header-outline"
              onClick={() => onOpenAuth && onOpenAuth('register')}
            >
              <UserIcon size={16} />
              <span>Daftar Akun Baru</span>
            </button>
            {onLogout && (
              <button
                type="button"
                className="btn-header-outline"
                style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                onClick={onLogout}
              >
                <LogoutIcon size={16} />
                <span>Keluar Akun</span>
              </button>
            )}
          </div>
        </div>

        {/* Sync Settings */}
        <div className="content-card">
          <h3 className="card-title">Sinkronisasi Otomatis</h3>
          <p className="settings-section-desc">
            Kontrol sinkronisasi data akun perbankan dan sekuritas dengan modul Financial Twin.
          </p>

          <div className="setting-toggle-row">
            <div>
              <strong>Status Sinkronisasi Background</strong>
              <div className="setting-subtext">Perbarui data aset dan portofolio setiap 15 menit.</div>
            </div>
            <label className="switch" htmlFor="toggle-sync-bg">
              <input
                id="toggle-sync-bg"
                type="checkbox"
                checked={syncEnabled}
                onChange={(e) => setSyncEnabled(e.target.checked)}
                aria-label="Toggle Sinkronisasi Background"
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="setting-toggle-row">
            <div>
              <strong>Notifikasi Deviasi Portofolio</strong>
              <div className="setting-subtext">Kirim peringatan jika alokasi menyimpang &gt;5% dari target.</div>
            </div>
            <label className="switch" htmlFor="toggle-alerts">
              <input
                id="toggle-alerts"
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                aria-label="Toggle Notifikasi Deviasi"
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* AI Model Config */}
        <div className="content-card">
          <h3 className="card-title">Konfigurasi Model AI Twin</h3>
          <p className="settings-section-desc">
            Pilih mesin kecerdasan buatan yang digunakan untuk menjalankan simulasi Monte Carlo.
          </p>

          <div className="settings-form-group">
            <label htmlFor="select-ai-engine" className="settings-form-label">Pilihan AI Engine</label>
            <select
              id="select-ai-engine"
              className="settings-form-select"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
            >
              <option value="Twin-Neural-Engine-v2">Financial Twin Neural Engine v2.4 (Rekomendasi)</option>
              <option value="Gemini-Stochastic-v1">Gemini Stochastic Market Predictor</option>
              <option value="Conservative-Classic">Model Klasik Deterministik (Tanpa Stochastics)</option>
            </select>
          </div>

          <div className="settings-save-row">
            <button className="btn-header-primary">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
