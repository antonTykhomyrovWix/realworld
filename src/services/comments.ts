import { Comment } from "../types";
import { RestAPI } from "./restAPI";

type CommentsResponse = Readonly<{
  comments?: ReadonlyArray<Comment>;
}>;

type CommentResponse = Readonly<{
  comment?: Comment;
}>;

const COMMENT_API_PATH = "/articles";

class CommentsService extends RestAPI {
  protected alertErrorTitle = "Comment Service Error";

  async getComments(slug: string): Promise<ReadonlyArray<Comment> | undefined> {
    const response = await this.get<CommentsResponse>(
      `${COMMENT_API_PATH}/${slug}/comments`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't fetch comments`);
      return undefined;
    }

    return response.comments;
  }

  async postComment(
    slug: string,
    commentBody: string
  ): Promise<Comment | undefined> {
    const comment = {
      body: commentBody,
    };
    const response = await this.post<CommentResponse>(
      `${COMMENT_API_PATH}/${slug}/comments`,
      { comment }
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't post comment`);
      return undefined;
    }

    return response.comment;
  }

  async removeComment(slug: string, id: number): Promise<boolean> {
    const response = await this.delete<undefined>(
      `${COMMENT_API_PATH}/${slug}/comments/${id}`
    );

    if (response instanceof Error) {
      this.showErrorAlert(response, `Can't post comment`);
      return false;
    }

    return true;
  }
}

export const commentsService = new CommentsService();
