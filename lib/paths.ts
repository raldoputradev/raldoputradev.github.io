import type { Locale } from "./site";

export function homeHref(locale: Locale, hash?: string) {
  return hash ? `/${locale}/#${hash}` : `/${locale}/`;
}

export function workHref(locale: Locale, slug: string) {
  return `/${locale}/work/${slug}/`;
}
