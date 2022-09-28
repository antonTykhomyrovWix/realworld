import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Article } from "../../types";

type ArticleFooterProps = Readonly<{
  article: Article;
}>;

export function ArticleFooter({ article }: ArticleFooterProps) {
  const { tagList } = article;

  return (
    <View style={styles.container}>
      <Text style={styles.readMore}>Read more...</Text>

      <View style={styles.tagList}>
        {tagList.map((tag: string, index: number) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  readMore: {
    fontSize: 12,
    color: "#bbb",
  },
  tagList: {
    display: "flex",
    flexDirection: "row",
  },
  tag: {
    paddingHorizontal: 4,
    marginLeft: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#bbb",
    color: "#bbb",
    fontSize: 12,
  },
});
