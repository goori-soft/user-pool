import userPool from '@/userPool'
import {Router} from 'express'
import { ConsumerMongoFactory } from '@/factories'

const router = Router()

router.post('/auth', async (req, res)=>{
  const { consumerId, accessKey } = req.body
  const consumerAuthKeys = { consumerId, accessKey }
  const consumerFactory = new ConsumerMongoFactory()

  try{
    const token = await userPool.authConsumer(consumerAuthKeys, {consumerFactory})
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

export default router