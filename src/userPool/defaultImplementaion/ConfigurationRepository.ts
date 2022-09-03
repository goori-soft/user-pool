import { config } from 'dotenv'
import { IConfigurationRepository } from "../interfaces";

config()

export class ConfigurationRepository implements IConfigurationRepository{
  async get(propName: string) {
    return process.env[propName]
  }

  async set(propName: string, propValue: any): Promise<void> {
    throw new Error("Writeble repository for configuration was not defined.");
  }

  async unset(propName: string): Promise<void> {
    throw new Error("Writeble repository for configuration was not defined.");
  }

  getEnv(propName: string): string | undefined {
    return process.env[propName]
  }
}

export const configurationRepository = new ConfigurationRepository()
