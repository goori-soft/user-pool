import {Router} from 'express'
import { masterVerifyMiddleware } from './master.verify.middleware'
import userPool, { IConsumerInputPayload, IConsumerAuthKeys } from '@/userPool'
import { ConsumerMemoryFactory, ConsumerMongoFactory } from '@/factories'

const router = Router()
const consumerFactory = new ConsumerMongoFactory()

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

router.post("/consumer/register", masterVerifyMiddleware, async (req, res)=>{
    const {name, email, origin, userMaxNumber, groupMaxNumber} = req.body as IConsumerInputPayload
    const consumerPayload: IConsumerInputPayload = {name, email, origin, userMaxNumber, groupMaxNumber}

    try{
        const consumerAuthKeys: IConsumerAuthKeys = await userPool.registerConsumer(consumerPayload, {consumerFactory})
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

router.get("/consumers", masterVerifyMiddleware, async (req, res)=>{
    try{
        const consumersStats = await userPool.getConsumersStats({consumerFactory})
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

export default router