import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useConnect } from "remx";

import { RootStackParamList, screenName } from "../../navigation";
import { TagsList } from "../../components/tags-list";
import { FeedToggle } from "../../components/feed-toggle";
import { ArticlesList } from "../../components/articles-list";
import { tagsStore } from "../../stores";
import { tagsService } from "../../services";
import { Tag } from "../../types";

type HomeProps = NativeStackScreenProps<RootStackParamList, screenName.home>;

export function Home({ navigation }: HomeProps) {
  const isTagsLoading = useConnect(tagsStore.getLoading);
  const tags = useConnect(tagsStore.getTags);
  // TODO:useConnect type error
  // @ts-ignore
  const activeTag = useConnect<string | undefined, []>(tagsStore.getActiveTag);

  useEffect(() => {
    const fetchTags = async () => {
      tagsStore.setLoading(true);
      const newTags = await tagsService.getTags();

      if (newTags) {
        tagsStore.setTags(newTags);
      }

      tagsStore.setLoading(false);
    };

    fetchTags();
  }, []);

  const onTagClick = useCallback(
    (tag: Tag) => {
      if (activeTag === tag) {
        tagsStore.setActiveTag(undefined);
      } else {
        tagsStore.setActiveTag(tag);
      }
    },
    [activeTag]
  );

  const goToArticle = useCallback(
    (articleSlug: string) =>
      navigation.navigate(screenName.article, { articleSlug }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {isTagsLoading ? (
          <ActivityIndicator />
        ) : (
          <TagsList tags={tags} onTagClick={onTagClick} activeTag={activeTag} />
        )}
      </View>

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
  tagsContainer: {
    height: 34,
    justifyContent: "center",
  },
});
