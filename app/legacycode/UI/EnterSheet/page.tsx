
// 'use client';
// import { useState } from 'react';

// export default function Box3D() {
//   const [rotation, setRotation] = useState(30);

//   return (
//     <div>
//       <button onClick={() => setRotation(rotation + 90)}>Rotate</button>
//       <div style={{ margin: '50px' }}>
//         <div style={{ width: '400px', height: '600px', perspective: '1200px' }}>
//           <div style={{ 
//             width: '100%', 
//             height: '100%', 
//             position: 'relative', 
//             transformStyle: 'preserve-3d',
//             transform: `rotateX(-20deg) rotateY(${rotation}deg)`,
//             transition: 'transform 2s'
//           }}>
//             {/* Front: 400w × 600h */}
//             <div style={{ position: 'absolute', width: '400px', height: '600px', background: 'red', transform: 'rotateY(0deg) translateZ(50px)' }}>front</div>
            
//             {/* Back: 400w × 600h */}
//             <div style={{ position: 'absolute', width: '400px', height: '600px', background: 'green', transform: 'rotateY(180deg) translateZ(50px)' }}>back</div>
            
//             {/* Right: 100w × 600h */}
//             <div style={{ position: 'absolute', width: '100px', height: '600px', background: 'blue', left: '150px', transform: 'rotateY(90deg) translateZ(200px)' }}>right</div>
            
//             {/* Left: 100w × 600h */}
//             <div style={{ position: 'absolute', width: '100px', height: '600px', background: 'yellow', left: '150px', transform: 'rotateY(-90deg) translateZ(200px)' }}>left</div>
            
//             {/* Top: 400w × 100h */}
//             <div style={{ position: 'absolute', width: '400px', height: '100px', background: 'orange', top: '250px', transform: 'rotateX(90deg) translateZ(300px)' }}>top</div>
            
//             {/* Bottom: 400w × 100h */}
//             <div style={{ position: 'absolute', width: '400px', height: '100px', background: 'purple', top: '250px', transform: 'rotateX(-90deg) translateZ(300px)' }}>bottom</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Box3DWithClipPath({ shouldAnimate = true }) {
  const [rotation, setRotation] = useState(30);

  const generateClipPaths = (type: string) => {
    const gridSize = 6;
    const step = 100 / gridSize;
    const paths = [];
    const overlap = 0.1;
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x1 = col * step - overlap;
        const y1 = row * step - overlap;
        const x2 = (col + 1) * step;
        const y2 = (row + 1) * step;

        if (type === 'visible') {
          paths.push(
            `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`
          );
        } else {
          paths.push(
            `polygon(${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%)`
          );
        }
      }
    }
    return paths;
  };

  const hiddenClipPaths = generateClipPaths("hidden");
  const visibleClipPaths = generateClipPaths("visible");

  const randomOrder = [
    [".mask0"],
    [".mask1", ".mask6"],
    [".mask2", ".mask7", ".mask12"],
    [".mask3", ".mask8", ".mask13", ".mask18"],
    [".mask4", ".mask9", ".mask14", ".mask19", ".mask24"],
    [".mask5", ".mask10", ".mask15", ".mask20", ".mask25", ".mask30"],
    [".mask11", ".mask16", ".mask21", ".mask26", ".mask31"],
    [".mask17", ".mask22", ".mask27", ".mask32"],
    [".mask23", ".mask28", ".mask33"],
    [".mask29", ".mask34"],
    [".mask35"]
  ];

  useEffect(() => {
    if (!shouldAnimate) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const box = document.querySelector(".box-3d");
    if (!box) return;

    const masks = box.querySelectorAll(".mask");

    masks.forEach((mask: Element, index: number) => {
      gsap.set(mask, {
        clipPath: hiddenClipPaths[index % 36], // Use modulo for multiple faces
      });
    });

    let t1 = gsap.timeline();

    randomOrder.forEach((group, groupIndex) => {
      const maskElements = group.flatMap((cls) => {
        // Select masks from all faces
        return Array.from(box.querySelectorAll(cls));
      });

      t1.to(maskElements, {
        clipPath: (i, el) => {
          const allMasks = Array.from(masks);
          const maskIndex = allMasks.indexOf(el) % 36;
          return visibleClipPaths[maskIndex];
        },
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out",
        stagger: 0.05,
      },
      groupIndex * 0.125
      );
    });
  }, [shouldAnimate]);

  // Helper function to create masks for a face
  const createMasks = (facePrefix: string) => {
    return [...Array(36)].map((_, j) => (
      <div 
        key={`${facePrefix}-${j}`}
        className={`mask mask${j}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(12px)',
          background: 'rgba(107, 114, 128, 0.12)',
          border: '1px solid rgba(156, 163, 175, 0.5)',
          pointerEvents: 'none'
        }}
      />
    ));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e' }}>
      <button 
        onClick={() => setRotation(rotation + 90)}
        style={{ 
          padding: '12px 24px', 
          marginBottom: '30px', 
          background: '#4a5568', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Rotate Book Club
      </button>
      
      <div style={{ width: '400px', height: '600px', perspective: '1200px' }}>
        <div className="box-3d" style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative', 
          transformStyle: 'preserve-3d',
          transform: `rotateX(-20deg) rotateY(${rotation}deg)`,
          transition: 'transform 2s'
        }}>
          
          {/* FRONT FACE */}
          <div style={{ 
            position: 'absolute', 
            width: '400px', 
            height: '600px', 
            transform: 'rotateY(0deg) translateZ(50px)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              FRONT
            </div>
            {createMasks('front')}
          </div>
          
          {/* BACK FACE */}
          <div style={{ 
            position: 'absolute', 
            width: '400px', 
            height: '600px', 
            transform: 'rotateY(180deg) translateZ(50px)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              BACK
            </div>
            {createMasks('back')}
          </div>
          
          {/* RIGHT FACE */}
          <div style={{ 
            position: 'absolute', 
            width: '100px', 
            height: '600px', 
            left: '150px',
            transform: 'rotateY(90deg) translateZ(200px)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              writingMode: 'vertical-rl'
            }}>
              RIGHT
            </div>
            {createMasks('right')}
          </div>
          
          {/* LEFT FACE */}
          <div style={{ 
            position: 'absolute', 
            width: '100px', 
            height: '600px', 
            left: '150px',
            transform: 'rotateY(-90deg) translateZ(200px)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              writingMode: 'vertical-rl'
            }}>
              LEFT
            </div>
            {createMasks('left')}
          </div>
          
          {/* TOP FACE */}
          <div style={{ 
            position: 'absolute', 
            width: '400px', 
            height: '100px', 
            top: '250px',
            transform: 'rotateX(90deg) translateZ(300px)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              TOP
            </div>
            {createMasks('top')}
          </div>
          
          {/* BOTTOM FACE */}
          <div style={{ 
            position: 'absolute', 
            width: '400px', 
            height: '100px', 
            top: '250px',
            transform: 'rotateX(-90deg) translateZ(300px)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              BOTTOM
            </div>
            {createMasks('bottom')}
          </div>
          
        </div>
      </div>
    </div>
  );
}