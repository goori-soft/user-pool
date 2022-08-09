import { IConsumerRepository } from "@/entities/interfaces/IConsumerRepository";
import { IConsumerPayload } from "@/entities/interfaces/IConsumerPayload"
import mongoose from 'mongoose'

const ConsumerModel = new mongoose.Schema({})

export class ConsumerRepository implements IConsumerRepository{
  async save(payload: IConsumerPayload): Promise<string>{
    return '1234567890'
  }
}