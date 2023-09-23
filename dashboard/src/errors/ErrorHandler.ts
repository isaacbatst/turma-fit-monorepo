import { toast } from "react-toastify";
import { FormError } from "./FormError";
import { ResponseError } from "./ResponseError";

export abstract class ErrorHandler {
  private static unknownErrorMessage = 'Erro desconhecido. Por favor, tente novamente mais tarde';

  static showToast(message: string): void {
    toast.error(message, {
      theme: 'dark',
      position: 'bottom-right',
      autoClose: 3000,
    })
  }

  protected abstract formErrorMessages: Record<string, string>;
  protected abstract responseErrorMessages: Record<number, (error: string) => string | undefined>;

  getMessage(error: unknown): string {
    console.log(error)
    if (error instanceof FormError && error.message in this.formErrorMessages) {
      return this.formErrorMessages[error.message] 
    } 
    if (error instanceof ResponseError && error.status in this.responseErrorMessages) {
      return this.responseErrorMessages[error.status](error.message) || ErrorHandler.unknownErrorMessage;
    }
    
    return ErrorHandler.unknownErrorMessage;
  }

  showToast(message: string): void {
    ErrorHandler.showToast(message);
  }
}