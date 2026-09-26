import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

let formatLocale = "en-US";

export function setFormatLocale(locale) {
  formatLocale = locale || "en-US";
}

export function getFormatLocale() {
  return formatLocale;
}

export function formatNumber(n, opts = {}) {
  return new Intl.NumberFormat(formatLocale, opts).format(n);
}

export const CURRENCIES = [
  { code: "EGP", symbol: "LE" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "CAD", symbol: "$" },
  { code: "AUD", symbol: "$" },
  { code: "JPY", symbol: "¥" },
];

export function formatMoney(amount, currency = "USD") {
  const n = Number(amount) || 0;
  try {
    return new Intl.NumberFormat(formatLocale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

export function formatDate(
  date,
  opts = { month: "short", day: "numeric", year: "numeric" },
) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(formatLocale, opts);
}

// Convert any date to a YYYY-MM-DD string for <input type="date"> / API.
export function toDateInput(date) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function relativeTime(date, t) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = (Date.now() - d.getTime()) / 1000;
  if (t) {
    if (diff < 60) return t("relative.justNow");
    if (diff < 3600)
      return t("relative.minutesAgo", { n: Math.floor(diff / 60) });
    if (diff < 86400)
      return t("relative.hoursAgo", { n: Math.floor(diff / 3600) });
    if (diff < 604800)
      return t("relative.daysAgo", { n: Math.floor(diff / 86400) });
    return d.toLocaleDateString(formatLocale);
  }
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString(formatLocale);
}
