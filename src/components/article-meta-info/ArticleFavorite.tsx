import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useConnect } from "remx";

import { Article, User } from "../../types";
import { favoriteService } from "../../services";
import { articlesStore, userStore } from "../../stores";

type ArticleHeaderProps = Readonly<{
  article: Article;
  goToSignIn: () => void;
}>;

export function ArticleFavorite({ article, goToSignIn }: ArticleHeaderProps) {
  const { slug, favoritesCount, favorited } = article;
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
  // TODO:useConnect type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );

  const onFavoriteClick = useCallback(async () => {
    if (!currentUser) {
      return goToSignIn();
    }

    setFavoriteLoading(true);
    const updatedArticle = favorited
      ? await favoriteService.unfavorite(slug)
      : await favoriteService.favorite(slug);

    if (updatedArticle) {
      articlesStore.updateArticle(updatedArticle);
    }

    setFavoriteLoading(false);
  }, [slug, favorited, currentUser, goToSignIn]);

  return (
    <View>
      <TouchableHighlight
        style={[styles.favorite, favorited && styles.favoriteActive]}
        underlayColor="#A5D9A5"
        onPress={onFavoriteClick}
        disabled={favoriteLoading}
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
  favorite: {
    borderRadius: 4,
    padding: 2,
    borderColor: "#5CB85C",
    borderWidth: 1,
    marginRight: 8,
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
