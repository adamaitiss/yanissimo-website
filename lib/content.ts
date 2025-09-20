import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

const ROOT_DIR = process.cwd();
const SITE_FILE = path.join(ROOT_DIR, "content", "site.json");
const SECTIONS_DIR = path.join(ROOT_DIR, "content", "sections");

const pricePointSchema = z.object({
  label: z.string(),
  price: z.string(),
});

const priceTierSchema = z.object({
  title: z.string(),
  earlyBird: pricePointSchema,
  regular: pricePointSchema,
});

export const siteContentSchema = z.object({
  siteName: z.string(),
  hero: z.object({
    title: z.string(),
    location: z.string(),
    datesLine: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string().url() }),
  }),
  event: z.object({
    name: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
    location: z.object({
      hotel: z.string(),
      island: z.string(),
      atoll: z.string(),
      countryCode: z.string().length(2),
    }),
  }),
  navigation: z
    .array(z.object({ id: z.string(), label: z.string() }))
    .max(4),
  pricing: z.object({
    double: priceTierSchema,
    single: priceTierSchema,
  }),
  booking: z.object({
    deposit: z.string(),
    bookingDeadline: z.string(),
    balanceDue: z.string(),
    formUrl: z.string().url(),
  }),
  contact: z.object({
    phone: z.string(),
    telegram: z.string().url(),
    whatsapp: z.string().url(),
    instagram: z.string().url(),
    email: z.string().email().nullable().optional(),
  }),
  meta: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string(),
    themeColor: z.string(),
    siteUrl: z.string().url(),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

const introSchema = z.object({
  id: z.literal("intro"),
  eyebrow: z.string(),
});

const overviewSchema = z.object({
  id: z.literal("overview"),
  title: z.string(),
});

const textSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const pricingSectionSchema = z.object({
  id: z.literal("pricing"),
  title: z.string(),
  included: z.array(z.string()).min(1),
});

const bookingSectionSchema = z.object({
  id: z.literal("booking"),
  title: z.string(),
  steps: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .min(1),
});

const faqSectionSchema = z.object({
  id: z.literal("faq"),
  items: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .min(1),
});

const teacherSectionSchema = z.object({
  id: z.literal("teacher"),
  title: z.string(),
  name: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  timeline: z.array(z.string()).min(1),
});

const toParagraphs = (content: string) => {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const loadMarkdown = (filename: string) => {
  const fullPath = path.join(SECTIONS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return matter(raw);
};

export const getSiteContent = (): SiteContent => {
  const raw = fs.readFileSync(SITE_FILE, "utf-8");
  const json = JSON.parse(raw);
  return siteContentSchema.parse(json);
};

export type IntroSection = ReturnType<typeof getIntroSection>;
export const getIntroSection = () => {
  const { data, content } = loadMarkdown("intro.md");
  const meta = introSchema.parse(data);
  return {
    id: meta.id,
    eyebrow: meta.eyebrow,
    paragraphs: toParagraphs(content),
  };
};

export type OverviewSection = ReturnType<typeof getOverviewSection>;
export const getOverviewSection = () => {
  const { data, content } = loadMarkdown("overview.md");
  const meta = overviewSchema.parse(data);
  return {
    id: meta.id,
    title: meta.title,
    paragraphs: toParagraphs(content),
  };
};

export type HotelSection = ReturnType<typeof getHotelSection>;
export const getHotelSection = () => {
  const { data, content } = loadMarkdown("hotel.md");
  const meta = textSectionSchema.parse(data);
  return {
    id: meta.id,
    title: meta.title,
    paragraphs: toParagraphs(content),
  };
};

export type ProgramSection = ReturnType<typeof getProgramSection>;
export const getProgramSection = () => {
  const { data, content } = loadMarkdown("program.md");
  const meta = textSectionSchema.parse(data);
  return {
    id: meta.id,
    title: meta.title,
    paragraphs: toParagraphs(content),
  };
};

export type PricingSection = ReturnType<typeof getPricingSection>;
export const getPricingSection = () => {
  const { data } = loadMarkdown("pricing.md");
  const meta = pricingSectionSchema.parse(data);
  return meta;
};

export type BookingSection = ReturnType<typeof getBookingSection>;
export const getBookingSection = () => {
  const { data } = loadMarkdown("booking.md");
  const meta = bookingSectionSchema.parse(data);
  return meta;
};

export type FAQSection = ReturnType<typeof getFaqSection>;
export const getFaqSection = () => {
  const { data } = loadMarkdown("faq.md");
  const meta = faqSectionSchema.parse(data);
  return meta;
};

export type TeacherSection = ReturnType<typeof getTeacherSection>;
export const getTeacherSection = () => {
  const { data } = loadMarkdown("teacher.md");
  const meta = teacherSectionSchema.parse(data);
  return meta;
};

export const getPageContent = () => {
  const site = getSiteContent();
  return {
    site,
    intro: getIntroSection(),
    overview: getOverviewSection(),
    hotel: getHotelSection(),
    program: getProgramSection(),
    pricing: getPricingSection(),
    booking: getBookingSection(),
    faq: getFaqSection(),
    teacher: getTeacherSection(),
  };
};
