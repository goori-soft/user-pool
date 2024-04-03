import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { PasswordEncoder } from '~/core/interfaces/PasswordEncoder';

export type SysPasswordEncoderOptions = {
  saltRounds?: number;
  secret?: string;
  tokenExpIn?: number;
};

export class SysPasswordEncoder implements PasswordEncoder {
  private saltRounds: number;
  private secret: string;
  private tokenExpIn: number | undefined;

  constructor(options?: SysPasswordEncoderOptions) {
    this.saltRounds = options?.saltRounds ?? 10;
    this.secret = options?.secret ?? uuid();
    this.tokenExpIn = options?.tokenExpIn;
  }

  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltRounds);
    return hash;
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async tokenize(data: any): Promise<string> {
    const payload: object = {
      data,
    };

    const options: jwt.SignOptions = {};
    if (this.tokenExpIn) options.expiresIn = this.tokenExpIn;

    const token = jwt.sign(payload, this.secret);
    return token;
  }

  async validateToken(token: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        jwt.verify(token, this.secret, {}, (error, payload) => {
          if (error) resolve(false);
          resolve(true);
        });
      } catch {
        resolve(false);
      }
    });
  }

  async decodeToken(token: string): Promise<any> {
    const payloadString = jwt.decode(token);
    if (!payloadString) return undefined;
    if (typeof payloadString === 'string') {
      try {
        const payload = JSON.parse(payloadString);
        return payload.data;
      } catch (e: any) {
        throw new Error('it was not possible to decode a token');
      }
    }

    return payloadString.data;
  }
}
