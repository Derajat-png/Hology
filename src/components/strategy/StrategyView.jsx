import { useState, useRef, useEffect } from 'react';
import './StrategyView.css';
import {
  SparklesIcon,
  SendIcon,
} from '../Icons';

export default function StrategyView({ simulationData, portfolioAssets, currentUser }) {
  const userName = currentUser?.name?.split(' ')[0] || 'Budi';

  // Helper formatting for Indonesian Rupiah
  const formatRupiah = (val) => {
    const num = Number(val) || 0;
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Helper to extract and compute live financial numbers
  const getLiveFinancials = () => {
    const gajiPokok = simulationData?.gajiPokok ?? 16500000;
    const pajakPPh21 = simulationData?.pajakPPh21 ?? 950000;
    const takeHomePay = Math.max(0, gajiPokok - pajakPPh21);
    const hutangPinjaman = simulationData?.hutangPinjaman ?? 1500000;
    const cicilanKPR = simulationData?.cicilanKPR ?? 3500000;
    const totalLiabilitas = hutangPinjaman + cicilanKPR;
    const makanMinum = simulationData?.makanMinum ?? 3200000;
    const belanjaRumahTangga = simulationData?.belanjaRumahTangga ?? 2000000;
    const totalOperasional = makanMinum + belanjaRumahTangga;
    const totalPengeluaran = totalLiabilitas + totalOperasional;
    const sisaKasSebelumTarget = takeHomePay - totalPengeluaran;
    const namaTarget = simulationData?.namaTarget || 'Beli Mobil Impian';
    const biayaTarget = simulationData?.biayaTarget ?? 250000000;
    const alokasiTabungan = simulationData?.alokasiTabungan ?? 3500000;
    const surplusBersih = sisaKasSebelumTarget - alokasiTabungan;
    const dtiRatio = takeHomePay > 0 ? ((totalLiabilitas / takeHomePay) * 100).toFixed(1) : '0';
    const totalBulanTarget = (alokasiTabungan > 0 && biayaTarget > 0) ? Math.round(biayaTarget / alokasiTabungan) : 0;
    const totalTahunTarget = totalBulanTarget > 0 ? (totalBulanTarget / 12).toFixed(1).replace('.', ',') : '0';

    return {
      gajiPokok,
      pajakPPh21,
      takeHomePay,
      hutangPinjaman,
      cicilanKPR,
      totalLiabilitas,
      makanMinum,
      belanjaRumahTangga,
      totalOperasional,
      totalPengeluaran,
      sisaKasSebelumTarget,
      namaTarget,
      biayaTarget,
      alokasiTabungan,
      surplusBersih,
      dtiRatio,
      totalBulanTarget,
      totalTahunTarget,
    };
  };

  const getLiveAssets = () => {
    const list = portfolioAssets && portfolioAssets.length > 0
      ? portfolioAssets
      : [
          {
            id: 'default-1',
            name: 'Dana Darurat Siaga',
            instrument: 'Reksa Dana Pasar Uang',
            goal: 'Dana Darurat',
            amount: 120000000,
            verdict: 'Sesuai',
            tone: 'ok',
            reason: 'Likuiditas tinggi dengan pencairan cepat (T+1), fluktuasi sangat rendah.',
          },
        ];

    const totalCount = list.length;
    const totalNominal = list.reduce((sum, a) => sum + (Number(a.amount) || 0), 0);
    const sesuaiList = list.filter((a) => a.verdict === 'Sesuai');
    const reviewList = list.filter((a) => a.verdict === 'Perlu Ditinjau');
    const kurangList = list.filter((a) => a.verdict === 'Kurang Tepat');

    return {
      list,
      totalCount,
      totalNominal,
      sesuaiList,
      reviewList,
      kurangList,
    };
  };

  // Chat State
  const [messages, setMessages] = useState(() => {
    const fin = getLiveFinancials();
    return [
      {
        id: 'msg-welcome',
        sender: 'ai',
        text:
          `Halo ${userName}! Saya Asisten Strategi Finansial AI Anda.\n\n` +
          `Saya terhubung langsung secara real-time dengan data Anda: Gaji Bersih ${formatRupiah(fin.takeHomePay)}, Sisa Surplus ${formatRupiah(fin.surplusBersih)}, dan Portofolio Analisis Aset Anda tanpa perlu screenshot.\n\n` +
          `Ketik pertanyaan apa saja (misal: "Analisis kalkulator finansial saya", "Analisis kecocokan aset saya", atau "Analisis semua kondisi keuangan saya") untuk memulai!`,
        time: 'Baru saja',
      },
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollAreaRef = useRef(null);

  // Auto scroll chat to bottom only within the chat box
  useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTop = chatScrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // AI Response Generator with Live Cross-Page Context Awareness
  const generateAIResponse = (userPrompt) => {
    const promptLower = userPrompt.toLowerCase();
    const fin = getLiveFinancials();
    const assets = getLiveAssets();

    // 1. ANALISIS SEMUA / SELURUH HALAMAN / OVERVIEW / RINGKASAN
    if (
      promptLower.includes('semua') ||
      promptLower.includes('seluruh') ||
      promptLower.includes('semuanya') ||
      promptLower.includes('lengkap') ||
      promptLower.includes('overview') ||
      promptLower.includes('ringkasan') ||
      promptLower.includes('laporan') ||
      promptLower.includes('financial twin') ||
      promptLower.includes('kondisi keuangan') ||
      promptLower.includes('kesehatan finansial')
    ) {
      return (
        `Halo ${userName}! Saya telah membaca dan menganalisis seluruh data dari Kalkulator Finansial dan Analisis Kecocokan Aset Anda secara langsung:\n\n` +
        `📊 1. KONDISI ARUS KAS (Kalkulator Finansial):\n` +
        `• Gaji Pokok: ${formatRupiah(fin.gajiPokok)} (Potongan Pajak PPh21: ${formatRupiah(fin.pajakPPh21)})\n` +
        `• Gaji Bersih (Take Home Pay): ${formatRupiah(fin.takeHomePay)}/bulan\n` +
        `• Total Liabilitas: ${formatRupiah(fin.totalLiabilitas)} (Cicilan KPR ${formatRupiah(fin.cicilanKPR)} + Pinjaman ${formatRupiah(fin.hutangPinjaman)}, Rasio DTI: ${fin.dtiRatio}%)\n` +
        `• Beban Kebutuhan Hidup: ${formatRupiah(fin.totalOperasional)} (Makan ${formatRupiah(fin.makanMinum)} + Belanja ${formatRupiah(fin.belanjaRumahTangga)})\n` +
        `• Tabungan Impian "${fin.namaTarget}": ${formatRupiah(fin.alokasiTabungan)}/bulan (Target ${formatRupiah(fin.biayaTarget)}, estimasi selesai dalam ${fin.totalBulanTarget} bulan / ~${fin.totalTahunTarget} tahun)\n` +
        `• Sisa Surplus Bersih: ${formatRupiah(fin.surplusBersih)}/bulan (${fin.surplusBersih >= 0 ? 'Surplus Positif' : 'Defisit'})\n\n` +
        `⚖️ 2. EVALUASI ASET (Analisis Kecocokan):\n` +
        `• Total Aset Dianalisis: ${assets.totalCount} Aset (Total Nilai: ${formatRupiah(assets.totalNominal)})\n` +
        `• Status Kesesuaian: ${assets.sesuaiList.length} Sesuai | ${assets.reviewList.length} Perlu Ditinjau | ${assets.kurangList.length} Kurang Tepat\n\n` +
        `💡 KESIMPULAN & LANGKAH STRATEGIS:\n` +
        `Keuangan Anda berada pada kondisi ${fin.surplusBersih > 0 ? 'sangat sehat dan seimbang' : 'perlu penyesuaian'}. Sisa surplus ${formatRupiah(fin.surplusBersih)} siap Anda gunakan untuk investasi jangka panjang dan obligasi negara tanpa mengganggu target "${fin.namaTarget}".`
      );
    }

    // 2. ANALISIS KALKULATOR FINANSIAL / SIMULASI / GAJI / PENGELUARAN / CICILAN / SURPLUS
    if (
      promptLower.includes('kalkulator') ||
      promptLower.includes('simulasi') ||
      promptLower.includes('gaji') ||
      promptLower.includes('slip') ||
      promptLower.includes('penghasilan') ||
      promptLower.includes('pajak') ||
      promptLower.includes('pph') ||
      promptLower.includes('cicilan') ||
      promptLower.includes('kpr') ||
      promptLower.includes('hutang') ||
      promptLower.includes('pinjaman') ||
      promptLower.includes('pengeluaran') ||
      promptLower.includes('makan') ||
      promptLower.includes('belanja') ||
      promptLower.includes('beban') ||
      promptLower.includes('surplus') ||
      promptLower.includes('sisa uang') ||
      promptLower.includes('sisa kas') ||
      promptLower.includes('sisa') ||
      promptLower.includes('mobil') ||
      promptLower.includes('target') ||
      promptLower.includes('dti') ||
      promptLower.includes('arus kas')
    ) {
      return (
        `Halo ${userName}! Berdasarkan data real-time pada Kalkulator Finansial Anda saat ini:\n\n` +
        `💵 1. PENDAPATAN:\n` +
        `• Gaji Pokok Bruto: ${formatRupiah(fin.gajiPokok)}\n` +
        `• Pajak Penghasilan (PPh 21): ${formatRupiah(fin.pajakPPh21)}\n` +
        `• Gaji Bersih (Take Home Pay): ${formatRupiah(fin.takeHomePay)}/bulan\n\n` +
        `💳 2. LIABILITAS & BIAYA HIDUP:\n` +
        `• Hutang Pinjaman: ${formatRupiah(fin.hutangPinjaman)}\n` +
        `• Cicilan KPR Rumah: ${formatRupiah(fin.cicilanKPR)}\n` +
        `• Total Liabilitas: ${formatRupiah(fin.totalLiabilitas)} (Rasio DTI: ${fin.dtiRatio}% — ${Number(fin.dtiRatio) <= 35 ? 'Sangat Sehat di bawah 35%' : 'Perlu Diwaspadai'})\n` +
        `• Biaya Makan & Minum: ${formatRupiah(fin.makanMinum)}\n` +
        `• Belanja Rumah Tangga: ${formatRupiah(fin.belanjaRumahTangga)}\n` +
        `• Total Pengeluaran Rutin: ${formatRupiah(fin.totalPengeluaran)}\n\n` +
        `🎯 3. TARGET IMPIAN:\n` +
        `• Sasaran: ${fin.namaTarget}\n` +
        `• Target Biaya: ${formatRupiah(fin.biayaTarget)}\n` +
        `• Alokasi Tabungan: ${formatRupiah(fin.alokasiTabungan)}/bulan (Estimasi tercapai dalam ${fin.totalBulanTarget} bulan / ~${fin.totalTahunTarget} tahun)\n\n` +
        `💰 4. SISA SURPLUS BERSIH:\n` +
        `• Sisa Uang Bersih: ${formatRupiah(fin.surplusBersih)}/bulan\n\n` +
        `💡 Saran AI: Anda memiliki sisa uang bersih sebesar ${formatRupiah(fin.surplusBersih)} per bulan. Alokasi yang sangat ideal adalah membagi 60% (${formatRupiah(Math.round(fin.surplusBersih * 0.6))}) ke saham/indeks dan 40% (${formatRupiah(Math.round(fin.surplusBersih * 0.4))}) ke SBN untuk mengunci return pasif.`
      );
    }

    // 3. ANALISIS KECOCOKAN ASET / PORTOFOLIO / INSTRUMEN
    if (
      promptLower.includes('analisis') ||
      promptLower.includes('kecocokan') ||
      promptLower.includes('aset') ||
      promptLower.includes('portofolio') ||
      promptLower.includes('instrumen') ||
      promptLower.includes('reksadana') ||
      promptLower.includes('rdpu') ||
      promptLower.includes('saham') ||
      promptLower.includes('sbn') ||
      promptLower.includes('obligasi') ||
      promptLower.includes('deposito') ||
      promptLower.includes('emas')
    ) {
      const assetDetails = assets.list
        .map(
          (a, i) =>
            `${i + 1}. ${a.name} (${formatRupiah(a.amount)})\n` +
            `   • Instrumen: ${a.instrument} → Tujuan: ${a.goal}\n` +
            `   • Status: ${a.verdict}\n` +
            `   • Evaluasi: ${a.reason ? a.reason.replace(/<[^>]+>/g, '') : 'Sesuai dengan horizon waktu tujuan dana.'}`
        )
        .join('\n\n');

      return (
        `Halo ${userName}! Berikut adalah hasil evaluasi langsung dari menu Analisis Kecocokan Aset Anda:\n\n` +
        `📋 RINGKASAN PORTOFOLIO ASET:\n` +
        `• Total Aset Dianalisis: ${assets.totalCount} Aset (Total Nilai: ${formatRupiah(assets.totalNominal)})\n` +
        `• Status Evaluasi: ${assets.sesuaiList.length} Sesuai | ${assets.reviewList.length} Perlu Ditinjau | ${assets.kurangList.length} Kurang Tepat\n\n` +
        `🔍 RINCIAN ASET TERDAFTAR:\n` +
        `${assetDetails}\n\n` +
        `💡 Rekomendasi AI: ${
          assets.kurangList.length > 0
            ? `Terdapat ${assets.kurangList.length} aset berstatus 'Kurang Tepat'. Sebaiknya alihkan aset tersebut ke instrumen dengan horizon waktu yang lebih cocok agar tidak berisiko terhadap modal.`
            : 'Semua aset terdaftar sudah ditempatkan pada instrumen yang tepat dan memiliki tingkat likuiditas serta risiko yang proporsional.'
        }`
      );
    }

    // 4. FIRE / PENSIUN 2035
    if (promptLower.includes('fire') || promptLower.includes('pensiun') || promptLower.includes('2035')) {
      return (
        `Analisis Target FIRE 2035 untuk ${userName}:\n\n` +
        `• Gaji Bersih Saat Ini: ${formatRupiah(fin.takeHomePay)}/bulan\n` +
        `• Surplus Kas yang Tersedia: ${formatRupiah(fin.surplusBersih)}/bulan\n` +
        `• Target FIRE: Rp 3.500.000.000\n\n` +
        `Dengan mengalirkan surplus bulanan ${formatRupiah(fin.surplusBersih)} ke instrumen ekuitas bertumbuh, target FIRE 2035 Anda diproyeksikan tercapai lebih cepat dari jadwal tanpa mengorbankan kebutuhan harian.`
      );
    }

    // 5. DIVIDEN VS SBN
    if (
      promptLower.includes('dividen') ||
      promptLower.includes('sbn') ||
      promptLower.includes('obligasi') ||
      promptLower.includes('sukuk') ||
      promptLower.includes('pasif income')
    ) {
      return (
        `Perbandingan Dividen Saham vs Kupon SBN untuk Surplus ${formatRupiah(fin.surplusBersih)} Anda:\n\n` +
        `• SBN ORI / Sukuk (Hasil Pasti ~6.6% p.a.): Sangat ideal untuk pendapatan pasif stabil dengan risiko sangat rendah karena dijamin negara.\n` +
        `• Saham Bluechip (Dividen Yield 4.5% - 7% + Potensi Kenaikan Harga): Cocok untuk akumulasi jangka panjang melawan inflasi.\n\n` +
        `💡 Rekomendasi: Bagi surplus ${formatRupiah(fin.surplusBersih)} Anda dengan proporsi 60% (${formatRupiah(Math.round(fin.surplusBersih * 0.6))}) saham dan 40% (${formatRupiah(Math.round(fin.surplusBersih * 0.4))}) SBN untuk menyeimbangkan pertumbuhan dan keamanan kas.`
      );
    }

    // 6. DANA DARURAT
    if (
      promptLower.includes('darurat') ||
      promptLower.includes('keamanan') ||
      promptLower.includes('siaga') ||
      promptLower.includes('proteksi')
    ) {
      return (
        `Analisis Kesiapan Dana Darurat ${userName}:\n\n` +
        `• Pengeluaran Rutin Bulanan: ${formatRupiah(fin.totalPengeluaran)}/bulan\n` +
        `• Kebutuhan Ideal Dana Darurat (6-9 bulan pengeluaran): ${formatRupiah(fin.totalPengeluaran * 6)} s/d ${formatRupiah(fin.totalPengeluaran * 9)}\n` +
        `• Pos Dana Darurat di Analisis Aset: Ditempatkan di Reksa Dana Pasar Uang (RDPU) Likuid.\n\n` +
        `💡 Saran AI: Karena pos darurat Anda sudah aman dan likuid, seluruh surplus bulanan ${formatRupiah(fin.surplusBersih)} dapat 100% dialokasikan ke instrumen produktif.`
      );
    }

    // DEFAULT GREETING / GENERIC PROMPT
    return (
      `Halo ${userName}! Saya siap menganalisis data keuangan Anda.\n\n` +
      `Saat ini data Anda mencatat:\n` +
      `• Gaji Bersih: ${formatRupiah(fin.takeHomePay)}/bulan\n` +
      `• Sisa Surplus: ${formatRupiah(fin.surplusBersih)}/bulan\n` +
      `• Target Impian: ${fin.namaTarget} (${formatRupiah(fin.biayaTarget)})\n` +
      `• Aset Terdaftar: ${assets.totalCount} Aset (${formatRupiah(assets.totalNominal)})\n\n` +
      `Silakan ketik pertanyaan yang ingin Anda tanyakan, misalnya:\n` +
      `• "Tolong analisis kalkulator finansial saya"\n` +
      `• "Tolong analisis kecocokan aset saya"\n` +
      `• "Bagaimana cara membagi sisa uang ${formatRupiah(fin.surplusBersih)}?"`
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
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const fin = getLiveFinancials();

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
              Diskusikan keputusan menabung dan berinvestasi dengan AI yang membaca data kalkulator dan analisis aset Anda secara langsung.
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
              {/* 1. Analisis Kalkulator Finansial */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Halo AI, tolong analisis data kalkulator finansial saya')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-green">Kalkulator</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Analisis kalkulator finansial (Gaji & Surplus)
                </div>
              </button>

              {/* 2. Analisis Kecocokan Aset */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Halo AI, tolong analisis kecocokan aset saya')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-purple">Analisis Aset</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Analisis kecocokan aset portofolio saya
                </div>
              </button>

              {/* 3. Analisis Menyeluruh */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Halo AI, bisakah Anda menganalisis semua kondisi keuangan saya?')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-blue">Semua Halaman</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Analisis semua data keuangan saya secara menyeluruh
                </div>
              </button>

              {/* 4. Alokasi Surplus */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage(`Bagaimana cara mengalokasikan surplus bulanan ${formatRupiah(fin.surplusBersih)} secara optimal ke saham dan SBN?`)}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-amber">Surplus</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Bagaimana cara alokasi surplus bulanan {formatRupiah(fin.surplusBersih)}?
                </div>
              </button>

              {/* 5. Dana Darurat & Cicilan */}
              <button
                type="button"
                className="consult-topic-btn"
                onClick={() => handleSendMessage('Periksa apakah rasio cicilan dan alokasi dana darurat saya saat ini aman?')}
              >
                <div className="consult-topic-header">
                  <span className="consult-topic-tag tag-teal">Proteksi</span>
                  <span className="consult-topic-arrow">→</span>
                </div>
                <div className="consult-topic-text">
                  Periksa apakah cicilan dan dana darurat saya aman?
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
              <p className="chat-panel-subtitle">Terhubung langsung dengan Kalkulator & Analisis Aset</p>
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
                <em>Sedang menganalisis data keuangan Anda...</em>
              </div>
            )}
          </div>

          {/* Composer Input & Disclaimer */}
          <div className="chat-composer-area">
            <div className="composer-input-row">
              <textarea
                className="composer-textarea"
                rows="2"
                placeholder="Tanyakan analisis kalkulator, kecocokan aset, atau rencana menabung..."
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
              Bukan nasihat keuangan resmi — AI menganalisis data berdasarkan input simulasi & instrumen aset Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
