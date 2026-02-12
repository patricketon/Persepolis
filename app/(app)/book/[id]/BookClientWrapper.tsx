
'use client';

import dynamic from 'next/dynamic';
import type { Book } from '../../../types/books';

const BookClient = dynamic(() => import('./BookClient'), {
  ssr: false,
});

export default function BookClientWrapper({ book }: { book?: Book }) {
  if (!book) {
    // Let BookClient resolve from context (search flow)
    return <BookClient />;
  }

  const normalizedBook = {
    ...book,
    imageLinks: book.imageLinks ?? {
      thumbnail: (book as any).coverPath ?? (book as any).coverUrl,
    },
  };

  return <BookClient book={normalizedBook} />;
}
