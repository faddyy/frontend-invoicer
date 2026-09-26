import { en } from "./en";
import { ar } from "./ar";

export const dictionaries = { en, ar };
export const DEFAULT_LANG = "en";
export const LANG_STORAGE_KEY = "invoicer-lang";

export function localeFor(lang) {
  return lang === "ar" ? "ar" : "en-US";
}

export function dirFor(lang) {
  return lang === "ar" ? "rtl" : "ltr";
}

function lookup(dict, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), dict);
}

export function interpolate(str, vars) {
  if (!vars || typeof str !== "string") return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] == null ? `{${k}}` : String(vars[k])));
}

export function translate(lang, key, vars) {
  const dict = dictionaries[lang] || dictionaries.en;
  let value = lookup(dict, key);
  if (value == null) value = lookup(dictionaries.en, key);
  if (value == null) return key;
  if (Array.isArray(value)) return value;
  return interpolate(value, vars);
}

export function resolveStoredLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}
