import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useConnect } from "remx";

import { TagItem } from "./TagItem";
import { tagsStore } from "../../stores";
import { tagsService } from "../../services";

export function TagsList() {
  const isLoading = useConnect(tagsStore.getLoading);
  const tags = useConnect(tagsStore.getTags);
  // TODO:useConnect type error
  // @ts-ignore
  const activeTag = useConnect<string | undefined, []>(tagsStore.getActiveTag);

  useEffect(() => {
    const fetchTags = async () => {
      tagsStore.setLoading(true);
      const newTags = await tagsService.getTags();

      if (newTags) {
        tagsStore.setTags(newTags);
      }

      tagsStore.setLoading(false);
    };

    fetchTags();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={tags}
          renderItem={({ item }) => (
            <TagItem tag={item} isActive={activeTag === item} />
          )}
          keyExtractor={(item) => item}
          horizontal={true}
        />
      )}
    </View>
  );
}
