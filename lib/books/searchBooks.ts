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


// lib/books/searchBooks.ts
import type { Book } from '@/app/types/books';

import { getCoverUrl } from './cover';

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query) return [];

  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  const data = await response.json();

  return data.docs.map((doc: any) => {
    const coverUrl = getCoverUrl(doc.cover_i);

    return {
      id: doc.key.replace('/works/', ''),
      title: doc.title,
      editionId: doc.edition_key?.[0],
      author: doc.author_name?.[0] || 'Unknown',
      year: doc.first_publish_year || undefined,
      imageLinks: coverUrl
        ? { thumbnail: coverUrl }
        : undefined,
    };
  });
}
