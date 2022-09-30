import React from "react";
import { View, StyleSheet } from "react-native";
import { useConnect } from "remx";

import { Article } from "../../types";
import { FollowProfile } from "../follow-profile";
import { userStore } from "../../stores";
import { ArticleActionsEdit } from "./ArticleActionsEdit";
import { ArticleActionsDelete } from "./ArticleActionsDelete";

type ArticleActionsProps = Readonly<{
  article: Article;
}>;

export function ArticleActions({ article }: ArticleActionsProps) {
  const { author } = article;
  const { currentUser } = useConnect(userStore.getCurrentUser);

  return (
    <View>
      {currentUser?.username === author.username ? (
        <View style={styles.userActions}>
          <ArticleActionsDelete article={article} />
          <ArticleActionsEdit article={article} />
        </View>
      ) : (
        <FollowProfile
          username={author.username}
          following={author.following}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userActions: {
    flex: 1,
    flexDirection: "row",
  },
});
