import {Router} from 'express'
import master from '@/entities/master'
import { createConsumer, IConsumerPayload } from '@/entities/consumer'
import { masterVerifyMiddleware } from './master.verify.middleware'
import { ConsumerRepository } from '@/adapters/consumerRepository'

const router = Router()

router.post("/auth", async (req, res): Promise<void>=>{
    const {masterAccessKey} = req.body
    try{
        const token = master.auth(masterAccessKey)
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

router.post("/create/consumer", masterVerifyMiddleware, async (req, res)=>{
    const {name, email, origin, userMaxNumber, groupMaxNumber} = req.body as IConsumerPayload
    const payload = {name, email, origin, userMaxNumber, groupMaxNumber}
    try{
        const consumer = createConsumer(payload)
        const consumerPayload = consumer.parseToOBject()
        
        const consumerRepository = new ConsumerRepository(consumerPayload)
        await consumerRepository.save()
        consumer.setId( consumerRepository.getId() )

        await consumer.save()
        res.status(200).send({
            consumerId: consumer.getId(),
            accessKey: consumer.getAccessKey(),
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

export default router