import { IConfigurationRepository } from "@/userPool";

export class MockConfigurationRepository implements IConfigurationRepository{
  private config: {[key: string]: string} = {
    'MASTER_ACCESS_KEY': 'b',
    'MASTER_SECRET': 'a'
  }

  async get(propName: string) {
    return this.config[propName] || ''
  }

  async set(propName: string, propValue: any): Promise<void> {
    this.config[propName] = propValue
  }

  async unset(propName: string): Promise<void> {
    delete this.config[propName]
  }
  getEnv(propName: string): string | undefined {
    return process.env[propName]
  }
}