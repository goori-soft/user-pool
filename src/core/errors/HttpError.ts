export class HttpError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: number = 500,
  ) {
    super(message);
  }

  toString() {
    return `[Error] ${this.code}: ${this.message}`;
  }
}
