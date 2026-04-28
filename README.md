<div align="center">
  <h1>QamarSol - Dual Calendar Birthday Intelligence</h1>
  <p>An intelligent birthday tracker supporting both Gregorian and Hijri calendars with automatic conversion, dual countdowns, and multilingual support.</p>
  <p><i>Hem Miladi hem de Hicri takvimleri destekleyen, otomatik dönüştürme, çift geri sayım ve çoklu dil desteğine sahip akıllı doğum günü takip uygulaması.</i></p>
</div>

# Run and deploy your AI Studio app / AI Studio uygulamanızı çalıştırın ve yayınlayın

This contains everything you need to run your app locally.
Bu, uygulamanızı yerel olarak çalıştırmak için ihtiyacınız olan her şeyi içerir.

View your app in AI Studio / Uygulamanızı AI Studio'da görüntüleyin: https://ai.studio/apps/drive/1342f1lABST4YQqLSwvKdIMWvNfBDCm5v

## Run Locally / Yerel Olarak Çalıştırma

**Prerequisites / Önkoşullar:**  Node.js

### Türkçe Kurulum Talimatları
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
3. Üretime (production) hazır hale getirmek için derleyin:
   ```bash
   npm run build
   ```

1. Install dependencies / Bağımlılıkları yükleyin:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key / [.env.local](.env.local) dosyasındaki `GEMINI_API_KEY` değerini Gemini API anahtarınıza ayarlayın
3. Run the app / Uygulamayı çalıştırın:
   `npm run dev`
