export type AdminParams = {
  email: string;
  password: string;
  id: string;
  name: string;
};

export class Admin {
  private email: string;
  private password: string;
  private id: string;
  private name: string;

  constructor(params: AdminParams) {
    this.email = params.email;
    this.password = params.password;
    this.id = params.id;
    this.name = params.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  toJSON() {
    return {
      email: this.email,
      id: this.id,
      name: this.name,
    };
  }
}
