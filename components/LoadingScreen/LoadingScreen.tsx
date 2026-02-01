// 'use client';

// import { useEffect, useState } from 'react';
// import styles from './LoadingScreen.module.css';

// interface LoadingScreenProps {
//   isLoading: boolean;
//   minDuration?: number; // minimum ms to show loading screen
// }

// export default function LoadingScreen({ 
//   isLoading, 
//   minDuration = 3000 
// }: LoadingScreenProps) {
//   const [visible, setVisible] = useState(true);
//   const [fadeOut, setFadeOut] = useState(false);
//   const [minTimeElapsed, setMinTimeElapsed] = useState(false);

//   // Track minimum duration
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setMinTimeElapsed(true);
//     }, minDuration);

//     return () => clearTimeout(timer);
//   }, [minDuration]);

//   // Fade out when both conditions met
//   useEffect(() => {
//     if (!isLoading && minTimeElapsed) {
//       setFadeOut(true);
//       // Remove from DOM after fade completes
//       const timer = setTimeout(() => {
//         setVisible(false);
//       }, 800); // match CSS transition duration
//       return () => clearTimeout(timer);
//     }
//   }, [isLoading, minTimeElapsed]);

//   if (!visible) return null;

//   return (
//     <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
//       <div className={styles.content}>
//         {/* Glow layers for bloom effect */}
//         <div className={styles.glowOuter} aria-hidden="true">
//           Loading
//         </div>
//         <div className={styles.glowMiddle} aria-hidden="true">
//           Loading
//         </div>
//         <div className={styles.glowInner} aria-hidden="true">
//           Loading
//         </div>
        
//         {/* Main logo text */}
//         <h1 className={styles.logo}>arriving</h1>
        
//         {/* Subtle loading indicator */}
//         <div className={styles.loadingBar}>
//           <div className={styles.loadingProgress} />
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  isLoading: boolean;
  minDuration?: number;
  onComplete?: () => void;
}

export default function LoadingScreen({ 
  isLoading, 
  minDuration = 3000,
  onComplete
}: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Track minimum duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  // Fade out when both conditions met
  useEffect(() => {
    if (!isLoading && minTimeElapsed) {
      setFadeOut(true);
      // Remove from DOM after fade completes, then call onComplete
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 800); // match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isLoading, minTimeElapsed, onComplete]);

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        {/* Glow layers for bloom effect */}
        <div className={styles.glowOuter} aria-hidden="true">
          Arriving
        </div>
        <div className={styles.glowMiddle} aria-hidden="true">
          Arriving
        </div>
        <div className={styles.glowInner} aria-hidden="true">
          Arriving
        </div>
        
        {/* Main logo text */}
        <h1 className={styles.logo}>arriving</h1>
        
        {/* Subtle loading indicator */}
        <div className={styles.loadingBar}>
          <div className={styles.loadingProgress} />
        </div>
      </div>
    </div>
  );
}