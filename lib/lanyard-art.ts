function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource & { width: number; height: number },
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function containDraw(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource & { width: number; height: number },
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const scale = Math.min(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function knockOutBlack(img: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return img;
  }
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    if (px[i] + px[i + 1] + px[i + 2] < 28) {
      px[i + 3] = 0;
    }
  }
  ctx.putImageData(data, 0, 0);
  return canvas;
}

function containDrawCircle(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource & { width: number; height: number },
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const scale = Math.min(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = x + (w - dw) / 2;
  const dy = y + (h - dh) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(dx + dw / 2, dy + dh / 2, Math.min(dw, dh) / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.restore();
}

export async function makeLanyardArt() {
  await document.fonts.ready.catch(() => undefined);

  const [photo, poli, brail] = await Promise.all([
    loadImage("/rayendra-aldo-putra.png"),
    loadImage("/assets/lanyard/polibatam.png"),
    loadImage("/assets/lanyard/brail.png"),
  ]);

  return {
    front: drawCardFront(photo, poli, brail),
    back: drawCardBack(poli, brail),
    strap: drawStrap(poli, brail),
  };
}

function drawCardFront(photo: HTMLImageElement, poli: HTMLImageElement, brail: HTMLImageElement) {
  const w = 800;
  const h = 1200;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }

  ctx.fillStyle = "#07080b";
  ctx.fillRect(0, 0, w, h);
  ctx.filter = "brightness(1.16) contrast(1.05)";
  coverDraw(ctx, photo, 0, 0, w, h * 0.64);
  ctx.filter = "none";

  const fade = ctx.createLinearGradient(0, h * 0.38, 0, h);
  fade.addColorStop(0, "rgba(7, 8, 11, 0)");
  fade.addColorStop(0.32, "rgba(7, 8, 11, 0.78)");
  fade.addColorStop(0.52, "#07080b");
  fade.addColorStop(1, "#050608");
  ctx.fillStyle = fade;
  ctx.fillRect(0, h * 0.38, w, h * 0.62);

  ctx.save();
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 78px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(5, 6, 8, 0.55)";
  ctx.strokeText("ROBOTIC ENGINEER", w / 2, h * 0.58);
  ctx.fillText("ROBOTIC ENGINEER", w / 2, h * 0.58);
  ctx.strokeText("FULL-STACK", w / 2, h * 0.58 + 72);
  ctx.fillText("FULL-STACK", w / 2, h * 0.58 + 72);
  ctx.restore();

  const paintLine = (text: string, y: number, color: string, font: string) => {
    ctx.font = font;
    ctx.lineJoin = "round";
    ctx.miterLimit = 2;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(5, 6, 8, 0.88)";
    ctx.strokeText(text, w / 2, y);
    ctx.fillStyle = color;
    ctx.fillText(text, w / 2, y);
  };

  ctx.textAlign = "center";
  ctx.shadowBlur = 0;
  paintLine("POLITEKNIK NEGERI BATAM", h * 0.74, "#F6C85A", "800 46px ui-sans-serif, system-ui, sans-serif");
  paintLine("Rayendra Aldo Putra", h * 0.815, "#f7f3ea", "italic 700 52px Georgia, ui-serif, serif");
  paintLine("Robotic Engineer  ·  Full-Stack", h * 0.88, "#3EE0B1", "800 36px ui-sans-serif, system-ui, sans-serif");
  paintLine("BRAIL  ·  raldoputradev", h * 0.94, "#5EC8FF", "800 30px ui-sans-serif, system-ui, sans-serif");

  containDrawCircle(ctx, brail, 28, 16, 118, 118);
  containDraw(ctx, knockOutBlack(poli), w - 332, 14, 304, 112);

  return canvas.toDataURL("image/png");
}

function drawCardBack(poli: HTMLImageElement, brail: HTMLImageElement) {
  const w = 800;
  const h = 1200;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }

  ctx.fillStyle = "#07080b";
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "#f3eee4";
  ctx.font = "700 78px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  for (let i = 0; i < 8; i += 1) {
    ctx.fillText("POLIBATAM  ·  BRAIL", w / 2, 140 + i * 130);
  }
  ctx.restore();

  containDraw(ctx, knockOutBlack(poli), w / 2 - 240, 200, 480, 170);
  containDrawCircle(ctx, brail, w / 2 - 130, 410, 260, 260);

  ctx.textAlign = "center";
  ctx.fillStyle = "#f3eee4";
  ctx.font = "italic 700 36px Georgia, ui-serif, serif";
  ctx.fillText("Politeknik Negeri Batam", w / 2, 760);

  ctx.fillStyle = "#3ee0b1";
  ctx.font = "700 22px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("BRAIL", w / 2, 820);

  ctx.fillStyle = "#b4bcc8";
  ctx.font = "500 16px ui-sans-serif, system-ui, sans-serif";
  wrapCentered(ctx, "Barelang Robotics and Artificial Intelligence Lab", w / 2, 860, 560, 26);
  ctx.fillText("raldoputradev", w / 2, 980);

  return canvas.toDataURL("image/jpeg", 0.9);
}

function wrapCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let cy = y;
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth) {
      ctx.fillText(line, x, cy);
      line = word;
      cy += lineHeight;
    } else {
      line = next;
    }
  }
  if (line) {
    ctx.fillText(line, x, cy);
  }
}

function drawStrap(poli: HTMLImageElement, brail: HTMLImageElement) {
  const w = 2048;
  const h = 280;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }

  ctx.fillStyle = "#050608";
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 78px ui-sans-serif, system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("POLITEKNIK NEGERI BATAM   ·   BRAIL   ·   ROBOTIC ENGINEER", 16, h / 2 - 22);
  ctx.font = "600 42px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("BARELANG ROBOTICS AND ARTIFICIAL INTELLIGENCE LAB", 36, h / 2 + 46);
  ctx.restore();

  const unit = w / 2;
  const poliMark = knockOutBlack(poli);
  for (let i = 0; i < 2; i += 1) {
    const x = i * unit + 20;
    containDraw(ctx, poliMark, x, 24, 300, 232);
    containDrawCircle(ctx, brail, x + 318, 40, 200, 200);
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(5, 6, 8, 0.92)";
    ctx.font = "800 42px ui-sans-serif, system-ui, sans-serif";
    ctx.strokeText("POLIBATAM", x + 540, h / 2 - 32);
    ctx.fillStyle = "#F3D07A";
    ctx.fillText("POLIBATAM", x + 540, h / 2 - 32);
    ctx.font = "700 28px ui-sans-serif, system-ui, sans-serif";
    ctx.strokeText("Politeknik Negeri Batam", x + 540, h / 2 + 8);
    ctx.fillStyle = "#6EC8FF";
    ctx.fillText("Politeknik Negeri Batam", x + 540, h / 2 + 8);
    ctx.font = "800 34px ui-sans-serif, system-ui, sans-serif";
    ctx.strokeText("BRAIL", x + 540, h / 2 + 52);
    ctx.fillStyle = "#3EE0B1";
    ctx.fillText("BRAIL", x + 540, h / 2 + 52);
  }

  return canvas.toDataURL("image/png");
}
