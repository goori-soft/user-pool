import { EventHandler, IEventBus } from "../interfaces/IEventBus";
import { Event } from '../entities'
import { v4 as uuid } from 'uuid'
import { Events } from "../types";

const handlers: { [eventName: string]: Set<EventHandler> } = {}

export class EventBus implements IEventBus{
  emit(event: Event): void {
    const eventData = event.getData()
    const eventName = eventData.name
    if(handlers[eventName]){
      for(let handler of handlers[eventName]){
        try{
          handler(eventData)
        }
        catch(e: any){
          if(eventName !== Events.ERROR){
            const eventError = new Event(Events.ERROR, {originalEvent: eventData})
            this.emit(eventError)
          }
        }
      }
    }
  }

  on(eventName: string, handler: EventHandler): void {
    this.setEventName(eventName)
    handlers[eventName].add(handler)
  }

  private setEventName(eventName: string): void{
    if(!handlers[eventName]) handlers[eventName] = new Set()
  }
}