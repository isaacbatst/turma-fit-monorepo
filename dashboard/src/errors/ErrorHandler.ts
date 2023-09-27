import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FormError } from "./FormError";

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
    if (error instanceof FormError && error.message in this.formErrorMessages) {
      return this.formErrorMessages[error.message] 
    } 

    if(error instanceof AxiosError && error.response?.status === 400 && error.message in this.formErrorMessages) {
      return this.formErrorMessages[error.response.data.message]
    }

    if(error instanceof AxiosError && error.response && error.response.status in this.responseErrorMessages) {
      const message = Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message;
      return this.responseErrorMessages[error.response.status](message) || ErrorHandler.unknownErrorMessage;
    }
    
    return ErrorHandler.unknownErrorMessage;
  }

  showToast(message: string): void {
    ErrorHandler.showToast(message);
  }
}