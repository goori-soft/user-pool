import { Master }  from '@/entities/master/master'
import { Tokenizer } from '@/adapters/tokenizer'

export function createMaster(){
  const masterAccessKey = process.env.MASTER_ACCESS_KEY || ''
  const masterSecret = process.env.MASTER_SECRET || 'bananas'
  const tokenizer = new Tokenizer()

  return new Master(
    masterAccessKey, 
    masterSecret,
    tokenizer)
}