export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    year: number;
}

export const mockBooks: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925 },
  { id: '2', title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 },
  { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', year: 1960 },
  { id: '4', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925 },
  { id: '5', title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 },
  { id: '6', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', year: 1960 },
  { id: '7', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925 },
  { id: '8', title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 },
  { id: '9', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', year: 1960 },
  { id: '10', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925 },
  { id: '11', title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 },
  { id: '12', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', year: 1960 },
  {id: '13', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925 },
  { id: '14', title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 },
  { id: '15', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', year: 1960 },
];


export function searchBooks(query: string): Book[] {
    if(!query) return [];  //return nothing if given no query

    return mockBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase())
    );

}