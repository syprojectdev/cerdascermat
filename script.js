// ============================================================
// CERDAS CERMAT ISLAMI - script.js
// Versi: Skill Aktif dihapus, Musik manual + IndexedDB, TTS Indonesia
// ============================================================

// ========== GAME STATE ==========
let gameState = {
  numPlayers: 2,
  currentPlayer: 0,
  players: [],
  questionPool: [],
  usedIndices: new Set(),
  activeQuestionIdx: -1,
  answerTimer: null,
  timerMax: 10,
  timerLeft: 10,
  prepTimer: null,
  prepCountdown: 30,
  carouselTimer: null,
  carouselIdx: 0,
  carouselTotal: 5   // jumlah slide (skill aktif sudah dihapus)
};

// ========== MUSIK: IndexedDB + Audio Element ==========
// Simpan sebagai base64 DataURL agar stabil di semua browser
const DB_NAME  = 'CCIslamiDB_v3'; // ganti nama agar DB lama tidak konflik
const DB_STORE = 'music';
let musicDB  = null;
let musicLoaded = false;

// ---- IndexedDB helpers ----
function openMusicDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore(DB_STORE, { keyPath: 'id' });
    };
    req.onsuccess  = e => { musicDB = e.target.result; resolve(musicDB); };
    req.onerror    = ()  => reject(req.error);
    req.onblocked  = ()  => reject(new Error('DB blocked'));
  });
}
function saveMusicToDB(dataURL, filename) {
  return new Promise((resolve, reject) => {
    if (!musicDB) return resolve(); // simpan gagal → tetap ok
    const tx = musicDB.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put({ id: 'bgMusic', dataURL, filename });
    tx.oncomplete = () => resolve();
    tx.onerror    = ()  => reject(tx.error);
  });
}
function loadMusicFromDB() {
  return new Promise((resolve, reject) => {
    if (!musicDB) return resolve(null);
    const tx  = musicDB.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).get('bgMusic');
    req.onsuccess = () => resolve(req.result || null);
    req.onerror   = ()  => resolve(null); // gagal baca → anggap kosong
  });
}
function deleteMusicFromDB() {
  if (!musicDB) return;
  const tx = musicDB.transaction(DB_STORE, 'readwrite');
  tx.objectStore(DB_STORE).delete('bgMusic');
}

// ---- Attach DataURL ke elemen <audio> ----
function attachMusicFromDataURL(dataURL, filename) {
  const audio = document.getElementById('bgAudio');

  // Set src langsung ke dataURL — paling reliable, tidak butuh ObjectURL
  audio.src   = dataURL;
  audio.loop  = true;
  audio.volume = parseFloat(document.getElementById('volumeSlider').value);
  musicLoaded  = true;

  // Perlu load() eksplisit agar browser siap
  audio.load();

  const short = filename.length > 30 ? filename.slice(0, 27) + '…' : filename;
  document.getElementById('musicName').textContent    = '🎵 ' + short;
  document.getElementById('btnPlayPause').disabled    = false;
  document.getElementById('btnDelMusic').disabled     = false;
  document.getElementById('btnPlayPause').textContent = '▶ Play';

  // Event handler untuk update tombol otomatis
  audio.onplay  = () => { document.getElementById('btnPlayPause').textContent = '⏸ Pause'; };
  audio.onpause = () => { document.getElementById('btnPlayPause').textContent = '▶ Play';  };
  audio.onended = () => { document.getElementById('btnPlayPause').textContent = '▶ Play';  };
  audio.onerror = (e) => {
    console.error('Audio error:', e);
    setMusicStatus('❌ Format tidak didukung, coba MP3 lain');
  };
}

// ---- Dipanggil saat user pilih file ----
function loadMusic(input) {
  const file = input.files[0];
  if (!file) return;

  setMusicStatus('⏳ Memuat...');

  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataURL = e.target.result;   // base64 DataURL lengkap
    attachMusicFromDataURL(dataURL, file.name);
    // Simpan ke DB di background (tidak blokir UI)
    saveMusicToDB(dataURL, file.name).catch(() => {});
    input.value = '';
  };
  reader.onerror = () => {
    setMusicStatus('❌ Gagal membaca file');
  };
  reader.readAsDataURL(file);  // baca sebagai base64
}

// ---- Play / Pause ----
function toggleMusic() {
  const audio = document.getElementById('bgAudio');
  if (!musicLoaded || !audio.src) return;

  if (audio.paused) {
    // Resume AudioContext dulu jika perlu
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    audio.play().catch(err => {
      console.warn('Play gagal:', err.message);
      setMusicStatus('⚠️ Klik sekali lagi untuk putar');
    });
  } else {
    audio.pause();
  }
}

// ---- Hapus musik ----
function removeMusic() {
  const audio = document.getElementById('bgAudio');
  audio.pause();
  audio.src   = '';
  audio.onplay = audio.onpause = audio.onerror = null;
  musicLoaded  = false;
  document.getElementById('musicName').textContent    = 'Belum ada musik';
  document.getElementById('btnPlayPause').disabled    = true;
  document.getElementById('btnPlayPause').textContent = '▶ Play';
  document.getElementById('btnDelMusic').disabled     = true;
  deleteMusicFromDB();
}

// ---- Atur volume ----
function setMusicVolume(val) {
  document.getElementById('bgAudio').volume = parseFloat(val);
}

// ---- Helper tampilkan status singkat ----
function setMusicStatus(msg) {
  document.getElementById('musicName').textContent = msg;
}

// ========== TEXT-TO-SPEECH (Bahasa Indonesia) ==========
// Pilih suara Indonesia terbaik yang tersedia di browser
let indoVoice = null;

function loadIndonesianVoice() {
  return new Promise(resolve => {
    function tryLoad() {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Prioritas: cari suara bahasa Indonesia (id-ID / id)
      const priorities = [
        v => v.lang === 'id-ID' && v.localService,  // lokal id-ID (paling bagus)
        v => v.lang === 'id-ID',                     // online id-ID
        v => v.lang.startsWith('id'),                // id lain
        v => v.lang === 'ms-MY',                     // Melayu sebagai fallback
        v => v.lang.startsWith('ms'),
      ];

      for (const check of priorities) {
        const found = voices.find(check);
        if (found) { indoVoice = found; break; }
      }

      resolve(indoVoice);
    }

    // Beberapa browser load async
    if (window.speechSynthesis.getVoices().length) {
      tryLoad();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', tryLoad, { once: true });
      setTimeout(tryLoad, 1500); // fallback timeout
    }
  });
}

function speakText(text, onEnd) {
  if (!('speechSynthesis' in window)) { onEnd && onEnd(); return; }
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);

  // Pasang suara Indonesia jika tersedia
  if (indoVoice) {
    utter.voice = indoVoice;
    utter.lang = indoVoice.lang;
  } else {
    utter.lang = 'id-ID';
  }

  utter.rate = 0.88;   // kecepatan baca
  utter.pitch = 1.0;
  utter.volume = 1.0;

  utter.onend = () => { onEnd && onEnd(); };
  utter.onerror = () => { onEnd && onEnd(); }; // tetap lanjut jika error

  window.speechSynthesis.speak(utter);
}

// ========== SOUND ENGINE (Web Audio API) ==========
const audioCtx = (() => {
  try { return new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; }
})();

function playBeep(freq, dur, type = 'sine', vol = 0.3, delay = 0) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + dur);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + dur);
  } catch(e) {}
}

const sfx = {
  correct: () => {
    playBeep(523, 0.12, 'sine', 0.28);
    playBeep(659, 0.12, 'sine', 0.28, 0.13);
    playBeep(784, 0.28, 'sine', 0.3, 0.26);
  },
  wrong: () => {
    playBeep(280, 0.18, 'sawtooth', 0.28);
    playBeep(200, 0.36, 'sawtooth', 0.28, 0.19);
  },
  tick: () => { playBeep(800, 0.05, 'square', 0.12); },
  countdown: () => { playBeep(660, 0.1, 'sine', 0.22); },
  bonus: () => {
    [523, 659, 784, 1047].forEach((f, i) => playBeep(f, 0.12, 'sine', 0.25, i * 0.1));
  },
  superZonk: () => {
    playBeep(200, 0.08, 'sawtooth', 0.38);
    playBeep(150, 0.08, 'sawtooth', 0.38, 0.09);
    playBeep(100, 0.45, 'sawtooth', 0.4, 0.18);
    for (let i = 0; i < 8; i++) playBeep(50 + Math.random() * 30, 0.05, 'square', 0.18, i * 0.06);
  },
  zonk: () => {
    playBeep(380, 0.1, 'sine', 0.2);
    playBeep(300, 0.15, 'sine', 0.2, 0.11);
    playBeep(240, 0.28, 'sine', 0.2, 0.27);
  },
  click: () => { playBeep(440, 0.05, 'sine', 0.14); },
  win: () => { [523, 659, 784, 1047, 1319].forEach((f, i) => playBeep(f, 0.18, 'sine', 0.28, i * 0.1)); },
  select: () => {
    playBeep(523, 0.07, 'sine', 0.18);
    playBeep(659, 0.1, 'sine', 0.18, 0.08);
  }
};

// Resume AudioContext setelah interaksi user
function resumeAudio() {
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

// ========== PAGE NAVIGATION ==========
function goToPage(pageId) {
  sfx.click();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  setTimeout(() => document.getElementById(pageId).classList.add('active'), 50);
}

// ========== STARS ==========
function generateStars() {
  document.querySelectorAll('.stars-bg').forEach(el => {
    el.innerHTML = '';
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      s.className = 'star-particle';
      s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;
        --dur:${2+Math.random()*4}s;--delay:${Math.random()*3}s;`;
      el.appendChild(s);
    }
  });
}

// ========== PLAYER SETUP ==========
function selectPlayers(num) {
  sfx.select();
  gameState.numPlayers = num;
  gameState.players = Array.from({ length: num }, (_, i) => ({
    name: `Pemain ${i + 1}`,
    score: 0, correct: 0, wrong: 0,
    bonusPts: 0, zonk: 0, superZonk: 0,
    emoji: ['🦁', '🐯', '🦅', '🐬'][i]
  }));
  startPrep();
}

// ========== PERSIAPAN 30 DETIK ==========
function startPrep() {
  goToPage('page-prep');
  gameState.prepCountdown = 30;
  gameState.carouselIdx = 0;

  // Buat dots
  const dotsEl = document.getElementById('infoDots');
  dotsEl.innerHTML = '';
  for (let i = 0; i < gameState.carouselTotal; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    dotsEl.appendChild(d);
  }

  updatePrepTimer();

  clearInterval(gameState.prepTimer);
  gameState.prepTimer = setInterval(() => {
    gameState.prepCountdown--;
    if (gameState.prepCountdown <= 0) {
      clearInterval(gameState.prepTimer);
      clearInterval(gameState.carouselTimer);
      startGame();
      return;
    }
    if (gameState.prepCountdown <= 5) sfx.countdown();
    updatePrepTimer();
  }, 1000);

  clearInterval(gameState.carouselTimer);
  gameState.carouselTimer = setInterval(rotateCarousel, 4500);
}

function updatePrepTimer() {
  document.getElementById('prepNum').textContent = gameState.prepCountdown;
  const ratio = gameState.prepCountdown / 30;
  const circle = document.getElementById('prepCircle');
  circle.style.strokeDashoffset = 327 * (1 - ratio);
  circle.style.stroke = gameState.prepCountdown <= 10 ? '#ef4444' : '#FFD700';
}

function rotateCarousel() {
  const slides = document.querySelectorAll('.info-slide');
  const dots = document.querySelectorAll('.dot');
  slides[gameState.carouselIdx].classList.remove('active');
  dots[gameState.carouselIdx] && dots[gameState.carouselIdx].classList.remove('active');
  gameState.carouselIdx = (gameState.carouselIdx + 1) % gameState.carouselTotal;
  slides[gameState.carouselIdx].classList.add('active');
  dots[gameState.carouselIdx] && dots[gameState.carouselIdx].classList.add('active');
}

// ========== MULAI GAME ==========
function startGame() {
  gameState.questionPool = shuffleArray([...questions]);
  gameState.usedIndices = new Set();
  gameState.currentPlayer = 0;

  goToPage('page-game');
  renderScoreboard();
  renderGrid();
  updateTurnBadge();
}

// ========== RENDER GRID ==========
function renderGrid() {
  const grid = document.getElementById('questionGrid');
  grid.innerHTML = '';
  const remaining = gameState.questionPool.length - gameState.usedIndices.size;
  document.getElementById('soalLeftNum').textContent = remaining;

  gameState.questionPool.forEach((q, idx) => {
    const box = document.createElement('div');
    const used = gameState.usedIndices.has(idx);
    box.className = 'q-box' + (used ? ' used' : '');
    box.textContent = idx + 1;
    if (!used) box.onclick = () => selectQuestion(idx);
    grid.appendChild(box);
  });
}

// ========== SCOREBOARD ==========
function renderScoreboard() {
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = '';
  const maxScore = Math.max(...gameState.players.map(p => p.score));

  gameState.players.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'score-card' +
      (i === gameState.currentPlayer ? ' active-turn' : '') +
      (p.score === maxScore && maxScore > 0 ? ' leading' : '');
    card.innerHTML = `
      <div class="sc-name">${p.emoji} ${p.name}</div>
      <div class="sc-score">${p.score}</div>
      ${p.score === maxScore && maxScore > 0 ? '<div class="sc-lead">👑 Unggul</div>' : ''}
    `;
    sb.appendChild(card);
  });
}

function updateTurnBadge() {
  const p = gameState.players[gameState.currentPlayer];
  document.getElementById('currentPlayerName').textContent = `${p.emoji} ${p.name}`;
}

// ========== PILIH SOAL ==========
function selectQuestion(idx) {
  if (gameState.usedIndices.has(idx)) return;
  sfx.select();
  gameState.activeQuestionIdx = idx;
  showCountdown();
}

// ========== COUNTDOWN 5 DETIK ==========
function showCountdown() {
  const overlay = document.getElementById('overlay-countdown');
  overlay.classList.remove('hidden');
  let count = 5;
  document.getElementById('cdNum').textContent = count;
  sfx.countdown();

  const t = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(t);
      overlay.classList.add('hidden');
      showQuestion();
    } else {
      document.getElementById('cdNum').textContent = count;
      sfx.countdown();
    }
  }, 1000);
}

// ========== TAMPILKAN SOAL ==========
function showQuestion() {
  const q = gameState.questionPool[gameState.activeQuestionIdx];
  const p = gameState.players[gameState.currentPlayer];

  document.getElementById('overlay-question').classList.remove('hidden');
  document.getElementById('qPlayerBadge').textContent = `${p.emoji} ${p.name}`;
  document.getElementById('qText').textContent = q.question;
  document.getElementById('choicesGrid').classList.add('hidden');
  document.getElementById('readingIndicator').classList.remove('hidden');
  document.getElementById('timerNum').classList.remove('urgent');

  // Reset timer visual (belum jalan)
  gameState.timerMax = 10;
  gameState.timerLeft = 10;
  updateTimerVisual(10, 10);

  // Baca soal pakai TTS Indonesia
  speakText(q.question, () => {
    // Setelah selesai dibacakan → tampilkan pilihan & mulai timer
    showChoices();
  });
}

function showChoices() {
  const q = gameState.questionPool[gameState.activeQuestionIdx];
  document.getElementById('readingIndicator').classList.add('hidden');

  const grid = document.getElementById('choicesGrid');
  grid.innerHTML = '';
  grid.classList.remove('hidden');

  q.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = `${['A', 'B', 'C', 'D'][i]}. ${c}`;
    btn.onclick = () => submitAnswer(i, btn);
    grid.appendChild(btn);
  });

  startAnswerTimer();
}

// ========== TIMER JAWABAN ==========
function startAnswerTimer() {
  clearInterval(gameState.answerTimer);
  gameState.timerLeft = gameState.timerMax;
  updateTimerVisual(gameState.timerLeft, gameState.timerMax);

  gameState.answerTimer = setInterval(() => {
    gameState.timerLeft--;
    if (gameState.timerLeft <= 5 && gameState.timerLeft > 0) sfx.tick();
    if (gameState.timerLeft <= 3) document.getElementById('timerNum').classList.add('urgent');
    updateTimerVisual(gameState.timerLeft, gameState.timerMax);
    if (gameState.timerLeft <= 0) {
      clearInterval(gameState.answerTimer);
      timeOut();
    }
  }, 1000);
}

function updateTimerVisual(left, max) {
  const ratio = left / max;
  const circle = document.getElementById('timerCircle');
  circle.style.strokeDashoffset = 327 * (1 - ratio);
  circle.style.stroke = ratio > 0.5 ? '#00E5FF' : ratio > 0.25 ? '#f59e0b' : '#ef4444';
  document.getElementById('timerNum').textContent = left;
}

function timeOut() {
  sfx.wrong();
  window.speechSynthesis && window.speechSynthesis.cancel();
  disableChoices();
  const q = gameState.questionPool[gameState.activeQuestionIdx];
  highlightCorrect(q.answer);
  gameState.players[gameState.currentPlayer].wrong++;
  showResultOverlay(false, q.explanation, '⏰ Waktu Habis!', false);
}

// ========== SUBMIT JAWABAN ==========
function submitAnswer(choiceIdx, btn) {
  if (document.getElementById('choicesGrid').classList.contains('hidden')) return;
  clearInterval(gameState.answerTimer);
  window.speechSynthesis && window.speechSynthesis.cancel();
  disableChoices();

  const q = gameState.questionPool[gameState.activeQuestionIdx];
  const isCorrect = choiceIdx === q.answer;
  const timeUsed = gameState.timerMax - gameState.timerLeft;

  if (isCorrect) {
    btn.classList.add('correct');
    sfx.correct();
    gameState.players[gameState.currentPlayer].score += 10;
    gameState.players[gameState.currentPlayer].correct++;
    const smartBonus = timeUsed <= 3;
    showResultOverlay(true, q.explanation, smartBonus ? '⚡ BONUS PINTAR! +10' : '', true, smartBonus);
  } else {
    btn.classList.add('wrong');
    highlightCorrect(q.answer);
    sfx.wrong();
    gameState.players[gameState.currentPlayer].wrong++;
    showResultOverlay(false, q.explanation, '', false);
  }
}

function highlightCorrect(answerIdx) {
  const btns = document.querySelectorAll('.choice-btn');
  if (btns[answerIdx]) btns[answerIdx].classList.add('correct');
}
function disableChoices() {
  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
}

// ========== RESULT OVERLAY ==========
function showResultOverlay(correct, explanation, bonusLabel, doBonus, smartBonus) {
  gameState.usedIndices.add(gameState.activeQuestionIdx);
  document.getElementById('overlay-question').classList.add('hidden');

  const box     = document.getElementById('resultBox');
  const icon    = document.getElementById('resultIcon');
  const title   = document.getElementById('resultTitle');
  const explain = document.getElementById('resultExplain');
  const bonusEl = document.getElementById('resultBonus');
  const nextBtn = document.getElementById('resultNextBtn');

  box.className = 'overlay-box result-box';
  explain.textContent = explanation || '';
  bonusEl.textContent = '';
  bonusEl.style.color = '';

  if (correct) {
    icon.textContent = '✅';
    title.textContent = 'BENAR! +10 Poin';
    title.className = '';
    if (smartBonus) {
      bonusEl.textContent = '⚡ BONUS PINTAR! +10 Poin';
      bonusEl.style.color = '#00E5FF';
      gameState.players[gameState.currentPlayer].score += 10;
    }
    // Jika ada bonus system, tombol lanjut akan trigger bonus dulu
    if (doBonus) {
      nextBtn.textContent = 'Lihat Bonus 🎰';
      nextBtn.onclick = () => {
        document.getElementById('overlay-result').classList.add('hidden');
        triggerBonusSystem();
      };
    } else {
      nextBtn.textContent = 'Lanjut ➡️';
      nextBtn.onclick = nextTurn;
    }
  } else {
    icon.textContent = '❌';
    title.textContent = 'SALAH!';
    title.className = 'wrong';
    nextBtn.textContent = 'Lanjut ➡️';
    nextBtn.onclick = nextTurn;
  }

  document.getElementById('overlay-result').classList.remove('hidden');
}

// ========== SISTEM BONUS (tanpa Skill Aktif) ==========
// Probabilitas: Pasif 20% | Zonk 60% | Super Zonk 20%
function triggerBonusSystem() {
  const roll = Math.random() * 100;
  let type;
  if (roll < 20)       type = 'passive';
  else if (roll < 80)  type = 'zonk';
  else                 type = 'superzonk';
  runBonusAnimation(type);
}

function runBonusAnimation(type) {
  const overlay = document.getElementById('overlay-bonus');
  const icon = document.getElementById('bonusIcon');
  const titleEl = document.getElementById('bonusTitle');
  const valEl = document.getElementById('bonusVal');

  overlay.classList.remove('hidden');
  icon.style.animation = 'spinAnim 0.3s linear infinite';
  titleEl.textContent = '🎰 Spinning...';
  titleEl.style.color = '#FFD700';
  valEl.textContent = '';

  setTimeout(() => {
    icon.style.animation = '';
    if (type === 'passive') applyPassiveBonus(icon, titleEl, valEl);
    else if (type === 'zonk') applyZonk(icon, titleEl, valEl);
    else applySuperZonk(icon, titleEl, valEl);

    // Tampilkan tombol lanjut - tidak auto-close
    renderScoreboard();
    const bonusNextBtn = document.getElementById('bonusNextBtn');
    bonusNextBtn.classList.remove('hidden');
    bonusNextBtn.onclick = () => {
      bonusNextBtn.classList.add('hidden');
      overlay.classList.add('hidden');
      if (!checkGameOver()) nextTurn();
    };
  }, 1200);
}

function applyPassiveBonus(icon, titleEl, valEl) {
  sfx.bonus();
  // +5 sering, +10 sedang, +15 langka
  const table = [5, 5, 5, 5, 10, 10, 10, 15];
  const pts = table[Math.floor(Math.random() * table.length)];
  const p = gameState.players[gameState.currentPlayer];
  p.score += pts;
  p.bonusPts += pts;

  icon.textContent = '🌟';
  titleEl.textContent = 'BONUS PASIF!';
  titleEl.style.color = '#FFD700';
  valEl.textContent = `+${pts} Poin!`;
  valEl.style.color = '#FFD700';
  fireConfetti(30);
}

function applyZonk(icon, titleEl, valEl) {
  sfx.zonk();
  gameState.players[gameState.currentPlayer].zonk++;
  icon.textContent = '😅';
  titleEl.textContent = 'ZONK!';
  titleEl.style.color = '#f97316';
  valEl.textContent = 'Tidak ada bonus...';
  valEl.style.color = '#fdba74';
}

function applySuperZonk(icon, titleEl, valEl) {
  sfx.superZonk();
  // -1/-2 sering, -3/-4/-5 langka
  const table = [-1, -1, -2, -2, -3, -4, -5];
  const penalty = table[Math.floor(Math.random() * table.length)];
  const p = gameState.players[gameState.currentPlayer];
  p.score += penalty;
  p.superZonk++;

  icon.textContent = '💣';
  titleEl.textContent = 'SUPER ZONK! 💥';
  titleEl.style.color = '#ef4444';
  valEl.textContent = `${penalty} Poin!`;
  valEl.style.color = '#fca5a5';

  // Layar berguncang
  const gamePage = document.getElementById('page-game');
  gamePage.classList.add('page-game-shake');
  setTimeout(() => gamePage.classList.remove('page-game-shake'), 600);
}

// ========== NEXT TURN ==========
function nextTurn() {
  document.getElementById('overlay-result').classList.add('hidden');

  if (checkGameOver()) return;

  gameState.currentPlayer = (gameState.currentPlayer + 1) % gameState.numPlayers;
  updateTurnBadge();
  renderScoreboard();
  renderGrid();
}

function checkGameOver() {
  if (gameState.usedIndices.size >= gameState.questionPool.length) {
    setTimeout(showFinalResult, 400);
    return true;
  }
  return false;
}

// ========== PAKSA SELESAI ==========
function showForceEndDialog() {
  sfx.click();
  document.getElementById('dialog-force').classList.remove('hidden');
}
function closeForceDialog() {
  sfx.click();
  document.getElementById('dialog-force').classList.add('hidden');
}
function forceEnd() {
  sfx.click();
  document.getElementById('dialog-force').classList.add('hidden');
  clearInterval(gameState.answerTimer);
  window.speechSynthesis && window.speechSynthesis.cancel();
  showFinalResult();
}

// ========== HASIL AKHIR ==========
function showFinalResult() {
  sfx.win();
  clearInterval(gameState.answerTimer);
  clearInterval(gameState.prepTimer);
  window.speechSynthesis && window.speechSynthesis.cancel();

  const sorted = [...gameState.players]
    .map((p, i) => ({ ...p, origIdx: i }))
    .sort((a, b) => b.score - a.score);

  // Podium
  const podiumWrap = document.getElementById('podiumWrap');
  podiumWrap.innerHTML = '';
  const medalEmoji = ['🥇', '🥈', '🥉', '🏅'];
  const podCls = ['p1', 'p2', 'p3', 'p4'];
  // Urutan tampilan: 2, 1, 3, 4
  const displayOrder = sorted.length >= 3
    ? [1, 0, 2, 3].filter(i => i < sorted.length)
    : [1, 0].filter(i => i < sorted.length);

  displayOrder.forEach(rank => {
    const p = sorted[rank];
    const col = document.createElement('div');
    col.className = 'podium-col';
    col.innerHTML = `
      <div class="podium-player-name">${p.emoji} ${p.name}</div>
      <div class="podium-score">${p.score} pts</div>
      <div class="podium-block ${podCls[rank]}">${medalEmoji[rank]}</div>
    `;
    podiumWrap.appendChild(col);
  });

  // Statistik per pemain
  const statsEl = document.getElementById('finalStats');
  statsEl.innerHTML = '';
  sorted.forEach((p, rank) => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `
      <div class="stat-player">${medalEmoji[rank]} ${p.emoji} ${p.name}</div>
      <div class="stat-row"><span>Total Skor</span><span>${p.score}</span></div>
      <div class="stat-row"><span>✅ Benar</span><span>${p.correct}</span></div>
      <div class="stat-row"><span>❌ Salah</span><span>${p.wrong}</span></div>
      <div class="stat-row"><span>🌟 Total Bonus</span><span>+${p.bonusPts}</span></div>
      <div class="stat-row"><span>😅 Zonk</span><span>${p.zonk}x</span></div>
      <div class="stat-row"><span>💣 Super Zonk</span><span>${p.superZonk}x</span></div>
    `;
    statsEl.appendChild(card);
  });

  goToPage('page-result');
  setTimeout(() => fireConfetti(100), 600);
}

function restartGame() {
  sfx.click();
  clearConfetti();
  goToPage('page-players');
}

// ========== CONFETTI ==========
const CONFETTI_COLORS = ['#FFD700', '#22c55e', '#0ea5e9', '#f97316', '#ec4899', '#8b5cf6', '#ffffff'];
function fireConfetti(count) {
  const wrap = document.getElementById('confettiWrap');
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      background:${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      --cf-dur:${2 + Math.random() * 3}s;
      --cf-delay:${Math.random() * 1.5}s;
      width:${6 + Math.random() * 8}px;
      height:${10 + Math.random() * 10}px;
      transform:rotate(${Math.random() * 360}deg);
    `;
    wrap.appendChild(p);
  }
  setTimeout(clearConfetti, 7000);
}
function clearConfetti() {
  document.getElementById('confettiWrap').innerHTML = '';
}

// ========== UTILITY ==========
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', async () => {
  generateStars();

  // Unlock AudioContext setelah user interaksi pertama
  document.addEventListener('click', resumeAudio, { once: true });

  // Muat suara Indonesia di background
  await loadIndonesianVoice();

  // Buka IndexedDB dan muat musik tersimpan (jika ada)
  try {
    await openMusicDB();
    const saved = await loadMusicFromDB();
    if (saved) {
      attachMusicToPlayer(saved.blob, saved.filename);
    }
  } catch(e) {
    console.warn('IndexedDB tidak tersedia:', e);
  }
});

// Expose ke HTML onclick
window.goToPage = goToPage;
window.selectPlayers = selectPlayers;
window.nextTurn = nextTurn;
window.showForceEndDialog = showForceEndDialog;
window.closeForceDialog = closeForceDialog;
window.forceEnd = forceEnd;
window.restartGame = restartGame;
window.loadMusic = loadMusic;
window.toggleMusic = toggleMusic;
window.removeMusic = removeMusic;
window.setMusicVolume = setMusicVolume;
