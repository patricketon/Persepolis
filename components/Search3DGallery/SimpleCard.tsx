'use client';

import { Book } from '../../app/types/books';
import { useBook } from '../../app/context/BookContext';
import { useRouter } from 'next/navigation';


interface SimpleBookCardProps {
    book: Book;
}

export default function SimpleBookCard({ book }: SimpleBookCardProps) {
    const { setSelectedBook } = useBook();
    const router = useRouter();

    const handleClick = () => {
        setSelectedBook(book);
        router.push(`/book/${book.id}`)
    };

   return (
    <div onClick={handleClick} className="cursor-pointed group">    
        <img
            src={book.imageLinks?.thumbnail}
            alt={book.title}
            className="relative w-full h-auto rounded-lg border-2 border-amber-200/50 transition-all duration-300 group-hover:-rotate-2"
            />
    </div>
   ) 



}