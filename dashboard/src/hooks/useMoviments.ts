import useSWR from "swr";
import { Moviment } from "../types/Moviment";

export const fetchMoviments = async () => {
  const response = await fetch('http://localhost:5555/moviments', {
    credentials: 'include'
  });

  if (response.status >= 400) {
    return []
  }

  const data = await response.json() as Moviment[];
  return data;
}

export const useMoviments = () => {
  const { data, error, isLoading, mutate } = useSWR('moviments', fetchMoviments)
  return {
    moviments: data,
    isLoading,
    isError: error,
    mutate
  }
}