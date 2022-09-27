import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useConnect } from "remx";

import { TagItem } from "./TagItem";
import { tagsStore } from "../../stores";
import { tagsService } from "../../services/tags";

export function TagsList() {
  const isLoading = useConnect(tagsStore.getLoading);
  const tags = useConnect(tagsStore.getTags);

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
          renderItem={TagItem}
          keyExtractor={(item) => item}
          horizontal={true}
        />
      )}
    </View>
  );
}
