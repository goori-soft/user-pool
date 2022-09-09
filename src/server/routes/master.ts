import {Router} from 'express'
import masterVerifyMiddleware from './master.verify.middleware'
import userPool, { IMainFactory } from '@/userPool'
import { ConsumerInputPayload, ConsumerAuthKeys } from '@/userPool/types'

export default function(mainFactory: IMainFactory): Router{
    const router = Router()
    const consumerRepository = mainFactory.createConsumerRepository()

    router.post("/auth", async (req, res): Promise<void>=>{
        const {masterAccessKey} = req.body
        
        try{
            const token = await userPool.authMaster(masterAccessKey)
            res.status(200).send({
                token,
                message: 'Master user authenticated'
            })
        }
        catch(e: any){
            res.status(e.statusCode || 500).send({
                error: e.toString(),
                errors: [...e.getMessages()],
                message: e.toString()
            })
        }
    })

    router.post("/consumer/register", masterVerifyMiddleware(mainFactory), async (req, res)=>{
        const {name, email, origin, userMaxNumber, groupMaxNumber} = req.body as ConsumerInputPayload
        const consumerPayload: ConsumerInputPayload = {name, email, origin, userMaxNumber, groupMaxNumber}

        try{
            const consumerAuthKeys: ConsumerAuthKeys = await userPool.registerConsumer(consumerPayload, {consumerRepository})
            res.status(200).send({
                ... consumerAuthKeys,
                message: `Consumer has been created`
            })
        }
        catch(e: any){
            res.status(e.statusCode || 500).send({
                message: e.toString(),
                error: e.toString(),
                errors: [...e.getMessages()]
            })
        }
    })

    router.get("/consumers", masterVerifyMiddleware(mainFactory), async (req, res)=>{
        try{
            const consumersStats = await userPool.getConsumersStats({consumerRepository})
            res.status(200).send(consumersStats)
        }
        catch(e: any){
            res.status(e.statusCode || 500).send({
                message: e.toString(),
                error: e.toString(),
                errors: [...e.getMessages()]
            })
        }
    })

    return router
}