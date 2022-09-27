import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { tagsStore } from "../../stores";
import { Tag } from "../../types/tags";

type TagItemProps = Readonly<{
  item: Tag;
}>;

export function TagItem({ item }: TagItemProps) {
  const onSelectTag = () => {
    const activeTag = tagsStore.getActiveTag();

    if (activeTag === item) {
      tagsStore.setActiveTag(undefined);
    } else {
      tagsStore.setActiveTag(item);
    }
  };

  return (
    <View style={styles.item}>
      <Text style={styles.text} onPress={onSelectTag}>
        {item}
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
});
