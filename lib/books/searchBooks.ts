// import { getCoverUrl } from './cover';

// // lib/books/searchBooks.ts
// import { Book } from '@/components/BookCard';


// async function isCoverLargeEnough(url: string): Promise<boolean> {
//   try {
//     const res = await fetch(url, { method: 'HEAD' });
//     if (!res.ok) return false;

//     const width = res.headers.get('x-image-width');
//     const height = res.headers.get('x-image-height');

//     // If headers aren’t present, allow for now
//     if (!width || !height) return true;

//     return Math.min(Number(width), Number(height)) >= 400;
//   } catch {
//     return false;
//   }
// }


// // lib/books/searchBooks.ts
// import { Book } from '@/components/BookCard';

// export async function searchBooks(query: string): Promise<Book[]> {
//   if (!query) return [];

//   const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//   if (!response.ok) {
//     throw new Error(`Search failed: ${response.status}`);
//   }

//   const data = await response.json();

//   return data.docs.map((doc: any) => {
//     let imageLinks;

//     if (doc.cover_i) {
//       imageLinks = {
//         thumbnail: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
//       };
//     }

//     return {
//       id: doc.key,
//       title: doc.title,
//       author: doc.author_name?.[0] || 'Unknown',
//       year: doc.first_publish_year || 0,
//       imageLinks,
//     };
//   });
// }


// // lib/books/searchBooks.ts
// import type { Book } from '@/app/types/books';

// import { getCoverUrl } from './cover';

// export async function searchBooks(query: string): Promise<Book[]> {
//   if (!query) return [];

//   const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
//   if (!response.ok) {
//     throw new Error(`Search failed: ${response.status}`);
//   }

//   const data = await response.json();

//   return data.docs.map((doc: any) => {
//     const coverUrl = getCoverUrl(doc.cover_i);

//     return {
//       id: doc.key.replace('/works/', ''),
//       title: doc.title,
//       editionId: doc.edition_key?.[0],
//       author: doc.author_name?.[0] || 'Unknown',
//       year: doc.first_publish_year || undefined,
//       imageLinks: coverUrl
//         ? { thumbnail: coverUrl }
//         : undefined,
//     };
//   });
// }


// lib/books/searchBooks.ts


// lib/books/searchBooks.ts
import type { Book } from '@/app/types/books'
import { getCoverUrl } from './cover'

const ENGLISH_PUBLISHERS = [
  'Hay House',
  'Penguin',
  'Random House',
  'HarperCollins',
  'Simon & Schuster',
  'Macmillan',
  'Vintage',
]

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query) return []

  // 1. Broad search
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=40`,
    {
      headers: {
        "User-Agent": "Persepolis/1.0 (persepolis.world)"
      },
      cache: "no-store",
    }
  )

  const data = await res.json()
  const docs = data.docs || []

  // 2. Pick ONE authoritative English edition
  const heroDoc = pickAuthoritativeEdition(docs)
  if (!heroDoc) return []

  const hero: Book = bookFromDoc(heroDoc)

  // 3. Build recommendations (exclude same work)
  const recs: Book[] = []
  const seen = new Set([heroDoc.key])

  for (const d of docs) {
    if (recs.length >= 8) break
    if (!d.cover_i) continue
    if (!d.key || seen.has(d.key)) continue

    seen.add(d.key)
    recs.push(bookFromDoc(d))
  }

  return [hero, ...recs]
}

function pickAuthoritativeEdition(docs: any[]) {
  const scored = docs
    .filter(d => d.cover_i)
    .map(d => ({
      doc: d,
      score: scoreEdition(d),
    }))
    .sort((a, b) => b.score - a.score)

  return scored[0]?.doc ?? null
}

function scoreEdition(d: any): number {
  let score = 0

  if (d.language?.includes('eng')) score += 1000

  if (
    ENGLISH_PUBLISHERS.some(p =>
      d.publisher?.some((pub: string) => pub.includes(p))
    )
  ) {
    score += 500
  }

  if (d.first_publish_year) score += d.first_publish_year

  return score
}

function bookFromDoc(doc: any): Book {
  return {
    id: doc.key.replace('/works/', ''),
    title: doc.title,
    author: doc.author_name?.[0] || 'Unknown',
    year: doc.first_publish_year,
    imageLinks: doc.cover_i
      ? { thumbnail: getCoverUrl(doc.cover_i)! }
      : undefined,
  }
}
