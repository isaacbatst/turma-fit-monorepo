import { Equipment } from "../../types/Equipment";
import { ApiGatewayEquipment } from "../interfaces/ApiGatewayEquipment";
import { ApiGatewayAxiosComponent } from "./ApiGatewayAxiosComponent";

export class ApiGatewayEquipmentAxios extends ApiGatewayAxiosComponent implements ApiGatewayEquipment {
  async createEquipment(name: string): Promise<void> {
    await this.axios.post('/equipments', {
      name
    }) 
  }
  async editEquipment(id: string, name: string): Promise<void> {
    await this.axios.patch(`/equipments/${id}`, {
      name
    })
  }
  async deleteEquipment(id: string): Promise<void> {
    await this.axios.delete(`/equipments/${id}`)
  }
  async getEquipments(): Promise<Equipment[]> {
    const { data } = await this.axios.get<Equipment[]>('/equipments')
    return data
  }

}