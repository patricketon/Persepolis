'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { vertexShader } from './vertex';
import { fragmentShader } from './fragment';

export default function Grass() {
  const materialRef = useRef<THREE.RawShaderMaterial>(null);

  const geometry = useMemo(() => {
    const bladeCount = 70000;
    const vertsPerBlade = 40;
    const totalVerts = bladeCount * vertsPerBlade;

    const geometry = new THREE.BufferGeometry();
    const indexArray = new Float32Array(totalVerts);

    for (let i = 0; i < totalVerts; i++) {
      indexArray[i] = i;
    }

    const triangles: number[] = [];

    for (let blade = 0; blade < bladeCount; blade++) {
      const base = blade * 40;

      for (let i = 0; i < 9; i++) {
        const a = base + i * 2;
        const b = a + 1;
        const c = a + 2;
        const d = a + 3;

        triangles.push(a, c, b);
        triangles.push(c, d, b);
      }
    }

    const positions = new Float32Array(totalVerts * 3);

    geometry.setIndex(triangles);
    geometry.setAttribute('vertexIndex', new THREE.BufferAttribute(indexArray, 1));
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setDrawRange(0, totalVerts);

    return geometry;
  }, []);

  const material = useMemo(() => {
    return new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    });
  }, []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh
      geometry={geometry}
      material={material}
      ref={(mesh) => {
        if (mesh) materialRef.current = mesh.material as THREE.RawShaderMaterial;
      }}
      position={[0, 0, 0]}
      rotation-y={Math.PI / 2}
    />
  );
}