import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useConnect } from "remx";

import { TagsList } from "../../components/tags-list";
import { FeedToggle } from "../../components/feed-toggle";
import { ArticlesList, ArticleListMode } from "../../components/articles-list";
import { userStore } from "../../stores";
import { tagsService } from "../../services";
import { FeedType, Tag } from "../../types";
import { NewArticleButton } from "../../components/new-article-button";

const HOME_FEEDS = [FeedType.Your, FeedType.Global, FeedType.Tag];

export function Home() {
  const { currentUser } = useConnect(userStore.getCurrentUser);
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

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {isTagsLoading ? (
          <ActivityIndicator />
        ) : (
          tags && (
            <TagsList
              tags={tags}
              onTagClick={onTagClick}
              activeTag={activeTag}
            />
          )
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
        mode={ArticleListMode.Home}
        activeFeed={activeFeed}
        tag={activeTag}
      />
      <View style={styles.newArticleButton}>
        <NewArticleButton />
      </View>
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
  newArticleButton: {
    position: "absolute",
    right: 16,
    bottom: 32,
  },
});
