import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useConnect } from "remx";

import { feedStore, FeedType, tagsStore, userStore } from "../../stores";
import { Article } from "../../types/articles";
import { articlesService } from "../../services";
import { User } from "../../types";
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
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      console.log("!!! fetchArticles", activeFeed, activeTag);
      const newArticles =
        activeFeed === FeedType.Your
          ? await articlesService.getUserFeedArticles(currentUser?.token)
          : await articlesService.getArticles(currentUser?.token, activeTag);

      console.log("!!! newArticles", newArticles);
      setArticles(newArticles);
      setLoading(false);
    };

    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
