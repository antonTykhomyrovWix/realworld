import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useConnect } from "remx";

import { articlesStore } from "../../stores";
import { articlesService } from "../../services";
import { commonStyles } from "../../style-sheets";
import { Article, FeedType, Tag } from "../../types";
import { assertUnreachable } from "../../utils";
import { ArticleItem } from "./ArticleItem";

export const enum ArticleListMode {
  Home,
  Profile,
}

type ArticlesListProps = Readonly<{
  mode: ArticleListMode;
  activeFeed: FeedType;
  tag?: Tag | undefined;
  username?: string | undefined;
}>;

export function ArticlesList({
  mode,
  activeFeed,
  tag,
  username,
}: ArticlesListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const articles = useConnect(getArticlesByMode(mode));

  useEffect(() => {
    const fetchArticles = async () => {
      if (activeFeed === undefined) {
        return;
      }

      setLoading(true);

      const author = activeFeed === FeedType.Profile ? username : undefined;
      const favorited = activeFeed === FeedType.Favorite ? username : undefined;
      const newArticles =
        activeFeed === FeedType.Your
          ? await articlesService.getUserFeedArticles()
          : await articlesService.getArticles({
              tag,
              author,
              favorited,
            });

      setArticlesByMode(mode, newArticles);

      setLoading(false);
    };

    fetchArticles();
  }, [mode, tag, activeFeed, username]);

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
        renderItem={({ item }) => <ArticleItem article={item} />}
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

function getArticlesByMode(
  mode: ArticleListMode
): () => ReadonlyArray<Article> {
  switch (mode) {
    case ArticleListMode.Home:
      return articlesStore.getHomeArticles;
    case ArticleListMode.Profile:
      return articlesStore.getProfileArticles;
    default:
      assertUnreachable(mode);
  }
}

function setArticlesByMode(
  mode: ArticleListMode,
  articles: ReadonlyArray<Article> = []
): void {
  switch (mode) {
    case ArticleListMode.Home:
      return articlesStore.setHomeArticles(articles);
    case ArticleListMode.Profile:
      return articlesStore.setProfileArticles(articles);
    default:
      assertUnreachable(mode);
  }
}
