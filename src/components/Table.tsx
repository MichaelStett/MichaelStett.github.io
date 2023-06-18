import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTable, useSortBy, Column } from 'react-table';
import Breadcrumb from "./Breadcrumb";
import { Book, BreadcrumbProp, FlatBook } from '../types/Book';
import StarRatings from 'react-star-ratings';

type TableParams = {
  search: string;
};

const flatten = function (books: Book[]): FlatBook[] {
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

const trimText = function (text: string, maxLenght: number = 40): string {
  if (text === undefined) return '';
  return text.length > maxLenght ? text.substring(0, maxLenght - 3) + '...' : text;
}

const Table: React.FC = () => {
  const { search } = useParams<TableParams>();
  const [searchValue, setSearchValue] = useState<string | undefined>(search)
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const [fetchedData, setfetchedData] = useState<FlatBook[]>([]);

  const fetchData = async () => {
    try {
      const result = await axios(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=10&startIndex=${startIndex}`);
      const flat = flatten(result.data.items)
      setfetchedData([...fetchedData, ...flat])
      setStartIndex(startIndex + 10);
    } catch (err) {
      console.log(err)
    } finally {

    }
  };

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  const data = React.useMemo(() => fetchedData, [fetchedData]);

  const columns: Column<FlatBook>[] = React.useMemo(
    () => [
      {
        Header: 'No',
        Cell: ({ row }: { row: any }) => (
          <span className='justify-normal'>{row.index + 1}</span>
        ),
        disableSortBy: false,
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Authors',
        accessor: 'authors',
      },
      {
        Header: 'Kind',
        accessor: 'kind',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const breadcrumbsArray: Array<BreadcrumbProp> = [
    { breadcrumb: { name: 'Home', path: '/' } },
    { breadcrumb: { name: 'Table', path: `/table/${search}` } },
  ]

  const [breadcrumbs, setBreadCrumbs] = useState<Array<BreadcrumbProp>>(breadcrumbsArray);

  return (
    <>
      <div className='sticky w-full min-h-screen h-full bg-gradient-to-r from-[#8ECAE6] to-[#219EBC] px-4 py-4 prevent-text-selection'>
        <Breadcrumb breadcrumbList={breadcrumbs} />
        <table {...getTableProps()} className="mt-10 table-fixed w-full text-sm sm:text-base md:text-lg bg-white overflow-wrap">
          <thead className="sticky z-10 bg-white px-4" style={{top: '3em'}}>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-[#023047] text-white">
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              const isExpanded = expandedRow === i;

              return (
                <React.Fragment key={i}>
                  <tr
                    {...row.getRowProps()}
                    onClick={() => {
                      if (row.index === expandedRow) {
                        breadcrumbs.pop();
                        setBreadCrumbs(breadcrumbs);
                        setExpandedRow(null);
                      } else {
                        if (breadcrumbs.length > 2) {
                          breadcrumbs.pop();
                        }
                        breadcrumbs.push({ breadcrumb: { name: `${data[row.index].title}`, path: '' } });
                        setBreadCrumbs(breadcrumbs);
                        setExpandedRow(row.index);
                      }
                    }
                    }
                    className={`${isExpanded ? 'bg-[#FB8500] text-white' : 'bg-white hover:bg-[#FB8500] hover:text-white text-black'} cursor-pointer`}
                  >
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="text-center p-2 border border-gray-200 whitespace-normal overflow-clip"
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                  {isExpanded ? (
                    <tr className='w-full'>
                      <td colSpan={columns.length} className="bg-gray-100 px-4 py-2 text-black">
                        <div className="flex z-0 justify-center items-center">
                          <div className='w-3/5'>
                            Rating:
                            <StarRatings
                              rating={row.original.averageRating}
                              numberOfStars={5}
                              starRatedColor="#FFD700"
                              starEmptyColor="#808080"
                              name='rating'
                              starDimension="20px"
                              starSpacing="2px"
                            />
                            <br />
                            {trimText(row.original.description, 225)}
                            <br />
                            <div className="flex justify-center items-center">
                              <button onClick={() => navigate(`/table/${search}/${row.original.id}/details`)}
                                className='px-4 py-2 bg-gradient-to-r from-[#FFB703] to-[#FB8500] text-white rounded-md'> More </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
               
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center items-center">
          <button onClick={() => {
            fetchData();
          }} className='mt-4 mb-4 px-4 py-2 bg-gradient-to-r from-[#FFB703] to-[#FB8500] text-white rounded-md'>Load more</button>
        </div>
      </div>
    </>
  );
};

export default Table;