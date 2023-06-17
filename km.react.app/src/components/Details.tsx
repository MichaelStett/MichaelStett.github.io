import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import axios from "axios";
import { BookDetails } from "../types/BookDetails";

type DetailParams = {
  itemId: string;
};

const DetailsPage: React.FC = () => {
  const { itemId } = useParams<DetailParams>();

  const [book, setBook] = useState<BookDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://www.googleapis.com/books/v1/volumes/${itemId}`);
      setBook(result.data);
    };

    fetchData();
  }, [itemId]);

  const onBack = () => {
    navigate(-1);
  };

  return book ? (
    <>
      {/* <Breadcrumb breadcrumbList={[{ name: 'Home', path: '/' }, { name: 'Table', path: '/table' }, { name: `${itemId}`, path: `/table/${itemId}` }]} /> */}

      <div>
        <button onClick={onBack}>Back</button>
        <h2>{book.volumeInfo.title}</h2>
        <h3>{book.volumeInfo.authors.join(', ')}</h3>
        <h3>Kind: {book.kind?.replace("books#", "")}</h3>
        {/* cleanup html tags in text */}
        <p>{book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "")}</p>
      </div>
    </>

  ) : (
    <>
      {/* <Breadcrumb breadcrumbList={[{ name: 'Home', path: '/' }, { name: 'Table', path: '/table' }, { name: `${itemId}`, path: `/table/${itemId}` }]} /> */}

      <div>Loading...</div>
    </>
  );
};

export default DetailsPage;
