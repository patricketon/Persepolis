import * as THREE from 'three';
import { waterVertexShader } from './vertex';
import { waterFragmentShader } from './fragment';

export const waterUniforms = {
  iTime: { value: 0 },
  iChannel0: { value: null as THREE.Texture | null },
  iChannel1: { value: null as THREE.Texture | null },
  iChannel2: { value: null as THREE.Texture | null },
  inverseViewMatrix: { value: new THREE.Matrix4() },
};

export { waterVertexShader, waterFragmentShader };
