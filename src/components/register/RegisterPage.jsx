import { useState } from 'react';
import './RegisterPage.css';
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
} from '../Icons';

export default function RegisterPage({ onAuthSuccess, onNavigateToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [form, setForm] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      showToast('Harap lengkapi semua kolom yang wajib diisi.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      showToast('Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (!form.agreeTerms) {
      showToast('Harap setujui Syarat & Ketentuan layanan.');
      return;
    }

    const userData = {
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      goal: form.financialGoal,
      role: 'Twin Explorer Member',
    };

    showToast('Registrasi berhasil! Selamat datang di Financial Twin.');
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(userData);
    }, 500);
  };

  return (
    <div className="register-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="register-toast">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="register-main-card">
        {/* Left Side: Hero Panel */}
        <div className="register-hero-panel">
          <div className="register-hero-top">
            <div className="register-brand-logo">FT</div>
            <div>
              <h2 className="register-hero-brand-name">Financial Twin</h2>
              <div className="register-hero-status">
                <span className="register-status-dot"></span>
                <span>Kembaran Finansial AI Terpadu</span>
              </div>
            </div>
          </div>

          <div className="register-hero-body">
            <h1 className="register-hero-title">
              Mulai Bangun Model Kebebasan Finansial Anda.
            </h1>
            <p className="register-hero-desc">
              Gabung dengan ribuan perencana cerdas yang memproyeksikan strategi kekayaan mereka secara digital dan berbasis data probabilistik.
            </p>

            <div className="register-feature-list">
              <div className="register-feature-item">
                <div className="register-feature-icon">
                  <SparklesIcon size={18} />
                </div>
                <div>
                  <strong>Model Kembaran AI Terkustomisasi</strong>
                  <p>Sesuaikan profil pendapatan, pajak PPh 21, dan portofolio aset.</p>
                </div>
              </div>

              <div className="register-feature-item">
                <div className="register-feature-icon">
                  <TrendUpIcon size={18} />
                </div>
                <div>
                  <strong>Proyeksi Pertumbuhan Riil</strong>
                  <p>Simulasikan pencapaian dana rumah dan pensiun dini (FIRE).</p>
                </div>
              </div>

              <div className="register-feature-item">
                <div className="register-feature-icon">
                  <ShieldIcon size={18} />
                </div>
                <div>
                  <strong>Keamanan & Privasi Maksimal</strong>
                  <p>Standar keamanan data finansial terenkripsi perbankan modern.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="register-hero-footer">
            <span>© 2026 Financial Twin Platform. All rights reserved.</span>
          </div>
        </div>

        {/* Right Side: Register Form Panel */}
        <div className="register-form-panel">
          {/* Header Switcher Tabs */}
          <div className="register-tab-switcher">
            <button
              type="button"
              className="register-tab-btn"
              onClick={onNavigateToLogin}
              id="tab-btn-login"
            >
              Masuk (Login)
            </button>
            <button type="button" className="register-tab-btn active">
              Daftar Akun Baru
            </button>
          </div>

          <div className="register-form-header">
            <h2 className="register-form-title">Mulai Kembaran Finansial Anda</h2>
            <p className="register-form-subtitle">
              Buat akun dalam 1 menit dan mulai bangun model proyeksi kekayaan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="register-form-body">
            <div className="register-field-group">
              <label className="register-label" htmlFor="reg-name">
                Nama Lengkap
              </label>
              <div className="register-input-wrapper">
                <UserIcon size={18} className="register-input-icon" />
                <input
                  id="reg-name"
                  type="text"
                  className="register-input"
                  placeholder="Contoh: Budi Pratama"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="register-fields-2col">
              <div className="register-field-group">
                <label className="register-label" htmlFor="reg-email">
                  Alamat Email
                </label>
                <div className="register-input-wrapper">
                  <MailIcon size={18} className="register-input-icon" />
                  <input
                    id="reg-email"
                    type="email"
                    className="register-input"
                    placeholder="nama@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="register-field-group">
                <label className="register-label" htmlFor="reg-phone">
                  Nomor WhatsApp / HP
                </label>
                <div className="register-input-wrapper">
                  <PhoneIcon size={18} className="register-input-icon" />
                  <input
                    id="reg-phone"
                    type="tel"
                    className="register-input"
                    placeholder="081234567890"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="register-field-group">
              <label className="register-label" htmlFor="reg-goal">
                Fokus Tujuan Finansial Utama
              </label>
              <select
                id="reg-goal"
                className="register-select"
                value={form.financialGoal}
                onChange={(e) =>
                  setForm({ ...form, financialGoal: e.target.value })
                }
              >
                <option value="FIRE 2035 (Pensiun Dini)">FIRE 2035 (Pensiun Dini & Bebas Finansial)</option>
                <option value="Dana Rumah Impian">Dana Membeli Rumah & Properti Pertama</option>
                <option value="Akumulasi Portofolio">Akumulasi Investasi Saham & SBN Terpadu</option>
                <option value="Dana Pendidikan Anak">Perencanaan Dana Pendidikan Masa Depan</option>
              </select>
            </div>

            <div className="register-fields-2col">
              <div className="register-field-group">
                <label className="register-label" htmlFor="reg-pass">
                  Kata Sandi
                </label>
                <div className="register-input-wrapper">
                  <LockIcon size={18} className="register-input-icon" />
                  <input
                    id="reg-pass"
                    type={showPassword ? 'text' : 'password'}
                    className="register-input"
                    placeholder="Min. 8 karakter"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="register-btn-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>

              <div className="register-field-group">
                <label className="register-label" htmlFor="reg-confirm-pass">
                  Konfirmasi Kata Sandi
                </label>
                <div className="register-input-wrapper">
                  <LockIcon size={18} className="register-input-icon" />
                  <input
                    id="reg-confirm-pass"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="register-input"
                    placeholder="Ulangi kata sandi"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="register-btn-eye"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="register-remember-row">
              <label className="register-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) =>
                    setForm({ ...form, agreeTerms: e.target.checked })
                  }
                  className="register-checkbox"
                />
                <span>
                  Saya menyetujui <a href="#terms" className="register-link-text">Syarat & Ketentuan</a> serta Kebijakan Privasi Financial Twin.
                </span>
              </label>
            </div>

            <button type="submit" className="btn-register-primary" id="btn-submit-register">
              <span>Daftar Akun Baru</span>
              <ArrowRightIcon size={16} />
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="register-form-footer">
            <p>
              Sudah memiliki akun?{' '}
              <button
                type="button"
                className="register-switch-link"
                onClick={onNavigateToLogin}
              >
                Masuk ke Akun Anda
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
