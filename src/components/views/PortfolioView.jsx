import React from 'react';
import './Views.css';
import { PlusIcon } from '../Icons';

export default function PortfolioView({ onNewSimulation }) {
  const assets = [
    { name: 'Saham Bluechip & Index Fund', category: 'Ekuitas', value: 380000000, percent: 45, returnRate: '+16.8%', color: '#064e3b' },
    { name: 'Surat Berharga Negara (SBN/ORI)', category: 'Pendapatan Tetap', value: 210000000, percent: 25, returnRate: '+6.5%', color: '#166534' },
    { name: 'Emas Digital & Fisik', category: 'Komoditas', value: 125000000, percent: 15, returnRate: '+11.2%', color: '#eab308' },
    { name: 'Kas & Deposito Likuid', category: 'Pasar Uang', value: 85000000, percent: 10, returnRate: '+4.2%', color: '#84cc16' },
    { name: 'Aset Kripto Terpilih', category: 'Alternatif', value: 42500000, percent: 5, returnRate: '+34.5%', color: '#3b82f6' },
  ];

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const totalValue = assets.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="view-page">
      <div className="view-header">
        <div>
          <h1 className="view-title">Portofolio Aset Terintegrasi</h1>
          <p className="view-subtitle">
            Pemantauan alokasi aset digital twin dan rebalancing otomatis secara presisi.
          </p>
        </div>
        <button className="btn-header-primary" onClick={onNewSimulation}>
          <PlusIcon size={16} />
          <span>Simulasi Alokasi Baru</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="portfolio-summary-bar">
        <div>
          <span className="portfolio-summary-label">Total Nilai Portofolio Terdaftar</span>
          <h2 className="portfolio-summary-val">{formatRupiah(totalValue)}</h2>
        </div>
        <div className="portfolio-stat-pill">
          <span>Tingkat Diversifikasi:</span>
          <strong>Optimal (Skor 9.2/10)</strong>
        </div>
      </div>

      {/* Asset Allocation Table */}
      <div className="content-card">
        <h3 className="card-title">Rincian Kelas Aset</h3>
        <div className="portfolio-table-wrapper">
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Instrumen / Aset</th>
                <th>Kategori</th>
                <th>Alokasi</th>
                <th>Nilai Terkini</th>
                <th>Kinerja (1 Thn)</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td>
                    <div className="asset-name-cell">
                      <span className="asset-dot" style={{ backgroundColor: asset.color }}></span>
                      <strong>{asset.name}</strong>
                    </div>
                  </td>
                  <td><span className="category-pill">{asset.category}</span></td>
                  <td>
                    <div className="percent-cell">
                      <span>{asset.percent}%</span>
                      <div className="mini-progress">
                        <div className="mini-progress-fill" style={{ width: `${asset.percent}%`, backgroundColor: asset.color }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="value-cell">{formatRupiah(asset.value)}</td>
                  <td className="return-cell"><span className="badge-gain">{asset.returnRate}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
