import userPool, { IMainFactory } from "@/userPool";
import { PolicyInputPayload } from "@/userPool/types";
import { Router } from "express";
import consumerVerifyMiddleware from './consumer.verify.middleware'

export default function(mainFactory: IMainFactory){
  const policyRepository = mainFactory.createPolicyRepository()
  const router = Router()

  router.post("/register", consumerVerifyMiddleware(mainFactory), async (req, res)=>{
    const {identifier, name, description} = req.body
    const { consumerId }  = res.locals
    const policyInputPayload = {identifier, name, description} as PolicyInputPayload
    try{
      const {policyId} = await userPool.registerPolicy(policyInputPayload, consumerId, { policyRepository })
      res.status(200).send({
        policyId,
        message: `A new policy '${name}' has been created`
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