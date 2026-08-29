"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/lib/site";

export function HtmlLang({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
