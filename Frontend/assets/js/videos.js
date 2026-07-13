/* =========================================================
   VIDEOS PAGE - Complete JavaScript with Languages & Categories
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
    ar: 'imgs/VideosPage/Arabic-V-B.png',
    en: 'imgs/VideosPage/EN-V-B.png',
    fr: 'imgs/VideosPage/Feancais-V-B.png',
    de: 'imgs/VideosPage/Deutsch-V-B.png',
    it: 'imgs/VideosPage/Italisno-V-B.png',
    es: 'imgs/VideosPage/Spanish-V-B.png'
  };

  // =========================================================
  // CATEGORY COVER IMAGES - UNIQUE FOR EACH LANGUAGE
  // =========================================================
  var categoryCoverImages = {
    en: 'Videos/AlphabetsCover.png',
    ar: 'Videos/AlphabetsCover-AR.png',
    de: 'Videos/AlphabetsCover-DE.png',
    es: 'Videos/AlphabetsCover-ES.png',
    fr: 'Videos/AlphabetsCover.png',
    it: 'Videos/AlphabetsCover.png'
  };

  // =========================================================
  // VIDEO COVER IMAGES
  // =========================================================
  var coverImages = {
    en: {
      alphabets: {
        'Letter A': 'Videos/VideoCover.png',
        'Letter B': 'Videos/VideoCover-B.png',
        'Letter C': 'Videos/VideoCover-C.png'
      }
    },
    ar: {
      alphabets: {
        'حرف أ': 'Videos/Arabic/حرف الف.png',
        'حرف ب': 'Videos/Arabic/حرف الباء.png',
        'حرف ت': 'Videos/Arabic/حرف التاء.png'
      }
    },
    es: {
      alphabets: {
        'Letra A': 'Videos/VideoCover.png',
        'Letra B': 'Videos/VideoCover.png',
        'Letra C': 'Videos/VideoCover.png'
      }
    },
    fr: {
      alphabets: {
        'Lettre A': 'Videos/VideoCover.png',
        'Lettre B': 'Videos/VideoCover.png',
        'Lettre C': 'Videos/VideoCover.png'
      }
    },
    de: {
      alphabets: {
        'Buchstabe A': 'Videos/VideoCover.png',
        'Buchstabe B': 'Videos/VideoCover.png',
        'Buchstabe C': 'Videos/VideoCover.png'
      }
    },
    it: {
      alphabets: {
        'Lettera A': 'Videos/VideoCover.png',
        'Lettera B': 'Videos/VideoCover.png',
        'Lettera C': 'Videos/VideoCover.png'
      }
    }
  };

  // =========================================================
  // VIDEO PATHS BY LANGUAGE AND CATEGORY
  // =========================================================
  var videoPaths = {
    en: {
      alphabets: {
        'Letter A': 'Videos/EN-A-V1.mp4',
        'Letter B': 'Videos/Letter-B-EN.mp4',
        'Letter C': 'Videos/Letter-C-EN.mp4'
      }
    },
    ar: {
      alphabets: {
        'حرف أ': 'Videos/Arabic/ألف.mp4',
        'حرف ب': 'Videos/Arabic/باء.mp4',
        'حرف ت': 'Videos/Arabic/تاء.mp4'
      }
    },
    es: {
      alphabets: {
        'Letra A': 'Videos/Spanish/A-SP.mp4',
        'Letra B': 'Videos/Spanish/C-SP.mp4',
        'Letra C': 'Videos/Spanish/B-SP.mp4'
      }
    },
    fr: {
      alphabets: {
        'Lettre A': 'Videos/French/A-FR.mp4',
        'Lettre B': 'Videos/French/B-FR.mp4',
        'Lettre C': 'Videos/French/C-FR.mp4'
      }
    },
    de: {
      alphabets: {
        'Buchstabe A': 'Videos/GR-A-V1.mp4',
        'Buchstabe B': 'Videos/GR-A-V1.mp4',
        'Buchstabe C': 'Videos/GR-A-V1.mp4'
      }
    },
    it: {
      alphabets: {
        'Lettera A': 'Videos/EN-A-V1.mp4',
        'Lettera B': 'Videos/EN-A-V1.mp4',
        'Lettera C': 'Videos/EN-A-V1.mp4'
      }
    }
  };

  // =========================================================
  // VIDEO CATEGORIES & DATA BY LANGUAGE
  // =========================================================
  var categoriesData = {
    en: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabets', desc: 'Learn the ABCs' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Letter A', minutes: '2 min', tag: 'Letter' },
          { icon: '🔤', color: '#FFB84D', title: 'Letter B', minutes: '3 min', tag: 'Letter' },
          { icon: '🔤', color: '#6EC6FF', title: 'Letter C', minutes: '2 min', tag: 'Letter' }
        ]
      }
    },
    ar: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'الحروف', desc: 'تعلم الحروف' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'حرف أ', minutes: '2 دقيقة', tag: 'حرف' },
          { icon: '🔤', color: '#FFB84D', title: 'حرف ب', minutes: '3 دقائق', tag: 'حرف' },
          { icon: '🔤', color: '#6EC6FF', title: 'حرف ت', minutes: '2 دقيقة', tag: 'حرف' }
        ]
      }
    },
    es: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alfabeto', desc: 'Aprende el ABC' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Letra A', minutes: '2 min', tag: 'Letra' },
          { icon: '🔤', color: '#FFB84D', title: 'Letra B', minutes: '3 min', tag: 'Letra' },
          { icon: '🔤', color: '#6EC6FF', title: 'Letra C', minutes: '2 min', tag: 'Letra' }
        ]
      }
    },
    fr: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabet', desc: 'Apprendre l\'ABC' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Lettre A', minutes: '2 min', tag: 'Lettre' },
          { icon: '🔤', color: '#FFB84D', title: 'Lettre B', minutes: '3 min', tag: 'Lettre' },
          { icon: '🔤', color: '#6EC6FF', title: 'Lettre C', minutes: '2 min', tag: 'Lettre' }
        ]
      }
    },
    de: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabet', desc: 'Lerne das ABC' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Buchstabe A', minutes: '2 min', tag: 'Buchstabe' },
          { icon: '🔤', color: '#FFB84D', title: 'Buchstabe B', minutes: '3 min', tag: 'Buchstabe' },
          { icon: '🔤', color: '#6EC6FF', title: 'Buchstabe C', minutes: '2 min', tag: 'Buchstabe' }
        ]
      }
    },
    it: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alfabeto', desc: 'Impara l\'ABC' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Lettera A', minutes: '2 min', tag: 'Lettera' },
          { icon: '🔤', color: '#FFB84D', title: 'Lettera B', minutes: '3 min', tag: 'Lettera' },
          { icon: '🔤', color: '#6EC6FF', title: 'Lettera C', minutes: '2 min', tag: 'Lettera' }
        ]
      }
    }
  };

  // =========================================================
  // AUTH / LOGIN CHECK
  // =========================================================
  function isUserLoggedIn() {
    var user = localStorage.getItem('languageIslandUser');
    return user !== null && user !== 'null' && user !== '';
  }

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('languageIslandUser'));
    } catch(e) {
      return null;
    }
  }

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

  function openVideoModal() {
    var modal = document.getElementById('videoModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeVideoModal() {
    var modal = document.getElementById('videoModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      var video = document.getElementById('videoPlayer');
      if (video) {
        video.pause();
      }
    }
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
    var grid = document.getElementById('langGridVideos');
    if (!grid) return;

    var html = '';
    var langKeys = Object.keys(languages);
    langKeys.forEach(function(key) {
      var lang = languages[key];
      var imgSrc = langImages[key] || 'imgs/buttons/default.png';
      html += `
        <button class="lang-video-btn" data-lang="${key}">
          <img src="${imgSrc}" alt="${lang.name}" onerror="this.src='imgs/buttons/default.png'">
          <span class="lang-label">${lang.name}</span>
        </button>
      `;
    });
    grid.innerHTML = html;

    grid.querySelectorAll('.lang-video-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var langKey = this.dataset.lang;
        if (typeof Sound !== 'undefined') Sound.pop();
        
        if (isUserLoggedIn()) {
          showCategoriesForLanguage(langKey);
        } else {
          sessionStorage.setItem('pendingVideoLang', langKey);
          openLoginModal();
        }
      });
    });

    updateLoginStatus();
  }

  // =========================================================
  // UPDATE LOGIN STATUS
  // =========================================================
  function updateLoginStatus() {
    var msg = document.getElementById('loginStatusMsg');
    if (msg) {
      if (isUserLoggedIn()) {
        var user = getCurrentUser();
        var name = user ? user.name || 'Explorer' : 'Explorer';
        msg.textContent = 'Welcome, ' + name + '! Pick a language to start watching!';
        msg.style.color = 'var(--grass)';
      } else {
        msg.textContent = 'Sign in to unlock all videos and track your progress!';
        msg.style.color = 'var(--coral)';
      }
    }
  }

  // =========================================================
  // SHOW CATEGORIES FOR LANGUAGE
  // =========================================================
  function showCategoriesForLanguage(langKey) {
    var data = categoriesData[langKey];
    var lang = languages[langKey] || { name: 'Unknown' };

    if (!data) {
      showToast('⚠️ No content available for this language yet.');
      return;
    }

    var langSelection = document.getElementById('langSelection');
    var categoriesSection = document.getElementById('categoriesSection');
    var selectedLangName = document.getElementById('selectedLangName');
    
    if (langSelection) langSelection.style.display = 'none';
    if (categoriesSection) {
      categoriesSection.style.display = 'block';
      categoriesSection.style.visibility = 'visible';
      categoriesSection.style.opacity = '1';
    }
    if (selectedLangName) selectedLangName.textContent = lang.name;

    var grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Check if categories exist
    if (!data.categories || data.categories.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:40px 20px;">
          <span class="empty-icon">📺</span>
          <h3>No categories yet!</h3>
          <p>Check back soon for new content.</p>
        </div>
      `;
      return;
    }

    // Get the unique category cover image for this language
    var categoryCover = categoryCoverImages[langKey] || 'Videos/AlphabetsCover.png';

    data.categories.forEach(function(category) {
      var card = document.createElement('button');
      card.className = 'category-card';

      // Get category data with fallbacks
      var categoryKey = category.key || 'default';
      var categoryIcon = category.icon || '📚';
      var categoryName = category.name || 'Category';
      var categoryDesc = category.desc || '';

      // For Alphabets category, use language-specific image cover
      var isAlphabets = categoryKey === 'alphabets';
      
      if (isAlphabets) {
        card.className = card.className + ' alphabets-category';
        
        // Create image element with language-specific cover
        var img = document.createElement('img');
        img.className = 'category-image';
        img.src = categoryCover; // Use language-specific cover
        img.alt = categoryName;
        img.loading = 'lazy';
        
        // Handle error gracefully - fallback to text
        img.onerror = function() {
          this.style.display = 'none';
          var wrapper = this.parentElement;
          if (wrapper) {
            wrapper.innerHTML = '';
            var iconSpan = document.createElement('span');
            iconSpan.className = 'category-icon';
            iconSpan.textContent = categoryIcon;
            var nameHeading = document.createElement('h3');
            nameHeading.textContent = categoryName;
            var descPara = document.createElement('p');
            descPara.textContent = categoryDesc;
            wrapper.appendChild(iconSpan);
            wrapper.appendChild(nameHeading);
            wrapper.appendChild(descPara);
          }
        };
        
        var wrapper = document.createElement('div');
        wrapper.className = 'category-image-wrapper';
        wrapper.appendChild(img);
        
        card.appendChild(wrapper);
        
        // Add hidden text for accessibility
        var textDiv = document.createElement('div');
        textDiv.className = 'category-text';
        textDiv.style.display = 'none';
        textDiv.innerHTML = `
          <span class="category-icon">${categoryIcon}</span>
          <h3>${categoryName}</h3>
          <p>${categoryDesc}</p>
        `;
        card.appendChild(textDiv);
        
      } else {
        card.innerHTML = `
          <span class="category-icon">${categoryIcon}</span>
          <h3>${categoryName}</h3>
          <p>${categoryDesc}</p>
        `;
      }
      
      card.addEventListener('click', function() {
        if (typeof Sound !== 'undefined') Sound.pop();
        showVideosForCategory(langKey, categoryKey);
      });
      grid.appendChild(card);
    });

    var videosSection = document.getElementById('videosSection');
    if (videosSection) videosSection.style.display = 'none';

    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================
  // SHOW VIDEOS FOR CATEGORY
  // =========================================================
  var currentLangKey = null;
  var currentCategoryKey = null;

  function showVideosForCategory(langKey, categoryKey) {
    currentLangKey = langKey;
    currentCategoryKey = categoryKey;
    
    var data = categoriesData[langKey];
    var videos = data.videos[categoryKey] || [];
    var category = data.categories.find(function(c) { return c.key === categoryKey; });

    var categoriesSection = document.getElementById('categoriesSection');
    var videosSection = document.getElementById('videosSection');
    var selectedCategoryName = document.getElementById('selectedCategoryName');

    if (categoriesSection) categoriesSection.style.display = 'none';
    if (videosSection) {
      videosSection.style.display = 'block';
      videosSection.style.visibility = 'visible';
      videosSection.style.opacity = '1';
    }
    if (selectedCategoryName) selectedCategoryName.textContent = category ? category.name : 'Videos';

    var grid = document.getElementById('videoGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Check if there are videos
    if (!videos || videos.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🌟</span>
          <h3>More videos coming soon!</h3>
          <p>Check back later for new content.</p>
        </div>
      `;
      return;
    }

    videos.forEach(function(video) {
      var card = document.createElement('button');
      var isLocked = video.locked || false;
      card.className = 'content-card' + (isLocked ? ' locked-card' : '');
      
      // Get video data with fallbacks
      var videoTitle = video.title || 'Video';
      var videoIcon = video.icon || '🎬';
      var videoColor = video.color || '#FFB84D';
      var videoMinutes = video.minutes || '2 min';
      
      // Get cover image - with fallbacks
      var coverSrc = null;
      if (coverImages[langKey] && coverImages[langKey][categoryKey]) {
        if (coverImages[langKey][categoryKey][videoTitle]) {
          coverSrc = coverImages[langKey][categoryKey][videoTitle];
        } else {
          var covers = Object.values(coverImages[langKey][categoryKey]);
          if (covers.length > 0) {
            coverSrc = covers[0];
          }
        }
      }
      
      if (!coverSrc && coverImages['en'] && coverImages['en'][categoryKey]) {
        var enCovers = Object.values(coverImages['en'][categoryKey]);
        if (enCovers.length > 0) {
          coverSrc = enCovers[0];
        }
      }
      
      // Build cover HTML
      var coverHtml = '';
      if (coverSrc) {
        coverHtml = `
          <div class="video-cover-wrapper">
            <img src="${coverSrc}" alt="${videoTitle}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:48px;\\'>${videoIcon}</span>'">
            <div class="play-icon-overlay"><i class="fas fa-play"></i></div>
          </div>
        `;
      } else {
        coverHtml = `
          <div class="video-cover-wrapper" style="background:${videoColor}22;">
            <span style="font-size:48px;">${videoIcon}</span>
            <div class="play-icon-overlay"><i class="fas fa-play"></i></div>
          </div>
        `;
      }
      
      // Build Watch button
      var watchButtonHtml = '';
      if (isLocked) {
        watchButtonHtml = `<button class="watch-btn" disabled><span class="btn-icon">🔒</span> Locked</button>`;
      } else {
        watchButtonHtml = `<button class="watch-btn"><span class="btn-icon">▶</span> Watch</button>`;
      }
      
      card.innerHTML = `
        ${coverHtml}
        <h3>${videoTitle}</h3>
        <p>${videoMinutes} watch</p>
        ${watchButtonHtml}
      `;
      
      card.addEventListener('click', function(e) {
        if (e.target.closest('.watch-btn')) return;
        
        if (isLocked) {
          if (typeof Sound !== 'undefined') Sound.locked();
          showToast('This video is coming soon!');
        } else {
          if (typeof Sound !== 'undefined') Sound.pop();
          playVideo(langKey, categoryKey, videoTitle);
        }
      });
      
      var watchBtn = card.querySelector('.watch-btn');
      if (watchBtn && !isLocked) {
        watchBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (typeof Sound !== 'undefined') Sound.pop();
          playVideo(langKey, categoryKey, videoTitle);
        });
      }
      
      grid.appendChild(card);
    });

    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================
  // PLAY VIDEO
  // =========================================================
  function playVideo(langKey, categoryKey, videoTitle) {
    var path = null;
    if (videoPaths[langKey] && videoPaths[langKey][categoryKey] && videoPaths[langKey][categoryKey][videoTitle]) {
      path = videoPaths[langKey][categoryKey][videoTitle];
    } else {
      if (videoPaths[langKey] && videoPaths[langKey][categoryKey]) {
        var videos = Object.values(videoPaths[langKey][categoryKey]);
        if (videos.length > 0) {
          path = videos[0];
        }
      }
    }

    if (!path) {
      showToast('⚠️ Video not found. Please try another video.');
      return;
    }

    var video = document.getElementById('videoPlayer');
    var source = document.getElementById('videoSource');
    var titleEl = document.getElementById('videoModalTitle');
    var tagEl = document.getElementById('videoModalTag');
    var progressBar = document.getElementById('videoProgressBar');
    var playOverlay = document.getElementById('videoPlayOverlay');
    
    if (source) {
      source.src = path;
      video.load();
    }
    
    if (titleEl) {
      titleEl.textContent = videoTitle || 'Video';
    }
    
    var data = categoriesData[langKey];
    var category = data ? data.categories.find(function(c) { return c.key === categoryKey; }) : null;
    if (tagEl && category) {
      tagEl.textContent = category.name || 'Video';
    }
    
    if (progressBar) {
      progressBar.style.width = '0%';
    }
    
    if (playOverlay) {
      playOverlay.classList.add('show');
    }
    
    video.addEventListener('timeupdate', function() {
      if (progressBar && video.duration) {
        var progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = progress + '%';
      }
    });
    
    video.addEventListener('play', function() {
      if (playOverlay) {
        playOverlay.classList.remove('show');
      }
    });
    
    video.addEventListener('pause', function() {
      if (playOverlay && !video.ended) {
        playOverlay.classList.add('show');
      }
    });
    
    video.addEventListener('ended', function() {
      if (playOverlay) {
        playOverlay.classList.add('show');
        if (progressBar) {
          progressBar.style.width = '100%';
        }
      }
    });
    
    openVideoModal();
    
    video.play().catch(function(e) {
      console.log('Video autoplay blocked, user must click play manually.');
      if (playOverlay) {
        playOverlay.classList.add('show');
      }
    });
  }

  // =========================================================
  // VIDEO MODAL CONTROLS
  // =========================================================
  var playOverlay = document.getElementById('videoPlayOverlay');
  if (playOverlay) {
    playOverlay.addEventListener('click', function() {
      var video = document.getElementById('videoPlayer');
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }

  var videoModalClose = document.getElementById('videoModalClose');
  if (videoModalClose) {
    videoModalClose.addEventListener('click', function() {
      closeVideoModal();
    });
  }

  var videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeVideoModal();
      }
    });
  }

  var fullscreenBtn = document.getElementById('videoFullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function() {
      var video = document.getElementById('videoPlayer');
      if (video) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var modal = document.getElementById('videoModal');
      if (modal && modal.classList.contains('open')) {
        closeVideoModal();
      }
    }
  });

  // =========================================================
  // BACK TO LANGUAGES
  // =========================================================
  var backToLangsBtn = document.getElementById('backToLangs');
  if (backToLangsBtn) {
    backToLangsBtn.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
      var categoriesSection = document.getElementById('categoriesSection');
      var langSelection = document.getElementById('langSelection');
      if (categoriesSection) categoriesSection.style.display = 'none';
      if (langSelection) {
        langSelection.style.display = 'block';
        langSelection.style.visibility = 'visible';
        langSelection.style.opacity = '1';
      }
      if (langSelection) langSelection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================================
  // BACK TO CATEGORIES
  // =========================================================
  var backToCategoriesBtn = document.getElementById('backToCategories');
  if (backToCategoriesBtn) {
    backToCategoriesBtn.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
      var videosSection = document.getElementById('videosSection');
      var categoriesSection = document.getElementById('categoriesSection');
      if (videosSection) videosSection.style.display = 'none';
      if (categoriesSection) {
        categoriesSection.style.display = 'block';
        categoriesSection.style.visibility = 'visible';
        categoriesSection.style.opacity = '1';
      }
      if (categoriesSection) categoriesSection.scrollIntoView({ behavior: 'smooth' });
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
      var pendingLang = sessionStorage.getItem('pendingVideoLang');
      if (pendingLang) {
        sessionStorage.setItem('pendingVideoLangAfterAuth', pendingLang);
      }
    });
  }

  var loginModalSignup = document.getElementById('loginModalSignup');
  if (loginModalSignup) {
    loginModalSignup.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingVideoLang');
      if (pendingLang) {
        sessionStorage.setItem('pendingVideoLangAfterAuth', pendingLang);
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
      var pendingLang = sessionStorage.getItem('pendingVideoLangAfterAuth') || sessionStorage.getItem('pendingVideoLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingVideoLang');
        sessionStorage.removeItem('pendingVideoLangAfterAuth');
        setTimeout(function() {
          if (isUserLoggedIn()) {
            showCategoriesForLanguage(pendingLang);
            showToast('Welcome back! Here are your videos!');
          }
        }, 500);
      } else {
        setTimeout(function() {
          updateLoginStatus();
          showToast('Welcome back!');
        }, 500);
      }
    }

    var justSignedUp = sessionStorage.getItem('justSignedUp');
    if (justSignedUp === 'true') {
      sessionStorage.removeItem('justSignedUp');
      var pendingLang = sessionStorage.getItem('pendingVideoLangAfterAuth') || sessionStorage.getItem('pendingVideoLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingVideoLang');
        sessionStorage.removeItem('pendingVideoLangAfterAuth');
        setTimeout(function() {
          if (isUserLoggedIn()) {
            showCategoriesForLanguage(pendingLang);
            showToast('🎉 Welcome! Start your video adventure!');
          }
        }, 500);
      } else {
        setTimeout(function() {
          updateLoginStatus();
          showToast('🎉 Welcome to Language Island!');
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

  console.log('Videos page loaded with video player and covers!');
});