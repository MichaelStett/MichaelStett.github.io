import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import axios from "axios";
import { BookDetails } from "../types/BookDetails";

type DetailParams = {
  itemId: string;
  search: string;
};

const DetailsPage: React.FC = () => {
  const { itemId, search } = useParams<DetailParams>();
  const [book, setBook] = useState<BookDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://www.googleapis.com/books/v1/volumes/${itemId}`);
      setBook(result.data);
    };

    fetchData();
  }, [itemId]);

  return book ? (
    <>
      <Breadcrumb breadcrumbList={[
        { breadcrumb: { name: 'Home', path: '/' } },
        { breadcrumb: { name: 'Table', path: `/table/${search}` } },
        { breadcrumb: { name: `${book.volumeInfo.title}`, path: `` } },
        { breadcrumb: { name: `Details`, path: `/table/${search}/${itemId}/Details` } }
      ]} />

      <div>
        <h2>{book.volumeInfo.title}</h2>
        <h3>{book.volumeInfo.authors.join(', ')}</h3>
        <h3>Kind: {book.kind?.replace("books#", "")}</h3>
        {/* cleanup html tags in text */}
        <p>{book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "")}</p>
      </div>
    </>
  ) : <></>
};

export default DetailsPage;
