import { ErrorHandler } from "../../../errors/ErrorHandler";

export class AddExerciseErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {};
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    400: (error: string) => {
      switch (error) {
      case 'REQUIRED_MOVIMENT_ID':
        return 'O movimento é obrigatório';
      case 'INVALID_MOVIMENT_ID':
        return 'O movimento é inválido';
      case 'INVALID_EQUIPMENT_ID':
        return 'O equipamento é inválido';
      case 'INVALID_GRIP':
        return 'A pegada é inválida';
      case 'REQUIRED_EXERCISE':
        return 'O exercício é obrigatório';
      case 'REQUIRED_SETS':
        return 'O número de séries é obrigatório';
      case 'INVALID_SETS':
        return 'O número de séries é inválido';
      case 'REQUIRED_REPETITIONS':
        return 'O número de repetições é obrigatório';
      case 'INVALID_REPETITIONS':
        return 'O número de repetições é inválido';
      }
    }
  }
}
