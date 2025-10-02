// 'use client';

// import { searchBooks } from '@/lib/googleBooks';
// import BookCard from '@/components/BookCard';
// import styles from '../../components/BookCarousel.module.css';
// import { useState, useCallback, useMemo, useEffect } from 'react';


// export default function SearchPage({ searchParams }: {
//     searchParams: Promise<{ query?: string }>
// }) {
//     const unwrappedParams = use(searchParams);
//     const query = unwrappedParams.query || '';
//     const results = searchBooks(query);
//     const [currentRotation, setCurrentRotation] = useState(0);

   


//     const rotationStep = useMemo(() => 360 / results.length, [results.length]);

//     const rotateCarousel = useCallback((direction: 'next' | 'prev' ) => {

//         const supportsAdvanced = typeof window !== 'undefined' && 
//         CSS.supports('transform-style: preserve-3d') && 
//         window.innerWidth > 768;

//         setCurrentRotation(prev => 
//             direction === 'next' ? prev + rotationStep : prev - rotationStep
//         );
//     }, [rotationStep]);
    
//    return (
//     <div className={styles.banner}>
//         <div className={styles.slider} 
//             style={{
//                 '--quantity': results.length,
//                 transform: `translate(-50%, -50%) perspective(1000px) rotateY(${currentRotation}deg)`
//             } as React.CSSProperties}
//         >
//             {results.map((book, index) => {
//                 const centerIndex = ((Math.round(-currentRotation / rotationStep) % results.length) + results.length) % results.length;
//                 const isCenterCard = index === centerIndex;
                
//                 return (
//                     <BookCard 
//                         key={book.id} 
//                         book={book} 
//                         index={index} 
//                         position={index + 1}
//                         isCenter={isCenterCard}
//                     />
//                 );
//             })}
//         </div>
//         <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4">
//             <button onClick={() => rotateCarousel('prev')}>←</button>
//             <button onClick={() => rotateCarousel('next')}>→</button>
//         </div>
//     </div>
   

//     );
// }

// 'use client';

// import { searchBooks } from '@/lib/googleBooks';
// import BookCard from '@/components/BookCard';
// import styles from '../../components/BookCarousel.module.css';
// import { useState, useCallback, useMemo, useEffect, use } from 'react';

// export default function SearchPage({ searchParams }: {
//     searchParams: Promise<{ query?: string }>
// }) {
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentRotation, setCurrentRotation] = useState(0);
    
//     const unwrappedParams = use(searchParams);
//     const query = unwrappedParams.query || '';

//     useEffect(() => {
//         if (query) {
//             setLoading(true);
//             searchBooks(query).then(data => {
//                 setResults(data || []);
//                 setLoading(false);
//             }).catch(error => {
//                 console.error('Search error:', error);
//                 setResults([]);
//                 setLoading(false);
//             });
//         }
    
//     }, [query]);


'use client';

import { searchBooks } from '@/lib/googleBooks';
import BookCard, { Book } from '@/components/BookCard';
import styles from '../../components/BookCarousel.module.css';
import { useState, useCallback, useMemo, useEffect, use } from 'react';

export default function SearchPage({ searchParams }: {
    searchParams: Promise<{ query?: string }>
}) {
    const [results, setResults] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentRotation, setCurrentRotation] = useState(0);
    
    const unwrappedParams = use(searchParams);
    const query = unwrappedParams.query || '';

    useEffect(() => {
        if (query) {
            setLoading(true);
            searchBooks(query).then(data => {
                console.log('Processed data:', data);
                setResults(data || []);
                setLoading(false);
            }).catch(error => {
                console.error('Search error:', error);
                setResults([]);
                setLoading(false);
            });
        }
    }, [query]);

    const rotationStep = useMemo(() => {
        return results.length > 0 ? 360 / results.length : 0;
    }, [results.length]);

    const rotateCarousel = useCallback((direction: 'next' | 'prev') => {
        setCurrentRotation(prev =>
            direction === 'next' ? prev + rotationStep : prev - rotationStep
        );
    }, [rotationStep]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (results.length === 0 && query) {
        return <div className="flex justify-center items-center h-screen">No results found for "{query}"</div>;
    }

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
            {results.length > 1 && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <button 
                        onClick={() => rotateCarousel('prev')}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors"
                    >
                        ←
                    </button>
                    <button 
                        onClick={() => rotateCarousel('next')}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors"
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
}