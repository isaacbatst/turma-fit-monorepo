import axios from "axios";
import { ApiGateway } from "../interfaces/ApiGateway";
import { ApiGatewayAuthAxios } from "./ApiGatewayAuthAxios";
import { ApiGatewayEquipmentAxios } from "./ApiGatewayEquipmentAxios";
import { ApiGatewayMovimentAxios } from "./ApiGatewayMovimentAxios";
import { ApiGatewayMuscleAxios } from "./ApiGatewayMuscleAxios";
import { ApiGatewayTrainingAxios } from "./ApiGatewayTrainingAxios";

export class ApiGatewayAxios implements ApiGateway {
  readonly auth: ApiGatewayAuthAxios;
  readonly equipments: ApiGatewayEquipmentAxios;
  readonly moviments: ApiGatewayMovimentAxios
  readonly muscles: ApiGatewayMuscleAxios
  readonly training: ApiGatewayTrainingAxios

  constructor(baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555') {
    const axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
    })

    this.auth = new ApiGatewayAuthAxios(axiosInstance)
    this.equipments = new ApiGatewayEquipmentAxios(axiosInstance)
    this.moviments = new ApiGatewayMovimentAxios(axiosInstance)
    this.muscles = new ApiGatewayMuscleAxios(axiosInstance)
    this.training = new ApiGatewayTrainingAxios(axiosInstance)
  }
}