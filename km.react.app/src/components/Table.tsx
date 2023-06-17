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

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

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
  } = useTable({ columns, data }, useSortBy);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const breadcrumbsArray: Array<BreadcrumbProp> = [
    { breadcrumb: { name: 'Home', path: '/' } },
    { breadcrumb: { name: 'Table', path: `/table/${search}` } },
  ]

  const [breadcrumbs, setBreadCrumbs] = useState<Array<BreadcrumbProp>>(breadcrumbsArray);

  return (
    <>
      <div className="sticky container mx-auto px-4">
        <div className="sticky top-0 bg-white">
          <Breadcrumb breadcrumbList={breadcrumbs} />
        </div>

        <table {...getTableProps()} className="table-fixed w-full mt-10 text-sm sm:text-base md:text-lg bg-white">
          <thead className="sticky top-6 z-10 bg-white">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-blue-500 text-white rounded">
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
                    className={`${isExpanded ? 'bg-gray-400 text-white' : 'bg-white text-black'} cursor-pointer`}
                  >
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="text-center p-2 border border-gray-300 whitespace-normal overflow-clip prevent-text-selection"
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                  {isExpanded ? (
                    <tr>
                      <td colSpan={columns.length} className="bg-gray-300 px-4 py-2 text-black prevent-text-selection">
                        Categories: {row.original.categories}
                        <br />
                        Rating:
                        <StarRatings
                          rating={row.original.averageRating}
                          numberOfStars={5}
                          starRatedColor="#FFD700"
                          starEmptyColor="white"
                          name='rating'
                          starDimension="20px"
                          starSpacing="2px"
                        />
                        <br />
                        {row.original.description}
                        <br />
                        <button onClick={() => navigate(`/table/${search}/${row.original.id}/details`)}
                          className='px-4 py-2 bg-blue-500 text-white rounded-md'> More </button>
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center items-center">
          <button onClick={() => fetchData()} className=' mt-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded-md'>Load more</button>
        </div>
      </div>
    </>
  );
};

export default Table;