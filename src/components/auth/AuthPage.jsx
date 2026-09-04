import React, { useState } from 'react';
import './AuthPage.css';
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  EyeIcon,
  EyeOffIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldIcon,
  TrendUpIcon,
  CloseIcon,
} from '../Icons';

export default function AuthPage({ onAuthSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    financialGoal: 'FIRE 2035 (Pensiun Dini)',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Demo auto-fill
  const handleQuickDemo = () => {
    setLoginForm({
      email: 'user.demo@financialtwin.id',
      password: 'password123',
    });
    showToast('Kredensial Demo terisi otomatis! Silakan klik Masuk.');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      showToast('Silakan masukkan email dan kata sandi Anda.');
      return;
    }

    const userData = {
      name: loginForm.email.includes('demo') ? 'Budi Santoso' : loginForm.email.split('@')[0],
      email: loginForm.email,
      role: 'Twin Platinum Member',
    };

    showToast('Login berhasil! Mengarahkan ke Financial Twin...');
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(userData);
    }, 500);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.fullName || !registerForm.email || !registerForm.password) {
      showToast('Harap lengkapi semua kolom yang wajib diisi.');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      showToast('Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (!registerForm.agreeTerms) {
      showToast('Harap setujui Syarat & Ketentuan layanan.');
      return;
    }

    const userData = {
      name: registerForm.fullName,
      email: registerForm.email,
      phone: registerForm.phone,
      goal: registerForm.financialGoal,
      role: 'Twin Explorer Member',
    };

    showToast('Registrasi berhasil! Selamat datang di Financial Twin.');
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(userData);
    }, 500);
  };

  return (
    <div className="auth-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="auth-toast">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="auth-main-card">
        {/* Left Side: Brand Visual & Feature Highlights */}
        <div className="auth-hero-panel">
          <div className="auth-hero-top">
            <div className="auth-brand-logo">FT</div>
            <div>
              <h2 className="auth-hero-brand-name">Financial Twin</h2>
              <div className="auth-hero-status">
                <span className="auth-status-dot"></span>
                <span>Kembaran Finansial AI Terpadu</span>
              </div>
            </div>
          </div>

          <div className="auth-hero-body">
            <h1 className="auth-hero-title">
              Proyeksikan Kekayaan Masa Depan Anda dengan Presisi Digital.
            </h1>
            <p className="auth-hero-desc">
              Kelola arus kas, simulasikan target impian, dan optimalkan strategi portofolio secara otomatis melalui kembaran digital finansial Anda.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="feature-icon-badge">
                  <SparklesIcon size={18} />
                </div>
                <div>
                  <strong>Simulasi Monte Carlo Real-time</strong>
                  <p>1.000 iterasi proyeksi bunga majemuk & faktor inflasi akurat.</p>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="feature-icon-badge">
                  <TrendUpIcon size={18} />
                </div>
                <div>
                  <strong>Roadmap Target Impian</strong>
                  <p>Tracking milestone pensiun dini (FIRE), rumah, & tabungan.</p>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="feature-icon-badge">
                  <ShieldIcon size={18} />
                </div>
                <div>
                  <strong>Privasi & Keamanan Terenkripsi</strong>
                  <p>Data keuangan Anda aman dan tersinkronisasi terpusat.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <span>© 2026 Financial Twin Platform. All rights reserved.</span>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="auth-form-panel">
          {/* Mode Switcher Tabs */}
          <div className="auth-tab-switcher">
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
              id="tab-login"
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => setMode('register')}
              id="tab-register"
            >
              Daftar Akun Baru
            </button>
          </div>

          {/* Form Header */}
          <div className="auth-form-header">
            <h2 className="auth-form-title">
              {mode === 'login' ? 'Selamat Datang Kembali' : 'Mulai Kembaran Finansial Anda'}
            </h2>
            <p className="auth-form-subtitle">
              {mode === 'login'
                ? 'Masuk ke dashboard Financial Twin Anda untuk memantau simulasi.'
                : 'Buat akun dalam 1 menit dan mulai bangun model proyeksi kekayaan.'}
            </p>
          </div>

          {/* ===================== LOGIN FORM ===================== */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="auth-form-body">
              <div className="auth-field-group">
                <label className="auth-label" htmlFor="login-email">
                  Alamat Email / Nama Pengguna
                </label>
                <div className="auth-input-wrapper">
                  <MailIcon size={18} className="auth-input-icon" />
                  <input
                    id="login-email"
                    type="email"
                    className="auth-input"
                    placeholder="nama@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="auth-field-group">
                <div className="auth-label-row">
                  <label className="auth-label" htmlFor="login-password">
                    Kata Sandi
                  </label>
                  <a
                    href="#forgot"
                    className="auth-link-subtle"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Tautan pemulihan kata sandi telah dikirim ke email.');
                    }}
                  >
                    Lupa Kata Sandi?
                  </a>
                </div>
                <div className="auth-input-wrapper">
                  <LockIcon size={18} className="auth-input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Masukkan kata sandi"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="auth-btn-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>

              <div className="auth-remember-row">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="auth-checkbox"
                  />
                  <span>Ingat saya di perangkat ini</span>
                </label>
              </div>

              <button type="submit" className="btn-auth-primary" id="btn-submit-login">
                <span>Masuk ke Financial Twin</span>
                <ArrowRightIcon size={16} />
              </button>

              {/* Quick Demo Fill Button */}
              <div className="auth-demo-divider">
                <span>atau coba instan</span>
              </div>

              <button
                type="button"
                className="btn-auth-demo"
                onClick={handleQuickDemo}
                id="btn-quick-demo"
              >
                <SparklesIcon size={16} />
                <span>Gunakan Akun Demo Cepat (1-Klik)</span>
              </button>
            </form>
          )}

          {/* ===================== REGISTER FORM ===================== */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="auth-form-body">
              <div className="auth-field-group">
                <label className="auth-label" htmlFor="reg-name">
                  Nama Lengkap
                </label>
                <div className="auth-input-wrapper">
                  <UserIcon size={18} className="auth-input-icon" />
                  <input
                    id="reg-name"
                    type="text"
                    className="auth-input"
                    placeholder="Contoh: Budi Pratama"
                    value={registerForm.fullName}
                    onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="auth-fields-2col">
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="reg-email">
                    Alamat Email
                  </label>
                  <div className="auth-input-wrapper">
                    <MailIcon size={18} className="auth-input-icon" />
                    <input
                      id="reg-email"
                      type="email"
                      className="auth-input"
                      placeholder="nama@email.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="reg-phone">
                    Nomor WhatsApp / HP
                  </label>
                  <div className="auth-input-wrapper">
                    <PhoneIcon size={18} className="auth-input-icon" />
                    <input
                      id="reg-phone"
                      type="tel"
                      className="auth-input"
                      placeholder="081234567890"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="auth-field-group">
                <label className="auth-label" htmlFor="reg-goal">
                  Fokus Tujuan Finansial Utama
                </label>
                <select
                  id="reg-goal"
                  className="auth-select"
                  value={registerForm.financialGoal}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, financialGoal: e.target.value })
                  }
                >
                  <option value="FIRE 2035 (Pensiun Dini)">FIRE 2035 (Pensiun Dini & Bebas Finansial)</option>
                  <option value="Dana Rumah Impian">Dana Membeli Rumah & Properti Pertama</option>
                  <option value="Akumulasi Portofolio">Akumulasi Investasi Saham & SBN Terpadu</option>
                  <option value="Dana Pendidikan Anak">Perencanaan Dana Pendidikan Masa Depan</option>
                </select>
              </div>

              <div className="auth-fields-2col">
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="reg-pass">
                    Kata Sandi
                  </label>
                  <div className="auth-input-wrapper">
                    <LockIcon size={18} className="auth-input-icon" />
                    <input
                      id="reg-pass"
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input"
                      placeholder="Min. 8 karakter"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="auth-btn-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>

                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="reg-confirm-pass">
                    Konfirmasi Kata Sandi
                  </label>
                  <div className="auth-input-wrapper">
                    <LockIcon size={18} className="auth-input-icon" />
                    <input
                      id="reg-confirm-pass"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="auth-input"
                      placeholder="Ulangi kata sandi"
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="auth-btn-eye"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="auth-remember-row">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={registerForm.agreeTerms}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, agreeTerms: e.target.checked })
                    }
                    className="auth-checkbox"
                  />
                  <span>
                    Saya menyetujui <a href="#terms" className="auth-link-text">Syarat & Ketentuan</a> serta Kebijakan Privasi Financial Twin.
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-auth-primary" id="btn-submit-register">
                <span>Daftar Akun Baru</span>
                <ArrowRightIcon size={16} />
              </button>
            </form>
          )}

          {/* Footer Switcher */}
          <div className="auth-form-footer">
            {mode === 'login' ? (
              <p>
                Belum memiliki akun Financial Twin?{' '}
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => setMode('register')}
                >
                  Daftar Sekarang
                </button>
              </p>
            ) : (
              <p>
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => setMode('login')}
                >
                  Masuk ke Akun Anda
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
