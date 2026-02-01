'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import {
  Center,
  Text3D,
  Environment,
  Lightformer,
  AccumulativeShadows,
  RandomizedLight,
  MeshTransmissionMaterial
} from '@react-three/drei';
import { RGBELoader } from 'three-stdlib';

function Text({ text }: { text: string }) {
  const texture = useLoader(
    RGBELoader, 
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr'
  );
  
  return (
    <group>
      <Center scale={[0.8, 1, 1]} front top rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <Text3D
          castShadow
          bevelEnabled
          font="/Inter_Medium_Regular.json"
          scale={3}
          letterSpacing={-0.03}
          height={0.25}
          bevelSize={0.01}
          bevelSegments={10}
          curveSegments={128}
          bevelThickness={0.01}
        >
          {text}
          <MeshTransmissionMaterial
            backside={true}
            backsideThickness={0.15}
            samples={16}
            resolution={1024}
            transmission={1}
            clearcoat={1}
            clearcoatRoughness={0}
            thickness={0.3}
            chromaticAberration={0.15}
            anisotropy={0.25}
            roughness={0}
            distortion={0.5}
            distortionScale={0.1}
            temporalDistortion={0}
            ior={1.25}
            color="white"
            background={texture}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export default function GlassText({ text = "More" }: { text?: string }) {
  return (
    <div style={{ width: '100%', height: '40vh', background: '#000' }}>
      <Canvas 
        shadows 
        orthographic 
        camera={{ position: [10, 20, 20], zoom: 60 }} 
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['#000000']} />
        
        <Text text={text} />
        
        <Environment resolution={32}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={20} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
            <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
          </group>
        </Environment>
        
        <AccumulativeShadows 
          frames={100} 
          color="#94cbff" 
          colorBlend={5} 
          toneMapped={true} 
          alphaTest={0.9} 
          opacity={1} 
          scale={30} 
          position={[0, -1.01, 0]}
        >
          <RandomizedLight 
            amount={4} 
            radius={10} 
            ambient={0.5} 
            intensity={1} 
            position={[0, 10, -10]} 
            size={15} 
            mapSize={1024} 
            bias={0.0001} 
          />
        </AccumulativeShadows>
      </Canvas>
    </div>
  );
}