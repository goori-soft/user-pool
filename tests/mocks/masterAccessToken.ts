import jwt from 'jsonwebtoken'
const masterSecret = process.env.MASTER_SECRET as string
export const invalidMasterAccessToken = jwt.sign({}, 'ABC')
export const validMasterAccessToken = jwt.sign({}, masterSecret)
