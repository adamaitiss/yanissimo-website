export type PlaceholderMap = Record<string, string | undefined>;

const placeholderPattern = /\{\{(.*?)\}\}/g;
const boldPattern = /\*\*(.+?)\*\*/g;
const italicPattern = /\*(?!\*)(.+?)\*/g;
const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const applyPlaceholders = (
  text: string,
  replacements: PlaceholderMap,
) => {
  return text.replace(placeholderPattern, (_, rawKey) => {
    const key = rawKey.trim().toUpperCase();
    return replacements[key] ?? `{{${rawKey}}}`;
  });
};

const isSafeHref = (href: string) => /^https?:\/\//i.test(href);

const formatLinks = (text: string) => {
  return text.replace(linkPattern, (_, label: string, href: string) => {
    const safeLabel = label.trim();
    const safeHref = href.trim();
    if (!safeHref || !isSafeHref(safeHref)) {
      return safeLabel;
    }
    return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`;
  });
};

export const formatRichTextToHtml = (
  text: string,
  replacements: PlaceholderMap = {},
) => {
  const withPlaceholders = applyPlaceholders(text, replacements);
  const escaped = escapeHtml(withPlaceholders);
  const withLinks = formatLinks(escaped);
  const withBold = withLinks.replace(boldPattern, "<strong>$1</strong>");
  const withItalics = withBold.replace(italicPattern, "<em>$1</em>");
  return withItalics.replace(/\n/g, "<br />");
};

export const extractPlainText = (
  text: string,
  replacements: PlaceholderMap = {},
) => {
  const withPlaceholders = applyPlaceholders(text, replacements);
  const withoutLinks = withPlaceholders.replace(linkPattern, (_, label: string) => label);
  const withoutBold = withoutLinks.replace(boldPattern, "$1");
  const withoutItalics = withoutBold.replace(italicPattern, "$1");
  return withoutItalics.replace(/\s+/g, " ").trim();
};
