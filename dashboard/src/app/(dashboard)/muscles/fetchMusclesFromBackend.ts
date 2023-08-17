import { API_GATEWAY_URL } from "../../../constants/gateways";
import { Muscle } from "../../../types/Muscle";

export const fetchMusclesFromBackend = async (token: string) => {
  const response = await fetch(`${API_GATEWAY_URL}/muscles`, {
    headers: { authorization: `Bearer ${token}` }
  });

  if (response.status >= 400) {
    return []
  }

  const data = await response.json() as Muscle[];
  return data;
}