import { Tags } from "../types/tags";
import { API_URL } from "./constants";
import { getHeaders } from "./headers";

//TODO: add try/catch
class TagsService {
  async getTags(): Promise<Tags | undefined> {
    const response = await fetch(`${API_URL}/tags`, {
      headers: getHeaders(),
    });
    const { tags } = await response.json();

    // assert typeguard
    return tags ?? [];
  }
}

export const tagsService = new TagsService();
