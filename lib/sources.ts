import sources from "@/content/sources.json";

export type SourceId = keyof typeof sources;

export type Source = {
  label: string;
  url: string;
};

export const sourceMap: Record<SourceId, Source> = sources;

export const resolveSource = (id: string) => {
  return sourceMap[id as SourceId];
};

export const sourcesList = Object.entries(sourceMap).map(([id, source]) => ({
  id,
  ...source,
}));
