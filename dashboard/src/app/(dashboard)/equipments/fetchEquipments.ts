import { Equipment } from "../../../types/Equipment";

export const fetchEquipments = async () => {
  const response = await fetch('http://localhost:5555/equipments', {
    credentials: 'include'
  });

  if (response.status >= 400) {
    return []
  }

  const data = await response.json() as Equipment[];
  return data;
}
