// export const waterFragmentShader = /* glsl */ `
// precision mediump float;
// precision mediump int;

// uniform float iTime;
// uniform sampler2D iChannel0;
// // uniform sampler2D iChannel1;
// uniform sampler2D iChannel2;
// uniform mat4 inverseViewMatrix;

// const float PI = 3.14159265359;
// const float refractiveIndex = 1.33;
// const float distortionScale = 0.25;

// varying vec2 vUv;
// varying vec3 vPos;

// vec3 getViewPos() {
//   return (inverseViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
// }

// // vec3 sampleEnvMap(vec3 dir) {
// //   vec3 P = normalize(dir);

// //   float phi = atan(P.x, P.z);
// //   float theta = asin(P.y);

// //   float u = (phi + PI) / (2.0 * PI);
// //   float v = (theta + PI * 0.5) / PI;

// //   return texture2D(iChannel1, vec2(u, v)).rgb;
// // }

// vec2 mirrorRepeat(vec2 coords) {
//   vec2 txy = fract(coords);
//   return mix(txy, 1.0 - txy, step(1.0, mod(coords.xy, 2.0)));
// }

// void main() {
//   vec2 uv = vUv;
//   vec3 viewPos = getViewPos();

//   // DuDv scrolling
//   vec2 scroll = vec2(iTime * 0.02);
//   vec2 dudv = texture2D(iChannel2, fract(uv - scroll)).rg;
//   dudv = dudv * 2.0 - 1.0;

//   // Secondary lookup for complexity
//   vec2 warpedUV = fract(uv - dudv * 0.01 + iTime * 0.05);
//   dudv = texture2D(iChannel2, warpedUV).rg;
//   dudv = dudv * 2.0 - 1.0;

//   dudv *= 0.2;

//   //vec3 normal = normalize(vec3(dudv.x, 1.0, dudv.y));
//   vec3 normal = normalize(mix(vec3(0.0, 1.0, 0.0), vec3(dudv.x, 1.0, dudv.y), 0.55));

//   vec3 incident = normalize(vPos - viewPos);

//   // Reflection
//   // vec3 reflectVec = reflect(incident, normal);
//   // vec3 reflectColor = sampleEnvMap(reflectVec);
//   // reflectColor = mix(reflectColor, vec3(0.6, 0.8, 1.0), 0.15);

//   // Refraction
//   float eta = 1.0 / refractiveIndex;
//   vec3 refractedRay = refract(incident, normal, eta);
//   vec2 offset = refractedRay.xy * distortionScale;

//   vec3 refractColor = texture2D(
//     iChannel0,
//     mirrorRepeat(uv + offset)
//   ).rgb;

//   refractColor *= vec3(1.00, 1.1, 1.2);
  

//   // Fresnel
//   float F0 = 0.02;
//   float F = F0 + (1.0 - F0) * pow(
//     1.0 - max(dot(-incident, normal), 0.0),
//     3.0
//   );

//   //gl_FragColor = vec4(mix(refractColor, reflectColor, F), 1.0);
//   float depth = clamp(length(dudv) * 2.5, 0.0, 1.0);
//   vec3 waterTint = vec3(0.45, 0.70, 1.25); // much bluer
//   refractColor = mix(refractColor, refractColor * waterTint, depth);



//   gl_FragColor = vec4(refractColor, 1.0);

// }

// `;


export const waterFragmentShader = /* glsl */ `
precision mediump float;
precision mediump int;

uniform float iTime;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform mat4 inverseViewMatrix;

const float PI = 3.14159265359;
const float refractiveIndex = 1.33;
const float distortionScale = 0.25;

varying vec2 vUv;
varying vec3 vPos;

vec3 getViewPos() {
  return (inverseViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
}

vec3 sampleEnvMap(vec3 dir) {
  vec3 P = normalize(dir);

  float phi = atan(P.x, P.z);
  float theta = asin(P.y);

  float u = (phi + PI) / (2.0 * PI);
  float v = (theta + PI * 0.5) / PI;

  return texture2D(iChannel1, vec2(u, v)).rgb;
}

vec2 mirrorRepeat(vec2 coords) {
  vec2 txy = fract(coords);
  return mix(txy, 1.0 - txy, step(1.0, mod(coords.xy, 2.0)));
}

void main() {
  vec2 uv = vUv;
  vec3 viewPos = getViewPos();

  // DuDv scrolling
  vec2 scroll = vec2(iTime * 0.02);
  vec2 dudv = texture2D(iChannel2, fract(uv - scroll)).rg;
  dudv = dudv * 2.0 - 1.0;

  // Secondary lookup for complexity
  vec2 warpedUV = fract(uv - dudv * 0.01 + iTime * 0.05);
  dudv = texture2D(iChannel2, warpedUV).rg;
  dudv = dudv * 2.0 - 1.0;

  dudv *= 0.2;

  vec3 normal = normalize(vec3(dudv.x, 1.0, dudv.y));
  vec3 incident = normalize(viewPos - vPos);

  // Reflection
  vec3 reflectVec = reflect(incident, normal);
  vec3 reflectColor = sampleEnvMap(reflectVec);
  reflectColor = mix(reflectColor, vec3(0.6, 0.8, 1.0), 0.25);



  // Refraction
  float eta = 1.0 / refractiveIndex;
  vec3 refractedRay = refract(incident, normal, eta);
  vec2 offset = refractedRay.xy * distortionScale;

  vec3 refractColor = texture2D(
    iChannel0,
    mirrorRepeat(uv + offset)
  ).rgb;

  refractColor *= vec3(0.6, 0.8, 1.0);

  // Fresnel
  float F0 = 0.02;
  float F = F0 + (1.0 - F0) * pow(
    1.0 - max(dot(-incident, normal), 0.0),
    1.0
  );


  gl_FragColor = vec4(mix(refractColor, reflectColor, F * 0.75), 1.0);

}



`;
