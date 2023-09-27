import { ApiGatewayAuth } from "./ApiGatewayAuth";
import { ApiGatewayEquipment } from "./ApiGatewayEquipment";
import { ApiGatewayMoviment } from "./ApiGatewayMoviment";
import { ApiGatewayMuscles } from "./ApiGatewayMuscles";
import { ApiGatewayTraining } from "./ApiGatewayTraining";

export type ApiGateway = {
  auth: ApiGatewayAuth
  training: ApiGatewayTraining
  equipments: ApiGatewayEquipment
  moviments: ApiGatewayMoviment
  muscles: ApiGatewayMuscles
}