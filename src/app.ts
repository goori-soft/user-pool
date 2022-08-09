import express from 'express'
import createRoutePath from '@/utils/createRoutePath'
import masterRouter from './routes/master'

const app = express()
app.use(express.json())
app.use(createRoutePath('master'), masterRouter)

export default app