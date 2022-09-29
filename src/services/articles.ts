import { Article } from "../types";
import { API_URL } from "./constants";
import { getHeaders } from "./headers";

//TODO: add try/catch
class ArticlesService {
  async getUserFeedArticles(): Promise<ReadonlyArray<Article>> {
    const response = await fetch(`${API_URL}/articles/feed`, {
      headers: getHeaders(),
    });
    const { articles, errors } = await response.json();

    if (errors) {
      return [];
    }

    // assert typeguard
    return articles ?? [];
  }

  async getArticles(
    tag?: string,
    author?: string,
    favorited?: string
  ): Promise<ReadonlyArray<Article>> {
    let url = `${API_URL}/articles?`;

    if (tag) {
      url += `tag=${tag}&`;
    }
    if (author) {
      url += `author=${author}&`;
    }
    if (favorited) {
      url += `favorited=${favorited}&`;
    }

    const response = await fetch(url, {
      headers: getHeaders(),
    });
    const { articles, errors } = await response.json();

    if (errors) {
      return [];
    }

    // assert typeguard
    return articles;
  }

  async getArticle(slug: string): Promise<Article | undefined> {
    const response = await fetch(`${API_URL}/articles/${slug}`, {
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

export const articlesService = new ArticlesService();
