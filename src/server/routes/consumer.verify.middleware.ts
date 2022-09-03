import { 
  RequestHandler,
  Request, 
  Response, 
  NextFunction,
} from 'express'
import userPool, { IMainFactory } from '@/userPool'

export default function(mainFactory: IMainFactory): RequestHandler{

  const consumerVerifyMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) =>{
    const token = req.headers['x-consumer-access-token'] as string
    const consumerFactory = mainFactory.createConsumerFactory()
    if(await userPool.validateConsumerToken(token, {consumerFactory})) return next()

    const errorStatusCode = 401
    const errorMessage = `Consumer is not authenticated`
    res.status(errorStatusCode).send({
      message: errorMessage,
      error: errorMessage,
      errors: [errorMessage]
    })
  }

  return consumerVerifyMiddleware
}