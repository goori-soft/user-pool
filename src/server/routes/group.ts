import { GroupMemoryFactory } from '@/factories/GroupMemoryFactory'
import userPool from '@/userPool'
import { IGroupInputPayload } from '@/userPool/interfaces/IGroupInputPayload'
import { consumerVerifyMiddleware } from './consumer.verify.middleware'
import {Router} from 'express'

const groupFactory = new GroupMemoryFactory

const router = Router()

router.post('/register', consumerVerifyMiddleware, async (req, res)=>{
  const {name, userMaxNumber, description, meta} = req.body
  const groupInputPayload: IGroupInputPayload = {
    name,
    description,
    userMaxNumber,
    meta,
  }

  const {consumerId} = req.body

  try{
    const {id} = await userPool.registerGroup(groupInputPayload, consumerId, {groupFactory})
    res.status(200).send({
      groupId: id,
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

export default router