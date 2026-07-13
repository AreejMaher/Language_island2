// Authentication UI is implemented in auth.js.
// This compatibility file intentionally avoids declaring a second global Auth object.

// ============================================
// AUTHENTICATION SYSTEM - PHP BACKEND VERSION
// ============================================

// Check if Auth already exists to prevent duplicate declaration
if (typeof Auth === 'undefined') {
  var Auth = {
    // Storage key
    STORAGE_KEY: 'languageIslandUser',
    
    // Current user state
    _currentUser: null,
    _isLoggedIn: false,
    
    // Initialize auth system
    init: function() {
      this.loadSession();
      this.updateUI();
      this.setupProtectedContent();
      console.log('🌍 Auth system initialized for PHP!');
    },
    
    // Load session from storage
    loadSession: function() {
      var stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          var user = JSON.parse(stored);
          this._currentUser = user;
          this._isLoggedIn = true;
          return true;
        } catch (e) {
          this.clearSession();
          return false;
        }
      }
      return false;
    },
    
    // Save session to storage
    saveSession: function(user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      this._currentUser = user;
      this._isLoggedIn = true;
      this.updateUI();
    },
    
    // Clear session
    clearSession: function() {
      localStorage.removeItem(this.STORAGE_KEY);
      this._currentUser = null;
      this._isLoggedIn = false;
      this.updateUI();
    },
    
    // Get current user
    getCurrentUser: function() {
      return this._currentUser;
    },
    
    // Check if user is logged in
    isLoggedIn: function() {
      return this._isLoggedIn;
    },
    
    // Logout
    logout: function() {
      this.clearSession();
      this.updateUI();
      window.location.href = 'index.html';
    },
    
    // ============================================
    // UI UPDATES
    // ============================================
    updateUI: function() {
      var isLoggedIn = this.isLoggedIn();
      var user = this.getCurrentUser();
      
      this.updateAuthButtons(isLoggedIn);
      this.updateSidebar(isLoggedIn, user);
      this.updateSidebarButton(isLoggedIn);
      this.updateProtectedContent(isLoggedIn);
      this.updateRoadmapLock(isLoggedIn);
      this.removeFloatingBadge();
      
      document.dispatchEvent(new CustomEvent('authChange', { detail: { isLoggedIn: isLoggedIn, user: user } }));
    },
    
    updateAuthButtons: function(isLoggedIn) {
      var authButtons = document.getElementById('authButtons');
      if (!authButtons) return;
      
      if (isLoggedIn) {
        authButtons.style.display = 'none';
      } else {
        authButtons.style.display = 'flex';
        authButtons.innerHTML = `
          <a href="signin.html" class="auth-btn login interactive">Sign In</a>
          <a href="signup.html" class="auth-btn signup interactive">Sign Up</a>
        `;
      }
    },
    
    updateSidebar: function(isLoggedIn, user) {
      var sidebar = document.getElementById('sidebar');
      var sidebarOverlay = document.getElementById('sidebarOverlay');
      
      if (isLoggedIn && user) {
        if (sidebar) {
          sidebar.style.display = 'flex';
          sidebar.classList.remove('open');
        }
        if (sidebarOverlay) {
          sidebarOverlay.classList.remove('active');
        }
        
        var avatar = document.getElementById('sidebarAvatar');
        var username = document.getElementById('sidebarUsername');
        var email = document.getElementById('sidebarEmail');
        
        if (avatar) {
          avatar.innerHTML = '<img src="imgs/Cattoimages/cattologo.png" alt="' + user.firstName + '">';
        }
        if (username) {
          username.textContent = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Explorer';
        }
        if (email) {
          email.textContent = user.email;
        }
        
      } else {
        if (sidebar) {
          sidebar.style.display = 'none';
          sidebar.classList.remove('open');
        }
        if (sidebarOverlay) {
          sidebarOverlay.classList.remove('active');
        }
      }
    },
    
    updateSidebarButton: function(isLoggedIn) {
      var menuToggle = document.getElementById('menuToggle');
      if (!menuToggle) return;
      
      if (isLoggedIn) {
        menuToggle.style.display = 'flex';
      } else {
        menuToggle.style.display = 'none';
      }
    },
    
    removeFloatingBadge: function() {
      var floatingBadge = document.querySelector('.floating-user-badge');
      if (floatingBadge) {
        floatingBadge.remove();
      }
    },
    
    updateProtectedContent: function(isLoggedIn) {
      var protectedElements = document.querySelectorAll('.protected-content');
      protectedElements.forEach(function(el) {
        if (isLoggedIn) {
          el.style.display = '';
          el.style.pointerEvents = '';
        } else {
          el.style.display = 'none';
        }
      });
    },
    
    updateRoadmapLock: function(isLoggedIn) {
      var roadmapContainer = document.getElementById('roadmapContainer');
      var roadmapLock = document.getElementById('roadmapLockOverlay');
      
      if (!isLoggedIn && roadmapContainer) {
        if (!roadmapLock) {
          var overlay = document.createElement('div');
          overlay.id = 'roadmapLockOverlay';
          overlay.className = 'roadmap-lock-overlay';
          overlay.innerHTML = `
            <div class="lock-content">
              <i class="fas fa-lock"></i>
              <h3>🔒 Unlock Your Learning Journey</h3>
              <p>Create an account or sign in to start learning!</p>
              <div class="lock-buttons">
                <a href="signup.html" class="auth-btn signup">Sign Up</a>
                <a href="signin.html" class="auth-btn login">Sign In</a>
              </div>
            </div>
          `;
          roadmapContainer.style.position = 'relative';
          roadmapContainer.appendChild(overlay);
        }
        roadmapContainer.classList.add('locked');
        
      } else if (isLoggedIn && roadmapContainer) {
        roadmapContainer.classList.remove('locked');
        var overlay = document.getElementById('roadmapLockOverlay');
        if (overlay) overlay.remove();
      }
    },
    
    // ============================================
    // PROTECTED CONTENT SETUP
    // ============================================
    setupProtectedContent: function() {
      var protectedSections = ['.levels-section'];
      
      protectedSections.forEach(function(selector) {
        document.querySelectorAll(selector).forEach(function(el) {
          el.classList.add('protected-content');
        });
      });
      
      var startBtn = document.getElementById('startBtn');
      if (startBtn) {
        startBtn.addEventListener('click', function(e) {
          if (!Auth.isLoggedIn()) {
            e.preventDefault();
            Auth.showLoginPrompt();
          }
        });
      }
    },
    
    // ============================================
    // LOGIN PROMPT MODAL
    // ============================================
    showLoginPrompt: function() {
      if (this.isLoggedIn() || sessionStorage.getItem('languageIslandGateShown') === 'true') return;
      var modal = document.getElementById('loginPromptModal');
      if (modal) {
        Overlay.open(modal, { panel: '.login-prompt-card' });
        return;
      }
      sessionStorage.setItem('languageIslandGateShown', 'true');
      
      modal = document.createElement('div');
      modal.id = 'loginPromptModal';
      modal.className = 'modal-backdrop auth-gate';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="modal-card login-prompt-card">
          <button class="modal-close" id="loginPromptClose" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
          <div style="text-align:center; font-size:64px; margin-bottom:10px;">🌍</div>
          <h2 style="font-family: var(--font-display); color: var(--plum); margin:0 0 8px;">
            Welcome to Language Island!
          </h2>
          <p style="color: var(--plum-soft); font-weight:700; margin:0 0 24px;">
            To start your learning adventure, please create an account or sign in first.
          </p>
          <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
            <a href="signup.html" class="auth-btn signup" style="font-size:16px; padding:12px 28px;">
              Sign Up
            </a>
            <a href="signin.html" class="auth-btn login" style="font-size:16px; padding:12px 28px;">
              Sign In
            </a>
          </div>
          <button id="loginPromptCloseBtn" style="margin-top:16px; background:none; border:none; color:var(--plum-soft); cursor:pointer; font-family:var(--font-display); font-weight:700; font-size:14px;">
            Maybe later
          </button>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      var closeBtn = modal.querySelector('#loginPromptClose');
      var closeBtn2 = modal.querySelector('#loginPromptCloseBtn');
      var backdrop = modal;
      
      var closeModal = function() {
        Overlay.close(modal);
        setTimeout(function() { modal.remove(); }, 300);
      };
      
      closeBtn.addEventListener('click', closeModal);
      closeBtn2.addEventListener('click', closeModal);
      backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) closeModal();
      });
      
      Overlay.open(modal, { panel: '.login-prompt-card' });
    }
  };
}

// ============================================
// AUTO-INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Auth !== 'undefined') {
    Auth.init();
  }
});

window.addEventListener('pageshow', function() {
  if (typeof Auth !== 'undefined') {
    Auth.init();
  }
});