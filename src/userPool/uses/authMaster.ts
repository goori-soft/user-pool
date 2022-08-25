import { master } from '../entities/Master'

export default function authMaster(masterPassword: string): string{
  const token = master.auth(masterPassword)
  return token
}