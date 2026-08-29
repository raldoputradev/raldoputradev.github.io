"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isAuditClient } from "@/lib/audit";
import { site } from "@/lib/site";

gsap.registerPlugin(useGSAP);

const NAME_WORDS = site.name.split(" ");

export function Splash() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(true);

  useGSAP(
    () => {
      const skip =
        document.documentElement.dataset.splash === "skip" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        isAuditClient();

      if (skip) {
        document.documentElement.dataset.splash = "skip";
        window.scrollTo(0, 0);
        setShow(false);
        return;
      }

      document.documentElement.dataset.splash = "play";
      window.scrollTo(0, 0);

      const overlay = root.current;
      if (!overlay) {
        return;
      }

      const count = { value: 0 };
      const countNode = countRef.current;

      gsap.set(".splash-logo", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".splash-word-inner", { yPercent: 120 });
      gsap.set(".splash-role-inner", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".splash-rule", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".splash-frame span", { scale: 0 });
      gsap.set(".splash-copy", { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(".splash-scan", { y: "-12vh" });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.documentElement.dataset.splash = "skip";
          window.scrollTo(0, 0);
          setShow(false);
        },
      });

      tl.to(".splash-scan", { y: "112vh", duration: 0.9, ease: "none" })
        .to(
          ".splash-frame span",
          { scale: 1, duration: 0.55, stagger: 0.05, ease: "power3.out" },
          0.12,
        )
        .to(".splash-logo", { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power4.inOut" }, 0.28)
        .to(
          ".splash-word-inner",
          { yPercent: 0, duration: 0.85, stagger: 0.08, ease: "power4.out" },
          0.42,
        )
        .to(".splash-role-inner", { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power3.inOut" }, 0.72)
        .to(".splash-rule", { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, 0.82)
        .to(
          count,
          {
            value: 100,
            duration: 1.55,
            ease: "power1.inOut",
            onUpdate: () => {
              if (countNode) {
                countNode.textContent = String(Math.round(count.value)).padStart(3, "0");
              }
            },
          },
          0.55,
        )
        .to(".splash-copy", { clipPath: "inset(50% 0 50% 0)", duration: 0.48, ease: "power4.in" }, "+=0.18")
        .to(".splash-shutter.is-top", { yPercent: -101, duration: 0.95, ease: "power4.inOut" }, "-=0.08")
        .to(".splash-shutter.is-bottom", { yPercent: 101, duration: 0.95, ease: "power4.inOut" }, "<");
    },
    { scope: root },
  );

  if (!show) {
    return null;
  }

  return (
    <div
      ref={root}
      className="splash"
      role="status"
      aria-live="polite"
      aria-label={`${site.name}, ${site.splashRole}`}
    >
      <div className="splash-shutter is-top" aria-hidden>
        <div className="splash-mesh" />
      </div>
      <div className="splash-shutter is-bottom" aria-hidden>
        <div className="splash-mesh" />
      </div>
      <span className="splash-scan" aria-hidden />

      <div className="splash-copy">
        <div className="splash-hud" aria-hidden>
          <span>raldoputradev</span>
          <span className="splash-count">
            <span ref={countRef} className="splash-count-num">
              000
            </span>
            %
          </span>
        </div>
        <div className="splash-frame" aria-hidden>
          <span className="is-tl" />
          <span className="is-tr" />
          <span className="is-bl" />
          <span className="is-br" />
        </div>
        <div className="splash-mark">
          <div className="splash-logo-clip">
            <Image
              src="/logo-rap.png"
              alt=""
              width={263}
              height={123}
              className="splash-logo"
              priority
            />
          </div>
          <p className="splash-name">
            {NAME_WORDS.map((word) => (
              <span key={word} className="splash-word">
                <span className="splash-word-inner">{word}</span>
              </span>
            ))}
          </p>
          <p className="splash-role">
            <span className="splash-role-inner">{site.splashRole}</span>
          </p>
          <span className="splash-rule" aria-hidden />
        </div>
      </div>
    </div>
  );
}
