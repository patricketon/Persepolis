

// THIS CODE IS LEGACY AND SHOULD BE DELETED

// Import the Book interface from BookCard
import { Book } from '@/components/BookCard';

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query) return [];
  
  console.log('Searching for:', query);
  console.log('About to fetch:', `/api/search?q=${encodeURIComponent(query)}`);
  
  try {
    console.log('Making fetch request...');
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    console.log('Fetch completed, response:', response);
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    return data.items?.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.[0] || 'Unknown',
      genre: item.volumeInfo.categories?.[0] || 'Unknown',
      year: item.volumeInfo.publishedDate ? parseInt(item.volumeInfo.publishedDate.substring(0, 4)) : 0,
      imageLinks: item.volumeInfo.imageLinks ? {
        // Proxy the thumbnail through our API
        thumbnail: `/api/book-cover?url=${encodeURIComponent(item.volumeInfo.imageLinks.thumbnail)}`,
        smallThumbnail: item.volumeInfo.imageLinks.smallThumbnail
          ? `/api/book-cover?url=${encodeURIComponent(item.volumeInfo.imageLinks.smallThumbnail)}`
          : undefined,
      } : undefined,
    })) || [];
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
}