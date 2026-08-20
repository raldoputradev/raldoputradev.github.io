import type { Locale } from "./site";

type NavKey = "home" | "skills" | "projects" | "about" | "contact";

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
    headlineLead: string;
    headlineAccent: string;
    headlineTail: string;
    introBefore: string;
    introAfter: string;
    line: string;
    primary: string;
    secondary: string;
    contactCta: string;
    cv: string;
    status: string;
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
    groups: { title: string; items: string[] }[];
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
    placeholderNote: string;
    closeLabel: string;
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
  };
  footer: string;
};

const id: Copy = {
  meta: {
    title: "Rayendra Aldo Putra — Portofolio",
    description:
      "Rayendra Aldo Putra (GitHub raldoputradev) — mahasiswa Teknik Robotika, Politeknik Negeri Batam. Sistem end-to-end: Laravel, Flutter, ESP32/FreeRTOS, ROS2.",
  },
  nav: {
    home: "Beranda",
    skills: "Keahlian",
    projects: "Proyek",
    about: "Tentang",
    contact: "Kontak",
  },
  theme: { toDark: "Mode gelap", toLight: "Mode terang" },
  hero: {
    kicker: "Mahasiswa Teknik Robotika",
    headlineLead: "Membangun sistem",
    headlineAccent: "end-to-end",
    headlineTail: "dari sensor ke cloud.",
    introBefore: "Saya ",
    introAfter:
      " — saya membangun rantai utuh: mesin sidik jari di tepi, API Laravel, web admin, dan aplikasi Flutter. Bukan demo terpisah.",
    line: "Sistem yang saya rancang tetap jalan saat jaringan putus.",
    primary: "Lihat proyek",
    secondary: "Arsitektur Simalas",
    contactCta: "Hubungi saya",
    cv: "Unduh CV",
    status: "Terbuka untuk kolaborasi",
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
    kicker: "Yang saya pakai",
    titleLead: "Keahlian",
    titleAccent: "Teknis",
    groups: [
      { title: "Bahasa", items: ["PHP", "TypeScript", "Dart", "C++", "SQL"] },
      { title: "Web", items: ["Laravel", "Blade", "React", "Vite", "Tailwind"] },
      { title: "Mobile", items: ["Flutter", "Gemini API"] },
      { title: "Edge / IoT", items: ["ESP32", "FreeRTOS", "MQTT", "WebSocket"] },
      { title: "Robotika", items: ["ROS2", "LiDAR", "Wheel encoder", "VL53L0X"] },
      { title: "Praktik", items: ["Git", "Role & permission", "Throttle", "Signed URL"] },
    ],
  },
  work: {
    kicker: "Yang sudah dibangun",
    titleLead: "Proyek",
    titleAccent: "Unggulan",
    statusLive: "Sistem berjalan",
    statusStudy: "Studi kampus",
    statusSoon: "Menyusul",
    galleryHint: "Klik thumbnail untuk berganti",
    zoomHint: "Klik gambar untuk memperbesar",
    placeholderNote: "Tangkapan layar menyusul",
    closeLabel: "Tutup",
  },
  projects: [
    {
      slug: "simalas",
      name: "Simalas",
      role: "Full-stack & IoT",
      status: "live",
      summary:
        "Sistem absensi dan loker laboratorium: web admin untuk laboran dan dosen, aplikasi mahasiswa, serta mesin sidik jari ESP32 dengan arsitektur local-first. Offline menulis ke flash; saat online menyinkron ke server.",
      features: [
        "Absensi sidik jari dengan sesi dan kebijakan keterlambatan",
        "Loker lab: slot, bukti foto, dan riwayat tim",
        "Manajemen peran & izin per menu (laboran, dosen, mahasiswa)",
        "API mesin terpisah dari API mobile",
        "Sinkronisasi hybrid: flash internal lalu push ke server",
        "Asisten AI internal untuk admin dan helpdesk publik",
      ],
      contributionTitle: "Kontribusi saya",
      contribution:
        "Merancang dan menulis seluruh lapisan: skema database, API Laravel, dashboard laboran (Blade + Tailwind), situs publik React, aplikasi Flutter, dan firmware ESP32. Termasuk keamanan (throttle, signed URL, middleware izin) dan perakitan mekanik perangkat.",
      stack: ["Laravel", "Blade", "React", "Flutter", "C++ / FreeRTOS", "ESP32", "MySQL"],
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
      slug: "amr-ros2",
      name: "AMR · ROS2",
      role: "Robotika & sensor",
      status: "study",
      summary:
        "Robot mobile otonom di kampus: ROS2 sebagai middleware, LiDAR untuk pemetaan, wheel encoder untuk odometri, dan VL53L0X untuk jarak dekat. Kerja akademik, bukan produk.",
      features: [
        "Node ROS2 untuk odometri dan pembacaan sensor",
        "Pemetaan ruangan dengan LiDAR",
        "Deteksi halangan jarak dekat (VL53L0X)",
      ],
      contributionTitle: "Peran saya",
      contribution:
        "Integrasi sensor ke ROS2 dan kalibrasi odometri roda. Fokus pada pemahaman aliran data robot, bukan klaim navigasi penuh.",
      stack: ["ROS2", "Python", "LiDAR", "Encoder"],
      images: [
        { src: "/projects/amr-ros2.svg", caption: "Diagram node ROS2", tag: "Diagram", width: 1200, height: 800, placeholder: true },
      ],
    },
    {
      slug: "afis-fingerprint-analyzer",
      name: "AfisFingerprintAnalyzer",
      role: "Desktop C# .NET",
      status: "soon",
      summary:
        "Aplikasi desktop untuk mendecode byte array sidik jari mentah menjadi visualisasi citra dan menghitung skor kualitas. Direncanakan sebagai proyek pembeda semester ini.",
      features: [
        "Decode byte array template menjadi gambar",
        "Skor kualitas citra sidik jari",
        "Ekspor hasil analisis",
      ],
      contributionTitle: "Rencana",
      contribution:
        "Dibangun dengan C# .NET (WinForms/WPF) sebagai pendamping Simalas, supaya template sidik jari bisa diaudit secara visual.",
      stack: ["C#", ".NET", "WinForms / WPF"],
      images: [
        { src: "/projects/afis-analyzer.svg", caption: "Rancangan antarmuka", tag: "Konsep", width: 1200, height: 800, placeholder: true },
      ],
    },
  ],
  architecture: {
    kicker: "Bagaimana Simalas disusun",
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
        tech: "Blade · Tailwind · React",
        text: "Dashboard laboran dan dosen dengan Blade + Tailwind: pengguna, absensi, loker, mesin, pengumuman, asisten AI internal. Situs publik dan halaman unduh APK memakai React.",
      },
      {
        name: "Mobile",
        tech: "Flutter · Dart · Gemini",
        text: "Mahasiswa: absensi, loker, pengumuman, saran. Helpdesk AI untuk pertanyaan operasional.",
      },
    ],
    decisionsTitle: "Keputusan desain",
    decisions: [
      {
        title: "Local-first di mesin, bukan wajib online",
        text: "Tap tercatat di perangkat lebih dulu. Server menerima sync kemudian. Ini kebutuhan laboratorium, bukan tren arsitektur.",
      },
      {
        title: "Mahasiswa tidak punya portal web",
        text: "Route web mahasiswa diarahkan ke halaman info. Permukaan serangan lebih kecil, satu sumber kebenaran di aplikasi.",
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
        "Repo produksi Simalas (tetap private)",
      ],
    },
  },
  about: {
    kicker: "Tentang saya",
    titleLead: "Tentang",
    titleAccent: "Saya",
    body: [
      "Saya mahasiswa Teknik Robotika. Sejak semester 6 saya belajar web dan software engineering secara mandiri, supaya robotika tidak berhenti di firmware.",
      "Pengalaman saya belum panjang, dan saya tidak menutupinya dengan daftar sertifikat. Yang bisa saya tunjukkan adalah satu sistem utuh yang saya tulis sendiri dari sensor sampai antarmuka — beserta alasan di balik setiap keputusannya.",
      "AI saya pakai sebagai asisten, bukan penulis tanpa kendali. Utang teknis saya perlakukan sebagai pekerjaan yang harus dirapikan, bukan disembunyikan.",
    ],
    how: {
      title: "Yang saya kerjakan sendiri",
      items: [
        "Backend Laravel: throttle, signed URL, middleware izin, query aman lewat Eloquent",
        "Dashboard staf laboratorium dengan Blade + Tailwind, situs publik dengan React",
        "Aplikasi Flutter untuk mahasiswa, termasuk asisten Gemini",
        "Firmware C++/FreeRTOS dan sinkronisasi hybrid",
        "Dasar ROS2 untuk AMR (LiDAR, encoder, VL53L0X)",
      ],
    },
    next: {
      title: "Yang sedang saya siapkan",
      text: "Kode Simalas sudah terbuka di GitHub tanpa data lab. Berikutnya: mempelajari Docker untuk Laravel/MySQL, lalu membangun AfisFingerprintAnalyzer dengan C#.",
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
  },
  footer: "Rayendra Aldo Putra · Portofolio",
};

const en: Copy = {
  meta: {
    title: "Rayendra Aldo Putra — Portfolio",
    description:
      "Rayendra Aldo Putra (GitHub raldoputradev) — Robotics Engineering student at Politeknik Negeri Batam. End-to-end systems: Laravel, Flutter, ESP32/FreeRTOS, ROS2.",
  },
  nav: {
    home: "Home",
    skills: "Skills",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
  theme: { toDark: "Dark mode", toLight: "Light mode" },
  hero: {
    kicker: "Robotics Engineering student",
    headlineLead: "Building",
    headlineAccent: "end-to-end",
    headlineTail: "systems, sensor to cloud.",
    introBefore: "I'm ",
    introAfter:
      " — I build the whole chain: fingerprint machines at the edge, a Laravel API, a staff web admin, and a Flutter app. Not isolated demos.",
    line: "The systems I design keep working when the network drops.",
    primary: "View projects",
    secondary: "Simalas architecture",
    contactCta: "Contact me",
    cv: "Download CV",
    status: "Open to collaboration",
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
    kicker: "What I work with",
    titleLead: "Technical",
    titleAccent: "Skills",
    groups: [
      { title: "Languages", items: ["PHP", "TypeScript", "Dart", "C++", "SQL"] },
      { title: "Web", items: ["Laravel", "Blade", "React", "Vite", "Tailwind"] },
      { title: "Mobile", items: ["Flutter", "Gemini API"] },
      { title: "Edge / IoT", items: ["ESP32", "FreeRTOS", "MQTT", "WebSocket"] },
      { title: "Robotics", items: ["ROS2", "LiDAR", "Wheel encoder", "VL53L0X"] },
      { title: "Practice", items: ["Git", "Roles & permissions", "Throttle", "Signed URL"] },
    ],
  },
  work: {
    kicker: "What I've built",
    titleLead: "Featured",
    titleAccent: "Projects",
    statusLive: "Running system",
    statusStudy: "Course work",
    statusSoon: "Upcoming",
    galleryHint: "Click a thumbnail to switch",
    zoomHint: "Click the image to enlarge",
    placeholderNote: "Screenshot coming soon",
    closeLabel: "Close",
  },
  projects: [
    {
      slug: "simalas",
      name: "Simalas",
      role: "Full-stack & IoT",
      status: "live",
      summary:
        "Lab attendance and locker system: a web admin for staff and lecturers, a student mobile app, and ESP32 fingerprint machines with a local-first design. Offline writes go to flash; online they sync to the server.",
      features: [
        "Fingerprint attendance with sessions and lateness policy",
        "Lab lockers: slots, photo proof, and team history",
        "Per-menu roles and permissions (staff, lecturer, student)",
        "Machine API kept separate from the mobile API",
        "Hybrid sync: internal flash, then push to the server",
        "Internal AI assistant for admins and a public helpdesk",
      ],
      contributionTitle: "My contribution",
      contribution:
        "Designed and wrote every layer: database schema, Laravel API, staff dashboard (Blade + Tailwind), public React site, Flutter app, and ESP32 firmware. Including security (throttle, signed URLs, permission middleware) and the mechanical build.",
      stack: ["Laravel", "Blade", "React", "Flutter", "C++ / FreeRTOS", "ESP32", "MySQL"],
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
      slug: "amr-ros2",
      name: "AMR · ROS2",
      role: "Robotics & sensing",
      status: "study",
      summary:
        "Campus autonomous mobile robot: ROS2 as middleware, LiDAR for mapping, wheel encoders for odometry, VL53L0X for close range. Academic work, not a product.",
      features: [
        "ROS2 nodes for odometry and sensor reads",
        "Room mapping with LiDAR",
        "Close-range obstacle detection (VL53L0X)",
      ],
      contributionTitle: "My role",
      contribution:
        "Wired sensors into ROS2 and calibrated wheel odometry. The goal was understanding robot data flow, not claiming full navigation.",
      stack: ["ROS2", "Python", "LiDAR", "Encoder"],
      images: [
        { src: "/projects/amr-ros2.svg", caption: "ROS2 node diagram", tag: "Diagram", width: 1200, height: 800, placeholder: true },
      ],
    },
    {
      slug: "afis-fingerprint-analyzer",
      name: "AfisFingerprintAnalyzer",
      role: "C# .NET desktop",
      status: "soon",
      summary:
        "A desktop app that decodes raw fingerprint byte arrays into image visualisations and scores their quality. Planned as this semester's differentiator.",
      features: [
        "Decode template byte arrays into images",
        "Score fingerprint image quality",
        "Export analysis results",
      ],
      contributionTitle: "The plan",
      contribution:
        "Built with C# .NET (WinForms/WPF) as a companion to Simalas, so fingerprint templates can be audited visually.",
      stack: ["C#", ".NET", "WinForms / WPF"],
      images: [
        { src: "/projects/afis-analyzer.svg", caption: "Interface sketch", tag: "Concept", width: 1200, height: 800, placeholder: true },
      ],
    },
  ],
  architecture: {
    kicker: "How Simalas is built",
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
        tech: "Blade · Tailwind · React",
        text: "Staff dashboard in Blade + Tailwind: users, attendance, lockers, machines, announcements, internal AI assistant. The public site and APK download page use React.",
      },
      {
        name: "Mobile",
        tech: "Flutter · Dart · Gemini",
        text: "Students: attendance, lockers, announcements, feedback. An AI helpdesk for operational questions.",
      },
    ],
    decisionsTitle: "Design decisions",
    decisions: [
      {
        title: "Local-first on the device, not online-only",
        text: "A tap is recorded on the machine first. The server receives a sync later. That is a lab constraint, not an architecture trend.",
      },
      {
        title: "No student web portal",
        text: "Student web routes redirect to an info page. Smaller attack surface, one source of truth in the app.",
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
        "The production Simalas repo (stays private)",
      ],
    },
  },
  about: {
    kicker: "About me",
    titleLead: "About",
    titleAccent: "Me",
    body: [
      "I am a Robotics Engineering student. Since my 6th semester I have taught myself web and software engineering so robotics does not stop at firmware.",
      "My experience is not long, and I do not pad it with a certificate list. What I can show is one complete system I wrote myself, from sensor to interface, along with the reasoning behind each decision.",
      "I use AI as an assistant, not an unsupervised author. I treat technical debt as work to clean up, not to hide.",
    ],
    how: {
      title: "What I build myself",
      items: [
        "Laravel backend: throttle, signed URLs, permission middleware, safe queries through Eloquent",
        "Lab staff dashboard in Blade + Tailwind, public site in React",
        "Flutter app for students, including a Gemini assistant",
        "C++/FreeRTOS firmware and hybrid sync",
        "ROS2 basics for AMRs (LiDAR, encoders, VL53L0X)",
      ],
    },
    next: {
      title: "What I am preparing",
      text: "The Simalas source is now public on GitHub without any lab data. Next: learning Docker for Laravel/MySQL, then building AfisFingerprintAnalyzer in C#.",
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
  },
  footer: "Rayendra Aldo Putra · Portfolio",
};

const dictionaries: Record<Locale, Copy> = { id, en };

export function getCopy(locale: Locale): Copy {
  return dictionaries[locale];
}
