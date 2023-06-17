import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useTable, Column, Row } from 'react-table';
import Breadcrumb from "./Breadcrumb";
import { Book, BreadcrumbProp, BreadcrumbProps, FlatBook } from '../types/Book';
import { MockedData } from '../data/mock';

type LocationState = {
  searchValue: string;
};

const Table: React.FC = () => {
  // const navigate = useNavigate();
  const location = useLocation().state as LocationState;
  // const searchValue = location.searchValue || "";

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}}`);
      // setData(result.data.items);
      // setIsLoading(false);
    };

    fetchData();
  }, []);

  const data = React.useMemo(() => MockedData, [MockedData]);

  const columns: Column<FlatBook>[] = React.useMemo(
    () => [
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
  } = useTable({ columns, data });

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const breadcrumbsArray : Array<BreadcrumbProp> = [
    {
      breadcrumb: {
        name: 'Table',
        path: '/'
      }
    }
  ]

  const [breadcrumbs, setBreadCrumbs] = useState<Array<BreadcrumbProp>>(breadcrumbsArray);



  return (
    <>
      <Breadcrumb breadcrumbList={breadcrumbs} />
      
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
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
                  if (row.index === expandedRow)
                  {
                    breadcrumbs.pop();
                    setBreadCrumbs(breadcrumbs);
                    setExpandedRow(null);
                  } else {
                    if (breadcrumbs.length > 1){
                      breadcrumbs.pop();
                    }
                    breadcrumbs.push({breadcrumb: {name: `${data[row.index].title}`, path: "/"}});
                    setBreadCrumbs(breadcrumbs);
                    setExpandedRow(row.index);
                  }
                }
              }
                style={{
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? '#bec2bf' : 'white'
                }}
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        backgroundColor: isExpanded ? '#bec2bf' : 'white'
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
              {isExpanded ? (
                <tr>
                  <td colSpan={columns.length} style={{backgroundColor: isExpanded ? '#bec2bf' : 'white'}}>
                    Categories: {row.original.categories}
                    <br />
                    Average Rating: {row.original.averageRating}
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          );
        })}

      </tbody>
    </table>

    </>
  );
};

export default Table;
