import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useConnect } from "remx";

import { feedsStore, tagsStore, userStore } from "../../stores";
import { Tag, User, FeedType, Feed } from "../../types";
import { assertUnreachable } from "../../utils";
import { FeedItem } from "./FeedItem";

export function FeedToggle() {
  // TODO:useConnect type error
  // @ts-ignore
  const activeTag = useConnect<string | undefined, []>(tagsStore.getActiveTag);
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );
  // @ts-ignore
  const activeFeed = useConnect<Feed | undefined, []>(feedsStore.getActiveFeed);
  const feeds = useConnect(feedsStore.getFeeds);

  useEffect(() => {
    const feed = feedsStore.getActiveFeed();
    if (activeTag) {
      return feedsStore.setActiveFeed({
        type: FeedType.Tag,
      });
    }

    if (feed === undefined || feed.type === FeedType.Tag) {
      feedsStore.setActiveFeed({
        type: currentUser ? FeedType.Your : FeedType.Global,
      });
    }
  }, [currentUser, activeTag]);

  const onSelectFeed = useCallback((type: FeedType) => {
    feedsStore.setActiveFeed({
      type,
    });
    // reset tag because other feed chosen
    tagsStore.setActiveTag(undefined);
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={feeds}
      renderItem={({ item: { type } }) => (
        <FeedItem
          title={getTitle(type, activeTag)}
          isHidden={getIsHidden(type, activeTag, currentUser)}
          isActive={activeFeed?.type === type}
          onSelectFeed={() => onSelectFeed(type)}
        />
      )}
      keyExtractor={(item) => item.type.toString()}
      horizontal={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
});

function getTitle(type: FeedType, activeTag?: Tag): string {
  switch (type) {
    case FeedType.Your:
      return "Your Feed";
    case FeedType.Global:
      return "Global Feed";
    case FeedType.Tag:
      return `#${activeTag}`;
    default:
      assertUnreachable(type);
  }
}

function getIsHidden(
  type: FeedType,
  activeTag?: Tag,
  currentUser?: User
): boolean {
  switch (type) {
    case FeedType.Global:
      return false;
    case FeedType.Your:
      return currentUser === undefined;
    case FeedType.Tag:
      return activeTag === undefined;
    default:
      assertUnreachable(type);
  }
}
