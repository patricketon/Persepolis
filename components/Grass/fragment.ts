export const fragmentShader = /* glsl */`
precision mediump float;
precision mediump int;

varying float vHeight;
varying vec3 vNormal;

void main() {
  vec3 baseColor = mix(
    vec3(0.50, 0.62, 0.28),
    vec3(0.69, 0.89, 0.42),
    clamp(vHeight, 0.0, 1.0)
  );

  vec3 lightDirection = normalize(vec3(0.2, 1.0, 0.5));

  float ambientStrength = 0.75;
  vec3 ambientLight = ambientStrength * baseColor;

  vec3 normal = normalize(vNormal);
  float diffuseStrength = max(dot(normal, lightDirection), 0.0) * 0.6;
  vec3 diffuseLight = diffuseStrength * baseColor;

  vec3 finalColor = ambientLight + diffuseLight;

  finalColor = pow(finalColor, vec3(0.95));

  float edge = smoothstep(0.2, 0.9, vHeight);
  finalColor *= mix(0.95, 1.05, edge);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;