# Portofolio — Rayendra Aldo Putra

Situs portofolio Rayendra Aldo Putra, mahasiswa Teknik Robotika di Politeknik Negeri Batam. Simalas: sidik jari, Laravel, Flutter, ESP32 — local-first, lalu sync ke server. Bilingual **ID / EN**. Tidak berisi data laboratorium, API key, atau dummy production.

Live: [https://raldoputradev.github.io](https://raldoputradev.github.io)

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- `output: 'export'` — hasil build adalah folder `out/` (HTML statis, tanpa Node server)

## Perintah

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) — root mengarah ke `/id/`. English: `/en/`.

Build untuk hosting:

```bash
npm run build
```

Isi folder `out/` yang diunggah ke host. Trailing slash sudah aktif supaya cocok dengan GitHub Pages.

## Identitas

| | |
| --- | --- |
| Nama | Rayendra Aldo Putra |
| Email | raldoputra.dev@gmail.com |
| GitHub | [raldoputradev](https://github.com/raldoputradev) |

## Isi situs

Satu halaman panjang per bahasa (`/id/` dan `/en/`), navigasi lewat anchor:

- `#home` — hero, statistik, marquee stack
- `#skills` — keahlian teknis
- `#projects` — Simalas dan Afis Fingerprint Analyzer
- `#architecture` — lapisan Simalas dan keputusan desain
- `#about` · `#contact`

## Gambar proyek

Simalas memakai tangkapan layar asli di `public/projects/simalas-*.png`. Semua gambar bisa diklik
untuk diperbesar (tutup dengan klik atau Esc).

Aturan yang dipakai saat memilih tangkapan layar: **tidak ada data pribadi**. Halaman yang memuat
nama, NIM, atau email mahasiswa (live feed absensi, Manajemen User) tidak dipublikasikan. Kalau mau
dipakai, sensor dulu kolom identitasnya.

Tangkapan layar ponsel (`simalas-app-*.png`) sudah dipotong bagian status bar (jam, baterai, sinyal)
supaya tidak ada informasi perangkat yang ikut tampil. Galeri otomatis mengenali gambar potret dan
menampilkannya setinggi kartu, bukan selebar kartu.

AMR / ROS2 tidak ditampilkan sampai ada perangkat kampus. Afis Fingerprint Analyzer sudah di `#projects`.

## Foto dan tema

Foto profil (`public/rayendra-aldo-putra.png` dan `-hero.webp`) memakai latar gelap `#0a121c`, bukan putih atau transparan, supaya lingkaran foto tidak berubah jadi putih di mode terang.

Mode terang/gelap diatur lewat atribut `data-theme` pada `<html>`. Pilihan disimpan di `localStorage`,
dan kunjungan pertama mengikuti setelan sistem. Semua warna berasal dari variabel CSS di
`app/globals.css` — kalau menambah warna baru, pakai token (`--bg`, `--line`, `--accent`, …) supaya
kedua mode tetap konsisten.

## Data yang masih perlu diisi

`lib/site.ts` — field bernilai `null` otomatis tampil sebagai "Menyusul" dan tidak jadi tautan,
jadi tidak akan ada link mati:

- `whatsapp` + `whatsappLabel` (contoh: `https://wa.me/62812xxxxxxx` dan `+62 812-xxxx-xxxx`)
- `instagram` + `instagramHandle`
`sandboxRepo` sudah terisi ke https://github.com/raldoputradev/aiot-simalas. Repo itu dibuat dari
`C:\xampp\htdocs\Simalas\export-showcase.ps1` ke folder `C:\xampp\htdocs\simalas-showcase`;
jalankan skrip itu lagi setiap kode Simalas berubah, lalu commit dan push dari folder tersebut.

Tombol CV disembunyikan selama `cv` di `lib/site.ts` bernilai `null`. Pasang lagi setelah ada PDF asli di `public/cv/rayendra-aldo-putra-cv.pdf`.

## Catatan pengembangan

Jangan jalankan `npm run build` selagi `npm run dev` hidup. Keduanya menulis ke `.next` dan
dev server akan error `Cannot find module './xxx.js'`. Matikan dev server dulu.

Simalas **produksi** tetap private. Situs ini hanya menjelaskan arsitektur.

## Yang tidak masuk repo ini

- `.env`, kunci mesin IoT, token Gemini, kredensial SMTP
- Foto/data mahasiswa
- Kode Laravel/Flutter Simalas

## Hosting 2027 (catatan)

1. Buat repo GitHub publik (akun baru).
2. Set `github` di `lib/site.ts`.
3. Deploy `out/` atau sambungkan repo ke Cloudflare Pages / Vercel (`next build` + static export sudah cukup).
4. Domain pribadi opsional (mis. sesuai email `raldoputra.dev`).
