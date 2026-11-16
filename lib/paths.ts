import type { Locale } from "./site";

export function homeHref(locale: Locale, hash?: string) {
  return hash ? `/${locale}/#${hash}` : `/${locale}/`;
}
