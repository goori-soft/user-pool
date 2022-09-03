import { Master, MasterPropNames } from '../entities/Master'
import { configurationRepository } from '../defaultImplementaion'
import { IConfigurationRepository } from '../interfaces'

type validateMasterTokenOptions = {
  configurationRepository: IConfigurationRepository
}

export default async function validateMasterToken(
    token: string, 
    options: validateMasterTokenOptions = {configurationRepository}
  ): Promise<boolean>{
  const masterAccessKey = await options.configurationRepository.get(MasterPropNames.masterAccessKey) as string
  const masterSecret = await options.configurationRepository.get(MasterPropNames.masterSecret) as string
  const master = new Master(masterAccessKey, masterSecret)
  return master.verify(token)
}