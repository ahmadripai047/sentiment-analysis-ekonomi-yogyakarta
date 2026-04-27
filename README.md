# Analisis Sentiment Berita Ekonomi Yogyakarta

Proyek Tugas Akhir - Analisis Sentiment pada Berita Ekonomi Yogyakarta menggunakan Metode IndoBERT, SVM, dan Naive Bayes

## 📋 Deskripsi Proyek

Proyek ini bertujuan untuk melakukan analisis sentiment pada berita-berita ekonomi di Yogyakarta. Penelitian membandingkan tiga metode machine learning dalam klasifikasi sentiment: **IndoBERT** (transformer-based), **SVM** (Support Vector Machine), dan **Naive Bayes**.

**Metode Pengumpulan Data**: Data diperoleh melalui teknik **Web Scraping** dari Google News RSS feeds dengan kata kunci "ekonomi Yogyakarta" (sesuai dengan metodologi yang tercantum dalam Draf Skripsi).

### Pipeline Analisis

1. **Web Scraping** - Mengambil artikel berita ekonomi dari Google News RSS feeds
2. **Preprocessing** - Pembersihan teks (case folding, tokenization, stemming)
3. **Labelling** - Pelabelan sentiment menggunakan metode lexicon-based (VADER yang diadaptasi untuk Bahasa Indonesia)
4. **Analisis** - Perbandingan performa model IndoBERT, SVM, dan Naive Bayes

## 📊 Dataset

Dataset diperoleh melalui teknik **Web Scraping** dari Google News dengan kata kunci "ekonomi Yogyakarta","inflasi yogyakarta","pariwisata yogyakarta", dan "perdagangan yogyakarta". Dataset terdiri dari artikel dari beberapa portal berita ekonomi Yogyakarta yang telah melalui proses preprocessing dan pelabelan sentiment.

**Dataset dapat diunduh di**: [Google Drive - Dataset Lengkap](https://drive.google.com/drive/folders/1_GjVaFYOCiH4Zpk5Sf2JL3l9kzKKtKOe?usp=drive_link)

### 📥 Download Dataset

1. **Dataset Mentah (RAW)**: [Google Drive - Raw Data](https://drive.google.com/drive/folders/1bhfCM7-LbNBZvKNgnf5wBBfmW22ciwRP?usp=drive_link)
2. **Dataset Processed**: [Google Drive - Processed Data](https://drive.google.com/drive/folders/1c1c83MD0-cpOo8Y5-03bIE7gFxWZ6Fp4?usp=drive_link)
3. **Dataset Labeled**: [Google Drive - Labeled Data](https://drive.google.com/drive/folders/1o7LzjfaPYcNLu8cawB7TAXjh1HRzS5__?usp=drive_link)

## 🗂️ Struktur Proyek

```
sentiment-analysis-ekonomi-yogyakarta/
├── notebooks/
│   ├── scraperfixx.ipynb              # Web scraping berita
│   ├── Preprocessing.ipynb            # Proses pembersihan & preprocessing teks
│   ├── Labelling 2 Sentimen dan WordCloud.ipynb  # Pelabelan sentiment & visualisasi
│   ├── Analisis SVM dan Naive Bayes.ipynb        # Analisis dengan SVM & Naive Bayes
│   └── Analisis Indobert.ipynb         # Analisis dengan IndoBERT
├── data/
│   ├── raw/                           # Dataset mentah dari web scraping
│   ├── processed/                     # Dataset setelah preprocessing
│   └── labeled/                       # Dataset dengan label sentiment
├── resources/
│   ├── stopwords.indo.txt             # Daftar stopwords Bahasa Indonesia
│   ├── slangwords.txt                 # Daftar slang words & sinonim
│   ├── positive.tsv                   # Kamus kata positif
│   └── negative.tsv                   # Kamus kata negatif
├── app/
│   └── dashboard.py                   # Streamlit Dashboard interaktif
├── requirements.txt                   # Daftar dependencies Python
├── LICENSE                            # MIT License
└── README.md                          # Dokumentasi proyek
```

## 🔧 Instalasi

1. Clone repository ini:
```bash
git clone https://github.com/username/sentiment-analysis-ekonomi-yogyakarta.git
cd sentiment-analysis-ekonomi-yogyakarta
```

2. Buat virtual environment (opsional tapi disarankan):
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## 📊 Menjalankan Dashboard Interaktif

Proyek ini dilengkapi dengan **Streamlit Dashboard** untuk visualisasi hasil analisis sentiment secara interaktif.

```bash
cd sentiment-analysis-ekonomi-yogyakarta
streamlit run app/dashboard.py
```

Dashboard akan terbuka di browser pada `http://localhost:8501`

### Fitur Dashboard:
- **Overview**: Ringkasan metrik sentiment (Positive, Negative, Neutral)
- **Distribusi Sentiment**: Visualisasi pie chart dan bar chart
- **Word Clouds**: Visualisasi kata-kata paling sering muncul per kelas sentiment
- **Analisis Detail**: Breakdown berdasarkan sumber berita dan compound score
- **Perbandingan Model**: Perbandingan performa IndoBERT, SVM, dan Naive Bayes

## 📓 Notebooks

### 1. Web Scraping (`scraperfixx.ipynb`)
Mengambil artikel berita ekonomi dari Google News RSS feeds dengan kata kunci "ekonomi yogyakarta". Data yang diambil meliputi:
- Judul artikel
- Tanggal publish
- Sumber berita
- Konten lengkap artikel

### 2. Preprocessing (`Preprocessing.ipynb`)
Proses pembersihan teks meliputi:
- Case folding (konversi ke huruf kecil)
- Menghapus special characters dan numbers
- Tokenisasi
- Penghapusan stopwords
- Stemming menggunakan Sastrawi

### 3. Pelabelan Sentiment (`Labelling 2 Sentimen dan WordCloud.ipynb`)
Pelabelan menggunakan metode lexicon-based dengan compound score:
- **Positive**: Compound score > 0.05
- **Negative**: Compound score < -0.05
- **Neutral**: -0.05 <= Compound score <= 0.05

Visualisasi wordcloud untuk setiap kelas sentiment.

### 4. Analisis SVM dan Naive Bayes (`Analisis SVM dan Naive Bayes.ipynb`)
- TF-IDF vectorization
- Training dan evaluasi model SVM dan Naive Bayes
- Perbandingan performa menggunakan metrics (accuracy, precision, recall, F1-score)

### 5. Analisis IndoBERT (`Analisis Indobert.ipynb`)
- Fine-tuning model IndoBERT untuk klasifikasi sentiment
- Perbandingan dengan metode tradisional (SVM & Naive Bayes)
- Evaluasi menggunakan confusion matrix dan classification report

## 📈 Hasil

Proyek ini membandingkan performa tiga metode klasifikasi sentiment:
- **IndoBERT**: Model transformer yang telah di-fine-tune untuk Bahasa Indonesia
- **SVM**: Support Vector Machine dengan TF-IDF features
- **Naive Bayes**: Klasifikasi probabilistik dengan TF-IDF features

## 🛠️ Tools & Technologies

- **Python 3.8+**
- **TensorFlow / Keras**: Deep learning framework
- **Transformers (HuggingFace)**: IndoBERT model
- **Scikit-learn**: SVM, Naive Bayes, dan evaluasi model
- **Pandas & NumPy**: Data processing
- **NLTK & Sastrawi**: Natural Language Processing untuk Bahasa Indonesia
- **Matplotlib, Seaborn & Plotly**: Data visualization
- **WordCloud**: Visualisasi kata-kata penting
- **Streamlit**: Interactive dashboard framework

## 📝 Catatan

- Dataset asli tidak included dalam repository karena ukuran file yang besar
- Notebook dapat dijalankan secara independen dengan dataset yang sesuai
- Pastikan untuk menyesuaikan paths dataset saat menjalankan notebook
- Data diambil menggunakan metode **Web Scraping** sesuai dengan metodologi pada Draf Skripsi

## 👤 Author

Muhammad Rifai
Tugas Akhir - Analisis Sentiment Berita Ekonomi Yogyakarta

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
