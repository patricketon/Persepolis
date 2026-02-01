'use client'

import { SmokeRing } from '@paper-design/shaders-react'
import { ReactNode, useState, useEffect } from 'react'

export function WaitingRoomBackground({ children }: { children?: ReactNode }) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!size) return null

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Shader - absolute positioned behind everything */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <SmokeRing
          width={size.width}
          height={size.height}
          colors={["#ffffff"]}
          colorBack="#83afec"
          noiseScale={5}
          noiseIterations={8}
          radius={0.5}
          thickness={0.65}
          innerShape={0.85}
          speed={0.5}
          scale={1.56}
        />
      </div>

      {/* Content - on top */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
      </div>
    </div>
  )
}