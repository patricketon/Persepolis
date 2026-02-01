
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types/books';

interface BookContextType {
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within BookProvider');
  }
  return context;
}
