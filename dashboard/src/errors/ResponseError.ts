export class ResponseError extends Error {
  constructor(message: string | string[], readonly status: number) {
    super(Array.isArray(message) ? message[0] : message);
    this.name = 'ResponseError';
  }
}