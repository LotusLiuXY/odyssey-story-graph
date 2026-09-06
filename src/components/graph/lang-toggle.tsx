"use client";

import { useCallback, useSyncExternalStore, useState } from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  changeLocale,
  getLocalePreference,
  type LocaleCode,
  type LocalePreference,
} from "@/i18n";

const OPTIONS: { value: LocalePreference; label: string }[] = [
  { value: "system", label: "系统 / System" },
  { value: "zh-CN", label: "中文" },
  { value: "en-US", label: "English" },
];

/** Parchment-styled locale control supporting 中文 / English / system. */
export function LangToggle() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const subscribe = useCallback(
    (sync: () => void) => {
      i18n.on("languageChanged", sync);
      window.addEventListener("eazo-locale-preference-changed", sync);
      window.addEventListener("storage", sync);
      return () => {
        i18n.off("languageChanged", sync);
        window.removeEventListener("eazo-locale-preference-changed", sync);
        window.removeEventListener("storage", sync);
      };
    },
    [i18n],
  );

  const preference = useSyncExternalStore(
    subscribe,
    getLocalePreference,
    () => "system" as LocalePreference,
  );

  const badge =
    preference === "system" ? "文A" : preference === "zh-CN" ? "中" : "EN";

  const pick = async (value: LocalePreference) => {
    setOpen(false);
    if (value === "system") await changeLocale("system");
    else await changeLocale(value as LocaleCode);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-el="lang-toggle"
        aria-label={t("language.label")}
        className="flex h-9 items-center gap-1 rounded-full border px-2.5 font-heading text-xs font-bold transition-colors"
        style={{
          borderColor: "var(--ink)",
          color: "var(--ink)",
          background: "var(--parchment-warm)",
        }}
      >
        <Languages className="h-3.5 w-3.5" aria-hidden />
        {badge}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className="absolute right-0 z-50 mt-1 flex w-32 flex-col overflow-hidden rounded-xl border shadow-[0_10px_24px_rgba(58,25,23,.28)]"
            style={{
              borderColor: "var(--ink)",
              background: "var(--parchment-warm)",
            }}
            data-el="lang-menu"
          >
            {OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => void pick(o.value)}
                className="px-3 py-2 text-left font-heading text-sm font-semibold transition-colors hover:bg-[var(--ink)]/10"
                style={{
                  background:
                    preference === o.value ? "var(--ink)" : "transparent",
                  color:
                    preference === o.value
                      ? "var(--parchment-warm)"
                      : "var(--ink)",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
