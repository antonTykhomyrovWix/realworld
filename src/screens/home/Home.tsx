import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, screenName } from "../../navigation";
import { TagsList } from "../../components/tags-list";
import { FeedToggle } from "../../components/feed-toggle";
import { ArticlesList } from "../../components/articles-list";

type HomeProps = NativeStackScreenProps<RootStackParamList, screenName.home>;

export function Home({ navigation }: HomeProps) {
  const goToArticle = useCallback(
    (articleSlug: string) =>
      navigation.navigate(screenName.article, { articleSlug }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <TagsList />
      <FeedToggle />
      <ArticlesList goToArticle={goToArticle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
});
