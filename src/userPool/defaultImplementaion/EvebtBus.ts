import { EventHandler, IEventBus } from "../interfaces/IEventBus";
import { v4 as uuid } from 'uuid'
import { Events } from "../types";

const handlers: { [eventName: string]: Set<EventHandler> } = {}

export class EventBus implements IEventBus{
  emit(eventName: string, message: any): void {
    if(handlers[eventName]){
      const issuedOn = new Date().toISOString()
      const identifier = uuid()

      for(let handler of handlers[eventName]){
        const event = {
          name: eventName,
          identifier,
          issuedOn,
          body: clone(message)
        }
        try{
          handler(event)
        }
        catch(e: any){
          if(eventName !== Events.ERROR){
            this.emit(Events.ERROR, e)
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

function clone(o: any): any{
  const oType = typeof o
  switch(oType){
    case 'number':
    case 'string':
    case 'function':
      return o

    case 'object':
      if(o instanceof Error) return o.toString()
      if(o instanceof Date) return new Date(o.toISOString())
      try{
        const newO = JSON.parse(JSON.stringify(o))
        return newO
      }
      catch(e: any){
        return undefined
      }

    default:
      return o
  }
}