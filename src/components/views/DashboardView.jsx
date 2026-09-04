import React from 'react';
import './Views.css';
import { DashboardIcon, StrategyIcon, PortfolioIcon, PlusIcon } from '../Icons';

export default function DashboardView({ onNewSimulation, onNavigate }) {
  return (
    <div className="view-page">
      {/* Top Welcome Bar */}
      <div className="view-header">
        <div>
          <h1 className="view-title">Dasbor Finansial</h1>
          <p className="view-subtitle">
            Ringkasan kembaran digital (Financial Twin) & proyeksi kekayaan bersih real-time.
          </p>
        </div>
        <div className="view-header-actions">
          <button className="btn-header-primary" onClick={onNewSimulation}>
            <PlusIcon size={16} />
            <span>Simulasi Baru</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="metrics-grid">
        <div className="metric-card card-primary-highlight">
          <div className="metric-header">
            <span className="metric-title">Total Net Worth Digital</span>
            <span className="metric-badge-lime">+14.2% YoY</span>
          </div>
          <div className="metric-value">Rp 842.500.000</div>
          <div className="metric-footer">
            <span className="metric-subtext">Sinkronisasi terakhir: Hari ini, 09:15 WIB</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Skor Kesehatan Finansial</span>
            <span className="metric-badge-green">Sangat Baik</span>
          </div>
          <div className="metric-value">88<span className="metric-unit">/100</span></div>
          <div className="metric-footer">
            <span className="metric-subtext">Cash flow positif & dana darurat aman 9 bulan</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Pencapaian Target FIRE 2035</span>
            <span className="metric-badge-neutral">On Track</span>
          </div>
          <div className="metric-value">42.8%</div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '42.8%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid-layout">
        {/* Financial Twin AI Recommendation */}
        <div className="content-card ai-insight-card">
          <div className="card-header-flex">
            <div className="badge-ai-twin">AI Twin Intelligence</div>
            <span className="card-timestamp">Model Gemini 2.5 Active</span>
          </div>
          <h3 className="ai-insight-title">Rekomendasi Optimasi Portofolio Bulan Ini</h3>
          <p className="ai-insight-desc">
            Berdasarkan simulasi volatilitas pasar terkini, alokasikan 15% dari dividen saham ke instrumen SBN/Obligasi Negara untuk mengunci imbal hasil sebelum penurunan suku bunga acuan.
          </p>
          <div className="ai-actions">
            <button className="btn-ai-action" onClick={() => onNavigate('simulasi')}>
              Uji di Kalkulator Simulasi →
            </button>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="content-card">
          <h3 className="card-title">Akses Cepat Fitur</h3>
          <div className="quick-access-list">
            <div className="quick-item" onClick={() => onNavigate('simulasi')}>
              <div className="quick-icon">📊</div>
              <div>
                <div className="quick-title">Kalkulator Simulasi Finansial</div>
                <div className="quick-desc">Hitung compound interest & skenario inflasi</div>
              </div>
            </div>
            <div className="quick-item" onClick={() => onNavigate('portofolio')}>
              <div className="quick-icon">💼</div>
              <div>
                <div className="quick-title">Alokasi Portofolio</div>
                <div className="quick-desc">Cek diversifikasi aset & rebalancing otomatis</div>
              </div>
            </div>
            <div className="quick-item" onClick={() => onNavigate('strategi')}>
              <div className="quick-icon">🎯</div>
              <div>
                <div className="quick-title">Roadmap Strategi Finansial</div>
                <div className="quick-desc">Pantau milestone dana pensiun & proteksi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
