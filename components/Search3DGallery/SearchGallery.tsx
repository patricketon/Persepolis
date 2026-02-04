// 'use client';

// import * as THREE from 'three';
// import { Canvas } from '@react-three/fiber';
// import { Stars, Sky } from '@react-three/drei';
// import { Router } from 'wouter';
// import BookFrames from './BookFrames';
// import { Book } from '../../app/types/books';
// import { useHashLocation } from 'wouter/use-hash-location';
// import { useEffect, useRef, useMemo } from 'react';
// import { RGBELoader } from 'three-stdlib';
// import { useLoader } from '@react-three/fiber';
// import { useFrame } from '@react-three/fiber';
// import { 
//     waterVertexShader,
//     waterFragmentShader,
//     waterUniforms
// } from '../water/WaterMaterial';
// import { Background } from '../Atmosphere';
// import { OceanPlane } from '../Ocean/OceanPlane';

// interface SearchGalleryProps {
//     books: Book[];
// }

// function WaterPlane() {
//   const dudv = useLoader(THREE.TextureLoader, '/waterAssets/fftDudv.png');
//   const base = useLoader(THREE.TextureLoader, '/waterAssets/ground.jpg');
//   const env = useLoader(RGBELoader, '/waterAssets/env.hdr');

//   useEffect(() => {
//     dudv.wrapS = dudv.wrapT = THREE.RepeatWrapping;
//     base.wrapS = base.wrapT = THREE.RepeatWrapping;
//     env.mapping = THREE.EquirectangularReflectionMapping;

//     waterUniforms.iChannel0.value = base;
//     waterUniforms.iChannel1.value = env;
//     waterUniforms.iChannel2.value = dudv;
//   }, [dudv, base, env]);

//   useFrame((state) => {
//     waterUniforms.iTime.value = state.clock.elapsedTime;
//     waterUniforms.inverseViewMatrix.value.copy(state.camera.matrixWorld);
//   });

//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry args={[50, 50]} />
//       <shaderMaterial
//         vertexShader={waterVertexShader}
//         fragmentShader={waterFragmentShader}
//         uniforms={waterUniforms}
//       />
//     </mesh>
//   );
// }

// export default function SearchGallery({ books }: SearchGalleryProps) {

//     const featuredBooks = books.slice(0, 9);
//     const moreBooks = books.slice(9);

//     return(
//         <div style={{ width: '100vw', minHeight: '100vh', overflowY: 'auto' }}>  {/* Changed height to minHeight + added scroll */}
            
//             {/* 3D Gallery Section */}
//             <div style={{ height: '100vh', position: 'relative' }}>  {/* Changed from 100vh to 70vh */}
//                 <Background/>
               
               
//                 <Router hook={useHashLocation}>
//                     <Canvas dpr={[1, 1.5]} camera={{ fov: 80, position: [0, 3, 15]}}>
//                         {/* <color attach="background" args={['#653242']}/> */}
//                         {/* <fog attach="fog" args={['#191920', 0, 15]} /> */}
//                         <directionalLight position={[5, 10, 5]} intensity={1.2} color="#8fbfff" />
//                         <ambientLight intensity={0.3} />
//                         <Stars radius={75} depth={50} count={10000} factor={4} saturation={0} fade speed={1} />
//                         {/* <Sky distance={450000}     // very large = infinite sky
//                             sunPosition={[5, 10, 5]}
//                             turbidity={12}
//                             rayleigh={2}
//                             mieCoefficient={0.005}
//                             mieDirectionalG={0.8}
//                         /> */}
//                         <group position={[0, -0.95, 0.7]}>
//                             <BookFrames books={featuredBooks} />  {/* Use featuredBooks not all books */}
//                            <WaterPlane/>
                           
                    
//                             <mesh rotation={[-Math.PI / 2, 0, 0]}>
//                                 <planeGeometry args={[50, 50]}/>
//                                  {/* <MeshReflectorMaterial
//                                     blur={[300, 100]}
//                                     resolution={2048}
//                                     mixBlur={1}
//                                     mixStrength={80}
//                                     roughness={1}
//                                     depthScale={1.2}
//                                     minDepthThreshold={0.4}
//                                     maxDepthThreshold={1.4}
//                                     color="#050505"
//                                     metalness={0.5}
//                                 />  */}
//                                 <shaderMaterial
//                                     vertexShader={waterVertexShader}
//                                     fragmentShader={waterFragmentShader}
//                                     uniforms={waterUniforms}
//                                 />
//                             </mesh> 
//                         </group>
//                         {/* <Environment preset="city"/> */}
//                     </Canvas>
//                 </Router>
//             </div>
//         </div>
//     );
// }


// 'use client';

// import * as THREE from 'three';
// import { Canvas } from '@react-three/fiber';
// import { Stars } from '@react-three/drei';
// import { Router } from 'wouter';
// import BookFrames from './BookFrames';
// import { Book } from '../../app/types/books';
// import { useHashLocation } from 'wouter/use-hash-location';
// import { useEffect, useState } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { 
//     waterVertexShader,
//     waterFragmentShader,
//     waterUniforms
// } from '../water/WaterMaterial';
// import { Background } from '../Atmosphere';
// import { getWaterAssets, areWaterAssetsLoaded } from '../../lib/water/preloadWaterAssets'

// interface SearchGalleryProps {
//     books: Book[];
// }

// function WaterPlane() {
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     // Use preloaded assets instead of useLoader
//     getWaterAssets().then(({ dudv, base, env }) => {
//       waterUniforms.iChannel0.value = base;
//       waterUniforms.iChannel1.value = env;
//       waterUniforms.iChannel2.value = dudv;
//       setReady(true);
//     });
//   }, []);

//   useFrame((state) => {
//     if (!ready) return;
//     waterUniforms.iTime.value = state.clock.elapsedTime;
//     waterUniforms.inverseViewMatrix.value.copy(state.camera.matrixWorld);
//   });

//   if (!ready) return null;

//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry args={[50, 50]} />
//       <shaderMaterial
//         vertexShader={waterVertexShader}
//         fragmentShader={waterFragmentShader}
//         uniforms={waterUniforms}
//       />
//     </mesh>
//   );
// }

// export default function SearchGallery({ books }: SearchGalleryProps) {
//     const featuredBooks = books.slice(0, 9);

//     return(
//         <div style={{ width: '100vw', minHeight: '100vh', overflowY: 'auto' }}>
//             {/* 3D Gallery Section */}
//             <div style={{ height: '100vh', position: 'relative' }}>
//                 <Background/>
               
//                 <Router hook={useHashLocation}>
//                     <Canvas dpr={[1, 1.5]} camera={{ fov: 80, position: [0, 3, 15]}}>
//                         <directionalLight position={[5, 10, 5]} intensity={1.2} color="#8fbfff" />
//                         <ambientLight intensity={0.3} />
//                         <Stars radius={75} depth={50} count={10000} factor={4} saturation={0} fade speed={1} />
                        
//                         <group position={[0, -0.95, 0.7]}>
//                             <BookFrames books={featuredBooks} />
//                             <WaterPlane />
                    
//                             <mesh rotation={[-Math.PI / 2, 0, 0]}>
//                                 <planeGeometry args={[50, 50]}/>
//                                 <shaderMaterial
//                                     vertexShader={waterVertexShader}
//                                     fragmentShader={waterFragmentShader}
//                                     uniforms={waterUniforms}
//                                 />
//                             </mesh> 
//                         </group>
//                     </Canvas>
//                 </Router>
//             </div>
//         </div>
//     );
// }


// 'use client';

// import * as THREE from 'three';
// import { Canvas } from '@react-three/fiber';
// import { Stars } from '@react-three/drei';
// import { Router } from 'wouter';
// import BookFrames from './BookFrames';
// import { Book } from '../../app/types/books';
// import { useHashLocation } from 'wouter/use-hash-location';
// import { useEffect, useState, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { easing } from 'maath';
// import { 
//     waterVertexShader,
//     waterFragmentShader,
//     waterUniforms
// } from '../water/WaterMaterial';
// import { Background } from '../Atmosphere';
// import { getWaterAssets } from '../../lib/water/preloadWaterAssets';

// interface SearchGalleryProps {
//     books: Book[];
// }

// // Camera dolly-in animation on scene load
// function CameraDolly() {
//   const startPosition = useRef(new THREE.Vector3(0, 2, 8));  // Start slightly back
//   const endPosition = useRef(new THREE.Vector3(0, 0.5, 5.5)); // End at intimate viewing distance
//   const hasAnimated = useRef(false);

//   useFrame((state, delta) => {
//     if (!hasAnimated.current) {
//       // Smoothly interpolate camera position
//       easing.damp3(
//         state.camera.position,
//         endPosition.current,
//         0.4, // damping factor - lower = slower
//         delta
//       );

//       // Check if we've reached the target (close enough)
//       const distance = state.camera.position.distanceTo(endPosition.current);
//       if (distance < 0.01) {
//         hasAnimated.current = true;
//       }
//     }
//   });

//   // Set initial camera position on mount
//   useEffect(() => {
//     return () => {
//       hasAnimated.current = false; // Reset on unmount
//     };
//   }, []);

//   return null;
// }

// function WaterPlane() {
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     // Use preloaded assets instead of useLoader
//     getWaterAssets().then(({ dudv, base, env }) => {
//       waterUniforms.iChannel0.value = base;
//       waterUniforms.iChannel1.value = env;
//       waterUniforms.iChannel2.value = dudv;
//       setReady(true);
//     });
//   }, []);

//   useFrame((state) => {
//     if (!ready) return;
//     waterUniforms.iTime.value = state.clock.elapsedTime;
//     waterUniforms.inverseViewMatrix.value.copy(state.camera.matrixWorld);
//   });

//   if (!ready) return null;

//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry args={[50, 50]} />
//       <shaderMaterial
//         vertexShader={waterVertexShader}
//         fragmentShader={waterFragmentShader}
//         uniforms={waterUniforms}
//       />
//     </mesh>
//   );
// }

// export default function SearchGallery({ books }: SearchGalleryProps) {
//     const featuredBooks = books.slice(0, 9);

//     return(
//         <div style={{ width: '100vw', minHeight: '100vh', overflowY: 'auto' }}>
//             {/* 3D Gallery Section */}
//             <div style={{ height: '100vh', position: 'relative' }}>
//                 <Background/>
               
//                 <Router hook={useHashLocation}>
//                     <Canvas dpr={[1, 1.5]} camera={{ fov: 80, position: [0, 2, 8]}}>
//                         <CameraDolly />
//                         <directionalLight position={[5, 10, 5]} intensity={1.2} color="#8fbfff" />
//                         <ambientLight intensity={0.3} />
//                         <Stars radius={75} depth={50} count={10000} factor={4} saturation={0} fade speed={1} />
                        
//                         <group position={[0, -0.95, 0.7]}>
//                             <BookFrames books={featuredBooks} />
//                             <WaterPlane />
                    
//                             <mesh rotation={[-Math.PI / 2, 0, 0]}>
//                                 <planeGeometry args={[50, 50]}/>
//                                 <shaderMaterial
//                                     vertexShader={waterVertexShader}
//                                     fragmentShader={waterFragmentShader}
//                                     uniforms={waterUniforms}
//                                 />
//                             </mesh> 
//                         </group>
//                     </Canvas>
//                 </Router>
//             </div>
//         </div>
//     );
// }



'use client';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { useEffect, useState } from 'react';

import BookFrames from './BookFrames';
import type { Book } from '../../app/types/books';
import { Background } from '../Atmosphere';
import {
  waterVertexShader,
  waterFragmentShader,
  waterUniforms,
} from '../water/WaterMaterial';
import { getWaterAssets } from '../../lib/water/preloadWaterAssets';

interface SearchGalleryProps {
  books: Book[];
}

// function WaterPlane() {
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     getWaterAssets().then(({ dudv, base, env }) => {
//       waterUniforms.iChannel0.value = base;
//       waterUniforms.iChannel1.value = env;
//       waterUniforms.iChannel2.value = dudv;
//       setReady(true);
//     });
//   }, []);

//   useFrame((state) => {
//     if (!ready) return;
//     waterUniforms.iTime.value = state.clock.elapsedTime;
//     waterUniforms.inverseViewMatrix.value.copy(state.camera.matrixWorld);
//   });

//   if (!ready) return null;

//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry args={[50, 50]} />
//       <shaderMaterial
//         vertexShader={waterVertexShader}
//         fragmentShader={waterFragmentShader}
//         uniforms={waterUniforms}
//       />
//     </mesh>
//   );
// }

function WaterPlane() {
//   useEffect(() => {
//     getWaterAssets().then(({ dudv, base, env }) => {
//       waterUniforms.iChannel0.value = base;
//       waterUniforms.iChannel1.value = env;
//       waterUniforms.iChannel2.value = dudv;
//     });
//   }, []);

  useFrame((state) => {
    waterUniforms.iTime.value = state.clock.elapsedTime;
    waterUniforms.inverseViewMatrix.value.copy(state.camera.matrixWorld);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={waterUniforms}
      />
    </mesh>
  );
}


export default function SearchGallery({ books }: SearchGalleryProps) {
  const featuredBooks = books.slice(0, 9);

  return (
    <div style={{ width: '100vw', minHeight: '100vh', overflowY: 'auto' }}>
      <div style={{ height: '100vh', position: 'relative' }}>
        <Background />

        <Router hook={useHashLocation}>
          <Canvas dpr={[1, 1.5]} camera={{ fov: 80, position: [0, 3, 15] }}>
            <directionalLight
              position={[5, 10, 5]}
              intensity={1.2}
              color="#8fbfff"
            />
            <ambientLight intensity={0.3} />
            <Stars
              radius={75}
              depth={50}
              count={10000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />

            <group position={[0, -0.95, 0.7]}>
              <BookFrames books={featuredBooks} />
              <WaterPlane />

              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <shaderMaterial
                  vertexShader={waterVertexShader}
                  fragmentShader={waterFragmentShader}
                  uniforms={waterUniforms}
                />
              </mesh>
            </group>
          </Canvas>
        </Router>
      </div>
    </div>
  );
}
