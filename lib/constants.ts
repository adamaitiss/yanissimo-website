export const SECTION_IDS = {
  hero: "hero",
  venue: "why-barefoot",
  program: "program",
  rooms: "rooms",
  pricing: "pricing",
  faq: "faq",
  teacher: "teacher",
  cta: "cta",
  footer: "footer",
} as const;

export const NAV_ITEMS: Array<{ id: keyof typeof SECTION_IDS; label: string }> = [
  { id: "hero", label: "Главная" },
  { id: "venue", label: "The Barefoot" },
  { id: "program", label: "Программа" },
  { id: "rooms", label: "Размещение" },
  { id: "pricing", label: "Что включено" },
  { id: "faq", label: "FAQ" },
  { id: "teacher", label: "Преподаватель" },
  { id: "cta", label: "Контакты" },
];
