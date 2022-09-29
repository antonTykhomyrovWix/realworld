import { Tag } from "../types";
import { RestAPI } from "./restAPI";

type TagsResponse = Readonly<{
  tags?: ReadonlyArray<Tag>;
}>;

const TAGS_API_PATH = "/tags";

class TagsService extends RestAPI {
  protected alertErrorTitle = "Tags Service Error";

  async getTags(): Promise<ReadonlyArray<Tag> | undefined> {
    const response = await this.get<TagsResponse>(TAGS_API_PATH);

    if (response instanceof Error) {
      this.showErrorAlert(response, "Can't fetch tags");
      return undefined;
    }

    return response.tags;
  }
}

export const tagsService = new TagsService();
