/* =========================================================
   games.js — Language Island: 3 games x 6 languages + Alphabet Crush
   ========================================================= */

/* =========================================================
   0) IMAGE PATHS
   ========================================================= */
const IMG_BASE = "imgs/Games/";
const CATTO_IMG = "imgs/Cattoimages/LearnWithCatto/Catto.png";

// Language Island images
const ISLAND_IMAGES = {
  en: "imgs/Games/EN_Island.png",
  ar: "imgs/Games/AR_Island.png",
  de: "imgs/Games/GR_Island.png",
  es: "imgs/Games/SP_Island.png",
  fr: "imgs/Games/FR_Island.png",
  it: "imgs/Games/IT_Island.png"
};

// Game mode images
const GAME_IMAGES = {
  memory: "imgs/Games/ABC-Match.png",
  quiz: "imgs/Games/ABC-Quiz.png",
  listen: "imgs/Games/ABC-Listen.png",
  crush: "imgs/Games/ABC-Crush.png"
};

/* =========================================================
   1) WORD BANK
   ========================================================= */
const WORD_BANK = {
  en: { name:"English", native:"English", dir:"ltr", speechLang:"en-US", color:"#4C8DAF",
    words:[
      {key:"apple",  text:"Apple",  img:IMG_BASE+"Apple.png"},
      {key:"ball",   text:"Ball",   img:IMG_BASE+"Ball.png"},
      {key:"carrot", text:"Carrot", img:IMG_BASE+"Carrot.png"},
    ]},
  ar: { name:"Arabic", native:"العربية", dir:"rtl", speechLang:"ar-SA", color:"#58C27D",
    words:[
      {key:"apple",  text:"تفاحة", img:IMG_BASE+"Apple.png"},
      {key:"ball",   text:"كرة",   img:IMG_BASE+"Ball.png"},
      {key:"carrot", text:"جزرة",  img:IMG_BASE+"Carrot.png"},
    ]},
  de: { name:"German", native:"Deutsch", dir:"ltr", speechLang:"de-DE", color:"#8C6FC9",
    words:[
      {key:"apple",  text:"Apfel",   img:IMG_BASE+"Apple.png"},
      {key:"ball",   text:"Ball",    img:IMG_BASE+"Ball.png"},
      {key:"carrot", text:"Karotte", img:IMG_BASE+"Carrot.png"},
    ]},
  es: { name:"Spanish", native:"Español", dir:"ltr", speechLang:"es-ES", color:"#FF6F59",
    words:[
      {key:"apple",  text:"Manzana",   img:IMG_BASE+"Apple.png"},
      {key:"ball",   text:"Pelota",    img:IMG_BASE+"Ball.png"},
      {key:"carrot", text:"Zanahoria", img:IMG_BASE+"Carrot.png"},
    ]},
  fr: { name:"French", native:"Français", dir:"ltr", speechLang:"fr-FR", color:"#FFB84D",
    words:[
      {key:"apple",  text:"Pomme",   img:IMG_BASE+"Apple.png"},
      {key:"ball",   text:"Ballon",  img:IMG_BASE+"Ball.png"},
      {key:"carrot", text:"Carotte", img:IMG_BASE+"Carrot.png"},
    ]},
  it: { name:"Italian", native:"Italiano", dir:"ltr", speechLang:"it-IT", color:"#E5563F",
    words:[
      {key:"apple",  text:"Mela",   img:IMG_BASE+"Apple.png"},
      {key:"ball",   text:"Palla",  img:IMG_BASE+"Ball.png"},
      {key:"carrot", text:"Carota", img:IMG_BASE+"Carrot.png"},
    ]},
};

/* =========================================================
   1b) ALPHABET BANK — for Alphabet Crush
   ========================================================= */
const ALPHABET_BANK = {
  en: { letters:["A","B","C","D","E","F"] },
  ar: { letters:["ا","ب","ت","ث","ج","ح"] },
  de: { letters:["A","B","C","D","E","F"] },
  es: { letters:["A","B","C","D","E","F"] },
  fr: { letters:["A","B","C","D","E","F"] },
  it: { letters:["A","B","C","D","E","F"] },
};
const TILE_COLORS = ["#FF6F59","#FFD23F","#58C27D","#6EC6FF","#B79CED","#FF8A5B"];

const DEFAULT_LANG = "en";

const GAME_TYPES = [
  {key:"memory", title:"Memory Match", desc:"", color:"var(--coral)"},
  {key:"quiz",   title:"Picture Quiz", desc:"",          color:"var(--grass)"},
  {key:"listen", title:"Listen & Choose", desc:"",      color:"#4C8DAF"},
  {key:"crush",  title:"Alphabet Crush", desc:"",           color:"#8C6FC9"},
];

/* =========================================================
   2) SVG ICONS
   ========================================================= */
const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-4-6.3 4 1.7-7L1.9 9.2l7.1-.6z"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h10v2h3v2c0 2.2-1.8 4-4 4h-.2A5 5 0 0 1 13 15.9V18h3v2H8v-2h3v-2.1A5 5 0 0 1 8.2 12H8c-2.2 0-4-1.8-4-4V6h3V4zm-3 4c0 1.1.9 2 2 2V6H4v2zm16 0V6h-2v4c1.1 0 2-.9 2-2z"/></svg>`,
  speaker: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 5V4L8 9H4zm11.5 3a3.5 3.5 0 0 0-2-3.2v6.4a3.5 3.5 0 0 0 2-3.2z"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 5l-7 7 7 7 1.4-1.4L10.8 12l5.6-5.6z"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h6v6H4V4zm0 10h6v6H4v-6zM14 4h6v6h-6V4zm0 10h6v6h-6v-6z"/></svg>`,
};
function icon(name, cls){ return `<span class="icon ${cls||''}">${ICONS[name]||''}</span>`; }

function pic(src, label, extraClass){
  const safeLabel = (label||'').replace(/"/g,'&quot;');
  return `<div class="pic ${extraClass||''}"><img src="${src}" alt="${safeLabel}"
    onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${safeLabel}'}))"></div>`;
}

/* =========================================================
   3) PROGRESS STORAGE
   ========================================================= */
const PROGRESS_KEY = "language-island-games-progress";
function loadProgress(){ try{ return JSON.parse(localStorage.getItem(PROGRESS_KEY))||{}; }catch(e){ return {}; } }
function saveProgress(p){ try{ localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); }catch(e){} }
function getLangProgress(key){ const p=loadProgress(); return p[key]||{stars:0}; }
function addStars(key,n){ const p=loadProgress(); p[key]=p[key]||{stars:0}; p[key].stars+=n; saveProgress(p); updateTotalStars(); }
function updateTotalStars(){
  const p = loadProgress();
  let total = 0;
  Object.values(p).forEach(v => total += v.stars || 0);
  const el = document.getElementById('totalStars');
  if(el) el.textContent = total;
}

/* =========================================================
   4) MODAL CONTROLS
   ========================================================= */
function openLoginModal() {
  var modal = document.getElementById('loginRequiredModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof Sound !== 'undefined') Sound.pop();
  }
}

function closeLoginModal() {
  var modal = document.getElementById('loginRequiredModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(function(m) {
    m.classList.remove('open');
  });
  document.body.style.overflow = '';
}

/* =========================================================
   5) STATE
   ========================================================= */
const state = { lang:null, game:null };
const app = document.getElementById("app");
const cattoBubble = document.getElementById("cattoBubble");
const cattoImgWrap = document.getElementById("cattoImgWrap");

function cattoSay(msg, mood){
  cattoBubble.textContent = msg;
  cattoImgWrap.classList.remove("bounce","shake","spin");
  void cattoImgWrap.offsetWidth;
  if(mood==="happy") cattoImgWrap.classList.add("bounce");
  if(mood==="sad") cattoImgWrap.classList.add("shake");
  if(mood==="win") cattoImgWrap.classList.add("spin");
}

function speak(text, langCode){
  if(!("speechSynthesis" in window)) return;
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langCode; u.rate = 0.85; u.pitch = 1.1;
    window.speechSynthesis.speak(u);
  }catch(e){}
}

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

/* =========================================================
   6) HOME — Language Islands with Images
   ========================================================= */
// Expose this globally so header.js can trigger it when DB fetch completes
window.renderHome = function(){
  state.lang=null; state.game=null;
  
  if (window.isUserLoggedIn && window.isUserLoggedIn()) {
    cattoSay("Hi! Pick a language and let's play!", "happy");
  } else {
    cattoSay("Hi! Sign in to play games!", "happy");
  }
  
  updateTotalStars();

  const cards = Object.entries(WORD_BANK).map(([key,l])=>{
    const prog = getLangProgress(key);
    const islandImg = ISLAND_IMAGES[key] || "imgs/Games/default.png";
    return `
      <button class="lang-card" data-lang="${key}">
        <img src="${islandImg}" alt="${l.name}" onerror="this.src='imgs/Games/default.png'">
        <span class="lang-stars">${icon('star','star-ic')} ${prog.stars}</span>
      </button>`;
  }).join("");

  app.innerHTML = `
    <section class="games-hero">
      <h1>Language Games</h1>
      <p>Pick a language, then pick a game, and start learning and playing!</p>
      ${!(window.isUserLoggedIn && window.isUserLoggedIn()) ? '<p style="color:var(--coral);font-weight:800;font-size:15px;margin-top:8px;">Sign in to unlock all games and track your progress!</p>' : ''}
    </section>
    <section class="lang-grid">${cards}</section>
  `;

  app.querySelectorAll(".lang-card").forEach(btn=>{
    btn.addEventListener("click", function() {
      if (window.isUserLoggedIn && window.isUserLoggedIn()) {
        openHub(this.dataset.lang);
      } else {
        openLoginModal();
        sessionStorage.setItem('pendingLanguage', this.dataset.lang);
      }
    });
  });
}

/* =========================================================
   7) HUB — Game Selection with Images
   ========================================================= */
function openHub(key){
  state.lang = key;
  const l = WORD_BANK[key];
  const prog = getLangProgress(key);
  cattoSay(`${l.name}! Pick a game to get started`, "happy");

  const cards = GAME_TYPES.map(g=>{
    const gameImg = GAME_IMAGES[g.key] || "imgs/Games/default.png";
    return `
      <button class="game-card" data-game="${g.key}">
        <img src="${gameImg}" alt="${g.title}" onerror="this.src='imgs/Games/default.png'">
        <span class="game-title">${g.title}</span>
        <span class="game-desc">${g.desc}</span>
      </button>`;
  }).join("");

  app.innerHTML = `
    <section class="hub">
      <button class="back-btn" id="backHome">${icon('back','arrow-ic')} Back to languages</button>
      <h2 class="hub-title">${l.name}</h2>
      <div class="game-grid">${cards}</div>
    </section>
  `;
  document.getElementById("backHome").addEventListener("click", window.renderHome);
  app.querySelectorAll(".game-card").forEach(btn=>{
    btn.addEventListener("click", function() {
      if (window.isUserLoggedIn && window.isUserLoggedIn()) {
        startGame(this.dataset.game);
      } else {
        openLoginModal();
        sessionStorage.setItem('pendingGame', this.dataset.game);
        sessionStorage.setItem('pendingLanguage', state.lang);
      }
    });
  });
}

function startGame(gameKey){
  state.game = gameKey;
  if(gameKey==="memory") startMemoryGame();
  else if(gameKey==="quiz") startQuizGame("quiz");
  else if(gameKey==="listen") startQuizGame("listen");
  else if(gameKey==="crush") startCrushGame();
}

/* =========================================================
   8) MEMORY GAME
   ========================================================= */
const memory = { cards:[], flipped:[], matched:0, moves:0, locked:false };

function startMemoryGame(){
  const l = WORD_BANK[state.lang];
  const pairs = l.words.flatMap((w,i)=>[
    {id:i*2,   pairId:i, kind:"pic",  word:w},
    {id:i*2+1, pairId:i, kind:"word", word:w},
  ]);
  memory.cards = shuffle(pairs).map(c=>({...c, flipped:false, matched:false}));
  memory.flipped=[]; memory.matched=0; memory.moves=0; memory.locked=false;
  cattoSay("Flip two cards and find the picture and its word!","happy");
  renderMemoryGame();
}

function renderMemoryGame(){
  const l = WORD_BANK[state.lang];
  app.innerHTML = `
    <section class="hub" dir="${l.dir}">
      <button class="back-btn" id="backHub">${icon('back','arrow-ic')} Back</button>
      <h2 class="hub-title">Memory Match — ${l.name}</h2>
      <p class="memory-progress" id="memStats">Moves: ${memory.moves} · Matches: ${memory.matched} / ${l.words.length}</p>
      <div class="memory-grid" id="memGrid"></div>
    </section>
  `;
  document.getElementById("backHub").addEventListener("click", ()=>{ openHub(state.lang); });

  const grid = document.getElementById("memGrid");
  grid.innerHTML = memory.cards.map((c,i)=>{
    let inner = "";
    if(c.flipped||c.matched){
      inner = c.kind==="pic" ? pic(c.word.img, c.word.text) : `<span>${c.word.text}</span>`;
    } else {
      inner = `<span class="hidden-face">?</span>`;
    }
    return `<div class="memory-card ${c.matched?'matched':''}" data-i="${i}">${inner}</div>`;
  }).join("");

  grid.querySelectorAll(".memory-card").forEach(el=>{
    el.addEventListener("mouseenter", ()=>{ if (typeof Sound !== 'undefined' && Sound.hover) Sound.hover(); });
    el.addEventListener("click", ()=> flipMemoryCard(parseInt(el.dataset.i,10)));
  });
}

function flipMemoryCard(i){
  if(memory.locked) return;
  const card = memory.cards[i];
  if(card.flipped||card.matched) return;

  card.flipped = true;
  memory.flipped.push(i);
  renderMemoryGame();

  if(memory.flipped.length===2){
    memory.moves++;
    memory.locked = true;
    const [i1,i2] = memory.flipped;
    const c1 = memory.cards[i1], c2 = memory.cards[i2];

    if(c1.pairId===c2.pairId && c1.kind!==c2.kind){
      c1.matched = true; c2.matched = true;
      memory.matched++;
      memory.flipped = [];
      memory.locked = false;
      cattoSay("Great match!","happy");
      speak(c1.word.text, WORD_BANK[state.lang].speechLang);
      renderMemoryGame();
      if(memory.matched===WORD_BANK[state.lang].words.length){
        addStars(state.lang, 3);
        setTimeout(()=> renderCelebration("memory"), 500);
      }
    } else {
      setTimeout(()=>{
        c1.flipped=false; c2.flipped=false;
        memory.flipped=[]; memory.locked=false;
        cattoSay("Try again, you can do it!","sad");
        renderMemoryGame();
      }, 800);
    }
  }
}

/* =========================================================
   9) QUIZ GAMES
   ========================================================= */
const quiz = { mode:null, order:[], index:0, wrongTries:0 };

function startQuizGame(mode){
  quiz.mode = mode;
  const l = WORD_BANK[state.lang];
  quiz.order = shuffle(l.words.map((_,i)=>i));
  quiz.index = 0;
  renderQuizQuestion();
}

function renderQuizQuestion(){
  const l = WORD_BANK[state.lang];
  const total = l.words.length;
  if(quiz.index >= total){ renderCelebration(quiz.mode); return; }

  const correctIdx = quiz.order[quiz.index];
  const correctWord = l.words[correctIdx];
  const numChoices = Math.min(3, total);
  const pool = shuffle(l.words.map((_,i)=>i).filter(i=>i!==correctIdx)).slice(0, numChoices-1);
  const choiceIdxs = shuffle([correctIdx, ...pool]);
  quiz.wrongTries = 0;

  const isListen = quiz.mode==="listen";
  cattoSay(isListen ? "Listen closely and pick the right picture!" : `Find the picture for: ${correctWord.text}`, "happy");

  const questionBlock = isListen
    ? `<button class="hear-btn" id="hearBtn">${icon('speaker')} Hear it again</button>`
    : `${pic(correctWord.img, correctWord.text, 'quiz-pic-big')}
       <div class="quiz-word-big">${correctWord.text}</div>
       <button class="hear-btn" id="hearBtn">${icon('speaker')} Hear the word</button>`;

  const choicesBlock = isListen
    ? `<div class="pic-choices" id="choices">
        ${choiceIdxs.map(i=>`<button class="choice-pic-btn" data-i="${i}">${pic(l.words[i].img, l.words[i].text)}</button>`).join("")}
       </div>`
    : `<div class="word-choices" id="choices">
        ${choiceIdxs.map(i=>`<button class="choice-btn" data-i="${i}">${l.words[i].text}</button>`).join("")}
       </div>`;

  app.innerHTML = `
    <section class="hub" dir="${l.dir}">
      <button class="back-btn" id="backHub">${icon('back','arrow-ic')} Back</button>
      <div class="quiz-top">
        <div class="quiz-progress-track">
          ${l.words.map((_,i)=>`<span class="dot ${i<quiz.index?'done':''} ${i===quiz.index?'current':''}"></span>`).join("")}
        </div>
        <div class="quiz-stars">${icon('star','star-ic')} ${getLangProgress(state.lang).stars}</div>
      </div>
      <div class="quiz-question">${questionBlock}</div>
      ${choicesBlock}
    </section>
  `;

  document.getElementById("backHub").addEventListener("click", ()=> openHub(state.lang));
  const hearBtn = document.getElementById("hearBtn");
  if(hearBtn) hearBtn.addEventListener("click", ()=> speak(correctWord.text, l.speechLang));

  document.querySelectorAll("#choices button").forEach(btn=>{
    btn.addEventListener("mouseenter", ()=>{ if (typeof Sound !== 'undefined' && Sound.hover) Sound.hover(); });
    btn.addEventListener("click", ()=> onQuizChoice(btn, parseInt(btn.dataset.i,10), correctIdx, correctWord, l));
  });

  if(isListen) speak(correctWord.text, l.speechLang);
}

function onQuizChoice(btn, chosenIdx, correctIdx, correctWord, l){
  if(chosenIdx===correctIdx){
    btn.classList.add("correct");
    cattoSay(`${correctWord.text} — that's right!`,"win");
    addStars(state.lang, quiz.wrongTries===0 ? 2 : 1);
    document.querySelectorAll("#choices button").forEach(b=> b.disabled=true);
    setTimeout(()=>{ quiz.index++; renderQuizQuestion(); }, 900);
  } else {
    quiz.wrongTries++;
    btn.classList.add("wrong");
    btn.disabled = true;
    cattoSay("Not quite, try again!","sad");
  }
}

/* =========================================================
   10) ALPHABET CRUSH — Match-3 Game
   ========================================================= */
const CRUSH_ROWS = 6;
const CRUSH_COLS = 6;
const CRUSH_TARGET_SCORE = 150;
const CRUSH_MAX_MOVES = 15;

const crush = { board:[], selected:null, score:0, movesLeft:CRUSH_MAX_MOVES, busy:false };

function crushIdx(r,c){ return r*CRUSH_COLS + c; }
function crushRandomTile(){ return Math.floor(Math.random() * ALPHABET_BANK[state.lang].letters.length); }

function generateCrushBoard(){
  const board = new Array(CRUSH_ROWS*CRUSH_COLS).fill(0);
  for(let r=0;r<CRUSH_ROWS;r++){
    for(let c=0;c<CRUSH_COLS;c++){
      let val, tries=0;
      do{
        val = crushRandomTile();
        tries++;
      } while(
        tries<25 && (
          (c>=2 && board[crushIdx(r,c-1)]===val && board[crushIdx(r,c-2)]===val) ||
          (r>=2 && board[crushIdx(r-1,c)]===val && board[crushIdx(r-2,c)]===val)
        )
      );
      board[crushIdx(r,c)] = val;
    }
  }
  return board;
}

function startCrushGame(){
  crush.board = generateCrushBoard();
  crush.selected = null;
  crush.score = 0;
  crush.movesLeft = CRUSH_MAX_MOVES;
  crush.busy = false;
  cattoSay("Swap letters to match 3 or more in a row!","happy");
  renderCrushGame();
}

function renderCrushGame(){
  const l = WORD_BANK[state.lang];
  app.innerHTML = `
    <section class="hub" dir="${l.dir}">
      <button class="back-btn" id="backHub">${icon('back','arrow-ic')} Back</button>
      <h2 class="hub-title">Alphabet Crush — ${l.name}</h2>
      <div class="crush-stats">
        <span class="crush-stat">${icon('star','star-ic')} Score: <b id="crushScore">${crush.score}</b> / ${CRUSH_TARGET_SCORE}</span>
        <span class="crush-stat">Moves left: <b id="crushMoves">${crush.movesLeft}</b></span>
      </div>
      <div class="crush-grid" id="crushGrid" style="grid-template-columns:repeat(${CRUSH_COLS},1fr)"></div>
    </section>
  `;
  document.getElementById("backHub").addEventListener("click", ()=> openHub(state.lang));
  renderCrushGrid();
}

function renderCrushGrid(){
  const alpha = ALPHABET_BANK[state.lang];
  const grid = document.getElementById("crushGrid");
  if(!grid) return;
  grid.innerHTML = crush.board.map((val,i)=>{
    if(val===null) return `<div class="crush-tile empty" data-i="${i}"></div>`;
    const selected = crush.selected===i ? "selected" : "";
    return `<button class="crush-tile ${selected}" data-i="${i}" style="background:${TILE_COLORS[val]}">${alpha.letters[val]}</button>`;
  }).join("");
  grid.querySelectorAll(".crush-tile:not(.empty)").forEach(el=>{
    el.addEventListener("mouseenter", ()=>{ if (typeof Sound !== 'undefined' && Sound.hover) Sound.hover(); });
    el.addEventListener("click", ()=> onCrushTileClick(parseInt(el.dataset.i,10)));
  });
}

function onCrushTileClick(i){
  if(crush.busy) return;

  if (typeof Sound !== 'undefined' && Sound.chime) Sound.chime();
  if (state.lang && ALPHABET_BANK[state.lang] && ALPHABET_BANK[state.lang].letters) {
    const letter = ALPHABET_BANK[state.lang].letters[crush.board[i]];
    if (letter) speak(letter, WORD_BANK[state.lang].speechLang);
  }

  if(crush.selected===null){
    crush.selected = i;
    renderCrushGrid();
    return;
  }
  if(crush.selected===i){
    crush.selected = null;
    renderCrushGrid();
    return;
  }

  const a = crush.selected, b = i;
  const ra=Math.floor(a/CRUSH_COLS), ca=a%CRUSH_COLS;
  const rb=Math.floor(b/CRUSH_COLS), cb=b%CRUSH_COLS;
  const isAdjacent = (Math.abs(ra-rb) + Math.abs(ca-cb)) === 1;

  if(!isAdjacent){
    crush.selected = i;
    renderCrushGrid();
    return;
  }

  crush.selected = null;
  attemptCrushSwap(a,b);
}

function attemptCrushSwap(a,b){
  crush.busy = true;
  [crush.board[a], crush.board[b]] = [crush.board[b], crush.board[a]];
  const matches = findCrushMatches();

  if(matches.size===0){
    if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();
    if (state.lang && ALPHABET_BANK[state.lang]) {
      const letter = ALPHABET_BANK[state.lang].letters[crush.board[a]];
      if (letter) speak(letter, WORD_BANK[state.lang].speechLang);
    }
    renderCrushGrid();
    setTimeout(()=>{
      [crush.board[a], crush.board[b]] = [crush.board[b], crush.board[a]];
      crush.busy = false;
      cattoSay("No match there — try another swap!","sad");
      renderCrushGrid();
    }, 350);
    return;
  }

  crush.movesLeft--;
  renderCrushGrid();
  setTimeout(resolveCrushMatches, 250);
}

function findCrushMatches(){
  const toClear = new Set();
  const NONE = Symbol("none");

  for(let r=0;r<CRUSH_ROWS;r++){
    let runStart=0;
    for(let c=1;c<=CRUSH_COLS;c++){
      const cur = c<CRUSH_COLS ? crush.board[crushIdx(r,c)] : NONE;
      const prev = crush.board[crushIdx(r,c-1)];
      if(cur!==prev){
        if(c-runStart>=3){ for(let k=runStart;k<c;k++) toClear.add(crushIdx(r,k)); }
        runStart=c;
      }
    }
  }
  for(let c=0;c<CRUSH_COLS;c++){
    let runStart=0;
    for(let r=1;r<=CRUSH_ROWS;r++){
      const cur = r<CRUSH_ROWS ? crush.board[crushIdx(r,c)] : NONE;
      const prev = crush.board[crushIdx(r-1,c)];
      if(cur!==prev){
        if(r-runStart>=3){ for(let k=runStart;k<r;k++) toClear.add(crushIdx(k,c)); }
        runStart=r;
      }
    }
  }
  return toClear;
}

function resolveCrushMatches(){
  const matches = findCrushMatches();
  if(matches.size===0){
    crush.busy = false;
    checkCrushEnd();
    return;
  }

  const firstMatchIdx = matches.values().next().value;
  const matchedVal = firstMatchIdx !== undefined ? crush.board[firstMatchIdx] : null;

  crush.score += matches.size * 10;
  matches.forEach(i=> crush.board[i] = null);
  cattoSay("Nice match!","happy");

  if (typeof Sound !== 'undefined' && Sound.match) Sound.match();
  if (matchedVal !== null && state.lang && ALPHABET_BANK[state.lang]) {
    const letter = ALPHABET_BANK[state.lang].letters[matchedVal];
    if (letter) speak(letter, WORD_BANK[state.lang].speechLang);
  }
  updateCrushStats();
  renderCrushGrid();

  setTimeout(()=>{
    cascadeCrushBoard();
    renderCrushGrid();
    setTimeout(resolveCrushMatches, 300);
  }, 300);
}

function cascadeCrushBoard(){
  for(let c=0;c<CRUSH_COLS;c++){
    let pointer = CRUSH_ROWS-1;
    for(let r=CRUSH_ROWS-1;r>=0;r--){
      const val = crush.board[crushIdx(r,c)];
      if(val!==null){
        crush.board[crushIdx(pointer,c)] = val;
        if(pointer!==r) crush.board[crushIdx(r,c)] = null;
        pointer--;
      }
    }
    for(let r=pointer;r>=0;r--){
      crush.board[crushIdx(r,c)] = crushRandomTile();
    }
  }
}

function updateCrushStats(){
  const scoreEl = document.getElementById("crushScore");
  const movesEl = document.getElementById("crushMoves");
  if(scoreEl) scoreEl.textContent = crush.score;
  if(movesEl) movesEl.textContent = crush.movesLeft;
}

function checkCrushEnd(){
  updateCrushStats();
  if(crush.score >= CRUSH_TARGET_SCORE){
    addStars(state.lang, 3);
    setTimeout(()=> renderCrushWin(), 400);
  } else if(crush.movesLeft<=0){
    setTimeout(renderCrushLose, 400);
  }
}

function renderCrushWin(){
  const l = WORD_BANK[state.lang];
  const prog = getLangProgress(state.lang);
  cattoSay("Amazing! You crushed it!","win");
  app.innerHTML = `
    <section class="crush-result">
      <span class="trophy-ic">${icon('trophy')}</span>
      <h2>You Win!</h2>
      <p>You reached ${crush.score} points in ${l.name} Alphabet Crush</p>
      <div class="result-stars">${icon('star','star-ic')} Total stars: ${prog.stars}</div>
      <div class="result-actions">
        <button class="cta-btn" id="playAgain">Play Again</button>
        <button class="cta-btn secondary" id="chooseAnother">Choose Another Game or Language</button>
      </div>
    </section>
  `;
  document.getElementById("playAgain").addEventListener("click", startCrushGame);
  document.getElementById("chooseAnother").addEventListener("click", ()=> openHub(state.lang));
}

function renderCrushLose(){
  const l = WORD_BANK[state.lang];
  cattoSay("So close! Want to try again?","sad");
  app.innerHTML = `
    <section class="crush-result">
      <h2>Out of moves!</h2>
      <p>You scored ${crush.score} out of ${CRUSH_TARGET_SCORE} in ${l.name} Alphabet Crush</p>
      <div class="result-actions">
        <button class="cta-btn" id="tryAgain">Try Again</button>
        <button class="cta-btn secondary" id="chooseAnother">Choose Another Game or Language</button>
      </div>
    </section>
  `;
  document.getElementById("tryAgain").addEventListener("click", startCrushGame);
  document.getElementById("chooseAnother").addEventListener("click", ()=> openHub(state.lang));
}

/* =========================================================
   11) CELEBRATION (for Memory & Quiz games)
   ========================================================= */
function renderCelebration(gameKey){
  const l = WORD_BANK[state.lang];
  const prog = getLangProgress(state.lang);
  cattoSay("Well done, you finished the game!","win");

  app.innerHTML = `
    <section class="celebrate">
      <span class="trophy-ic">${icon('trophy')}</span>
      <h2>Well done!</h2>
      <p>You finished the "${GAME_TYPES.find(g=>g.key===gameKey).title}" game in ${l.name}</p>
      <div class="stars-final">${icon('star','star-ic')} Total stars: ${prog.stars}</div>
      <div class="celebrate-actions">
        <button class="cta-btn" id="playAgain">Play Again</button>
        <button class="cta-btn secondary" id="chooseAnother">Choose Another Game or Language</button>
      </div>
    </section>
  `;
  document.getElementById("playAgain").addEventListener("click", ()=> startGame(gameKey));
  document.getElementById("chooseAnother").addEventListener("click", ()=> openHub(state.lang));
}

/* =========================================================
   12) MODAL EVENT HANDLERS
   ========================================================= */
document.addEventListener('DOMContentLoaded', function() {
  var closeBtn = document.getElementById('loginModalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLoginModal);
  }
  
  var modal = document.getElementById('loginRequiredModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLoginModal();
      }
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  var signinBtn = document.getElementById('loginModalSignin');
  if (signinBtn) {
    signinBtn.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingLanguage');
      if (pendingLang) {
        sessionStorage.setItem('pendingLanguageAfterAuth', pendingLang);
      }
    });
  }
  
  var signupBtn = document.getElementById('loginModalSignup');
  if (signupBtn) {
    signupBtn.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingLanguage');
      if (pendingLang) {
        sessionStorage.setItem('pendingLanguageAfterAuth', pendingLang);
      }
    });
  }
  
  var justSignedIn = sessionStorage.getItem('justSignedIn');
  if (justSignedIn === 'true') {
    sessionStorage.removeItem('justSignedIn');
    var pendingLang = sessionStorage.getItem('pendingLanguageAfterAuth') || sessionStorage.getItem('pendingLanguage');
    if (pendingLang) {
      sessionStorage.removeItem('pendingLanguage');
      sessionStorage.removeItem('pendingLanguageAfterAuth');
      setTimeout(function() {
        if (window.isUserLoggedIn && window.isUserLoggedIn()) {
          openHub(pendingLang);
        }
      }, 500);
    } else {
      window.renderHome();
    }
  }
  
  var justSignedUp = sessionStorage.getItem('justSignedUp');
  if (justSignedUp === 'true') {
    sessionStorage.removeItem('justSignedUp');
    var pendingLang = sessionStorage.getItem('pendingLanguageAfterAuth') || sessionStorage.getItem('pendingLanguage');
    if (pendingLang) {
      sessionStorage.removeItem('pendingLanguage');
      sessionStorage.removeItem('pendingLanguageAfterAuth');
      setTimeout(function() {
        if (window.isUserLoggedIn && window.isUserLoggedIn()) {
          openHub(pendingLang);
        }
      }, 500);
    } else {
      window.renderHome();
    }
  }
  
  if (typeof Sound !== 'undefined') {
    Sound._enabled = true;
    Sound._init();
  }
});

/* =========================================================
   13) BOOT
   ========================================================= */
window.renderHome();