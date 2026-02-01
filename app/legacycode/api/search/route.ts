// import { NextRequest } from 'next/server';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get('q');
  
//   if (!query) {
//     return Response.json({ error: 'Query parameter required' }, { status: 400 });
//   }

//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=25&key=${process.env.GOOGLE_BOOKS_API_KEY}`
//     );
    
//     if (!response.ok) {
//       return Response.json(
//         { error: `Google Books API error: ${response.status}` }, 
//         { status: response.status }
//       );
//     }
    
//     const data = await response.json();
//     return Response.json(data);
    
//   } catch (error) {
//     console.error('Google Books API failed:', error);
//     return Response.json(
//       { error: 'Failed to fetch books. Please try again.' }, 
//       { status: 500 }
//     );
//   }
// }

// app/api/search/route.ts updated to use Open Library rather than Google Books
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return Response.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=25`
    );

    if (!response.ok) {
      throw new Error(`Open Library error: ${response.status}`);
    }

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error('Open Library API failed:', error);
    return Response.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
