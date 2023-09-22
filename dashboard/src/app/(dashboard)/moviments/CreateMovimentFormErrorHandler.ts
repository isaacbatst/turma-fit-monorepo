import { ErrorHandler } from "../../../errors/ErrorHandler";

export class CreateMovimentFormErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {
    REQUIRED_NAME: 'O nome é obrigatório',
    REQUIRED_MUSCLE_ID: 'O músculo é obrigatório',
  };
  protected responseErrorMessages: Record<number, (message: string) => string | undefined> = {
    400: (message: string) => {
      const badRequestErrors: Record<string, string> = {
        'REQUIRED_NAME': 'Nome é obrigatório',
        'REQUIRED_MUSCLE_ID': 'Músculo é obrigatório',
      }
      return badRequestErrors[message]
    },
    409: () => 'Movimento já cadastrado',
    404: () => 'Músculo não encontrado',
  }

}