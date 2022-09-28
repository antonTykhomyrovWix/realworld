import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

import { Article, User } from "../../types";
import { favoriteService } from "../../services";
import { articlesStore, userStore } from "../../stores";
import { useConnect } from "remx";

type ArticleHeaderProps = Readonly<{
  article: Article;
}>;

export function ArticleMetaInfo({ article }: ArticleHeaderProps) {
  const { slug, createdAt, author, favoritesCount, favorited } = article;
  const date = new Date(createdAt);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
  // TODO:useConnect type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );

  const onFavoriteClick = useCallback(async () => {
    setFavoriteLoading(true);
    const updatedArticle = favorited
      ? await favoriteService.unfavorite(slug)
      : await favoriteService.favorite(slug);

    if (updatedArticle) {
      articlesStore.updateArticle(updatedArticle);
    }

    setFavoriteLoading(false);
  }, [slug, favorited]);

  return (
    <View>
      <Image style={styles.image} source={{ uri: author.image }} />
      <Text style={styles.username}>{author.username}</Text>
      <Text style={styles.date}>{date.toLocaleDateString()}</Text>
      <TouchableHighlight
        style={[styles.favorite, favorited && styles.favoriteActive]}
        underlayColor="#A5D9A5"
        onPress={onFavoriteClick}
        disabled={favoriteLoading || !currentUser}
      >
        {favoriteLoading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={[
              styles.favoriteView,
              favorited && styles.favoriteViewActive,
            ]}
          >{`\u2665 ${favoritesCount}`}</Text>
        )}
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  username: {
    marginLeft: 38,
    color: "#5CB85C",
  },
  date: {
    marginLeft: 38,
    color: "#bbb",
  },
  favorite: {
    position: "absolute",
    right: 0,
    borderRadius: 4,
    padding: 2,
    borderColor: "#5CB85C",
    borderWidth: 1,
  },
  favoriteActive: {
    backgroundColor: "#5CB85C",
  },
  favoriteView: {
    color: "#5CB85C",
  },
  favoriteViewActive: {
    color: "#fff",
  },
});
