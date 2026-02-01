import * as THREE from 'three';
import { RGBELoader } from 'three-stdlib';

const textureLoader = new THREE.TextureLoader();
const rgbeLoader = new RGBELoader();

// Cache for water assets
let waterAssetsLoaded = false;
let waterAssetsPromise: Promise<WaterAssets> | null = null;

export interface WaterAssets {
  dudv: THREE.Texture;
  base: THREE.Texture;
  env: THREE.DataTexture;
}

/**
 * Preload all water shader textures
 * Returns cached promise if already loading/loaded
 */
export function preloadWaterAssets(): Promise<WaterAssets> {
  // Return existing promise if already started
  if (waterAssetsPromise) {
    return waterAssetsPromise;
  }

  waterAssetsPromise = new Promise(async (resolve, reject) => {
    try {
      const [dudv, base, env] = await Promise.all([
        loadTexture('/waterAssets/fftDudv.png'),
        loadTexture('/waterAssets/ground.jpg'),
        loadHDR('/waterAssets/env.hdr'),
      ]);

      // Configure textures
      dudv.wrapS = dudv.wrapT = THREE.RepeatWrapping;
      base.wrapS = base.wrapT = THREE.RepeatWrapping;
      env.mapping = THREE.EquirectangularReflectionMapping;

      waterAssetsLoaded = true;

      resolve({ dudv, base, env });
    } catch (error) {
      console.error('Failed to preload water assets:', error);
      reject(error);
    }
  });

  return waterAssetsPromise;
}

/**
 * Check if water assets are already loaded
 */
export function areWaterAssetsLoaded(): boolean {
  return waterAssetsLoaded;
}

/**
 * Get cached water assets (throws if not loaded)
 */
export async function getWaterAssets(): Promise<WaterAssets> {
  if (!waterAssetsPromise) {
    return preloadWaterAssets();
  }
  return waterAssetsPromise;
}

// Helper: load a regular texture
function loadTexture(url: string): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    textureLoader.load(url, resolve, undefined, reject);
  });
}

// Helper: load an HDR texture
function loadHDR(url: string): Promise<THREE.DataTexture> {
  return new Promise((resolve, reject) => {
    rgbeLoader.load(url, resolve, undefined, reject);
  });
}