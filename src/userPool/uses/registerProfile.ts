import { Profile } from "../entities";
import { WebError } from "../entities/WebError";
import { IGroupRepository, IPolicyRepository, IProfileRepository } from "../interfaces";
import { ProfileInputPayload, ProfileOutPutPayload } from "../types";

type RegisterProfileOptions = {
  profileRepository: IProfileRepository,
  groupRepository: IGroupRepository,
  policyRepository: IPolicyRepository
}

export default async function registerProfile(payload: ProfileInputPayload, consumerId: string, options: RegisterProfileOptions): Promise<ProfileOutPutPayload> {
  const profile = new Profile(payload, consumerId)
  if(!await options.groupRepository.getById(payload.groupId, consumerId)) throw new WebError(`Group Id has not been found`, 404)
  const profileId = await options.profileRepository.insert(profile)
  return { profileId }
}