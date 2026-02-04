// lib/books/getEditionCover.ts
import { getCoverUrl } from './cover';

export async function getEditionCover(
  editionOlid?: string,
  fallbackCoverId?: number
): Promise<string | null> {
  if (editionOlid) {
    try {
      const res = await fetch(`https://openlibrary.org/books/${editionOlid}.json`);
      if (res.ok) {
        const edition = await res.json();
        const coverId = edition.covers?.[0];
        if (coverId) return getCoverUrl(coverId);
      }
    } catch {}
  }

  return fallbackCoverId ? getCoverUrl(fallbackCoverId) : null;
}
