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

// import BookClientWrapper from './BookClientWrapper';
// import { BOOKS } from '../../../data/books';
// import type { Book } from '../../../types/books';
// import { getCoverUrl } from '@/lib/books/cover';

// async function fetchOpenLibraryBook(id: string): Promise<Book | null> {
//   try {
//     const res = await fetch(`https://openlibrary.org/works/${id}.json`, {
//       next: { revalidate: 3600 },
//     })
//     if (!res.ok) return null

//     const data = await res.json()

//     let author = 'Unknown'
//     if (data.authors?.[0]?.author?.key) {
//       const authorRes = await fetch(
//         `https://openlibrary.org${data.authors[0].author.key}.json`
//       )
//       if (authorRes.ok) {
//         const authorData = await authorRes.json()
//         author = authorData.name || 'Unknown'
//       }
//     }

//     const coverId = data.covers?.[0]
//     const thumbnail = coverId ? getCoverUrl(coverId) : undefined;

//     return {
//       id,
//       title: data.title || 'Untitled',
//       author,
//       year: data.first_publish_date
//         ? parseInt(data.first_publish_date)
//         : undefined,
//       imageLinks: thumbnail ? { thumbnail } : undefined,
//     }
//   } catch {
//     return null
//   }
// }

// export default async function BookPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const canon = BOOKS.find(
//     (b) => b.volumeId === id || b.id === id
//   );

//   if (canon) {
//     return <BookClientWrapper book={canon as any} />;
//   }

//   const olBook = await fetchOpenLibraryBook(id)

//   if (olBook) {
//     return <BookClientWrapper book={olBook as any} />;
//   }

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
//       Book not found.
//     </div>
//   );
// }



// import BookClientWrapper from './BookClientWrapper';
// import { BOOKS } from '../../../data/books';
// import type { Book } from '../../../types/books';
// import { getCoverUrl } from '@/lib/books/cover';

// async function fetchOpenLibraryBook(id: string): Promise<Book | null> {
//   try {
//     const res = await fetch(`https://openlibrary.org/works/${id}.json`, {
//       next: { revalidate: 3600 },
//     })
//     if (!res.ok) return null

//     const data = await res.json()

//     let author = 'Unknown'
//     if (data.authors?.[0]?.author?.key) {
//       const authorRes = await fetch(
//         `https://openlibrary.org${data.authors[0].author.key}.json`
//       )
//       if (authorRes.ok) {
//         const authorData = await authorRes.json()
//         author = authorData.name || 'Unknown'
//       }
//     }

//     // Try covers from the Works API first
//     const coverId = data.covers?.[0]
//     let thumbnail = coverId ? getCoverUrl(coverId) : undefined;

//     // Fallback: use the OL covers API by work OLID
//     // Many works have covers accessible by OLID even when the covers array is missing
//     if (!thumbnail) {
//       thumbnail = `https://covers.openlibrary.org/b/olid/${id}-L.jpg`
//     }

//     return {
//       id,
//       title: data.title || 'Untitled',
//       author,
//       year: data.first_publish_date
//         ? parseInt(data.first_publish_date)
//         : undefined,
//       imageLinks: thumbnail ? { thumbnail } : undefined,
//     }
//   } catch {
//     return null
//   }
// }

// export default async function BookPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const canon = BOOKS.find(
//     (b) => b.volumeId === id || b.id === id
//   );

//   if (canon) {
//     return <BookClientWrapper book={canon as any} />;
//   }

//   const olBook = await fetchOpenLibraryBook(id)

//   if (olBook) {
//     return <BookClientWrapper book={olBook as any} />;
//   }

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
//       Book not found.
//     </div>
//   );
// }


import BookClientWrapper from './BookClientWrapper';
import { BOOKS } from '../../../data/books';
import type { Book } from '../../../types/books';
import { getCoverUrl } from '@/lib/books/cover';

async function fetchOpenLibraryBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`https://openlibrary.org/works/${id}.json`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null

    const data = await res.json()

    let author = 'Unknown'
    if (data.authors?.[0]?.author?.key) {
      const authorRes = await fetch(
        `https://openlibrary.org${data.authors[0].author.key}.json`
      )
      if (authorRes.ok) {
        const authorData = await authorRes.json()
        author = authorData.name || 'Unknown'
      }
    }

    // Try covers from the Works API
    const coverId = data.covers?.[0]
    const thumbnail = coverId ? getCoverUrl(coverId) : undefined;

    return {
      id,
      title: data.title || 'Untitled',
      author,
      year: data.first_publish_date
        ? parseInt(data.first_publish_date)
        : undefined,
      imageLinks: thumbnail ? { thumbnail } : undefined,
    }
  } catch {
    return null
  }
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cover?: string }>;
}) {
  const { id } = await params;
  const { cover } = await searchParams;

  const canon = BOOKS.find(
    (b) => b.volumeId === id || b.id === id
  );

  if (canon) {
    return <BookClientWrapper book={canon as any} />;
  }

  const olBook = await fetchOpenLibraryBook(id)

  // If the OL Works API didn't have a cover but the search passed one via query param, use it
  if (olBook && !olBook.imageLinks?.thumbnail && cover) {
    olBook.imageLinks = { thumbnail: decodeURIComponent(cover) };
  }

  if (olBook) {
    return <BookClientWrapper book={olBook as any} />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      Book not found.
    </div>
  );
}