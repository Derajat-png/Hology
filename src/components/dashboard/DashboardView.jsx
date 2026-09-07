import './DashboardView.css';

export default function DashboardView({ onNavigate }) {
  return (
    <div className="view-page">
      {/* Top Welcome Bar */}
      <div className="view-header">
        <div>
          <h1 className="view-title">Dasbor Keuangan</h1>
          <p className="view-subtitle">
            Ringkasan keuangan dan rencana tabungan masa depanmu.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="dashboard-metrics-grid">
        <div className="dashboard-metric-card dashboard-metric-highlight">
          <div className="dashboard-metric-header">
            <span className="dashboard-metric-title">Sisa Uang Bersih Bulanan</span>
            <span className="dashboard-badge-lime">+11.9% dari Gaji</span>
          </div>
          <div className="dashboard-metric-value">Rp 1.850.000</div>
          <div className="dashboard-metric-footer">
            <span className="dashboard-metric-subtext">Gaji Bersih Diterima: Rp 15.550.000/bln</span>
          </div>
        </div>

        <div className="dashboard-metric-card">
          <div className="dashboard-metric-header">
            <span className="dashboard-metric-title">Kesiapan Dana Darurat</span>
            <span className="dashboard-badge-green">100% Aman</span>
          </div>
          <div className="dashboard-metric-value">Rp 120.000.000</div>
          <div className="dashboard-metric-footer">
            <span className="dashboard-metric-subtext">Cukup untuk 9 bulan kebutuhan hidup</span>
          </div>
        </div>

        <div className="dashboard-metric-card">
          <div className="dashboard-metric-header">
            <span className="dashboard-metric-title">Target Beli Mobil Impian</span>
            <span className="dashboard-badge-neutral">Sedang Berjalan</span>
          </div>
          <div className="dashboard-metric-value">Rp 250.000.000</div>
          <div className="dashboard-progress-bar">
            <div className="dashboard-progress-fill" style={{ width: '16.8%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Financial Twin AI Recommendation */}
        <div className="content-card dashboard-ai-card">
          <div className="dashboard-ai-header">
            <div className="dashboard-badge-ai">Saran Asisten AI</div>
            <span className="dashboard-ai-timestamp">Aktif</span>
          </div>
          <h3 className="dashboard-ai-title">Saran Pembagian Sisa Uang Bulan Ini</h3>
          <p className="dashboard-ai-desc">
            Dari sisa uang Rp 1.850.000 bulan ini, kamu bisa bagi 60% (Rp 1.110.000) untuk tabungan jangka panjang dan 40% (Rp 740.000) untuk investasi aman seperti obligasi negara.
          </p>
          <div className="ai-actions">
            <button className="btn-dashboard-ai-action" onClick={() => onNavigate('strategi')}>
              Tanya Lebih Lanjut ke AI →
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
                <div className="dashboard-quick-title">Kalkulator Gaji & Pengeluaran</div>
                <div className="dashboard-quick-desc">Hitung gaji bersih, cicilan, dan tabungan impianmu</div>
              </div>
            </div>
            <div className="dashboard-quick-item" onClick={() => onNavigate('portofolio')}>
              <div className="dashboard-quick-icon">⚖️</div>
              <div>
                <div className="dashboard-quick-title">Cek Kecocokan Investasi</div>
                <div className="dashboard-quick-desc">Cek apakah jenis investasimu sudah pas dengan tujuanmu</div>
              </div>
            </div>
            <div className="dashboard-quick-item" onClick={() => onNavigate('strategi')}>
              <div className="dashboard-quick-icon">🎯</div>
              <div>
                <div className="dashboard-quick-title">Tanya Asisten AI</div>
                <div className="dashboard-quick-desc">Ngobrol dan minta saran keuangan yang tepat untukmu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
