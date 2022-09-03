import express from 'express'
import createRoutePath from '@/utils/createRoutePath'
import masterRouter from './routes/master'
import consumerRouter from './routes/consumer'
import groupRouter from './routes/group'

const app = express()
app.use(express.json())
app.use(createRoutePath('master'), masterRouter)
app.use(createRoutePath('consumer'), consumerRouter)
app.use(createRoutePath('group'), groupRouter)

export default app