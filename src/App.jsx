import { useState, useEffect, useRef } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import SimulationView from './components/simulation/SimulationView';
import PortfolioView from './components/portfolio/PortfolioView';
import StrategyView from './components/strategy/StrategyView';
import SettingsView from './components/settings/SettingsView';
import LandingContent from './components/landing/LandingContent';
import { MenuIcon, SunIcon, MoonIcon } from './components/Icons';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Budi Santoso',
    email: 'budi.santoso@financialtwin.id',
    phone: '+62 812-3456-7890',
    role: 'Twin Platinum Member',
    avatarType: 'initials',
    avatarColor: '#8dc63f',
    avatarInitials: 'BU',
    avatarImageSrc: null,
  });

  const [activeTab, setActiveTab] = useState('dasbor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const mainWrapperRef = useRef(null);

  // Dark Mode State dengan persistensi LocalStorage & System Theme Detection
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('financial_twin_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true; // Default dark
    }
  });

  const [accentKey, setAccentKey] = useState(() => {
    try {
      return localStorage.getItem('financial_twin_accent') || 'lime';
    } catch {
      return 'lime';
    }
  });

  useEffect(() => {
    try {
      const mode = isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', mode);
      document.body.setAttribute('data-theme', mode);
      localStorage.setItem('financial_twin_theme', mode);

      const ACCENTS = {
        lime: { dark: '#8dc63f', light: '#529321', darkHover: '#5e8f26', lightHover: '#3b6b15' },
        emerald: { dark: '#10b981', light: '#059669', darkHover: '#059669', lightHover: '#047857' },
        blue: { dark: '#38bdf8', light: '#0284c7', darkHover: '#0284c7', lightHover: '#0369a1' },
        amber: { dark: '#fbbf24', light: '#d97706', darkHover: '#d97706', lightHover: '#b45309' },
        purple: { dark: '#a855f7', light: '#7e22ce', darkHover: '#7e22ce', lightHover: '#6b21a8' },
      };

      const palette = ACCENTS[accentKey] || ACCENTS.lime;
      const primaryColor = isDarkMode ? palette.dark : palette.light;
      const hoverColor = isDarkMode ? palette.darkHover : palette.lightHover;

      document.documentElement.style.setProperty('--color-primary', primaryColor);
      document.documentElement.style.setProperty('--color-primary-hover', hoverColor);
      document.documentElement.style.setProperty('--settings-lime', primaryColor);
      document.documentElement.style.setProperty('--settings-lime-dark', hoverColor);
      localStorage.setItem('financial_twin_accent', accentKey);
    } catch {
      // Ignore localStorage errors if restricted
    }
  }, [isDarkMode, accentKey]);

  useEffect(() => {
    if (mainWrapperRef.current) {
      mainWrapperRef.current.scrollTo(0, 0);
    }
  }, [activeTab]);

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
          <LandingContent
            onNavigateToAI={() => setActiveTab('strategi')}
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
            onUpdateUser={(updated) => setCurrentUser((prev) => ({ ...prev, ...updated }))}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <LandingContent
            onNavigateToAI={() => setActiveTab('strategi')}
          />
        );
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
      <div className="app-main-wrapper" ref={mainWrapperRef}>
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

