/* =========================================================
   LISTENING.JS - Complete Listening Page with Letters and Words
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {

  // =========================================================
  // LANGUAGE DATA
  // =========================================================
  var languages = {
    en: { name: 'English', flag: 'fi-gb', color: '#4C8DAF', path: 'english', speechLang: 'en-US' },
    ar: { name: 'Arabic', flag: 'fi-eg', color: '#58C27D', path: 'arabic', speechLang: 'ar-SA' },
    de: { name: 'German', flag: 'fi-de', color: '#8C6FC9', path: 'german', speechLang: 'de-DE' },
    es: { name: 'Spanish', flag: 'fi-es', color: '#FF6F59', path: 'spanish', speechLang: 'es-ES' },
    fr: { name: 'French', flag: 'fi-fr', color: '#FFB84D', path: 'french', speechLang: 'fr-FR' },
    it: { name: 'Italian', flag: 'fi-it', color: '#E5563F', path: 'italian', speechLang: 'it-IT' }
  };

  // Language button images
  var langImages = {
    ar: 'imgs/Listening/AR-Listening.png',
    en: 'imgs/Listening/EN-Listening.png',
    fr: 'imgs/Listening/EN-Listening.png',
    de: 'imgs/Listening/EN-Listening.png',
    it: 'imgs/Listening/EN-Listening.png',
    es: 'imgs/Listening/EN-Listening.png'
  };

  // =========================================================
  // LETTERS AND WORDS DATA BY LANGUAGE
  // =========================================================
  var listeningData = {
    en: {
      letters: [
        { char: 'A', name: 'A', sound: '/eɪ/' },
        { char: 'B', name: 'B', sound: '/biː/' },
        { char: 'C', name: 'C', sound: '/siː/' }
      ],
      words: {
        'A': [
          { word: 'Apple', translation: 'تفاحة', image: 'imgs/Listening/Apple-L.png' },
          { word: 'Ant', translation: 'نملة', image: 'imgs/Listening/Ant.png' },
          { word: 'Alligator', translation: 'تمساح', image: 'imgs/Listening/Alligator-L.png' }
        ],
        'B': [
          { word: 'Ball', translation: 'كرة', image: 'imgs/Listening/Ball-L.png' },
          { word: 'Bird', translation: 'طائر', image: 'imgs/Listening/Bird-L.png' },
          { word: 'Butterfly', translation: 'فراشة', image: 'imgs/Listening/Butterfly-L.png' }
        ],
        'C': [
          { word: 'Cat', translation: 'قطة', image: 'imgs/Listening/Cat-L.png' },
          { word: 'Car', translation: 'سيارة', image: 'imgs/Listening/Car-L.png' },
          { word: 'Cup', translation: 'كوب', image: 'imgs/Listening/Cup-L.png' }
        ]
      }
    },
    ar: {
      letters: [
        { char: 'أ', name: 'ألف', sound: '/ʔalif/' },
        { char: 'ب', name: 'باء', sound: '/baːʔ/' },
        { char: 'ت', name: 'تاء', sound: '/taːʔ/' }
      ],
      words: {
        'أ': [
          { word: 'أرنب', translation: 'Rabbit', image: 'imgs/Listening/Arnab-L.png' },
          { word: 'أسد', translation: 'Lion', image: 'imgs/Listening/Asad-L.png' },
          { word: 'أفعى', translation: 'Snake', image: 'imgs/Listening/Afaa-L.png' }
        ],
        'ب': [
          { word: 'بطة', translation: 'Duck', image: 'imgs/Listening/Batta-L.png' },
          { word: 'بيت', translation: 'House', image: 'imgs/Listening/Bayt-L.png' },
          { word: 'باب', translation: 'Door', image: 'imgs/Listening/Bab-L.png' }
        ],
        'ت': [
          { word: 'تفاحة', translation: 'Apple', image: 'imgs/Listening/Tufaha-L.png' },
          { word: 'تاج', translation: 'Crown', image: 'imgs/Listening/Taj-L.png' },
          { word: 'تمر', translation: 'Dates', image: 'imgs/Listening/Tamar-L.png' }
        ]
      }
    },
    es: {
      letters: [
        { char: 'A', name: 'A', sound: '/a/' },
        { char: 'B', name: 'Be', sound: '/be/' },
        { char: 'C', name: 'Ce', sound: '/θe/' }
      ],
      words: {
        'A': [
          { word: 'Abeja', translation: 'Bee', image: 'imgs/Listening/Abeja-L.png' },
          { word: 'Árbol', translation: 'Tree', image: 'imgs/Listening/Arbol-L.png' },
          { word: 'Agua', translation: 'Water', image: 'imgs/Listening/Agua-L.png' }
        ],
        'B': [
          { word: 'Bola', translation: 'Ball', image: 'imgs/Listening/Bola-L.png' },
          { word: 'Barco', translation: 'Boat', image: 'imgs/Listening/Barco-L.png' },
          { word: 'Beso', translation: 'Kiss', image: 'imgs/Listening/Beso-L.png' }
        ],
        'C': [
          { word: 'Casa', translation: 'House', image: 'imgs/Listening/Casa-L.png' },
          { word: 'Coche', translation: 'Car', image: 'imgs/Listening/Coche-L.png' },
          { word: 'Cielo', translation: 'Sky', image: 'imgs/Listening/Cielo-L.png' }
        ]
      }
    },
    fr: {
      letters: [
        { char: 'A', name: 'A', sound: '/a/' },
        { char: 'B', name: 'Bé', sound: '/be/' },
        { char: 'C', name: 'Cé', sound: '/se/' }
      ],
      words: {
        'A': [
          { word: 'Avion', translation: 'Plane', image: 'imgs/Listening/Avion-L.png' },
          { word: 'Arbre', translation: 'Tree', image: 'imgs/Listening/Arbre-L.png' },
          { word: 'Eau', translation: 'Water', image: 'imgs/Listening/Eau-L.png' }
        ],
        'B': [
          { word: 'Bateau', translation: 'Boat', image: 'imgs/Listening/Bateau-L.png' },
          { word: 'Balle', translation: 'Ball', image: 'imgs/Listening/Balle-L.png' },
          { word: 'Bonbon', translation: 'Candy', image: 'imgs/Listening/Bonbon-L.png' }
        ],
        'C': [
          { word: 'Chat', translation: 'Cat', image: 'imgs/Listening/Chat-L.png' },
          { word: 'Chien', translation: 'Dog', image: 'imgs/Listening/Chien-L.png' },
          { word: 'Ciel', translation: 'Sky', image: 'imgs/Listening/Ciel-L.png' }
        ]
      }
    },
    de: {
      letters: [
        { char: 'A', name: 'A', sound: '/aː/' },
        { char: 'B', name: 'Be', sound: '/beː/' },
        { char: 'C', name: 'Ce', sound: '/tseː/' }
      ],
      words: {
        'A': [
          { word: 'Apfel', translation: 'Apple', image: 'imgs/Listening/Apfel-L.png' },
          { word: 'Auto', translation: 'Car', image: 'imgs/Listening/Auto-L.png' },
          { word: 'Adler', translation: 'Eagle', image: 'imgs/Listening/Adler-L.png' }
        ],
        'B': [
          { word: 'Ball', translation: 'Ball', image: 'imgs/Listening/Ball-DE.png' },
          { word: 'Bär', translation: 'Bear', image: 'imgs/Listening/Baer-L.png' },
          { word: 'Blume', translation: 'Flower', image: 'imgs/Listening/Blume-L.png' }
        ],
        'C': [
          { word: 'Computer', translation: 'Computer', image: 'imgs/Listening/Computer-L.png' },
          { word: 'Clown', translation: 'Clown', image: 'imgs/Listening/Clown-L.png' },
          { word: 'Creme', translation: 'Cream', image: 'imgs/Listening/Creme-L.png' }
        ]
      }
    },
    it: {
      letters: [
        { char: 'A', name: 'A', sound: '/a/' },
        { char: 'B', name: 'Bi', sound: '/bi/' },
        { char: 'C', name: 'Ci', sound: '/tʃi/' }
      ],
      words: {
        'A': [
          { word: 'Albero', translation: 'Tree', image: 'imgs/Listening/Albero-L.png' },
          { word: 'Ape', translation: 'Bee', image: 'imgs/Listening/Ape-L.png' },
          { word: 'Amico', translation: 'Friend', image: 'imgs/Listening/Amico-L.png' }
        ],
        'B': [
          { word: 'Bambino', translation: 'Child', image: 'imgs/Listening/Bambino-L.png' },
          { word: 'Barca', translation: 'Boat', image: 'imgs/Listening/Barca-L.png' },
          { word: 'Bocca', translation: 'Mouth', image: 'imgs/Listening/Bocca-L.png' }
        ],
        'C': [
          { word: 'Cane', translation: 'Dog', image: 'imgs/Listening/Cane-L.png' },
          { word: 'Casa', translation: 'House', image: 'imgs/Listening/Casa-IT.png' },
          { word: 'Cielo', translation: 'Sky', image: 'imgs/Listening/Cielo-IT.png' }
        ]
      }
    }
  };

  // =========================================================
  // MODAL CONTROLS
  // =========================================================
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

  // =========================================================
  // TOAST
  // =========================================================
  function showToast(message) {
    var toast = document.getElementById('toast');
    var toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      clearTimeout(toast._timer);
      toast._timer = setTimeout(function() {
        toast.classList.remove('show');
      }, 2500);
    }
  }

  // =========================================================
  // SPEECH SYNTHESIS
  // =========================================================
  var synth = window.speechSynthesis;
  var activeSpeech = null;

  function speakText(text, langCode, callback) {
    if (!synth) {
      showToast('⚠️ This device does not support speech synthesis.');
      return;
    }

    if (synth.speaking) {
      synth.cancel();
    }

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.85;
    utterance.pitch = 1.1;

    utterance.onend = function() {
      if (callback) callback();
      if (typeof Sound !== 'undefined') Sound.chime();
    };

    utterance.onerror = function() {
      showToast('⚠️ Could not speak. Please try again.');
    };

    activeSpeech = utterance;
    synth.speak(utterance);

    if (typeof Sound !== 'undefined') Sound.pop();
  }

  function speakLetter(letter, langCode) {
    speakText(letter, langCode);
  }

  function speakWord(word, langCode) {
    speakText(word, langCode);
  }

  // =========================================================
  // RENDER LANGUAGE SELECTION
  // =========================================================
  function renderLanguageSelection() {
    var grid = document.getElementById('langGridListening');
    if (!grid) return;

    var html = '';
    var langKeys = Object.keys(languages);
    langKeys.forEach(function(key) {
      var lang = languages[key];
      var imgSrc = langImages[key] || 'imgs/buttons/default.png';
      html += `
        <button class="lang-listening-btn" data-lang="${key}">
          <img src="${imgSrc}" alt="${lang.name}" onerror="this.src='imgs/buttons/default.png'">
          <span class="lang-label">${lang.name}</span>
        </button>
      `;
    });
    grid.innerHTML = html;

    grid.querySelectorAll('.lang-listening-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var langKey = this.dataset.lang;
        if (typeof Sound !== 'undefined') Sound.pop();
        
        if (window.isUserLoggedIn && window.isUserLoggedIn()) {
          showContentForLanguage(langKey);
        } else {
          sessionStorage.setItem('pendingListeningLang', langKey);
          openLoginModal();
        }
      });
    });

    if (window.updateLoginStatus) window.updateLoginStatus();
  }

  // =========================================================
  // UPDATE LOGIN STATUS
  // =========================================================
  // Exposed globally so header.js can trigger it when DB loads
  window.updateLoginStatus = function() {
    var msg = document.getElementById('loginStatusMsg');
    if (msg) {
      if (window.isUserLoggedIn && window.isUserLoggedIn()) {
        var user = window.getCurrentUser ? window.getCurrentUser() : null;
        var name = user ? (user.first_name || user.name || 'Explorer') : 'Explorer';
        msg.textContent = 'Welcome, ' + name + '! Pick a language to start listening!';
        msg.style.color = 'var(--grass)';
      } else {
        msg.textContent = '🔐 Sign in to unlock all listening activities!';
        msg.style.color = 'var(--coral)';
      }
    }
  }

  // =========================================================
  // SHOW CONTENT FOR LANGUAGE
  // =========================================================
  var currentLang = null;
  var currentLetter = null;

  function showContentForLanguage(langKey) {
    currentLang = langKey;
    var lang = languages[langKey];
    var data = listeningData[langKey];

    if (!data) {
      showToast('⚠️ No content available for this language yet.');
      return;
    }

    var langSelection = document.getElementById('langSelection');
    var contentSection = document.getElementById('contentSection');
    var selectedLangName = document.getElementById('selectedLangName');
    
    if (langSelection) langSelection.style.display = 'none';
    if (contentSection) contentSection.style.display = 'block';
    if (selectedLangName) selectedLangName.textContent = lang.name;

    renderLetters(langKey, data);
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================
  // RENDER LETTERS - CENTERED
  // =========================================================
  function renderLetters(langKey, data) {
    var grid = document.getElementById('lettersGrid');
    grid.innerHTML = '';

    // Create a container for centered letters
    var container = document.createElement('div');
    container.className = 'letters-container';
    
    data.letters.forEach(function(letter) {
      var card = document.createElement('div');
      card.className = 'letter-card interactive';
      card.innerHTML = `
        <button class="letter-play" data-letter="${letter.char}" data-lang="${langKey}" aria-label="Listen to ${letter.name}">
          <i class="fas fa-play"></i>
        </button>
        <span class="letter-char">${letter.char}</span>
        <span class="letter-name">${letter.name}</span>
        <span class="letter-sound">${letter.sound}</span>
      `;
      card.addEventListener('click', function(e) {
        if (!e.target.closest('.letter-play')) {
          showWordsForLetter(langKey, letter.char);
        }
      });
      container.appendChild(card);
    });
    
    grid.appendChild(container);

    grid.querySelectorAll('.letter-play').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var letter = this.dataset.letter;
        var lang = languages[this.dataset.lang];
        if (lang) {
          var playBtn = this;
          playBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
          speakLetter(letter, lang.speechLang);
          setTimeout(function() {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
          }, 1500);
        }
      });
    });

    document.getElementById('wordsSection').style.display = 'none';
    document.getElementById('lettersGrid').style.display = 'block';
  }

  // =========================================================
  // SHOW WORDS FOR LETTER - WITH BACK BUTTON
  // =========================================================
  function showWordsForLetter(langKey, letterChar) {
    var data = listeningData[langKey];
    if (!data || !data.words[letterChar]) {
      showToast('⚠️ No words for this letter yet.');
      return;
    }

    currentLetter = letterChar;
    var words = data.words[letterChar];
    var letterInfo = data.letters.find(function(l) { return l.char === letterChar; });

    // Hide letters grid, show words section
    document.getElementById('lettersGrid').style.display = 'none';
    document.getElementById('wordsSection').style.display = 'block';
    document.getElementById('selectedLetterTitle').textContent = 'Letter ' + letterChar + ' - ' + (letterInfo ? letterInfo.name : '');

    var grid = document.getElementById('wordsGrid');
    grid.innerHTML = '';

    words.forEach(function(word) {
      var card = document.createElement('div');
      card.className = 'word-card interactive';
      
      var imageHtml = '';
      if (word.image) {
        imageHtml = `<img src="${word.image}" alt="${word.word}" onerror="this.parentElement.innerHTML='<span class=\\'placeholder-icon\\'>📄</span>'">`;
      } else {
        imageHtml = `<span class="placeholder-icon">📄</span>`;
      }

      card.innerHTML = `
        <div class="word-image">${imageHtml}</div>
        <span class="word-text">${word.word}</span>
        <span class="word-translation">${word.translation}</span>
        <button class="word-play-btn" data-word="${word.word}" data-lang="${langKey}">
          <i class="fas fa-volume-up"></i> Listen
        </button>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll('.word-play-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var word = this.dataset.word;
        var lang = languages[this.dataset.lang];
        if (lang) {
          var playBtn = this;
          playBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Speaking...';
          playBtn.classList.add('playing');
          speakWord(word, lang.speechLang);
          setTimeout(function() {
            playBtn.innerHTML = '<i class="fas fa-volume-up"></i> Listen';
            playBtn.classList.remove('playing');
          }, 2000);
        }
      });
    });

    document.getElementById('wordsSection').scrollIntoView({ behavior: 'smooth' });
  }

  // =========================================================
  // BACK TO LETTERS - FIXED
  // =========================================================
  var backToLettersBtn = document.getElementById('backToLetters');
  if (backToLettersBtn) {
    backToLettersBtn.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
      document.getElementById('wordsSection').style.display = 'none';
      document.getElementById('lettersGrid').style.display = 'block';
      document.getElementById('lettersGrid').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================================
  // BACK TO LANGUAGES
  // =========================================================
  var backToLangsBtn = document.getElementById('backToLangs');
  if (backToLangsBtn) {
    backToLangsBtn.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
      var contentSection = document.getElementById('contentSection');
      var langSelection = document.getElementById('langSelection');
      if (contentSection) contentSection.style.display = 'none';
      if (langSelection) langSelection.style.display = 'block';
      if (langSelection) langSelection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================================
  // LOGIN MODAL EVENT HANDLERS
  // =========================================================
  var loginModalClose = document.getElementById('loginModalClose');
  if (loginModalClose) {
    loginModalClose.addEventListener('click', closeLoginModal);
  }

  var loginRequiredModal = document.getElementById('loginRequiredModal');
  if (loginRequiredModal) {
    loginRequiredModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLoginModal();
      }
    });
  }

  var loginModalSignin = document.getElementById('loginModalSignin');
  if (loginModalSignin) {
    loginModalSignin.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingListeningLang');
      if (pendingLang) {
        sessionStorage.setItem('pendingListeningLangAfterAuth', pendingLang);
      }
    });
  }

  var loginModalSignup = document.getElementById('loginModalSignup');
  if (loginModalSignup) {
    loginModalSignup.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingListeningLang');
      if (pendingLang) {
        sessionStorage.setItem('pendingListeningLangAfterAuth', pendingLang);
      }
    });
  }

  // =========================================================
  // CHECK FOR RETURN FROM LOGIN
  // =========================================================
  function checkReturnFromLogin() {
    var justSignedIn = sessionStorage.getItem('justSignedIn');
    if (justSignedIn === 'true') {
      sessionStorage.removeItem('justSignedIn');
      var pendingLang = sessionStorage.getItem('pendingListeningLangAfterAuth') || sessionStorage.getItem('pendingListeningLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingListeningLang');
        sessionStorage.removeItem('pendingListeningLangAfterAuth');
        setTimeout(function() {
          if (window.isUserLoggedIn && window.isUserLoggedIn()) {
            showContentForLanguage(pendingLang);
            showToast('Welcome back! Start listening!');
          }
        }, 500);
      } else {
        setTimeout(function() {
          if(window.updateLoginStatus) window.updateLoginStatus();
          showToast('Welcome back!');
        }, 500);
      }
    }

    var justSignedUp = sessionStorage.getItem('justSignedUp');
    if (justSignedUp === 'true') {
      sessionStorage.removeItem('justSignedUp');
      var pendingLang = sessionStorage.getItem('pendingListeningLangAfterAuth') || sessionStorage.getItem('pendingListeningLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingListeningLang');
        sessionStorage.removeItem('pendingListeningLangAfterAuth');
        setTimeout(function() {
          if (window.isUserLoggedIn && window.isUserLoggedIn()) {
            showContentForLanguage(pendingLang);
            showToast('🎉 Welcome! Start your listening adventure!');
          }
        }, 500);
      } else {
        setTimeout(function() {
          if(window.updateLoginStatus) window.updateLoginStatus();
          showToast('🎉 Welcome to Language Island!');
        }, 500);
      }
    }
  }

  // =========================================================
  // KEYBOARD SHORTCUTS
  // =========================================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
      if (synth.speaking) {
        synth.cancel();
      }
    }
  });

  // =========================================================
  // CLEAN UP ON PAGE UNLOAD
  // =========================================================
  window.addEventListener('beforeunload', function() {
    if (synth) {
      synth.cancel();
    }
  });

  // =========================================================
  // SOUND SYSTEM
  // =========================================================
  if (typeof Sound !== 'undefined') {
    Sound._enabled = true;
    Sound._init();
  }

  // =========================================================
  // UPDATE STARS
  // =========================================================
  function updateTotalStars() {
    var p = {};
    try {
      p = JSON.parse(localStorage.getItem('language-island-games-progress')) || {};
    } catch(e) {}
    var total = 0;
    Object.values(p).forEach(function(v) { total += v.stars || 0; });
    var el = document.getElementById('totalStars');
    if (el) el.textContent = total;
  }

  // =========================================================
  // INIT
  // =========================================================
  renderLanguageSelection();
  checkReturnFromLogin();
  updateTotalStars();

  console.log('🎧 Listening page loaded!');
});