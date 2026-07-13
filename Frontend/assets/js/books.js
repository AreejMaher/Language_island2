/* =========================================================
   BOOKS PAGE - Complete JavaScript with Images
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {

  // =========================================================
  // LANGUAGE DATA
  // =========================================================
  var languages = {
    en: { name: 'English', flag: 'fi-gb', color: '#4C8DAF', path: 'english' },
    ar: { name: 'Arabic', flag: 'fi-eg', color: '#58C27D', path: 'arabic' },
    de: { name: 'German', flag: 'fi-de', color: '#8C6FC9', path: 'german' },
    es: { name: 'Spanish', flag: 'fi-es', color: '#FF6F59', path: 'spanish' },
    fr: { name: 'French', flag: 'fi-fr', color: '#FFB84D', path: 'french' },
    it: { name: 'Italian', flag: 'fi-it', color: '#E5563F', path: 'italian' }
  };

  // Language button images
  var langImages = {
    ar: 'imgs/BooksPage/AR-Button.png',
    en: 'imgs/BooksPage/EN-Button.png',
    fr: 'imgs/BooksPage/FN-Button.png',
    de: 'imgs/BooksPage/DE-Button.png',
    it: 'imgs/BooksPage/IT-Button.png',
    es: 'imgs/BooksPage/SP-Button.png'
  };

  // =========================================================
  // BOOK DATA BY LANGUAGE - WITH IMAGES
  // =========================================================
  var booksData = {
    en: [
      { 
        cover: 'imgs/Books/EN_Book/Catto_Alphabet_bookCover.png',
        color: '#58C27D', 
        title: 'Alphabet Adventure', 
        tag: 'Beginner',
        isImageCover: true,
        pages: [
          'imgs/Books/EN_Book/EN_Book_Alphabets_Page1.png',
          'imgs/Books/EN_Book/EN_Book_Alphabets_Page2.png',
          'imgs/Books/EN_Book/EN_Book_Alphabets_Page3.png',
          'imgs/Books/EN_Book/EN_Book_Alphabets_Page4.png',
          'imgs/Books/EN_Book/EN_Book_Alphabets_Page5.png'
        ],
        pageTexts: [
          'Page 1: Learn the alphabet!',
          'Page 2: A is for Apple 🍎',
          'Page 3: B is for Ball ⚽',
          'Page 4: C is for Cat 🐱',
          'Page 5: Great job! You learned the alphabet! 🌟'
        ]
      },
      { cover: '📘', color: '#6EC6FF', title: 'Zaza Goes Fishing', tag: 'Beginner',
        pages: ['Page 1: Zaza the fox goes to the sea. 🦊', 'Page 2: Zaza sees a blue fish. 🐟'],
        pageTexts: ['Page 1: Zaza the fox goes to the sea. 🦊', 'Page 2: Zaza sees a blue fish. 🐟'] },
      { cover: '📙', color: '#FFB84D', title: 'My Family', tag: 'Beginner',
        pages: ['Page 1: This is my family. 👨‍👩‍👧‍👦', 'Page 2: Mom, dad, and me. ❤️'],
        pageTexts: ['Page 1: This is my family. 👨‍👩‍👧‍👦', 'Page 2: Mom, dad, and me. ❤️'] },
      { cover: '📕', color: '#FF6F59', title: 'The Lost Star', tag: 'Coming soon', locked: true, pages: [], pageTexts: [] },
      { cover: '📓', color: '#B79CED', title: 'Market Day', tag: 'Coming soon', locked: true, pages: [], pageTexts: [] },
      { cover: '📔', color: '#FF8A5B', title: 'Rainy Day Fun', tag: 'Coming soon', locked: true, pages: [], pageTexts: [] }
    ],
    ar: [
      { cover: '📗', color: '#58C27D', title: 'رحلة الأبجدية', tag: 'مبتدئ',
        pages: ['صفحة 1: تعلم الحروف العربية!', 'صفحة 2: أ هو أرنب 🐰', 'صفحة 3: ب هو بطة 🦆', 'صفحة 4: ت هو تفاحة 🍎', 'صفحة 5: أحسنت! لقد تعلمت الحروف! 🌟'],
        pageTexts: ['صفحة 1: تعلم الحروف العربية!', 'صفحة 2: أ هو أرنب 🐰', 'صفحة 3: ب هو بطة 🦆', 'صفحة 4: ت هو تفاحة 🍎', 'صفحة 5: أحسنت! لقد تعلمت الحروف! 🌟'] },
      { cover: '📘', color: '#6EC6FF', title: 'زازا يذهب للصيد', tag: 'مبتدئ',
        pages: ['صفحة 1: زازا الثعلب يذهب إلى البحر.', 'صفحة 2: زازا يرى سمكة زرقاء.'],
        pageTexts: ['صفحة 1: زازا الثعلب يذهب إلى البحر.', 'صفحة 2: زازا يرى سمكة زرقاء.'] },
      { cover: '📙', color: '#FFB84D', title: 'عائلتي', tag: 'مبتدئ',
        pages: ['صفحة 1: هذه عائلتي.', 'صفحة 2: أمي، أبي وأنا.'],
        pageTexts: ['صفحة 1: هذه عائلتي.', 'صفحة 2: أمي، أبي وأنا.'] }
    ],
    es: [
      { cover: '📗', color: '#58C27D', title: 'Aventura del Alfabeto', tag: 'Principiante',
        pages: ['Página 1: ¡Aprende el alfabeto!', 'Página 2: A es para Abeja 🐝', 'Página 3: B es para Bola ⚽', 'Página 4: C es para Casa 🏠', 'Página 5: ¡Buen trabajo! ¡Aprendiste el alfabeto! 🌟'],
        pageTexts: ['Página 1: ¡Aprende el alfabeto!', 'Página 2: A es para Abeja 🐝', 'Página 3: B es para Bola ⚽', 'Página 4: C es para Casa 🏠', 'Página 5: ¡Buen trabajo! ¡Aprendiste el alfabeto! 🌟'] },
      { cover: '📘', color: '#6EC6FF', title: 'Zaza Va a Pescar', tag: 'Principiante',
        pages: ['Página 1: Zaza el zorro va al mar.', 'Página 2: Zaza ve un pez azul.'],
        pageTexts: ['Página 1: Zaza el zorro va al mar.', 'Página 2: Zaza ve un pez azul.'] }
    ],
    fr: [
      { cover: '📗', color: '#58C27D', title: 'Aventure de l\'Alphabet', tag: 'Débutant',
        pages: ['Page 1: Apprenez l\'alphabet!', 'Page 2: A est pour Avion ✈️', 'Page 3: B est pour Bateau 🚢', 'Page 4: C est pour Chat 🐱', 'Page 5: Bon travail! Vous avez appris l\'alphabet! 🌟'],
        pageTexts: ['Page 1: Apprenez l\'alphabet!', 'Page 2: A est pour Avion ✈️', 'Page 3: B est pour Bateau 🚢', 'Page 4: C est pour Chat 🐱', 'Page 5: Bon travail! Vous avez appris l\'alphabet! 🌟'] }
    ],
    de: [
      { cover: '📗', color: '#58C27D', title: 'Abenteuer Alphabet', tag: 'Anfänger',
        pages: ['Seite 1: Lerne das Alphabet!', 'Seite 2: A ist für Apfel 🍎', 'Seite 3: B ist für Ball ⚽', 'Seite 4: C ist für Computer 💻', 'Seite 5: Großartig! Du hast das Alphabet gelernt! 🌟'],
        pageTexts: ['Seite 1: Lerne das Alphabet!', 'Seite 2: A ist für Apfel 🍎', 'Seite 3: B ist für Ball ⚽', 'Seite 4: C ist für Computer 💻', 'Seite 5: Großartig! Du hast das Alphabet gelernt! 🌟'] }
    ],
    it: [
      { cover: '📗', color: '#58C27D', title: 'Avventura dell\'Alfabeto', tag: 'Principiante',
        pages: ['Pagina 1: Impara l\'alfabeto!', 'Pagina 2: A è per Albero 🌳', 'Pagina 3: B è per Barca 🚢', 'Pagina 4: C è per Cane 🐶', 'Pagina 5: Ottimo lavoro! Hai imparato l\'alfabeto! 🌟'],
        pageTexts: ['Pagina 1: Impara l\'alfabeto!', 'Pagina 2: A è per Albero 🌳', 'Pagina 3: B è per Barca 🚢', 'Pagina 4: C è per Cane 🐶', 'Pagina 5: Ottimo lavoro! Hai imparato l\'alfabeto! 🌟'] }
    ]
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

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
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
  // RENDER LANGUAGE SELECTION
  // =========================================================
  function renderLanguageSelection() {
    var grid = document.getElementById('langGridBooks');
    if (!grid) return;

    var html = '';
    var langKeys = Object.keys(languages);
    langKeys.forEach(function(key) {
      var lang = languages[key];
      var imgSrc = langImages[key] || 'imgs/buttons/default.png';
      html += `
        <button class="lang-book-btn" data-lang="${key}">
          <img src="${imgSrc}" alt="${lang.name}" onerror="this.src='imgs/buttons/default.png'">
          <span class="lang-label">${lang.name}</span>
        </button>
      `;
    });
    grid.innerHTML = html;

    grid.querySelectorAll('.lang-book-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var langKey = this.dataset.lang;
        if (typeof Sound !== 'undefined') Sound.pop();
        
        if (window.isUserLoggedIn && window.isUserLoggedIn()) {
          showBooksForLanguage(langKey);
        } else {
          sessionStorage.setItem('pendingBookLang', langKey);
          openLoginModal();
        }
      });
    });

    updateLoginStatus();
  }

  // =========================================================
  // UPDATE LOGIN STATUS
  // =========================================================
  // Make this accessible to header.js so it can refresh the UI when DB loads
  window.updateLoginStatus = function() {
    var msg = document.getElementById('loginStatusMsg');
    if (msg) {
      if (window.isUserLoggedIn && window.isUserLoggedIn()) {
        var user = window.getCurrentUser ? window.getCurrentUser() : null;
        var name = user ? (user.first_name || user.name || 'Explorer') : 'Explorer';
        msg.textContent = 'Welcome, ' + name + '! Pick a language to start reading!';
        msg.style.color = 'var(--grass)';
      } else {
        msg.textContent = '🔐 Sign in to unlock all books and track your progress!';
        msg.style.color = 'var(--coral)';
      }
    }
  }

  // =========================================================
  // SHOW BOOKS FOR LANGUAGE - UPDATED WITH REDESIGN
  // =========================================================
  function showBooksForLanguage(langKey) {
    var books = booksData[langKey] || [];
    var lang = languages[langKey] || { name: 'Unknown' };

    var langSelection = document.getElementById('langSelection');
    var booksSection = document.getElementById('booksSection');
    var selectedLangName = document.getElementById('selectedLangName');
    
    if (langSelection) langSelection.style.display = 'none';
    if (booksSection) booksSection.style.display = 'block';
    if (selectedLangName) selectedLangName.textContent = lang.name;

    var grid = document.getElementById('bookGrid');
    if (!grid) return;
    grid.innerHTML = '';

    books.forEach(function(book, index) {
      var card = document.createElement('button');
      var isFeatured = index === 0 && !book.locked;
      var isLocked = book.locked || false;
      
      card.className = 'content-card';
      if (isFeatured) card.classList.add('featured');
      if (isLocked) card.classList.add('locked-card');
      
      // Build cover HTML
      var coverHtml = '';
      if (book.isImageCover && book.cover) {
        coverHtml = `<img src="${book.cover}" alt="${book.title}" class="book-cover-image" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:64px;\\'>📖</span>'">`;
      } else {
        coverHtml = `<span style="font-size:64px; display:block; padding:20px 0;">${book.cover || '📖'}</span>`;
      }
      
      // Build read button - all orange theme
      var readButtonHtml = '';
      if (isLocked) {
        readButtonHtml = `<button class="read-btn" disabled><span class="btn-icon"></span> Locked</button>`;
      } else {
        readButtonHtml = `<button class="read-btn"><span class="btn-icon"></span> Read</button>`;
      }
      
      card.innerHTML = `
        ${coverHtml}
        <h3>${book.title}</h3>
        ${readButtonHtml}
      `;
      
      card.addEventListener('click', function(e) {
        // Don't trigger if clicking the read button directly
        if (e.target.closest('.read-btn')) return;
        
        if (isLocked) {
          if (typeof Sound !== 'undefined') Sound.locked();
          showToast('This story is coming soon!');
        } else {
          if (typeof Sound !== 'undefined') Sound.pop();
          openBook(book);
        }
      });
      
      // Handle read button click separately
      var readBtn = card.querySelector('.read-btn');
      if (readBtn && !isLocked) {
        readBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (typeof Sound !== 'undefined') Sound.pop();
          openBook(book);
        });
      }
      
      grid.appendChild(card);
    });

    if (booksSection) {
      booksSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================
  // BACK TO LANGUAGES
  // =========================================================
  var backToLangsBtn = document.getElementById('backToLangs');
  if (backToLangsBtn) {
    backToLangsBtn.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
      var booksSection = document.getElementById('booksSection');
      var langSelection = document.getElementById('langSelection');
      if (booksSection) booksSection.style.display = 'none';
      if (langSelection) langSelection.style.display = 'block';
      if (langSelection) langSelection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================================
  // BOOK READER - WITH IMAGES AND PAGE TURN EFFECT
  // =========================================================
  var activeBook = null;
  var currentPage = 0;
  var isTransitioning = false;

  function openBook(book) {
    activeBook = book;
    currentPage = 0;
    
    // Hide cover and title in modal
    var bookCover = document.getElementById('bookCover');
    var bookTitle = document.getElementById('bookTitle');
    if (bookCover) bookCover.style.display = 'none';
    if (bookTitle) bookTitle.style.display = 'none';
    
    // Show the first page
    renderBookPage('none');
    openModal('modalBackdrop');
  }

  function renderBookPage(direction) {
    var imgElement = document.getElementById('bookPageImg');
    var placeholder = document.getElementById('bookPlaceholder');
    var indicator = document.getElementById('pageIndicator');
    var prevBtn = document.getElementById('prevPage');
    var nextBtn = document.getElementById('nextPage');
    var progressBar = document.getElementById('readingProgressBar');

    if (!activeBook || !activeBook.pages || activeBook.pages.length === 0) {
      return;
    }

    // Check if the book has images
    var hasImages = activeBook.pages && activeBook.pages.length > 0 && 
                    typeof activeBook.pages[0] === 'string' &&
                    activeBook.pages[0].match(/\.(png|jpg|jpeg|gif|webp|svg)$/i);

    if (hasImages && imgElement) {
      // Show image with transition
      imgElement.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
      
      var imgSrc = activeBook.pages[currentPage];
      
      // Remove previous animation classes
      imgElement.classList.remove('slide-left', 'slide-right');
      
      // Force reflow
      void imgElement.offsetWidth;
      
      // Add animation based on direction
      if (direction === 'next') {
        imgElement.classList.add('slide-left');
      } else if (direction === 'prev') {
        imgElement.classList.add('slide-right');
      }
      
      // Set image source
      imgElement.src = imgSrc;
      
      // Update alt text if available
      if (activeBook.pageTexts && activeBook.pageTexts[currentPage]) {
        imgElement.alt = activeBook.pageTexts[currentPage];
      }
    } else {
      // Show placeholder with text
      if (imgElement) imgElement.style.display = 'none';
      if (placeholder) {
        placeholder.style.display = 'flex';
        var textContent = activeBook.pages && activeBook.pages[currentPage] ? 
                          activeBook.pages[currentPage] : 
                          'Page content goes here...';
        placeholder.innerHTML = `
          <i class="fas fa-book-open"></i>
          <p>${textContent}</p>
        `;
      }
    }

    // Update indicator
    if (indicator) {
      indicator.textContent = (currentPage + 1) + ' / ' + activeBook.pages.length;
    }
    
    // Update buttons
    if (prevBtn) {
      prevBtn.disabled = currentPage === 0;
      prevBtn.style.opacity = prevBtn.disabled ? 0.3 : 1;
    }
    if (nextBtn) {
      nextBtn.disabled = currentPage === activeBook.pages.length - 1;
      nextBtn.style.opacity = nextBtn.disabled ? 0.3 : 1;
    }
    
    // Update progress bar
    if (progressBar) {
      var progress = ((currentPage + 1) / activeBook.pages.length) * 100;
      progressBar.style.width = progress + '%';
    }
  }

  // Page navigation
  var prevPageBtn = document.getElementById('prevPage');
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', function() {
      if (currentPage > 0 && activeBook && !isTransitioning) {
        isTransitioning = true;
        if (typeof Sound !== 'undefined') Sound.pageTurn();
        currentPage--;
        renderBookPage('prev');
        setTimeout(function() {
          isTransitioning = false;
        }, 400);
      }
    });
  }

  var nextPageBtn = document.getElementById('nextPage');
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', function() {
      if (activeBook && currentPage < activeBook.pages.length - 1 && !isTransitioning) {
        isTransitioning = true;
        if (typeof Sound !== 'undefined') Sound.pageTurn();
        currentPage++;
        renderBookPage('next');
        setTimeout(function() {
          isTransitioning = false;
        }, 400);
      } else if (activeBook && currentPage === activeBook.pages.length - 1) {
        // End of book
        if (typeof Sound !== 'undefined') Sound.win();
        showToast('🌟 The End! Great reading!');
        setTimeout(function() {
          closeModal('modalBackdrop');
        }, 500);
      }
    });
  }

  // Modal close
  var modalCloseBtn = document.getElementById('modalClose');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function() {
      closeModal('modalBackdrop');
    });
  }

  var modalBackdrop = document.getElementById('modalBackdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal('modalBackdrop');
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
    var modal = document.getElementById('modalBackdrop');
    if (modal && modal.classList.contains('open') && activeBook && !isTransitioning) {
      if (e.key === 'ArrowRight' && currentPage < activeBook.pages.length - 1) {
        isTransitioning = true;
        if (typeof Sound !== 'undefined') Sound.pageTurn();
        currentPage++;
        renderBookPage('next');
        setTimeout(function() {
          isTransitioning = false;
        }, 400);
      }
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        isTransitioning = true;
        if (typeof Sound !== 'undefined') Sound.pageTurn();
        currentPage--;
        renderBookPage('prev');
        setTimeout(function() {
          isTransitioning = false;
        }, 400);
      }
    }
  });

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
      var pendingLang = sessionStorage.getItem('pendingBookLang');
      if (pendingLang) {
        sessionStorage.setItem('pendingBookLangAfterAuth', pendingLang);
      }
    });
  }

  var loginModalSignup = document.getElementById('loginModalSignup');
  if (loginModalSignup) {
    loginModalSignup.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingBookLang');
      if (pendingLang) {
        sessionStorage.setItem('pendingBookLangAfterAuth', pendingLang);
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
      var pendingLang = sessionStorage.getItem('pendingBookLangAfterAuth') || sessionStorage.getItem('pendingBookLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingBookLang');
        sessionStorage.removeItem('pendingBookLangAfterAuth');
        setTimeout(function() {
          if (window.isUserLoggedIn && window.isUserLoggedIn()) {
            showBooksForLanguage(pendingLang);
            showToast('Welcome back! Here are your books!');
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
      var pendingLang = sessionStorage.getItem('pendingBookLangAfterAuth') || sessionStorage.getItem('pendingBookLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingBookLang');
        sessionStorage.removeItem('pendingBookLangAfterAuth');
        setTimeout(function() {
          if (window.isUserLoggedIn && window.isUserLoggedIn()) {
            showBooksForLanguage(pendingLang);
            showToast('Welcome! Start your reading adventure!');
          }
        }, 500);
      } else {
        setTimeout(function() {
          if(window.updateLoginStatus) window.updateLoginStatus();
          showToast(' Welcome to Language Island!');
        }, 500);
      }
    }
  }

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

  console.log('Books page loaded with image support!');
});