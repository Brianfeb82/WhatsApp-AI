# Penjelasan Sederhana Proyek WhatsApp AI Automation

Dokumen ini menjelaskan alur dan manfaat dari sistem WhatsApp AI Automation dengan bahasa yang lebih sederhana dan natural. Cocok digunakan untuk referensi saat presentasi atau wawancara teknis.

---

## Apa itu sistem ini?
Secara sederhana, sistem ini adalah asisten customer service otomatis yang berjalan di WhatsApp, khusus dirancang untuk kebutuhan UMKM.

Fungsi utamanya adalah menggantikan proses membalas chat secara manual. Dengan memanfaatkan kecerdasan buatan (AI), sistem dapat memahami pertanyaan pelanggan dan memberikan jawaban yang akurat selama 24 jam penuh tanpa henti.

---

## Bagaimana Cara Kerjanya?

Alur kerja sistem ini dibagi menjadi beberapa tahap singkat:

1. **Menerima Pesan:** 
   Ketika ada chat masuk ke nomor WhatsApp bisnis (melalui integrasi Baileys), sistem akan langsung menangkap dan membaca pesan tersebut secara real-time.

2. **Deteksi Tujuan (Intent Detection):** 
   Sistem akan menganalisis apakah pesan tersebut bersifat umum atau komplain yang membutuhkan penanganan manusia. Jika pelanggan ingin berbicara dengan admin, AI akan berhenti membalas dan mengoper percakapan tersebut ke CS sungguhan (fitur Human Handoff).

3. **Pencarian Informasi Spesifik (RAG):** 
   Jika pertanyaannya seputar bisnis (misalnya harga produk atau jam buka), sistem tidak akan mengarang jawaban. Sistem akan mengambil data langsung dari database Supabase yang berisi "Buku Pintar" atau FAQ bisnis tersebut.

4. **Menghasilkan Jawaban Natural:** 
   Setelah informasi ditemukan, sistem menggunakan model bahasa canggih (Groq / Llama 3.1) untuk merangkai jawaban. Hasilnya adalah balasan dengan Bahasa Indonesia yang natural, ramah, dan tidak terlihat kaku seperti robot konvensional.

5. **Pengiriman Balasan:** 
   Jawaban yang sudah dirangkai akan langsung dikirim kembali ke pelanggan melalui WhatsApp. Seluruh proses ini berjalan otomatis hanya dalam hitungan detik.

---

## Apa Nilai Lebih dari Sistem Ini?

- **Percakapan yang Luwes:** Tidak seperti chatbot tradisional yang mengharuskan pengguna mengetik angka (1, 2, 3) atau format tertentu. Pelanggan bisa bertanya menggunakan gaya bahasa sehari-hari.
- **Jawaban Selalu Relevan:** Berkat teknologi Retrieval-Augmented Generation (RAG), AI dibatasi agar hanya menjawab berdasarkan data operasional bisnis yang sudah kita siapkan. Hal ini mencegah AI memberikan informasi yang salah atau di luar konteks.
- **Arsitektur yang Kuat:** Sistem ini tidak hanya membalas pesan, tapi juga menyimpan riwayat percakapan secara terstruktur di database PostgreSQL, sehingga sangat mudah untuk diintegrasikan dengan dashboard analitik di kemudian hari.
