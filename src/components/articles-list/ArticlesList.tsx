import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useConnect } from "remx";

import { feedsStore, tagsStore, articlesStore } from "../../stores";
import { articlesService } from "../../services";
import { commonStyles } from "../../style-sheets";
import { Feed, FeedType } from "../../types";
import { ArticleItem } from "./ArticleItem";

type ArticlesListProps = Readonly<{
  goToArticle: (articleSlug: string) => void;
  goToSignIn: () => void;
}>;

export function ArticlesList({ goToArticle, goToSignIn }: ArticlesListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  // TODO:useConnect type error
  // @ts-ignore
  const activeFeed = useConnect<Feed | undefined, []>(feedsStore.getActiveFeed);
  const articles = useConnect(articlesStore.getArticles);

  useEffect(() => {
    const fetchArticles = async () => {
      if (activeFeed === undefined) {
        return;
      }

      setLoading(true);
      const newArticles =
        activeFeed.type === FeedType.Your
          ? await articlesService.getUserFeedArticles()
          : await articlesService.getArticles(tagsStore.getActiveTag());

      articlesStore.setArticles(newArticles);
      setLoading(false);
    };

    fetchArticles();
  }, [activeFeed]);

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
            goToSignIn={goToSignIn}
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
