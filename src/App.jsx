import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import NewSimulationModal from './components/modal/NewSimulationModal';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import DashboardView from './components/dashboard/DashboardView';
import SimulationView from './components/simulation/SimulationView';
import PortfolioView from './components/portfolio/PortfolioView';
import StrategyView from './components/strategy/StrategyView';
import SettingsView from './components/settings/SettingsView';
import { MenuIcon, PlusIcon } from './components/Icons';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Budi Santoso',
    email: 'user.demo@financialtwin.id',
    role: 'Twin Platinum Member',
  });

  const [activeTab, setActiveTab] = useState('simulasi');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  const handleOpenSimulationModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseSimulationModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSimulation = (simulationData) => {
    console.log('Simulasi baru dibuat:', simulationData);
    setActiveTab('simulasi');
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
            onNewSimulation={handleOpenSimulationModal}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'simulasi':
        return (
          <SimulationView
            onNewSimulation={handleOpenSimulationModal}
          />
        );
      case 'portofolio':
        return (
          <PortfolioView
            onNewSimulation={handleOpenSimulationModal}
          />
        );
      case 'strategi':
        return (
          <StrategyView
            onNewSimulation={handleOpenSimulationModal}
          />
        );
      case 'pengaturan':
        return (
          <SettingsView
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <SimulationView
            onNewSimulation={handleOpenSimulationModal}
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
        onNewSimulation={handleOpenSimulationModal}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
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
            className="btn-mobile-action"
            onClick={handleOpenSimulationModal}
            aria-label="Simulasi Baru"
          >
            <PlusIcon size={18} />
          </button>
        </header>

        {/* Dynamic Content View */}
        <main className="app-main-content">
          {renderActiveView()}
        </main>
      </div>

      {/* New Simulation Modal */}
      <NewSimulationModal
        isOpen={isModalOpen}
        onClose={handleCloseSimulationModal}
        onSaveSimulation={handleSaveSimulation}
      />
    </div>
  );
}

export default App;
