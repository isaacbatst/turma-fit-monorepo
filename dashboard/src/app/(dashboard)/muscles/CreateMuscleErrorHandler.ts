import { ErrorHandler } from "../../../errors/ErrorHandler";

export class CreateMuscleErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {};
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    400: () => 'Nome inválido',
    409: () => 'Músculo já cadastrado',
  };

}