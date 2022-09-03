import { Master, MasterPropNames } from '../entities/Master'
import { IConfigurationRepository } from '../interfaces'
import { configurationRepository } from '../defaultImplementaion'

type authMasterOptions = {
  configurationRepository: IConfigurationRepository
}

export default async function authMaster(
    masterPassword: string,
    options: authMasterOptions = {configurationRepository}
  ): Promise<string>{
  const masterAccessKey = await options.configurationRepository.get(MasterPropNames.masterAccessKey) as string
  const masterSecret = await options.configurationRepository.get(MasterPropNames.masterSecret) as string
  const master = new Master(masterAccessKey, masterSecret)
  const token = master.auth(masterPassword)
  return token
}