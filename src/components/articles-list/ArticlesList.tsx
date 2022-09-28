import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useConnect } from "remx";

import { feedStore, FeedType, tagsStore } from "../../stores";
import { Article } from "../../types";
import { articlesService } from "../../services";
import { ArticleItem } from "./ArticleItem";
import { commonStyles } from "../../style-sheets";

type ArticlesListProps = Readonly<{
  goToArticle: (articleSlug: string) => void;
}>;

export function ArticlesList({ goToArticle }: ArticlesListProps) {
  const [articles, setArticles] = useState<ReadonlyArray<Article>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // TODO:useConnect type error
  // @ts-ignore
  const activeFeed = useConnect<FeedType | undefined, []>(
    feedStore.getActiveFeed
  );
  // @ts-ignore
  const activeTag = useConnect<string | undefined, []>(tagsStore.getActiveTag);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const newArticles =
        activeFeed === FeedType.Your
          ? await articlesService.getUserFeedArticles()
          : await articlesService.getArticles(activeTag);

      setArticles(newArticles);
      setLoading(false);
    };

    fetchArticles();
  }, [activeFeed, activeTag]);

  if (loading) {
    return (
      <View style={[commonStyles.flexCenter, styles.container]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View style={[commonStyles.flexCenter, styles.container]}>
        <Text>No articles are here... yet.</Text>
      </View>
    );
  }

  return (
    <View style={[commonStyles.flexCenter, styles.container]}>
      <FlatList
        style={styles.container}
        data={articles}
        renderItem={({ item }) => (
          <ArticleItem
            article={item}
            onSelectArticle={() => goToArticle(item.slug)}
          />
        )}
        keyExtractor={(item) => item.slug}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
  },
});
