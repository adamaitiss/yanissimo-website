import { resolveSource } from "@/lib/sources";

export type PlaceholderMap = Record<string, string | undefined>;

const placeholderPattern = /\{\{(.*?)\}\}/g;
const boldPattern = /\*\*(.+?)\*\*/g;
const italicPattern = /\*(?!\*)(.+?)\*/g;
const sourcePattern = /\[([^\]]+)\]\[(\d+)\]/g;

export const applyPlaceholders = (
  text: string,
  replacements: PlaceholderMap,
) => {
  return text.replace(placeholderPattern, (_, rawKey) => {
    const key = rawKey.trim().toUpperCase();
    return replacements[key] ?? `{{${rawKey}}}`;
  });
};

const linkifySources = (text: string) => {
  return text.replace(sourcePattern, (_, label: string, id: string) => {
    const source = resolveSource(id);
    if (!source) {
      return label;
    }
    return `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });
};

export const formatRichTextToHtml = (
  text: string,
  replacements: PlaceholderMap,
) => {
  const withPlaceholders = applyPlaceholders(text, replacements);
  const withSources = linkifySources(withPlaceholders);
  const withBold = withSources.replace(boldPattern, "<strong>$1</strong>");
  const withItalics = withBold.replace(italicPattern, "<em>$1</em>");

  return withItalics;
};

export const extractPlainText = (
  text: string,
  replacements: PlaceholderMap,
) => {
  const withPlaceholders = applyPlaceholders(text, replacements);
  const strippedSources = withPlaceholders.replace(sourcePattern, (_, label: string) => label);
  const withoutBold = strippedSources.replace(boldPattern, "$1");
  const withoutItalics = withoutBold.replace(italicPattern, "$1");

  return withoutItalics.replace(/\s+/g, " ").trim();
};
