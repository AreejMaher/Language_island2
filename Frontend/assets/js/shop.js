/* =========================================================
   SHOP.JS - DB-Driven Shop Logic (Buy & Equip & Sort)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  let currentCoins = 0;
  let purchasedItems = [];
  let currentSkin = '';

  fetchShopData();

  function fetchShopData() {
    fetch('../Backend/get_profile.php')
      .then(res => res.json())
      .then(data => {
        if (!data.success) return; // Header.js will handle showing the sign-in prompt
        
        currentCoins = data.data.star_shells || 0;
        purchasedItems = data.data.inventory || [];
        currentSkin = data.data.equipped_skin || 'default-catto';
        
        updateShopUI();
      })
      .catch(err => console.error("Shop fetch error:", err));
  }

  function updateShopUI() {
    // Update main page coin balances
    const userCoinBalance = document.getElementById('userCoinBalance');
    if (userCoinBalance) userCoinBalance.innerText = currentCoins;

    const shopGrid = document.getElementById('shopGrid');
    const myItemsGrid = document.getElementById('myItemsGrid');
    const myItemsSection = document.querySelector('.my-items-section');

    // Hide the "My Items" section if nothing is purchased yet
    if (myItemsSection) {
      myItemsSection.style.display = purchasedItems.length > 0 ? 'block' : 'none';
    }

    document.querySelectorAll('.buy-btn').forEach(button => {
      const itemName = button.getAttribute('data-item');
      const isSkinBtn = button.classList.contains('skin-btn');
      const itemCard = button.closest('.shop-card'); // Get the entire card for this item

      if (purchasedItems.includes(itemName)) {
        // --- ITEM IS OWNED: Move to "My Items" grid ---
        if (itemCard.parentElement !== myItemsGrid) {
          myItemsGrid.appendChild(itemCard);
        }
        
        if (isSkinBtn) {
          if (currentSkin === itemName) {
            button.innerText = 'Equipped ✔';
            button.classList.add('purchased');
            button.disabled = true;
          } else {
            button.innerText = 'Equip';
            button.classList.add('equip-btn');
            button.classList.remove('purchased');
            button.disabled = false;
            
            const newBtn = button.cloneNode(true);
            button.replaceWith(newBtn);
            newBtn.addEventListener('click', () => equipItem(itemName));
          }
        } 
        // --- NEW: Handle Printables and Books ---
        else if (itemCard.classList.contains('print-card') || itemName === 'fantasy-book' || itemName === 'coloring_book') {
          // Create an actual HTML link tag (<a>) to handle the download
          const downloadBtn = document.createElement('a');
          downloadBtn.className = 'buy-btn purchased'; // Keep your existing styling
          downloadBtn.style.display = 'inline-block';
          downloadBtn.style.textDecoration = 'none';
          downloadBtn.innerText = 'Download PDF 📥';
          
          // Point it to our new secure PHP script
          downloadBtn.href = `../Backend/download.php?item=${itemName}`;
          downloadBtn.target = '_blank'; // Opens the PDF in a new tab
          
          button.replaceWith(downloadBtn);
        } 
        // --- Handle Normal Items (Theme, Coffee, etc.) ---
        else {
          button.innerText = 'Owned ✔';
          button.classList.add('purchased');
          button.disabled = true;
        }

      } else {
        // --- ITEM IS NOT OWNED: Keep in "Items for Sale" ---
        if (itemCard.parentElement !== shopGrid) {
          shopGrid.appendChild(itemCard);
        }

        // Setup Buy action
        const newBtn = button.cloneNode(true);
        button.replaceWith(newBtn);
        newBtn.addEventListener('click', () => buyItem(newBtn, itemName));
      }
    });

    // Apply purple theme instantly if owned
    if (purchasedItems.includes('purple-theme')) {
      document.body.classList.add('theme-royal-purple');
    }
  }

  function buyItem(button, itemName) {
    if (button.disabled) return;
    
    button.disabled = true;
    const originalText = button.innerText;
    button.innerText = 'Purchasing...';

    fetch('../Backend/buy_item.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_name: itemName })
    })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        // Re-fetch entire shop data to ensure 100% DB accuracy and trigger grid resort
        fetchShopData();
        showToast(`🎉 Purchased!`);
      } else {
        button.disabled = false;
        button.innerText = originalText;
        showToast(`❌ ${response.message || 'Error.'}`);
      }
    });
  }

  function equipItem(itemName) {
    fetch('../Backend/equip_skin.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ equipped_skin: itemName })
    })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        // Re-fetch DB state to redraw all buttons and update header avatar
        fetchShopData(); 
        
        // Let the header know the skin changed so it updates the top right image
        if (typeof initHeader === 'function') initHeader();
        
        showToast(`👕 Skin Equipped!`);
      } else {
        showToast(`❌ ${response.message || 'Error equipping.'}`);
      }
    });
  }

  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
});