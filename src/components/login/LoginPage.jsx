import React, { useState } from 'react';
import './LoginPage.css';
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldIcon,
  TrendUpIcon,
} from '../Icons';

export default function LoginPage({ onAuthSuccess, onNavigateToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Demo auto-fill (1-Click)
  const handleQuickDemo = () => {
    setForm({
      email: 'user.demo@financialtwin.id',
      password: 'password123',
    });
    showToast('Kredensial Demo terisi otomatis! Silakan klik Masuk.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      showToast('Silakan masukkan email dan kata sandi Anda.');
      return;
    }

    const userData = {
      name: form.email.includes('demo') ? 'Budi Santoso' : form.email.split('@')[0],
      email: form.email,
      role: 'Twin Platinum Member',
    };

    showToast('Login berhasil! Mengarahkan ke Financial Twin...');
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(userData);
    }, 500);
  };

  return (
    <div className="login-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="login-toast">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="login-main-card">
        {/* Left Side: Brand Visual & Feature Highlights */}
        <div className="login-hero-panel">
          <div className="login-hero-top">
            <div className="login-brand-logo">FT</div>
            <div>
              <h2 className="login-hero-brand-name">Financial Twin</h2>
              <div className="login-hero-status">
                <span className="login-status-dot"></span>
                <span>Kembaran Finansial AI Terpadu</span>
              </div>
            </div>
          </div>

          <div className="login-hero-body">
            <h1 className="login-hero-title">
              Proyeksikan Kekayaan Masa Depan Anda dengan Presisi Digital.
            </h1>
            <p className="login-hero-desc">
              Kelola arus kas, simulasikan target impian, dan optimalkan strategi portofolio secara otomatis melalui kembaran digital finansial Anda.
            </p>

            <div className="login-feature-list">
              <div className="login-feature-item">
                <div className="login-feature-icon">
                  <SparklesIcon size={18} />
                </div>
                <div>
                  <strong>Simulasi Monte Carlo Real-time</strong>
                  <p>1.000 iterasi proyeksi bunga majemuk & faktor inflasi akurat.</p>
                </div>
              </div>

              <div className="login-feature-item">
                <div className="login-feature-icon">
                  <TrendUpIcon size={18} />
                </div>
                <div>
                  <strong>Roadmap Target Impian</strong>
                  <p>Tracking milestone pensiun dini (FIRE), rumah, & tabungan.</p>
                </div>
              </div>

              <div className="login-feature-item">
                <div className="login-feature-icon">
                  <ShieldIcon size={18} />
                </div>
                <div>
                  <strong>Privasi & Keamanan Terenkripsi</strong>
                  <p>Data keuangan Anda aman dan tersinkronisasi terpusat.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="login-hero-footer">
            <span>© 2026 Financial Twin Platform. All rights reserved.</span>
          </div>
        </div>

        {/* Right Side: Login Form Panel */}
        <div className="login-form-panel">
          {/* Header Switcher Tabs */}
          <div className="login-tab-switcher">
            <button type="button" className="login-tab-btn active">
              Masuk (Login)
            </button>
            <button
              type="button"
              className="login-tab-btn"
              onClick={onNavigateToRegister}
              id="tab-btn-register"
            >
              Daftar Akun Baru
            </button>
          </div>

          <div className="login-form-header">
            <h2 className="login-form-title">Selamat Datang Kembali</h2>
            <p className="login-form-subtitle">
              Masuk ke dashboard Financial Twin Anda untuk memantau simulasi.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-body">
            <div className="login-field-group">
              <label className="login-label" htmlFor="login-email">
                Alamat Email / Nama Pengguna
              </label>
              <div className="login-input-wrapper">
                <MailIcon size={18} className="login-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="login-input"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="login-field-group">
              <div className="login-label-row">
                <label className="login-label" htmlFor="login-password">
                  Kata Sandi
                </label>
                <a
                  href="#forgot"
                  className="login-link-subtle"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Tautan pemulihan kata sandi telah dikirim ke email.');
                  }}
                >
                  Lupa Kata Sandi?
                </a>
              </div>
              <div className="login-input-wrapper">
                <LockIcon size={18} className="login-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="Masukkan kata sandi"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="login-btn-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            <div className="login-remember-row">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button type="submit" className="btn-login-primary" id="btn-submit-login">
              <span>Masuk ke Financial Twin</span>
              <ArrowRightIcon size={16} />
            </button>

            {/* Quick Demo Fill */}
            <div className="login-demo-divider">
              <span>atau coba instan</span>
            </div>

            <button
              type="button"
              className="btn-login-demo"
              onClick={handleQuickDemo}
              id="btn-quick-demo"
            >
              <SparklesIcon size={16} />
              <span>Gunakan Akun Demo Cepat (1-Klik)</span>
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="login-form-footer">
            <p>
              Belum memiliki akun Financial Twin?{' '}
              <button
                type="button"
                className="login-switch-link"
                onClick={onNavigateToRegister}
              >
                Daftar Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
