import ruCopy from "@/content/copy.ru.json";

export type SiteCopy = typeof ruCopy;

type Locale = SiteCopy["locale"];

const copies: Record<Locale, SiteCopy> = {
  ru: ruCopy,
};

export const getCopy = (locale: Locale = "ru"): SiteCopy => {
  return copies[locale] ?? ruCopy;
};
