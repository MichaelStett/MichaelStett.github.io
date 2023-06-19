export type Books = {
    items: Book[];
}

export type Book = {
    id: string;
    volumeInfo: {
        authors: string[];
        title: string;
        description: string;
        categories: string[];
        averageRating: number;
    };
    kind: string;
}

export type BookDetails = {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        categories: string[];
        averageRating: number;
        pageCount: number;
    };
    kind: string;
};

export type FlatBook = {
    id: string;
    title: string;
    description: string;
    authors: string;
    categories: string;
    averageRating: number;
    kind: string;
}