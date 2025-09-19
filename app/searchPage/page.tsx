'use client';

import { searchBooks } from '@/lib/mockBooks';
import BookCard from '@/components/BookCard';
import styles from '../../components/BookCarousel.module.css';
import { useState, useCallback, useMemo, use } from 'react';

export default function SearchPage({ searchParams }: {
    searchParams: Promise<{ query?: string }>
}) {
    const unwrappedParams = use(searchParams);
    const query = unwrappedParams.query || '';
    const results = searchBooks(query);
    const [currentRotation, setCurrentRotation] = useState(0);

    const rotationStep = useMemo(() => 360 / results.length, [results.length]);

    const rotateCarousel = useCallback((direction: 'next' | 'prev' ) => {

        const supportsAdvanced = typeof window !== 'undefined' && 
        CSS.supports('transform-style: preserve-3d') && 
        window.innerWidth > 768;

        setCurrentRotation(prev => 
            direction === 'next' ? prev + rotationStep : prev - rotationStep
        );
    }, [rotationStep]);
    
   return (
    <div className={styles.banner}>
        <div className={styles.slider} 
            style={{
                '--quantity': results.length,
                transform: `translate(-50%, -50%) perspective(1000px) rotateY(${currentRotation}deg)`
            } as React.CSSProperties}
        >
            {results.map((book, index) => {
                const centerIndex = ((Math.round(-currentRotation / rotationStep) % results.length) + results.length) % results.length;
                const isCenterCard = index === centerIndex;
                
                return (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                        index={index} 
                        position={index + 1}
                        isCenter={isCenterCard}
                    />
                );
            })}
        </div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button onClick={() => rotateCarousel('prev')}>←</button>
            <button onClick={() => rotateCarousel('next')}>→</button>
        </div>
    </div>
    );
}