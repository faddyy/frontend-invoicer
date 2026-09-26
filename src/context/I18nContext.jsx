import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import {
  LANG_STORAGE_KEY,
  dirFor,
  localeFor,
  resolveStoredLang,
  translate,
} from "@/i18n";
import { setFormatLocale } from "@/lib/utils";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(resolveStoredLang);

  const setLang = useCallback((next) => {
    const value = next === "ar" ? "ar" : "en";
    setLangState(value);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }, []);

  useLayoutEffect(() => {
    const dir = dirFor(lang);
    const locale = localeFor(lang);
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = dir;
    setFormatLocale(locale);
    document.title =
      lang === "ar" ? "إنفويسر — إدارة الفواتير والفوترة" : "Invoicer — AI Invoice & Billing Manager";
  }, [lang]);

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      dir: dirFor(lang),
      locale: localeFor(lang),
      isRtl: lang === "ar",
    }),
    [lang, setLang, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
