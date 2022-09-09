export interface IProfileRepository {
  insert(profile: any): Promise<string>
  clean(): Promise<void>
}