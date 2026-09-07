import './Sidebar.css';
import {
  DashboardIcon,
  SimulationIcon,
  PortfolioIcon,
  StrategyIcon,
  SettingsIcon,
  CloseIcon,
  LogoutIcon,
  SunIcon,
  MoonIcon,
} from '../Icons';

export default function Sidebar({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
}) {
  const menuItems = [
    {
      id: 'dasbor',
      label: 'Dashboard',
      icon: DashboardIcon,
    },
    {
      id: 'simulasi',
      label: 'Kalkulator Finansial',
      icon: SimulationIcon,
    },
    {
      id: 'portofolio',
      label: 'Analisis',
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
          {/* Quick Theme Toggle Button */}
          {onToggleDarkMode && (
            <div className="sidebar-theme-toggle-row">
              <button
                type="button"
                className="btn-sidebar-theme-toggle"
                onClick={onToggleDarkMode}
                aria-label={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                id="btn-sidebar-theme-toggle"
              >
                {isDarkMode ? <SunIcon size={17} /> : <MoonIcon size={17} />}
                <span>{isDarkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
              </button>
            </div>
          )}

          <div
            className="twin-badge-card"
            onClick={() => onSelectTab && onSelectTab('pengaturan')}
            title="Buka Pengaturan Akun"
            style={{ cursor: 'pointer' }}
          >
            <div
              className="twin-avatar"
              style={{
                backgroundColor: currentUser?.avatarType === 'image' && currentUser?.avatarImageSrc ? 'transparent' : (currentUser?.avatarColor || '#8dc63f'),
                backgroundImage: currentUser?.avatarType === 'image' && currentUser?.avatarImageSrc ? `url(${currentUser.avatarImageSrc})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            >
              {currentUser?.avatarType === 'image' && currentUser?.avatarImageSrc
                ? ''
                : (currentUser?.avatarInitials || (currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'BU'))}
            </div>
            <div className="twin-info">
              <span className="twin-name">{currentUser?.name || 'Budi Santoso'}</span>
              <span className="twin-model">{currentUser?.role || 'Twin Platinum'}</span>
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
