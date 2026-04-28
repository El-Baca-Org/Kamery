<div align="center">
  <h1>QamarSol - Dual Calendar Birthday Intelligence</h1>
  <p>An intelligent birthday tracker supporting both Gregorian and Hijri calendars with automatic conversion, dual countdowns, and multilingual support.</p>
  <p><i>Hem Miladi hem de Hicri takvimleri destekleyen, otomatik dönüştürme, çift geri sayım ve çoklu dil desteğine sahip akıllı doğum günü takip uygulaması.</i></p>
</div>

# QamarSol - Dual Calendar Intelligence

QamarSol is an elegant, multi-language React application designed to help you track birthdays and important dates seamlessly across both **Gregorian** and **Hijri** calendars.

It calculates accurate Hijri dates based on Gregorian input (and vice-versa) using the robust Umm al-Qura system, and keeps track of how many days are left until upcoming birthdays in both calendar formats.

## ✨ Features

- **Dual Calendar Tracking:** Automatically synchronizes and tracks dates in both Gregorian and Hijri calendars.
- **Precision Conversions:** Utilizes `Intl.DateTimeFormat` for reliable Hijri/Gregorian date conversions.
- **Multi-language Support:** Fully localized for:
  - English
  - Turkish
  - Ottoman Turkish (Arabic Script)
  - Arabic
  - Persian
- **RTL & LTR Support:** Dynamically adjusts text direction based on the selected language.
- **Smart Age Calculation:** Shows upcoming age in both calendar systems accurately.
- **Theming:** Beautiful Light, Dark, and System-based UI themes built with Tailwind CSS.
- **Privacy First:** All data is securely stored locally in your browser (`localStorage`). No external databases.

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Lucide React

## 🚀 Run Locally

**Prerequisites:**  Node.js (v18+)

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (typically `http://localhost:3000` or `http://localhost:5173`) in your browser.

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

The compiled files will be located in the `dist` directory. You can preview the production build using `npm run preview`.

## 🧠 Memory Considerations
The app uses a lightweight state management system connected to `localStorage` (`qamarsol_settings` and `qamarsol_people`) to ensure data persists between sessions without the need for an external backend.

---
*QamarSol - Dual Calendar Intelligence © 2024*
