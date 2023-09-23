import { ErrorHandler } from "../../../errors/ErrorHandler";

export class MovimentEditErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {};
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    404: (error: string) => {
      if (error === 'MUSCLE_NOT_FOUND') {
        return 'Músculo não encontrado.';
      }

      if(error === 'MOVIMENT_NOT_FOUND') {
        return 'Movimento não encontrado.';
      }
    },
    400: (error: string) => {
      if (error === 'REQUIRED_NAME') {
        return 'Nome é obrigatório.';
      }

      if (error === 'REQUIRED_MUSCLE_ID') {
        return 'Músculo é obrigatório.';
      }
    },
    409: (error: string) => {
      if(error === 'DUPLICATED_NAME') {
        return 'Já existe um movimento com esse nome.';
      }
    }
  };

}