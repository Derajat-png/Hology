import React from 'react';
import './Views.css';
import { PlusIcon } from '../Icons';

export default function StrategyView({ onNewSimulation }) {
  const strategies = [
    {
      title: 'Strategi FIRE (Financial Independence, Retire Early)',
      status: 'Aktif Berjalan',
      targetYear: '2035',
      targetFund: 'Rp 3.500.000.000',
      progress: 68,
      desc: 'Alokasi 40% income bulanan ke instrumen pasar modal dengan strategi DCA berkala.',
    },
    {
      title: 'Dana Darurat Siaga (9 Bulan Pengeluaran)',
      status: 'Tercapai 100%',
      targetYear: '2026',
      targetFund: 'Rp 120.000.000',
      progress: 100,
      desc: 'Tersimpan aman pada instrumen Reksa Dana Pasar Uang & Deposito Likuid.',
    },
    {
      title: 'Dana Pendidikan Lanjutan',
      status: 'Dalam Progres',
      targetYear: '2028',
      targetFund: 'Rp 250.000.000',
      progress: 45,
      desc: 'Dikelola secara konservatif dengan instrumen Obligasi Negara Syariah (Sukuk).',
    },
  ];

  return (
    <div className="view-page">
      <div className="view-header">
        <div>
          <h1 className="view-title">Strategi Finansial & Roadmap</h1>
          <p className="view-subtitle">
            Rencana aksi terstruktur berbasis model digital twin untuk mencapai tujuan jangka pendek & panjang.
          </p>
        </div>
        <button className="btn-header-primary" onClick={onNewSimulation}>
          <PlusIcon size={16} />
          <span>Tambah Strategi Baru</span>
        </button>
      </div>

      <div className="strategy-cards-list">
        {strategies.map((strat, idx) => (
          <div key={idx} className="content-card strategy-card">
            <div className="strategy-card-header">
              <div>
                <span className={`status-badge-custom ${strat.progress === 100 ? 'status-complete' : 'status-active-strat'}`}>
                  {strat.status}
                </span>
                <h3 className="strategy-title">{strat.title}</h3>
                <p className="strategy-desc">{strat.desc}</p>
              </div>
              <div className="strategy-meta-box">
                <span className="strategy-target-lbl">Target Selesai:</span>
                <strong className="strategy-target-year">{strat.targetYear}</strong>
                <span className="strategy-target-fund">{strat.targetFund}</span>
              </div>
            </div>

            <div className="strategy-progress-section">
              <div className="strategy-progress-label">
                <span>Pencapaian: {strat.progress}%</span>
                <span>Target: 100%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${strat.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
