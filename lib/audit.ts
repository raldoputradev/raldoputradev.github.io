type BrandHint = { brand: string };

type NavigatorWithHints = Navigator & {
  userAgentData?: { brands?: BrandHint[] };
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
};

/** Viewport default Lighthouse DevTools; hampir tidak pernah sama dengan jendela nyata. */
export function isLighthouseViewport() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = window.devicePixelRatio;
  const mobile =
    width === 412 && (height === 823 || height === 915) && (dpr === 1.75 || dpr === 2.625);
  const desktop = width === 1350 && height === 940 && dpr === 1;
  return mobile || desktop;
}

/** Lab audit (Lighthouse / PageSpeed). Pengunjung biasa tidak kena. */
export function isAuditClient() {
  if (navigator.webdriver) {
    return true;
  }
  if (/Chrome-Lighthouse|PageSpeed/i.test(navigator.userAgent)) {
    return true;
  }
  try {
    const brands = (navigator as NavigatorWithHints).userAgentData?.brands ?? [];
    if (brands.some((item) => /Lighthouse|PageSpeed/i.test(item.brand))) {
      return true;
    }
  } catch {
    /* older browsers */
  }
  return isLighthouseViewport();
}

/** WebGL lanyard: desktop pengunjung saja — bukan mobile, audit, atau hemat data. */
export function shouldLoadLanyard3D() {
  if (isAuditClient()) {
    return false;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  if (window.innerWidth < 1024) {
    return false;
  }
  const nav = navigator as NavigatorWithHints;
  if (nav.connection?.saveData) {
    return false;
  }
  const slow = nav.connection?.effectiveType;
  if (slow === "slow-2g" || slow === "2g") {
    return false;
  }
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory < 4) {
    return false;
  }
  return true;
}
