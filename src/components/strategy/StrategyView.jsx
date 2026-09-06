import { useState, useRef, useEffect } from 'react';
import './StrategyView.css';
import {
  StrategyIcon,
  SparklesIcon,
  SendIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
} from '../Icons';

export default function StrategyView() {
  // Subtab switch: 'konsultasi' (default) atau 'roadmap'
  const [activeSubTab, setActiveSubTab] = useState('konsultasi');

  // State daftar goal strategi finansial
  const [goals, setGoals] = useState([
    {
      id: '1',
      title: 'Strategi FIRE 2035',
      desc: 'Alokasi 40% income bulanan ke instrumen pasar modal dengan strategi DCA berkala.',
      targetAmount: 3500000000,
      targetYear: 2035,
      progress: 68,
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'Dana Darurat Siaga',
      desc: 'Tersimpan aman pada instrumen Reksa Dana Pasar Uang & Deposito Likuid (9 Bulan Pengeluaran).',
      targetAmount: 120000000,
      targetYear: 2026,
      progress: 100,
      createdAt: '2024-02-15',
    },
    {
      id: '3',
      title: 'Dana Pendidikan Lanjutan',
      desc: 'Dikelola secara konservatif dengan instrumen Obligasi Negara Syariah (Sukuk) dan tabungan berjangka.',
      targetAmount: 250000000,
      targetYear: 2028,
      progress: 45,
      createdAt: '2024-03-01',
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    targetAmount: '',
    targetYear: new Date().getFullYear() + 5,
    progress: 0,
  });

  // Editing state
  const [editingId, setEditingId] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text:
        'Halo Budi! Saya Asisten Strategi Finansial AI Anda. Saya telah membaca seluruh konteks roadmap Anda: **Strategi FIRE 2035 (68%)**, **Dana Darurat Siaga (100%)**, dan **Dana Pendidikan (45%)** dengan rata-rata pencapaian **71%**.\n\nAda keputusan menabung, alokasi arus kas, atau strategi investasi yang ingin Anda diskusikan hari ini?',
      time: 'Baru saja',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesEndRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper formatting Rupiah
  const formatRupiah = (num) => {
    if (isNaN(num) || num === null || num === undefined) return '0';
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Auto scroll chat to bottom
  useEffect(() => {
    if (activeSubTab === 'konsultasi') {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeSubTab]);

  // Handle Form Change
  const handleInputChange = (field, value) => {
    if (field === 'targetAmount') {
      const cleanNumber = value.replace(/\D/g, '');
      const numValue = cleanNumber === '' ? '' : parseInt(cleanNumber, 10);
      setFormData((prev) => ({ ...prev, targetAmount: numValue }));
      return;
    }
    if (field === 'progress' || field === 'targetYear') {
      const num = parseInt(value, 10);
      setFormData((prev) => ({
        ...prev,
        [field]: isNaN(num) ? 0 : num,
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Submit Form (Tambah / Update Goal)
  const handleSubmitGoal = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast('Mohon masukkan nama goal strategi!');
      return;
    }

    const targetNominal = typeof formData.targetAmount === 'number' ? formData.targetAmount : 0;
    if (targetNominal <= 0) {
      showToast('Target nominal harus lebih dari 0!');
      return;
    }

    const validProgress = Math.min(100, Math.max(0, formData.progress || 0));
    const validYear = formData.targetYear || new Date().getFullYear() + 1;

    if (editingId) {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === editingId
            ? {
                ...g,
                title: formData.title.trim(),
                desc: formData.desc.trim(),
                targetAmount: targetNominal,
                targetYear: validYear,
                progress: validProgress,
              }
            : g
        )
      );
      showToast(`Goal "${formData.title}" berhasil diperbarui!`);
      setEditingId(null);
    } else {
      const newGoal = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        desc: formData.desc.trim(),
        targetAmount: targetNominal,
        targetYear: validYear,
        progress: validProgress,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setGoals((prev) => [newGoal, ...prev]);
      showToast(`Goal "${newGoal.title}" berhasil ditambahkan ke roadmap!`);
    }

    setFormData({
      title: '',
      desc: '',
      targetAmount: '',
      targetYear: new Date().getFullYear() + 5,
      progress: 0,
    });
  };

  const handleStartEdit = (goal) => {
    setEditingId(goal.id);
    setFormData({
      title: goal.title,
      desc: goal.desc,
      targetAmount: goal.targetAmount,
      targetYear: goal.targetYear,
      progress: goal.progress,
    });
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      desc: '',
      targetAmount: '',
      targetYear: new Date().getFullYear() + 5,
      progress: 0,
    });
  };

  const handleDeleteGoal = (id, title) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
    showToast(`Goal "${title}" telah dihapus dari roadmap.`);
  };

  // AI Response Engine (Personal, Contextual & Math-Accurate)
  const generateAIResponse = (userPrompt) => {
    const q = userPrompt.toLowerCase();
    const fireGoal = goals.find((g) => g.title.toLowerCase().includes('fire')) || goals[0];
    const emergencyGoal = goals.find((g) => g.title.toLowerCase().includes('darurat')) || goals[1];
    const avgProgress =
      goals.length > 0
        ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
        : 71;

    if (q.includes('fire') || q.includes('pensiun') || q.includes('evaluasi progres fire')) {
      return (
        `Berdasarkan data roadmap Anda, progres **${fireGoal?.title || 'Strategi FIRE 2035'}** saat ini mencapai **${fireGoal?.progress || 68}%** menuju target total **Rp ${formatRupiah(fireGoal?.targetAmount || 3500000000)}**.\n\n` +
        `📌 **Evaluasi Strategis:**\n` +
        `1. **Disiplin Arus Kas:** Alokasi rutin bulanan Anda sudah berada di jalur yang sangat baik (*trajectory on-track*).\n` +
        `2. **Laju Pertumbuhan Portofolio:** Dengan estimasi CAGR 9–11% p.a. pada instrumen indeks saham & SBN, akumulasi Anda diproyeksikan mencukupi kebutuhan *passive income* sebelum akhir tahun ${fireGoal?.targetYear || 2035}.\n` +
        `3. **Langkah Optimasi:** Anda dapat melakukan reinvestasi dividen secara berkala (*DRIP strategy*) untuk melipatgandakan efek *compound interest*.\n\n` +
        `*Catatan: Bukan nasihat keuangan resmi — selalu pertimbangkan konsultasi dengan penasihat berlisensi untuk keputusan besar.*`
      );
    }

    if (q.includes('darurat') || q.includes('alokasikan dana darurat') || q.includes('berlebih')) {
      return (
        `Melihat roadmap Anda, **${emergencyGoal?.title || 'Dana Darurat Siaga'}** telah tercapai penuh **100% (Rp ${formatRupiah(emergencyGoal?.targetAmount || 120000000)})** yang mencakup 9 bulan kebutuhan operasional.\n\n` +
        `💡 **Rekomendasi Alokasi Dana Darurat Berlebih:**\n` +
        `1. **Hentikan Tambahan ke Dana Darurat:** Porsi Rp ${formatRupiah(emergencyGoal?.targetAmount || 120000000)} sudah sangat aman & likuid pada RDPU / Deposito Harian.\n` +
        `2. **Alihkan 100% Arus Kas Bulanan:** Alihkan anggaran tabungan darurat bulanan Anda sebelumnya langsung ke **Strategi FIRE** atau **Dana Pendidikan** untuk mempercepat target hingga 2,4x lebih cepat.\n` +
        `3. **Proteksi:** Pastikan proteksi asuransi kesehatan mandiri Anda aktif agar aset produktif tidak terganggu jika terjadi risiko mendadak.\n\n` +
        `*Catatan: Bukan nasihat keuangan resmi — selalu pertimbangkan konsultasi dengan penasihat berlisensi untuk keputusan besar.*`
      );
    }

    if (q.includes('dca') || q.includes('lump sum') || q.includes('lumpsum')) {
      return (
        `Perbandingan metode investasi untuk mendukung roadmap keuangan Anda:\n\n` +
        `⚖️ **Dollar-Cost Averaging (DCA):**\n` +
        `• **Karakter:** Membeli secara berkala tanpa memusingkan *timing* pasar, meredam risiko volatilitas psikologis.\n` +
        `• **Rekomendasi:** Sangat ideal untuk alokasi gaji bulanan Anda ke instrumen pasar modal / Indeks Saham.\n\n` +
        `💰 **Lump Sum:**\n` +
        `• **Karakter:** Menginvestasikan dana dalam satu kali transaksi besar agar dana bekerja maksimal (*time-in-the-market*).\n` +
        `• **Rekomendasi:** Tepat diaplikasikan saat menerima dana cair besar (seperti bonus tahunan/THR) ke instrumen berisiko moderat seperti Sukuk Ritel / SBN.\n\n` +
        `*Catatan: Bukan nasihat keuangan resmi — selalu pertimbangkan konsultasi dengan penasihat berlisensi untuk keputusan besar.*`
      );
    }

    // Default contextual answer
    return (
      `Terima kasih atas pertanyaannya. Berdasarkan analisis Financial Twin terhadap seluruh roadmap Anda (Rata-rata pencapaian **${avgProgress}%**):\n\n` +
      `📊 **Kondisi Finansial Anda:**\n` +
      `• Struktur finansial Anda sangat kuat dengan dana darurat penuh dan disiplin alokasi bulanan yang solid.\n` +
      `• Untuk pertanyaan "${userPrompt}", strategi yang direkomendasikan adalah menjaga konsistensi rencana aksi dan mendiversifikasikan portofolio sesuai horizon waktu tiap sasaran.\n\n` +
      `Apakah ada simulasi nominal atau penyesuaian tahun target yang ingin kita uji bersama?\n\n` +
      `*Catatan: Bukan nasihat keuangan resmi — selalu pertimbangkan konsultasi dengan penasihat berlisensi untuk keputusan besar.*`
    );
  };

  // Handle Send Message
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const responseText = generateAIResponse(query);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 750);
  };

  // Handle Key Down in Textarea (Enter to Send, Shift+Enter for new line)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Ringkasan metrik
  const totalGoalsCount = goals.length;
  const completedGoalsCount = goals.filter((g) => g.progress >= 100).length;
  const totalTargetFunds = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const averageProgress =
    totalGoalsCount > 0
      ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / totalGoalsCount)
      : 0;

  return (
    <div className="strategy-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="strategy-toast">
          <CheckCircleIcon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Halaman Utama */}
      <div className="strategy-header">
        <div className="strategy-header-top-row">
          <div>
            <div className="strategy-badge-pill">
              <span className="badge-dot"></span>
              <span>AI FINANCIAL STRATEGY SUITE</span>
            </div>
            <h1 className="strategy-main-title">Strategi & Konsultasi AI</h1>
            <p className="strategy-main-subtitle">
              Diskusikan keputusan menabung dan berinvestasi dengan AI yang memahami seluruh roadmap keuangan Anda.
            </p>
          </div>

          {/* Subtab Toggle Buttons */}
          <div className="strategy-subtab-switcher">
            <button
              type="button"
              className={`strategy-subtab-btn ${activeSubTab === 'konsultasi' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('konsultasi')}
            >
              <SparklesIcon size={16} />
              <span>Konsultasi AI</span>
            </button>
            <button
              type="button"
              className={`strategy-subtab-btn ${activeSubTab === 'roadmap' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('roadmap')}
            >
              <StrategyIcon size={16} />
              <span>Roadmap Sasaran ({goals.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: KONSULTASI AI (2-Column Suite: Panel Konteks & Panel Chat)
          ========================================================================= */}
      {activeSubTab === 'konsultasi' ? (
        <div className="strategy-ai-layout">
          {/* KOLOM KIRI: Panel Konteks (290px) */}
          <div className="strategy-context-column">
            {/* Card 1: Konteks Roadmap Anda */}
            <div className="context-card card-white">
              <span className="context-card-label">KONTEKS ROADMAP ANDA</span>
              <div className="context-goals-list">
                {goals.map((goal) => (
                  <div key={goal.id} className="context-goal-row">
                    <span className="context-goal-title">{goal.title}</span>
                    <span className="context-goal-percent">{goal.progress}%</span>
                  </div>
                ))}
                <div className="context-goal-row context-goal-avg">
                  <span className="context-goal-title bold-title">Rata-rata pencapaian</span>
                  <span className="context-goal-percent percent-lime">{averageProgress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Panel Chat (Flex Grow) */}
          <div className="strategy-chat-panel">
            {/* Header Chat */}
            <div className="chat-panel-header">
              <div className="chat-ai-icon-box">
                <SparklesIcon size={18} />
              </div>
              <div>
                <h3 className="chat-panel-title">Asisten Strategi Finansial</h3>
                <p className="chat-panel-subtitle">Terhubung dengan data roadmap Anda</p>
              </div>
            </div>

            {/* Area Pesan Chat */}
            <div className="chat-messages-scroll-area">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble-row ${msg.sender === 'user' ? 'bubble-row-user' : 'bubble-row-ai'}`}
                >
                  <div className={`chat-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
                    <div className="bubble-text-content">
                      {msg.text.split('\n').map((line, idx) => (
                        <p key={idx} className="bubble-paragraph">
                          {line}
                        </p>
                      ))}
                    </div>
                    <span className="bubble-timestamp">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-typing-indicator">
                  <em>Sedang menyusun jawaban...</em>
                </div>
              )}
              <div ref={chatMessagesEndRef} />
            </div>

            {/* Composer Input & Disclaimer */}
            <div className="chat-composer-area">
              <div className="composer-input-row">
                <textarea
                  className="composer-textarea"
                  rows="2"
                  placeholder="Tanyakan strategi menabung atau investasi Anda..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Ketik pesan strategi finansial"
                />
                <button
                  type="button"
                  className="btn-chat-send"
                  onClick={() => handleSendMessage()}
                  title="Kirim pesan (Enter)"
                  aria-label="Kirim Pesan"
                >
                  <SendIcon size={18} />
                </button>
              </div>
              <p className="chat-disclaimer-text">
                Bukan nasihat keuangan resmi — selalu pertimbangkan konsultasi dengan penasihat berlisensi untuk keputusan besar.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
            VIEW 2: ROADMAP SASARAN & CRUD MANAGEMENT
            ========================================================================= */
        <div className="strategy-roadmap-suite">
          {/* Ringkasan Roadmap Hero Box */}
          <div className="strategy-summary-hero">
            <div className="strategy-metric-box">
              <span className="strat-stat-lbl">Total Goal Terdaftar</span>
              <div className="strat-stat-val">{totalGoalsCount} Goal</div>
              <span className="strat-stat-sub">{completedGoalsCount} Goal Telah Tercapai</span>
            </div>

            <div className="strategy-metric-box">
              <span className="strat-stat-lbl">Total Akumulasi Target</span>
              <div className="strat-stat-val">Rp {formatRupiah(totalTargetFunds)}</div>
              <span className="strat-stat-sub">Seluruh Roadmap Finansial</span>
            </div>

            <div className="strategy-metric-box">
              <span className="strat-stat-lbl">Rata-Rata Pencapaian</span>
              <div className="strat-stat-val val-lime">{averageProgress}%</div>
              <span className="strat-stat-sub">Tingkat Kemajuan Roadmap</span>
            </div>
          </div>

          {/* Layout Grid: Form (Kiri) & Daftar Goal (Kanan) */}
          <div className="strategy-grid-layout">
            {/* Kolom Kiri: Form Tambah / Edit Goal */}
            <div className="strategy-form-card">
              <div className="card-header-row">
                <div className="card-icon-circle">
                  {editingId ? <EditIcon size={18} /> : <PlusIcon size={18} />}
                </div>
                <div>
                  <h3 className="card-title-text">
                    {editingId ? 'Edit Goal Finansial' : 'Tambah Goal Baru'}
                  </h3>
                  <p className="card-subtitle-text">
                    {editingId
                      ? 'Perbarui target, deadline tahun, atau catatan strategi'
                      : 'Rencanakan tujuan keuangan baru ke dalam roadmap'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitGoal} className="goal-input-form">
                {/* Field 1: Nama Goal */}
                <div className="form-group-item">
                  <label htmlFor="input-goal-title" className="form-label-custom">
                    Nama Goal / Rencana
                  </label>
                  <input
                    id="input-goal-title"
                    type="text"
                    className="form-input-custom"
                    placeholder="Contoh: Investasi Saham Perbankan / Beli Rumah 2030"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                {/* Field 2: Deskripsi Strategi */}
                <div className="form-group-item">
                  <label htmlFor="input-goal-desc" className="form-label-custom">
                    Deskripsi Strategi & Rencana Aksi
                  </label>
                  <textarea
                    id="input-goal-desc"
                    className="form-textarea-custom"
                    rows="3"
                    placeholder="Contoh: Rutin beli saham BMRI tiap bulan sebagai bagian dari portofolio saham bluechip..."
                    value={formData.desc}
                    onChange={(e) => handleInputChange('desc', e.target.value)}
                  />
                  <span className="input-hint-text">Catatan bebas strategi yang akan Anda jalankan</span>
                </div>

                {/* Grid 2: Target Nominal & Target Tahun */}
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label htmlFor="input-target-amount" className="form-label-custom">
                      Target Nominal (Rp)
                    </label>
                    <div className="input-currency-wrapper">
                      <span className="currency-tag">Rp</span>
                      <input
                        id="input-target-amount"
                        type="text"
                        className="form-input-custom input-with-prefix"
                        placeholder="0"
                        value={formData.targetAmount ? formatRupiah(formData.targetAmount) : ''}
                        onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-item">
                    <label htmlFor="input-target-year" className="form-label-custom">
                      Target Tahun Selesai
                    </label>
                    <input
                      id="input-target-year"
                      type="number"
                      min={new Date().getFullYear()}
                      max={2070}
                      className="form-input-custom"
                      placeholder="Contoh: 2030"
                      value={formData.targetYear}
                      onChange={(e) => handleInputChange('targetYear', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Field 4: Pencapaian Saat Ini (Slider & Input) */}
                <div className="form-group-item">
                  <div className="slider-label-row">
                    <label htmlFor="input-progress-slider" className="form-label-custom">
                      Pencapaian Saat Ini:
                    </label>
                    <div className="slider-value-badge">{formData.progress}%</div>
                  </div>
                  <input
                    id="input-progress-slider"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    className="form-slider-custom"
                    value={formData.progress}
                    onChange={(e) => handleInputChange('progress', e.target.value)}
                  />
                  <div className="slider-ticks-row">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Tombol Action */}
                <div className="form-buttons-row">
                  {editingId && (
                    <button
                      type="button"
                      className="btn-cancel-edit"
                      onClick={handleCancelEdit}
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn-submit-goal"
                    id="btn-submit-goal"
                  >
                    {editingId ? (
                      <>
                        <CheckCircleIcon size={18} />
                        <span>Simpan Perubahan</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon size={18} />
                        <span>Tambahkan ke Roadmap</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Kolom Kanan: Daftar Goal Card */}
            <div className="strategy-list-section">
              <div className="list-top-header">
                <h3 className="section-title">
                  Daftar Roadmap Goal ({goals.length} Sasaran)
                </h3>
              </div>

              {goals.length === 0 ? (
                <div className="empty-goals-card">
                  <StrategyIcon size={36} className="empty-icon" />
                  <h4>Belum Ada Goal Terdaftar</h4>
                  <p>Mulai tambahkan sasaran finansial dan strategi Anda melalui formulir di samping.</p>
                </div>
              ) : (
                <div className="goals-cards-container">
                  {goals.map((goal) => {
                    const isComplete = goal.progress >= 100;

                    return (
                      <div key={goal.id} className="goal-card-item">
                        {/* Card Header */}
                        <div className="goal-card-top">
                          <div className="goal-info-left">
                            <span
                              className={`goal-status-badge ${
                                isComplete ? 'badge-completed' : 'badge-in-progress'
                              }`}
                            >
                              {isComplete ? 'Tercapai 100%' : 'Dalam Progres'}
                            </span>
                            <h4 className="goal-title-text">{goal.title}</h4>
                            {goal.desc && <p className="goal-desc-text">{goal.desc}</p>}
                          </div>

                          <div className="goal-meta-box-right">
                            <span className="meta-target-label">
                              Target selesai: <strong>{goal.targetYear}</strong>
                            </span>
                            <div className="meta-target-nominal">
                              Rp {formatRupiah(goal.targetAmount)}
                            </div>
                          </div>
                        </div>

                        {/* Progress Section */}
                        <div className="goal-progress-container">
                          <div className="goal-progress-label-row">
                            <span className="progress-left-text">
                              Pencapaian: <strong>{goal.progress}%</strong>
                            </span>
                            <span className="progress-right-text">Target: 100%</span>
                          </div>

                          <div className="goal-progress-track">
                            <div
                              className={`goal-progress-fill ${
                                isComplete ? 'fill-completed' : 'fill-active'
                              }`}
                              style={{ width: `${Math.min(100, Math.max(0, goal.progress))}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="goal-card-footer">
                          <span className="goal-created-sub">
                            Terdaftar sejak: {goal.createdAt || 'Aktif'}
                          </span>

                          <div className="goal-action-buttons">
                            <button
                              type="button"
                              className="btn-goal-action btn-goal-edit"
                              title="Edit sasaran ini"
                              onClick={() => handleStartEdit(goal)}
                            >
                              <EditIcon size={15} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="btn-goal-action btn-goal-delete"
                              title="Hapus sasaran ini"
                              onClick={() => handleDeleteGoal(goal.id, goal.title)}
                            >
                              <TrashIcon size={15} />
                              <span>Hapus</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
