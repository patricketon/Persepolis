import * as THREE from 'three';

const textureCache = new Map<string, THREE.Texture>();

export function getCachedTexture(
  url: string,
  loader: THREE.TextureLoader
): THREE.Texture {
  if (textureCache.has(url)) {
    return textureCache.get(url)!;
  }

  console.log('Loading texture:', url); // 👈 temporary

  const texture = loader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, texture);
  return texture;
}
