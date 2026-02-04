// Open Library `-L` covers are considered Persepolis-safe textures.
// Assumptions:
// - Sufficient resolution for 3D display
// - Portrait aspect ratio
// - Used directly as textures (no resizing yet)
// - Missing covers fall back to text in 3D


// // lib/books/cover.ts
// export function getCoverUrl(coverId?: number) {
//   if (!coverId || coverId <= 0) return null
//   return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
// }


// lib/books/cover.ts

/**
 * Get cover URL from Open Library
 * @param coverId - The cover ID from Open Library
 * @param size - 'S' | 'M' | 'L' (default: 'L')
 */
export function getCoverUrl(
  coverId?: number,
  size: 'S' | 'M' | 'L' = 'L'
) {
  if (!coverId || coverId <= 0) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
