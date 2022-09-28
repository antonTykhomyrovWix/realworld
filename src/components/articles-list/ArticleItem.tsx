import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Article } from "../../types";
import { ArticleMetaInfo } from "../article-meta-info";
import { ArticleFooter } from "./ArticleFooter";

type ArticleItemProps = Readonly<{
  article: Article;
  onSelectArticle: () => void;
  goToSignIn: () => void;
}>;

export function ArticleItem({
  article,
  onSelectArticle,
  goToSignIn,
}: ArticleItemProps) {
  const { title, description } = article;

  return (
    <View style={styles.container}>
      <ArticleMetaInfo
        article={article}
        goToSignIn={goToSignIn}
        withFollowUser={false}
      />
      <View>
        <Text style={styles.title} onPress={onSelectArticle}>
          {title}
        </Text>
        <Text style={styles.description} onPress={onSelectArticle}>
          {description}
        </Text>
      </View>
      <ArticleFooter article={article} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginVertical: 6,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: "#999",
  },
});
