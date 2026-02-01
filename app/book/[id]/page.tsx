// app/book/[id]/page.tsx
// import BookClient from './BookClient';
// import type { Book } from '@/app/types/books';
// import { getCoverUrl } from '@/lib/books/cover';
// import { cookies } from 'next/headers';

// /**
//  * Cold-path fetch (only used if context is missing)
//  */
// async function fetchBookFromOpenLibrary(id: string): Promise<Book | null> {
//   try {
//     const res = await fetch(
//       `https://openlibrary.org/works/${id}.json`,
//       { cache: 'no-store' }
//     );

//     if (!res.ok) return null;

//     const data = await res.json();

//     return {
//       id,
//       title: data.title,
//       author: 'Unknown', // ✅ intentional first pass
//       year: data.first_publish_date
//         ? parseInt(data.first_publish_date)
//         : undefined,
//       imageLinks: data.covers?.[0]
//         ? { thumbnail: getCoverUrl(data.covers[0]) }
//         : undefined,
//     };
//   } catch {
//     return null;
//   }
// }

// export default async function BookPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = await params;

//   /**
//    * 🔥 HOT PATH
//    * We try to hydrate from client state via a cookie signal.
//    * (Actual book data is passed via context on the client.)
//    */
//   const cookieStore = await cookies();
//   const hasContext = cookieStore.get('hasSelectedBook');

//   if (hasContext) {
//     // BookClient will read from BookContext on the client
//     return <BookClient />;
//   }

//   /**
//    * ❄️ COLD PATH
//    * Direct load / refresh / shared link
//    */
//   const book = await fetchBookFromOpenLibrary(id);

//   if (!book) {
//     return (
//       <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
//         Book not found
//       </div>
//     );
//   }

//   return <BookClient book={book} />;
// }



//import BookClient from './BookClient';


// // app/book/[id]/page.tsx
// import BookClientWrapper from './BookClientWrapper';
// import type { Book } from '../../types/books';
// import { getCoverUrl } from '@/lib/books/cover';

// async function fetchBookFromOpenLibrary(id: string): Promise<Book | null> {
//   const res = await fetch(
//     `https://openlibrary.org/works/${id}.json`,
//     { cache: 'no-store' }
//   );

//   if (!res.ok) return null;

//   const data = await res.json();

//   return {
//     id,
//     title: data.title,
//     author: 'Unknown',
//     imageLinks: data.covers?.[0]
//       ? { thumbnail: getCoverUrl(data.covers[0]) }
//       : undefined,
//   };
// }

// export default async function BookPage({ params,}: { params: Promise<{ id: string }>; }) {
  

//   const { id } = await params;

//   const book = await fetchBookFromOpenLibrary(id);

//   if (!book) {
//     return (
//       <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
//         Book not found
//       </div>
//     );
//   }

//   return <BookClientWrapper book={book} />;
// }

import BookClientWrapper from './BookClientWrapper';
import { BOOKS } from '../../data/books';
import type { Book } from '../../types/books';

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Try canonical curated books
  const canon = BOOKS.find(
    (b) => b.volumeId === id || b.id === id
  );

  if (canon) {
    return <BookClientWrapper book={canon as any} />;
  }

  // 2. Fallback: search-origin book via context cookie
  // (SearchGallery sets selectedBook before routing)
  // BookClientWrapper already resolves selectedBook from context
  return <BookClientWrapper />;
}
