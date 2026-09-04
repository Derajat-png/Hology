import React, { useState } from 'react';
import './Views.css';
import { UserIcon, LockIcon } from '../Icons';

export default function SettingsView({ currentUser, onOpenAuth, onLogout }) {
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiModel, setAiModel] = useState('Twin-Neural-Engine-v2');

  return (
    <div className="view-page">
      <div className="view-header">
        <div>
          <h1 className="view-title">Pengaturan Sistem & Twin</h1>
          <p className="view-subtitle">
            Kelola preferensi sinkronisasi, model AI Financial Twin, dan akun Anda.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Account Profile & Auth Section */}
        <div className="content-card">
          <h3 className="card-title">Profil & Akun Pengguna</h3>
          <p className="settings-section-desc">
            Informasi akun Financial Twin yang aktif saat ini.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            marginTop: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'var(--font-poppins)'
            }}>
              {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'FT'}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-main)' }}>
                {currentUser?.name || 'Budi Santoso'}
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                {currentUser?.email || 'user.demo@financialtwin.id'} • <span style={{ color: '#064e3b', fontWeight: 600 }}>{currentUser?.role || 'Platinum Member'}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-header-primary"
              onClick={() => onOpenAuth && onOpenAuth('login')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <LockIcon size={16} />
              <span>Buka Halaman Login / Registrasi</span>
            </button>
            <button
              type="button"
              className="btn-header-outline"
              onClick={() => onOpenAuth && onOpenAuth('register')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <UserIcon size={16} />
              <span>Daftar Akun Baru</span>
            </button>
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
            <label className="switch">
              <input
                type="checkbox"
                checked={syncEnabled}
                onChange={(e) => setSyncEnabled(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="setting-toggle-row">
            <div>
              <strong>Notifikasi Deviasi Portofolio</strong>
              <div className="setting-subtext">Kirim peringatan jika alokasi menyimpang &gt;5% dari target.</div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
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

          <div className="form-group" style={{ marginTop: '12px' }}>
            <label className="form-label">Pilihan AI Engine</label>
            <select
              className="form-select"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
            >
              <option value="Twin-Neural-Engine-v2">Financial Twin Neural Engine v2.4 (Rekomendasi)</option>
              <option value="Gemini-Stochastic-v1">Gemini Stochastic Market Predictor</option>
              <option value="Conservative-Classic">Model Klasik Deterministik (Tanpa Stochastics)</option>
            </select>
          </div>

          <div className="settings-save-row">
            <button className="btn-header-primary" style={{ marginTop: '16px' }}>
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
