import { Training } from "../../types/Training";
import { AddExerciseSetParams, ApiGatewayTraining } from "../interfaces/ApiGatewayTraining";
import { ApiGatewayAxiosComponent } from "./ApiGatewayAxiosComponent";

export class ApiGatewayTrainingAxios extends ApiGatewayAxiosComponent implements ApiGatewayTraining {
  createTraining(): Promise<void> {
    return this.axios.post('/trainings')
  }
  addExerciseSet(params: AddExerciseSetParams): Promise<void> {
    return this.axios.patch(`/trainings/${params.trainingId}/add-exercise-set`, params)
  }
  async getTrainings(): Promise<Training[]> {
    const response = await this.axios.get<Training[]>('/trainings')
    return response.data
  }
}