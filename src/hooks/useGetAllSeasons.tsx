import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Season } from '../app/repository/seasonRepository';
import {host} from '../config';

export function useGetAllSeasons(){
  const [allSeasons, setAllSeasons] = useState<Season[]>([]);
  const [error, setError] = useState<string>();
  const route = host + '/api/season?all=true';
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data, error: responseError} = useSWR<Season[]>(route, fetcher);

  useEffect(() => {
    if (data) {
      setAllSeasons(data);
    }
    if (responseError) {
      setError(responseError);
    }
  }, [data, responseError]);

  return {
    allSeasons,
    error,
    isLoading: !error && !data,
  };
}