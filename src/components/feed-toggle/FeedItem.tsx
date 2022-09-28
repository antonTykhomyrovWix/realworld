import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { FeedType } from "../../stores";

export type Feed = Readonly<{
  type: FeedType;
  title: string;
  isHidden: boolean;
}>;

type FeedItemProps = Feed &
  Readonly<{
    isActive: boolean;
    onSelectFeed: () => void;
  }>;

export function FeedItem({ title, isActive, onSelectFeed }: FeedItemProps) {
  return (
    <View style={[styles.item, isActive && styles.activeItem]}>
      <Text
        style={[styles.text, isActive && styles.activeText]}
        onPress={onSelectFeed}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 8,
    marginTop: 8,
  },
  activeItem: {
    color: "#5CB85C",
    borderBottomWidth: 2,
    borderColor: "#5CB85C",
  },
  text: {
    color: "#aaa",
    fontSize: 18,
  },
  activeText: {
    color: "#5CB85C",
  },
});
