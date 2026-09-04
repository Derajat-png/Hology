import React from 'react';
import './Sidebar.css';
import {
  DashboardIcon,
  SimulationIcon,
  PortfolioIcon,
  StrategyIcon,
  SettingsIcon,
  PlusIcon,
  CloseIcon,
} from './Icons';

export default function Sidebar({
  activeTab,
  onSelectTab,
  onNewSimulation,
  isOpen,
  onClose,
}) {
  const menuItems = [
    {
      id: 'dasbor',
      label: 'Dasbor',
      icon: DashboardIcon,
    },
    {
      id: 'simulasi',
      label: 'Simulasi',
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

        {/* Action Button: + Simulasi Baru */}
        <div className="sidebar-action-wrapper">
          <button
            type="button"
            className="btn-new-simulation"
            onClick={onNewSimulation}
            id="btn-simulasi-baru"
          >
            <PlusIcon size={18} className="btn-icon-plus" />
            <span>Simulasi Baru</span>
          </button>
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
          <div className="twin-badge-card">
            <div className="twin-avatar">FT</div>
            <div className="twin-info">
              <span className="twin-name">Akun Finansial</span>
              <span className="twin-model">AI Twin v2.4</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
