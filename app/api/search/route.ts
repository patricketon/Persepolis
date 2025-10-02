// // import { NextRequest } from 'next/server';

// // const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

// // export async function GET(request: NextRequest) {
// //   const { searchParams } = new URL(request.url);
// //   const query = searchParams.get('q');
  
// //   if (!query) {
// //     return Response.json({ error: 'Query required' }, { status: 400 });
// //   }

// //   try {
// //     const response = await fetch(`${GOOGLE_BOOKS_API}?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
    
// //     if (!response.ok) {
// //       throw new Error('API request failed');
// //     }
    
// //     const data = await response.json();
// //     const books = data.items?.map((item: any) => ({
// //       id: item.id,
// //       title: item.volumeInfo.title,
// //       authors: item.volumeInfo.authors || ['Unknown'],
// //       publishedDate: item.volumeInfo.publishedDate,
// //       imageLinks: item.volumeInfo.imageLinks,
// //       description: item.volumeInfo.description
// //     })) || [];
    
// //     return Response.json(books);
// //   } catch (error) {
// //     return Response.json({ error: 'Search failed' }, { status: 500 });
// //   }
// // }

// // app/api/search/route.ts
// import { NextRequest } from 'next/server';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get('q');
  
//   if (!query) {
//     return Response.json({ error: 'Query parameter required' }, { status: 400 });
//   }

//   console.log('API route called with query:', query);
//   console.log('API Key exists:', !!process.env.GOOGLE_BOOKS_API_KEY);

//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
//     );
    
//     if (!response.ok) {
//       throw new Error(`Google Books API error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return Response.json(data);
//   } catch (error) {
//     console.error('API Error:', error);
//     return Response.json({ error: 'Failed to fetch books' }, { status: 500 });
//   }
// }

// lib/googleBooks.ts

// app/api/search/route.ts
// import { NextRequest } from 'next/server';

// export async function GET(request: NextRequest) {

//  console.log('API route called!');
//   console.log('API Key present:', !!process.env.GOOGLE_BOOKS_API_KEY);
  
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get('q');
  
//   console.log('Query received:', query);
// //   const { searchParams } = new URL(request.url);
// //   const query = searchParams.get('q');
  
//   if (!query) {
//     return Response.json({ error: 'Query parameter required' }, { status: 400 });
//   }

//   console.log('API route called with query:', query);

//   // For now, return mock data to test the route works
//   const mockResponse = {
//     items: [
//       {
//         id: 'test1',
//         volumeInfo: {
//           title: `Results for "${query}"`,
//           authors: ['Test Author'],
//           publishedDate: '2024',
//           description: 'This is a test result from your API route'
//         }
//       }
//     ]
//   };

//   return Response.json(mockResponse);
// }

// app/api/search/route.ts
// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get('q');
     
//   if (!query) {
//     return Response.json({ error: 'Query parameter required' }, { status: 400 });
//   }

//   console.log('API route called with query:', query);

//   // Return multiple mock books for carousel testing
//   const mockResponse = {
//     items: [
//       {
//         id: 'test1',
//         volumeInfo: {
//           title: `The Great Gatsby`,
//           authors: ['F. Scott Fitzgerald'],
//           publishedDate: '1925',
//           description: 'A classic American novel'
//         }
//       },
//       {
//         id: 'test2', 
//         volumeInfo: {
//           title: `To Kill a Mockingbird`,
//           authors: ['Harper Lee'],
//           publishedDate: '1960',
//           description: 'A coming-of-age story'
//         }
//       },
//       {
//         id: 'test3',
//         volumeInfo: {
//           title: `1984`,
//           authors: ['George Orwell'], 
//           publishedDate: '1949',
//           description: 'A dystopian novel'
//         }
//       }
//       // Add more books as needed for carousel testing
//     ]
//   };

//   return Response.json(mockResponse);
// }

// import { NextRequest } from 'next/server';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get('q');
  
//   if (!query) {
//     return Response.json({ error: 'Query parameter required' }, { status: 400 });
//   }

//   console.log('🔍 API route called with query:', query);

//   // Return multiple mock books for carousel testing
//   const mockResponse = {
//     items: [
//       {
//         id: 'test1',
//         volumeInfo: {
//           title: `The Great Gatsby`,
//           authors: ['F. Scott Fitzgerald'],
//           categories: ['Fiction', 'Classic'],
//           publishedDate: '1925',
//           description: 'A classic American novel'
//         }
//       },
//       {
//         id: 'test2',
//         volumeInfo: {
//           title: `To Kill a Mockingbird`,
//           authors: ['Harper Lee'],
//           categories: ['Fiction', 'Coming of Age'],
//           publishedDate: '1960',
//           description: 'A coming-of-age story'
//         }
//       },
//       {
//         id: 'test3',
//         volumeInfo: {
//           title: `1984`,
//           authors: ['George Orwell'],
//           categories: ['Fiction', 'Dystopian'],
//           publishedDate: '1949',
//           description: 'A dystopian novel'
//         }
//       },
//       {
//         id: 'test4',
//         volumeInfo: {
//           title: `Pride and Prejudice`,
//           authors: ['Jane Austen'],
//           categories: ['Fiction', 'Romance'],
//           publishedDate: '1813',
//           description: 'A romantic novel'
//         }
//       },
//       {
//         id: 'test5',
//         volumeInfo: {
//           title: `The Catcher in the Rye`,
//           authors: ['J.D. Salinger'],
//           categories: ['Fiction', 'Coming of Age'],
//           publishedDate: '1951',
//           description: 'A coming-of-age story'
//         }
//       }
//     ]
//   };

//   console.log('📚 Returning mock data with', mockResponse.items.length, 'books');
//   return Response.json(mockResponse);
// }

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return Response.json({ error: 'Query parameter required' }, { status: 400 });
  }

  console.log('🔍 API route called with query:', query);
  console.log('🔍 API route called with query:', query);
console.log('🔑 API Key loaded:', process.env.GOOGLE_BOOKS_API_KEY ? 'YES' : 'NO');
console.log('🔑 API Key first 10 chars:', process.env.GOOGLE_BOOKS_API_KEY?.substring(0, 10));

  try {
    // Call Google Books API
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📚 Google Books returned', data.items?.length || 0, 'results');
    
    return Response.json(data);
  } catch (error) {
    console.error('❌ Google Books API failed:', error);
    
    // Fallback to mock data if API fails
    const mockResponse = {
      items: [
        {
          id: 'fallback1',
          volumeInfo: {
            title: `No results found for "${query}"`,
            authors: ['Try a different search'],
            categories: ['Search', 'Error'],
            publishedDate: '2024',
            description: 'API temporarily unavailable'
          }
        }
      ]
    };
    
    return Response.json(mockResponse);
  }
}