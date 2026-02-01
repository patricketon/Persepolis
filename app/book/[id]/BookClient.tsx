// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense } from 'react';
// import Book from '../Book';
// import { Book as BookType } from '../../types/books';
// import { useBook } from '@/app/context/BookContext';



// export default function BookClient({ book }: { book?: BookType }) {
//     console.log('BookClient received book:', book);
//     const { selectedBook } = useBook();
//     const resolvedBook = book ?? selectedBook;

//     if (!resolvedBook) {
//     return null; // or loading / fallback UI
//     }
    
//     return (
//         <div style={{ width: "100vw", height: "100vh" }}>
//             <Canvas camera={{ position: [0, 0, 6] }}>
//                 <Sky />
//                 <Stars
//                     radius={30}
//                     depth={70}
//                     count={25000}
//                     factor={2}
//                     saturation={0}
//                     fade
//                     speed={2.5}
//                 /> 
//                 <ambientLight intensity={2.5} />
//                 <directionalLight position={[10, 10, 5]} intensity={1} />
//                 <OrbitControls />
//                 <Suspense fallback={null}>
//                     <Book coverUrl={resolvedBook.imageLinks?.thumbnail} />
//                 </Suspense>
//             </Canvas>
//         </div>
//     );
// }


// app/book/[id]/BookClient.tsx
// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense } from 'react';
// import Book from '../Book';
// import { Book as BookType } from '../../types/books';
// import { useBook } from '../../context/BookContext';

// export default function BookClient({ book }: { book?: BookType }) {
//   const { selectedBook } = useBook();
//   const resolvedBook = book ?? selectedBook;

//   if (!resolvedBook) {
//     return (
//       <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
//         Loading book…
//       </div>
//     );
//   }

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 6] }}>
//         <Sky/>
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Book coverUrl={resolvedBook.imageLinks?.thumbnail} />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }


// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense, useState } from 'react';
// import Book from '../Book';
// import { Book as BookType } from '../../types/books';
// import { useBook } from '../../context/BookContext';
// import { SessionTimePicker } from '@/components/SessionTimePicker';
// import '@/components/SessionTimePicker.css';

// export default function BookClient({ book }: { book?: BookType }) {
//   const { selectedBook } = useBook();
//   const resolvedBook = book ?? selectedBook;
//   const [showPicker, setShowPicker] = useState(false);

//   if (!resolvedBook) {
//     return (
//       <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
//         Loading book…
//       </div>
//     );
//   }

//   const bookId = resolvedBook.volumeId ?? resolvedBook.id ?? 'unknown';

//   const handleSessionSelect = async (startTimeUtc: string, duration: number) => {
//     const res = await fetch('/api/sessions/ensure', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         bookId,
//         startTimeUtc,
//         durationMinutes: duration,
//       }),
//     });

//     if (res.ok) {
//       const { sessionId } = await res.json();
//       window.location.href = `/session/${sessionId}`;
//     }
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 6] }}>
//         <Sky />
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Book 
//             coverUrl={resolvedBook.imageLinks?.thumbnail}
//             bookId={bookId}
//             onScheduleClick={() => setShowPicker(true)}
//             hideButton={showPicker}
//           />
//         </Suspense>
//       </Canvas>

//       {showPicker && (
//         <SessionTimePicker
//           onSelect={handleSessionSelect}
//           onClose={() => setShowPicker(false)}
//         />
//       )}
//     </div>
//   );
// }

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Book from '../Book';
import Grass from '@/components/Grass/Grass';// ADD THIS IMPORT
import { Book as BookType } from '../../types/books';
import { useBook } from '../../context/BookContext';
import { SessionTimePicker } from '@/components/SessionTimePicker';
import '@/components/SessionTimePicker.css';

export default function BookClient({ book }: { book?: BookType }) {
  const { selectedBook } = useBook();
  const resolvedBook = book ?? selectedBook;
  const [showPicker, setShowPicker] = useState(false);

  if (!resolvedBook) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        Loading book…
      </div>
    );
  }

  const bookId = resolvedBook.volumeId ?? resolvedBook.id ?? 'unknown';

  const handleSessionSelect = async (startTimeUtc: string, duration: number) => {
    const res = await fetch('/api/sessions/ensure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        //bookId,
        startTimeUtc,
        durationMinutes: duration,
      }),
    });

    if (res.ok) {
      const { sessionId } = await res.json();
      window.location.href = `/session/${sessionId}`;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 8]}}>
        <Sky />
        <Stars radius={30} depth={70} count={20000} factor={2} fade />
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Grass />  {/* ADD GRASS HERE */}
          <group position={[0, 2, 0]}>  {/* LIFT BOOK ABOVE GRASS */}
            <Book 
              coverUrl={resolvedBook.imageLinks?.thumbnail}
              onScheduleClick={() => setShowPicker(true)}
              hideButton={showPicker}
            />
          </group>
        </Suspense>
      </Canvas>

      {showPicker && (
        <SessionTimePicker
          onSelect={handleSessionSelect}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}