import useSWR from "swr";
import { Training } from "../types/Training";

export const fetchTrainings = async () => {
  const response = await fetch('http://localhost:5555/trainings', {
    credentials: 'include',
    cache: 'no-store',
  });

  if (response.status >= 400) {
    return []
  }

  const data = await response.json() as Training[];
  return data;
}

export const useTrainings = () => {
  const { data, error, isLoading, mutate } = useSWR('trainings', fetchTrainings)
  return {
    trainings: data,
    isLoading,
    isError: error,
    mutate
  }
}