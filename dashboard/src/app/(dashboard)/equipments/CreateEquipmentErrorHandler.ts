import { ErrorHandler } from "../../../errors/ErrorHandler";

export class CreateEquipmentErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {
    'INVALID_NAME': 'Nome inválido',
    'REQUIRED_NAME': 'Nome é obrigatório'
  };
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    409: () => 'Equipamento já cadastrado',
  };
}