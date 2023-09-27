import useSWR from "swr"
import { useApiGateway } from "../app/components/ApiGatewayContext"

export const useAdminMe = () => {
  const apiGateway = useApiGateway()
  return useSWR('/admin/me', () => apiGateway.auth.me())
}