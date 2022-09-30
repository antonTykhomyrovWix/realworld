import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { Article } from "../../types";
import { ArticleMetaInfo } from "../article-meta-info";
import { ArticleFooter } from "./ArticleFooter";

type ArticleItemProps = Readonly<{
  article: Article;
}>;

export function ArticleItem({ article }: ArticleItemProps) {
  const navigation = useNavigation<NavigationPropRootStack>();
  const { title, description, slug } = article;

  const goToArticle = useCallback(
    () => navigation.navigate(ScreenName.Article, { articleSlug: slug }),
    [navigation, slug]
  );

  return (
    <View style={styles.container}>
      <ArticleMetaInfo article={article} showActions={false} />
      <View>
        <Text style={styles.title} onPress={goToArticle}>
          {title}
        </Text>
        <Text style={styles.description} onPress={goToArticle}>
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
