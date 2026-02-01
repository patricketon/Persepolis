// 'use client';

// import { useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useRoute, useLocation } from 'wouter';
// import { easing } from 'maath';
// import * as THREE from 'three';
// import BookFrame from './BookFrame';
// import { Book } from '../../app/types/books';

// interface BookFramesProps {
//     books: Book[];
// }

// const GOLDENRATIO = 1.61803398875;

// function generatePositions() {
//     return [
//         {position: [0, 0, 2.5] as [number, number, number], rotation: [0, 0, 0] as [number, number, number]},
//         { position: [-0.8, 0, -0.6] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
//         { position: [0.8, 0, -0.6] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
//         { position: [-1.75, 0, 0.25] as [number, number, number], rotation: [0, Math.PI / 2.5, 0] as [number, number, number] },
//         { position: [-2.15, 0, 1.5] as [number, number, number], rotation: [0, Math.PI / 2.5, 0] as [number, number, number] },
//         { position: [-2, 0, 2.75] as [number, number, number], rotation: [0, Math.PI / 2.5, 0] as [number, number, number] },
//         { position: [1.75, 0, 0.25] as [number, number, number], rotation: [0, -Math.PI / 2.5, 0] as [number, number, number] },
//         { position: [2.15, 0, 1.5] as [number, number, number], rotation: [0, -Math.PI / 2.5, 0] as [number, number, number] },
//         { position: [2, 0, 2.75] as [number, number, number], rotation: [0, -Math.PI / 2.5, 0] as [number, number, number] },
//     ];
// }

// export default function BookFrames({ books }: BookFramesProps) {
//     const groupRef = useRef<THREE.Group>(null);
//     const clickedRef = useRef<THREE.Object3D | null>(null);
    
//     // wouter hooks for routing
//     const [, params] = useRoute('/book/:id');
//     const [, setLocation] = useLocation();
    
//     // Camera target refs (shared across renders)
//     const cameraTarget = useRef(new THREE.Vector3());
//     const cameraQuaternion = useRef(new THREE.Quaternion());
    
//     const positions = generatePositions();
//     const displayBooks = books.slice(0, 9);

//     // Update camera targets when route changes
//     useEffect(() => {
//         console.log('Route params:', params);
//         console.log('Looking for book with id:', params?.id);
//         if (!groupRef.current) return;
        
//         clickedRef.current = params?.id 
//             ? groupRef.current.getObjectByName(params.id) || null
//             : null;

//         console.log('Found clicked object:', clickedRef.current);
//         console.log('Clicked object parent:', clickedRef.current?.parent);

//         if (clickedRef.current && clickedRef.current.parent) {
//             console.log('Zooming to book');
//             // Zoom to clicked book
//             clickedRef.current.parent.updateWorldMatrix(true, true);
//             clickedRef.current.parent.localToWorld(
//                 cameraTarget.current.set(0, GOLDENRATIO / 2, 1.25)
//             );
//             clickedRef.current.parent.getWorldQuaternion(cameraQuaternion.current);
//             console.log('Camera target:', cameraTarget.current);
//         } else {
//             console.log('Returning to overview');
//             // Return to overview
//             cameraTarget.current.set(0, 0, 5.5);
//             cameraQuaternion.current.identity();
//         }
//     },[params?.id]); // Add dependency on params.id


//     // Keyboard navigation
//     useEffect(() => {
//         const handleKeyPress = (e: KeyboardEvent) => {
//             if (e.key === 'Escape' && params?.id) {
//                 setLocation('/');
//             }
//             // We'll add arrow key navigation later
//         };
        
//         window.addEventListener('keydown', handleKeyPress);
//         return () => window.removeEventListener('keydown', handleKeyPress);
//     }, [params?.id, setLocation]);

//     // Animate camera
//     useFrame((state, dt) => {
//         easing.damp3(state.camera.position, cameraTarget.current, 0.4, dt);
//         easing.dampQ(state.camera.quaternion, cameraQuaternion.current, 0.4, dt);
//     });

//     const handleClick = (e: any) => {
//         e.stopPropagation();
//         // Toggle: if clicking same book, go back to overview
//         const newLocation = clickedRef.current === e.object 
//             ? '/' 
//             : '/book/' + e.object.name;
//         setLocation(newLocation);
//     };

//     return (
//         <group
//             ref={groupRef}
//             onClick={(e) => {
//                 e.stopPropagation();
//                 console.log('Clicked object:', e.object);
//                 console.log('Object name:', e.object.name);
//                 console.log('Clicked object:', e.object);
//                 console.log('Object name:', e.object.name);
//                 console.log('clickedRef.current before:', clickedRef.current);
//                 console.log('Are they the same?', clickedRef.current === e.object);
//                 const newLocation = clickedRef.current === e.object ? '/' : '/book/' + e.object.name;
//                 console.log('Navigating to:', newLocation);
//                 setLocation(newLocation);
//             }}
//             onPointerMissed={() => setLocation('/')}
//         >
//             {displayBooks.map((book, index) => (
//                 <BookFrame
//                     key={book.id}
//                     book={book}
//                     position={positions[index].position}
//                     rotation={positions[index].rotation}
//                     isActive={params?.id === book.id}
//                 />
//             ))}
//         </group>
//     );
// }

// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useLocation } from 'wouter';
// import { easing } from 'maath';
// import * as THREE from 'three';
// import BookFrame from './BookFrame';
// import { Book } from '../../app/types/books';

// interface BookFramesProps {
//   books: Book[];
// }

// const GOLDENRATIO = 1.61803398875;

// function generatePositions() {
//   return [
//     { position: [0, 0, 2.5], rotation: [0, 0, 0] },
//     { position: [-0.8, 0, -0.6], rotation: [0, 0, 0] },
//     { position: [0.8, 0, -0.6], rotation: [0, 0, 0] },
//     { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0] },
//     { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0] },
//     { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0] },
//     { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0] },
//     { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0] },
//     { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0] },
//   ] as const;
// }

// export default function BookFrames({ books }: BookFramesProps) {
//   const groupRef = useRef<THREE.Group>(null);
//   const clickedRef = useRef<THREE.Object3D | null>(null);

//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [, setLocation] = useLocation();

//   const cameraTarget = useRef(new THREE.Vector3());
//   const cameraQuaternion = useRef(new THREE.Quaternion());

//   const positions = generatePositions();
//   const displayBooks = books.slice(0, 9);



//   /* 🔍 Camera target logic (selection-driven, not route-driven) */
//   useEffect(() => {
//     if (!groupRef.current) return;

//     const obj = selectedId
//     ? groupRef.current.getObjectByName(selectedId)
//     : null;

//     clickedRef.current = obj ?? null;


//     if (clickedRef.current && clickedRef.current.parent) {
//       clickedRef.current.parent.updateWorldMatrix(true, true);
//       clickedRef.current.parent.localToWorld(
//         cameraTarget.current.set(0, GOLDENRATIO / 2, 1.25)
//       );
//       clickedRef.current.parent.getWorldQuaternion(
//         cameraQuaternion.current
//       );
//     } else {
//       cameraTarget.current.set(0, 0, 5.5);
//       cameraQuaternion.current.identity();
//     }
//   }, [selectedId]);

//   /* 🎥 Animate camera */
//   useFrame((state, dt) => {
//     easing.damp3(state.camera.position, cameraTarget.current, 0.4, dt);
//     easing.dampQ(state.camera.quaternion, cameraQuaternion.current, 0.4, dt);
//   });

//   /* 🖱 Click behavior */
//   const handleClick = (e: any) => {
//     e.stopPropagation();

//     const id = e.object?.name;
//     if (!id) return;

//     // First click → zoom
//     if (selectedId !== id) {
//       setSelectedId(id);
//       return;
//     }

//     // Second click → navigate
//     setLocation(`/book/${id}`);
//   };

//   return (
//     <group
//       ref={groupRef}
//       onClick={handleClick}
//       onPointerMissed={() => setSelectedId(null)}
//     >
//       {displayBooks.map((book, index) => (
//         <BookFrame
//           key={book.id}
//           book={book}
//           position={positions[index].position}
//           rotation={positions[index].rotation}
//           isActive={selectedId === book.id}
//         />
//       ))}
//     </group>
//   );
// }



'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLocation } from 'wouter';
import { easing } from 'maath';
import * as THREE from 'three';
import BookFrame from './BookFrame';
import { Book } from '../../app/types/books';

interface BookFramesProps {
  books: Book[];
}

const GOLDENRATIO = 1.61803398875;

function generatePositions() {
  return [
    { position: [0, 0, 2.5], rotation: [0, 0, 0] },
    { position: [-0.8, 0, -0.6], rotation: [0, 0, 0] },
    { position: [0.8, 0, -0.6], rotation: [0, 0, 0] },
    { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0] },
    { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0] },
    { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0] },
    { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0] },
    { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0] },
    { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0] },
  ] as const;
}

// Use function params for persistent vectors like the original R3F example
export default function BookFrames({ 
  books,
  p = new THREE.Vector3(),
  q = new THREE.Quaternion()
}: BookFramesProps & { p?: THREE.Vector3; q?: THREE.Quaternion }) {
  const groupRef = useRef<THREE.Group>(null);
  const clickedRef = useRef<THREE.Object3D | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const positions = generatePositions();
  const displayBooks = books.slice(0, 9);

  // Camera target logic - NO dependency array, runs every render like original
  useEffect(() => {
    if (!groupRef.current) return;

    clickedRef.current = selectedId
      ? groupRef.current.getObjectByName(selectedId) ?? null
      : null;

    if (clickedRef.current && clickedRef.current.parent) {
      clickedRef.current.parent.updateWorldMatrix(true, true);
      clickedRef.current.parent.localToWorld(
        p.set(0, GOLDENRATIO / 2, 1.25)
      );
      clickedRef.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  }); // <-- No dependency array!

  // Animate camera
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });

  // Click behavior
  const handleClick = (e: any) => {
    e.stopPropagation();

    const id = e.object?.name;
    if (!id) return;

    // First click → zoom
    if (selectedId !== id) {
      setSelectedId(id);
      return;
    }

    // Second click → navigate
    setLocation(`/book/${id}`);
  };

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerMissed={() => setSelectedId(null)}
    >
      {displayBooks.map((book, index) => (
        <BookFrame
          key={book.id}
          book={book}
          position={positions[index].position}
          rotation={positions[index].rotation}
          isActive={selectedId === book.id}
        />
      ))}
    </group>
  );
}