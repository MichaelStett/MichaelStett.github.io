import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import axios from "axios";
import { BookDetails } from "../types/BookDetails";
import StarRatings from 'react-star-ratings';

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
      <div className='sticky w-full min-h-screen h-full bg-gradient-to-r from-[#8ECAE6] to-[#219EBC] px-4 py-4 prevent-text-selection'>

        <Breadcrumb breadcrumbList={[
          { breadcrumb: { name: 'Home', path: '/' } },
          { breadcrumb: { name: 'Table', path: `/table/${search}` } },
          { breadcrumb: { name: `${book.volumeInfo.title}`, path: `` } },
          { breadcrumb: { name: `Details`, path: `` } }
        ]} />


<div className="mt-10 mx-auto p-6 w-full max-w-xl bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
  <div className="flex flex-row mb-4">
    <img
      src={`https://books.google.com/books/content?id=${itemId}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
      alt={book.volumeInfo.title}
      className="w-1/2 sm:w-1/2 mr-6 sm:mb-0 object-cover"
    />
    <div className="w-full sm:w-3/4 ml-3">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{book.volumeInfo.title}</h2>
      <h3 className="text-lg text-gray-600 mb-2">{book.volumeInfo.authors?.join(', ')}</h3>
      <br />
      Rating:
      <StarRatings
        rating={book.volumeInfo.averageRating}
        numberOfStars={5}
        starRatedColor="#FFD700"
        starEmptyColor="#808080"
        name='rating'
        starDimension="20px"
        starSpacing="2px"
      />
      <h3 className="text-gray-500 mb-4">Kind: {book.kind?.replace("books#", "")}</h3>
      <h3 className="text-gray-500 mb-4">Pages: {book.volumeInfo.pageCount}</h3>
    </div>
  </div>
  <p style={{ fontSize: '1rem' }} className="text-gray-700 leading-relaxed">
    <span style={{ fontSize: '2rem' }}>{book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "").charAt(0)}</span>
    {book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "").slice(1)}
  </p>
</div>


      </div>
    </>
  ) : <>
    <div className='sticky w-full min-h-screen h-full bg-gradient-to-r from-[#8ECAE6] to-[#219EBC] px-4 py-4 prevent-text-selection'>
      <Breadcrumb breadcrumbList={[
        { breadcrumb: { name: 'Home', path: '/' } },
        { breadcrumb: { name: 'Table', path: `/table/${search}` } },
      ]} />
    </div>
  </>
};

export default DetailsPage;
