import { Training } from "../../types/Training";
import { AddExerciseSetParams, ApiGatewayTraining, ChangeExerciseSetOrderParams } from "../interfaces/ApiGatewayTraining";
import { ApiGatewayAxiosComponent } from "./ApiGatewayAxiosComponent";

export class ApiGatewayTrainingAxios extends ApiGatewayAxiosComponent implements ApiGatewayTraining {

  createTraining(): Promise<void> {
    return this.axios.post('/trainings')
  }
  addExerciseSet(params: AddExerciseSetParams): Promise<void> {
    return this.axios.post(`/trainings/${params.trainingId}/exercise-set`, params)
  }
  async getTrainings(): Promise<Training[]> {
    const response = await this.axios.get<Training[]>('/trainings')
    return response.data
  }

  changeExerciseSetOrder({exerciseSetId, order,trainingId}: ChangeExerciseSetOrderParams): Promise<void> {
    return this.axios.patch(`/trainings/${trainingId}/exercise-set/${exerciseSetId}/order`, {
      order
    })
  }
}