import useSWR from "swr";
import { useApiGateway } from "../app/components/ApiGatewayContext";

export const useMoviments = () => {
  const apiGateway = useApiGateway()
  const { data, error, isLoading, mutate } = useSWR('moviments', () => apiGateway.moviments.getMoviments())
  return {
    moviments: data,
    isLoading,
    isError: error,
    mutate
  }
}