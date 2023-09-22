export class FormError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormError';
  }
}