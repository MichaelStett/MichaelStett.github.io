import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useTable, useSortBy, Column } from 'react-table';
import Breadcrumb from "./Breadcrumb";
import { Book, BreadcrumbProp, FlatBook } from '../types/Book';
import StarRatings from 'react-star-ratings';

type LocationState = {
  searchValue: string;
};

const flatten = function (books: Book[]): FlatBook[] {
  return books.map(book => ({
    id: book.id,
    title: book.volumeInfo.title,
    description: book.volumeInfo.description,
    authors: book.volumeInfo.authors?.join(', '),
    categories: book.volumeInfo.categories?.join(', '),
    averageRating: book.volumeInfo.averageRating,
    kind: book.kind.replace("books#", ""),
  }));
};

const Table: React.FC = () => {
  // const navigate = useNavigate();
  const location = useLocation().state as LocationState;

  const [searchTempValue, setTempSearchValue] = useState('');
  const navigate = useNavigate();

  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchValue(event.target.value);
  };

  const handleSearchClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(searchTempValue);
    await fetchData(searchTempValue);
  }

  const [fetchedData, setfetchedData] = useState<Book[]>([]);

  const fetchData = async (searchValue: string | null) => {
    if (searchValue == null || searchValue === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setIsLoading(true);

      try {
        const result = await axios(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=40`);
        setfetchedData(result.data.items);
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    }
  };

  const data = React.useMemo(() => flatten(fetchedData), [fetchedData]);

  const columns: Column<FlatBook>[] = React.useMemo(
    () => [
      {
        Header: 'No',
        Cell: ({ row }: { row: any }) => (
          <span className='justify-normal'>{row.index + 1}</span> // Add 1 to start counting from 1 instead of 0
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
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const breadcrumbsArray: Array<BreadcrumbProp> = [
    {
      breadcrumb: {
        name: 'Table',
        path: '/'
      }
    }
  ]

  const [breadcrumbs, setBreadCrumbs] = useState<Array<BreadcrumbProp>>(breadcrumbsArray);

  if (isEmpty) {
    return (
      <>
        <Breadcrumb breadcrumbList={breadcrumbs} />

        <div>
          <input type="text" value={searchTempValue} onChange={handleSearchChange} />
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Breadcrumb breadcrumbList={breadcrumbs} />

        <div>
          <input type="text" value={searchTempValue} onChange={handleSearchChange} />
          <button onClick={handleSearchClick}>Search</button>
        </div>

        <div>Loading...</div>
      </>
    )
  }

  return (
    <>
      <div className="sticky container mx-auto px-4">
        <div className="sticky top-0 bg-white">
          <Breadcrumb breadcrumbList={breadcrumbs}  />
          <div className=''>
          <input type="text" value={searchTempValue} onChange={handleSearchChange}
              className="px-4 py-2 border rounded-md mr-2 w-60" />
            <button onClick={handleSearchClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
          </div>
        </div>

        <table {...getTableProps()} className="table-fixed w-full mt-10 text-sm sm:text-base md:text-lg">
          <thead className="sticky top-16 z-10 bg-white">
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
                        if (breadcrumbs.length > 1) {
                          breadcrumbs.pop();
                        }
                        breadcrumbs.push({ breadcrumb: { name: `${data[row.index].title}`, path: "/" } });
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
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}

          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;