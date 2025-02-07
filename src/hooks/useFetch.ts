import { useEffect, useState } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (e: any) {
      console.log('error', e.message)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export default useFetch;