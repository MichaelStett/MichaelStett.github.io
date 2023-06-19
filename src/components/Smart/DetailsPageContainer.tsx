import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import DetailsPagePresentation from "../Dumb/DetailsPagePresentation";
import { BookDetails } from "../../types/BookTypes";

export type DetailParams = { itemId: string; search : string };

const DetailsPageContainer: React.FC = () => {
  const { itemId, search } = useParams<DetailParams>();
  const navigate = useNavigate()
  const { data: book, error, loading } = useFetchData<BookDetails>(`https://www.googleapis.com/books/v1/volumes/${itemId}`);
  
  const { breadcrumbs, addBreadcrumbs } = useBreadcrumbs([
    { breadcrumb: { name: 'Home', path: '/' } },
    { breadcrumb: { name: 'Table', path: `/table/${search}` }}
  ]);

  useEffect(() => {
    if (book) {
      addBreadcrumbs([
        { breadcrumb: { name: `${book.volumeInfo.title}`, path: `` } },
        { breadcrumb: { name: `Details`, path: `` } }
      ]);
    }
  }, [loading]);

  return (
    <DetailsPagePresentation 
      book={book}
      loading={loading}
      error={error}
      breadcrumbs={breadcrumbs}
      navigate={navigate}
    />
  );
};

export default DetailsPageContainer;
