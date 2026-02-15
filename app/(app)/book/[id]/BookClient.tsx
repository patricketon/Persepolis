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

// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense, useState } from 'react';
// import Book from '../Book';
// import Grass from '@/components/Grass/Grass';// ADD THIS IMPORT
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
//       <Canvas camera={{ position: [0, 0, 8]}}>
//         <Sky />
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Grass />  {/* ADD GRASS HERE */}
//           <group position={[0, 2, 0]}>  {/* LIFT BOOK ABOVE GRASS */}
//             <Book 
//               coverUrl={resolvedBook.imageLinks?.thumbnail}
//               onScheduleClick={() => setShowPicker(true)}
//               hideButton={showPicker}
//             />
//           </group>
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


// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense, useEffect, useState } from 'react';
// import Book from '../Book';
// import Grass from '@/components/Grass/Grass';
// import { Book as BookType } from '../../types/books';
// import { useBook } from '../../context/BookContext';
// import { SessionTimePicker } from '@/components/SessionTimePicker';
// import { supabaseBrowser } from '@/lib/supabaseBrowser';
// import { JoinButton } from '@/components/JoinButton';
// import '@/components/SessionTimePicker.css';

// export default function BookClient({ book }: { book?: BookType }) {
//   const { selectedBook } = useBook();
//   const resolvedBook = book ?? selectedBook;

//   const [showPicker, setShowPicker] = useState(false);
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [readyToJoin, setReadyToJoin] = useState(false);

//   if (!resolvedBook) {
//     return (
//       <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
//         Loading book…
//       </div>
//     );
//   }

//   const bookId = resolvedBook.volumeId ?? resolvedBook.id ?? 'unknown';

//   useEffect(() => {
//     (async () => {
//       const supabase = supabaseBrowser();
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) return;

//       const { data: profile } = await supabase
//         .from('profiles')
//         .select('is_21_plus')
//         .eq('id', user.id)
//         .single();

//       if (profile?.is_21_plus) {
//         setReadyToJoin(true);
//       }
//     })();
//   }, []);

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
//       setSessionId(sessionId);
//       setShowPicker(false);
//     }
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 8] }}>
//         <Sky />
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Grass />
//           <group position={[0, 2, 0]}>
//             <Book
//               coverUrl={resolvedBook.imageLinks?.thumbnail}
//               onScheduleClick={() => setShowPicker(true)}
//               hideButton={showPicker}
//             />
//           </group>
//         </Suspense>
//       </Canvas>

//       {showPicker && (
//         <SessionTimePicker
//           onSelect={handleSessionSelect}
//           onClose={() => setShowPicker(false)}
//         />
//       )}

//       {readyToJoin && sessionId && (
//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
//           <JoinButton sessionId={sessionId} bookId={bookId} />
//         </div>
//       )}
//     </div>
//   );
// }



// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense, useState } from 'react';
// import Book from '../Book';
// import Grass from '@/components/Grass/Grass';
// import { Book as BookType } from '../../types/books';
// import { useBook } from '../../context/BookContext';
// import { SessionTimePicker } from '@/components/SessionTimePicker';
// import { JoinButton } from '@/components/JoinButton';
// import '@/components/SessionTimePicker.css';

// export default function BookClient({ book }: { book?: BookType }) {
//   const { selectedBook } = useBook();
//   const resolvedBook = book ?? selectedBook;

//   const [showPicker, setShowPicker] = useState(false);
//   const [sessionId, setSessionId] = useState<string | null>(null);

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
//       setSessionId(sessionId);
//       setShowPicker(false);
//     }
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 8] }}>
//         <Sky />
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Grass />
//           <group position={[0, 2, 0]}>
//             <Book
//               coverUrl={resolvedBook.imageLinks?.thumbnail}
//               onScheduleClick={() => setShowPicker(true)}
//               hideButton={showPicker}
//             />
//           </group>
//         </Suspense>
//       </Canvas>

//       {/* Step 1: pick a time */}
//       {showPicker && (
//         <SessionTimePicker
//           onSelect={handleSessionSelect}
//           onClose={() => setShowPicker(false)}
//         />
//       )}

//       {/* Step 2: join (auth gated inside JoinButton) */}
//       {sessionId && (
//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
//           <JoinButton sessionId={sessionId} bookId={bookId} />
//         </div>
//       )}
//     </div>
//   );
// }



// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense, useState } from 'react';
// import Book from '../Book';
// import Grass from '@/components/Grass/Grass';
// import { Book as BookType } from '../../types/books';
// import { useBook } from '../../context/BookContext';
// import { SessionTimePicker } from '@/components/SessionTimePicker';
// import { supabaseBrowser } from '@/lib/supabaseBrowser';
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

//   const handleJoinIntent = async (
//     startTimeUtc: string,
//     durationMinutes: number
//   ) => {
//     // 1. Ensure session exists
//     const res = await fetch('/api/sessions/ensure', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         bookId,
//         startTimeUtc,
//         durationMinutes,
//       }),
//     });

//     if (!res.ok) return;

//     const { sessionId } = await res.json();

//     // 2. Check auth
//     const supabase = supabaseBrowser();
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`;
//       return;
//     }

//     // 3. Check profile
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('is_21_plus')
//       .eq('id', user.id)
//       .single();

//     if (!profile?.is_21_plus) {
//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`;
//       return;
//     }

//     // 4. Join
//     await fetch('/api/join', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ sessionId }),
//     });

//     window.location.href = `/session/${sessionId}`;
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 8] }}>
//         <Sky />
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Grass />
//           <group position={[0, 2, 0]}>
//             <Book
//               coverUrl={resolvedBook.imageLinks?.thumbnail}
//               onScheduleClick={() => setShowPicker(true)}
//               hideButton={showPicker}
//             />
//           </group>
//         </Suspense>
//       </Canvas>

//       {showPicker && (
//         <SessionTimePicker
//           onSelect={handleJoinIntent}
//           onClose={() => setShowPicker(false)}
//         />
//       )}
//     </div>
//   );
// }



// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense, useState } from 'react';
// import Book from '../Book';
// import Grass from '@/components/Grass/Grass';
// import { Book as BookType } from '../../types/books';
// import { useBook } from '../../context/BookContext';
// import { SessionTimePicker } from '@/components/SessionTimePicker';
// import { supabaseBrowser } from '@/lib/supabaseBrowser';
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

//   const handleJoinIntent = async (
//     startTimeUtc: string,
//     durationMinutes: number
//   ) => {
//     // 1. Ensure session exists
//     const res = await fetch('/api/sessions/ensure', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         bookId,
//         startTimeUtc,
//         durationMinutes,
//       }),
//     });

//     if (!res.ok) return;

//     const { sessionId } = await res.json();

//     // 2. Check auth
//     const supabase = supabaseBrowser();
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       // 🔑 KEY FIX: return to book page, not session page
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`;
//       return;
//     }

//     // 3. Check profile
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('is_21_plus')
//       .eq('id', user.id)
//       .single();

//     if (!profile?.is_21_plus) {
//       // 🔑 KEY FIX: return to book page, not session page
//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`;
//       return;
//     }

//     // 4. Join
//     await fetch('/api/join', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ sessionId }),
//     });

//     // 5. Enter session
//     window.location.href = `/session/${sessionId}`;
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 8] }}>
//         <Sky />
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Grass />
//           <group position={[0, 2, 0]}>
//             <Book
//               coverUrl={resolvedBook.imageLinks?.thumbnail}
//               onScheduleClick={() => setShowPicker(true)}
//               hideButton={showPicker}
//             />
//           </group>
//         </Suspense>
//       </Canvas>

//       {showPicker && (
//         <SessionTimePicker
//           onSelect={handleJoinIntent}
//           onClose={() => setShowPicker(false)}
//         />
//       )}
//     </div>
//   );
// }



// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense, useState, useEffect } from 'react';
// import Book from '../Book';
// import Grass from '@/components/Grass/Grass';
// import { Book as BookType } from '../../types/books';
// import { useBook } from '../../context/BookContext';
// import { SessionTimePicker } from '@/components/SessionTimePicker';
// import { supabaseBrowser } from '@/lib/supabaseBrowser';
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

//   // 🔑 Check for pending session on mount (after auth redirect)
//   useEffect(() => {
//     const pendingSession = sessionStorage.getItem('pendingSessionId');
//     if (pendingSession) {
//       sessionStorage.removeItem('pendingSessionId');
//       // User just completed auth, auto-join the pending session
//       window.location.href = `/session/${pendingSession}`;
//     }
//   }, []);

//   const handleJoinIntent = async (
//     startTimeUtc: string,
//     durationMinutes: number
//   ) => {
//     // 1. Ensure session exists
//     const res = await fetch('/api/sessions/ensure', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         bookId,
//         startTimeUtc,
//         durationMinutes,
//       }),
//     });

//     if (!res.ok) return;

//     const { sessionId } = await res.json();

//     // 2. Check auth
//     const supabase = supabaseBrowser();
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       // 🔑 Store session intent before auth redirect
//       sessionStorage.setItem('pendingSessionId', sessionId);
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`;
//       return;
//     }

//     // 3. Check profile
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('is_21_plus')
//       .eq('id', user.id)
//       .single();

//     if (!profile?.is_21_plus) {
//       // 🔑 Store session intent before profile completion
//       sessionStorage.setItem('pendingSessionId', sessionId);
//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`;
//       return;
//     }

//     // 4. Join
//     await fetch('/api/join', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ sessionId }),
//     });

//     // 5. Enter session
//     window.location.href = `/session/${sessionId}`;
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 8] }}>
//         <Sky />
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Grass />
//           <group position={[0, 2, 0]}>
//             <Book
//               coverUrl={resolvedBook.imageLinks?.thumbnail}
//               onScheduleClick={() => setShowPicker(true)}
//               hideButton={showPicker}
//             />
//           </group>
//         </Suspense>
//       </Canvas>

//       {showPicker && (
//         <SessionTimePicker
//           onSelect={handleJoinIntent}
//           onClose={() => setShowPicker(false)}
//         />
//       )}
//     </div>
//   );
// // }

// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Stars } from '@react-three/drei';
// import { Suspense, useState, useEffect } from 'react';
// import Book from '../Book';
// import Grass from '@/components/Grass/Grass';
// import { Book as BookType } from '../../../types/books';
// import { useBook } from '../../../context/BookContext';
// import { SessionTimePicker } from '@/components/SessionTimePicker';
// import { supabaseBrowser } from '@/lib/supabaseBrowser';
// import '@/components/SessionTimePicker.css';
// import { redirectToAuth } from "@/lib/redirectToAuth";

// export default function BookClient({ book }: { book?: BookType }) {
//   const { selectedBook } = useBook();
//   const [fetchedBook, setFetchedBook] = useState<BookType | null>(null);
//   const [showPicker, setShowPicker] = useState(false);

//   const resolvedBook = book ?? selectedBook ?? fetchedBook;

//   const bookId =
//     book?.volumeId ??
//     book?.id ??
//     selectedBook?.volumeId ??
//     selectedBook?.id ??
//     null;

//   // ─────────────────────────────
//   // Fetch book on direct route load
//   // ─────────────────────────────
//   useEffect(() => {
//     if (book || selectedBook || !bookId) return;

//     (async () => {
//       console.log('[BOOKCLIENT] fetching book by id:', bookId);
//       const res = await fetch(`/api/books/${bookId}`);
//       if (!res.ok) return;
//       const data = await res.json();
//       setFetchedBook(data);
//     })();
//   }, [book, selectedBook, bookId]);

//   // ─────────────────────────────
//   // Resume pending session after auth/profile
//   // ─────────────────────────────
//   useEffect(() => {
//     const pendingSession = sessionStorage.getItem('pendingSessionId');
//     if (!pendingSession) return;

//     console.log('[BOOKCLIENT] resuming pending session:', pendingSession);
//     sessionStorage.removeItem('pendingSessionId');

//     (async () => {
//       const res = await fetch('/api/join', {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ sessionId: pendingSession }),
//       });

//       if (res.ok) {
//         window.location.href = `/session/${pendingSession}`;
//       } else if (res.status === 403) {
//         const data = await res.json()
//         if (data.error === "subscription_required") {
//           const checkoutRes = await fetch("/api/stripe/checkout", { method: "POST" })
//           const checkout = await checkoutRes.json()
//           if (checkout.url) {
//             window.location.href = checkout.url
//             return
//           }
//         }
//       } else {
//         console.error('[BOOKCLIENT] auto-join failed:', res.status);
//       }
//     })();
//   }, []);

//   if (!resolvedBook || !bookId) {
//     return (
//       <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
//         Loading book…
//       </div>
//     );
//   }

//   // ─────────────────────────────
//   // Join Intent Flow
//   // ─────────────────────────────
//   const handleJoinIntent = async (
//     startTimeUtc: string,
//     durationMinutes: number
//   ) => {
//     console.log('[BOOKCLIENT] join intent started');

//     const ensureRes = await fetch('/api/sessions/ensure', {
//       method: 'POST',
//       credentials: 'include',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         bookId,
//         startTimeUtc,
//         durationMinutes,
//       }),
//     });

//     if (!ensureRes.ok) {
//       console.error('[BOOKCLIENT] session ensure failed');
//       return;
//     }

//     const { sessionId } = await ensureRes.json();
//     console.log('[BOOKCLIENT] session ensured:', sessionId);

//     const supabase = supabaseBrowser();

//     // ─────────────────────────────
//     // STABLE AUTH CHECK
//     // ─────────────────────────────
//     const { data: { session }, error: sessionErr } =
//       await supabase.auth.getSession();

//     const user = session?.user ?? null;

//     console.log('[BOOKCLIENT] session check:', session, sessionErr);

//     if (!user) {
//       sessionStorage.setItem('pendingSessionId', sessionId);

//       const returnPath =
//         window.location.pathname + window.location.search;

//       window.location.href = `/auth?returnTo=${encodeURIComponent(returnPath)}`;
//       return;
//     }

//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('is_21_plus')
//       .eq('id', user.id)
//       .single();

//     console.log('[BOOKCLIENT] profile check:', profile);

//     if (!profile?.is_21_plus) {
//       sessionStorage.setItem('pendingSessionId', sessionId);
//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`;
//       return;
//     }

//     const joinRes = await fetch('/api/join', {
//       method: 'POST',
//       credentials: 'include',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ sessionId }),
//     });

//     console.log('[BOOKCLIENT] /api/join status:', joinRes.status);

//     if (joinRes.status === 403) {
//       const data = await joinRes.json()
//       if (data.error === "subscription_required") {
//         const checkoutRes = await fetch("/api/stripe/checkout", { method: "POST" })
//         const checkout = await checkoutRes.json()
//         if (checkout.url) {
//           window.location.href = checkout.url
//           return
//         }
//       }
//       return
//     }

//     if (!joinRes.ok) {
//       const text = await joinRes.text();
//       console.error('[BOOKCLIENT] join failed:', text);
//       return;
//     }

//     window.location.href = `/session/${sessionId}`;
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 8] }}>
//         <Sky />
//         <Stars radius={30} depth={70} count={20000} factor={2} fade />
//         <ambientLight intensity={2.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <OrbitControls />
//         <Suspense fallback={null}>
//           <Grass />
//           <group position={[0, 2, 0]}>
//             <Book
//               coverUrl={resolvedBook.imageLinks?.thumbnail}
//               onScheduleClick={() => setShowPicker(true)}
//               hideButton={showPicker}
//             />
//           </group>
//         </Suspense>
//       </Canvas>

//       {showPicker && (
//         <SessionTimePicker
//           onSelect={handleJoinIntent}
//           onClose={() => setShowPicker(false)}
//         />
//       )}
//     </div>
//   );
// }
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import Book from '../Book';
import Grass from '@/components/Grass/Grass';
import { Book as BookType } from '../../../types/books';
import { useBook } from '../../../context/BookContext';
import { SessionTimePicker } from '@/components/SessionTimePicker';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import '@/components/SessionTimePicker.css';

export default function BookClient({ book }: { book?: BookType }) {
  const { selectedBook } = useBook();
  const [fetchedBook, setFetchedBook] = useState<BookType | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const resolvedBook = book ?? selectedBook ?? fetchedBook;
  console.log("resolvedBook:", resolvedBook)

  const bookId =
    book?.volumeId ??
    book?.id ??
    selectedBook?.volumeId ??
    selectedBook?.id ??
    null;

  useEffect(() => {
    if (book || selectedBook || !bookId) return;

    (async () => {
      const res = await fetch(`/api/books/${bookId}`);
      if (!res.ok) return;
      const data = await res.json();
      setFetchedBook(data);
    })();
  }, [book, selectedBook, bookId]);

  useEffect(() => {
    const pendingSession = sessionStorage.getItem('pendingSessionId');
    if (!pendingSession) return;

    sessionStorage.removeItem('pendingSessionId');

    (async () => {
      const res = await fetch('/api/join', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: pendingSession }),
      });

      if (res.ok) {
        window.location.href = `/session/${pendingSession}`;
        return;
      }

      if (res.status === 403) {
        const data = await res.json();
        if (data.error === 'subscription_required') {
          const checkoutRes = await fetch(
            `/api/stripe/checkout?returnTo=${encodeURIComponent(
              window.location.pathname + window.location.search
            )}`,
            { method: 'POST' }
          );

          const checkout = await checkoutRes.json();
          if (checkout.url) {
            window.location.href = checkout.url;
            return;
          }
        }
      }
    })();
  }, []);

  if (!resolvedBook || !bookId) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        Loading book…
      </div>
    );
  }

  const handleJoinIntent = async (
    startTimeUtc: string,
    durationMinutes: number
  ) => {
    const ensureRes = await fetch('/api/sessions/ensure', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId,
        startTimeUtc,
        durationMinutes,
      }),
    });

    if (!ensureRes.ok) return;

    const { sessionId } = await ensureRes.json();

    const supabase = supabaseBrowser();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user ?? null;

    if (!user) {
      sessionStorage.setItem('pendingSessionId', sessionId);

      const returnPath =
        window.location.pathname + window.location.search;

      window.location.href = `/auth?returnTo=${encodeURIComponent(returnPath)}`;
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_21_plus')
      .eq('id', user.id)
      .single();

    if (!profile?.is_21_plus) {
      sessionStorage.setItem('pendingSessionId', sessionId);

      const returnPath =
        window.location.pathname + window.location.search;

      window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
        returnPath
      )}`;
      return;
    }

    const joinRes = await fetch('/api/join', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });

    if (joinRes.status === 403) {
      const data = await joinRes.json();
      if (data.error === 'subscription_required') {
        const checkoutRes = await fetch(
          `/api/stripe/checkout?returnTo=${encodeURIComponent(
            window.location.pathname + window.location.search
          )}`,
          { method: 'POST' }
        );

        const checkout = await checkoutRes.json();
        if (checkout.url) {
          window.location.href = checkout.url;
          return;
        }
      }
      return;
    }

    if (!joinRes.ok) return;

    window.location.href = `/session/${sessionId}`;
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Sky />
        <Stars radius={30} depth={70} count={20000} factor={2} fade />
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Grass />
          <group position={[0, 2, 0]}>
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
          onSelect={handleJoinIntent}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}