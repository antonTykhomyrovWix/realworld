import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Article } from "../../types";
import { ArticleFavorite } from "./ArticleFavorite";
import { FollowAuthor } from "../follow-author";

type ArticleHeaderProps = Readonly<{
  article: Article;
  withFollowUser: boolean;
  goToSignIn: () => void;
}>;

export function ArticleMetaInfo({
  article,
  withFollowUser,
  goToSignIn,
}: ArticleHeaderProps) {
  const { createdAt, author } = article;
  const date = new Date(createdAt);

  return (
    <View>
      <Image style={styles.image} source={{ uri: author.image }} />
      <Text style={styles.username}>{author.username}</Text>
      <Text style={styles.date}>{date.toLocaleDateString()}</Text>
      <View style={styles.rightActions}>
        {withFollowUser && (
          <FollowAuthor author={author} goToSignIn={goToSignIn} />
        )}
        <ArticleFavorite article={article} goToSignIn={goToSignIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  username: {
    marginLeft: 38,
    color: "#5CB85C",
  },
  date: {
    marginLeft: 38,
    color: "#bbb",
  },
  rightActions: {
    position: "absolute",
    right: 0,
    flex: 1,
    flexDirection: "row",
  },
});
