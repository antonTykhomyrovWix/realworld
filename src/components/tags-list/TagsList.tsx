import React from "react";
import { FlatList, View } from "react-native";

import { TagItem } from "./TagItem";
import { Tag } from "../../types";

type TagsListProps = Readonly<{
  tags: ReadonlyArray<Tag>;
  onTagClick?: (tag: Tag) => void;
  activeTag?: Tag;
}>;

export function TagsList({ tags, onTagClick, activeTag }: TagsListProps) {
  return (
    <View>
      <FlatList
        data={tags}
        renderItem={({ item, index }) => (
          <TagItem
            tag={item}
            isActive={activeTag === item}
            isLast={index === tags.length - 1}
            onClick={() => onTagClick?.(item)}
          />
        )}
        keyExtractor={(item) => item}
        horizontal={true}
      />
    </View>
  );
}
