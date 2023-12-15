export class Equipment {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
