import { Admin } from "../../types/Admin";

export type ApiGatewayAuth = {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  me(): Promise<Admin>
}