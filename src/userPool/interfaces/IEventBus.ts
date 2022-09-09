import {Event} from '../types'

export type EventHandler = <MessageType = any>(event: Event<MessageType>) => void

export interface IEventBus {
  emit(eventName: string, message: any): void | Promise<void>
  on(eventName: string, handler: EventHandler): void | Promise<void>
}