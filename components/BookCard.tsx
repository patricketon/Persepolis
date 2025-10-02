// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import styles from './BookCarousel.module.css';



// export interface Book {
//   id: string;
//   title: string;
//   author: string;  // Changed from authors array
//   genre: string;   // Added genre
//   year: number;    // Added year
//   publishedDate?: string;
//   imageLinks?: {
//     thumbnail?: string;
//     smallThumbnail?: string;
//   };
//   description?: string;
// }

// export default function BookCard({ book, index, position, isCenter = false}: BookCardProps) {
//     const cardRef = useRef<HTMLDivElement>(null);

//     return (
//         <div 
//             ref={cardRef} 
//             className={isCenter? styles.center : styles.item}
//             style={{
//                 '--position': position,
//             } as React.CSSProperties}
//         >
//             <div className="bg-white rounded-xl p-6 shadow-lg h-48 flex flex-col justify-between">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
//                 <p className="text-gray-700 mb-1">by {book.author}</p>
//                 <div className="flex justify-between items-center text-sm text-gray-500">
//                     <span>{book.genre}</span>
//                     <span>{book.year}</span>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BookCarousel.module.css';

export interface Book {
  id: string;
  title: string;
  author: string;  // Single author string
  genre: string;
  year: number;
  publishedDate?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  description?: string;
}

interface BookCardProps {
  book: Book;
  index: number;
  position: number;
  isCenter?: boolean;
}

export default function BookCard({ book, index, position, isCenter = false }: BookCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className={isCenter ? styles.center : styles.item}
      style={{
        '--position': position,
      } as React.CSSProperties}
    >
      <div className="bg-white rounded-xl p-6 shadow-lg h-48 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-gray-700 mb-1">by {book.author}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{book.genre}</span>
          <span>{book.year}</span>
        </div>
      </div>
    </div>
  );
}