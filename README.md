<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# QamarSol - Doğum Günü Takipçisi (Birthday Tracker)

QamarSol, doğum günlerini hem Miladi hem de Hicri takvimlerde takip etmenizi sağlayan çok dilli bir akıllı takvim uygulamasıdır. Varsayılan olarak Türkçe arayüzle gelir ancak İngilizce, Osmanlıca, Arapça ve Farsça gibi birçok dili destekler.

QamarSol is a multi-lingual smart calendar application that allows you to track birthdays in both Gregorian and Hijri calendars. It comes with a Turkish interface by default but supports many languages such as English, Ottoman Turkish, Arabic, and Persian.

## Özellikler (Features)

- 📅 Çift Takvim Desteği: Doğum günlerini Miladi ve Hicri olarak takip etme (Dual Calendar Support: Track birthdays in Gregorian and Hijri)
- 🌍 Çoklu Dil Seçeneği: Türkçe, İngilizce, Osmanlıca, Arapça ve Farsça (Multi-language: Turkish, English, Ottoman, Arabic, and Persian)
- 🌓 Tema Seçenekleri: Açık, Koyu ve Sistem varsayılanı (Theme Options: Light, Dark, and System default)
- 💾 Yerel Kayıt: Verileriniz tarayıcınızda (localStorage) güvenle saklanır (Local Storage: Your data is securely stored in your browser)
- 📱 Duyarlı Tasarım: Tüm cihazlarda harika görünen Tailwind CSS tabanlı modern arayüz (Responsive Design: Modern UI based on Tailwind CSS that looks great on all devices)

## Kurulum ve Çalıştırma (Run Locally)

**Ön Koşullar (Prerequisites):** Node.js

Uygulamayı yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin (Follow these steps to run the application on your local machine):

1. Bağımlılıkları yükleyin (Install dependencies):
   ```bash
   npm install
   ```

2. Ortam değişkenlerini ayarlayın (Set environment variables):
   (Eğer bir Gemini API kullanıyorsanız, `.env.local` dosyasına `GEMINI_API_KEY` değişkenini ekleyin)

3. Geliştirme sunucusunu başlatın (Run the app):
   ```bash
   npm run dev
   ```

Geliştirme sunucusu varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.
(The development server will run at `http://localhost:3000` by default.)

## Teknolojiler (Technologies)
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (İkonlar / Icons)
