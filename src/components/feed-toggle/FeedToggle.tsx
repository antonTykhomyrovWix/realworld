import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";

import { Tag, User, FeedType } from "../../types";
import { assertUnreachable } from "../../utils";
import { FeedItem } from "./FeedItem";

type FeedToggleProps = Readonly<{
  feeds: ReadonlyArray<FeedType>;
  activeFeed: FeedType;
  selectFeed: (feed: FeedType) => void;
  currentUser: User | undefined;
  activeTag?: Tag | undefined;
}>;

export function FeedToggle({
  feeds,
  activeFeed,
  selectFeed,
  currentUser,
  activeTag,
}: FeedToggleProps) {
  const onSelectFeed = useCallback(
    (feed: FeedType) => selectFeed(feed),
    [selectFeed]
  );

  return (
    <FlatList
      style={styles.container}
      data={feeds}
      renderItem={({ item }) => (
        <FeedItem
          title={getTitle(item, activeTag)}
          isHidden={getIsHidden(item, activeFeed, currentUser)}
          isActive={activeFeed === item}
          onSelectFeed={() => onSelectFeed(item)}
        />
      )}
      keyExtractor={(item) => item.toString()}
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
    case FeedType.Profile:
      return "My Articles";
    case FeedType.Favorite:
      return "Favorite Articles";
    case FeedType.Tag:
      return `#${activeTag ?? ""}`;
    default:
      assertUnreachable(type);
  }
}

function getIsHidden(
  type: FeedType,
  activeFeed: FeedType,
  currentUser?: User
): boolean {
  switch (type) {
    case FeedType.Global:
    case FeedType.Profile:
    case FeedType.Favorite:
      return false;
    case FeedType.Your:
      return currentUser === undefined;
    case FeedType.Tag:
      // show Tag feed only when it is active
      return activeFeed !== FeedType.Tag;
    default:
      assertUnreachable(type);
  }
}
