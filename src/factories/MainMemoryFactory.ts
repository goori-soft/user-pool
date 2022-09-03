import { IConsumerFactory, IGroupFactory, IMainFactory } from "@/userPool";
import { ConsumerMemoryFactory } from "./ConsumerMemoryFactory";
import { GroupMemoryFactory } from "./GroupMemoryFactory";

export class MainMemoryFactory implements IMainFactory{
  
  createConsumerFactory(): IConsumerFactory {
    return new ConsumerMemoryFactory()
  }

  createGroupFactory(): IGroupFactory {
    return new GroupMemoryFactory()
  }
  
}