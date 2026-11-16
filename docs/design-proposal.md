# Design Proposal — Portfolio Rayendra Aldo Putra

Dibangun dari nol. Referensi perilaku: situs per-frame (ekawahyu) + standar portfolio engineer untuk rekruter.

## Prinsip yang dipegang
- **Recruiter-first**: 10 detik pertama harus menjawab "siapa, bisa apa, proyek apa".
- **Satu tema**: dark only, tidak ada toggle.
- **Per-frame**: setiap section = satu layar penuh, scroll terasa berpindah slide.
- **Bukti nyata**: SmartBrail sebagai showcase utama, bukan dekorasi.
- **Placeholder sadar**: foto & sertifikat kosong terlihat jelas slotnya.

## Kandidat arah

### A — "Code Terminal" (identitas engineer)
- Palet: slate gelap `#0F172A` + hijau run `#22C55E` + teks `#F8FAFC`
- Font: JetBrains Mono + IBM Plex Sans
- Hero: gaya prompt terminal, status "open to internship"
- Cocok kalau mau kesan "orang ini memang ngoding"

### B — "Deep Space Blue" (paling dekat referensimu)
- Palet: `#050510` + biru `#3C84F6` + cyan `#06B6D4`
- Font: Space Grotesk (display) + IBM Plex Sans + Plex Mono
- Hero: nama besar + foto placeholder card + glow halus
- Cocok kalau mau kesan modern/produk SaaS

### C — "Editorial Mono" (paling minimal)
- Palet: hampir monokrom + satu aksen (biru atau hijau)
- Tipografi besar, banyak ruang kosong, animasi sangat halus
- Cocok kalau mau kesan senior/kalem — risiko: terlalu "sepi"

## Struktur konten (semua arah sama)
1. Hero — nama, role, status internship, CTA, stats, foto placeholder
2. About — profil + facts card
3. Focus Areas — Embedded/Web/Mobile/Desktop
4. Skills — grid + filter
5. Projects — SmartBrail showcase besar + AFIS
6. Certificates — slot placeholder
7. Contact — headline + channel cards

## Keputusan (disetujui pemilik)
- **Arah: C — Editorial Mono.** Near-monokrom: bg `#0a0a0b`, teks `#f4f4f1`, muted `#8b8b92`, hairline `rgba(255,255,255,.08)`. Aksen = putih (CTA inverted); satu-satunya warna = hijau status "open to work". Section number ghost besar.
- **Animasi: Dramatis.** scroll-snap per frame, reveal translate+blur staggered, nama animasi huruf, marquee teks besar, parallax tipis.
- **Navigasi: navbar atas** — fixed, tipis, nama kiri, link kanan, indikator section aktif.
- Font: Space Grotesk display / IBM Plex Sans body / IBM Plex Mono label-index.
- Implementasi: file baru semua di `app/` + `components/` + `lib/` (kode lama sudah dihapus total).
