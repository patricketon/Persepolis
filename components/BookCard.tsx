'use client';

import { useRef } from 'react';
import styles from './BookCarousel.module.css';
import type { Book } from '@/app/types/books';

interface BookCardProps {
  book: Book;
  index: number;
  position: number;
  isCenter?: boolean;
}

export default function BookCard({ book, position, isCenter = false }: BookCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={isCenter ? styles.center : styles.item}
      style={{ '--position': position } as React.CSSProperties}
    >
      <div className="bg-white rounded-xl p-6 shadow-lg h-48 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-gray-700 mb-1">by {book.author}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          {book.genre && <span>{book.genre}</span>}
          {book.year && <span>{book.year}</span>}
        </div>
      </div>
    </div>
  );
}
