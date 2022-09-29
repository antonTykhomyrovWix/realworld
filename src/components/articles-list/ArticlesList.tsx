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
import { FeedType, Tag, User } from "../../types";
import { ArticleItem } from "./ArticleItem";

type ArticlesListProps = Readonly<{
  activeFeed: FeedType;
  goToArticle: (articleSlug: string) => void;
  goToSignIn: () => void;
  goToProfile: (username: string) => void;
  tag?: Tag | undefined;
  username?: string | undefined;
}>;

export function ArticlesList({
  goToArticle,
  goToSignIn,
  goToProfile,
  activeFeed,
  tag,
  username,
}: ArticlesListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  // TODO:useConnect type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );
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

      if (newArticles) {
        articlesStore.setArticles(newArticles);
      }

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
        renderItem={({ item }) => (
          <ArticleItem
            article={item}
            onSelectArticle={() => goToArticle(item.slug)}
            goToSignIn={goToSignIn}
            goToProfile={goToProfile}
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
