# Sentiment Analysis Dashboard - Next.js

Dashboard interaktif untuk visualisasi analisis sentiment berita ekonomi Yogyakarta menggunakan Next.js, Tailwind CSS, dan Recharts.

## 🚀 Fitur

- **📊 Overview Dashboard** - Statistik sentiment keseluruhan dengan pie chart dan grafik sumber berita
- **📰 Sumber Berita** - Analisis sentiment per sumber berita
- **☁️ Word Cloud** - Visualisasi kata paling sering muncul dengan filter sentiment
- **📈 Timeline** - Tren sentiment over time
- **📝 Artikel** - Daftar artikel terbaru dengan sentiment

## 📋 Prerequisites

- Node.js 18.x atau lebih baru
- Google Sheets yang di-publish ke Web (File > Share > Publish to web)

## 🔧 Setup

1. **Install dependencies:**
   ```bash
   cd dashboard-nextjs
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Buka [http://localhost:3000](http://localhost:3000)**

## 📡 Data Source

Dashboard ini mengambil data dari Google Sheets yang di-publish:

1. Buka Google Sheets Anda
2. Klik **File > Share > Publish to web**
3. Pilih **Entire Document** atau specific sheet
4. Copy URL dan update di `src/utils/data.ts`:
   ```typescript
   const GOOGLE_SHEETS_CSV_URL = 'YOUR_PUBLISHED_CSV_URL';
   ```

## 🚀 Deployment ke Vercel

1. Push project ke GitHub repository
2. Buka [vercel.com](https://vercel.com)
3. Import repository Anda
4. Klik **Deploy**

Vercel akan auto-detect Next.js dan deploy otomatis.

## 🎨 Tech Stack

- **Framework:** Next.js 14
- **UI:** React 18 + Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Data:** Google Sheets Publish to Web (CSV)

## 📁 Project Structure

```
dashboard-nextjs/
├── src/
│   ├── app/
│   │   ├── page.tsx        # Main dashboard page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── StatCard.tsx    # Statistics card
│   │   ├── SentimentPieChart.tsx
│   │   ├── SourceBarChart.tsx
│   │   ├── WordCloudChart.tsx
│   │   ├── TimelineChart.tsx
│   │   └── ArticleCard.tsx
│   ├── utils/
│   │   └── data.ts         # Data fetching utilities
│   └── types/
│       └── index.ts        # TypeScript interfaces
├── public/
├── tailwind.config.js
├── next.config.js
├── package.json
└── tsconfig.json
```

## ⚠️ Note

- Pastikan Google Sheets di-publish ke web sebelum menggunakan dashboard
- Data akan di-fetch setiap kali page di-refresh (tidak ada caching)
- Untuk production, pertimbangkan menggunakan API route untuk caching data