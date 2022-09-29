import { Article } from "../types";
import { RestAPI } from "./restAPI";

type ArticlesQueryParameters = Readonly<{
  tag?: string;
  author?: string;
  favorited?: string;
}>;

type ArticlesResponse = Readonly<{
  articles?: ReadonlyArray<Article>;
}>;

type ArticleResponse = Readonly<{
  article?: Article;
}>;

const ARTICLES_API_PATH = "/articles";

class ArticlesService extends RestAPI {
  protected alertErrorTitle = "Articles Service Error";

  async getUserFeedArticles(): Promise<ReadonlyArray<Article> | undefined> {
    const response = await this.get<ArticlesResponse>(
      `${ARTICLES_API_PATH}/feed`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't fetch feed articles`);
      return undefined;
    }

    return response.articles;
  }

  async getArticles(
    params: ArticlesQueryParameters
  ): Promise<ReadonlyArray<Article> | undefined> {
    const query = Object.entries(params)
      .filter(([_, value]) => !!value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const response = await this.get<ArticlesResponse>(
      `${ARTICLES_API_PATH}?${query}`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't fetch articles`);
      return undefined;
    }

    return response.articles;
  }

  async getArticle(slug: string): Promise<Article | undefined> {
    const response = await this.get<ArticleResponse>(
      `${ARTICLES_API_PATH}/${slug}`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't fetch article`);
      return undefined;
    }

    return response.article;
  }
}

export const articlesService = new ArticlesService();
