import useSWR from "swr"
import { Equipment } from "../types/Equipment";

const fetchEquipments = async () => {
  const response = await fetch('http://localhost:5555/equipments', {
    credentials: 'include'
  });

  if (response.status >= 400) {
    return []
  }

  const data = await response.json() as Equipment[];
  return data;
}

export const useEquipments = () => {
  const { data, error, isLoading, mutate } = useSWR('equipments', fetchEquipments)
  return {
    equipments: data,
    isLoading,
    isError: error,
    mutate
  }
}
