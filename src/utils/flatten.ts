import { Book, FlatBook } from "../types/BookTypes";

import { trimText } from "./trimText";

export const flatten = function (books: Book[]): FlatBook[] {
    return books.map(book => ({
      id: book.id,
      title: trimText(book.volumeInfo.title),
      description: book.volumeInfo.description,
      authors: trimText(book.volumeInfo.authors?.join(', ')),
      categories: trimText(book.volumeInfo.categories?.join(', ')),
      averageRating: book.volumeInfo.averageRating,
      kind: book.kind.replace("books#", ""),
    }));
  };