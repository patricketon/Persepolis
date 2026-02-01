export interface Book {
    id: string;
    volumeId?: string;
    editionId?: string;
    title: string;
    author: string;
    genre?: string;
    year?: number;
    imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
    }
}

