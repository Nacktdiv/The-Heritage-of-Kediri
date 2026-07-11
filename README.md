# 🗺️ The Heritage of Kediri 

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)

**The Heritage of Kediri** adalah platform *frontend web* premium berbasis *Single Page Application* (SPA) yang dirancang untuk memperkenalkan potensi wisata, sejarah, budaya, dan kuliner khas Kediri (seperti Nasi Tumpang, Simpang Lima Gumul, dan Gunung Kelud). Website ini mengusung pendekatan **Map-Centric Layout** (Peta Interaktif Penuh) dengan sistem manajemen perjalanan pintar yang mendukung *Eco-Tourism*.

---

## ✨ Fitur Utama (Core Features)

### 1. 🏛️ Destinasi & Masonry Showcase
* **Responsive Masonry Grid:** Menampilkan galeri tempat wisata secara dinamis yang menyesuaikan ukuran layar (Mobile, Tablet, Desktop).
* **Smart Filter & Search:** Pengguna dapat memfilter berdasarkan kategori (*Landmark, Nature, Culture, Culinary*) dan mencari destinasi secara *real-time*.
* **Glassmorphism Detail Sheet:** Sidebar interaktif (Desktop) dan Bottom Sheet (Mobile) untuk melihat ulasan detail, jam buka, dan cerita sejarah (*heritage content*) tanpa berpindah halaman.

### 2. 🗺️ Professional Trip Planner (Map-Centric)
* **Full-Screen Google Maps Interface:** Peta interaktif mengambil alih visual utama secara penuh untuk mempermudah visualisasi spasial perjalanan.
* **Dual-Source Location Integration:** * **Saved Places:** Menghubungkan data dari keranjang belanja destinasi (*Destination Cart*) yang diambil dari `MainContext`.
  * **Live Google Places API Search:** Fitur pencarian langsung yang terhubung ke database Google Maps untuk mencari tempat umum, hotel, atau kuliner lokal di luar data internal.
* **Smart Day-by-Day Timeline:** Pengguna dapat membagi dan menjadwalkan kunjungan mereka berdasarkan hari perjalanan (Day 1, Day 2, dst).
* **Interactive Drag & Drop:** Menyusun urutan kunjungan secara manual dengan lancar menggunakan teknologi `@dnd-kit/sortable` berbasis *handle grip*.
* **Auto-Route Optimization:** Dilengkapi dengan algoritma pintar (*Nearest Neighbor*) untuk mengurutkan rute geografis terpendek secara otomatis dari koordinat awal GPS pengguna.
* **Export to Live Navigation:** Fitur ekspor rute tunggal atau jamak secara instan menjadi tautan resmi Google Maps yang dapat langsung digunakan untuk bernavigasi di perangkat *smartphone* pengguna.

### 3. 🌐 Sistem Dual-Bahasa (i18n Architecture)
* Mengintegrasikan library `i18next` untuk mendukung pergantian bahasa (**Bahasa Indonesia & Bahasa Inggris**) secara instan.
* Menggunakan pendekatan *Data-Driven Translation Pipeline* untuk memisahkan data teks antarmuka (*UI Elements*) ke dalam berkas lokalisasi agar performa aplikasi tetap optimal dan ramah terhadap *SEO Crawler*.

### 4. 🎬 High-End Cinematic Animations
* Menggunakan **GSAP (GreenSock Animation Platform)** dan **ScrollTrigger** untuk menganimasikan transisi antar-komponen, memunculkan kartu informasi secara halus, serta memberikan efek *parallax scroll* yang memberikan kesan mewah.

---

## 🌿 Kontribusi Terhadap SDGs (Sustainable Development Goals)

Proyek ini dikembangkan bukan hanya sebagai alat bantu navigasi wisata, melainkan sebuah inisiatif digital yang selaras dengan tujuan pembangunan berkelanjutan PBB (*United Nations SDGs*):

### 📈 SDG 8: Decent Work and Economic Growth
Melalui digitalisasi sektor wisata dan kuliner lokal (seperti *Nasi Tumpang Mbak Jum* atau kerajinan khas), platform ini membantu meningkatkan visibilitas pelaku UMKM dan ekonomi kreatif di Kediri agar dapat dijangkau oleh wisatawan mancanegara, mendorong pertumbuhan ekonomi lokal yang inklusif.

### 🏙️ SDG 11: Sustainable Cities and Communities
Platform ini berkontribusi dalam melindungi dan menjaga warisan budaya serta alam dunia (*cultural and natural heritage*) di Kediri dengan menyajikan dokumentasi digital, narasi sejarah, dan panduan edukasi yang bijak bagi para wisatawan yang datang berkunjung.

### ♻️ SDG 12: Responsible Consumption and Production
Mendorong konsep *Eco-Tourism* dengan mengedukasi wisatawan untuk merencanakan perjalanan mereka dengan matang sebelum berangkat guna mengurangi pemborosan sumber daya di lokasi wisata.

### 🌍 SDG 13: Climate Action
* **Carbon Footprint Calculator:** Fitur utama pada Trip Planner yang secara otomatis menghitung estimasi emisi karbon kendaraan selama perjalanan menggunakan parameter matematis nyata: 
  $$\text{Total Jarak (KM)} \times 0.12\text{ kg CO2e/km}$$
* **Route Optimization:** Dengan membantu pengguna menemukan rute perjalanan terpendek dan terefisien, sistem secara tidak langsung membantu mengurangi konsumsi bahan bakar minyak (BBM) dan menekan jejak emisi gas rumah kaca di jalan raya.

---

## 🚀 Instalasi Singkat (Frontend Setup)

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda:

### 1. Klon Repositori
```bash
git clone [https://github.com/username/the-heritage-of-kediri.git](https://github.com/username/the-heritage-of-kediri.git)
cd the-heritage-of-kediri