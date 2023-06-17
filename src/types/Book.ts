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

export type FlatBook = {
    id: string;
    title: string;
    description: string;
    authors: string;
    categories: string;
    averageRating: number;
    kind: string;
}

export type BreadcrumbProps = {
    breadcrumbList: BreadcrumbProp[];
}

export type BreadcrumbProp = {
    breadcrumb: { name: string, path: string};
}
