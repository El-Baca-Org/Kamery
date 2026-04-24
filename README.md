<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# QamarSol - Dual Calendar Birthday Intelligence

QamarSol is a robust, intelligent React application built with Vite and TypeScript designed to seamlessly track birthdays and important dates across both the Gregorian and Hijri calendars.

View your app in AI Studio: https://ai.studio/apps/drive/1342f1lABST4YQqLSwvKdIMWvNfBDCm5v

## Features

*   **Dual Calendar Support:** Tracks and displays birthdays simultaneously in both Gregorian and Hijri (Umm al-Qura) calendars.
*   **Multi-language Support:** Full localization in English, Turkish, Ottoman Turkish (Eskimez Türkçe), Arabic, and Persian. Adapts layout direction automatically (LTR/RTL).
*   **Offline First & Privacy Centric:** All data is securely stored locally on your device using `localStorage`. No server connection required for daily use.
*   **Intelligent Age Calculation:** Calculates the person's age separately for both calendar systems accurately.
*   **Theming:** Supports Light mode, Dark mode, and System Default syncing.
*   **Beautiful UI:** A clean, responsive interface powered by Tailwind CSS and animated using lucide-react icons.

## Run Locally

**Prerequisites:**  Node.js (npm)

1. Clone the repository to your local machine.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and set your `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

---

<div align="center">
<h1>QamarSol - Çift Takvimli Doğum Günü Takipçisi (Türkçe)</h1>
</div>

QamarSol, doğum günlerini ve önemli tarihleri hem Miladi hem de Hicri takvimlerde sorunsuz bir şekilde takip etmek için tasarlanmış, Vite ve TypeScript ile oluşturulmuş güçlü, akıllı bir React uygulamasıdır.

AI Studio'da uygulamanızı görüntüleyin: https://ai.studio/apps/drive/1342f1lABST4YQqLSwvKdIMWvNfBDCm5v

## Özellikler

*   **Çift Takvim Desteği:** Doğum günlerini aynı anda hem Miladi hem de Hicri (Umm al-Qura) takvimlerinde izler ve görüntüler.
*   **Çoklu Dil Desteği:** İngilizce, Türkçe, Osmanlı Türkçesi (Eskimez Türkçe), Arapça ve Farsça dillerinde tam yerelleştirme. Düzen yönünü otomatik olarak uyarlar (LTR/RTL).
*   **Çevrimdışı Çalışma ve Gizlilik Odaklı:** Tüm veriler cihazınızda `localStorage` kullanılarak güvenli bir şekilde yerel olarak saklanır. Günlük kullanım için sunucu bağlantısı gerekmez.
*   **Akıllı Yaş Hesaplama:** Kişinin yaşını her iki takvim sistemi için ayrı ayrı, doğru bir şekilde hesaplar.
*   **Temalar:** Açık mod, Koyu mod ve Sistem Varsayılanı senkronizasyonunu destekler.
*   **Güzel Kullanıcı Arayüzü:** Tailwind CSS ile desteklenen ve lucide-react simgeleri kullanılarak oluşturulmuş temiz, duyarlı bir arayüz.

## Yerelde Çalıştırma

**Ön Koşullar:** Node.js (npm)

1. Depoyu yerel makinenize klonlayın.
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Kök dizinde bir `.env.local` dosyası oluşturun ve `GEMINI_API_KEY`'inizi ayarlayın:
   ```env
   GEMINI_API_KEY=sizin_gemini_api_anahtariniz
   ```
4. Geliştirme sunucusunu çalıştırın:
   ```bash
   npm run dev
   ```
5. Üretim için derleyin:
   ```bash
   npm run build
   ```