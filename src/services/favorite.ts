import { Article } from "../types";
import { RestAPI } from "./restAPI";

type FavoriteResponse = Readonly<{
  article?: Article;
}>;

const FAVORITE_API_PATH = "/articles";

class FavoriteService extends RestAPI {
  protected alertErrorTitle = "Favorite Service Error";

  async favorite(slug: string): Promise<Article | undefined> {
    const response = await this.post<FavoriteResponse>(
      `${FAVORITE_API_PATH}/${slug}/favorite`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't favorite article: ${slug}`);
      return undefined;
    }

    return response.article;
  }

  async unfavorite(slug: string): Promise<Article | undefined> {
    const response = await this.delete<FavoriteResponse>(
      `${FAVORITE_API_PATH}/${slug}/favorite`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't unfavorite article: ${slug}`);
      return undefined;
    }

    return response.article;
  }
}

export const favoriteService = new FavoriteService();
