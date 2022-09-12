import userPool, { IMainFactory } from "@/userPool";
import { Router } from "express";
import consumerVerifyMiddleware from './consumer.verify.middleware'

export default function(mainFactory: IMainFactory): Router{
  const userRepository = mainFactory.createUserRepository()
  const consumerRepository = mainFactory.createConsumerRepository()

  const router = Router()

  router.post('/register', consumerVerifyMiddleware(mainFactory), async (req, res)=>{
    const {name, email, password, meta} = req.body
    const userInputPayload = {
      name,
      email,
      password,
      meta
    }
    const consumerId = res.locals.consumerId

    try{
      const {userId} = await userPool.registerUser(userInputPayload, consumerId, {userRepository, consumerRepository})
      res.status(200).send({
        userId,
        message: 'User has been created'
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