import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, screenName } from "../../navigation";
import { commonStyles } from "../../style-sheets";
import { articlesService } from "../../services";
import { Article as ArticleType } from "../../types/articles";
import { ArticleMetaInfo } from "../../components/article-meta-info";
import { TagsList } from "../../components/tags-list";

type ArticleProps = NativeStackScreenProps<
  RootStackParamList,
  screenName.article
>;

export function Article({ route }: ArticleProps) {
  const [article, setArticle] = useState<ArticleType | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const fetchedArticle = await articlesService.getArticle(
        route.params.articleSlug
      );

      setArticle(fetchedArticle);
      setLoading(false);
    };

    fetchArticle();
  }, [route.params.articleSlug]);

  if (loading || !article) {
    return (
      <View style={commonStyles.flexCenter}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <ArticleMetaInfo article={article} />
      </View>
      <View style={styles.bodyContainer}>
        <Text>{article.body}</Text>
      </View>
      <View style={styles.tagsContainer}>
        <TagsList tags={article.tagList} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  title: {
    marginBottom: 12,
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  bodyContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tagsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
});
