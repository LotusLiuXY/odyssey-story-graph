"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  changeLocale,
  normalizeLocale,
  type LocaleCode,
} from "@/i18n";

/** Parchment-styled locale toggle: cycles 中文 ⇄ English. */
export function LangToggle() {
  const { i18n } = useTranslation();

  const subscribe = useCallback(
    (sync: () => void) => {
      i18n.on("languageChanged", sync);
      return () => i18n.off("languageChanged", sync);
    },
    [i18n],
  );

  const active = useSyncExternalStore(
    subscribe,
    () => normalizeLocale(i18n.resolvedLanguage || i18n.language) ?? "en-US",
    () => "en-US" as LocaleCode,
  );

  const next: LocaleCode = active === "zh-CN" ? "en-US" : "zh-CN";
  const label = active === "zh-CN" ? "中" : "EN";

  return (
    <button
      type="button"
      onClick={() => void changeLocale(next)}
      data-el="lang-toggle"
      aria-label="Switch language"
      className="flex h-9 items-center gap-1 rounded-full border px-2.5 font-heading text-xs font-bold transition-colors"
      style={{
        borderColor: "var(--ink)",
        color: "var(--ink)",
        background: "var(--parchment-warm)",
      }}
    >
      <Languages className="h-3.5 w-3.5" aria-hidden />
      {label}
    </button>
  );
}
