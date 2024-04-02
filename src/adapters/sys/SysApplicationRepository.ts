import { ApplicationRepository } from '~/core/interfaces/ApplicationRepository';
import { ReadProfileRepository } from '~/core/interfaces/ReadProfileRepository';
import { SavedApplication } from '~/core/types/Application';

export type SysApplicationRepositoryOptions = {
  id: string;
  url?: string;
  email?: string;
  name?: string;
  description?: string;
};

export type SysApplicationRepositoryadapters = {
  profileRepository: ReadProfileRepository;
};

export class SysApplicationRepository implements ApplicationRepository {
  private readonly application: SavedApplication;
  private readonly profileRepository: ReadProfileRepository;

  constructor(options: SysApplicationRepositoryOptions, adapters: SysApplicationRepositoryadapters) {
    const { id, url, email, name, description } = options;
    const { profileRepository } = adapters;
    this.profileRepository = profileRepository;

    this.application = {
      id,
      url: url ?? '',
      email: email ?? '',
      name: name ?? '',
      description,
    };
  }

  save(): Promise<SavedApplication> {
    throw new Error('This method is not allowed when usgin a application enviroment setup');
  }

  async getByEmail(): Promise<SavedApplication | undefined> {
    return await this.get();
  }

  async get(): Promise<SavedApplication | undefined> {
    const savedProfiles = await this.profileRepository.list();
    const profiles = savedProfiles.items.map((profile) => profile.id);
    return {
      ...this.application,
      profiles,
    };
  }

  remove(): Promise<void> {
    throw new Error('This method is not allowed when usgin a application enviroment setup');
  }

  update(): Promise<SavedApplication> {
    throw new Error('This method is not allowed when usgin a application enviroment setup');
  }
}
