import { Admin } from "../../types/Admin";
import { ApiGatewayAuth } from "../interfaces/ApiGatewayAuth";
import { ApiGatewayAxiosComponent } from "./ApiGatewayAxiosComponent";

export class ApiGatewayAuthAxios extends ApiGatewayAxiosComponent implements ApiGatewayAuth {
  async login(email: string, password: string): Promise<void> {
    await this.axios.post('/admin/login', {
      email,
      password
    })
  }
  async logout(): Promise<void> {
    await this.axios.post('/admin/logout')
  }
  async me(): Promise<Admin> {
    const { data } = await this.axios.get<Admin>('/admin/me')
    return data 
  }
}