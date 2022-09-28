import { API_URL } from "./constants";
import { getHeaders } from "./headers";
import { Comment } from "../types";

//TODO: add try/catch
class CommentsService {
  async getComments(slug: string): Promise<ReadonlyArray<Comment> | undefined> {
    const response = await fetch(`${API_URL}/articles/${slug}/comments`, {
      headers: getHeaders(),
    });
    const { comments, errors } = await response.json();

    if (errors) {
      return [];
    }

    // assert typeguard
    return comments ?? [];
  }

  async postComment(
    slug: string,
    commentBody: string
  ): Promise<Comment | undefined> {
    const response = await fetch(`${API_URL}/articles/${slug}/comments`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        comment: {
          body: commentBody,
        },
      }),
    });
    const { comment, errors } = await response.json();

    if (errors) {
      return undefined;
    }

    // assert typeguard
    return comment;
  }
}

export const commentsService = new CommentsService();
