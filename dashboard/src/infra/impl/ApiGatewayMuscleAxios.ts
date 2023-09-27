import { Muscle } from "../../types/Muscle";
import { ApiGatewayMuscles } from "../interfaces/ApiGatewayMuscles";
import { ApiGatewayAxiosComponent } from "./ApiGatewayAxiosComponent";

export class ApiGatewayMuscleAxios extends ApiGatewayAxiosComponent implements ApiGatewayMuscles {
  createMuscle(name: string): Promise<void> {
    return this.axios.post('/muscles', {
      name
    })
  }
  editMuscle(id: string, name: string): Promise<void> {
    return this.axios.patch(`/muscles/${id}`, {
      name
    })
  }
  async getMuscles(): Promise<Muscle[]> {
    const response = await this.axios.get<Muscle[]>('/muscles')
    return response.data
  }
  deleteMuscle(id: string): Promise<void> {
    return this.axios.delete(`/muscles/${id}`)
  }
  
}