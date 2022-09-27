import React, { useCallback } from "react";
import { Button, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, screenName } from "../../navigation";
import { TagsList } from "../../components/tags-list";
import { FeedToggle } from "../../components/feed-toggle";

type HomeProps = NativeStackScreenProps<RootStackParamList, screenName.home>;

export function Home({ navigation }: HomeProps) {
  const goToArticle = useCallback(
    () => navigation.navigate(screenName.article, { articleId: "123" }),
    [navigation]
  );

  return (
    <View>
      <TagsList />
      <FeedToggle />
      <Button title="Open Article Page" onPress={goToArticle} />
    </View>
  );
}
