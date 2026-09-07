import { useState, useRef } from 'react';
import './SettingsView.css';
import { UserIcon, LockIcon, LogoutIcon, ChevronDownIcon, UploadIcon, CheckIcon } from '../Icons';

const AVATAR_SWATCHES = [
  { label: 'Lime', color: '#8dc63f' },
  { label: 'Biru', color: '#3b82f6' },
  { label: 'Oranye', color: '#f97316' },
  { label: 'Pink', color: '#ec4899' },
  { label: 'Ungu', color: '#8b5cf6' },
  { label: 'Abu-abu', color: '#64748b' },
];

export default function SettingsView({
  currentUser,
  onUpdateUser,
  onLogout,
}) {
  // Accordion State ('data' | 'password' | 'logout' | null)
  const [openAccordion, setOpenAccordion] = useState(null);

  // Avatar Popover State
  const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
  const [tempAvatarType, setTempAvatarType] = useState(currentUser?.avatarType || 'initials');
  const [tempAvatarColor, setTempAvatarColor] = useState(currentUser?.avatarColor || '#8dc63f');
  const [tempAvatarInitials, setTempAvatarInitials] = useState(currentUser?.avatarInitials || 'BU');
  const [tempAvatarImageSrc, setTempAvatarImageSrc] = useState(currentUser?.avatarImageSrc || null);

  const fileInputRef = useRef(null);

  // Form States
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Budi Santoso',
    email: currentUser?.email || 'budi.santoso@financialtwin.id',
    phone: currentUser?.phone || '+62 812-3456-7890',
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleAccordion = (key) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  // Avatar Popover Handlers
  const handleOpenAvatarPopover = () => {
    setTempAvatarType(currentUser?.avatarType || 'initials');
    setTempAvatarColor(currentUser?.avatarColor || '#8dc63f');
    setTempAvatarInitials(currentUser?.avatarInitials || (currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'BU'));
    setTempAvatarImageSrc(currentUser?.avatarImageSrc || null);
    setIsAvatarPopoverOpen((prev) => !prev);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempAvatarType('image');
        setTempAvatarImageSrc(event.target?.result);
        showToast('Foto profil dimuat. Klik "Simpan Avatar" untuk menerapkan.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (onUpdateUser) {
      onUpdateUser({
        avatarType: tempAvatarType,
        avatarColor: tempAvatarColor,
        avatarInitials: tempAvatarInitials || 'BU',
        avatarImageSrc: tempAvatarImageSrc,
      });
    }
    setIsAvatarPopoverOpen(false);
    showToast('Avatar berhasil diperbarui!');
  };

  const handleCancelAvatar = () => {
    setIsAvatarPopoverOpen(false);
  };

  // Save Account Data
  const handleSaveDataAkun = (e) => {
    e.preventDefault();
    let autoInitials = currentUser?.avatarInitials || 'BU';
    if (currentUser?.avatarType === 'initials') {
      const parts = formData.name.trim().split(' ');
      if (parts.length >= 2) {
        autoInitials = (parts[0][0] + parts[1][0]).toUpperCase();
      } else if (parts[0].length >= 2) {
        autoInitials = parts[0].substring(0, 2).toUpperCase();
      }
    }

    if (onUpdateUser) {
      onUpdateUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        avatarInitials: autoInitials,
      });
    }
    showToast('Data akun berhasil diperbarui!');
  };

  // Save Password
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Konfirmasi kata sandi baru tidak cocok. Silakan periksa kembali.');
      return;
    }
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setOpenAccordion(null);
    showToast('Kata sandi berhasil diperbarui!');
  };

  // Current Avatar Display Logic
  const displayAvatarSrc = isAvatarPopoverOpen
    ? (tempAvatarType === 'image' ? tempAvatarImageSrc : null)
    : (currentUser?.avatarType === 'image' ? currentUser.avatarImageSrc : null);

  const displayAvatarColor = isAvatarPopoverOpen
    ? tempAvatarColor
    : (currentUser?.avatarColor || '#8dc63f');

  const displayAvatarInitials = isAvatarPopoverOpen
    ? tempAvatarInitials
    : (currentUser?.avatarInitials || (currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'BU'));

  return (
    <div className="account-settings-container">
      <div className="account-settings-constrained">
        
        {/* Header Halaman */}
        <header className="account-settings-header">
          <h1 className="account-settings-title">Pengaturan Akun</h1>
          <p className="account-settings-subtitle">
            Lihat data akun Anda, atau buka salah satu menu di bawah untuk mengubahnya.
          </p>
        </header>

        {/* BAGIAN 1: KARTU PROFIL (Tampilan default, read-only) */}
        <section className="profile-summary-card">
          {/* Avatar Interaktif */}
          <div
            className="avatar-clickable-wrapper"
            onClick={handleOpenAvatarPopover}
            title="Klik untuk mengubah avatar"
            style={{
              backgroundColor: displayAvatarSrc ? 'transparent' : displayAvatarColor,
              backgroundImage: displayAvatarSrc ? `url(${displayAvatarSrc})` : 'none',
            }}
          >
            {!displayAvatarSrc && (
              <span className="avatar-initials-text">{displayAvatarInitials}</span>
            )}
            <div className="avatar-hover-overlay">
              <span>Ubah Avatar</span>
            </div>
          </div>

          {/* User Info Metadata */}
          <div className="profile-summary-info">
            <h2 className="profile-user-fullname">
              {currentUser?.name || 'Budi Santoso'}
            </h2>
            <div className="profile-user-email">
              {currentUser?.email || 'budi.santoso@financialtwin.id'}
            </div>
            <div className="profile-chips-row">
              <div className="profile-meta-chip">
                <span>Status:</span>
                <strong className="chip-highlight">
                  {currentUser?.role || 'Twin Platinum Member'}
                </strong>
              </div>
              <div className="profile-meta-chip">
                <span>Telepon:</span>
                <strong className="chip-highlight">
                  {currentUser?.phone || '+62 812-3456-7890'}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* AVATAR EDIT POPOVER / PANEL */}
        {isAvatarPopoverOpen && (
          <div className="avatar-edit-popover">
            <h3 className="avatar-popover-title">Ubah Avatar</h3>

            {/* Upload Foto Button */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="btn-upload-avatar"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon size={18} />
              <span>Unggah Foto dari Perangkat</span>
            </button>

            {/* Pembatas */}
            <div className="popover-divider-or">
              <span>atau gunakan inisial</span>
            </div>

            {/* Inisial Input */}
            <div className="initials-row">
              <span className="initials-row-label">Teks Inisial:</span>
              <input
                type="text"
                className="input-initials-box"
                maxLength={2}
                value={tempAvatarInitials}
                onChange={(e) => {
                  setTempAvatarType('initials');
                  setTempAvatarImageSrc(null);
                  setTempAvatarInitials(e.target.value.toUpperCase());
                }}
              />
            </div>

            {/* Color Swatches */}
            <div className="swatches-group">
              <span className="swatches-label">Pilihan Warna Latar Inisial:</span>
              <div className="swatches-list">
                {AVATAR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.color}
                    type="button"
                    className={`swatch-circle ${tempAvatarColor === swatch.color && tempAvatarType === 'initials' ? 'active' : ''}`}
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.label}
                    onClick={() => {
                      setTempAvatarType('initials');
                      setTempAvatarImageSrc(null);
                      setTempAvatarColor(swatch.color);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Popover Actions */}
            <div className="avatar-popover-actions">
              <button
                type="button"
                className="btn-settings-ghost"
                onClick={handleCancelAvatar}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-settings-lime"
                onClick={handleSaveAvatar}
              >
                Simpan Avatar
              </button>
            </div>
          </div>
        )}

        {/* BAGIAN 2: MENU LIST (ACCORDION) */}
        <section className="settings-accordion-card">
          
          {/* 1. Ubah Data Akun */}
          <div className={`accordion-row-item ${openAccordion === 'data' ? 'open' : ''}`}>
            <div
              className="accordion-item-head"
              onClick={() => handleToggleAccordion('data')}
            >
              <div className="head-left-content">
                <div className="head-icon-wrapper">
                  <UserIcon size={18} />
                </div>
                <div className="head-labels">
                  <span className="head-main-title">Ubah Data Akun</span>
                  <span className="head-sub-title">Nama, email, dan nomor telepon</span>
                </div>
              </div>
              <div className="head-chevron-icon">
                <ChevronDownIcon size={18} />
              </div>
            </div>

            <div className="accordion-collapsible-body">
              <form className="accordion-form-inner" onSubmit={handleSaveDataAkun}>
                <div className="settings-form-field">
                  <label className="settings-label" htmlFor="inputName">Nama Lengkap</label>
                  <input
                    id="inputName"
                    type="text"
                    className="settings-dark-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="settings-grid-cols-2">
                  <div className="settings-form-field">
                    <label className="settings-label" htmlFor="inputEmail">Alamat Email</label>
                    <input
                      id="inputEmail"
                      type="email"
                      className="settings-dark-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="settings-form-field">
                    <label className="settings-label" htmlFor="inputPhone">Nomor Telepon</label>
                    <input
                      id="inputPhone"
                      type="tel"
                      className="settings-dark-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-settings-lime">
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </div>

          {/* 2. Ubah Kata Sandi */}
          <div className={`accordion-row-item ${openAccordion === 'password' ? 'open' : ''}`}>
            <div
              className="accordion-item-head"
              onClick={() => handleToggleAccordion('password')}
            >
              <div className="head-left-content">
                <div className="head-icon-wrapper">
                  <LockIcon size={18} />
                </div>
                <div className="head-labels">
                  <span className="head-main-title">Ubah Kata Sandi</span>
                  <span className="head-sub-title">Perbarui password akun Anda</span>
                </div>
              </div>
              <div className="head-chevron-icon">
                <ChevronDownIcon size={18} />
              </div>
            </div>

            <div className="accordion-collapsible-body">
              <form className="accordion-form-inner" onSubmit={handleSavePassword}>
                <div className="settings-form-field">
                  <label className="settings-label" htmlFor="inputOldPassword">Kata Sandi Saat Ini</label>
                  <input
                    id="inputOldPassword"
                    type="password"
                    className="settings-dark-input"
                    placeholder="Masukkan kata sandi lama Anda"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="settings-grid-cols-2">
                  <div className="settings-form-field">
                    <label className="settings-label" htmlFor="inputNewPassword">Kata Sandi Baru</label>
                    <input
                      id="inputNewPassword"
                      type="password"
                      className="settings-dark-input"
                      placeholder="Minimal 8 karakter"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>
                  <div className="settings-form-field">
                    <label className="settings-label" htmlFor="inputConfirmPassword">Konfirmasi Kata Sandi Baru</label>
                    <input
                      id="inputConfirmPassword"
                      type="password"
                      className="settings-dark-input"
                      placeholder="Ketik ulang kata sandi baru"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <p className="settings-helper-hint">
                  Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol untuk keamanan maksimal.
                </p>

                <button type="submit" className="btn-settings-lime">
                  Perbarui Kata Sandi
                </button>
              </form>
            </div>
          </div>

          {/* 3. Keluar Akun */}
          <div className={`accordion-row-item ${openAccordion === 'logout' ? 'open' : ''}`}>
            <div
              className="accordion-item-head"
              onClick={() => handleToggleAccordion('logout')}
            >
              <div className="head-left-content">
                <div className="head-icon-wrapper danger">
                  <LogoutIcon size={18} />
                </div>
                <div className="head-labels">
                  <span className="head-main-title text-danger">Keluar Akun</span>
                  <span className="head-sub-title">Keluar dari perangkat ini</span>
                </div>
              </div>
              <div className="head-chevron-icon">
                <ChevronDownIcon size={18} />
              </div>
            </div>

            <div className="accordion-collapsible-body">
              <div className="accordion-form-inner">
                <p className="settings-helper-hint">
                  Anda akan keluar dari sesi Financial Twin pada perangkat ini. Pastikan Anda mengingat kredensial login untuk masuk kembali.
                </p>
                <button
                  type="button"
                  className="btn-settings-danger-outline"
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin keluar dari akun Financial Twin?')) {
                      showToast('Mengalihkan...');
                      if (onLogout) onLogout();
                    }
                  }}
                >
                  Ya, Keluar Akun
                </button>
              </div>
            </div>
          </div>

        </section>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="settings-toast-alert">
          <CheckIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
