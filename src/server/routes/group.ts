import userPool, { IMainFactory } from '@/userPool'
import { GroupInputPayload } from '@/userPool/types/'
import consumerVerifyMiddleware from './consumer.verify.middleware'
import {Router} from 'express'

export default function(mainFactory: IMainFactory): Router{
  const groupRepository = mainFactory.createGroupRepository()
  const router = Router()

  router.post('/register', consumerVerifyMiddleware(mainFactory), async (req, res)=>{
    const {name, userMaxNumber, description, meta} = req.body
    const groupInputPayload: GroupInputPayload = {
      name,
      description,
      userMaxNumber,
      meta,
    }

    const { consumerId } = res.locals

    try{
      const { groupId } = await userPool.registerGroup(groupInputPayload, consumerId, { groupRepository })
      res.status(200).send({
        groupId,
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