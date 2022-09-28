import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { tagsStore } from "../../stores";
import { Tag } from "../../types/tags";

type TagItemProps = Readonly<{
  tag: Tag;
  isActive: boolean;
}>;

export function TagItem({ tag, isActive }: TagItemProps) {
  const onSelectTag = () => {
    if (isActive) {
      tagsStore.setActiveTag(undefined);
    } else {
      tagsStore.setActiveTag(tag);
    }
  };

  return (
    <View style={styles.item}>
      <Text
        style={[styles.text, isActive && styles.activeTag]}
        onPress={onSelectTag}
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
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 4,
    backgroundColor: "#818a91",
  },
  text: {
    color: "#fff",
  },
  activeTag: {
    textDecorationLine: "underline",
  },
});
