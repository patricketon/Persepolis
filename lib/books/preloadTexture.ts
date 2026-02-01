import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const loadedTextures = new Map<string, THREE.Texture>();

/**
 * Preload a single texture and cache it
 */
function loadTexture(url: string): Promise<THREE.Texture> {
  // Return cached texture immediately
  if (loadedTextures.has(url)) {
    return Promise.resolve(loadedTextures.get(url)!);
  }

  return new Promise((resolve, reject) => {
    textureLoader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        loadedTextures.set(url, texture);
        resolve(texture);
      },
      undefined,
      (error) => {
        console.warn(`Failed to load texture: ${url}`, error);
        // Resolve anyway - don't block loading for missing covers
        resolve(null as any);
      }
    );
  });
}

/**
 * Preload all book cover textures
 * Returns a promise that resolves when all textures are loaded (or failed gracefully)
 */
export async function preloadBookTextures(
  books: Array<{ imageLinks?: { thumbnail?: string } }>
): Promise<void> {
  const urls = books
    .map((book) => book.imageLinks?.thumbnail)
    .filter((url): url is string => Boolean(url));

  if (urls.length === 0) return;

  await Promise.all(urls.map(loadTexture));
}

/**
 * Get a preloaded texture from cache
 */
export function getPreloadedTexture(url: string): THREE.Texture | null {
  return loadedTextures.get(url) || null;
}

/**
 * Check if a texture is already cached
 */
export function isTextureCached(url: string): boolean {
  return loadedTextures.has(url);
}