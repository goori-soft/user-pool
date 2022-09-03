import { 
  RequestHandler,
  Request, 
  Response, 
  NextFunction,
} from 'express'
import userPool from '@/userPool'
import { ConsumerMemoryFactory } from '@/factories'

export const consumerVerifyMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) =>{
  const token = req.headers['x-consumer-access-token'] as string
  const consumerFactory = new ConsumerMemoryFactory()
  if(await userPool.validateConsumerToken(token, {consumerFactory})) return next()

  const errorStatusCode = 401
  const errorMessage = `Consumer is not authenticated`
  res.status(errorStatusCode).send({
    message: errorMessage,
    error: errorMessage,
    errors: [errorMessage]
  })
}