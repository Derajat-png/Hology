import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import NewSimulationModal from './components/NewSimulationModal';
import DashboardView from './components/views/DashboardView';
import SimulationView from './components/views/SimulationView';
import PortfolioView from './components/views/PortfolioView';
import StrategyView from './components/views/StrategyView';
import SettingsView from './components/views/SettingsView';
import { MenuIcon, PlusIcon } from './components/Icons';

function App() {
  const [activeTab, setActiveTab] = useState('dasbor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        return <SettingsView />;
      default:
        return (
          <DashboardView
            onNewSimulation={handleOpenSimulationModal}
            onNavigate={(tab) => setActiveTab(tab)}
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
