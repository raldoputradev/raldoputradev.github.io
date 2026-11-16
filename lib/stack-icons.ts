const MAP: Record<string, string> = {
  "ESP32-S3": "espressif.svg",
  FreeRTOS: "espressif.svg",
  MQTT: "mqtt.svg",
  RFID: "espressif.svg",
  Fingerprint: "vision.svg",
  Laravel: "laravel.svg",
  React: "react.svg",
  Inertia: "react.svg",
  MySQL: "mysql.svg",
  Nginx: "nginx.svg",
  Flutter: "flutter.svg",
  Dart: "dart.svg",
  "REST API": "websockets.svg",
  "C#": "csharp.svg",
  ".NET": "csharp.svg",
  WinForms: "csharp.svg",
};

export function stackIcon(name: string) {
  return MAP[name] ? `/assets/skills/${MAP[name]}` : null;
}
