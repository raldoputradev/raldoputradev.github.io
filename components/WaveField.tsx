"use client";

import { useEffect, useRef } from "react";

export function WaveField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = Math.random() * 100;
    let mx = -9999;
    let my = -9999;
    let tx = -9999;
    let ty = -9999;
    const R = 170;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const onLeave = () => {
      tx = -9999;
      ty = -9999;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    const dots = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 0.4 + Math.random() * 0.9,
      vy: 0.00018 + Math.random() * 0.0004,
      vx: (Math.random() - 0.5) * 0.0002,
      a: 0.05 + Math.random() * 0.14,
      ph: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mx += (tx - mx) * 0.14;
      my += (ty - my) * 0.14;

      const rows = 9;
      const step = 14;
      for (let r = 0; r < rows; r++) {
        const baseY = ((r + 0.5) / rows) * h;
        ctx.beginPath();
        for (let x = 0; x <= w + step; x += step) {
          let y =
            baseY +
            Math.sin(x * 0.0075 + t * 0.9 + r * 0.75) * 15 +
            Math.sin(x * 0.02 - t * 0.5 + r) * 6;
          const dx = x - mx;
          const dy = baseY - my;
          const dist = Math.hypot(dx, dy);
          if (dist < R) {
            const f = 1 - dist / R;
            y += (dy === 0 ? -1 : Math.sign(dy)) * f * f * 52;
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const glow = 0.05 + 0.028 * Math.abs(Math.sin(t * 0.6 + r));
        ctx.strokeStyle = `rgba(255,255,255,${glow.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const d of dots) {
        const px = d.x * w;
        const py = d.y * h;
        const dx = px - mx;
        const dy = py - my;
        const dist = Math.hypot(dx, dy);
        if (dist < R && dist > 0.01) {
          const f = (1 - dist / R) * 0.0035;
          d.x += (dx / dist) * f;
          d.y += (dy / dist) * f;
        }
        d.y -= d.vy;
        d.x += d.vx + Math.sin(t * 0.4 + d.ph) * 0.0001;
        if (d.y < -0.02) {
          d.y = 1.02;
          d.x = Math.random();
        }
        if (d.x < -0.02) d.x = 1.02;
        if (d.x > 1.02) d.x = -0.02;
        const tw = d.a * (0.6 + 0.4 * Math.sin(t * 1.6 + d.ph));
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${tw.toFixed(3)})`;
        ctx.fill();
      }
    };

    if (reduced) {
      draw();
    } else {
      const loop = () => {
        t += 0.016;
        draw();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="wavefield" aria-hidden />;
}
