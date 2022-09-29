import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useConnect } from "remx";

import { articlesStore, userStore } from "../../stores";
import { articlesService } from "../../services";
import { commonStyles } from "../../style-sheets";
import { FeedType, Tag } from "../../types";
import { ArticleItem } from "./ArticleItem";

type ArticlesListProps = Readonly<{
  activeFeed: FeedType;
  tag?: Tag | undefined;
  username?: string | undefined;
}>;

export function ArticlesList({ activeFeed, tag, username }: ArticlesListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useConnect(userStore.getCurrentUser);
  const articles = useConnect(articlesStore.getArticles);

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

      articlesStore.setArticles(newArticles ?? []);

      setLoading(false);
    };

    fetchArticles();
  }, [tag, activeFeed, currentUser, username]);

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
