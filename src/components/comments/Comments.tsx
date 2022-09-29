import React, { useMemo } from "react";
import { View } from "react-native";

import { Comment as CommentType } from "../../types";
import { Comment } from "./Comment";
import { NewComment } from "./NewComment";
import { useConnect } from "remx";
import { userStore } from "../../stores";

type CommentsProps = Readonly<{
  comments: ReadonlyArray<CommentType>;
  postComment: (comment: string) => Promise<void>;
}>;

export function Comments({ comments, postComment }: CommentsProps) {
  const { currentUser } = useConnect(userStore.getCurrentUser);
  const orderedComments = useMemo(
    () =>
      [...comments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [comments]
  );

  return (
    <View>
      {currentUser && <NewComment postComment={postComment} />}
      {orderedComments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </View>
  );
}
