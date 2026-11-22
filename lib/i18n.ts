import type { Locale } from "./site";

export type ProjectImage = { src: string; caption: string; mobile?: boolean };

export type Project = {
  slug: string;
  name: string;
  role: string;
  status: "live" | "study" | "soon";
  semester?: string;
  summary: string;
  features: string[];
  stack: string[];
  images: ProjectImage[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
};

const id = {
  meta: {
    title: "Rayendra Aldo Putra — Robotic Engineer & Full-Stack Developer",
    description:
      "Portofolio Rayendra Aldo Putra, mahasiswa D4 Teknik Robotika Politeknik Negeri Batam. Membangun sistem end-to-end: firmware ESP32, backend Laravel, aplikasi Flutter, hingga deployment.",
  },
  nav: {
    home: "Beranda",
    about: "Tentang",
    focus: "Fokus",
    skills: "Keahlian",
    projects: "Proyek",
    certs: "Sertifikat",
    contact: "Kontak",
    hire: "Hire me",
  },
  hero: {
    status: "Terbuka untuk magang & kolaborasi",
    kicker: "Batam, Indonesia — Politeknik Negeri Batam",
    roles: ["Robotic Engineer", "Firmware Engineer", "Full-Stack Developer", "IoT Builder"],
    intro:
      "Mahasiswa D4 Teknik Robotika yang merancang dan membangun perangkat lunak secara utuh — arsitektur, alur data, dan antarmuka yang tetap andal saat dipakai. Bukan kumpulan demo terpisah, melainkan sistem yang bisa dioperasikan dan dikembangkan.",
    primary: "Lihat proyek",
    contactCta: "Hubungi saya",
    cv: "Lihat CV",
    cvSoon: "CV sedang disiapkan. Sementara, silakan hubungi saya lewat email atau LinkedIn.",
    photoSoon: "Foto menyusul",
  },
  stats: [
    { value: 1, suffix: "", label: "Sistem dipakai operasional nyata" },
    { value: 4, suffix: "", label: "Lapisan: edge, API, web, mobile" },
    { value: 5, suffix: "+", label: "Bahasa & framework produksi" },
  ],
  marquee: [
    "ESP32-S3",
    "FreeRTOS",
    "ROS2",
    "Local-first sync",
    "MQTT",
    "WebSocket",
    "Multi-role access",
    "Signed URL",
    "MySQL",
    "Inertia",
    "Flutter",
    "C#",
  ],
  about: {
    kicker: "Tentang saya",
    titleLead: "Membangun sistem",
    titleAccent: "dari nol sampai dipakai.",
    body: [
      "Saya Rayendra Aldo Putra, mahasiswa D4 Teknik Robotika di Politeknik Negeri Batam. Fokus saya bukan sekadar menulis kode, tetapi membangun sistem yang utuh — dari firmware di perangkat edge sampai antarmuka yang dipakai orang setiap hari.",
      "Proyek utama saya, SmartBrail, adalah contoh nyata: sistem kehadiran dan akses ruangan berbasis RFID + fingerprint yang dipakai operasional di laboratorium BRAIL — dirancang dari nol, dari skema database sampai deployment.",
      "Saya terbiasa bekerja lintas lapisan: embedded C++ di ESP32, backend Laravel + Inertia, aplikasi mobile Flutter, dan tooling desktop C#. Semua dikerjakan sendiri, bukan hasil tempel-menempel.",
    ],
    how: {
      title: "Cara saya bekerja",
      items: [
        "Pahami masalah nyata di lapangan sebelum memilih teknologi.",
        "Rancang arsitektur dan skema data dulu, baru implementasi.",
        "Uji di kondisi nyata — offline, multi-pengguna, edge case.",
        "Dokumentasikan supaya sistem bisa dirawat orang lain.",
      ],
    },
    next: {
      title: "Sedang difokuskan",
      text: "Mencari kesempatan magang untuk menerapkan pengalaman membangun sistem nyata di lingkungan tim profesional — embedded, full-stack, atau IoT.",
    },
  },
  facts: {
    title: "Fakta singkat",
    pending: "Menyusul",
    items: [
      { label: "Program studi", value: "D4 Teknik Robotika" },
      { label: "Kampus", value: "Politeknik Negeri Batam" },
      { label: "Domisili", value: "Batam, Kepulauan Riau" },
      { label: "Bahasa", value: "Indonesia, Inggris" },
      { label: "Status", value: "Open to internship" },
    ],
  },
  focus: {
    kicker: "Fokus",
    titleLead: "Empat lapisan yang",
    titleAccent: "saya kerjakan.",
    blurb: "Satu orang, satu sistem utuh — dari silikon sampai layar.",
    items: [
      {
        title: "Embedded & Firmware",
        text: "Firmware ESP32-S3 dengan FreeRTOS: task, queue, dan sinkronisasi local-first yang tetap jalan saat jaringan putus.",
        stack: ["ESP32-S3", "FreeRTOS", "MQTT", "RFID", "Fingerprint"],
        shots: ["/projects/smartbrail-mesin-design.jpg", "/projects/simalas-mesin-design.jpg"],
      },
      {
        title: "Full-Stack Web",
        text: "Backend Laravel + Inertia/React: REST API, multi-role access, audit log, laporan periodik, deployment VPS.",
        stack: ["Laravel", "React", "Inertia", "MySQL", "Nginx"],
        shots: ["/projects/simalas-dashboard.png", "/projects/simalas-landing.png"],
      },
      {
        title: "Mobile",
        text: "Aplikasi Flutter untuk absensi dan portal mahasiswa — sinkron dengan backend yang sama.",
        stack: ["Flutter", "Dart", "REST API"],
        shots: ["/projects/simalas-app-home.png", "/projects/simalas-app-attendance.png"],
      },
      {
        title: "Desktop Tooling",
        text: "Tool analisis fingerprint berbasis C#/.NET — antarmuka untuk eksperimen template dan citra.",
        stack: ["C#", ".NET", "WinForms"],
        shots: ["/projects/afis-citra.png", "/projects/afis-template.png"],
      },
    ],
  },
  skills: {
    kicker: "Keahlian",
    titleLead: "Stack yang benar-benar",
    titleAccent: "saya pakai produksi.",
    blurb: "Bukan daftar bacaan — setiap item pernah dipakai di sistem nyata.",
    filters: { all: "Semua", embedded: "Embedded", web: "Web", craft: "Pendukung" },
    items: [
      { name: "C++", group: "embedded", icon: "cplusplus.svg" },
      { name: "ESP32 / FreeRTOS", group: "embedded", icon: "espressif.svg" },
      { name: "MQTT", group: "embedded", icon: "mqtt.svg" },
      { name: "ROS2", group: "embedded", icon: "ros.svg" },
      { name: "PHP / Laravel", group: "web", icon: "php.svg" },
      { name: "JavaScript", group: "web", icon: "javascript.svg" },
      { name: "TypeScript / React", group: "web", icon: "react.svg" },
      { name: "Next.js / Inertia", group: "web", icon: "nextdotjs.svg" },
      { name: "MySQL", group: "web", icon: "mysql.svg" },
      { name: "Tailwind CSS", group: "web", icon: "tailwindcss.svg" },
      { name: "Flutter / Dart", group: "web", icon: "flutter.svg" },
      { name: "Python", group: "web", icon: "python.svg" },
      { name: "WebSocket", group: "embedded", icon: "websockets.svg" },
      { name: "Git / GitHub", group: "craft", icon: "github.svg" },
      { name: "Docker", group: "craft", icon: "docker.svg" },
      { name: "Linux / Nginx", group: "craft", icon: "nginx.svg" },
      { name: "Figma", group: "craft", icon: "figma.svg" },
    ],
    learningTitle: "Sedang dipelajari",
    learning: [
      { name: "C# / .NET", icon: "csharp.svg" },
      { name: "OpenCV", icon: "opencv.svg" },
      { name: "Gemini API", icon: "googlegemini.svg" },
    ],
  },
  work: {
    kicker: "Proyek",
    titleLead: "Kerja nyata,",
    titleAccent: "bukan demo.",
    blurb: "Sistem yang dipakai operasional — bukan sekadar latihan.",
    open: "Lihat detail",
    back: "Semua proyek",
    feats: "Fitur utama",
    stackTitle: "Stack teknis",
    repoLink: "Kode sumber",
    statusLive: "Live · dipakai",
    statusStudy: "Studi kasus",
    statusSoon: "Segera",
    campusVerified: "Terverifikasi di situs resmi Polibatam",
  },
  projects: [
    {
      slug: "smartbrail",
      name: "SmartBrail",
      role: "Perancang & pengembang end-to-end",
      status: "live",
      semester: "Semester 7",
      summary:
        "Sistem kehadiran dan akses ruangan berbasis RFID + fingerprint untuk laboratorium BRAIL, Polibatam — proyek PBL-RET-07-02, manpro Naurah Nazhifah, S.Kom., M.C.S.(AI). Luaran tim: Smart Attendance Machine dan Building Management System (akses + monitoring daya ruang mekanikal & meeting). Firmware ESP32-S3 dua unit, backend Laravel + Inertia, portal mahasiswa, laporan periodik, dan monitoring realtime — dipakai operasional sehari-hari.",
      features: [
        "Absensi RFID + verifikasi fingerprint",
        "Akses ruangan dengan ACL offline",
        "BMS — monitoring daya & kontrol fasilitas ruang mekanikal/meeting",
        "Portal mahasiswa & tim PBL",
        "Laporan periodik + monitoring realtime",
        "Asisten AI Gemini — tanya-jawab rekap & data portal",
      ],
      stack: ["ESP32-S3", "FreeRTOS", "Laravel", "Inertia", "React", "MySQL", "MQTT", "Gemini", "Nginx"],
      images: [
        { src: "/projects/smartbrail-mesin-design.jpg", caption: "Desain hardware mesin — 110 × 215 × 44,5 mm, keypad 4×4 + fingerprint" },
        { src: "/projects/simalas-mesin-design.jpg", caption: "Generasi sebelumnya (SiMalas) — 210 × 160 × 50 mm, evolusi ke desain baru" },
        { src: "/projects/smartbrail-dashboard.png", caption: "Dashboard admin — KPI dan status sistem" },
        { src: "/projects/smartbrail-akademik.png", caption: "Kenaikan semester — wizard tiga langkah" },
        { src: "/projects/smartbrail-report.png", caption: "Laporan periodik dengan filter" },
        { src: "/projects/smartbrail-asisten-ai.png", caption: "Asisten AI Gemini di portal dosen" },
        { src: "/projects/smartbrail-teampbl.png", caption: "Portal tim PBL mahasiswa" },
      ],
      liveUrl: "https://smartbrail.com",
      liveLabel: "smartbrail.com",
      repoUrl: "https://github.com/raldoputradev/smartbrail-showcase",
    },
    {
      slug: "afis",
      name: "AFIS — Fingerprint Analyzer",
      role: "Artikel paper skripsi — desktop tooling",
      status: "study",
      semester: "Artikel Skripsi",
      summary:
        "Tool desktop C#/.NET untuk eksperimen analisis sidik jari — memuat citra, membangkitkan template, dan membandingkan kualitas tipis/tebal. Dibangun untuk memahami pipeline AFIS sebelum integrasi ke SmartBrail.",
      features: ["Muat citra sidik jari", "Generate template", "Bandingkan kualitas citra"],
      stack: ["C#", ".NET", "WinForms", "Fingerprint SDK"],
      images: [
        { src: "/projects/afis-citra.png", caption: "Analisis citra sidik jari" },
        { src: "/projects/afis-template.png", caption: "Template yang dihasilkan" },
        { src: "/projects/afis-tipis.png", caption: "Citra tipis — edge case" },
        { src: "/projects/afis-kosong.png", caption: "Antarmuka awal" },
      ],
      repoUrl: "https://github.com/raldoputradev",
    },
    {
      slug: "simalas",
      name: "SiMalas",
      role: "Tim PBL-RE-044 — pengembangan web",
      status: "study",
      semester: "Semester 5–6",
      summary:
        "System Management Attendance Lab and Classroom — proyek PBL terverifikasi kampus (SIAP PBL, Dosen Manpro Rifqi Amalya Fatekha, S.T.). Platform manajemen absensi dan akses lab/kelas: dashboard web, aplikasi mobile mahasiswa, helpdesk, dan laporan. Kontribusi saya: semester 5 — desain box/mekanikal mesin absensi (210 × 160 × 50 mm); semester 6 — sisi fullstack: website dashboard admin, aplikasi mobile, dan integrasi backend.",
      features: [
        "Dashboard manajemen absensi lab & kelas",
        "Aplikasi mobile untuk mahasiswa",
        "Helpdesk + modul laporan",
        "Integrasi perangkat akses laboratorium",
      ],
      stack: ["Laravel", "MySQL", "Flutter", "REST API"],
      images: [
        { src: "/projects/simalas-mesin-design.jpg", caption: "Desain mekanik mesin absensi — 210 × 160 × 50 mm" },
        { src: "/projects/simalas-landing.png", caption: "Landing page SiMalas" },
        { src: "/projects/simalas-dashboard.png", caption: "Dashboard admin" },
        { src: "/projects/simalas-app-home.png", caption: "Aplikasi mobile — beranda", mobile: true },
        { src: "/projects/simalas-app-attendance.png", caption: "Aplikasi mobile — absensi", mobile: true },
        { src: "/projects/simalas-report.png", caption: "Modul laporan" },
      ],
    },
  ] as Project[],
  certs: {
    kicker: "Sertifikat",
    titleLead: "Kredensial &",
    titleAccent: "sertifikat.",
    blurb: "Sertifikat & badge resmi dari kelas dan program eksternal — pembelajaran mandiri di luar proyek.",
    emptyLabel: "Sertifikat menyusul",
    verifyLabel: "Verifikasi",
    groups: [
      {
        label: "Tier 01 — Sertifikasi Industri",
        note: "Epson RC+ dalam proses",
        logo: "/polibatam-logo.png",
        items: [
        ],
      },
      {
        label: "Tier 02 — Vendor & Universitas",
        stamp: "IBM · Meta · UIUC",
        items: [
          {
            title: "Artificial Intelligence Fundamentals",
            issuer: "IBM SkillsBuild",
            year: "2026",
            image: "/certs/ibm-design.png",
            link: "https://www.credly.com/badges/29dc2821-f5bc-4f84-831f-4b829f7cc483",
            fit: "cover" as const,
          },
          {
            title: "Craft Precise Prompts for AI Models",
            issuer: "IBM SkillsBuild",
            year: "2026",
            image: "/certs/ibm-prompts.png",
            link: "https://www.credly.com/go/nL8J3YPV",
            fit: "cover" as const,
          },
          {
            title: "Introduction to Front-End Development",
            issuer: "Meta · Coursera",
            year: "2026",
            image: "/certs/coursera-frontend.png",
            link: "https://coursera.org/verify/TNTV84PVEO41",
            fit: "cover" as const,
          },
          {
            title: "IoT Devices",
            issuer: "Univ. of Illinois · Coursera",
            year: "2026",
            image: "/certs/coursera-iot.png",
            link: "https://coursera.org/verify/31X0VC0NBO00",
            fit: "cover" as const,
          },
        ],
      },
      {
        label: "Tier 03 — Kursus Daring",
        stamp: "Dicoding",
        items: [
          {
            title: "Spec-Driven Development dengan Kiro",
            issuer: "Dicoding Indonesia",
            year: "2026 · berlaku s.d. 2029",
            image: "/certs/dicoding-kiro.png",
            link: "https://www.dicoding.com/certificates/N9ZO09N3YXG5",
            fit: "cover" as const,
          },
          {
            title: "Belajar Prinsip Pemrograman SOLID",
            issuer: "Dicoding Indonesia",
            year: "2026 · berlaku s.d. 2029",
            image: "/certs/dicoding-solid.png",
            link: "https://www.dicoding.com/certificates/ERZR7EL5NZYV",
            fit: "cover" as const,
          },
        ],
      },
    ] as {
      label: string;
      note?: string;
      logo?: string;
      stamp?: string;
      items: { title: string; issuer: string; year: string; image?: string; link?: string; fit?: "cover" | "contain" }[];
    }[],
  },
  contact: {
    kicker: "Kontak",
    headlineLead: "Mari bicara soal",
    headlineAccent: "magang atau proyek.",
    headlineTail: "",
    body: "Saya terbuka untuk magang, kolaborasi riset, atau proyek lepas. Channel tercepat: email atau WhatsApp — biasanya saya balas di hari yang sama.",
    emailNote: "Respon < 24 jam",
    githubNote: "Kode & aktivitas",
    linkedinNote: "Profil profesional",
    whatsappNote: "Chat langsung",
    instagramNote: "Keseharian",
    sandboxNote: "Repo showcase SmartBrail",
    pending: "Menyusul",
    ask: "Kirim pesan lewat",
    askOpen: "Buka",
    askCancel: "Batal",
  },
  footer: {
    line: "Dibangun dengan Next.js — di-deploy ke GitHub Pages.",
    rights: "Semua hak dilindungi.",
  },
};

const en: typeof id = {
  meta: {
    title: "Rayendra Aldo Putra — Robotic Engineer & Full-Stack Developer",
    description:
      "Portfolio of Rayendra Aldo Putra, Robotics Engineering student at Politeknik Negeri Batam. Building end-to-end systems: ESP32 firmware, Laravel backends, Flutter apps, to deployment.",
  },
  nav: {
    home: "Home",
    about: "About",
    focus: "Focus",
    skills: "Skills",
    projects: "Projects",
    certs: "Certificates",
    contact: "Contact",
    hire: "Hire me",
  },
  hero: {
    status: "Open to internship & collaboration",
    kicker: "Batam, Indonesia — Politeknik Negeri Batam",
    roles: ["Robotic Engineer", "Firmware Engineer", "Full-Stack Developer", "IoT Builder"],
    intro:
      "Robotics Engineering student who designs and ships software end-to-end — architecture, data flow, and interfaces that stay reliable in real use. Not a pile of demos, but systems that can actually be operated and grown.",
    primary: "View projects",
    contactCta: "Get in touch",
    cv: "View CV",
    cvSoon: "CV is being prepared. Meanwhile, reach me via email or LinkedIn.",
    photoSoon: "Photo coming soon",
  },
  stats: [
    { value: 1, suffix: "", label: "System in real daily operation" },
    { value: 4, suffix: "", label: "Layers: edge, API, web, mobile" },
    { value: 5, suffix: "+", label: "Production languages & frameworks" },
  ],
  marquee: id.marquee,
  about: {
    kicker: "About me",
    titleLead: "Building systems",
    titleAccent: "from zero to real use.",
    body: [
      "I'm Rayendra Aldo Putra, a Robotics Engineering student at Politeknik Negeri Batam. My focus isn't just writing code — it's building complete systems, from firmware on edge devices to interfaces people use every day.",
      "My main project, SmartBrail, is proof: an RFID + fingerprint attendance and room-access system running daily in the BRAIL lab — designed from scratch, database schema to deployment.",
      "I work across layers: embedded C++ on ESP32, Laravel + Inertia backends, Flutter mobile apps, and C# desktop tooling — all built hands-on, not assembled from templates.",
    ],
    how: {
      title: "How I work",
      items: [
        "Understand the real problem before choosing technology.",
        "Design architecture and data schema first, then implement.",
        "Test in real conditions — offline, multi-user, edge cases.",
        "Document so the system can be maintained by others.",
      ],
    },
    next: {
      title: "Currently focused",
      text: "Looking for an internship to apply real system-building experience in a professional team — embedded, full-stack, or IoT.",
    },
  },
  facts: {
    title: "Quick facts",
    pending: "Coming soon",
    items: [
      { label: "Degree", value: "D4 Robotics Engineering" },
      { label: "Campus", value: "Politeknik Negeri Batam" },
      { label: "Location", value: "Batam, Riau Islands" },
      { label: "Languages", value: "Indonesian, English" },
      { label: "Status", value: "Open to internship" },
    ],
  },
  focus: {
    kicker: "Focus",
    titleLead: "Four layers",
    titleAccent: "I build.",
    blurb: "One person, one complete system — from silicon to screen.",
    items: [
      {
        title: "Embedded & Firmware",
        text: "ESP32-S3 firmware on FreeRTOS: tasks, queues, and local-first sync that keeps working when the network drops.",
        stack: ["ESP32-S3", "FreeRTOS", "MQTT", "RFID", "Fingerprint"],
        shots: ["/projects/smartbrail-mesin-design.jpg", "/projects/simalas-mesin-design.jpg"],
      },
      {
        title: "Full-Stack Web",
        text: "Laravel + Inertia/React backends: REST APIs, multi-role access, audit logs, periodic reports, VPS deployment.",
        stack: ["Laravel", "React", "Inertia", "MySQL", "Nginx"],
        shots: ["/projects/simalas-dashboard.png", "/projects/simalas-landing.png"],
      },
      {
        title: "Mobile",
        text: "Flutter apps for attendance and student portals — synced to the same backend.",
        stack: ["Flutter", "Dart", "REST API"],
        shots: ["/projects/simalas-app-home.png", "/projects/simalas-app-attendance.png"],
      },
      {
        title: "Desktop Tooling",
        text: "C#/.NET fingerprint analysis tooling — an interface for template and image experiments.",
        stack: ["C#", ".NET", "WinForms"],
        shots: ["/projects/afis-citra.png", "/projects/afis-template.png"],
      },
    ],
  },
  skills: {
    kicker: "Skills",
    titleLead: "Stack I actually",
    titleAccent: "ship to production.",
    blurb: "Not a reading list — every item has been used in a real system.",
    filters: { all: "All", embedded: "Embedded", web: "Web", craft: "Tools" },
    items: id.skills.items,
    learningTitle: "Currently learning",
    learning: id.skills.learning,
  },
  work: {
    kicker: "Projects",
    titleLead: "Real work,",
    titleAccent: "not demos.",
    blurb: "Systems in daily operation — not just coursework.",
    open: "View details",
    back: "All projects",
    feats: "Key features",
    stackTitle: "Tech stack",
    repoLink: "Source code",
    statusLive: "Live · in use",
    statusStudy: "Case study",
    statusSoon: "Soon",
    campusVerified: "Verified on the official Polibatam site",
  },
  projects: [
    {
      ...id.projects[0],
      role: "End-to-end designer & developer",
      summary:
        "RFID + fingerprint attendance and room-access system for the BRAIL lab at Polibatam — PBL project RET-07-02, supervised by Naurah Nazhifah, S.Kom., M.C.S.(AI). Team deliverables: the Smart Attendance Machine and a Building Management System (access + power monitoring for the mechanical & meeting rooms). Two ESP32-S3 firmware units, Laravel + Inertia backend, student portal, periodic reports, and realtime monitoring — in daily operational use.",
      features: [
        "RFID attendance + fingerprint verification",
        "Room access with offline ACL",
        "BMS — power monitoring & facility control for mechanical/meeting rooms",
        "Student & PBL team portal",
        "Periodic reports + realtime monitoring",
        "Gemini AI assistant — ask questions about portal data",
      ],
    },
    {
      ...id.projects[1],
      role: "Thesis paper — desktop tooling",
      summary:
        "A C#/.NET desktop tool for fingerprint analysis experiments — loading images, generating templates, and comparing thin/thick quality. Built to understand the AFIS pipeline before integrating it into SmartBrail.",
      features: ["Load fingerprint images", "Generate templates", "Compare image quality"],
    },
    {
      ...id.projects[2],
      role: "PBL team RE-044 — web development",
      summary:
        "System Management Attendance Lab and Classroom — a campus-verified PBL project (SIAP PBL, supervised by Rifqi Amalya Fatekha, S.T.). A platform for lab/classroom attendance and access: web dashboard, student mobile app, helpdesk, and reporting. My contribution: semester 5 — mechanical/box design of the attendance machine (210 × 160 × 50 mm); semester 6 — the full-stack side: admin web dashboard, mobile app, and backend integration.",
      features: [
        "Lab & classroom attendance dashboard",
        "Student mobile app",
        "Helpdesk + reporting module",
        "Lab access device integration",
      ],
    },
  ] as Project[],
  certs: {
    kicker: "Certificates",
    titleLead: "Credentials &",
    titleAccent: "certificates.",
    blurb: "Official certificates & badges from external courses and programs — self-driven learning beyond projects.",
    emptyLabel: "Certificate coming soon",
    verifyLabel: "Verify",
    groups: [
      {
        label: "Tier 01 — Industry Certification",
        note: "Epson RC+ in progress",
        logo: "/polibatam-logo.png",
        items: [
        ],
      },
      {
        label: "Tier 02 — Vendors & Universities",
        stamp: "IBM · Meta · UIUC",
        items: [
          {
            title: "Artificial Intelligence Fundamentals",
            issuer: "IBM SkillsBuild",
            year: "2026",
            image: "/certs/ibm-design.png",
            link: "https://www.credly.com/badges/29dc2821-f5bc-4f84-831f-4b829f7cc483",
            fit: "cover" as const,
          },
          {
            title: "Craft Precise Prompts for AI Models",
            issuer: "IBM SkillsBuild",
            year: "2026",
            image: "/certs/ibm-prompts.png",
            link: "https://www.credly.com/go/nL8J3YPV",
            fit: "cover" as const,
          },
          {
            title: "Introduction to Front-End Development",
            issuer: "Meta · Coursera",
            year: "2026",
            image: "/certs/coursera-frontend.png",
            link: "https://coursera.org/verify/TNTV84PVEO41",
            fit: "cover" as const,
          },
          {
            title: "IoT Devices",
            issuer: "Univ. of Illinois · Coursera",
            year: "2026",
            image: "/certs/coursera-iot.png",
            link: "https://coursera.org/verify/31X0VC0NBO00",
            fit: "cover" as const,
          },
        ],
      },
      {
        label: "Tier 03 — Online Courses",
        stamp: "Dicoding",
        items: [
          {
            title: "Spec-Driven Development with Kiro",
            issuer: "Dicoding Indonesia",
            year: "2026 · valid until 2029",
            image: "/certs/dicoding-kiro.png",
            link: "https://www.dicoding.com/certificates/N9ZO09N3YXG5",
            fit: "cover" as const,
          },
          {
            title: "Learning SOLID Programming Principles",
            issuer: "Dicoding Indonesia",
            year: "2026 · valid until 2029",
            image: "/certs/dicoding-solid.png",
            link: "https://www.dicoding.com/certificates/ERZR7EL5NZYV",
            fit: "cover" as const,
          },
        ],
      },
    ],
  },
  contact: {
    kicker: "Contact",
    headlineLead: "Let's talk about",
    headlineAccent: "internships or projects.",
    headlineTail: "",
    body: "I'm open to internships, research collaborations, or freelance work. Fastest channels: email or WhatsApp — I usually reply the same day.",
    emailNote: "Replies < 24h",
    githubNote: "Code & activity",
    linkedinNote: "Professional profile",
    whatsappNote: "Direct chat",
    instagramNote: "Day to day",
    sandboxNote: "SmartBrail showcase repo",
    pending: "Coming soon",
    ask: "Send a message via",
    askOpen: "Open",
    askCancel: "Cancel",
  },
  footer: {
    line: "Built with Next.js — deployed on GitHub Pages.",
    rights: "All rights reserved.",
  },
};

export function getCopy(locale: Locale) {
  return locale === "en" ? en : id;
}
