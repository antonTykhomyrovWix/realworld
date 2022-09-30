import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Article } from "../../types";
import { articlesStore } from "../../stores";
import { articlesService } from "../../services";
import { NavigationPropRootStack } from "../../navigation";

type ArticleActionsDelete = Readonly<{
  article: Article;
}>;

export function ArticleActionsDelete({ article }: ArticleActionsDelete) {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationPropRootStack>();

  const onDeleteClick = useCallback(async () => {
    setDeleteLoading(true);
    const removed = await articlesService.deleteArticle(article.slug);
    if (removed) {
      articlesStore.deleteArticle(article.slug);
      navigation.goBack();
    }

    setDeleteLoading(false);
  }, [article.slug, navigation]);

  return (
    <View>
      <TouchableHighlight
        style={styles.delete}
        underlayColor="#B85C5C"
        onPress={onDeleteClick}
        disabled={deleteLoading}
      >
        {deleteLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.deleteText}>Delete</Text>
        )}
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  delete: {
    borderRadius: 4,
    marginRight: 8,
    padding: 2,
    borderColor: "#B85C5C",
    borderWidth: 1,
  },
  deleteText: {
    color: "#B85C5C",
  },
});
