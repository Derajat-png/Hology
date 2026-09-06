import { useState, useRef, useEffect } from 'react';
import './StrategyView.css';
import {
  SparklesIcon,
  SendIcon,
} from '../Icons';

export default function StrategyView() {
  // State daftar goal strategi finansial
  const [goals] = useState([
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

  // Auto scroll chat to bottom
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Prompt templates yang bisa diklik cepat
  const suggestedPrompts = [
    'Alokasikan surplus dana bulan ini',
    'Evaluasi porsi dividen vs SBN',
    'Kapan target FIRE 2035 bisa tercapai?',
    'Strategi rebalancing portofolio saham',
  ];

  // AI Response Generator
  const generateAIResponse = (userPrompt) => {
    const promptLower = userPrompt.toLowerCase();

    if (promptLower.includes('surplus') || promptLower.includes('sisa') || promptLower.includes('alokasi')) {
      return (
        'Berdasarkan profil roadmap Anda:\n\n' +
        '1. **Dana Darurat Anda sudah 100% aman (Rp 120 Juta)** — tidak perlu penambahan porsi.\n' +
        '2. **Rekomendasi Alokasi Surplus Bulanan (Rp 2.500.000)**:\n' +
        '   - **60% (Rp 1.500.000)** dialirkan ke **Strategi FIRE 2035** via ETF / Index Fund IDX30.\n' +
        '   - **40% (Rp 1.000.000)** disalurkan ke **Dana Pendidikan Lanjutan** pada Sukuk Ritel (SBN) untuk mengunci yield tahunan 6.6%.\n\n' +
        'Langkah ini mempercepat pencapaian target FIRE Anda maju 4 bulan lebih awal.'
      );
    }

    if (promptLower.includes('fire') || promptLower.includes('pensiun') || promptLower.includes('2035')) {
      return (
        'Analisis Progres **Strategi FIRE 2035** Anda:\n\n' +
        '• Target Dana: **Rp 3.500.000.000**\n' +
        '• Progres Terkini: **68%** (Terkumpul ~Rp 2,38 Miliar)\n' +
        '• Sisa Waktu Proyeksi: **9 Tahun**\n\n' +
        'Dengan mempertahankan kontribusi investasi rutin sebesar Rp 8.500.000/bulan pada estimasi return moderat 11% p.a., modalitas Financial Twin memproyeksikan target FIRE Anda tercapai pada **Kuartal III 2034** (1 tahun lebih cepat dari jadwal).'
      );
    }

    if (promptLower.includes('dividen') || promptLower.includes('sbn') || promptLower.includes('obligasi')) {
      return (
        'Perbandingan Dividen Saham vs SBN untuk Portofolio Anda:\n\n' +
        '• **SBN / Obligasi Negara**: Memberikan kepastian kupon bulanan (yield net ~5.94% setelah pajak 10%), sangat ideal sebagai fondasi pasif income rendah risiko.\n' +
        '• **Dividen Saham Bluechip**: Potensi dividend yield 4.5% - 7% ditambah potensi pertumbuhan nilai aset (capital gain) jangka panjang.\n\n' +
        '**Saran AI**: Terapkan metode *Dividend Re-investment* (DRIP) penuh pada saham growth, dan tampung kupon SBN sebagai kas siaga likuid.'
      );
    }

    if (promptLower.includes('rebalancing') || promptLower.includes('portofolio') || promptLower.includes('saham')) {
      return (
        'Pemeriksaan Bobot Aset Finansial Twin:\n\n' +
        '• Alokasi Saham saat ini: **52%** (Batas target: 50% ±5%)\n' +
        '• Alokasi SBN & Sukuk: **28%** (Batas target: 30%)\n' +
        '• Kas Siaga Likuid: **20%** (Batas target: 20%)\n\n' +
        'Deviasi masih dalam batas toleransi wajar (hanya pergeseran +2% pada saham). Belum diperlukan rebalancing agresif bulan ini.'
      );
    }

    return (
      'Terima kasih atas pertanyaannya. Model Financial Twin Anda mencatat portofolio saat ini memiliki performa stabil dengan tingkat kepatuhan roadmap 71%.\n\n' +
      'Untuk memaksimalkan strategi ini, pertimbangkan untuk menjaga konsistensi Dollar-Cost Averaging (DCA) dan memanfaatkan kalkulator simulasi sebelum mengeksekusi komitmen pengeluaran besar.'
    );
  };

  const msgCounterRef = useRef(1);

  // Kirim Pesan Chat
  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text || !text.trim()) return;

    msgCounterRef.current += 1;
    const currentCount = msgCounterRef.current;

    const userMsg = {
      id: `user-${currentCount}`,
      sender: 'user',
      text: text.trim(),
      time: 'Baru saja',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAIResponse(userMsg.text);
      msgCounterRef.current += 1;
      const aiMsg = {
        id: `ai-${msgCounterRef.current}`,
        sender: 'ai',
        text: reply,
        time: 'Baru saja',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Rata-rata pencapaian
  const averageProgress = Math.round(
    goals.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (goals.length || 1)
  );

  return (
    <div className="strategy-page">
      {/* Header Utama */}
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
        </div>
      </div>

      {/* =========================================================================
          KONSULTASI AI (2-Column Suite: Panel Konteks & Panel Chat)
          ========================================================================= */}
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

          {/* Card 2: Topik Cepat yang Disarankan */}
          <div className="context-card card-white">
            <span className="context-card-label">TOPIK CEPAT DISARANKAN</span>
            <div className="context-prompts-list">
              {suggestedPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="btn-context-prompt"
                  onClick={() => handleSendMessage(promptText)}
                >
                  <SparklesIcon size={14} />
                  <span>{promptText}</span>
                </button>
              ))}
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
    </div>
  );
}
