export type EventHandler = <MessageType = any>(message: MessageType, eventName:string) => void

export interface IEventBus {
  emit(eventName: string, message: any): Promise<void>
  on(eventName: string, handler: EventHandler): Promise<void>
}