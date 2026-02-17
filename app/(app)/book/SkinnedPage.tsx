// "use client";

// import * as THREE from "three";
// import { useRef, useMemo, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import { easing } from 'maath';
// import { useTexture } from '@react-three/drei';

// export default function SkinnedPage({
//     number, 
//     isOpen,
//     bookClosed,
//     coverTexture,
//     onClick,
// } : {
//     number: number, 
//     totalPages: number,
//     isOpen: boolean,
//     bookClosed: boolean,
//     coverTexture?: THREE.Texture | null;
//     onClick?: () => void;
// }) {
//     const skinnedMeshRef = useRef<THREE.SkinnedMesh | null>(null);
//     const groupRef = useRef<THREE.Group>(null);
    

//     // Constants
//     const bookPageWidth = 4;
//     const bookPageHeight = 6;
//     const bookPageDepth = 0.007;
//     const numberOfWidthSegments = 30;
//     const segmentWidth = bookPageWidth / numberOfWidthSegments;

//     const skinnedMesh = useMemo(() => {
//         const geometry = new THREE.BoxGeometry(
//             bookPageWidth,
//             bookPageHeight, 
//             bookPageDepth,
//             numberOfWidthSegments,
//             1,
//             1
//         );

//         geometry.translate(bookPageWidth / 2, 0, 0);

//         const position = geometry.attributes.position;
//         const skinIndices = [];
//         const skinWeights = [];

//         for (let i = 0; i < position.count; i++) {
//             const x = position.getX(i);
//             const skinIndex = Math.max(0, Math.floor(x / segmentWidth));
//             const skinWeight = (x % segmentWidth) / segmentWidth;
//             const nextIndex = Math.min(skinIndex + 1, numberOfWidthSegments);

//             skinIndices.push(skinIndex, nextIndex, 0, 0);
//             skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
//         }

//         geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndices, 4));
//         geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeights, 4));

//         // Create bones
//         const bones = [];
//         for (let i = 0; i <= numberOfWidthSegments; i++) {
//             const bone = new THREE.Bone();
//             bones.push(bone);

//             if (i === 0) {
//                 bone.position.x = 0;
//             } else {
//                 bone.position.x = segmentWidth;
//                 bones[i - 1].add(bone);
//             }
//         }

//         const skeleton = new THREE.Skeleton(bones);

//         // Materials - only page 0 gets the cover texture on front face (material index 4)
//         const materials = [
//                 new THREE.MeshStandardMaterial({ color: 'white' }), // right
//                 new THREE.MeshStandardMaterial({ color: '#704936' }),   // left
//                 new THREE.MeshStandardMaterial({ color: 'white' }), // top
//                 new THREE.MeshStandardMaterial({ color: 'white' }), // bottom
//                 new THREE.MeshStandardMaterial({                     // front - COVER
//                     map: coverTexture,
//                     roughness: 0.1,
//                 }),
//                 new THREE.MeshStandardMaterial({ color: 'white', roughness: 0.1 }), // back
//             ]
           
//         const mesh = new THREE.SkinnedMesh(geometry, materials);
//         mesh.add(bones[0]);
//         mesh.bind(skeleton);
//         mesh.frustumCulled = false;
//         mesh.castShadow = true;
//         mesh.receiveShadow = true;

//         return mesh;
//     }, [coverTexture, number]);


//      // Cleanup effect HERE - right after useMemo 
//     useEffect(() => {
//         return () => {
//         if (skinnedMeshRef.current) {
//             skinnedMeshRef.current.geometry.dispose();
//             const materials = skinnedMeshRef.current.material;
//             if (Array.isArray(materials)) {
//             materials.forEach(mat => mat.dispose());
//             }
//         }
//         };
//     }, []);


//     const easingFactor = 0.5;
//     const insideCurveStrength = 0.18;
//     const outsideCurveStrength = 0.05;

//     useFrame((_, delta) => {
//         const mesh = skinnedMeshRef.current;
//         if (!mesh || !groupRef.current) return;

//         let targetRotation = isOpen ? -Math.PI / 2 : Math.PI / 2;
        
//         if (!bookClosed) {
//             targetRotation += THREE.MathUtils.degToRad(number * 0.2 );
//         }

//         const bones = mesh.skeleton.bones;
//         for (let i = 0; i < bones.length; i++) {
//             const target = i === 0 ? groupRef.current : bones[i];

//             const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
//             const outsideCurveIntensity = i > 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      

//             let rotationAngle = 
//                 insideCurveStrength * insideCurveIntensity * targetRotation - 
//                 outsideCurveStrength * outsideCurveIntensity * targetRotation;
            
//             if (bookClosed) {
//                 if (i === 0) {
//                     rotationAngle = targetRotation;
//                 } else {
//                     rotationAngle = 0;
//                 }
//             }

//             easing.dampAngle(
//                 target.rotation,
//                 "y",
//                 rotationAngle,
//                 easingFactor,
//                 delta
//             );
//         }
//     });

//     // Position pages with proper depth offset
//     const z = -number * bookPageDepth;

//     return (
//         <group 
//             ref={groupRef}
//             onClick={(e) => {
//                 if (number === 0 && onClick) {
//                     e.stopPropagation();
//                     onClick();
//                 }
//             }}
//         >
//             <primitive 
//                 object={skinnedMesh} 
//                 ref={skinnedMeshRef} 
//                 position-z={z}
//             />
//         </group>
//     );
// }


"use client";

import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from 'maath';
import { useTexture } from '@react-three/drei';

export default function SkinnedPage({
    number, 
    isOpen,
    bookClosed,
    coverTexture,
    onClick,
} : {
    number: number, 
    totalPages: number,
    isOpen: boolean,
    bookClosed: boolean,
    coverTexture?: THREE.Texture | null;
    onClick?: () => void;
}) {
    const skinnedMeshRef = useRef<THREE.SkinnedMesh | null>(null);
    const groupRef = useRef<THREE.Group>(null);
    

    // Constants
    const bookPageWidth = 4;
    const bookPageHeight = 6;
    const bookPageDepth = 0.007;
    const numberOfWidthSegments = 30;
    const segmentWidth = bookPageWidth / numberOfWidthSegments;

    const skinnedMesh = useMemo(() => {
        const geometry = new THREE.BoxGeometry(
            bookPageWidth,
            bookPageHeight, 
            bookPageDepth,
            numberOfWidthSegments,
            1,
            1
        );

        geometry.translate(bookPageWidth / 2, 0, 0);

        const position = geometry.attributes.position;
        const skinIndices = [];
        const skinWeights = [];

        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const skinIndex = Math.max(0, Math.floor(x / segmentWidth));
            const skinWeight = (x % segmentWidth) / segmentWidth;
            const nextIndex = Math.min(skinIndex + 1, numberOfWidthSegments);

            skinIndices.push(skinIndex, nextIndex, 0, 0);
            skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
        }

        geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndices, 4));
        geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeights, 4));

        // Create bones
        const bones = [];
        for (let i = 0; i <= numberOfWidthSegments; i++) {
            const bone = new THREE.Bone();
            bones.push(bone);

            if (i === 0) {
                bone.position.x = 0;
            } else {
                bone.position.x = segmentWidth;
                bones[i - 1].add(bone);
            }
        }

        const skeleton = new THREE.Skeleton(bones);

        // Materials - only page 0 gets the cover texture on front face (material index 4)
        const materials = [
                new THREE.MeshStandardMaterial({ color: 'white', emissive: 'white'}), // right
                new THREE.MeshStandardMaterial({ color: '#704936' }),   // left
                new THREE.MeshStandardMaterial({ color: 'white', emissive: 'white'}), // top
                new THREE.MeshStandardMaterial({ color: 'white', emissive: 'white'}), // bottom
                new THREE.MeshStandardMaterial({                     // front - COVER
                    map: coverTexture,
                    roughness: 0.1,
                }),
                new THREE.MeshStandardMaterial({ 
                    color: 'white', 
                    roughness: 0.1,
                }), // back
            ]
           
        const mesh = new THREE.SkinnedMesh(geometry, materials);
        mesh.add(bones[0]);
        mesh.bind(skeleton);
        mesh.frustumCulled = false;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }, [coverTexture, number]);


     // Cleanup effect HERE - right after useMemo 
    useEffect(() => {
        return () => {
        if (skinnedMeshRef.current) {
            skinnedMeshRef.current.geometry.dispose();
            const materials = skinnedMeshRef.current.material;
            if (Array.isArray(materials)) {
            materials.forEach(mat => mat.dispose());
            }
        }
        };
    }, []);


    const easingFactor = 0.5;
    const insideCurveStrength = 0.18;
    const outsideCurveStrength = 0.05;

    useFrame((_, delta) => {
        const mesh = skinnedMeshRef.current;
        if (!mesh || !groupRef.current) return;

        let targetRotation = isOpen ? -Math.PI / 2 : Math.PI / 2;
        
        if (!bookClosed) {
            targetRotation += THREE.MathUtils.degToRad(number * 0.2 );
        }

        const bones = mesh.skeleton.bones;
        for (let i = 0; i < bones.length; i++) {
            const target = i === 0 ? groupRef.current : bones[i];

            const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
            const outsideCurveIntensity = i > 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      

            let rotationAngle = 
                insideCurveStrength * insideCurveIntensity * targetRotation - 
                outsideCurveStrength * outsideCurveIntensity * targetRotation;
            
            if (bookClosed) {
                if (i === 0) {
                    rotationAngle = targetRotation;
                } else {
                    rotationAngle = 0;
                }
            }

            easing.dampAngle(
                target.rotation,
                "y",
                rotationAngle,
                easingFactor,
                delta
            );
        }
    });

    // Position pages with proper depth offset
    const z = -number * bookPageDepth;

    return (
        <group 
            ref={groupRef}
            onClick={(e) => {
                if (number === 0 && onClick) {
                    e.stopPropagation();
                    onClick();
                }
            }}
        >
            <primitive 
                object={skinnedMesh} 
                ref={skinnedMeshRef} 
                position-z={z}
            />
        </group>
    );
}



