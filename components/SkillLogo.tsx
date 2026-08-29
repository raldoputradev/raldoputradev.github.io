import type { ReactNode } from "react";

type IconProps = { className?: string };

const FILES: Record<string, string> = {
  PHP: "php.svg",
  TypeScript: "typescript.svg",
  JavaScript: "javascript.svg",
  Dart: "dart.svg",
  "C++": "cplusplus.svg",
  "C#": "csharp.svg",
  SQL: "mysql.svg",
  MySQL: "mysql.svg",
  Laravel: "laravel.svg",
  Blade: "laravel.svg",
  React: "react.svg",
  "Next.js": "nextdotjs.svg",
  Vite: "vite.svg",
  Tailwind: "tailwindcss.svg",
  Flutter: "flutter.svg",
  "Gemini API": "googlegemini.svg",
  "Node.js": "nodedotjs.svg",
  GitHub: "github.svg",
  ESP32: "espressif.svg",
  MQTT: "mqtt.svg",
  ROS2: "ros.svg",
  Git: "git.svg",
  "Machine learning": "ml.svg",
  "Computer Vision": "vision.svg",
  Figma: "figma.svg",
  Docker: "docker.svg",
  TensorFlow: "tensorflow.svg",
  OpenCV: "opencv.svg",
};

function Svg({ children, className }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      {children}
    </svg>
  );
}

export function SkillLogo({ name, className = "skill-logo" }: { name: string; className?: string }) {
  const file = FILES[name];
  if (file) {
    return (
      <img
        src={`/assets/skills/${file}`}
        alt=""
        width={34}
        height={34}
        className={className}
        decoding="async"
      />
    );
  }

  if (name === "FreeRTOS") {
    return (
      <Svg className={className}>
        <path d="M12 3 20 8v8l-8 5-8-5V8l8-5z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 8v8M8.5 10.2 12 12l3.5-1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </Svg>
    );
  }

  if (name === "WebSocket") {
    return (
      <Svg className={className}>
        <path d="M8 8H5.5A3.5 3.5 0 0 0 2 11.5v1A3.5 3.5 0 0 0 5.5 16H8" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M16 8h2.5A3.5 3.5 0 0 1 22 11.5v1A3.5 3.5 0 0 1 18.5 16H16" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 12h6" stroke="currentColor" strokeWidth="1.7" />
      </Svg>
    );
  }

  if (name === "LiDAR") {
    return (
      <Svg className={`${className} skill-logo-lidar`}>
        <circle cx="12" cy="14" r="2.6" />
        <path
          d="M12 3.6v4.4M5.6 6.8l2.4 2.6M18.4 6.8l-2.4 2.6M3.4 14H7.2m9.6 0h3.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M6.2 19.2A7.4 7.4 0 0 1 12 16.4a7.4 7.4 0 0 1 5.8 2.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </Svg>
    );
  }

  return (
    <span className={className} aria-hidden>
      {name.slice(0, 1)}
    </span>
  );
}
