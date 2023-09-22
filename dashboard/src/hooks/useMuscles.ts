import useSWR from "swr"
import { Muscle } from "../types/Muscle";

export const fetchMusclesFromFrontend = async () => {
  const response = await fetch('http://localhost:5555/muscles', {
    credentials: 'include'
  });

  if (response.status >= 400) {
    return []
  }

  const data = await response.json() as Muscle[];
  return data;
}

export const useMuscles = () => {
  const { data, error, isLoading, mutate } = useSWR('muscles', fetchMusclesFromFrontend)
  return {
    muscles: data,
    isLoading,
    isError: error,
    mutate
  }
}