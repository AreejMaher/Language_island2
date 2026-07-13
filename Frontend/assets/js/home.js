/* =========================================================
   HOME.JS - Merged UI and Media Functionality
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // LANGUAGE DATA - MEDIA CONFIGURATION
  // ============================================
  const languages = {
    en: { 
      name: 'English', 
      flag: 'fi-gb', 
      color: '#012169', 
      path: 'english', 
      video: 'imgs/Catto_Videos/Catto_English.webm',
      greeting: 'Hello my friend! I am Catto! 🐱',
      sound: 'Sounds/Hello.mp3'
    },
    fr: { 
      name: 'French', 
      flag: 'fi-fr', 
      color: '#002395', 
      path: 'french', 
      video: 'imgs/Catto_Videos/Catto_French.webm',
      greeting: 'Bonjour mon ami! Je suis Catto! 🐱',
      sound: 'Sounds/Bonjour mon ami, je suis Catto.mp3'
    },
    es: { 
      name: 'Spanish', 
      flag: 'fi-es', 
      color: '#C60B1E', 
      path: 'spanish', 
      video: 'imgs/Catto_Videos/Catto_Spain.webm',
      greeting: '¡Hola amigo! Soy Catto! 🐱',
      sound: 'Sounds/Hola.mp3'
    },
    it: { 
      name: 'Italian', 
      flag: 'fi-it', 
      color: '#009246', 
      path: 'italian', 
      video: 'imgs/Catto_Videos/Catto_Italy.webm',
      greeting: 'Ciao amico! Sono Catto! 🐱',
      sound: 'Sounds/Ciao.mp3'
    },
    de: { 
      name: 'German', 
      flag: 'fi-de', 
      color: '#DD0000', 
      path: 'german', 
      video: 'imgs/Catto_Videos/Catto_German.webm',
      greeting: 'Hallo mein Freund! Ich bin Catto! 🐱',
      sound: 'Sounds/Hallo.mp3'
    },
    ar: { 
      name: 'Arabic', 
      flag: 'fi-eg', 
      color: '#CE1126', 
      path: 'arabic', 
      video: 'imgs/Catto_Videos/Catto_Egypt.webm',
      greeting: 'مرحباً يا صديقي! أنا كاتو! 🐱',
      sound: 'Sounds/مرحبا صديقي.wav'
    }
  };

  const state = {
    currentLang: 'en',
    isPlaying: false,
    currentAudio: null,
    messageTimeout: null
  };

  // ============================================
  // MEDIA CONTROL FUNCTIONS
  // ============================================
  const catVideo = document.getElementById('catVideo');
  const speechBubble = document.getElementById('speechBubble');
  const speechText = document.getElementById('speechText');
  const langNavBtns = document.querySelectorAll('.lang-nav-btn');

  function stopAllMedia() {
    if (catVideo) {
      catVideo.pause();
      catVideo.currentTime = 0;
    }
    if (state.currentAudio) {
      state.currentAudio.pause();
      state.currentAudio.currentTime = 0;
      state.currentAudio = null;
    }
    if (state.messageTimeout) {
      clearTimeout(state.messageTimeout);
      state.messageTimeout = null;
    }
    if (speechBubble) {
      speechBubble.classList.remove('show');
    }
    state.isPlaying = false;
  }

  function playGreeting(langKey) {
    const lang = languages[langKey];
    if (!lang) return;
    
    stopAllMedia();
    state.currentLang = langKey;
    state.isPlaying = true;

    // 1. Play Video
    if (catVideo && lang.video) {
      catVideo.src = lang.video;
      catVideo.load();
      catVideo.play().catch(e => console.log('Video autoplay blocked:', e));
      
      catVideo.classList.remove('talking');
      void catVideo.offsetWidth; // Trigger reflow
      catVideo.classList.add('talking');
    }

    // 2. Play Audio
    if (lang.sound) {
      try {
        const audio = new Audio(lang.sound);
        audio.volume = 0.8;
        state.currentAudio = audio;
        audio.play().catch(e => console.log('Sound play failed:', e));
      } catch(e) { console.log('Audio error:', e); }
    }

    // 3. Show Speech Bubble
    if (speechText && speechBubble) {
      speechText.textContent = lang.greeting;
      speechText.style.color = lang.color;
      speechBubble.style.borderColor = lang.color;
      speechBubble.classList.add('show');
      
      state.messageTimeout = setTimeout(() => {
        speechBubble.classList.remove('show');
        state.isPlaying = false;
      }, 5000);
    }
  }

  // Language Navbar Listeners
  langNavBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const lang = this.dataset.lang;
      
      if (lang === state.currentLang && state.isPlaying) return;
      
      langNavBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      playGreeting(lang);
    });
  });

  // Random Greeting on Catto Click
  if (catVideo) {
    catVideo.addEventListener('click', () => {
      const langKeys = Object.keys(languages);
      const randomLang = langKeys[Math.floor(Math.random() * langKeys.length)];
      
      langNavBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.lang === randomLang);
      });
      playGreeting(randomLang);
      if (typeof Sound !== 'undefined') Sound.pop();
    });
  }

  // Initial Auto-Play Greeting
  setTimeout(() => {
    const activeBtn = document.querySelector('.lang-nav-btn.active');
    playGreeting(activeBtn ? activeBtn.dataset.lang : 'en');
  }, 800);


  // ============================================
  // SIDEBAR & UI FUNCTIONALITY
  // ============================================
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');

  function closeSidebar() {
    if(sidebar) sidebar.classList.remove('open');
    if(sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        sidebar.classList.add('open');
        if(sidebarOverlay) sidebarOverlay.classList.add('active');
      }
    });
  }

  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // Logout Logic safely tied to PHP Auth system
  const logoutBtn = document.getElementById('menuLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        closeSidebar();
        if(typeof Auth !== 'undefined') Auth.logout(); 
      }
    });
  }


  // ============================================
  // MODALS & BUTTON ROUTING
  // ============================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (typeof Sound !== 'undefined') Sound.pop();
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Populate Language Modal Grid dynamically
  function setupLanguageModal() {
    const grid = document.getElementById('languageGridModal');
    if (!grid) return;
    
    const langImages = {
      ar: 'imgs/buttons/arabic.png', en: 'imgs/buttons/English.png',
      fr: 'imgs/buttons/French.png', de: 'imgs/buttons/GermanCatto.png',
      it: 'imgs/buttons/Italy.png', es: 'imgs/buttons/Spain.png'
    };
    
    let html = '';
    for (const key in languages) {
      const lang = languages[key];
      const imgSrc = langImages[key] || 'imgs/buttons/default.png';
      html += `
        <button class="lang-image-btn interactive" data-lang="${key}">
          <img src="${imgSrc}" alt="${lang.name}" onerror="this.src='imgs/buttons/default.png'">
          <span class="lang-label">${lang.name}</span>
        </button>
      `;
    }
    grid.innerHTML = html;
    
    grid.querySelectorAll('.lang-image-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const lang = languages[this.dataset.lang];
        if (typeof Sound !== 'undefined') Sound.pop();
        window.location.href = 'language/' + lang.path + '.html';
      });
    });
  }
  setupLanguageModal();

  // Central Router for "Start" and "Meet Catto" buttons
  function handleMainAction(e) {
    e.preventDefault();
    if (typeof Sound !== 'undefined') Sound.pop();
    
    if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
      openModal('languageModal');
    } else {
      openModal('loginRequiredModal');
    }
  }

  const startBtn = document.getElementById('startBtn');
  const meetBtn = document.getElementById('meetCattoBtn');
  if (startBtn) startBtn.addEventListener('click', handleMainAction);
  if (meetBtn) meetBtn.addEventListener('click', handleMainAction);

  // Modal Closers
  document.getElementById('loginModalClose')?.addEventListener('click', () => closeModal('loginRequiredModal'));
  document.getElementById('languageModalClose')?.addEventListener('click', () => closeModal('languageModal'));
  
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', function(e) {
      if (e.target === this) closeModal(this.id);
    });
  });

  // ============================================
  // GLOBAL TOAST FUNCTION
  // ============================================
  window.showToast = function(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
    }
  };

  // Check recent Sign-In statuses
  if (sessionStorage.getItem('justSignedIn') === 'true') {
    sessionStorage.removeItem('justSignedIn');
    setTimeout(() => { if (Auth.isLoggedIn()) { showToast('👋 Welcome back!'); openModal('languageModal'); }}, 300);
  }
  if (sessionStorage.getItem('justSignedUp') === 'true') {
    sessionStorage.removeItem('justSignedUp');
    setTimeout(() => { if (Auth.isLoggedIn()) { showToast('🎉 Welcome to Language Island!'); openModal('languageModal'); }}, 300);
  }

  console.log('✅ Home page merged securely with PHP backend!');
});