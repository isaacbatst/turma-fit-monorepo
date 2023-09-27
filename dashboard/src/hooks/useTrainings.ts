import useSWR from "swr";
import { useApiGateway } from "../app/components/ApiGatewayContext";

export const useTrainings = () => {
  const apiGateway = useApiGateway()
  const { data, error, isLoading, mutate } = useSWR('trainings', () => apiGateway.training.getTrainings())
  return {
    trainings: data,
    isLoading,
    isError: error,
    mutate
  }
}