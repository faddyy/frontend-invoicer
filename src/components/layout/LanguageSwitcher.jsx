import { cn } from "@/lib/utils";
import { useI18n } from "@/context/I18nContext";

export function LanguageSwitcher({ className, compact = false }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center p-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)]",
        className
      )}
      role="group"
      aria-label={t("language")}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          "h-8 px-2.5 rounded-full text-[11px] font-semibold transition-colors",
          lang === "en"
            ? "bg-[var(--ink)] text-[var(--bg)]"
            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
        )}
        aria-pressed={lang === "en"}
      >
        {compact ? "EN" : t("english")}
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={cn(
          "h-8 px-2.5 rounded-full text-[11px] font-semibold transition-colors",
          lang === "ar"
            ? "bg-[var(--ink)] text-[var(--bg)]"
            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
        )}
        aria-pressed={lang === "ar"}
      >
        {compact ? "ع" : t("arabic")}
      </button>
    </div>
  );
}
