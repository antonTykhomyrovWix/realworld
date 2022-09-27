import React, { useCallback } from "react";
import { Button, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, screenName } from "../../navigation";
import { TagsList } from "../../components/tags-list";
import { useConnect } from "remx";
import { tagsStore } from "../../stores";

type HomeProps = NativeStackScreenProps<RootStackParamList, screenName.home>;

export function Home({ navigation }: HomeProps) {
  // TODO:useConnect type error
  // @ts-ignore
  const activeTag = useConnect<string | undefined, []>(tagsStore.getActiveTag);

  const goToArticle = useCallback(
    () => navigation.navigate(screenName.article, { articleId: "123" }),
    [navigation]
  );

  return (
    <View>
      <TagsList />
      <Text>{activeTag}</Text>
      <Button title="Open Article Page" onPress={goToArticle} />
    </View>
  );
}
