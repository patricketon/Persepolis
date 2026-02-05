'use client';

import { useEffect, useState } from 'react';
import { GodRays } from '@paper-design/shaders-react';

export default function Background() {
  const [size, setSize] = useState<{ width: number; height: number; dpr: number } | null>(null);

  useEffect(() => {
    const update = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!size) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <GodRays
        width={size.width * size.dpr}
        height={size.height * size.dpr}
        colors={["#4370df", "#09489ae3", "#d0d9e1", "#a39e9e", "#43588e"]}
        colorBack="#000000"
        colorBloom="#ffffff"
        bloom={0.25}
        intensity={0.8}
        density={0.035}
        spotty={0.2}
        midSize={0.23}
        midIntensity={0.5}
        speed={1.0}
        offsetX={-0.3}
        offsetY={-0.1}
      />
    </div>
  );
}