import React, { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { Article } from "../../types";
import { ArticleActions } from "../article-actions";
import { ArticleFavorite } from "./ArticleFavorite";

type ArticleHeaderProps = Readonly<{
  article: Article;
  showActions: boolean;
}>;

export function ArticleMetaInfo({ article, showActions }: ArticleHeaderProps) {
  const { createdAt, author } = article;
  const date = new Date(createdAt);
  const navigation = useNavigation<NavigationPropRootStack>();

  const onUsernameClick = useCallback(
    () =>
      navigation.navigate(ScreenName.Profile, {
        username: author.username,
      }),
    [navigation, author.username]
  );

  return (
    <View>
      <Image style={styles.image} source={{ uri: author.image }} />
      <Text onPress={onUsernameClick} style={styles.username}>
        {author.username}
      </Text>
      <Text style={styles.date}>{date.toLocaleDateString()}</Text>
      <View style={styles.rightActions}>
        {showActions && <ArticleActions article={article} />}
        <ArticleFavorite article={article} />
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
