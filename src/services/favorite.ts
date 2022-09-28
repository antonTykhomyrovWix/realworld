import { Article } from "../types";
import { API_URL } from "./constants";
import { getHeaders } from "./headers";

//TODO: add try/catch
class FavoriteService {
  async favorite(slug: string): Promise<Article | undefined> {
    const response = await fetch(`${API_URL}/articles/${slug}/favorite`, {
      method: "POST",
      headers: getHeaders(),
    });
    const { article, errors } = await response.json();

    if (errors) {
      return undefined;
    }

    // assert typeguard
    return article;
  }

  async unfavorite(slug: string): Promise<Article | undefined> {
    const response = await fetch(`${API_URL}/articles/${slug}/favorite`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const { article, errors } = await response.json();

    if (errors) {
      return undefined;
    }

    // assert typeguard
    return article;
  }
}

export const favoriteService = new FavoriteService();
