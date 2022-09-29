import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useConnect } from "remx";

import { RootStackParamList, screenName } from "../../navigation";
import { TagsList } from "../../components/tags-list";
import { FeedToggle } from "../../components/feed-toggle";
import { ArticlesList } from "../../components/articles-list";
import { userStore } from "../../stores";
import { tagsService } from "../../services";
import { FeedType, Tag, User } from "../../types";

type HomeProps = NativeStackScreenProps<RootStackParamList, screenName.home>;

const HOME_FEEDS = [FeedType.Your, FeedType.Global, FeedType.Tag];

export function Home({ navigation }: HomeProps) {
  // TODO:useConnect type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );
  const [tags, setTags] = useState<ReadonlyArray<Tag> | undefined>(undefined);
  const [isTagsLoading, setIsTagsLoading] = useState<boolean>(false);
  const [activeTag, setActiveTag] = useState<Tag | undefined>(undefined);
  const [activeFeed, setActiveFeed] = useState<FeedType>(
    currentUser ? FeedType.Your : FeedType.Global
  );

  useEffect(() => {
    const fetchTags = async () => {
      setIsTagsLoading(true);
      setTags(await tagsService.getTags());
      setIsTagsLoading(false);
    };

    fetchTags();
  }, []);

  useEffect(() => {
    // when user is logout we need to set Global feed(reset Your feed)
    if (!currentUser) {
      setActiveFeed(FeedType.Global);
    }
  }, [currentUser]);

  const onTagClick = useCallback(
    (tag: Tag) => {
      if (activeTag === tag) {
        // reset tag
        setActiveTag(undefined);
        setActiveFeed(currentUser ? FeedType.Your : FeedType.Global);
      } else {
        // set another tag
        setActiveTag(tag);
        setActiveFeed(FeedType.Tag);
      }
    },
    [currentUser, activeTag]
  );

  const selectFeed = useCallback((feed: FeedType) => {
    setActiveTag(undefined);
    setActiveFeed(feed);
  }, []);

  const goToArticle = useCallback(
    (articleSlug: string) =>
      navigation.navigate(screenName.article, { articleSlug }),
    [navigation]
  );

  const goToSignIn = useCallback(
    () => navigation.navigate(screenName.signIn),
    [navigation]
  );

  const goToProfile = useCallback(
    (username: string) => navigation.navigate(screenName.profile, { username }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {isTagsLoading || !tags ? (
          <ActivityIndicator />
        ) : (
          <TagsList tags={tags} onTagClick={onTagClick} activeTag={activeTag} />
        )}
      </View>

      <FeedToggle
        feeds={HOME_FEEDS}
        activeFeed={activeFeed}
        activeTag={activeTag}
        currentUser={currentUser}
        selectFeed={selectFeed}
      />
      <ArticlesList
        activeFeed={activeFeed}
        activeTag={activeTag}
        goToArticle={goToArticle}
        goToSignIn={goToSignIn}
        goToProfile={goToProfile}
      />
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
