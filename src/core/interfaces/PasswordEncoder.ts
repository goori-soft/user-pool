export interface PasswordEncoder {
  hash(password: string): Promise<string>;
}
