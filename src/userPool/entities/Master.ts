import { WebError } from './WebError'
import { Tokenizer } from './Tokenizer'

type MasterToken = string

export class Master {
    private tokenizer: Tokenizer

    constructor(
        private masterAccessKey: string,
        private masterSecret: string
    ){
        this.tokenizer = new Tokenizer()
    }

    auth(masterAccessKey: string): MasterToken{
        if(masterAccessKey !== this.getAccessKey())
            throw new WebError('Wrong master access key', 401)
        
        const token = this.tokenizer.sign({}, this.masterSecret)
        return token
    }

    verify(token: string): boolean{
        try{
            this.tokenizer.verify(token, this.masterSecret)
            return true
        }
        catch(e: any){
            return false
        }
    }

    private getAccessKey(): string{
        return this.masterAccessKey
    }
}

const masterAccessKey = process.env.MASTER_ACCESS_KEY || ''
const masterSecret = process.env.MASTER_SECRET || 'bananas'
export const master = new Master(masterAccessKey, masterSecret)