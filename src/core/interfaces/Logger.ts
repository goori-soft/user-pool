import { HttpError } from '../errors/HttpError';

export interface Logger {
  error(message: any | any[] | HttpError): void | Promise<void>;
}
