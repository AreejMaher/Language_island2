// ============================================
// UI VISUAL STATE MANAGER (Real Backend + Enhanced UI)
// ============================================

const Auth = {
  // Storage key we will use to check if PHP logged us in
  STORAGE_KEY: 'languageIslandUser',
  
  _currentUser: null,
  _isLoggedIn: false,
  
  init() {
    this.loadSession(); // paint instantly from cache so the UI doesn't flash
    this.updateUI();
    this.setupProtectedContent();
    this.verifySessionWithServer(); // then confirm the session is REAL
    console.log('UI Auth system initialized!');
  },

  // Asks the server "is my session actually still valid?" instead of
  // trusting localStorage forever. This is what catches the "fake login"
  // case: the browser thinks it's logged in, but the real PHP session
  // expired, was destroyed, or was lost (e.g. server restart, cookies
  // cleared, session timeout).
  verifySessionWithServer() {
    fetch('../Backend/check_session.php')
      .then(res => res.json())
      .then(data => {
        if (data.logged_in) {
          // Refresh the cached copy in case details changed elsewhere (e.g. profile edit)
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.user));
          this._currentUser = data.user;
          this._isLoggedIn = true;
          this.updateUI();
        } else if (this._isLoggedIn) {
          // We *thought* we were logged in, but the server disagrees.
          console.warn('Session expired or invalid on the server — logging out locally.');
          this.clearSession();
        }
      })
      .catch(err => {
        // Server unreachable — leave the cached state alone rather than
        // forcing a logout just because of a network hiccup.
        console.warn('Could not verify session with server:', err);
      });
  },
  
  // Checks if our PHP fetch script saved the user locally
  loadSession() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored);
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
  
  clearSession() {
    localStorage.removeItem(this.STORAGE_KEY);
    this._currentUser = null;
    this._isLoggedIn = false;
    this.updateUI();
  },
  
  getCurrentUser() {
    return this._currentUser;
  },
  
  isLoggedIn() {
    return this._isLoggedIn;
  },
  
  logout() {
    fetch('../Backend/logout.php', { method: 'POST' })
      .catch(err => console.warn('Could not reach logout endpoint:', err))
      .finally(() => {
        this.clearSession();
        window.location.href = 'index.html';
      });
  },

  getRoadmapProgress() {
    return JSON.parse(localStorage.getItem('roadmapProgress')) || {}; 
  },

  saveRoadmapProgress(progress) {
    localStorage.setItem('roadmapProgress', JSON.stringify(progress));
  },
  
  // ============================================
  // UI UPDATES 
  // ============================================
  updateUI() {
    const isLoggedIn = this.isLoggedIn();
    const user = this.getCurrentUser();
    
    const authButtons = document.getElementById('authButtons');
    if (authButtons) {
      if (isLoggedIn) {
        authButtons.innerHTML = '';
        authButtons.style.display = 'none';
      } else {
        authButtons.style.display = 'flex';
        authButtons.innerHTML = `
          <a href="signin.html" class="auth-btn login interactive">Sign In</a>
          <a href="signup.html" class="auth-btn signup interactive">Sign Up</a>
        `;
      }
    }
    
    this.updateSidebar(isLoggedIn, user);
    this.updateProtectedContent(isLoggedIn);
    this.updateRoadmapLock(isLoggedIn);
  },
  
  updateSidebar(isLoggedIn, user) {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.getElementById('menuToggle');
    
    if (isLoggedIn && user) {
      if (sidebar) {
          sidebar.style.display = 'flex';
          sidebar.classList.remove('open');
      }
      if (menuToggle) menuToggle.style.display = 'flex';
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      
      const avatar = document.getElementById('sidebarAvatar');
      const username = document.getElementById('sidebarUsername');
      const email = document.getElementById('sidebarEmail');
      
      if (avatar) avatar.innerHTML = `<img src="imgs/Cattoimages/cattologo.png" alt="Avatar">`;
      if (username) username.textContent = user.first_name || user.firstName || 'Explorer';
      if (email) email.textContent = user.email || '';
      
    } else {
      if (sidebar) {
          sidebar.style.display = 'none';
          sidebar.classList.remove('open');
      }
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      if (menuToggle) menuToggle.style.display = 'none';
    }
  },
  
  updateProtectedContent(isLoggedIn) {
    document.querySelectorAll('.protected-content').forEach(el => {
      if (isLoggedIn) {
        el.style.display = '';
        el.style.pointerEvents = '';
      } else {
        el.style.display = 'none';
      }
    });
  },
  
  updateRoadmapLock(isLoggedIn) {
    const roadmapContainer = document.getElementById('roadmapContainer');
    const roadmapLock = document.getElementById('roadmapLockOverlay');
    
    if (!isLoggedIn && roadmapContainer) {
      if (!roadmapLock) {
        const overlay = document.createElement('div');
        overlay.id = 'roadmapLockOverlay';
        overlay.className = 'roadmap-lock-overlay';
        overlay.innerHTML = `
          <div class="lock-content">
            <i class="fas fa-lock"></i>
            <h3>Unlock Your Learning Journey</h3>
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
      const overlay = document.getElementById('roadmapLockOverlay');
      if (overlay) overlay.remove();
    }
  },
  
  setupProtectedContent() {
    const protectedSections = ['.levels-section', '.language-selection', '.roadmap-container', '#lessonModalBackdrop'];
    protectedSections.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.classList.add('protected-content'));
    });

    // Attach login prompt to start button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
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
  showLoginPrompt() {
    if (this.isLoggedIn()) return;
    
    let modal = document.getElementById('loginPromptModal');
    if (modal) { 
        if (typeof Overlay !== 'undefined') {
            Overlay.open(modal, { panel: '.login-prompt-card' }); 
        } else {
            modal.classList.add('open');
        }
        return; 
    }
    
    modal = document.createElement('div');
    modal.id = 'loginPromptModal';
    modal.className = 'modal-backdrop auth-gate open';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="modal-card login-prompt-card">
        <button class="modal-close" aria-label="Close"><i class="fas fa-times"></i></button>
        <div class="login-prompt-icon" style="text-align:center; font-size:64px; margin-bottom:10px;">🌍</div>
        <h2 style="font-family: var(--font-display); color: var(--plum); margin:0 0 8px;">Welcome to Language Island!</h2>
        <p style="color: var(--plum-soft); font-weight:700; margin:0 0 24px;">To start your learning adventure, please create an account or sign in first.</p>
        <div class="login-prompt-actions" style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <a href="signup.html" class="auth-btn signup" style="font-size:16px; padding:12px 28px;">Sign Up</a>
          <a href="signin.html" class="auth-btn login" style="font-size:16px; padding:12px 28px;">Sign In</a>
        </div>
        <button class="login-prompt-dismiss" style="margin-top:16px; background:none; border:none; color:var(--plum-soft); cursor:pointer; font-family:var(--font-display); font-weight:700; font-size:14px;">Maybe later</button>
      </div>`;
      
    document.body.appendChild(modal);
    
    const close = function () { 
        if (typeof Overlay !== 'undefined') {
            Overlay.close(modal); 
        } else {
            modal.classList.remove('open');
        }
        setTimeout(() => modal.remove(), 220); 
        if (typeof Sound !== 'undefined') Sound.pop();
    };
    
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.querySelector('.login-prompt-dismiss').addEventListener('click', close);
    modal.addEventListener('click', event => { if (event.target === modal) close(); });
    
    if (typeof Sound !== 'undefined') Sound.pop();
    if (typeof Overlay !== 'undefined') Overlay.open(modal, { panel: '.login-prompt-card' });
  }
};

document.addEventListener('DOMContentLoaded', function() { Auth.init(); });
window.addEventListener('pageshow', function() { Auth.init(); });