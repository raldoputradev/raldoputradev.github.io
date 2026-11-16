# Portfolio Redesign — Blueprint & Decisions

Dokumen ini adalah rencana final yang disetujui pemilik untuk **rebuild total**
portfolio `raldoputradev.github.io` (Next.js 15, static export, GitHub Pages).
Baca penuh sebelum melanjutkan pekerjaan — jangan menebak ulang keputusan.

## Aturan utama

- **JANGAN commit/push ke GitHub sampai pemilik menyetujui hasil akhir di preview lokal.**
- Deploy tetap via `npm run build` → folder `out/` → GitHub Pages (pipeline tidak berubah).
- Referensi desain yang dipilih pemilik: `https://ekawahyu-portofolio.vercel.app/`
  ("perframe" = halaman dipecah jadi frame layar-penuh + animasi scroll per elemen).

## Keputusan final pemilik

1. **Tema dark saja** — tidak ada toggle light/dark. Light CSS & ThemeToggle dihapus.
   Palet: bg `#060a14`, raise `#0e1524`, line `#1f2c46`, text `#ecf1fa`,
   muted `#93a1b9`, accent biru `#4d8dff`, aksen kedua cyan `#38d0f0`.
2. **Foto diri: placeholder kosong** — frame dashed "Foto menyusul" menunggu foto baru.
3. **Section Journey (timeline) DIHAPUS total** — copy `journey` di i18n dibuang,
   komponen `Journey.tsx` dihapus. Pengganti: **Focus Areas**.
4. **Struktur = 7 frame**, tiap section `min-height: 100svh`, konten vertikal center.
5. **Bilingual ID/EN dipertahankan** (`lib/i18n.ts`, `app/[locale]/`).
6. Loading screen (Splash) & 3D lanyard **dibuang permanen** — sudah dieksekusi.

## Blueprint 7 frame

| # | id | Isi |
|---|----|-----|
| 1 | `home` | Pill hijau "Open to internship" → nama besar (animasi huruf via `AnimatedName`) → role rotator (`RotateWords`) → intro → CTA (Lihat Proyek / Hubungi / Unduh CV) → stats `CountUp`. Kanan: frame foto placeholder dashed + chips stack melayang (ESP32-S3, Laravel, Flutter). |
| 2 | `about` | Kiri: paragraf profil + list "yang saya kerjakan sendiri". Kanan: facts card (prodi, kampus, domisili, bahasa). |
| 3 | `focus` | 4 kartu besar: Embedded & Firmware (ESP32/FreeRTOS), Full-Stack Web (Laravel/React/Inertia), Mobile (Flutter), Desktop Tooling (C#/.NET) — ikon garis + 1 kalimat. **Copy baru perlu ditambah di i18n (`focus`, ID+EN).** |
| 4 | `skills` | `SkillGrid` (filter Semua/Web/Embedded/Craft) + strip "sedang dipelajari". |
| 5 | `projects` | SmartBrail = showcase utama (screenshot besar + fitur + stack + tombol Live `smartbrail.com` + GitHub `smartbrail-showcase`), AFIS card kedua. Boleh tetap `WorkGallery` atau markup baru yang lebih showcase. |
| 6 | `certs` | `Certificates` — 3 slot placeholder dashed (sudah jadi). |
| 7 | `contact` | Headline besar + `ContactChannels` (email/GitHub/LinkedIn/WA/IG/repo). |

**Fitur pendukung:** `DotNav` kanan (7 titik + label hover) — sudah jadi;
`.scroll-progress` bar atas — sudah jadi; `Reveal` IntersectionObserver
(variant up/left/right/zoom/fade + delay) — sudah jadi;
stat `CountUp` — sudah jadi; GitHub stats card di bawah projects — **belum**.
Marquee tech-ticker: keputusan terakhir belum diambil (opsional, pertahankan atau buang).

## Status pekerjaan (saat dokumen ditulis)

Semua perubahan **belum di-commit** — working tree berisi rebuild parsial:
- `app/globals.css` — palet baru, hero baru, `.frame`, `.dot-nav`, `.scroll-progress`,
  `.cert-*`; CSS splash/lanyard/site-sky orbit sudah dihapus. Masih ada class lama
  (.band, .work-*, .journey-*) yang akan pensiun saat rewrite final.
- `app/layout.tsx` — font Space_Grotesk menggantikan Newsreader (var `--font-newsreader`),
  Splash dihapus, themeScript data-splash="skip".
- `app/[locale]/page.tsx` — hero baru + section `frame` + DotNav + CountUp + certs.
- `components/` baru: `Certificates.tsx`, `DotNav.tsx`, `CountUp.tsx`.
- `components/Reveal.tsx` — ditulis ulang (client, IntersectionObserver).
- `components/Splash.tsx` — dihapus. `components/SiteSky.tsx` — diganti bg dot-grid+blob.
- `lib/i18n.ts` — +`certs` copy (ID/EN), +nav key `certs`.

## Langkah rebuild berikutnya

1. Hapus `ThemeToggle` + light theme di globals.css (`:root[data-theme="light"]`)
   + themeScript disederhanakan (dark only, tapi boleh simpan data-theme untuk kompatibilitas).
2. Hapus `Journey.tsx`, `HeroLanyard.tsx`, `Lanyard.tsx`, `TypewriterText.tsx`,
   `lib/lanyard-art.ts`, deps three.js/rapier/drei/gsap boleh dicabut dari package.json
   (cek dulu `gsap` tidak dipakai komponen lain — `Marquee`, `HeroLanyard` pakai).
3. i18n: hapus `journey`, tambah `focus` (ID+EN), tambah badge internship di `hero`.
4. Rewrite `page.tsx` sesuai blueprint (frame `focus`, foto placeholder, tanpa journey).
5. `globals.css` boleh ditulis ulang bersih (dead CSS lama ikut hilang) — pertahankan
   utilitas yang masih dipakai (nav, btn, card, work, skill, journey→buang, contact).
6. Preview: `npm run dev -- --turbopack` → `http://localhost:3000/id/`.
   Review visual dengan pemilik, iterasi, baru `npm run build` + push setelah acc.
7. GitHub stats card: embed `https://github-readme-stats.vercel.app/api?username=raldoputradev`
   di bawah section projects (opsional, warna disesuaikan tema).

## Konteks konten

- Pemilik: Rayendra Aldo Putra (raldoputradev), mahasiswa Teknik Robotika
  Politeknik Negeri Batam. Target utama portfolio: **melamar magang** — HRD
  harus bisa scan cepat: siapa dia, bisa apa, proyek apa.
- Proyek bintang: SmartBrail (live smartbrail.com, repo showcase publik),
  lalu Afis Fingerprint Analyzer.
- Screenshot proyek ada di `public/projects/` (file `simalas-*` masih UI lama,
  `smartbrail-*` sudah baru).
