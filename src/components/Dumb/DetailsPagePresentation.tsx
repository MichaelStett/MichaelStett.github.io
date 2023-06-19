import React from "react";
import { NavigateFunction } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { BookDetails } from "../../types/BookTypes";
import { BreadcrumbProp } from "../../types/BreadcrumbTypes";
import BreadcrumbContainer from "../Smart/BreadcrumbContainer";

interface DetailsPagePresentationProps {
    navigate: NavigateFunction;
    book: BookDetails | null;
    loading: boolean;
    error: Error | null;
    breadcrumbs: BreadcrumbProp[];
}

const DetailsPagePresentation: React.FC<DetailsPagePresentationProps> = ({ navigate, book, loading, error, breadcrumbs }) => {
    if (loading) return (
        <>
            <div className='sticky w-full min-h-screen h-full bg-gradient-to-r from-[#8ECAE6] to-[#219EBC] px-4 py-4 prevent-text-selection'>
                <BreadcrumbContainer breadcrumbList={breadcrumbs} />
                <div className="h-full flex justify-center items-center">
                    <p className='text-white font-semibold font px-4 py-4 text-xl'>Loading...</p>
                </div>
            </div>
        </>
    )

    if (error) return (
        <>
            <div className='sticky w-full min-h-screen h-full bg-gradient-to-r from-[#8ECAE6] to-[#219EBC] px-4 py-4 prevent-text-selection'>
                <BreadcrumbContainer breadcrumbList={breadcrumbs} />
                <div className="h-full flex justify-center items-center">
                    <p className='text-white font-semibold font px-4 py-4 text-xl'>Error: {error.message}</p>
                </div>
            </div>
        </>
    )

    if (!book) return (
        <>
            <div className='sticky w-full min-h-screen h-full bg-gradient-to-r from-[#8ECAE6] to-[#219EBC] px-4 py-4 prevent-text-selection'>
                <BreadcrumbContainer breadcrumbList={breadcrumbs} />
                <div className="h-full flex justify-center items-center">
                    <p className='text-white font-semibold font px-4 py-4 text-xl'>Nothing found.</p>
                    <button onClick={() => { navigate('/') }} className='mt-4 mb-4 px-4 py-2 bg-gradient-to-r from-[#FFB703] to-[#FB8500] text-white rounded-md'>Go back</button>
                </div>
            </div>
        </>
    )

    return (
        <>
            <div className='sticky w-full min-h-screen h-full bg-gradient-to-r from-[#8ECAE6] to-[#219EBC] px-4 py-4 prevent-text-selection'>

                <BreadcrumbContainer breadcrumbList={breadcrumbs} />

                <div className="mt-10 mx-auto p-6 w-full max-w-xl bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                    <div className="flex flex-row mb-4">
                        <img
                            src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
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
    );
};

export default DetailsPagePresentation;
