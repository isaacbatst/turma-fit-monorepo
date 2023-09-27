import useSWR from "swr";
import { useApiGateway } from "../app/components/ApiGatewayContext";

export const useEquipments = () => {
  const apiGateway = useApiGateway()
  const { data, error, isLoading, mutate } = useSWR('equipments', () => apiGateway.equipments.getEquipments())
  return {
    equipments: data,
    isLoading,
    isError: error,
    mutate
  }
}
