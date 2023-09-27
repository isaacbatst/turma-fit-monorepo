import { ErrorHandler } from "../../errors/ErrorHandler";

export class LoginErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {};
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {
    401: () => 'Email ou senha incorretos',
    400: (error: string) => {
      const messages: Record<string, string> = {
        'REQUIRED_EMAIL': 'Email é obrigatório',
        'REQUIRED_PASSWORD': 'Senha é obrigatória',
        'INVALID_EMAIL': 'Email inválido',
        'INVALID_PASSWORD': 'Senha inválida',
      }

      return messages[error]
    }
  };
}