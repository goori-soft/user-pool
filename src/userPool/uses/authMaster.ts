import { Master, MasterPropNames, Event } from '../entities'
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
  const masterAuthenticatedEvent = new Event(Events.MASTER_AUTHENTICATED, {})
  if(eventBus) eventBus.emit(masterAuthenticatedEvent)
  return token
}