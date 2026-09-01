/**
 * POCKETPEACE — INTERACTIVE APP CONTROLLER (INR / RUPEE EDITION)
 * Zero-dependency modern ES6 script tailored for Indian student life
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. STATE CONFIGURATION (INR) ---
  const INITIAL_STATE = {
    dailyBudget: 400, // ₹400 daily budget (~₹12,000 monthly allowance)
    spentToday: 120,  // ₹120 spent
    transactions: [
      { id: 1, title: 'Mess Lunch & Thali', amount: 100, icon: '🍛', time: '1:15 PM • Hostel Mess' },
      { id: 2, title: 'Morning Kadak Chai', amount: 20, icon: '☕', time: '8:30 AM • College Tapri' }
    ]
  };

  let state = {
    dailyBudget: INITIAL_STATE.dailyBudget,
    spentToday: INITIAL_STATE.spentToday,
    transactions: [...INITIAL_STATE.transactions]
  };

  // --- 2. DOM REFERENCES ---
  const safeSpendAmountEl = document.getElementById('safeSpendAmount');
  const spentTodayTextEl = document.getElementById('spentTodayText');
  const spendProgressBarEl = document.getElementById('spendProgressBar');
  const progressStatusMsgEl = document.getElementById('progressStatusMsg');
  const widgetTxListEl = document.getElementById('widgetTxList');
  const btnResetDemo = document.getElementById('btnResetDemo');
  const quickChips = document.querySelectorAll('.chip-btn');

  // Flatmate Splitter Elements
  const splitBillInput = document.getElementById('splitBillAmount');
  const splitPeopleRange = document.getElementById('splitPeopleCount');
  const peopleCountLabel = document.getElementById('peopleCountLabel');
  const splitResultAmountEl = document.getElementById('splitResultAmount');

  // Dialog Elements
  const authSimDialog = document.getElementById('authSimDialog');
  const customExpenseDialog = document.getElementById('customExpenseDialog');
  const privacyDialog = document.getElementById('privacyDialog');

  const btnNavGoogle = document.getElementById('btnNavGoogle');
  const btnHeroGoogle = document.getElementById('btnHeroGoogle');
  const btnHeroApple = document.getElementById('btnHeroApple');
  const btnFooterGoogle = document.getElementById('btnFooterGoogle');
  const btnOpenCustomModal = document.getElementById('btnOpenCustomModal');
  const btnOpenPrivacyModal = document.getElementById('btnOpenPrivacyModal');

  const btnCloseAuthDialog = document.getElementById('btnCloseAuthDialog');
  const btnCloseCustomDialog = document.getElementById('btnCloseCustomDialog');
  const btnClosePrivacyDialog = document.getElementById('btnClosePrivacyDialog');
  const btnAcknowledgePrivacy = document.getElementById('btnAcknowledgePrivacy');
  const btnEnterApp = document.getElementById('btnEnterApp');

  const authSpinner = document.getElementById('authSpinner');
  const authSuccessView = document.getElementById('authSuccessView');
  const customExpenseForm = document.getElementById('customExpenseForm');
  const catPills = document.querySelectorAll('.cat-pill');

  // --- 3. CORE SAFE-TO-SPEND ENGINE (INR) ---
  function updateSafeSpendUI() {
    const remaining = Math.max(0, state.dailyBudget - state.spentToday);
    const percentage = Math.min(100, Math.max(0, (remaining / state.dailyBudget) * 100));

    // Number formatting in INR
    safeSpendAmountEl.textContent = Math.round(remaining);
    spentTodayTextEl.textContent = `₹${Math.round(state.spentToday)} spent`;
    spendProgressBarEl.style.width = `${percentage}%`;

    // Dynamic Tone & Status Feedback
    if (percentage > 50) {
      spendProgressBarEl.style.background = 'linear-gradient(90deg, #3D7B58 0%, #4ADE80 100%)';
      progressStatusMsgEl.textContent = '✨ Plenty left for evening snacks & dinner';
      progressStatusMsgEl.style.color = '#3D7B58';
      safeSpendAmountEl.style.color = '#181A1E';
    } else if (percentage > 15) {
      spendProgressBarEl.style.background = 'linear-gradient(90deg, #D97706 0%, #FBBF24 100%)';
      progressStatusMsgEl.textContent = '🌤️ Pacing well for tonight';
      progressStatusMsgEl.style.color = '#D97706';
      safeSpendAmountEl.style.color = '#D97706';
    } else {
      spendProgressBarEl.style.background = 'linear-gradient(90deg, #E11D48 0%, #FB7185 100%)';
      progressStatusMsgEl.textContent = '☕ Low buffer — mess food & safe night';
      progressStatusMsgEl.style.color = '#E11D48';
      safeSpendAmountEl.style.color = '#E11D48';
    }

    renderTransactions();
  }

  function renderTransactions() {
    widgetTxListEl.innerHTML = '';
    state.transactions.forEach(tx => {
      const li = document.createElement('li');
      li.className = 'tx-item';
      li.innerHTML = `
        <div class="tx-left">
          <span class="tx-icon-pill">${tx.icon}</span>
          <div>
            <div class="tx-title">${tx.title}</div>
            <div class="tx-time">${tx.time}</div>
          </div>
        </div>
        <span class="tx-amount">-₹${Math.round(tx.amount)}</span>
      `;
      widgetTxListEl.appendChild(li);
    });
  }

  function addExpense(title, amount, icon = '💸') {
    state.spentToday += amount;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • Just now';
    
    state.transactions.unshift({
      id: Date.now(),
      title,
      amount,
      icon,
      time: timeString
    });

    // Tactile micro-bounce animation
    safeSpendAmountEl.style.transform = 'scale(1.15)';
    setTimeout(() => {
      safeSpendAmountEl.style.transform = 'scale(1)';
    }, 150);

    updateSafeSpendUI();
  }

  // Quick Chips Click Events
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const name = chip.getAttribute('data-name');
      const amount = parseFloat(chip.getAttribute('data-amount'));
      let icon = '💳';
      if (name.includes('Chai')) icon = '☕';
      else if (name.includes('Maggi')) icon = '🍜';
      else if (name.includes('Auto') || name.includes('Metro')) icon = '🛺';
      else if (name.includes('Zepto') || name.includes('Blinkit')) icon = '🛒';

      addExpense(name, amount, icon);
    });
  });

  // Reset Demo Event
  btnResetDemo.addEventListener('click', () => {
    state = {
      dailyBudget: INITIAL_STATE.dailyBudget,
      spentToday: INITIAL_STATE.spentToday,
      transactions: [...INITIAL_STATE.transactions]
    };
    updateSafeSpendUI();
  });

  // --- 4. FLATMATE & PG SPLITTER ENGINE (INR) ---
  function updateRoommateSplit() {
    const bill = parseFloat(splitBillInput.value) || 0;
    const people = parseInt(splitPeopleRange.value, 10) || 2;
    peopleCountLabel.textContent = people;

    if (bill > 0 && people > 0) {
      const perPerson = Math.ceil(bill / people);
      splitResultAmountEl.textContent = `₹${perPerson}`;
    } else {
      splitResultAmountEl.textContent = '₹0';
    }
  }

  if (splitBillInput && splitPeopleRange) {
    splitBillInput.addEventListener('input', updateRoommateSplit);
    splitPeopleRange.addEventListener('input', updateRoommateSplit);
  }

  // --- 5. ACCORDION (FAQ) ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 6. DIALOG CONTROLS & AUTH SIMULATION ---
  function openAuthSimulation(provider = 'Google') {
    authSpinner.style.display = 'block';
    authSuccessView.style.display = 'none';
    authSimDialog.showModal();

    const descEl = document.getElementById('authDialogDesc');
    if (descEl) descEl.textContent = `Connecting securely via ${provider}...`;

    setTimeout(() => {
      authSpinner.style.display = 'none';
      authSuccessView.style.display = 'block';
    }, 750);
  }

  [btnNavGoogle, btnHeroGoogle, btnFooterGoogle].forEach(btn => {
    if (btn) btn.addEventListener('click', () => openAuthSimulation('Google'));
  });

  if (btnHeroApple) {
    btnHeroApple.addEventListener('click', () => openAuthSimulation('Apple'));
  }

  if (btnCloseAuthDialog) {
    btnCloseAuthDialog.addEventListener('click', () => authSimDialog.close());
  }

  if (btnEnterApp) {
    btnEnterApp.addEventListener('click', () => {
      authSimDialog.close();
      const heroWidget = document.getElementById('live-demo');
      if (heroWidget) {
        heroWidget.scrollIntoView({ behavior: 'smooth' });
        heroWidget.style.boxShadow = '0 0 0 3px #3D7B58, 0 20px 40px rgba(61,123,88,0.2)';
        setTimeout(() => {
          heroWidget.style.boxShadow = '';
        }, 1800);
      }
    });
  }

  // Custom Expense Dialog
  if (btnOpenCustomModal) {
    btnOpenCustomModal.addEventListener('click', () => {
      customExpenseDialog.showModal();
    });
  }

  if (btnCloseCustomDialog) {
    btnCloseCustomDialog.addEventListener('click', () => customExpenseDialog.close());
  }

  // Category Pill Selector
  let selectedCategoryIcon = '☕';

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const selectedCategory = pill.getAttribute('data-cat');
      selectedCategoryIcon = selectedCategory.split(' ')[0] || '💸';
    });
  });

  // Custom Expense Form Submit
  if (customExpenseForm) {
    customExpenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('customExpenseName');
      const amountInput = document.getElementById('customExpenseAmount');
      
      const title = nameInput.value.trim();
      const amount = parseFloat(amountInput.value);

      if (title && amount > 0) {
        addExpense(title, amount, selectedCategoryIcon);
        customExpenseForm.reset();
        customExpenseDialog.close();
      }
    });
  }

  // Privacy Dialog
  if (btnOpenPrivacyModal) {
    btnOpenPrivacyModal.addEventListener('click', (e) => {
      e.preventDefault();
      privacyDialog.showModal();
    });
  }

  if (btnClosePrivacyDialog) {
    btnClosePrivacyDialog.addEventListener('click', () => privacyDialog.close());
  }

  if (btnAcknowledgePrivacy) {
    btnAcknowledgePrivacy.addEventListener('click', () => privacyDialog.close());
  }

  // Light dismiss for all native dialogs on backdrop click
  [authSimDialog, customExpenseDialog, privacyDialog].forEach(dialog => {
    if (dialog) {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          dialog.close();
        }
      });
    }
  });

  // Footer Year
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Initial render
  updateSafeSpendUI();
  updateRoommateSplit();
});
