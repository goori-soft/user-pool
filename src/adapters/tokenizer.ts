import { ITokenizer, TokenizerPayload } from "@/entities/interfaces/ITokenizer";
import jwt from 'jsonwebtoken';

export class Tokenizer implements ITokenizer{
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
      throw new Error(`Unable to verify token, invalid token`);
    }
  }
}