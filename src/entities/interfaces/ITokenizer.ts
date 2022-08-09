export type TokenizerPayload = { [key: string | number]: any }

export interface ITokenizer{
  sign: (payload: TokenizerPayload, secret: string) => string
  verify: (token: string, secret: string, options?: object) => TokenizerPayload
}