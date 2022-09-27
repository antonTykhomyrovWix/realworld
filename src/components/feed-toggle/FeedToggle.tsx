import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useConnect } from "remx";

import { feedStore, FeedType, tagsStore, userStore } from "../../stores";
import { User } from "../../types";
import { assertUnreachable } from "../../utils";
import { Feed, FeedItem } from "./FeedItem";

export function FeedToggle() {
  const [feedList, setFeedList] = useState<ReadonlyArray<Feed>>([]);
  // TODO:useConnect type error
  // @ts-ignore
  const activeTag = useConnect<string | undefined, []>(tagsStore.getActiveTag);
  // @ts-ignore
  const currentUser = useConnect<User | undefined, []>(
    userStore.getCurrentUser
  );
  // @ts-ignore
  const activeFeed = useConnect<FeedType | undefined, []>(
    feedStore.getActiveFeed
  );
  const feedTypes = useConnect(feedStore.getFeeds);

  useEffect(() => {
    console.log("UseEffect currentUser activeTag", currentUser, activeTag);
    if (activeTag) {
      feedStore.setActiveFeed(FeedType.Tag);
    } else {
      feedStore.setActiveFeed(currentUser ? FeedType.Your : FeedType.Global);
    }
  }, [currentUser, activeTag]);

  useEffect(() => {
    const list = Array.from(feedTypes)
      .map<Feed>((type) => {
        switch (type) {
          case FeedType.Your:
            return {
              type,
              title: getFeedTitle(type),
              isHidden: !currentUser,
            };
          case FeedType.Global:
            return {
              type,
              title: getFeedTitle(type),
              isHidden: false,
            };
          case FeedType.Tag:
            return {
              type,
              title: `#${activeTag}`,
              isHidden: !activeTag,
            };
          default:
            assertUnreachable(type);
        }
      })
      .filter((feed) => feed !== undefined && !feed.isHidden);
    setFeedList(list);
  }, [feedTypes, activeTag, currentUser]);

  const onSelectFeed = useCallback((type: FeedType) => {
    feedStore.setActiveFeed(type);
    // reset tag because other feed chosen
    tagsStore.setActiveTag(undefined);
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={feedList}
      renderItem={({ item }) => (
        <FeedItem
          {...item}
          isActive={activeFeed === item.type}
          onSelectFeed={() => onSelectFeed(item.type)}
        />
      )}
      keyExtractor={(item) => item.type.toString()}
      horizontal={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
});

function getFeedTitle(type: FeedType): string {
  switch (type) {
    case FeedType.Your:
      return "Your Feed";
    case FeedType.Global:
      return "Global Feed";
    default:
      return "";
  }
}
