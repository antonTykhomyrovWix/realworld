import React from "react";
import { View } from "react-native";

import { Comment as CommentType, User } from "../../types";
import { Comment } from "./Comment";
import { NewComment } from "./NewComment";
import { useConnect } from "remx";
import { userStore } from "../../stores";

type CommentsProps = Readonly<{
  comments: ReadonlyArray<CommentType>;
  postComment: (comment: string) => Promise<void>;
  goToProfile: (username: string) => void;
}>;

export function Comments({
  comments,
  postComment,
  goToProfile,
}: CommentsProps) {
  // TODO:useConnect type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );

  return (
    <View>
      {currentUser && <NewComment postComment={postComment} />}
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} goToProfile={goToProfile} />
      ))}
    </View>
  );
}
