import { ErrorHandler } from "../../../errors/ErrorHandler";

export class EditEquipmentErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {
    'REQUIRED_NAME': 'O nome é obrigatório',  
    'NOT_FOUND': 'Equipamento não encontrado',
  };
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    409: () => 'Já existe um equipamento com esse nome',
  };
}