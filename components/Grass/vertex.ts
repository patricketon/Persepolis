export const vertexShader = /* glsl */`

precision mediump float;
precision mediump int;

uniform float uTime;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute float vertexIndex;

varying float vInstanceHash;
varying float vHeight;
varying float vSideX;
varying vec3 vNormal;

vec3 bezier3D(vec3 p0, vec3 p1, vec3 p2, float t) {
    float u = 1.0 - t;
    float tt = t * t;
    float uu = u * u;
    vec3 p = uu * p0;
    p += 2.0 * u * t * p1;
    p += tt * p2;
    return p;
}

vec3 bezierGradient(vec3 p0, vec3 p1, vec3 p2, float t) {
  float u = 1.0 - t;
  return 2.0 * u * (p1 - p0) + 2.0 * t * (p2-p1);
}

vec2 random2(vec2 st){
  float d1 = dot(st, vec2(12.3, 32.1));
  float d2 = dot(st, vec2(45.6, 65.4));
  
  st = vec2(d1, d2);
  return fract(sin(st) * 78.9) * 2.0 - 1.0;
}

float random(float x) {
  float r = fract(sin(x * 12.34) * 1234.5678);
  return r * 2.0 - 1.0;
}

mat3 rotationYMatrix(float angle) {
    float cosAngle = cos(angle);
    float sinAngle = sin(angle);
    return mat3(
      vec3(cosAngle, 0, -sinAngle),
      vec3(0, 1, 0),
      vec3(sinAngle, 0, cosAngle)
    );
}

mat3 rotationXMatrix(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(
    1.0, 0.0, 0.0,
    0.0,  c,   s,
    0.0, -s,   c
  );
}

void main() {
  int instance = int(vertexIndex) / 40;
  int localIndex = int(vertexIndex) - (instance * 40);

  float instanceHash = random(float(instance));
  float h = float(localIndex / 2) / 9.0;
  float sideX = mod(float(localIndex), 2.0) * 2.0 - 1.0;
  
  vInstanceHash = instanceHash;
  vHeight = h;
  vSideX = sideX;
  
  float bend = sin(uTime + instanceHash * 3.14) * 0.3;

  vec2 worldPos = random2(vec2(float(instance))) * 15.0;
  
  mat3 rotateY = rotationYMatrix(instanceHash * 3.14);
  float windStrength = sin(worldPos.y * 0.7 + uTime * 0.5) * h;
  mat3 windRot = rotationXMatrix(windStrength);
  
  vec3 curve = bezier3D(
    vec3(0.0, 0.0, 0.0),
    vec3(0.0, 0.5, 0.0),
    vec3(0.0, cos(bend), sin(bend)),
    h
  );

  vec3 grad = bezierGradient(
    vec3(0.0, 0.0, 0.0),
    vec3(0.0, 0.5, 0.0),
    vec3(0.0, cos(bend), sin(bend)),
    h
  );

  vec3 pos = curve;
  pos.x += sideX * mix(0.05, 0.0, h * h);
  pos = windRot * rotateY * pos;
  pos += vec3(worldPos.x, -4.5, worldPos.y);

  vec3 normal = vec3(0.0, grad.z, -grad.y);
  normal = windRot * rotateY * normal;
  vNormal = normalize(normal);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;