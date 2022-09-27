import { API_URL, headers } from "./constants";
import { Tags } from "../types/tags";

//TODO: add try/catch
class TagsService {
  async getTags(userToken?: string): Promise<Tags | undefined> {
    if (userToken) {
      headers.set("authorization", `Token: ${userToken}`);
    } else {
      headers.delete("authorization");
    }

    const response = await fetch(`${API_URL}/tags`);
    const { tags } = await response.json();

    // assert typeguard
    return tags;
  }
}

export const tagsService = new TagsService();
