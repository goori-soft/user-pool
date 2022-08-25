import { Host } from "./Host";
import { WebError } from "./WebError";

export class Origin{
  private hosts: Host[] = []
  
  constructor(private hostStringArray: string[]){
    if(!hostStringArray) throw new WebError(`Origin is not correctly defined`, 400)
    if(hostStringArray.length <= 0) throw new WebError(`Origin requires at least one host`, 400)
    hostStringArray.map( hostString => {
      this.hosts.push( new Host(hostString) )
    })
  }

  getValue(): string[]{
    return this.hosts.map( host => host.getValue() )
  }
}