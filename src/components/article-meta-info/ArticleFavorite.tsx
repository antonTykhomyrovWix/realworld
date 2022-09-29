import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useConnect } from "remx";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { Article } from "../../types";
import { favoriteService } from "../../services";
import { articlesStore, userStore } from "../../stores";

type ArticleHeaderProps = Readonly<{
  article: Article;
}>;

export function ArticleFavorite({ article }: ArticleHeaderProps) {
  const navigation = useNavigation<NavigationPropRootStack>();
  const { slug, favoritesCount, favorited } = article;
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
  const { currentUser } = useConnect(userStore.getCurrentUser);

  const onFavoriteClick = useCallback(async () => {
    if (!currentUser) {
      return navigation.navigate(ScreenName.SignIn);
    }

    setFavoriteLoading(true);
    const updatedArticle = favorited
      ? await favoriteService.unfavorite(slug)
      : await favoriteService.favorite(slug);

    if (updatedArticle) {
      articlesStore.updateArticle(updatedArticle);
    }

    setFavoriteLoading(false);
  }, [slug, favorited, currentUser, navigation]);

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
