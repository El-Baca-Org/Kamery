<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# QamarSol - Dual Calendar Birthday Intelligence

QamarSol is an elegant and culturally aware application designed to help you track birthdays and important dates seamlessly across both the **Gregorian** and **Hijri (Islamic)** calendars. Never miss a birthday again, regardless of which calendar your loved ones follow.

View your app live in AI Studio: [https://ai.studio/apps/drive/1342f1lABST4YQqLSwvKdIMWvNfBDCm5v](https://ai.studio/apps/drive/1342f1lABST4YQqLSwvKdIMWvNfBDCm5v)

## 🌟 Key Features

- **Dual Calendar Tracking:** Automatically synchronizes and tracks birthdays across Gregorian and Hijri calendars.
- **Multilingual Support:** Available in multiple languages including English, Turkish (Türkçe), Ottoman Turkish (اسكيمز توركجه), Arabic (العربية), and Persian (فارسی). Full RTL (Right-to-Left) layout support.
- **Auto & Manual Hijri Calculation:** Automatically calculates Hijri dates based on the Gregorian equivalent (using the Umm al-Qura system), while also allowing manual overrides for absolute precision.
- **Countdown Intelligence:** Visual badges and countdowns displaying exactly how many days are left until the next birthday in both calendars.
- **Customizable Appearance:** Beautifully crafted UI with support for Light Mode, Dark Mode, and System Default themes.

## 🚀 Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS (with custom themes and typography)
- **Icons:** Lucide React
- **Build Tool:** Vite

## 🛠️ Installation & Local Development

**Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository and navigate into the directory:**
   (Depending on how you obtained the source)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (if required):**
   Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key (if interacting with AI Studio components locally).

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## 📦 Build for Production

To create an optimized production build, run:
```bash
npm run build
```
This will generate the built assets in the `dist` folder.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.
