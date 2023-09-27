import { Moviment } from "../../types/Moviment";
import { ApiGatewayMoviment } from "../interfaces/ApiGatewayMoviment";
import { ApiGatewayAxiosComponent } from "./ApiGatewayAxiosComponent";

export class ApiGatewayMovimentAxios extends ApiGatewayAxiosComponent implements ApiGatewayMoviment {
  createMoviment(name: string, muscleId: string): Promise<void> {
    return this.axios.post('/moviments', {
      name,
      muscleId
    })
  }
  editMoviment(id: string, name: string, muscleId: string): Promise<void> {
    return this.axios.put(`/moviments/${id}`, {
      name,
      muscleId
    })
  }
  deleteMoviment(id: string): Promise<void> {
    return this.axios.delete(`/moviments/${id}`)
  }
  async getMoviments(): Promise<Moviment[]> {
    const response = await this.axios.get<Moviment[]>('/moviments')
    return response.data
  }

}