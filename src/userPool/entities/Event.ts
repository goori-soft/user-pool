import { EventData } from "../types";
import { TextInput } from "./TextInput";
import { v4 as uuid }  from 'uuid'

export class Event<Body = any>{
  private name: TextInput
  private body: Body
  private identifier: string
  private issuedOn: string

  constructor(eventName: string, body: Body){
    this.name = new TextInput(eventName)
    this.body = clone(body)
    this.identifier = uuid()
    this.issuedOn = new Date().toISOString()
  }
  
  getData(): EventData<Body>{
    return {
      name: this.name.getValue(),
      identifier: this.identifier,
      issuedOn: this.issuedOn,
      body: clone(this.body)
    }
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