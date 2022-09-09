import express from 'express'
import createRoutePath from '@/utils/createRoutePath'
import masterRouter from './routes/master'
import consumerRouter from './routes/consumer'
import groupRouter from './routes/group'
import policyRouter from './routes/policy'
import profileRouter from './routes/profile'
import userRouter from './routes/user'
import { MainMemoryFactory } from '@/factories'

const mainFactory = new MainMemoryFactory()

const app = express()
app.use(express.json())
app.use(createRoutePath('master'), masterRouter(mainFactory))
app.use(createRoutePath('consumer'), consumerRouter(mainFactory))
app.use(createRoutePath('group'), groupRouter(mainFactory))
app.use(createRoutePath('policy'), policyRouter(mainFactory))
app.use(createRoutePath('profile'), profileRouter(mainFactory))
app.use(createRoutePath('user'), userRouter(mainFactory))

export default app