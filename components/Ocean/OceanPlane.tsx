import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Water } from 'three-stdlib'

extend({ Water })

export function OceanPlane() {
  const ref = useRef<any>(null)
  const gl = useThree((state) => state.gl)

  const waterNormals = useLoader(
    THREE.TextureLoader,
    '/waterAssets/waternormals.jpeg'
  )
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(80, 80),
    []
  )

  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(0, 1, 0),
      sunColor: 0xffffff,
      waterColor: 0x0b1e2d,
      distortionScale: 0.5,
      fog: false,
      format: gl.outputColorSpace,
    }),
    [waterNormals, gl]
  )

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta
    }
  })

  return (
    <water
      ref={ref}
      args={[geometry, config]}
      rotation-x={-Math.PI / 2}
      position={[0, -1.05, 0]}
    />
  )
}
