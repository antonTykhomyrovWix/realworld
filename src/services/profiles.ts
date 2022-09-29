import { Profile } from "../types";
import { RestAPI } from "./restAPI";

type ProfileResponse = Readonly<{
  profile?: Profile;
}>;

const PROFILE_API_PATH = "/profiles";

class ProfilesService extends RestAPI {
  protected alertErrorTitle = "Profile Service Error";

  async getProfile(username: string): Promise<Profile | undefined> {
    const response = await this.get<ProfileResponse>(
      `${PROFILE_API_PATH}/${username}`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't fetch profile: ${username}`);
      return undefined;
    }

    return response.profile;
  }

  async follow(username: string): Promise<Profile | undefined> {
    const response = await this.post<ProfileResponse>(
      `${PROFILE_API_PATH}/${username}/follow`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't follow profile: ${username}`);
      return undefined;
    }

    return response.profile;
  }

  async unfollow(username: string): Promise<Profile | undefined> {
    const response = await this.delete<ProfileResponse>(
      `${PROFILE_API_PATH}/${username}/follow`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't unfollow profile: ${username}`);
      return undefined;
    }

    return response.profile;
  }
}

export const profilesService = new ProfilesService();
