import { Master, MasterPropNames } from '../entities/Master'
import { IConfigurationRepository, IEventBus } from '../interfaces'
import { configurationRepository } from '../defaultImplementaion'
import { Events } from '../types'

type authMasterOptions = {
  configurationRepository: IConfigurationRepository
  eventBus?: IEventBus
}

export default async function authMaster( masterPassword: string, options: authMasterOptions = {configurationRepository}): Promise<string>{
  const {configurationRepository, eventBus} = options
  const masterAccessKey = await configurationRepository.get(MasterPropNames.masterAccessKey) as string
  const masterSecret = await configurationRepository.get(MasterPropNames.masterSecret) as string
  const master = new Master(masterAccessKey, masterSecret)
  const token = master.auth(masterPassword)
  if(eventBus) eventBus.emit(Events.MASTER_AUTHENTICATED, {})
  return token
}