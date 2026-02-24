# 💍 Official Marriage Petition Website
> A formal government-document-style proposal website. Built with React + Vite + Tailwind CSS.

---

## 🚀 Setup & Installation

### Step 1 — Install Node.js
If you don't have Node.js installed, download it from https://nodejs.org  
Choose the **LTS version**. After installing, verify by running:
```bash
node -v
npm -v
```

---

### Step 2 — Create the project folder
Copy all the provided files into a folder called `proposal-website`, keeping this structure:

```
proposal-website/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── assets/
        └── photos/
            ├── photo1.jpg   ← add your photos here
            ├── photo2.jpg
            ├── photo3.jpg
            ├── photo4.jpg
            └── photo5.jpg
```

---

### Step 3 — Install dependencies
Open a terminal inside the `proposal-website` folder and run:
```bash
npm install
```
This installs React, Vite, Tailwind and everything else automatically.

---

### Step 4 — Add your photos
1. Put your couple photos inside `src/assets/photos/`
2. Name them `photo1.jpg`, `photo2.jpg`, etc. (or any name you like)
3. Open `src/App.jsx` and find the top section that says **📸 PHOTO CONFIG**
4. Add your imports at the very top of the file:
```js
import photo1 from "./assets/photos/photo1.jpg"
import photo2 from "./assets/photos/photo2.jpg"
import photo3 from "./assets/photos/photo3.jpg"
import photo4 from "./assets/photos/photo4.jpg"
import photo5 from "./assets/photos/photo5.jpg"
```
5. Then in the `PHOTOS` array, replace `src: null` with your imports:
```js
const PHOTOS = [
  { src: photo1, caption: "That day we went to...", rotation: -3 },
  { src: photo2, caption: "She was laughing because...", rotation: 2 },
  { src: photo3, caption: "...", rotation: -1.5 },
  { src: photo4, caption: "Look at that smile. Go on.", rotation: 3 },
  { src: photo5, caption: "Still the same smile. Every time.", rotation: -2 },
];
```

---

### Step 5 — Fill in your details
Still in `src/App.jsx`, find the **🖊️ PERSONAL DETAILS** section and fill in:
```js
const DETAILS = {
  candidateName:   "Your Full Name",
  candidateDOB:    "1 January 2005",
  candidateNation: "Your Nationality",
  herName:         "Her Name",
  herFatherName:   "Her Father's Name",
  dateTogether:    "Month Year",
  howYouMet:       "One sentence about how you met",
  sweetQuote:      "Write something sincere here. This is the heartfelt section.",
  graduationYear:  "2027",
  // docDate is auto-generated — no need to change
};
```

---

### Step 6 — Run it locally
```bash
npm run dev
```
Open your browser at **http://localhost:5173** and you're live!

---

### Step 7 — Build for production (optional)
When you're ready to deploy it online:
```bash
npm run build
```
Then deploy the `dist/` folder to any hosting service:
- **Vercel** — https://vercel.com (easiest, free, just drag & drop the folder or connect GitHub)
- **Netlify** — https://netlify.com (also free and easy)
- **GitHub Pages** — free if you push to a repo

---

## ✨ Features

| Feature | What it does |
|---|---|
| 📜 Parchment aesthetic | Vintage document look with serif fonts & textures |
| 📷 Photo gallery | Scattered polaroid-style photos that straighten on hover |
| 🎯 Deny button | Escapes the cursor every time you try to hover it |
| 💬 Escape messages | Gets sassier each time you chase the button |
| 🏳️ Auto-approve | After 8 failed deny attempts, button surrenders & auto-approves |
| ✅ Approve state | Whole page turns green, confetti fires, big APPROVED stamp appears |
| 🪄 Confetti | 80 pieces of confetti on approval |
| 📱 Responsive | Works on mobile too |

---

## 🎨 Customisation Tips

- **Change the skill bars** — find the `SkillBar` rows in App.jsx and edit skill names/levels (1–5)
- **Edit the Terms & Conditions** — find § 7.0 and make them personal
- **Edit the Timeline** — find the `TimelineItem` rows in § 4.0
- **Change fonts** — swap the Google Fonts link in `index.html`
- **Change colours** — search for `#8b5e3c` (brown) and `#4a7c59` (green) and replace site-wide

---

## 📁 File Summary

| File | Purpose |
|---|---|
| `src/App.jsx` | Everything — all sections, logic, and components |
| `src/index.css` | Global styles and animations |
| `index.html` | HTML shell, Google Fonts link |
| `vite.config.js` | Vite configuration |
| `tailwind.config.js` | Tailwind configuration |
| `postcss.config.js` | PostCSS (needed for Tailwind) |
| `package.json` | Project dependencies |

---

*Built with React 18, Vite 5, Tailwind CSS 3.*  
*"It was a joke. And then it wasn't."*