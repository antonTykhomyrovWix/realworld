import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import { Article } from "../../types/articles";

type ArticleHeaderProps = Readonly<{
  article: Article;
}>;

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const { createdAt, author, favoritesCount, favorited } = article;
  const date = new Date(createdAt);

  return (
    <View>
      <Image style={styles.image} source={{ uri: author.image }} />
      <Text style={styles.username}>{author.username}</Text>
      <Text style={styles.date}>{date.toLocaleDateString()}</Text>
      <TouchableHighlight
        style={[
          styles.favorite,
          favorited ? styles.favoriteDisabled : undefined,
        ]}
        underlayColor="#A5D9A5"
        onPress={() => console.log("Like")}
        disabled={favorited}
      >
        <Text
          style={[
            styles.favoriteView,
            favorited ? styles.favoriteViewDisabled : undefined,
          ]}
        >{`\u2665 ${favoritesCount}`}</Text>
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
  favoriteDisabled: {
    backgroundColor: "#5CB85C",
  },
  favoriteView: {
    color: "#5CB85C",
  },
  favoriteViewDisabled: {
    color: "#fff",
  },
});
