import { 
  RequestHandler,
  Request, 
  Response, 
  NextFunction,
} from 'express'
import master from '@/entities/master'

export const masterVerifyMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) =>{
  const headers = req.headers
  const token: string = headers['x-master-access-token'] as string
  
  if(master.verify(token)) return next()

  const errorStatusCode = 401
  const errorMessage = `You are not authenticated as master user`
  res.status(errorStatusCode).send({
    message: errorMessage,
    error: errorMessage,
    errors: [errorMessage]
  })
}