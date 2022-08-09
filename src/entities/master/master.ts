import { WebError } from '@/entities/webError'
import { ITokenizer } from '@/entities/interfaces/ITokenizer'

type MasterToken = string

export class Master {
    constructor(
        private masterAccessKey: string,
        private masterSecret: string,
        private tokenizer: ITokenizer
    ){}

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