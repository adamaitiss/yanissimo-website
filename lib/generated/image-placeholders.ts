// Placeholder data is checked in to avoid build-time image processing
export const IMAGE_PLACEHOLDERS = {
  hero: "data:image/webp;base64,UklGRqIAAABXRUJQVlA4IJYAAAAQBACdASoYAA0APrVKnkmnJCKhMAgA4BaJbACdMoADX+5K9WkiXVUOgADyUhwaSILnpimA4sEDetZ2zL9vQg78QodciNLIw5njk0N900fY3a8kY9bX1RMLZQyhQb8j2Km9t/Z0Ayzo0IdLTmKDvb/CuwJtonPkEoY0bUM+QIn5Cw/AOuxFIK2jOm3wHdYmXtfc8QEAAAA=",
} as const;

export type ImagePlaceholderKey = keyof typeof IMAGE_PLACEHOLDERS;
