import { useState, useRef, useEffect } from 'react';
import './StrategyView.css';
import {
  SparklesIcon,
  SendIcon,
} from '../Icons';

export default function StrategyView() {
  // Chat State
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text:
        'Halo Budi! Saya Asisten Strategi Finansial AI Anda. Saya siap membantu menganalisis alokasi surplus, simulasi slip gaji, kecocokan aset portofolio, dan strategi roadmap keuangan Anda.\n\nAda keputusan finansial atau skenario investasi yang ingin Anda diskusikan hari ini?',
      time: 'Baru saja',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollAreaRef = useRef(null);

  // Auto scroll chat to bottom only within the chat box, preventing page jump
  useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTop = chatScrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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

    if (promptLower.includes('darurat') || promptLower.includes('keamanan') || promptLower.includes('siaga')) {
      return (
        'Analisis Kesiapan **Dana Darurat Siaga** Anda:\n\n' +
        '• Target Kebutuhan: **Rp 120.000.000** (Setara 9 bulan pengeluaran rutin)\n' +
        '• Status Terkini: **100% Tercapai (Aman)**\n' +
        '• Penempatan Instrumen: 60% Reksa Dana Pasar Uang + 40% Deposito Likuid.\n\n' +
        '**Saran AI**: Dana darurat Anda sudah berada di zona aman maksimal. Seluruh kelebihan surplus kas bulanan berikutnya dapat 100% dialokasikan ke instrumen produktif (saham & SBN) untuk mempercepat pencapaian target FIRE.'
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
          KONSULTASI AI (2-Column Suite: Panel Konsultasi Langsung & Panel Chat)
          ========================================================================= */}
      <div className="strategy-ai-layout">
        {/* KOLOM KIRI: Panel Konsultasi Langsung (320px) */}
        <div className="strategy-context-column">
          <div className="context-card card-white">
            <div className="context-header-box">
              <span className="context-card-label">KONSULTASI STRATEGIS</span>
              <span className="context-card-hint">Klik pertanyaan untuk dijawab langsung:</span>
            </div>

            <div className="context-consult-list">
              {/* 1. Alokasi Surplus */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Bagaimana cara mengalokasikan surplus bulanan Rp 1.850.000 secara optimal ke saham dan SBN?')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-green">Arus Kas</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Bagaimana cara alokasi surplus bulanan Rp 1,85 Jt?
                </div>
              </button>

              {/* 2. Dividen vs SBN */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Bagusnya surplus dialokasikan ke SBN ORI024 atau tambah porsi saham BBCA & BBRI?')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-purple">Pasif Income</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Lebih baik dividen saham atau kupon obligasi SBN?
                </div>
              </button>

              {/* 3. Target FIRE */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Kapan target FIRE 2035 saya bisa tercapai lebih cepat jika investasi ditambah?')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-blue">Target FIRE</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Kapan target FIRE 2035 bisa dicapai lebih cepat?
                </div>
              </button>

              {/* 4. Rebalancing Portofolio */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Periksa apakah alokasi portofolio saham, SBN, dan kas saya perlu rebalancing bulan ini?')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-amber">Portofolio</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Apakah portofolio aset saya perlu rebalancing?
                </div>
              </button>

              {/* 5. Dana Darurat */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Berapa alokasi dana darurat yang ideal untuk kondisi keuangan saya saat ini?')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-teal">Proteksi</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Berapa alokasi dana darurat yang ideal saat ini?
                </div>
              </button>
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
          <div className="chat-messages-scroll-area" ref={chatScrollAreaRef}>
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
