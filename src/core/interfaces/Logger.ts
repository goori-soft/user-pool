export interface Logger {
  error(message: any | any[]): void | Promise<void>;
}
