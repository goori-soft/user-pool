import { config } from 'dotenv'
import { IConfigurationRepository } from "../interfaces";

config()
const props = {...process.env}

export class ConfigurationRepository implements IConfigurationRepository{
  async get(propName: string) {
    return props[propName]
  }

  async set(propName: string, propValue: any): Promise<void> {
    props[propName] = propValue
  }

  async unset(propName: string): Promise<void> {
    delete props[propName]
  }

  getEnv(propName: string): string | undefined {
    return process.env[propName]
  }
}

export const configurationRepository = new ConfigurationRepository()
