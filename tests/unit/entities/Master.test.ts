import { Master } from '@/userPool/entities/Master'
import { WebError } from '@/userPool/entities/WebError'

describe("Master entity", ()=>{
    it("Should create a valid token", async ()=>{
        const masterAccessKey = 'APPLES'
        const masterSecret = 'BANANAS'
        const master = new Master(
            masterAccessKey,
            masterSecret
        )

        const token = await master.auth(masterAccessKey)
        expect(typeof token).toBe('string')
    })

    it("Should throw an error when tokenizing with wrog access key", async ()=>{
        const masterAccessKey = 'APPLES'
        const masterSecret = 'BANANAS'
        const master = new Master(
            masterAccessKey,
            masterSecret
        )
        
        let expectedError: WebError | any = undefined;
        
        try{
            master.auth('ONIOS')
        }
        catch(e: any){
            expectedError = e
        }

        expect(expectedError instanceof Error).toBe(true)
        expect(expectedError).toHaveProperty('statusCode')
        expect(expectedError.statusCode).toEqual(401)
    })
})