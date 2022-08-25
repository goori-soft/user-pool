import { IConsumerRepository } from "@/userPool/entities/interfaces/IConsumerRepository"

export const ConsumerDBMemory: {id: string}[] = []

const memoryTotalRegisters = 100
for (let i = 0; i < memoryTotalRegisters; i++){
  const id = i.toString().padStart(11, '0')
  const register = {id}
  ConsumerDBMemory.push(register)
}

export class ConsumerRepositoryMock implements IConsumerRepository{
  async save(consumerPayload: any): Promise<string>{
    return ConsumerDBMemory[0].id
  }
}