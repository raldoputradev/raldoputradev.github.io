const TONE: Record<string, string> = {
  PHP: "#777BB4",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Dart: "#0175C2",
  "C++": "#00599C",
  "C#": "#512BD4",
  SQL: "#4479A1",
  MySQL: "#4479A1",
  Laravel: "#FF2D20",
  Blade: "#F05340",
  React: "#61DAFB",
  "Next.js": "#111111",
  Vite: "#646CFF",
  Tailwind: "#38BDF8",
  Flutter: "#02569B",
  "Gemini API": "#8E75B7",
  "Node.js": "#5FA04E",
  GitHub: "#181717",
  ESP32: "#E7352C",
  FreeRTOS: "#FF6600",
  MQTT: "#660066",
  WebSocket: "#3EE0B1",
  ROS2: "#22314E",
  LiDAR: "#6B5210",
  Git: "#F05032",
  Figma: "#F24E1E",
  Docker: "#2496ED",
  TensorFlow: "#FF6F00",
  OpenCV: "#8B7CF8",
  "Machine learning": "#C4B5FD",
  "Computer Vision": "#38BDF8",
};

function hashTone(value: string) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  const hues = [158, 42, 210, 280, 18];
  return `hsl(${hues[hash % hues.length]} 45% 48%)`;
}

export function skillTone(name: string) {
  return TONE[name] ?? hashTone(name);
}

/** Logos that stay black in the SVG — invert them on a dark background. */
export function skillIsInk(name: string) {
  return name === "Next.js" || name === "GitHub";
}

/** Brand marks that read as black on the dark theme unless lifted. */
export function skillIsDeep(name: string) {
  return (
    name === "C++" ||
    name === "C#" ||
    name === "Dart" ||
    name === "Flutter" ||
    name === "OpenCV" ||
    name === "Computer Vision" ||
    name === "Machine learning"
  );
}

export const SKILL_FILTERS = {
  all: null,
  web: [
    "PHP",
    "TypeScript",
    "JavaScript",
    "MySQL",
    "Laravel",
    "Blade",
    "React",
    "Next.js",
    "Vite",
    "Tailwind",
    "Node.js",
  ],
  embedded: ["Dart", "C++", "C#", "Flutter"],
  design: ["Figma", "Git", "GitHub", "Docker"],
} as const;

export type SkillFilterId = keyof typeof SKILL_FILTERS;

export function skillInitials(name: string) {
  const cleaned = name.replace(/[^A-Za-z0-9+#]+/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  const compact = cleaned.replace(/\s+/g, "");
  return compact.slice(0, 2).toUpperCase() || name.slice(0, 2).toUpperCase();
}
