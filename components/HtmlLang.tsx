"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/site";

export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
