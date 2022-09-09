import crypto from 'node:crypto'
import { TextInput } from './TextInput'

export class Password{
  salt: string
  encrypted: string | undefined

  constructor(private plainPass: string){
    this.salt = Password.generateSalt()
    const encrypted = Password.encrypt(this.plainPass, this.salt)
    this.setEncrypted(encrypted)
  }

  compare(passowrdToCompare: string): boolean{
    const encryptedToCompare = Password.encrypt(passowrdToCompare, this.salt)
    return encryptedToCompare === this.getEncrypted()
  }

  getEncrypted(): string{
    return this.encrypted as string
  }

  getSalt(): string{
    return this.salt
  }

  private setSalt(salt: string){
    this.salt = new TextInput(salt, 'Password salt').notBlanck().getValue()
    const encrypted = Password.encrypt(this.plainPass, this.salt)
    this.setEncrypted(encrypted)
  }

  private setEncrypted(encrypted: string){
    this.encrypted = new TextInput(encrypted, 'Encrypted password').notBlanck().getValue()
  }

  static generateSalt(bytes: number = 128): string{
    return crypto.randomBytes(bytes).toString('base64')
  }

  static createEncryptedPassword(encryptedPass: string, salt: string): Password{
    const passowrd = new Password('')
    passowrd.setSalt(salt)
    passowrd.setEncrypted(encryptedPass)
    return passowrd
  }

  static encrypt(plainPass: string, salt: string){
    const encrypted = crypto.pbkdf2Sync(plainPass, salt, 500, 512, 'sha512')
    return encrypted.toString('base64')
  }
}