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
    const consumerRepository = mainFactory.createConsumerRepository()
    try{
      const { consumerId } = await userPool.validateConsumerToken(token, { consumerRepository })
      if(!consumerId) throw new Error(`Consumer is not authenticated`)
      res.locals.consumerId = consumerId
      return next()
    }
    catch(e){
      const errorStatusCode = 401
      const errorMessage = `Consumer is not authenticated`
      res.status(errorStatusCode).send({
        message: errorMessage,
        error: errorMessage,
        errors: [errorMessage]
      })
    }
  }

  return consumerVerifyMiddleware
}