import { API_URL, headers } from "./constants";
import { Article } from "../types/articles";

//TODO: add try/catch
class ArticlesService {
  async getUserFeedArticles(
    userToken?: string
  ): Promise<ReadonlyArray<Article>> {
    if (userToken) {
      headers.set("authorization", `Token: ${userToken}`);
    } else {
      headers.delete("authorization");
    }

    const response = await fetch(`${API_URL}/articles/feed`);
    const { articles, errors } = await response.json();

    if (errors) {
      return [];
    }

    // assert typeguard
    return articles;
  }
  async getArticles(
    userToken?: string,
    tag?: string
  ): Promise<ReadonlyArray<Article>> {
    if (userToken) {
      headers.set("authorization", `Token: ${userToken}`);
    } else {
      headers.delete("authorization");
    }

    let url = `${API_URL}/articles?`;

    if (tag) {
      url += `tag=${tag}&`;
    }

    const response = await fetch(url);
    const { articles, errors } = await response.json();

    if (errors) {
      return [];
    }

    // assert typeguard
    return articles;
  }
}

export const articlesService = new ArticlesService();
