# ICDServAI

API service ini menyediakan akses ke referensi kode ICD-10 dengan memanfaatkan kemampuan kecerdasan buatan dari Gemini AI. Program ini dirancang untuk memudahkan integrasi kode ICD-10 ke dalam aplikasi kesehatan atau sistem informasi medis, dengan memberikan pencarian dan informasi detail tentang kode ICD-10 secara real-time. Melalui API ini, pengguna dapat melakukan pencarian berdasarkan nama penyakit, kode ICD-10, atau kriteria lainnya, dan mendapatkan data yang relevan untuk kebutuhan diagnostik dan administratif.

## Fitur

- Fitur 1: Cari Referensi ICD dan Tarif INACBG dari AI.
- Fitur 2: Otomatis Update ICD Px ke Local Database (MLITE & Khanza Based) sesuai Referensi AI.

## Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek ini:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/hcalldee/APIServAI.git
   bash cd APIServAI
2. Install Dependency Dan Env
   ```bash
     npm install
3. Isi .env sesuai dengan env yang anda gunakan
   ```bash
    API_KEY= //api-key-gemini
    PORT= //port API
    DB_HOST= //DB name
    DB_NAME= //DB name
    DB_USER= //DB user
    DB_PASS= //DB pass
    DB_PORT= //port DB
    MODEL= // model ai gemini
4. katalog api
   <br>cari referensi icd limit: 50 kata
   ```bash
     curl -X POST http://localhost:PORT/api/generate-text \
     -H "Content-Type: application/json" \
     -d '{
           "prompt": "tes ai"
         }'
