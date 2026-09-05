import React from 'react';
import './DashboardView.css';

export default function DashboardView({ onNavigate }) {
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
      </div>

      {/* Metric Cards Grid */}
      <div className="dashboard-metrics-grid">
        <div className="dashboard-metric-card dashboard-metric-highlight">
          <div className="dashboard-metric-header">
            <span className="dashboard-metric-title">Total Net Worth Digital</span>
            <span className="dashboard-badge-lime">+14.2% YoY</span>
          </div>
          <div className="dashboard-metric-value">Rp 842.500.000</div>
          <div className="dashboard-metric-footer">
            <span className="dashboard-metric-subtext">Sinkronisasi terakhir: Hari ini, 09:15 WIB</span>
          </div>
        </div>

        <div className="dashboard-metric-card">
          <div className="dashboard-metric-header">
            <span className="dashboard-metric-title">Skor Kesehatan Finansial</span>
            <span className="dashboard-badge-green">Sangat Baik</span>
          </div>
          <div className="dashboard-metric-value">88<span className="dashboard-metric-unit">/100</span></div>
          <div className="dashboard-metric-footer">
            <span className="dashboard-metric-subtext">Cash flow positif & dana darurat aman 9 bulan</span>
          </div>
        </div>

        <div className="dashboard-metric-card">
          <div className="dashboard-metric-header">
            <span className="dashboard-metric-title">Pencapaian Target FIRE 2035</span>
            <span className="dashboard-badge-neutral">On Track</span>
          </div>
          <div className="dashboard-metric-value">42.8%</div>
          <div className="dashboard-progress-bar">
            <div className="dashboard-progress-fill" style={{ width: '42.8%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Financial Twin AI Recommendation */}
        <div className="content-card dashboard-ai-card">
          <div className="dashboard-ai-header">
            <div className="dashboard-badge-ai">AI Twin Intelligence</div>
            <span className="dashboard-ai-timestamp">Model Gemini 2.5 Active</span>
          </div>
          <h3 className="dashboard-ai-title">Rekomendasi Optimasi Portofolio Bulan Ini</h3>
          <p className="dashboard-ai-desc">
            Berdasarkan simulasi volatilitas pasar terkini, alokasikan 15% dari dividen saham ke instrumen SBN/Obligasi Negara untuk mengunci imbal hasil sebelum penurunan suku bunga acuan.
          </p>
          <div className="ai-actions">
            <button className="btn-dashboard-ai-action" onClick={() => onNavigate('simulasi')}>
              Uji di Kalkulator Simulasi →
            </button>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="content-card">
          <h3 className="card-title">Akses Cepat Fitur</h3>
          <div className="dashboard-quick-list">
            <div className="dashboard-quick-item" onClick={() => onNavigate('simulasi')}>
              <div className="dashboard-quick-icon">📊</div>
              <div>
                <div className="dashboard-quick-title">Kalkulator Finansial</div>
                <div className="dashboard-quick-desc">Hitung compound interest & skenario inflasi</div>
              </div>
            </div>
            <div className="dashboard-quick-item" onClick={() => onNavigate('portofolio')}>
              <div className="dashboard-quick-icon">💼</div>
              <div>
                <div className="dashboard-quick-title">Alokasi Portofolio</div>
                <div className="dashboard-quick-desc">Cek diversifikasi aset & rebalancing otomatis</div>
              </div>
            </div>
            <div className="dashboard-quick-item" onClick={() => onNavigate('strategi')}>
              <div className="dashboard-quick-icon">🎯</div>
              <div>
                <div className="dashboard-quick-title">Roadmap Strategi Finansial</div>
                <div className="dashboard-quick-desc">Pantau milestone dana pensiun & proteksi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
