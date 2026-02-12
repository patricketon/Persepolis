// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { searchBooks } from '@/lib/books/searchBooks';
// import SearchGallery from '@/components/Search3DGallery/SearchGallery';


// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get('query') || '';

//   const [books, setBooks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!query) return;

//     setLoading(true);
//     searchBooks(query)
//       .then(setBooks)
//       .finally(() => setLoading(false));
//   }, [query]);

//   return (
//     <div className="page-transparent">
//        <SearchGallery books={books} />
//     </div>

  
//   );
// }



// 'use client';

// import { useEffect, useState, useCallback } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { searchBooks } from '@/lib/books/searchBooks';
// import { preloadBookTextures } from '@/lib/books/preloadTexture';
// import { preloadWaterAssets } from '@/lib/water/preloadWaterAssets';
// import SearchGallery from '@/components/Search3DGallery/SearchGallery';
// import { LoadingScreen } from '@/components/LoadingScreen'
// import type { Book } from '@/app/types/books';

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get('query') || '';

//   const [books, setBooks] = useState<Book[]>([]);
//   const [assetsReady, setAssetsReady] = useState(false);

//   // Load everything in parallel
//   const loadEverything = useCallback(async (searchQuery: string) => {
//     if (!searchQuery) {
//       setAssetsReady(true);
//       return;
//     }

//     setAssetsReady(false);

//     try {
//       // Start water assets loading immediately (doesn't depend on books)
//       const waterPromise = preloadWaterAssets();

//       // Fetch book data
//       const bookResults = await searchBooks(searchQuery);
//       setBooks(bookResults);

//       // Preload book cover textures + wait for water assets
//       await Promise.all([
//         preloadBookTextures(bookResults),
//         waterPromise,
//       ]);

//       // Small extra buffer to ensure GPU has compiled shaders
//       await new Promise((resolve) => setTimeout(resolve, 100));

//       setAssetsReady(true);
//     } catch (error) {
//       console.error('Error loading assets:', error);
//       // Still show the scene even if some assets failed
//       setAssetsReady(true);
//     }
//   }, []);

//   useEffect(() => {
//     loadEverything(query);
//   }, [query, loadEverything]);

//   return (
//     <div className="page-transparent">
//       <LoadingScreen isLoading={!assetsReady} minDuration={3000} />
      
//       {/* Always render the gallery - it will be behind the loading screen */}
//       <SearchGallery books={books} />
//     </div>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { searchBooks } from '@/lib/books/searchBooks';
// import SearchGallery from '@/components/Search3DGallery/SearchGallery';
// import { LoadingScreen } from '@/components/LoadingScreen';


// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get('query') || '';

//   const [books, setBooks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showScene, setShowScene] = useState(false);

//   useEffect(() => {
//     if (!query) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setShowScene(false);
    
//     searchBooks(query)
//       .then(setBooks)
//       .finally(() => setLoading(false));
//   }, [query]);

//   // Called when LoadingScreen finishes (assets loaded + min duration elapsed + fade complete)
//   const handleLoadingComplete = () => {
//     setShowScene(true);
//   };

//   return (
//     <div className="page-transparent">
//       {/* Loading screen - calls onComplete when fully done */}
//       {!showScene && (
//         <LoadingScreen 
//           isLoading={loading} 
//           minDuration={3000} 
//           onComplete={handleLoadingComplete}
//         />
//       )}
      
//       {/* Canvas only mounts AFTER loading complete - user sees the dolly-in */}
//       {showScene && <SearchGallery books={books} />}
//     </div>
//   );
// }


// SearchPage.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { searchBooks } from '@/lib/books/searchBooks';
// import { preloadBookTextures } from '@/lib/books/preloadTexture';
// import { preloadWaterAssets } from '@/lib/water/preloadWaterAssets';
// import SearchGallery from '@/components/Search3DGallery/SearchGallery';
// import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
// import type { Book } from '@/app/types/books';




// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get('query') || '';

//   const [books, setBooks] = useState<Book[]>([]);
//   const [ready, setReady] = useState(false);

  

//   useEffect(() => {
//     if (!query) return;

//     let cancelled = false;
//     setReady(false);

//     (async () => {
//       const results = await searchBooks(query);
//       if (cancelled) return;

//       setBooks(results);

//       await Promise.all([
//         preloadBookTextures(results),
//         preloadWaterAssets(),
//       ]);

//       // small GPU warm-up buffer
//       await new Promise((r) => setTimeout(r, 100));

//       if (!cancelled) setReady(true);
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [query]);

//   return (
//     <div className="page-transparent">
//       {!ready && <LoadingScreen isLoading minDuration={3000} />}
//       {ready && <SearchGallery books={books} />}
//     </div>
//   );
// }


// // SearchPage.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { searchBooks } from '@/lib/books/searchBooks';
// import { preloadBookTextures } from '@/lib/books/preloadTexture';
// import { preloadWaterAssets } from '@/lib/water/preloadWaterAssets';
// import SearchGallery from '@/components/Search3DGallery/SearchGallery';
// import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
// import type { Book } from '@/app/types/books';
// import { waterUniforms } from '@/components/water/WaterMaterial';

// export default function SearchPageClient() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get('query') || '';

//   const [books, setBooks] = useState<Book[]>([]);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (!query) {
//       setBooks([]);
//       setReady(true);
//       return;
//     }
//     let cancelled = false;
//     setReady(false);

//     (async () => {
//       const results = await searchBooks(query);
//       if (cancelled) return;

//       setBooks(results);

//       const { dudv, base, env } = await preloadWaterAssets();
//       waterUniforms.iChannel0.value = base;
//       waterUniforms.iChannel1.value = env;
//       waterUniforms.iChannel2.value = dudv;

//       await preloadBookTextures(results);

//       await new Promise((r) => setTimeout(r, 100));

//       if (!cancelled) setReady(true);
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [query]);

//   return (
//     <div className="page-transparent">
//       {!ready && <LoadingScreen isLoading minDuration={1000} />}
//       {ready && <SearchGallery books={books} />}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchBooks } from '@/lib/books/searchBooks';
import { preloadBookTextures } from '@/lib/books/preloadTexture';
import { preloadWaterAssets } from '@/lib/water/preloadWaterAssets';
import SearchGallery from '@/components/Search3DGallery/SearchGallery';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import type { Book } from '@/app/types/books';
import { waterUniforms } from '@/components/water/WaterMaterial';
import { useBook } from '@/app/context/BookContext';

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('query');
  const { lastQuery, setLastQuery } = useBook();

  const query = urlQuery ?? lastQuery ?? '';

  const [books, setBooks] = useState<Book[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      setReady(true);
      return;
    }

    setLastQuery(query);

    let cancelled = false;
    setReady(false);

    (async () => {
      const results = await searchBooks(query);
      if (cancelled) return;

      setBooks(results);

      const { dudv, base, env } = await preloadWaterAssets();
      waterUniforms.iChannel0.value = base;
      waterUniforms.iChannel1.value = env;
      waterUniforms.iChannel2.value = dudv;

      await preloadBookTextures(results);

      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="page-transparent">
      {!ready && <LoadingScreen isLoading minDuration={800} />}
      {ready && <SearchGallery books={books} />}
    </div>
  );
}
