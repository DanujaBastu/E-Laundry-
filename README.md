# E-Laundry-
Website untuk bisnis laundry

# 🧺 E-Laundry - Sistem Manajemen & Tracking Laundry

**E-Laundry** adalah aplikasi web Fullstack yang dirancang untuk memecahkan masalah komunikasi antara pemilik laundry dan pelanggan. Aplikasi ini memungkinkan pemilik laundry mengelola pesanan dengan mudah dan pelanggan untuk melacak status cucian mereka secara real-time tanpa perlu menghubungi via WhatsApp berulang kali.

---

## ✨ Fitur Utama

### 👤 Halaman Pengguna (Public)
- **Real-time Tracking:** Cek status laundry hanya dengan memasukkan Nomor Order (Order ID).
- **Bukti Foto:** Melihat foto bukti cucian yang sudah selesai/dipacking.
- **Detail Transaksi:** Melihat rincian berat, jenis layanan, dan total harga.
- **Direct Contact:** Tombol langsung ke WhatsApp Admin.
- **Responsive UI:** Tampilan rapi di Desktop maupun Mobile.

### 🛡️ Dashboard Admin (Protected)
- **Secure Login:** Autentikasi menggunakan JWT & Bcrypt (Password Hashing).
- **CRUD Orders:** Tambah, Baca, Edit Status, dan Hapus pesanan.
- **Auto-Calculation:** Harga otomatis terhitung berdasarkan berat dan jenis layanan (Komplit/Kering/Satuan).
- **Status Management:** Update status dari *Pending* -> *Dicuci* -> *Selesai*.
- **Image Upload:** Upload bukti foto saat status selesai.
- **Interactive UI:** Animasi transisi halaman & tombol interaktif.

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React.js (Vite):** Library UI utama.
- **Framer Motion:** Untuk animasi transisi halaman dan interaksi tombol.
- **Axios:** HTTP Client untuk koneksi ke API.
- **React Router DOM:** Manajemen navigasi halaman.

### Backend
- **Node.js & Express.js:** Server & REST API.
- **MongoDB & Mongoose:** Database NoSQL.
- **Multer:** Middleware untuk handle upload file gambar.
- **BcryptJS:** Enkripsi password admin.
- **JsonWebToken (JWT):** Keamanan sesi login.

---

## 🚀 Cara Menjalankan Proyek (Instalasi)

Ikuti langkah ini untuk menjalankan aplikasi di komputer lokal:

### 1. Clone Repository
```bash
git clone [https://github.com/username-kamu/vibe-coding-pweb.git](https://github.com/username-kamu/vibe-coding-pweb.git)
cd vibe-coding-pweb
