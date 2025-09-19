export const backgroundVertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export const backgroundFragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 v_uv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;
    for(int i = 0; i < 6; i++) {
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
    uv = uv * 2.0 - 1.0;
    uv *= aspect;
    float mouseInfluence = length(uv - (u_mouse * 2.0 - 1.0) * aspect);
    mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseInfluence);
    vec2 motion = vec2(u_time * 0.1);
    float f1 = fbm(uv * 3.0 + motion);
    float f2 = fbm(uv * 2.0 - motion + f1);
    float f3 = fbm(uv * 4.0 + f2 + motion * 0.5);
    vec3 color1 = vec3(0.7, 0.7, 0.7);
    vec3 color2 = vec3(0.7, 0.6, 0.4);
    vec3 color3 = vec3(0.7, 0.6, 0.6);
    f3 += mouseInfluence * 0.5;
    vec3 finalColor = mix(color1, color2, f1);
    finalColor = mix(finalColor, color3, f2);
    finalColor += f3 * 0.3;
    gl_FragColor = vec4(finalColor, 1.0);
}
`;