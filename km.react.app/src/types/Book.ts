export interface Book {
    id: string;
    volumeInfo: {
        authors: string[];
        title: string;
        categories: string[];
        averageRating: number;
    };
    kind: string;
}