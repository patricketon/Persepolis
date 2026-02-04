

// export const vertex = `

// uniform vec2 uResolution;
// uniform float uSize;
// uniform sampler2D uParticlesTexture;


// attribute vec2 aParticlesUv;
// attribute float aSize;

// varying vec3 vColor;


// void main () {

//     vec4 particle = texture(uParticlesTexture, aParticlesUv);

//     vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;
//     gl_Position = projectedPosition;


//     //Point Size variables that alter the point size depending on changing alpha values
//     float sizeIn = smoothstep(0.0, 0.1, particle.a);
//     float sizeOut = 1.0 - smoothstep(0.7, 1.0, particle.a);
//     float size = min(sizeIn, sizeOut);

//     gl_PointSize = uSize * uResolution.y * aSize * size;
//     gl_PointSize *= (1.0 / - viewPosition.z);

//     vColor = vec3(1.0);
// }
// `



// export const vertex = `

// uniform vec2 uResolution;
// uniform sampler2D uParticlesTexture;

// attribute vec2 aParticlesUv;
// attribute float aSize;

// varying vec3 vColor;

// void main () {

//     vec4 particle = texture(uParticlesTexture, aParticlesUv);

//     vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;
//     gl_Position = projectedPosition;

//     // Lifespan fade (keep what you already had)
//     float sizeIn = smoothstep(0.0, 0.1, particle.a);
//     float sizeOut = 1.0 - smoothstep(0.7, 1.0, particle.a);
//     float lifeSize = min(sizeIn, sizeOut);

//     // Size morph: 0.15 → 0.01 as particle.a → 1
//     float baseSize = mix(0.15, 0.01, smoothstep(0.3, 1.0, particle.a));

//     gl_PointSize = baseSize * uResolution.y * aSize * lifeSize;
//     gl_PointSize *= (1.0 / -viewPosition.z);

//     vColor = vec3(1.0);
// }
// `;


// export const vertex = `
// uniform vec2 uResolution;
// uniform float uSizeStart;   // New: replaces uSize
// uniform float uSizeEnd;     // New: replaces uSize
// uniform float uMorphProgress; // New: piped from compute
// uniform sampler2D uParticlesTexture;

// attribute vec2 aParticlesUv;
// attribute float aSize;

// varying vec3 vColor;

// void main () {
//     vec4 particle = texture(uParticlesTexture, aParticlesUv);
//     vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;

//     gl_Position = projectedPosition;

//     // 1. Calculate the base size based on the Morph Progress
//     // We use pow(..., 16.0) to match your camera timing
//     float easedMorph = pow(uMorphProgress, 16.0);
//     float baseSize = mix(uSizeStart, uSizeEnd, easedMorph);

//     // 2. Keep your existing Life Cycle logic (fade in/out)
//     float sizeIn = smoothstep(0.0, 0.1, particle.a);
//     float sizeOut = 1.0 - smoothstep(0.7, 1.0, particle.a);
//     float lifeSize = min(sizeIn, sizeOut);

//     // 3. Combine everything: Morph Size * Life Size * Random Attribute * Screen Res
//     gl_PointSize = baseSize * uResolution.y * aSize * lifeSize;

//     // 4. Perspective attenuation (smaller when further away)
//     gl_PointSize *= (1.0 / - viewPosition.z);

//     vColor = vec3(1.0);
// }
// `;



// export const vertex = `
// uniform vec2 uResolution;
// uniform float uSizeStart;   
// uniform float uSizeEnd;     
// uniform float uMorphProgress; 
// uniform sampler2D uParticlesTexture;

// attribute vec2 aParticlesUv;
// attribute float aSize;

// varying vec3 vColor;

// void main () {
//     vec4 particle = texture(uParticlesTexture, aParticlesUv);
//     vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;

//     gl_Position = projectedPosition;

//     // --- SMOOTH TRANSITION LOGIC ---
//     // We use a nested smoothstep for a silky "S-Curve" transition.
//     // We add a touch of 'aSize' so they don't all shrink at the exact same micro-second.
//     float smoothProgress = smoothstep(0.0, 1.0, uMorphProgress);
//     float easedMorph = smoothstep(0.0, 1.0, smoothProgress);
    
//     // Mix the sizes based on the silky curve
//     float baseSize = mix(uSizeStart, uSizeEnd, easedMorph);

//     // Keep your existing alpha-based breathing/flicker
//     float sizeIn = smoothstep(0.0, 0.1, particle.a);
//     float sizeOut = 1.0 - smoothstep(0.7, 1.0, particle.a);
//     float lifeSize = min(sizeIn, sizeOut);

//     // Final point size calculation
//     gl_PointSize = baseSize * uResolution.y * aSize * lifeSize;
//     gl_PointSize *= (1.0 / - viewPosition.z);

//     vColor = vec3(1.0);
// }
// `;


export const vertex = `
uniform vec2 uResolution;
uniform float uSizeStart;   
uniform float uSizeEnd;     
uniform float uMorphProgress; 
uniform sampler2D uParticlesTexture;

attribute vec2 aParticlesUv;
attribute float aSize;

varying vec3 vColor;

void main () {
    // 1. Get particle data (xyz is position)
    vec4 particle = texture(uParticlesTexture, aParticlesUv);
    
    vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // --- ULTRA-PREMIUM SMOOTHING ---
    
    // A: Create a "Global" curve (Cubic Ease-In-Out)
    float globalEase = smoothstep(0.0, 1.0, uMorphProgress);
    globalEase = smoothstep(0.0, 1.0, globalEase);

    // B: Add "Individual" delay based on particle randomness (aSize)
    // This makes some particles shrink slightly earlier than others
    float individualEase = smoothstep(aSize * 0.2, 1.0, uMorphProgress);
    
    // C: Combine them for a tiered transition
    float finalEase = mix(globalEase, individualEase, 0.5);

    // D: Mix sizes
    float baseSize = mix(uSizeStart, uSizeEnd, finalEase);

    // E: Keep your existing breathing life-cycle
    float sizeIn = smoothstep(0.0, 0.1, particle.a);
    float sizeOut = 1.0 - smoothstep(0.7, 1.0, particle.a);
    float lifeSize = min(sizeIn, sizeOut);

    // Final calculation with perspective
    gl_PointSize = baseSize * uResolution.y * aSize * lifeSize;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = vec3(1.0);
}
`;