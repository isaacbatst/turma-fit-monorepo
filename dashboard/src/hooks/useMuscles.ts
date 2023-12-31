import useSWR from "swr";
import { useApiGateway } from "../app/components/ApiGatewayContext";

export const useMuscles = () => {
  const apiGateway = useApiGateway()
  const { data, error, isLoading, mutate } = useSWR('muscles', () => apiGateway.muscles.getMuscles())
  return {
    muscles: data,
    isLoading,
    isError: error,
    mutate
  }
}