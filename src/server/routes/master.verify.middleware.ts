import { 
  RequestHandler,
  Request, 
  Response, 
  NextFunction,
} from 'express'
import userPool from '@/userPool'

export const masterVerifyMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) =>{
  const headers = req.headers
  const token: string = headers['x-master-access-token'] as string
  
  if(await userPool.validateMasterToken(token)) return next()

  const errorStatusCode = 401
  const errorMessage = `You are not authenticated as master user`
  res.status(errorStatusCode).send({
    message: errorMessage,
    error: errorMessage,
    errors: [errorMessage]
  })
}