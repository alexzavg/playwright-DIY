// tags.ts
export const tags = {
  e2e: '@E2E',
  api: '@API',
} as const;

export type TagKey = keyof typeof tags; // 'e2e' | 'api'
export type Tag = (typeof tags)[TagKey]; // '@E2E' | '@API'

export const pickTags = (...keys: TagKey[]): Tag[] => keys.map((k) => tags[k]);
