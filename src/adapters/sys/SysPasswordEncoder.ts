import { PasswordEncoder } from '~/core/interfaces/PasswordEncoder';

export class SysPasswordEncoder implements PasswordEncoder {
  hash(password: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  compare(password: string, hash: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  tokenize(data: any): Promise<string> {
    throw new Error('Method not implemented.');
  }

  validateToken(token: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  decodeToken(token: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
