import { ErrorHandler } from "../../../errors/ErrorHandler";

export class DeleteEquipmentErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {};
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    404: () => 'Equipamento não encontrado',
  };
}