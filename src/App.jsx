import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import DashboardView from './components/dashboard/DashboardView';
import SimulationView from './components/simulation/SimulationView';
import PortfolioView from './components/portfolio/PortfolioView';
import StrategyView from './components/strategy/StrategyView';
import SettingsView from './components/settings/SettingsView';
import { MenuIcon, SunIcon, MoonIcon } from './components/Icons';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Budi Santoso',
    email: 'user.demo@financialtwin.id',
    role: 'Twin Platinum Member',
  });

  const [activeTab, setActiveTab] = useState('simulasi');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Dark Mode State dengan persistensi LocalStorage & System Theme Detection
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('financial_twin_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const mode = isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', mode);
      document.body.setAttribute('data-theme', mode);
      localStorage.setItem('financial_twin_theme', mode);
    } catch {
      // Ignore localStorage errors if restricted
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setIsSidebarOpen(false);
  };

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    handleOpenAuth('login');
  };

  // If Auth page is active (accessed via profile or menu)
  if (isAuthOpen) {
    if (authMode === 'register') {
      return (
        <RegisterPage
          onAuthSuccess={handleAuthSuccess}
          onNavigateToLogin={() => setAuthMode('login')}
        />
      );
    }
    return (
      <LoginPage
        onAuthSuccess={handleAuthSuccess}
        onNavigateToRegister={() => setAuthMode('register')}
      />
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dasbor':
        return (
          <DashboardView
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'simulasi':
        return <SimulationView />;
      case 'portofolio':
        return <PortfolioView />;
      case 'strategi':
        return <StrategyView />;
      case 'pengaturan':
        return (
          <SettingsView
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleDarkMode={(val) => setIsDarkMode(typeof val === 'boolean' ? val : !isDarkMode)}
          />
        );
      default:
        return <SimulationView />;
    }
  };

  return (
    <div className="app-layout">
      {/* Left Sidebar Navbar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <div className="app-main-wrapper">
        {/* Mobile Header Bar */}
        <header className="mobile-topbar">
          <button
            type="button"
            className="btn-mobile-menu"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Buka Menu"
          >
            <MenuIcon size={22} />
          </button>
          <div className="mobile-brand-title">Financial Twin</div>
          <button
            type="button"
            className="btn-mobile-theme"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>
        </header>

        {/* Dynamic Content View */}
        <main className="app-main-content">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default App;

