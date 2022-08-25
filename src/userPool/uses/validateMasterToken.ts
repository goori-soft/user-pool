import { master } from '../entities/Master'

export default function validateMasterToken(token: string): boolean{
  return master.verify(token)
}