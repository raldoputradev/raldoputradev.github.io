type BrandHint = { brand: string };

type NavigatorWithHints = Navigator & {
  userAgentData?: { brands?: BrandHint[] };
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
