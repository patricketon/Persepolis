// 'use client';

// import React from 'react';
// import * as THREE from 'three';
// import { useRef, useState, useMemo } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Text, useCursor, Html }  from '@react-three/drei';
// import { easing } from 'maath';
// import { Book } from '../../app/types/books';
// import { useRouter } from 'next/navigation';
// import { useBook } from '../../app/context/BookContext';
// import { TextureLoader } from 'three';
// import { getCachedTexture } from '../../lib/books/textureCache';



// const GOLDENRATIO = 1.61803398875;

// interface BookFrameProps {
//     book:  Book;
//     position: [number, number, number];
//     rotation: [number, number, number];
//     isActive?: boolean;
// }



// export default function BookFrame({
//     book,
//     position,
//     rotation,
//     isActive = false
// }:  BookFrameProps) {

//     //Refs to access the mesh objects directly
//     const imageRef = useRef<THREE.Mesh>(null);
//     const frameRef = useRef<THREE.Mesh>(null);

//     const loader = useMemo(() => new TextureLoader(), []);
//     const baseImageScale = useRef<[number, number, number]>([0.9, 0.9, 1]);


//     //Hover state for color changes when frame is hovered on
//     const [hovered, setHovered] = useState(false);
//     const [imageError, setImageError] = useState(false);

//     //Random value for subtle animation variety 
//     const [randomValue] = useState(() => Math.random());

//     const router = useRouter();
//     const { setSelectedBook } = useBook();

//     //ref to store the base scale
//     const baseImageScale = useRef<[number, number, number]>([1, 1, 1]);


//     //useCursor is drei hook that sets body cursor according to hover state of mesh
//     useCursor(hovered);

//     //Animation loop that runs every frame 
//     useFrame((state, dt) => {
//         if(!imageRef.current || !frameRef.current) return;

//         //Scaling animation on hover
//         // easing.damp3(
//         //     imageRef.current.scale,
//         //     [
//         //         0.85 * (!isActive && hovered ? 0.85 : 1),
//         //         0.9 * (!isActive && hovered ? 0.905 : 1),
//         //         1
//         //     ],
//         //     0.1,
//         //     dt
//         // );

//         const [bw, bh, bz] = baseImageScale.current;
//         const hoverScale = !isActive && hovered ? 0.92 : 1;

//         // easing.damp3(
//         //     imageRef.current.scale,
//         //     [bw * hoverScale, bh * hoverScale, bz],
//         //     0.1,
//         //     dt
//         // );
// ;

//         easing.damp3(
//             imageRef.current.scale,
//             [bw * hoverScale, bh * hoverScale, bz],
//             0.1,
//             dt
//         );



//         //Frame color animation
//         easing.dampC(
//             (frameRef.current.material as THREE.MeshBasicMaterial).color,
//             hovered ? 'black' : 'white',
//             0.1,
//             dt
//         );
//     });

//     return (
//         <group position={position} rotation={rotation}>
//             <mesh
//                 name={book.id}
//                 onPointerOver={(e) => {
//                     e.stopPropagation();
//                     setHovered(true);
//                 }}
//                 onPointerOut={() => setHovered(false)}
//                 // onClick={(e) => {
//                 //     e.stopPropagation();
//                 //     // onClick?.();
//                 // }}
//                 scale={[1, GOLDENRATIO, 0.05]}
//                 position={[0, GOLDENRATIO / 2, 0]}
//             >
//                 {/* Dark background box */}
//                 <boxGeometry />
//                 <meshStandardMaterial
//                     color="#151515"
//                     metalness={0.5}
//                     roughness={0.5}
//                     envMapIntensity={2}
//                 />
//                 {/* Decorative frame (border) */}
//                 <mesh
//                     ref={frameRef}
//                     raycast={()=> null}
//                     scale={[0.9, 0.93, 0.9]}
//                     position={[0, 0, 0.2]}
//                 >
//                     <boxGeometry />
//                     <meshBasicMaterial toneMapped={false} fog={false} />
//                 </mesh>

//                 {/* Book cover image or fallback */}
//                 {/* {book.imageLinks?.thumbnail ? (
//                     <Image
//                     raycast={() => null}
//                     ref={imageRef}
//                     position={[0, 0, 0.7]}
//                     url={book.imageLinks.thumbnail}
//                     onUpdate={(self) => {
                        
//                         const material = self.material as THREE.MeshBasicMaterial;
//                         const img = material.map?.image as HTMLImageElement | undefined;

//                         if (!img) return;
//                         const aspect = img.width / img.height;

//                         const height = 0.9; // canonical book face height
//                         const width = height * aspect;

//                         baseImageScale.current = [width, height, 1];
//                         self.scale.set(width, height, 1);
//                     }}
//                     />

//                     <Image
//                         raycast={() => null}
//                         ref={imageRef}
//                         position={[0, 0, 0.7]}
//                         url={book.imageLinks.thumbnail}
//                     />
//                 ) : (
//                     <Text
//                         position={[0, 0, 0.7]}
//                         fontSize={0.1}
//                         color="white"
//                         anchorX="center"
//                         anchorY="middle"
//                         maxWidth={0.8}
//                     >
//                         {book.title}
//                     </Text>
//                 )} */}

//                 {book.imageLinks?.thumbnail ? (
//                 <mesh
//                     ref={imageRef}
//                     raycast={() => null}
//                     position={[0, 0, 0.7]}
//                 >
//                     <planeGeometry args={[1, 1]} />
//                     <meshBasicMaterial
//                     toneMapped={false}
//                     map={(() => {
//                         const tex = getCachedTexture(book.imageLinks!.thumbnail!, loader);

//                         // one-time texture setup (safe to run multiple times)
//                         tex.colorSpace = THREE.SRGBColorSpace;
//                         tex.flipY = false;
//                         tex.needsUpdate = true;

//                         // aspect ratio lock (based on loaded image)
//                         const img = tex.image as HTMLImageElement | undefined;
//                         if (img?.width && img?.height) {
//                         const aspect = img.width / img.height;
//                         const height = 0.9; // canonical height on the book face
//                         const width = height * aspect;
//                         baseImageScale.current = [width, height, 1];
//                         } else {
//                         baseImageScale.current = [0.9, 0.9, 1]; // fallback until loaded
//                         }

//                         return tex;
//                     })()}
//                     />
//                 </mesh>
//                 ) : (
//                 <Text
//                     position={[0, 0, 0.7]}
//                     fontSize={0.1}
//                     color="white"
//                     anchorX="center"
//                     anchorY="middle"
//                     maxWidth={0.8}
//                 >
//                     {book.title}
//                 </Text>
//                 )}

//             </mesh>
//             {isActive && (
//                 <Html
//                     position={[0, -GOLDENRATIO / 2 + 1.25, 0]}
//                     center
//                     distanceFactor={15}
//                 >
//                     <button
//                         className="px-2 py-2 bg-gold text-white font-sm rounded-lg hover:bg-yellow-600 transition-colors"
//                         onClick={(e) =>{
//                             e.stopPropagation();
//                             console.log('Open book:', book.id);
//                             setSelectedBook(book);
//                             router.push(`/book/${book.id}`);
//                         }}
//                     >
//                         Open
//                     </button>

//                 </Html>
//             )
//             }
//         </group>
//     );
// }

// 'use client';

// import * as THREE from 'three';
// import { useRef, useState, useMemo, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Text, useCursor, Html } from '@react-three/drei';
// import { easing } from 'maath';
// import { TextureLoader } from 'three';
// import { useRouter } from 'next/navigation';
// import type { Book } from '../../app/types/books';
// import { useBook } from '../../app/context/BookContext';
// import { getCachedTexture } from '../../lib/books/textureCache';

// const GOLDENRATIO = 1.61803398875;

// interface BookFrameProps {
//   book: Book;
//   position: readonly [number, number, number];
//   rotation: readonly [number, number, number];
//   isActive?: boolean;
// }

// export default function BookFrame({
//   book,
//   position,
//   rotation,
//   isActive = false,
// }: BookFrameProps) {
//   const imageRef = useRef<THREE.Mesh>(null);
//   const frameRef = useRef<THREE.Mesh>(null);

//   const loader = useMemo(() => new TextureLoader(), []);
//   const baseImageScale = useRef<[number, number, number]>([0.9, 0.9, 1]);

//   const [hovered, setHovered] = useState(false);

//   const router = useRouter();
//   const { setSelectedBook } = useBook();

//   useCursor(hovered);

//   /** Load cached texture (or null) */
//   const texture = useMemo(() => {
//     if (!book.imageLinks?.thumbnail) return null;
//     return getCachedTexture(book.imageLinks.thumbnail, loader);
//   }, [book.imageLinks?.thumbnail, loader]);


//   /** Lock aspect ratio once image is available */
//   useEffect(() => {
//     if (!texture) return;

//     const img = texture.image as HTMLImageElement | undefined;
//     if (!img) return;

//     const updateScale = () => {
//       const aspect = img.width / img.height;
//       const height = 0.9;
//       const width = height * aspect;
//       baseImageScale.current = [width, height, 1];
//     };

//     if (img.complete) {
//       updateScale();
//     } else {
//       img.onload = updateScale;
//     }
//   }, [texture]);

//   /** Hover + frame animation */
//   useFrame((_, dt) => {
//     if (!imageRef.current || !frameRef.current) return;

//     const [bw, bh, bz] = baseImageScale.current;
//     const hoverScale = !isActive && hovered ? 0.92 : 1;

//     easing.damp3(
//       imageRef.current.scale,
//       [bw * hoverScale, bh * hoverScale, bz],
//       0.1,
//       dt
//     );

//     easing.dampC(
//       (frameRef.current.material as THREE.MeshBasicMaterial).color,
//       hovered ? 'black' : 'white',
//       0.1,
//       dt
//     );
//   });

//   const handleClick = (e: any) => {
//     e.stopPropagation();

//     //First click: let parent logic handle camera zoom
//     if(!isActive) return;

//     //Second click: user navigates to individual page

//     setSelectedBook(book);
//     router.push(`/book/${book.id}`);
//   };

//   return (
//     <group position={position} rotation={rotation}>
//       <mesh
//         name={book.id}
//         scale={[1, GOLDENRATIO, 0.05]}
//         position={[0, GOLDENRATIO / 2, 0]}
     
//         onPointerOver={(e) => {
//           e.stopPropagation();
//           setHovered(true);
//         }}
//         onPointerOut={() => setHovered(false)}
//       >
//         {/* Book body */}
//         <boxGeometry />
//         <meshStandardMaterial
//           color="#151515"
//           metalness={0.5}
//           roughness={0.5}
//           envMapIntensity={2}
//         />

//         {/* Frame */}
//         <mesh
//           ref={frameRef}
//           raycast={() => null}
//           scale={[0.9, 0.93, 0.9]}
//           position={[0, 0, 0.2]}
//         >
//           <boxGeometry />
//           <meshBasicMaterial toneMapped={false} />
//         </mesh>

//         {/* Cover or fallback */}
//         {texture ? (
//           <mesh ref={imageRef} position={[0, 0, 0.7]} raycast={() => null}>
//             <planeGeometry args={[1, 1]} />
//             <meshBasicMaterial
//               map={texture}
//               toneMapped={false}
//             />
//           </mesh>
//         ) : (
//           <Text
//             position={[0, 0, 0.7]}
//             fontSize={0.1}
//             color="white"
//             anchorX="center"
//             anchorY="middle"
//             maxWidth={0.8}
//           >
//             {book.title}
//           </Text>
//         )}
//       </mesh>

//       {isActive && (
//         <Html
//           position={[0, -GOLDENRATIO / 2 + 1.15, 0]}
//           center
//           distanceFactor={15}
//         >
//           <button
//             className="px-2 py-1.5 bg-blue-900 text-white rounded-md hover:bg-[#0a0f1f]"

//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedBook(book);
//               document.cookie = 'hasSelectedBook=1; path=/';
//               router.push(`/book/${book.id}`);
//             }}
//           >
//             Open
//           </button>
//         </Html>
//       )}
//     </group>
//   );
// }



'use client';

import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useCursor, Html } from '@react-three/drei';
import { easing } from 'maath';
import { useRouter } from 'next/navigation';
import type { Book } from '../../app/types/books';
import { useBook } from '../../app/context/BookContext';
import { getPreloadedTexture } from '../../lib/books/preloadTexture';
import { getCachedTexture } from '../../lib/books/textureCache';

const GOLDENRATIO = 1.61803398875;

interface BookFrameProps {
  book: Book;
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  isActive?: boolean;
}

export default function BookFrame({
  book,
  position,
  rotation,
  isActive = false,
}: BookFrameProps) {
  const imageRef = useRef<THREE.Mesh>(null);
  const frameRef = useRef<THREE.Mesh>(null);

  const loader = useMemo(() => new THREE.TextureLoader(), []);
  const baseImageScale = useRef<[number, number, number]>([0.9, 0.9, 1]);

  const [hovered, setHovered] = useState(false);

  const router = useRouter();
  const { setSelectedBook } = useBook();

  useCursor(hovered);

  /** Load texture - try preloaded first, then fall back to cache */
  const texture = useMemo(() => {
    if (!book.imageLinks?.thumbnail) return null;
    
    // Try preloaded texture first (from loading screen)
    const preloaded = getPreloadedTexture(book.imageLinks.thumbnail);
    if (preloaded) return preloaded;
    
    // Fall back to original cache system
    return getCachedTexture(book.imageLinks.thumbnail, loader);
  }, [book.imageLinks?.thumbnail, loader]);


  /** Lock aspect ratio once image is available */
  useEffect(() => {
    if (!texture) return;

    const img = texture.image as HTMLImageElement | undefined;
    if (!img) return;

    const updateScale = () => {
      const aspect = img.width / img.height;
      const height = 0.9;
      const width = height * aspect;
      baseImageScale.current = [width, height, 1];
    };

    if (img.complete) {
      updateScale();
    } else {
      img.onload = updateScale;
    }
  }, [texture]);

  /** Hover + frame animation */
  useFrame((_, dt) => {
    if (!imageRef.current || !frameRef.current) return;

    const [bw, bh, bz] = baseImageScale.current;
    const hoverScale = !isActive && hovered ? 0.92 : 1;

    easing.damp3(
      imageRef.current.scale,
      [bw * hoverScale, bh * hoverScale, bz],
      0.1,
      dt
    );

    easing.dampC(
      (frameRef.current.material as THREE.MeshBasicMaterial).color,
      hovered ? 'black' : 'white',
      0.1,
      dt
    );
  });

  const handleClick = (e: any) => {
    e.stopPropagation();

    //First click: let parent logic handle camera zoom
    if(!isActive) return;

    //Second click: user navigates to individual page

    setSelectedBook(book);
    router.push(`/book/${book.id}`);
  };

  return (
    <group position={position} rotation={rotation}>
      <mesh
        name={book.id}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
     
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Book body */}
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />

        {/* Frame */}
        <mesh
          ref={frameRef}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} />
        </mesh>

        {/* Cover or fallback */}
        {texture ? (
          <mesh ref={imageRef} position={[0, 0, 0.7]} raycast={() => null}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={texture}
              toneMapped={false}
            />
          </mesh>
        ) : (
          <Text
            position={[0, 0, 0.7]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.8}
          >
            {book.title}
          </Text>
        )}
      </mesh>

      {isActive && (
        <Html
          position={[0, -GOLDENRATIO / 2 + 1.15, 0]}
          center
          distanceFactor={15}
        >
          <button
            // className="px-2 py-1.5 bg-blue-900 text-white rounded-md hover:bg-[#0a0f1f]"
            className="px-1.5 py-0.5 text-xs bg-blue-900/80 text-white rounded hover:bg-[#0a0f1f]"

            onClick={(e) => {
              e.stopPropagation();
              setSelectedBook(book);
              document.cookie = 'hasSelectedBook=1; path=/';
              router.push(`/book/${book.id}`);
            }}
          >
            Open
          </button>
        </Html>
      )}
    </group>
  );
}