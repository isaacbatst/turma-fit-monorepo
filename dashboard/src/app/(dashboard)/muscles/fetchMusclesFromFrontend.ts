import { Muscle } from "../../../types/Muscle";

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
