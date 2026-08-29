"use client";

import { useEffect, useState, type ComponentType } from "react";
import { shouldLoadLanyard3D } from "@/lib/audit";
import { makeLanyardArt } from "@/lib/lanyard-art";
import { site } from "@/lib/site";

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  lanyardWidth?: number;
  frontImage?: string | null;
  backImage?: string | null;
  lanyardImage?: string | null;
  imageFit?: "cover" | "contain";
};

function StaticCard() {
  return (
    <div className="lanyard-static" aria-hidden>
      <span className="lanyard-static-strap" />
      <span className="lanyard-static-clip" />
      <div className="lanyard-static-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/rayendra-aldo-putra-hero.webp?v=2"
          alt=""
          width={480}
          height={640}
          className="lanyard-static-photo"
          decoding="async"
        />
        <p className="lanyard-static-role">{site.splashRole}</p>
        <p className="lanyard-static-campus">{site.campus}</p>
      </div>
    </div>
  );
}

export function HeroLanyard() {
  const [art, setArt] = useState<{ front: string; back: string; strap: string } | null>(null);
  const [mode, setMode] = useState<"wait" | "static" | "3d">("wait");
  const [Lanyard, setLanyard] = useState<ComponentType<LanyardProps> | null>(null);

  useEffect(() => {
    if (!shouldLoadLanyard3D()) {
      setMode("static");
      return;
    }

    let cancelled = false;

    void import("@/components/Lanyard")
      .then((mod) => {
        if (cancelled) {
          return null;
        }
        setLanyard(() => mod.default);
        return makeLanyardArt();
      })
      .then((next) => {
        if (cancelled || !next) {
          return;
        }
        if (next.front && next.strap) {
          setArt(next);
          setMode("3d");
          return;
        }
        setMode("static");
      })
      .catch(() => {
        if (!cancelled) {
          setMode("static");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const label = `${site.name}, ${site.campus}, BRAIL`;

  if (mode === "3d" && art && Lanyard) {
    return (
      <div className="hero-lanyard" aria-label={label}>
        <Lanyard
          position={[0, 0, 12]}
          gravity={[0, -40, 0]}
          fov={20}
          transparent
          lanyardWidth={2.85}
          frontImage={art.front}
          backImage={art.back}
          lanyardImage={art.strap}
          imageFit="contain"
        />
      </div>
    );
  }

  if (mode === "static") {
    return (
      <div className="hero-lanyard is-static" role="img" aria-label={label}>
        <StaticCard />
      </div>
    );
  }

  return (
    <div className="hero-lanyard" role="img" aria-label={label}>
      <div className="hero-lanyard-skeleton" aria-hidden />
    </div>
  );
}
