import { Event } from '../entities'
import { EventData } from '../types'

export type EventHandler = <MessageType = any>(event: EventData<MessageType>) => void

export interface IEventBus {
  emit(event: Event): void | Promise<void>
  on(eventName: string, handler: EventHandler): void | Promise<void>
}