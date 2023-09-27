import { ErrorHandler } from "../../../errors/ErrorHandler";

export class CreateTrainingErrorHandler extends ErrorHandler {
  protected formErrorMessages: Record<string, string> = {};
  protected responseErrorMessages: Record<number, (error: string) => string | undefined> = {};

}