import React from 'react';
import './Sidebar.css';
import {
  DashboardIcon,
  SimulationIcon,
  PortfolioIcon,
  StrategyIcon,
  SettingsIcon,
  CloseIcon,
  LogoutIcon,
} from '../Icons';

export default function Sidebar({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  onLogout,
}) {
  const menuItems = [
    {
      id: 'dasbor',
      label: 'Dasbor',
      icon: DashboardIcon,
    },
    {
      id: 'simulasi',
      label: 'Kalkulator Finansial',
      icon: SimulationIcon,
    },
    {
      id: 'portofolio',
      label: 'Portofolio',
      icon: PortfolioIcon,
    },
    {
      id: 'strategi',
      label: 'Strategi',
      icon: StrategyIcon,
    },
    {
      id: 'pengaturan',
      label: 'Pengaturan',
      icon: SettingsIcon,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Mobile Close Button */}
        <button
          className="sidebar-mobile-close"
          onClick={onClose}
          aria-label="Tutup menu navigasi"
        >
          <CloseIcon size={20} />
        </button>

        {/* Brand Header */}
        <div className="sidebar-header">
          <h1 className="sidebar-brand-title">Financial Twin</h1>
          <div className="sidebar-status-pill">
            <span className="status-dot-pulse"></span>
            <span className="status-label">SINKRONISASI: AKTIF</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav" aria-label="Navigasi Utama">
          <ul className="sidebar-menu-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id} className="sidebar-menu-item">
                  <button
                    type="button"
                    className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectTab(item.id);
                      if (onClose) onClose();
                    }}
                    id={`nav-item-${item.id}`}
                  >
                    <span className="sidebar-nav-icon">
                      <Icon size={20} />
                    </span>
                    <span className="sidebar-nav-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer / User Twin Badge */}
        <div className="sidebar-footer">
          <div
            className="twin-badge-card"
            onClick={() => onOpenAuth && onOpenAuth('login')}
            title="Klik untuk membuka alur Login / Daftar Akun"
            style={{ cursor: 'pointer' }}
          >
            <div className="twin-avatar">
              {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'FT'}
            </div>
            <div className="twin-info">
              <span className="twin-name">{currentUser?.name || 'Akun Finansial'}</span>
              <span className="twin-model">{currentUser?.role || 'AI Twin v2.4'}</span>
            </div>
            {onLogout && (
              <button
                type="button"
                className="btn-sidebar-logout"
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                }}
                title="Keluar / Ganti Akun"
                aria-label="Logout"
                id="btn-sidebar-logout"
              >
                <LogoutIcon size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
