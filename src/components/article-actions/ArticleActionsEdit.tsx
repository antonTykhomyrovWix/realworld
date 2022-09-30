import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { Article } from "../../types";

type ArticleActionsEditProps = Readonly<{
  article: Article;
}>;

export function ArticleActionsEdit({ article }: ArticleActionsEditProps) {
  const navigation = useNavigation<NavigationPropRootStack>();

  const onEditClick = useCallback(
    () =>
      navigation.navigate(ScreenName.ArticleForm, {
        articleSlug: article.slug,
      }),
    [navigation, article]
  );

  return (
    <View>
      <TouchableHighlight
        style={styles.edit}
        underlayColor="#fff"
        onPress={onEditClick}
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  edit: {
    borderRadius: 4,
    marginRight: 8,
    padding: 2,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  followActive: {
    borderColor: "#adadad",
    backgroundColor: "#e6e6e6",
  },
  editText: {
    color: "#ccc",
  },
  followActiveText: {
    color: "#373a3c",
  },
});
