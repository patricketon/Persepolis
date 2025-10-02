// // lib/googleBooks.ts
// const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

// export interface Book {
//   id: string;
//   title: string;
//   authors: string[]; // Note: changed from 'author' to match API response
//   publishedDate: string;
//   imageLinks?: {
//     thumbnail?: string;
//     smallThumbnail?: string;
//   };
//   description?: string;
// }

// export async function searchBooks(query: string): Promise<Book[]> {
//   if (!query) return [];
  
//   // For development, you can temporarily use this without API key:
//   console.log('Searching for:', query);
  
//   try {
//     // Use your API route instead of direct API call
//     const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    
//     if (!response.ok) {
//       throw new Error(`Search failed: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     return data.items?.map((item: any) => ({
//       id: item.id,
//       title: item.volumeInfo.title,
//       authors: item.volumeInfo.authors || ['Unknown'],
//       publishedDate: item.volumeInfo.publishedDate,
//       imageLinks: item.volumeInfo.imageLinks,
//       description: item.volumeInfo.description
//     })) || [];
//   } catch (error) {
//     console.error('Search failed:', error);
//     // Fallback to mock data during development
//     return mockBooks.filter(book =>
//       book.title.toLowerCase().includes(query.toLowerCase()) ||
//       book.authors[0]?.toLowerCase().includes(query.toLowerCase())
//     );
//   }
// }

// // Mock data for development fallback
// export const mockBooks: Book[] = [
//   { 
//     id: '1', 
//     title: 'The Great Gatsby', 
//     authors: ['F. Scott Fitzgerald'], 
//     publishedDate: '1925',
//     description: 'A classic American novel'
//   },
//   { 
//     id: '2', 
//     title: '1984', 
//     authors: ['George Orwell'], 
//     publishedDate: '1949',
//     description: 'A dystopian social science fiction novel'
//   },
//   // Add more mock books as needed...
// ];

// export async function searchBooks(query: string): Promise<Book[]> {
//   if (!query) return [];
     
//   console.log('Searching for:', query);
//   console.log('About to fetch:', `/api/search?q=${encodeURIComponent(query)}`);
     
//   try {
//     console.log('Making fetch request...');
//     const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//     console.log('Fetch completed, response:', response);
         
//     if (!response.ok) {
//       throw new Error(`Search failed: ${response.status}`);
//     }
         
//     const data = await response.json();
//     console.log('Raw API response:', data);
         
//   return data.items?.map((item: any) => ({
//   id: item.id,
//   title: item.volumeInfo.title,
//   author: item.volumeInfo.authors?.[0] || 'Unknown',
//   genre: item.volumeInfo.categories?.[0] || 'Unknown', 
//   year: item.volumeInfo.publishedDate ? parseInt(item.volumeInfo.publishedDate.substring(0, 4)) : 0,
// })) || [];
//   } catch (error) {
//     console.error('Search failed:', error);
//     throw error; // Remove the fallback, let the error bubble up
//   }
// }

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
    })) || [];
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
}