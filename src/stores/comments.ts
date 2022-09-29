import { state, setters, getters } from "remx";

import { Comment } from "../types";

type CommentsState = {
  comments: ReadonlyArray<Comment>;
};

const initialCommentsState = {
  comments: [],
};

const commentsState = state<CommentsState>(initialCommentsState);

const commentsSetters = setters({
  setComments(comments: ReadonlyArray<Comment>) {
    commentsState.comments = comments;
  },
  removeComment(id: number) {
    commentsState.comments = commentsState.comments.filter(
      (comment) => comment.id !== id
    );
  },
  addComment(comment: Comment) {
    commentsState.comments = [...commentsState.comments, comment];
  },
});

const commentsGetters = getters({
  getComments() {
    return commentsState.comments;
  },
});

export const commentsStore = {
  ...commentsSetters,
  ...commentsGetters,
};
