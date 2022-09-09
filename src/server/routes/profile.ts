import { MainMemoryFactory } from "@/factories";
import userPool from "@/userPool";
import { Router } from "express";
import consumerVerifyMiddleware from './consumer.verify.middleware'

export default function(mainFactory: MainMemoryFactory): Router{
  const groupRepository = mainFactory.createGroupRepository()
  const policyRepository = mainFactory.createPolicyRepository()
  const profileRepository = mainFactory.createProfileRepository()
  const router = Router()

  router.post('/register', consumerVerifyMiddleware(mainFactory), async (req, res)=>{
    const {
      name,
      description,
      userMaxNumber,
      meta,
      groupId,
      policies
    } = req.body

    const profileInputPayload = {
      name,
      description,
      userMaxNumber,
      meta,
      groupId,
      policies
    }

    const options = {
      groupRepository,
      policyRepository,
      profileRepository
    }
    
    const consumerId = res.locals['consumerId'] as string
    
    try{
      const { profileId } = await userPool.registerProfile(profileInputPayload, consumerId, options)
      res.status(200).send({
        profileId,
        message: 'A new group has been created'
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