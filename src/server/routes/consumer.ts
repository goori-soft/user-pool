import userPool, { IMainFactory } from '@/userPool'
import {Router} from 'express'

export default function(mainFactory: IMainFactory): Router{

  const router = Router()
  const consumerRepository = mainFactory.createConsumerRepository()

  router.post('/auth', async (req, res)=>{
    const { consumerId, accessKey } = req.body
    const consumerAuthKeys = { consumerId, accessKey }
    try{
      const token = await userPool.authConsumer(consumerAuthKeys, {consumerRepository})
      res.status(200).send({
        token,
        message: 'Consumer is authenticated'
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

  return router
}