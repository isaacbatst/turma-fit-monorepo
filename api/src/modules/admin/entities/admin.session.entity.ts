type AdminSessionParams = {
  createdAt: Date;
  expiresIn: number;
  token: string;
};

export class AdminSession {
  private createdAt: Date;
  private expiresIn: number;
  private token: string;

  constructor(params: AdminSessionParams) {
    this.createdAt = params.createdAt;
    this.expiresIn = params.expiresIn;
    this.token = params.token;
  }

  isExpired(when: Date): boolean {
    const expiresAt = this.createdAt.getTime() + this.expiresIn;
    return when.getTime() > expiresAt;
  }

  getToken(): string {
    return this.token;
  }

  getExpiresAt(): Date {
    return this.createdAt;
  }

  getExpiresIn(): number {
    return this.expiresIn;
  }
}
