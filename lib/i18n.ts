import type { Locale } from "./site";

type NavKey = "home" | "skills" | "projects" | "about" | "journey" | "contact";

export type ProjectImage = {
  src: string;
  caption: string;
  tag: string;
  width: number;
  height: number;
  placeholder?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  role: string;
  status: "live" | "study" | "soon";
  summary: string;
  features: string[];
  contributionTitle: string;
  contribution: string;
  stack: string[];
  repoUrl?: string;
  repoLabel?: string;
  liveUrl?: string;
  liveLabel?: string;
  images: ProjectImage[];
};

export type Copy = {
  meta: {
    title: string;
    description: string;
  };
  nav: Record<NavKey, string>;
  theme: { toDark: string; toLight: string };
  hero: {
    kicker: string;
    hello: string;
    titleLine: string;
    typedLines: string[];
    intro: string;
    line: string;
    primary: string;
    secondary: string;
    contactCta: string;
    cv: string;
    cvSoon: string;
    roles: string[];
    status: string;
    lanyard: string;
  };
  facts: {
    title: string;
    pending: string;
    items: { label: string; value: string | null }[];
  };
  marquee: string[];
  stats: { value: string; label: string }[];
  skills: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    blurb: string;
    groups: { title: string; items: string[] }[];
    items: string[];
    filters: { all: string; web: string; embedded: string; design: string };
    notes: Record<string, string>;
    learningTitle: string;
    learning: string[];
  };
  work: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    statusLive: string;
    statusStudy: string;
    statusSoon: string;
    galleryHint: string;
    zoomHint: string;
    zoomViewerHint: string;
    placeholderNote: string;
    emptyPoster: string;
    swipe: string;
    ask: string;
    askOpen: string;
    askCancel: string;
    prevProject: string;
    nextProject: string;
    closeLabel: string;
    prevImage: string;
    nextImage: string;
    repoLink: string;
    blurb: string;
    back: string;
    open: string;
  };
  journey: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    blurb: string;
    items: {
      year: string;
      range: string;
      tag: string;
      title: string;
      place: string;
      text: string;
      stack: string[];
    }[];
  };
  projects: Project[];
  architecture: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    layers: { name: string; tech: string; text: string }[];
    decisionsTitle: string;
    decisions: { title: string; text: string }[];
    notIncluded: { title: string; items: string[] };
  };
  about: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    body: string[];
    how: { title: string; items: string[] };
    next: { title: string; text: string };
  };
  contact: {
    kicker: string;
    headlineLead: string;
    headlineAccent: string;
    headlineTail: string;
    body: string;
    emailNote: string;
    githubNote: string;
    linkedinNote: string;
    whatsappNote: string;
    instagramNote: string;
    sandboxNote: string;
    pending: string;
    quote: string;
    ask: string;
    askOpen: string;
    askCancel: string;
  };
  footer: string;
};

const id: Copy = {
  meta: {
    title: "Rayendra Aldo Putra — Portofolio | Politeknik Negeri Batam | raldoputradev",
    description:
      "Portofolio Rayendra Aldo Putra. Mahasiswa Teknik Robotika, Politeknik Negeri Batam. SmartBrail: sidik jari, Laravel, Flutter, ESP32 — local-first, lalu sync ke server.",
  },
  nav: {
    home: "Beranda",
    skills: "Keahlian",
    projects: "Proyek",
    about: "Tentang",
    journey: "Jejak",
    contact: "Kontak",
  },
  theme: { toDark: "Mode gelap", toLight: "Mode terang" },
  hero: {
    kicker: "Batam · Politeknik Negeri Batam",
    hello: "Halo, saya",
    titleLine: "Teknik Robotika · sistem dari sensor ke cloud",
    typedLines: [
      "Teknik Robotika · sensor ke cloud",
      "Edge, API, web, dan mobile",
      "Local-first, lalu sync ke server",
      "SmartBrail: sidik jari sampai dashboard",
    ],
    intro:
      "Saya merancang dan membangun perangkat lunak secara utuh — arsitektur, alur data, dan antarmuka yang tetap andal saat dipakai. Bukan kumpulan demo terpisah, melainkan sistem yang bisa dioperasikan dan dikembangkan.",
    line: "Local-first di perangkat. Sync ke server kemudian.",
    primary: "Lihat proyek",
    secondary: "Arsitektur SmartBrail",
    contactCta: "Hubungi saya",
    cv: "Unduh CV",
    cvSoon: "Coming soon",
    roles: ["IoT Developer", "Robotic Engineer", "Full-Stack", "Firmware Engineer"],
    status: "Terbuka untuk kolaborasi",
    lanyard: "Robotic Engineer · raldoputradev",
  },
  facts: {
    title: "Data singkat",
    pending: "Menyusul",
    items: [
      { label: "Program studi", value: "Teknik Robotika" },
      { label: "Kampus", value: "Politeknik Negeri Batam" },
      { label: "Domisili", value: "Batam, Kepulauan Riau" },
      { label: "Bahasa", value: "Indonesia, Inggris teknis" },
    ],
  },
  marquee: [
    "Laravel",
    "React",
    "Flutter",
    "ESP32",
    "FreeRTOS",
    "ROS2",
    "Local-first sync",
    "MQTT",
    "WebSocket",
    "Multi-role access",
    "Signed URL",
    "MySQL",
  ],
  stats: [
    { value: "1", label: "Sistem lab yang dipakai nyata" },
    { value: "4", label: "Lapisan: edge, API, web, mobile" },
    { value: "5+", label: "Bahasa & framework dipakai langsung" },
  ],
  skills: {
    kicker: "Stack",
    titleLead: "Tools &",
    titleAccent: "Tech Stack",
    blurb: "Teknologi dan tools yang saya gunakan untuk merancang, membangun, dan merawat perangkat lunak.",
    groups: [],
    items: [
      "PHP",
      "TypeScript",
      "JavaScript",
      "Dart",
      "C++",
      "C#",
      "MySQL",
      "Laravel",
      "Blade",
      "React",
      "Next.js",
      "Vite",
      "Tailwind",
      "Flutter",
      "Node.js",
      "Git",
      "GitHub",
      "Figma",
      "Docker",
    ],
    filters: { all: "Semua", web: "Web", embedded: "Embedded", design: "Craft" },
    notes: {
      Laravel: "API SmartBrail",
      Blade: "Dashboard laboran",
      React: "Situs publik SmartBrail",
      Flutter: "Aplikasi mahasiswa",
      ESP32: "Firmware mesin sidik jari",
      "C++": "FreeRTOS di ESP32",
      MySQL: "Skema SmartBrail",
      "C#": "Afis Fingerprint Analyzer",
      "Next.js": "Portofolio ini",
      Figma: "Alur dan antarmuka",
    },
    learningTitle: "Sedang dipelajari",
    learning: ["C#", "TensorFlow", "OpenCV"],
  },
  work: {
    kicker: "Project pilihan",
    titleLead: "Project",
    titleAccent: "Pilihan",
    statusLive: "Sistem berjalan",
    statusStudy: "Studi kampus",
    statusSoon: "Menyusul",
    galleryHint: "Geser, atau pakai panah untuk berganti",
    zoomHint: "Klik gambar untuk memperbesar",
    zoomViewerHint: "Cubit untuk zoom · geser · ketuk dua kali · tutup",
    placeholderNote: "Tangkapan layar menyusul — poster kosong dulu, isi belakangan.",
    emptyPoster: "Poster menyusul",
    swipe: "Geser",
    ask: "Buka proyek?",
    askOpen: "Buka",
    askCancel: "Batal",
    prevProject: "Proyek sebelumnya",
    nextProject: "Proyek berikutnya",
    closeLabel: "Tutup",
    prevImage: "Gambar sebelumnya",
    nextImage: "Gambar berikutnya",
    repoLink: "Buka di GitHub",
    blurb:
      "Hanya proyek yang benar-benar ada. Kartu kiri atau kanan menggeser dulu; klik kartu di tengah untuk membuka studi kasus.",
    back: "Kembali ke proyek",
    open: "Buka studi kasus",
  },
  journey: {
    kicker: "Jejak",
    titleLead: "Jejak",
    titleAccent: "Saya",
    blurb:
      "Alur dari SMK sampai sistem lab yang dipakai nyata — tahun ajaran dan proyek, sesuai CV. Magang belum dimulai.",
    items: [
      {
        year: "2026",
        range: "Feb – Jul 2026",
        tag: "Proyek",
        title: "SMARTBRAIL — web, mobile & IoT",
        place: "BRAIL · Politeknik Negeri Batam",
        text: "Sistem manajemen laboratorium pintar: absensi sidik jari, akses ruangan RFID/PIN, persetujuan ruangan, dan PBL — API Laravel, panel admin Inertia/React, situs publik, aplikasi Flutter, dan firmware ESP32-S3 offline-first. Termasuk Afis Fingerprint Analyzer (C#) untuk audit template — bukan mesin matching absensi.",
        stack: ["Laravel", "Flutter", "ESP32", "MySQL", "React", "C#"],
      },
      {
        year: "2025",
        range: "Agu 2025 – Jan 2026",
        tag: "Mekanikal",
        title: "SMARTBRAIL — rancang bangun perangkat",
        place: "Laboratorium Polibatam",
        text: "Rumah modul sidik jari, keypad, display, dan unit kontrol pintu; rute kabel agar papan tetap bisa diservis. Prototype enclosure pertama diiterasi setelah dirakit — fit dan riset belum matang untuk mesin jadi.",
        stack: ["SolidWorks", "Fabrikasi"],
      },
      {
        year: "2024",
        range: "Okt 2024 – Jul 2025",
        tag: "Mekanikal",
        title: "Filament Length Meter",
        place: "Kampus · printer 3D",
        text: "Alat ukur pemakaian filamen agar sisa material bisa diperkirakan, bukan ditebak dari spool. Desain jalur filamen, kontak roller/idler, dan dudukan yang tidak menghalangi cetak.",
        stack: ["SolidWorks", "Perakitan"],
      },
      {
        year: "2024",
        range: "Agu 2024 – sekarang",
        tag: "Organisasi",
        title: "BRAIL",
        place: "Barelang Robotics of Artificial Intelligence Lab",
        text: "Anggota tim proyek SIMALAS. Diskusi teknis dan pengembangan sistem IoT berbasis mikrokontroler di lab.",
        stack: ["IoT", "Kolaborasi lab"],
      },
      {
        year: "2023",
        range: "Agu 2023 – Agu 2024",
        tag: "Mekanikal",
        title: "Transporter Robot (line follower)",
        place: "Lomba kampus · Polibatam",
        text: "Satu robot, dua aturan lomba. Semester 1: sasis, gripper, dan dudukan sensor untuk ambil kotak lalu bawa ke stasiun lain. Semester 2: robot yang sama, ditambah lift agar kotak diangkat, dipindah, dan diletakkan di tujuan. Kode line-follower bukan bagian saya.",
        stack: ["SolidWorks", "Gripper"],
      },
      {
        year: "2023",
        range: "Agu 2023 – sekarang",
        tag: "Pendidikan",
        title: "D4 Teknik Robotika",
        place: "Politeknik Negeri Batam",
        text: "Masuk jalur vokasi robotika. Fokus bergeser dari mekanikal kompetisi ke perangkat lunak yang menyambung perangkat, API, dan aplikasi dalam satu sistem.",
        stack: ["C++", "ESP32"],
      },
      {
        year: "2023",
        range: "Agu 2023",
        tag: "Organisasi",
        title: "Inaugurasi Laksamana 2023",
        place: "Politeknik Negeri Batam",
        text: "Kegiatan inaugurasi kampus di awal masa studi D4 — sesuai CV, bukan magang dan bukan jabatan.",
        stack: [],
      },
      {
        year: "2020",
        range: "Jul 2020 – Apr 2023",
        tag: "Pendidikan",
        title: "Teknik Komputer dan Jaringan",
        place: "SMK Negeri 7 Batam",
        text: "Fondasi kelistrikan, jaringan, dan kerja bengkel sebelum masuk politeknik.",
        stack: ["Jaringan", "Kelistrikan"],
      },
    ],
  },
  projects: [
    {
      slug: "smartbrail",
      name: "SmartBrail",
      role: "Full-stack & IoT",
      status: "live",
      summary:
        "Sistem manajemen laboratorium pintar untuk BRAIL, Politeknik Negeri Batam — absensi sidik jari/RFID/PIN, akses ruangan berbasis jadwal & izin, persetujuan ruangan, manajemen PBL, dan monitoring realtime. Live di smartbrail.com untuk admin, laboran, dosen, dan mahasiswa.",
      features: [
        "Absensi sidik jari dengan sesi, kebijakan keterlambatan, dan kalender akademik",
        "Akses ruangan via RFID / PIN / sidik jari — diverifikasi server, tetap jalan offline lewat cache ACL mesin",
        "Persetujuan pemakaian ruangan + riwayat akses per ruangan",
        "Periode akademik & kenaikan semester dengan review cuti/mengulang",
        "Monitoring operasional realtime (Laravel Reverb): telemetri, pintu, status perangkat",
        "Jejak audit admin + asisten AI kontekstual per peran",
      ],
      contributionTitle: "Kontribusi saya",
      contribution:
        "Merancang dan menulis seluruh lapisan: skema database, API Laravel, panel admin Inertia/React, situs publik, aplikasi Flutter, dan firmware ESP32-S3 dua unit (panel depan + kontrol belakang, ESP-NOW terenkripsi). Termasuk keamanan (throttle, middleware izin, HTTPS) dan arsitektur akses offline-first.",
      stack: ["Laravel", "Inertia", "React", "Flutter", "C++ / FreeRTOS", "ESP32-S3", "MySQL", "Reverb"],
      repoUrl: "https://github.com/raldoputradev/smartbrail-showcase",
      repoLabel: "raldoputradev/smartbrail-showcase",
      liveUrl: "https://smartbrail.com",
      liveLabel: "smartbrail.com",
      images: [
        { src: "/projects/simalas-dashboard.png", caption: "Dashboard laboran: KPI, tren aktivitas IoT, distribusi peran", tag: "Web admin", width: 1024, height: 506 },
        { src: "/projects/simalas-ai.png", caption: "Asisten AI internal dengan konfirmasi sebelum mengubah data", tag: "Asisten AI", width: 1024, height: 509 },
        { src: "/projects/simalas-report.png", caption: "Laporan periodik: filter kelas, tren kehadiran, ekspor Excel/PDF/Word", tag: "Rekap", width: 1024, height: 507 },
        { src: "/projects/simalas-login.png", caption: "Login terpisah untuk dosen dan laboran", tag: "Autentikasi", width: 1024, height: 503 },
        { src: "/projects/simalas-landing.png", caption: "Landing page publik dan halaman unduh APK", tag: "Situs publik", width: 1024, height: 507 },
        { src: "/projects/simalas-app-home.png", caption: "Aplikasi mahasiswa: menu utama dan ringkasan lab", tag: "Mobile", width: 460, height: 960 },
        { src: "/projects/simalas-app-attendance.png", caption: "Aplikasi mahasiswa: rekap kehadiran, grafik, dan kalender", tag: "Mobile", width: 460, height: 960 },
        { src: "/projects/simalas-app-locker.png", caption: "Aplikasi mahasiswa: arsip pengambilan loker dengan bukti foto", tag: "Mobile", width: 460, height: 960 },
        { src: "/projects/simalas-app-helpdesk.png", caption: "Helpdesk AI di aplikasi mahasiswa", tag: "Mobile", width: 460, height: 960 },
        { src: "/projects/simalas-app-welcome.png", caption: "Onboarding dan gerbang masuk aplikasi", tag: "Mobile", width: 460, height: 960 },
      ],
    },
    {
      slug: "afis-fingerprint-analyzer",
      name: "Afis Fingerprint Analyzer",
      role: "Desktop · C#",
      status: "live",
      summary:
        "Aplikasi Windows untuk mengaudit blob template DY50/R307 (512 byte) yang dipakai SmartBrail, plus tab terpisah untuk citra sensor. Bukan rekonstruksi foto jari dan bukan mesin matching absensi.",
      features: [
        "Peta byte 32×16, histogram, hex, skor entropi, dan CRC32 untuk blob 512 byte",
        "Tab citra: foto abu-abu, kerangka ridge, titik ujung/cabang — hanya jika ada berkas gambar",
        "Contoh fiktif di samples/; tidak memakai data mahasiswa atau lab",
        "Dua jenis data tidak saling didekode: template on-sensor tetap bukan foto KTP",
      ],
      contributionTitle: "Kontribusi saya",
      contribution:
        "Merancang dan menulis aplikasi WinForms .NET 8: parser blob, peta byte, inspeksi citra, dan README yang memisahkan klaim jujur dari eksperimen filter AFIS berbasis foto.",
      stack: ["C#", ".NET 8", "WinForms"],
      repoUrl: "https://github.com/raldoputradev/afis-fingerprint-analyzer",
      repoLabel: "raldoputradev/afis-fingerprint-analyzer",
      images: [
        { src: "/projects/afis-template.png", caption: "Tab template: blob sintetis, skor 99, histogram byte — tetap peta byte, bukan foto jari", tag: "Template 512 byte", width: 1024, height: 674 },
        { src: "/projects/afis-citra.png", caption: "Tab citra: ridge sintetis (bukan jari orang), kerangka, histogram intensitas", tag: "Citra sensor", width: 1024, height: 667 },
        { src: "/projects/afis-kosong.png", caption: "Contoh kosong: semua byte 0, skor 0", tag: "Sampel", width: 966, height: 629 },
        { src: "/projects/afis-tipis.png", caption: "Contoh tipis: sedikit nilai bukan nol, skor rendah", tag: "Sampel", width: 967, height: 632 },
      ],
    },
  ],
  architecture: {
    kicker: "Bagaimana SmartBrail disusun",
    titleLead: "Arsitektur",
    titleAccent: "Sistem",
    layers: [
      {
        name: "Edge",
        tech: "ESP32 · C++ · FreeRTOS",
        text: "Modul sidik jari, penyimpanan lokal di flash, antrian tap saat offline, sync ke server saat jaringan kembali.",
      },
      {
        name: "API",
        tech: "Laravel · PHP 8.3",
        text: "Endpoint mesin (header X-API-KEY) terpisah dari endpoint mobile (token). Throttle, signed URL, middleware peran dan izin.",
      },
      {
        name: "Web",
        tech: "Inertia · React · Tailwind",
        text: "Panel admin multi-peran (admin, laboran, dosen) dengan Inertia + React: pengguna, absensi, ruangan, mesin, monitoring realtime, audit, asisten AI. Situs publik dan halaman unduh APK juga React.",
      },
      {
        name: "Mobile",
        tech: "Flutter · Dart · Gemini",
        text: "Mahasiswa: absensi, jadwal, pengumuman, pengajuan ruangan tim. Helpdesk AI untuk pertanyaan operasional.",
      },
    ],
    decisionsTitle: "Keputusan desain",
    decisions: [
      {
        title: "Local-first di mesin, bukan wajib online",
        text: "Tap tercatat di perangkat lebih dulu. Server menerima sync kemudian. Ini kebutuhan laboratorium, bukan tren arsitektur.",
      },
      {
        title: "Dua unit per mesin akses",
        text: "Panel depan (RFID, keypad, display) terpisah dari kontrol belakang (relay pintu) — berkomunikasi via ESP-NOW terenkripsi. Kabel daya pintu tidak terjangkau dari sisi luar.",
      },
      {
        title: "Mesin bukan pengguna",
        text: "Auth perangkat dan auth manusia dipisah. Kunci mesin tidak pernah menjadi sesi browser.",
      },
    ],
    notIncluded: {
      title: "Yang sengaja tidak dipublikasikan",
      items: [
        "API key mesin, token, dan kredensial email",
        "Data mahasiswa, template sidik jari, dan log operasional",
        "Repo produksi SmartBrail (tetap private)",
      ],
    },
  },
  about: {
    kicker: "Tentang saya",
    titleLead: "Tentang",
    titleAccent: "Saya",
    body: [
      "Saya merancang sistem laboratorium yang tetap berjalan saat jaringan putus — dari mesin sidik jari sampai aplikasi mahasiswa.",
      "Mahasiswa Teknik Robotika di Politeknik Negeri Batam (raldoputradev). Yang saya tunjukkan adalah sistem yang dipakai di lab, dengan keputusan desain yang bisa ditelusuri: edge, API, web, dan mobile dalam satu rantai.",
      "AI saya pakai sebagai asisten, bukan penulis tanpa kendali. Utang teknis saya perlakukan sebagai pekerjaan yang harus dirapikan, bukan disembunyikan.",
    ],
    how: {
      title: "Yang saya kerjakan sendiri",
      items: [
        "Backend Laravel: throttle, signed URL, middleware izin, query aman lewat Eloquent",
        "Dashboard staf laboratorium dengan Blade + Tailwind, situs publik dengan React",
        "Aplikasi Flutter untuk mahasiswa, termasuk asisten Gemini",
        "Firmware C++/FreeRTOS dan sinkronisasi hybrid",
        "Aplikasi desktop C# / WinForms untuk audit template sidik jari SmartBrail",
      ],
    },
    next: {
      title: "Yang sedang saya siapkan",
      text: "SmartBrail dan Afis Fingerprint Analyzer sudah terbuka di GitHub. Berikutnya: uji citra dari mesin setelah kampus buka, dengan data enroll milik saya sendiri — bukan foto lab.",
    },
  },
  contact: {
    kicker: "Mari terhubung",
    headlineLead: "Mari bangun sistem yang",
    headlineAccent: "tetap jalan",
    headlineTail: "meski jaringannya mati.",
    body: "Untuk kesempatan magang, kolaborasi sistem, atau pertanyaan teknis — email paling cepat.",
    emailNote: "Balasan paling cepat",
    githubNote: "Kode dan commit",
    linkedinNote: "Profil profesional",
    whatsappNote: "Untuk hal yang mendesak",
    instagramNote: "Sisi non-teknis",
    sandboxNote: "Kode lengkap, tanpa data lab",
    pending: "Menyusul",
    quote:
      "Perangkat lunak yang baik bukan hanya soal menulis kode, tapi merancang sistem yang menyelesaikan masalah nyata — termasuk ketika jaringannya mati.",
    ask: "Buka halaman?",
    askOpen: "Buka",
    askCancel: "Batal",
  },
  footer: "Rayendra Aldo Putra · Portofolio",
};

const en: Copy = {
  meta: {
    title: "Rayendra Aldo Putra — Portfolio | Politeknik Negeri Batam | raldoputradev",
    description:
      "Portfolio of Rayendra Aldo Putra. Robotics student at Politeknik Negeri Batam. SmartBrail: fingerprint devices, Laravel, Flutter, ESP32 — local-first, then sync to the server.",
  },
  nav: {
    home: "Home",
    skills: "Skills",
    projects: "Projects",
    about: "About",
    journey: "Journey",
    contact: "Contact",
  },
  theme: { toDark: "Dark mode", toLight: "Light mode" },
  hero: {
    kicker: "Batam · Politeknik Negeri Batam",
    hello: "Hello, I am",
    titleLine: "Robotics Engineering · systems from sensor to cloud",
    typedLines: [
      "Robotics Engineering · sensor to cloud",
      "Edge, API, web, and mobile",
      "Local-first, then sync to the server",
      "SmartBrail: fingerprint to dashboard",
    ],
    intro:
      "I design and build software end to end — architecture, data flow, and interfaces that stay reliable in real use. Not a pile of isolated demos, but systems that can be operated and extended.",
    line: "Local-first on the device. Sync to the server later.",
    primary: "View projects",
    secondary: "SmartBrail architecture",
    contactCta: "Contact me",
    cv: "Download CV",
    cvSoon: "Coming soon",
    roles: ["IoT Developer", "Robotic Engineer", "Full-Stack", "Firmware Engineer"],
    status: "Open to collaboration",
    lanyard: "Robotic Engineer · raldoputradev",
  },
  facts: {
    title: "Quick facts",
    pending: "Coming soon",
    items: [
      { label: "Programme", value: "Robotics Engineering" },
      { label: "Campus", value: "Politeknik Negeri Batam" },
      { label: "Based in", value: "Batam, Riau Islands, Indonesia" },
      { label: "Languages", value: "Indonesian, technical English" },
    ],
  },
  marquee: [
    "Laravel",
    "React",
    "Flutter",
    "ESP32",
    "FreeRTOS",
    "ROS2",
    "Local-first sync",
    "MQTT",
    "WebSocket",
    "Multi-role access",
    "Signed URL",
    "MySQL",
  ],
  stats: [
    { value: "1", label: "Lab system in real use" },
    { value: "4", label: "Layers: edge, API, web, mobile" },
    { value: "5+", label: "Languages & frameworks used hands-on" },
  ],
  skills: {
    kicker: "Stack",
    titleLead: "Tools &",
    titleAccent: "Tech Stack",
    blurb: "Technologies and tools I use to design, build, and maintain software.",
    groups: [],
    items: [
      "PHP",
      "TypeScript",
      "JavaScript",
      "Dart",
      "C++",
      "C#",
      "MySQL",
      "Laravel",
      "Blade",
      "React",
      "Next.js",
      "Vite",
      "Tailwind",
      "Flutter",
      "Node.js",
      "Git",
      "GitHub",
      "Figma",
      "Docker",
    ],
    filters: { all: "All", web: "Web", embedded: "Embedded", design: "Craft" },
    notes: {
      Laravel: "SmartBrail API",
      Blade: "Lab staff dashboard",
      React: "SmartBrail public site",
      Flutter: "Student app",
      ESP32: "Fingerprint firmware",
      "C++": "FreeRTOS on ESP32",
      MySQL: "SmartBrail schema",
      "C#": "Afis Fingerprint Analyzer",
      "Next.js": "This portfolio",
      Figma: "Flows and UI",
    },
    learningTitle: "Currently learning",
    learning: ["C#", "TensorFlow", "OpenCV"],
  },
  work: {
    kicker: "Chosen work",
    titleLead: "Chosen",
    titleAccent: "Projects",
    statusLive: "Running system",
    statusStudy: "Course work",
    statusSoon: "Upcoming",
    galleryHint: "Swipe or use the arrows to switch",
    zoomHint: "Click the image to enlarge",
    zoomViewerHint: "Pinch to zoom · drag · double tap · close",
    placeholderNote: "Screenshot coming soon — empty posters for now.",
    emptyPoster: "Poster coming soon",
    swipe: "Slide",
    ask: "Open this project?",
    askOpen: "Open",
    askCancel: "Cancel",
    prevProject: "Previous project",
    nextProject: "Next project",
    closeLabel: "Close",
    prevImage: "Previous image",
    nextImage: "Next image",
    repoLink: "Open on GitHub",
    blurb:
      "Real projects only. Side cards slide into place first; click the center card to open the case study.",
    back: "Back to projects",
    open: "Open case study",
  },
  journey: {
    kicker: "Journey",
    titleLead: "My",
    titleAccent: "Journey",
    blurb:
      "From vocational school to a lab system in real use — academic years and projects, matching the CV. An internship has not started.",
    items: [
      {
        year: "2026",
        range: "Feb – Jul 2026",
        tag: "Project",
        title: "SMARTBRAIL — web, mobile & IoT",
        place: "BRAIL · Politeknik Negeri Batam",
        text: "Smart laboratory management: fingerprint attendance, RFID/PIN room access, room approvals, and PBL — a Laravel API, Inertia/React admin panel, public site, Flutter app, and offline-first ESP32-S3 firmware. Includes Afis Fingerprint Analyzer (C#) to audit templates — not the attendance matcher.",
        stack: ["Laravel", "Flutter", "ESP32", "MySQL", "React", "C#"],
      },
      {
        year: "2025",
        range: "Aug 2025 – Jan 2026",
        tag: "Mechanical",
        title: "SMARTBRAIL — physical build",
        place: "Polibatam laboratory",
        text: "Housings for the fingerprint module, keypad, display, and door-control unit; cable routing so boards stay serviceable. The first access enclosure was an early prototype — then mounts and layout were iterated after assembly.",
        stack: ["SolidWorks", "Fabrication"],
      },
      {
        year: "2024",
        range: "Oct 2024 – Jul 2025",
        tag: "Mechanical",
        title: "Filament Length Meter",
        place: "Campus · 3D printer",
        text: "A meter for how much filament a printer has used, so remaining material can be estimated instead of guessed from the spool. Filament path, roller/idler contact, and a mount that does not block printing.",
        stack: ["SolidWorks", "Assembly"],
      },
      {
        year: "2024",
        range: "Aug 2024 – present",
        tag: "Organization",
        title: "BRAIL",
        place: "Barelang Robotics of Artificial Intelligence Lab",
        text: "Member of the SIMALAS project team. Technical discussions and microcontroller-based IoT work in the lab.",
        stack: ["IoT", "Lab collaboration"],
      },
      {
        year: "2023",
        range: "Aug 2023 – Aug 2024",
        tag: "Mechanical",
        title: "Transporter Robot (line follower)",
        place: "Campus competition · Polibatam",
        text: "One robot, two competition rule-sets. Semester 1: chassis, gripper, and sensor mounts to pick up a box and carry it to another station. Semester 2: the same robot, with a lift so the box could be raised, moved, and placed. Line-follower code was not my part.",
        stack: ["SolidWorks", "Gripper"],
      },
      {
        year: "2023",
        range: "Aug 2023 – present",
        tag: "Education",
        title: "D4 Robotics Engineering",
        place: "Politeknik Negeri Batam",
        text: "Entered the vocational robotics track. Focus moved from competition mechanics to software that connects devices, APIs, and applications as one system.",
        stack: ["C++", "ESP32"],
      },
      {
        year: "2023",
        range: "Aug 2023",
        tag: "Organization",
        title: "Inaugurasi Laksamana 2023",
        place: "Politeknik Negeri Batam",
        text: "Campus inauguration at the start of the D4 programme — listed on the CV; not an internship or a titled role.",
        stack: [],
      },
      {
        year: "2020",
        range: "Jul 2020 – Apr 2023",
        tag: "Education",
        title: "Computer and Network Engineering",
        place: "SMK Negeri 7 Batam",
        text: "Vocational foundation in electrical work, networking, and workshop practice before polytechnic.",
        stack: ["Networking", "Electrical"],
      },
    ],
  },
  projects: [
    {
      slug: "smartbrail",
      name: "SmartBrail",
      role: "Full-stack & IoT",
      status: "live",
      summary:
        "Smart laboratory management for BRAIL at Politeknik Negeri Batam — fingerprint/RFID/PIN attendance, schedule- and permission-based room access, room approvals, PBL team management, and realtime monitoring. Live at smartbrail.com for admins, lab staff, lecturers, and students.",
      features: [
        "Fingerprint attendance with sessions, lateness policy, and academic calendar",
        "Room access via RFID / PIN / fingerprint — server-verified, keeps working offline through an on-device ACL cache",
        "Room-usage approvals + per-room access history",
        "Academic periods & semester promotion with leave/repeat review",
        "Realtime operations monitoring (Laravel Reverb): telemetry, doors, device status",
        "Admin audit trail + contextual AI assistant per role",
      ],
      contributionTitle: "My contribution",
      contribution:
        "Designed and wrote every layer: database schema, Laravel API, Inertia/React admin panel, public site, Flutter app, and dual-unit ESP32-S3 firmware (front panel + back controller over encrypted ESP-NOW). Including security (throttle, permission middleware, HTTPS) and the offline-first access architecture.",
      stack: ["Laravel", "Inertia", "React", "Flutter", "C++ / FreeRTOS", "ESP32-S3", "MySQL", "Reverb"],
      repoUrl: "https://github.com/raldoputradev/smartbrail-showcase",
      repoLabel: "raldoputradev/smartbrail-showcase",
      liveUrl: "https://smartbrail.com",
      liveLabel: "smartbrail.com",
      images: [
        { src: "/projects/simalas-dashboard.png", caption: "Staff dashboard: KPIs, IoT activity trend, role split", tag: "Web admin", width: 1024, height: 506 },
        { src: "/projects/simalas-ai.png", caption: "Internal AI assistant, confirmation required before data changes", tag: "AI assistant", width: 1024, height: 509 },
        { src: "/projects/simalas-report.png", caption: "Periodic report: class filters, attendance trend, Excel/PDF/Word export", tag: "Reporting", width: 1024, height: 507 },
        { src: "/projects/simalas-login.png", caption: "Separate sign-in for lecturers and lab staff", tag: "Auth", width: 1024, height: 503 },
        { src: "/projects/simalas-landing.png", caption: "Public landing page and APK download", tag: "Public site", width: 1024, height: 507 },
        { src: "/projects/simalas-app-home.png", caption: "Student app: main menu and lab summary", tag: "Mobile", width: 460, height: 960 },
        { src: "/projects/simalas-app-attendance.png", caption: "Student app: attendance recap, chart, and calendar", tag: "Mobile", width: 460, height: 960 },
        { src: "/projects/simalas-app-locker.png", caption: "Student app: locker pickup archive with photo proof", tag: "Mobile", width: 460, height: 960 },
        { src: "/projects/simalas-app-helpdesk.png", caption: "AI helpdesk inside the student app", tag: "Mobile", width: 460, height: 960 },
        { src: "/projects/simalas-app-welcome.png", caption: "Onboarding and sign-in gate", tag: "Mobile", width: 460, height: 960 },
      ],
    },
    {
      slug: "afis-fingerprint-analyzer",
      name: "Afis Fingerprint Analyzer",
      role: "Desktop · C#",
      status: "live",
      summary:
        "A Windows desktop tool to audit the 512-byte DY50/R307 character templates used by SmartBrail, plus a separate tab for sensor images. Not a reconstructed fingerprint photo and not an attendance matcher.",
      features: [
        "32×16 byte map, histogram, hex, entropy score, and CRC32 for a 512-byte blob",
        "Image tab: grayscale, ridge skeleton, endings/bifurcations — only when an image file exists",
        "Fictional samples only; no student or lab templates",
        "The two data types are not interchangeable: an on-sensor template is never a KTP-style photo",
      ],
      contributionTitle: "My contribution",
      contribution:
        "Designed and wrote the .NET 8 WinForms app: blob parser, byte map, image inspector, and a README that keeps honest claims separate from photo-based AFIS filter papers.",
      stack: ["C#", ".NET 8", "WinForms"],
      repoUrl: "https://github.com/raldoputradev/afis-fingerprint-analyzer",
      repoLabel: "raldoputradev/afis-fingerprint-analyzer",
      images: [
        { src: "/projects/afis-template.png", caption: "Template tab: synthetic blob, score 99, byte histogram — still a byte map, not a finger photo", tag: "512-byte template", width: 1024, height: 674 },
        { src: "/projects/afis-citra.png", caption: "Image tab: synthetic ridges (not a real finger), skeleton, intensity histogram", tag: "Sensor image", width: 1024, height: 667 },
        { src: "/projects/afis-kosong.png", caption: "Empty sample: all bytes 0, score 0", tag: "Sample", width: 966, height: 629 },
        { src: "/projects/afis-tipis.png", caption: "Sparse sample: few non-zero bytes, low score", tag: "Sample", width: 967, height: 632 },
      ],
    },
  ],
  architecture: {
    kicker: "How SmartBrail is built",
    titleLead: "System",
    titleAccent: "Architecture",
    layers: [
      {
        name: "Edge",
        tech: "ESP32 · C++ · FreeRTOS",
        text: "Fingerprint module, local flash storage, offline tap queue, sync to the server when the link returns.",
      },
      {
        name: "API",
        tech: "Laravel · PHP 8.3",
        text: "Machine endpoints (X-API-KEY header) stay separate from mobile endpoints (token). Throttle, signed URLs, role and permission middleware.",
      },
      {
        name: "Web",
        tech: "Inertia · React · Tailwind",
        text: "Multi-role admin panel (admin, lab staff, lecturers) in Inertia + React: users, attendance, rooms, machines, realtime monitoring, audit, AI assistant. The public site and APK download page also use React.",
      },
      {
        name: "Mobile",
        tech: "Flutter · Dart · Gemini",
        text: "Students: attendance, schedules, announcements, team room requests. An AI helpdesk for operational questions.",
      },
    ],
    decisionsTitle: "Design decisions",
    decisions: [
      {
        title: "Local-first on the device, not online-only",
        text: "A tap is recorded on the machine first. The server receives a sync later. That is a lab constraint, not an architecture trend.",
      },
      {
        title: "Two units per access machine",
        text: "A front panel (RFID, keypad, display) separate from a back controller (door relay) — linked over encrypted ESP-NOW. Door-power wiring stays unreachable from outside.",
      },
      {
        title: "Machines are not users",
        text: "Device auth and human auth are separate. A machine key is never a browser session.",
      },
    ],
    notIncluded: {
      title: "Deliberately unpublished",
      items: [
        "Machine API keys, tokens, and mail credentials",
        "Student records, fingerprint templates, and operational logs",
        "The production SmartBrail repo (stays private)",
      ],
    },
  },
  about: {
    kicker: "About me",
    titleLead: "About",
    titleAccent: "Me",
    body: [
      "I design lab systems that keep running when the network drops — from fingerprint machines to the student app.",
      "Robotics Engineering student at Politeknik Negeri Batam (raldoputradev). What I show is a system used in the lab, with design decisions you can trace: edge, API, web, and mobile in one chain.",
      "I use AI as an assistant, not an unsupervised author. I treat technical debt as work to clean up, not to hide.",
    ],
    how: {
      title: "What I build myself",
      items: [
        "Laravel backend: throttle, signed URLs, permission middleware, safe queries through Eloquent",
        "Lab staff dashboard in Blade + Tailwind, public site in React",
        "Flutter app for students, including a Gemini assistant",
        "C++/FreeRTOS firmware and hybrid sync",
        "C# / WinForms desktop auditor for SmartBrail fingerprint templates",
      ],
    },
    next: {
      title: "What I am preparing",
      text: "SmartBrail and Afis Fingerprint Analyzer are public on GitHub. Next: test a sensor image from the lab machine after campus reopens, using my own enroll data — not lab photos.",
    },
  },
  contact: {
    kicker: "Get in touch",
    headlineLead: "Let's build systems that",
    headlineAccent: "keep running",
    headlineTail: "even when the network dies.",
    body: "For internship opportunities, systems work, or technical questions — email is fastest.",
    emailNote: "Fastest reply",
    githubNote: "Code and commits",
    linkedinNote: "Professional profile",
    whatsappNote: "For urgent matters",
    instagramNote: "The non-technical side",
    sandboxNote: "Full source, no lab data",
    pending: "Coming soon",
    quote:
      "Good software is not only about writing code, but designing systems that solve real problems — including when the network is down.",
    ask: "Open this page?",
    askOpen: "Open",
    askCancel: "Cancel",
  },
  footer: "Rayendra Aldo Putra · Portfolio",
};

const dictionaries: Record<Locale, Copy> = { id, en };

export function getCopy(locale: Locale): Copy {
  return dictionaries[locale];
}

export function getProject(locale: Locale, slug: string) {
  return getCopy(locale).projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return getCopy("id").projects.map((project) => project.slug);
}
