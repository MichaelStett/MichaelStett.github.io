export type BookDetails = {
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