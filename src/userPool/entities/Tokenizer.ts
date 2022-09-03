import jwt from 'jsonwebtoken';
import { WebError } from './WebError';

export type TokenizerPayload = { [key: string | number]: any }

export class Tokenizer{
  sign(payload: TokenizerPayload, secret: string): string{
    return jwt.sign(payload, secret);
  }

  verify(token: string, secret: string): TokenizerPayload {
    try{
      const prePayload = jwt.verify(token, secret);
      const payload = typeof prePayload == 'string' ? {payload: prePayload} : prePayload;
      return payload;
    }
    catch(e: any){
      throw new WebError(`Unable to verify token, invalid token`, 401);
    }
  }

  decode(token: string): any {
    try{
      const payload = jwt.decode(token)
      return payload
    }
    catch(e: any){
      throw new WebError(`Unable to decode token, invalid token format`, 400)
    }
  }
}