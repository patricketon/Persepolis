
// 'use client';
// import * as THREE from 'three';
// import { useState, useEffect } from 'react';
// import SkinnedPage from './SkinnedPage'
// import { useTexture, Html } from '@react-three/drei';
// import SessionPicker from '@/components/SessionPicker';

// useTexture.preload('https://images-na.ssl-images-amazon.com/images/P/1401997503.01.L.jpg');

// export default function Book({
//   pageCount = 20,
//   coverUrl,
// }: {
//   pageCount?: number;
//   coverUrl?: string;
// }) {

//   const isValidCoverUrl =
//     typeof coverUrl === "string" && !coverUrl.includes("-1-L.jpg");

//   const coverTexture = isValidCoverUrl
//     ? useTexture(coverUrl!)
//     : null;

//   if (coverTexture) {
//     coverTexture.colorSpace = THREE.SRGBColorSpace;
//   }

//   const [currentPage, setCurrentPage] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [bookClosed, setBookClosed] = useState(true);

//   const isBookFullyOpen = currentPage >= 8 && !isAnimating;

//   useEffect(() => {
//     if (!isAnimating) return;
//     if (currentPage >= 8) {
//       setIsAnimating(false);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setCurrentPage(prev => prev + 1);
//     }, 350);

//     return () => clearTimeout(timeout);
//   }, [isAnimating, currentPage]);

//   const handleCoverClick = () => {
//     if (!isAnimating && currentPage === 0) {
//       setIsAnimating(true);
//       setBookClosed(false);
//     }
//   };

//   return (
//     <group rotation-y={-Math.PI / 2}>
//       {Array.from({ length: pageCount }, (_, index) => (
//         <SkinnedPage
//           key={`page-${index}`}
//           number={index}
//           totalPages={pageCount}
//           isOpen={currentPage > index}
//           bookClosed={bookClosed}
//           onClick={index === 0 ? handleCoverClick : undefined}
//           coverTexture={index === 0 ? coverTexture : null}
//         />
//       ))}
//       {isBookFullyOpen && (
//         <Html
//           position={[2, 0, 0]}
//           transform
//           rotation-y={-3 * Math.PI / 2}
//           distanceFactor={1.5}
//         >
//           <SessionPicker bookId="test-book" />
//         </Html>
//       )}
//     </group>
//   );
// }


// 'use client';
// import * as THREE from 'three';
// import { useState, useEffect } from 'react';
// import SkinnedPage from './SkinnedPage'
// import { useTexture, Html } from '@react-three/drei';
// import { SessionTimePicker } from '@/components/SessionTimePicker';
// import '@/components/SessionTimePicker.css';

// useTexture.preload('https://images-na.ssl-images-amazon.com/images/P/1401997503.01.L.jpg');

// export default function Book({
//   pageCount = 20,
//   coverUrl,
//   bookId = "test-book",
// }: {
//   pageCount?: number;
//   coverUrl?: string;
//   bookId?: string;
// }) {

//   const isValidCoverUrl =
//     typeof coverUrl === "string" && !coverUrl.includes("-1-L.jpg");

//   const coverTexture = isValidCoverUrl
//     ? useTexture(coverUrl!)
//     : null;

//   if (coverTexture) {
//     coverTexture.colorSpace = THREE.SRGBColorSpace;
//   }

//   const [currentPage, setCurrentPage] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [bookClosed, setBookClosed] = useState(true);
//   const [showPicker, setShowPicker] = useState(false);

//   const isBookFullyOpen = currentPage >= 8 && !isAnimating;

//   useEffect(() => {
//     if (!isAnimating) return;
//     if (currentPage >= 8) {
//       setIsAnimating(false);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setCurrentPage(prev => prev + 1);
//     }, 350);

//     return () => clearTimeout(timeout);
//   }, [isAnimating, currentPage]);

//   const handleCoverClick = () => {
//     if (!isAnimating && currentPage === 0) {
//       setIsAnimating(true);
//       setBookClosed(false);
//     }
//   };

//   const handleSessionSelect = async (startTimeUtc: string, duration: number) => {
//     // Create or join session via API
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
//     <>
//       <group rotation-y={-Math.PI / 2}>
//         {Array.from({ length: pageCount }, (_, index) => (
//           <SkinnedPage
//             key={`page-${index}`}
//             number={index}
//             totalPages={pageCount}
//             isOpen={currentPage > index}
//             bookClosed={bookClosed}
//             onClick={index === 0 ? handleCoverClick : undefined}
//             coverTexture={index === 0 ? coverTexture : null}
//           />
//         ))}
//         {isBookFullyOpen && (
//           <Html
//             position={[2, 0, 0]}
//             transform
//             rotation-y={-3 * Math.PI / 2}
//             distanceFactor={1.5}
//           >
//             <button
//               onClick={() => setShowPicker(true)}
//               className="schedule-btn"
//             >
//               Schedule Discussion
//             </button>
//           </Html>
//         )}
//       </group>

//       {showPicker && (
//         <SessionTimePicker
//           onSelect={handleSessionSelect}
//           onClose={() => setShowPicker(false)}
//         />
//       )}
//     </>
//   );
// }


// 'use client';
// import * as THREE from 'three';
// import { useState, useEffect } from 'react';
// import SkinnedPage from './SkinnedPage'
// import { useTexture, Html } from '@react-three/drei';

// useTexture.preload('https://images-na.ssl-images-amazon.com/images/P/1401997503.01.L.jpg');

// export default function Book({
//   pageCount = 20,
//   coverUrl,
//   bookId = "test-book",
//   onScheduleClick,
//   hideButton = false,
// }: {
//   pageCount?: number;
//   coverUrl?: string;
//   bookId?: string;
//   onScheduleClick?: () => void;
//   hideButton?: boolean;
// }) {

//   const isValidCoverUrl =
//     typeof coverUrl === "string" && !coverUrl.includes("-1-L.jpg");

//   const coverTexture = isValidCoverUrl
//     ? useTexture(coverUrl!)
//     : null;

//   if (coverTexture) {
//     coverTexture.colorSpace = THREE.SRGBColorSpace;
//   }

//   const [currentPage, setCurrentPage] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [bookClosed, setBookClosed] = useState(true);

//   const isBookFullyOpen = currentPage >= 8 && !isAnimating;

//   useEffect(() => {
//     if (!isAnimating) return;
//     if (currentPage >= 8) {
//       setIsAnimating(false);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setCurrentPage(prev => prev + 1);
//     }, 350);

//     return () => clearTimeout(timeout);
//   }, [isAnimating, currentPage]);

//   const handleCoverClick = () => {
//     if (!isAnimating && currentPage === 0) {
//       setIsAnimating(true);
//       setBookClosed(false);
//     }
//   };

//   return (
//     <group rotation-y={-Math.PI / 2}>
//       {Array.from({ length: pageCount }, (_, index) => (
//         <SkinnedPage
//           key={`page-${index}`}
//           number={index}
//           totalPages={pageCount}
//           isOpen={currentPage > index}
//           bookClosed={bookClosed}
//           onClick={index === 0 ? handleCoverClick : undefined}
//           coverTexture={index === 0 ? coverTexture : null}
//         />
//       ))}
//       {isBookFullyOpen && !hideButton &&(
//         <Html
//           position={[2, 0, 0]}
//           transform
//           rotation-y={-3 * Math.PI / 2}
//           distanceFactor={1.5}
//         >
//           <button
//             onClick={onScheduleClick}
//             style={{
//               background: 'linear-gradient(135deg, #4a9eff 0%, #3d7dd8 100%)',
//               border: 'none',
//               borderRadius: '12px',
//               padding: '14px 28px',
//               color: '#fff',
//               fontSize: '1rem',
//               fontWeight: 600,
//               cursor: 'pointer',
//               boxShadow: '0 4px 16px rgba(74, 158, 255, 0.3)',
//             }}
//           >
//             Schedule Discussion
//           </button>
//         </Html>
//       )}
//     </group>
//   );
// }


// 'use client';

// import * as THREE from 'three';
// import { useState, useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useTexture, Html } from '@react-three/drei';
// import SkinnedPage from './SkinnedPage';

// useTexture.preload('https://images-na.ssl-images-amazon.com/images/P/1401997503.01.L.jpg');

// export default function Book({
//   pageCount = 20,
//   coverUrl,
//   onScheduleClick,
//   hideButton = false,
// }: {
//   pageCount?: number;
//   coverUrl?: string;
//   onScheduleClick?: () => void;
//   hideButton?: boolean;
// }) {
//   const groupRef = useRef<THREE.Group>(null);

//   const coverTexture =
//     coverUrl && !coverUrl.includes('-1-L.jpg')
//       ? useTexture(coverUrl)
//       : null;

//   if (coverTexture) coverTexture.colorSpace = THREE.SRGBColorSpace;

//   const [currentPage, setCurrentPage] = useState(0);
//   const [phase, setPhase] = useState<'idle' | 'sliding' | 'opening'>('idle');
//   const [bookClosed, setBookClosed] = useState(true);

//   const isBookFullyOpen = currentPage >= 8 && phase !== 'opening';

//   /* ───────── Slide animation ───────── */
//   useFrame((_, delta) => {
//     if (!groupRef.current || phase !== 'sliding') return;

//     const targetX = 0;
//     const speed = 4.0;

//     groupRef.current.position.x = THREE.MathUtils.lerp(
//       groupRef.current.position.x,
//       targetX,
//       delta * speed
//     );

//     if (Math.abs(groupRef.current.position.x - targetX) < 0.01) {
//       groupRef.current.position.x = targetX;
//       setPhase('opening');
//       setBookClosed(false);
//     }
//   });

//   /* ───────── Page opening ───────── */
//   useEffect(() => {
//     if (phase !== 'opening') return;
//     if (currentPage >= 8) return;

//     const t = setTimeout(() => {
//       setCurrentPage((p) => p + 1);
//     }, 350);

//     return () => clearTimeout(t);
//   }, [phase, currentPage]);

//   const handleCoverClick = () => {
//     if (phase === 'idle' && currentPage === 0) {
//       setPhase('sliding');
//     }
//   };

//   return (
//     <group ref={groupRef} rotation-y={-Math.PI / 2} position-x={-2}>
//       {Array.from({ length: pageCount }, (_, i) => (
//         <SkinnedPage
//           key={i}
//           number={i}
//           totalPages={pageCount}
//           isOpen={currentPage > i}
//           bookClosed={bookClosed}
//           coverTexture={i === 0 ? coverTexture : null}
//           onClick={i === 0 ? handleCoverClick : undefined}
//         />
//       ))}

//       {isBookFullyOpen && !hideButton && (
//         <Html
//           position={[6, 0, 0]}
//           transform
//           rotation-y={-3 * Math.PI / 2}
//           distanceFactor={1.5}
//         >
//           <button
//             onClick={onScheduleClick}
//             style={{
//               background: 'linear-gradient(135deg, #4a9eff, #3d7dd8)',
//               border: 'none',
//               padding: '12px 24px',
//               color: '#fff',
//               fontSize: '0.9rem',
//               cursor: 'pointer',
//             }}
//           >
//             Schedule Discussion
//           </button>
//         </Html>
//       )}
//     </group>
//   );
// }


'use client';

import * as THREE from 'three';
import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import SkinnedPage from './SkinnedPage';

useTexture.preload('https://images-na.ssl-images-amazon.com/images/P/1401997503.01.L.jpg');

export default function Book({
  pageCount = 20,
  coverUrl,
  onScheduleClick,
  hideButton = false,
}: {
  pageCount?: number;
  coverUrl?: string;
  onScheduleClick?: () => void;
  hideButton?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const coverTexture =
    coverUrl && !coverUrl.includes('-1-L.jpg')
      ? useTexture(coverUrl)
      : null;

  if (coverTexture) coverTexture.colorSpace = THREE.SRGBColorSpace;

  const [currentPage, setCurrentPage] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'sliding' | 'opening' | 'done'>('idle');
  const [bookClosed, setBookClosed] = useState(true);

  const isBookFullyOpen = currentPage >= 8 && phase === 'done';

  /* ───────── Slide animation ───────── */
  useFrame((_, delta) => {
    if (!groupRef.current || phase !== 'sliding') return;

    const targetX = 0;
    const speed = 4.0;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      delta * speed
    );

    if (Math.abs(groupRef.current.position.x - targetX) < 0.01) {
      groupRef.current.position.x = targetX;
      setPhase('opening');
      setBookClosed(false);
    }
  });

  /* ───────── Page opening ───────── */
  useEffect(() => {
    if (phase !== 'opening') return;
    if (currentPage >= 8) {
      setPhase('done');
      return;
    }

    const t = setTimeout(() => {
      setCurrentPage((p) => p + 1);
    }, 350);

    return () => clearTimeout(t);
  }, [phase, currentPage]);

  const handleCoverClick = () => {
    if (phase === 'idle' && currentPage === 0) {
      setPhase('sliding');
    }
  };

  return (
    <group ref={groupRef} rotation-y={-Math.PI / 2} position-x={-2}>
      {Array.from({ length: pageCount }, (_, i) => (
        <SkinnedPage
          key={i}
          number={i}
          totalPages={pageCount}
          isOpen={currentPage > i}
          bookClosed={bookClosed}
          coverTexture={i === 0 ? coverTexture : null}
          onClick={i === 0 ? handleCoverClick : undefined}
        />
      ))}

      {isBookFullyOpen && !hideButton && (
        <Html
          position={[3, -0.75, 0]}
          transform
          rotation-y={-3 * Math.PI / 2}
          distanceFactor={5.5}
        >
          <button
            onClick={onScheduleClick}
            style={{
              background: 'linear-gradient(135deg, #4a9eff, #3d7dd8)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(74, 158, 255, 0.3)',
            }}
          >
            Schedule Discussion
          </button>
        </Html>
      )}
    </group>
  );
}