import {FC, useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { useTable } from "react-table";
import { Book } from '../types/Book';

type LocationState = {
  searchValue: string;
};

const Table: FC = () => {
  const [data, setData] = useState<Book[]>([]);

  const navigate = useNavigate();
  const location = useLocation().state as LocationState;
  const searchValue = location.searchValue || "";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}}`);
      setData(result.data.items);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleRowClick = (itemId: string) => {
    navigate(`/table/${itemId}`);
  }

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading message while data is being fetched
  }

  return (
    <>
    <Breadcrumb breadcrumbList={[{ name: 'Home', path: '/' }, { name: 'Table', path: '/table' }]} />

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} onClick={() => handleRowClick(item.id)}>
            <td>{item.id}</td>
            <td>{item.volumeInfo.title}</td>
            <td>{item.volumeInfo.averageRating}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default Table;
