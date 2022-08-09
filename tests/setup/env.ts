const env = {
  MASTER_ACCESS_KEY: 'ABCDEF',
  MASTER_SECRET: 'BANANAS'
}
const originalEnv = process.env
process.env = {...originalEnv, ...env}
export default process.env