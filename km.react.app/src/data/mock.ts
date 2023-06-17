import { FlatBook } from "../types/Book";

export const MockedData : Array<FlatBook> = [
    {
        id: '1',
        kind: 'volume',
        volumeInfo: {
          authors: [ 'A1', "B1", "C1" ],
          title: 'Test Book 1',
          categories: [ "Category 1" ],
          averageRating: 4.5
        }
      },
      {
        id: '2',
        kind: 'volume',
        volumeInfo: {
          authors: [ 'A1', "B1", "C1" ],
          title: 'Test Book 2',
          categories: [ "Category 2" ],
          averageRating: 3.5
        }
      },
      {
        id: '3',
        kind: 'volume',
        volumeInfo: {
          authors: [ 'A1', "B1", "C1" ],
          title: 'Test Book 3',
          categories: [ "Category 3" ],
          averageRating: 3.5
        }
      },
].map(book => ({
    id: book.id,
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors.join(', '),
    categories: book.volumeInfo.categories.join(', '),
    averageRating: book.volumeInfo.averageRating,
    kind: book.kind,
}));