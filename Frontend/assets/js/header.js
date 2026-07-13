/* =========================================================
   HEADER.JS - 100% DB-Driven Authentication & Global State
   ========================================================= */

// 1. Global state for ALL pages to use, replacing fake localStorage
window.userLogStatus = false;
window.currentUserData = null;

// Global functions that games.js and books.js will now rely on
window.isUserLoggedIn = function() {
  return window.userLogStatus;
};

window.getCurrentUser = function() {
  return window.currentUserData;
};

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
});

function initHeader() {
  fetch('../Backend/get_profile.php')
    .then(res => res.json())
    .then(data => {
      const authButtons = document.getElementById('authButtons');
      const userMenuWrapper = document.getElementById('userMenuWrapper');
      const coinsDisplay = document.querySelector('.coins-display');
      const starsDisplay = document.querySelector('.stars-display');

      if (data.success) {
        // --- STRICT DB CONFIRMATION: LOGGED IN ---
        window.userLogStatus = true;
        window.currentUserData = data.data;

        if (authButtons) authButtons.style.display = 'none';
        if (userMenuWrapper) userMenuWrapper.style.display = 'flex';
        if (coinsDisplay) coinsDisplay.style.display = 'flex';
        if (starsDisplay) starsDisplay.style.display = 'flex';

        updateHeaderUI(data.data);
        
        // Trigger UI updates on other pages once DB confirms login
        if (typeof updateLoginStatus === 'function') updateLoginStatus(); // Books Page
        if (typeof renderHome === 'function') renderHome(); // Games Page
      } else {
        // --- NOT LOGGED IN / SESSION EXPIRED ---
        window.userLogStatus = false;
        window.currentUserData = null;

        if (authButtons) authButtons.style.display = 'flex';
        if (userMenuWrapper) userMenuWrapper.style.display = 'none';
        if (coinsDisplay) coinsDisplay.style.display = 'none';
        if (starsDisplay) starsDisplay.style.display = 'none';
      }
    })
    .catch(err => console.error("header.js DB check failed:", err));

  setupSidebar();
}

function updateHeaderUI(userDbData) {
  // 1. Balances
  const headerCoins = document.getElementById('headerCoins');
  const headerStars = document.getElementById('headerStars');
  if (headerCoins) headerCoins.innerText = userDbData.star_shells || 0;
  if (headerStars) headerStars.innerText = userDbData.daily_streak || 0;

  // 2. Sidebar Info (DB uses first_name)
  const sidebarUsername = document.getElementById('sidebarUsername');
  const sidebarEmail = document.getElementById('sidebarEmail');
  if (sidebarUsername) sidebarUsername.textContent = userDbData.first_name || 'Explorer';
  if (sidebarEmail) sidebarEmail.textContent = userDbData.email || '';

  // 3. Avatar Skin Update (Fixes Header AND Games Page Catto)
  const currentSkin = userDbData.equipped_skin || 'default-catto';
  const skinPath = `imgs/Cattoimages/${currentSkin}.png`; 
  
  const userAvatarIcon = document.getElementById('userAvatarIcon');
  const sidebarUserImage = document.getElementById('sidebarUserImage');
  const gameCompanionCatto = document.getElementById('cattoImg'); 
  
  if (userAvatarIcon) userAvatarIcon.src = skinPath;
  if (sidebarUserImage) sidebarUserImage.src = skinPath;
  if (gameCompanionCatto) gameCompanionCatto.src = skinPath; 
}

function setupSidebar() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');
  const logoutBtn = document.getElementById('menuLogout');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  }

  if (menuToggle) menuToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fetch('../Backend/logout.php', { method: 'POST' }).then(() => {
        window.location.href = 'index.html';
      });
    });
  }
}