import { useEffect, useState } from 'react';
import axios from 'axios';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: any;
};

export const useFetchData = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<T>(url);
        setData(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};