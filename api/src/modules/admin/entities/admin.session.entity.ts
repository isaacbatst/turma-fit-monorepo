type AdminSessionParams = {
  createdAt: Date;
  expiresIn: number;
  token: string;
  userId: string;
};

export class AdminSession {
  private createdAt: Date;
  private expiresIn: number;
  private loggedOutAt?: Date;
  private token: string;
  private userId: string;

  constructor(params: AdminSessionParams) {
    this.createdAt = params.createdAt;
    this.expiresIn = params.expiresIn;
    this.token = params.token;
    this.userId = params.userId;
  }

  isValid(when: Date): boolean {
    return !this.isExpired(when) && !this.isLoggedOut();
  }

  isExpired(when: Date): boolean {
    const expiresAt = this.createdAt.getTime() + this.expiresIn;
    return when.getTime() > expiresAt;
  }

  logout(when: Date): void {
    this.loggedOutAt = when;
  }

  isLoggedOut(): boolean {
    return !!this.loggedOutAt;
  }

  getLoggedOutAt(): Date | undefined {
    return this.loggedOutAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUserId(): string {
    return this.userId;
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
