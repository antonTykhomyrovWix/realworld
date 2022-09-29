import { API_URL } from "./constants";
import { getHeaders } from "./headers";
import { Profile } from "../types";

//TODO: add try/catch
class ProfilesService {
  async getProfile(username: string): Promise<Profile | undefined> {
    const response = await fetch(`${API_URL}/profiles/${username}`, {
      headers: getHeaders(),
    });
    const { profile, errors } = await response.json();

    if (errors) {
      return undefined;
    }

    // assert typeguard
    return profile;
  }

  async follow(username: string): Promise<Profile | undefined> {
    const response = await fetch(`${API_URL}/profiles/${username}/follow`, {
      method: "POST",
      headers: getHeaders(),
    });
    const { profile, errors } = await response.json();

    if (errors) {
      return undefined;
    }

    // assert typeguard
    return profile;
  }

  async unfollow(username: string): Promise<Profile | undefined> {
    const response = await fetch(`${API_URL}/profiles/${username}/follow`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const { profile, errors } = await response.json();

    if (errors) {
      return undefined;
    }

    // assert typeguard
    return profile;
  }
}

export const profilesService = new ProfilesService();