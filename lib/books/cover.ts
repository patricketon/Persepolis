// Open Library `-L` covers are considered Persepolis-safe textures.
// Assumptions:
// - Sufficient resolution for 3D display
// - Portrait aspect ratio
// - Used directly as textures (no resizing yet)
// - Missing covers fall back to text in 3D


// lib/books/cover.ts
export function getCoverUrl(coverId?: number) {
  if (!coverId || coverId <= 0) return null
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
}
