export interface IConfigurationRepository{
  get(propName: string): Promise<any>
  set(propName: string, propValue: any): Promise<void>
  unset(propName: string): Promise<void>
  getEnv(propName: string): string | undefined
}