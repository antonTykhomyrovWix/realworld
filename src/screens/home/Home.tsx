import React, { useCallback } from "react";
import { Text, View, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, screenName } from "../../navigation";

type HomeProps = NativeStackScreenProps<RootStackParamList, screenName.home>;

export function Home({ navigation }: HomeProps) {
  const goToArticle = useCallback(
    () => navigation.navigate(screenName.article, { articleId: "123" }),
    [navigation]
  );

  return (
    <View>
      <Text>Home!</Text>
      <Button title="Open Article Page" onPress={goToArticle} />
    </View>
  );
}
