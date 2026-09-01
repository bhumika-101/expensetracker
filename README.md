# 🌿 PocketPeace — The Zero-Guilt Student Expense Tracker (INR / Rupee Edition)

> A bespoke, modern, tactile web application built for Indian college students living in hostels, PGs, and shared apartments managing their monthly pocket money.

---

## ✨ Features (Indian Campus Edition)
- **☀️ Daily "Safe-to-Spend" in ₹ (INR)**: Automatically calculates your safe daily allowance (e.g. ₹280/day from a monthly ₹8,000 budget) with smooth auto-recalibration.
- **☕ Real Indian Campus Presets**: One-tap quick logging for Cutting Chai & Samosa (+₹30), Hostel Maggi (+₹70), Shared Auto/Metro (+₹40), and Zepto/Blinkit Splits (+₹150).
- **🍛 Flatmate & PG Bill Splitter**: Live interactive calculator to split maid salaries, WiFi bills, electricity, and bulk grocery hauls with zero drama.
- **⚡ 1-Click Instant Sign-In**: Zero friction with Google/Apple OAuth — no bank account linking, no debit card, and zero UPI PIN needed.
- **🛡️ 100% Free & Private**: No hidden paywalls, no SMS message scraping, and no financial data selling.

---

## 🚀 How to Deploy to GitHub Pages (2 Minutes)

### Option 1: Using Git in Terminal
```bash
# 1. Open this folder in terminal:
cd C:\Users\roysi\.gemini\antigravity\scratch\pocketpeace-app

# 2. Initialize and commit:
git init
git add .
git commit -m "feat: PocketPeace INR Indian student edition"

# 3. Connect to your GitHub repository:
git remote add origin https://github.com/YOUR_USERNAME/pocketpeace.git
git branch -M main
git push -u origin main
```

### Option 2: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Navigate to **Settings** → **Pages**.
3. Under **Branch**, select `main` and root `/` folder, then click **Save**.
4. Your website is live at `https://YOUR_USERNAME.github.io/pocketpeace/`!

---

## 📁 File Structure
```
pocketpeace-app/
├── index.html       # Semantic HTML5 with INR currency, hero simulator & modals
├── styles.css       # Design tokens, glassmorphism, 8pt rhythm, responsive CSS
├── app.js           # Reactive Safe-to-Spend engine (INR calculation & presets)
└── README.md        # Deployment instructions & documentation
```
