# 🧺 E-Laundry: Sistem Manajemen & Pelacakan Laundry

**E-Laundry** adalah aplikasi web sederhana namun berdampak nyata (*impactful*) yang dirancang untuk mendigitalkan operasional usaha laundry kecil menengah. Aplikasi ini menjembatani komunikasi antara pemilik laundry dan pelanggan melalui sistem pelacakan real-time.

---

## 1. Masalah yang Diselesaikan (Problem Statement)
Di lingkungan usaha laundry konvensional, sering terjadi masalah inefisiensi komunikasi:
* **Pelanggan** harus berulang kali mengirim pesan WhatsApp atau datang ke lokasi hanya untuk bertanya, *"Apakah cucian saya sudah selesai?"*
* **Pemilik Laundry** terganggu oleh *spam chat* pertanyaan status yang berulang, serta risiko kesalahan pencatatan harga dan data pesanan secara manual.
* **Ketidakpastian** akan bukti visual bahwa barang sudah selesai dan siap diambil.

## 2. Solusi yang Dibuat (Solution Overview)
E-Laundry hadir sebagai solusi digital dengan dua antarmuka utama:
1.  **Dashboard Admin** membantu pemilik mengelola pesanan (CRUD), menghitung harga otomatis berdasarkan berat & layanan, mengubah status pengerjaan, dan mengunggah foto bukti cucian selesai.
2.  **Halaman Tracking (Publik)** memungkinkan pelanggan mengecek status laundry mereka secara mandiri hanya dengan memasukkan **Nomor Order**, melihat rincian biaya, serta melihat foto bukti barang yang sudah siap diambil.

## 3. Tech Stack & Fitur Utama

### 🛠️ Teknologi (MERN Stack)
* **Frontend:** React.js (Vite), Framer Motion (Animasi), Axios.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (via Mongoose).
* **Keamanan & Tools:** JWT (Auth), Bcrypt (Hashing), Multer (Image Upload).

### Fitur Utama
* Manajemen Pesanan (CRUD) : Tambah, Lihat, Edit, dan Hapus data laundry.
* Kalkulasi Harga Otomatis dimana menghitung total harga secara instan berdasarkan input berat (kg) dan jenis layanan (Cuci Komplit/Kering/Satuan).
* Real-time Tracking dengan pencarian status laundry oleh pelanggan tanpa perlu login.
* Upload Bukti Foto yang mana admin dapat mengunggah foto barang yang sudah dipacking saat status "Selesai".
* Autentikasi Admin dan login aman dengan password terenkripsi.
* Tampilan Responsif nyaman diakses melalui HP maupun Laptop.
* Animasi Interaktif, transisi halaman dan tombol yang halus (smooth).

---

## 4. Cara Menjalankan Project (Setup Instructions)

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal:

### Langkah 1: Persiapan Backend
1.  Buka terminal, masuk ke folder backend:
    ```bash
    cd backend-laundry
    ```
2.  Install library yang dibutuhkan:
    ```bash
    npm install
    ```
3.  Buat file `.env` dan sesuaikan koneksi database kamu:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/lacak_laundry_db
    SECRET_KEY=rahasia_laundry
    PORT=5000
    ```
4.  **PENTING:** Jalankan script untuk membuat akun Admin pertama kali:
    ```bash
    node seedAdmin.js
    ```
5.  Jalankan server backend:
    ```bash
    npm run dev
    ```

### Langkah 2: Persiapan Frontend
1.  Buka terminal baru, masuk ke folder frontend:
    ```bash
    cd frontend-laundry
    ```
2.  Install library:
    ```bash
    npm install
    ```
3.  Jalankan aplikasi React:
    ```bash
    npm run dev
    ```
4.  Buka browser di alamat: `http://localhost:5173`

---

## 5. Akun Demo & Catatan
Untuk mengakses fitur Admin, gunakan akun berikut (setelah menjalankan `seedAdmin.js`):

* **Username:** `admin`
* **Password:** `admin123`

---
