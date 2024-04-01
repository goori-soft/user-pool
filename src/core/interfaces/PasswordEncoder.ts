import { Token } from '../types/Token';

export interface PasswordEncoder {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
  tokenize(data: any): Promise<Token>;
  validateToken(token: Token): Promise<boolean>;
}
