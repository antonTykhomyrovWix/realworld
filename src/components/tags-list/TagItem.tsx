import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Tag } from "../../types";

type TagItemProps = Readonly<{
  tag: Tag;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
}>;

export function TagItem({ tag, isActive, onClick, isLast }: TagItemProps) {
  return (
    <View style={[styles.item, isLast && styles.itemLast]}>
      <Text
        style={[styles.text, isActive && styles.activeTag]}
        onPress={onClick}
      >
        {tag}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 26,
    borderRadius: 13,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginVertical: 4,
    marginLeft: 8,
    backgroundColor: "#818a91",
  },
  itemLast: {
    marginRight: 8,
  },
  text: {
    color: "#fff",
  },
  activeTag: {
    textDecorationLine: "underline",
  },
});
