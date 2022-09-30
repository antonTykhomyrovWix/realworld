import React, { useCallback } from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useConnect } from "remx";

import { NavigationPropRootStack, ScreenName } from "../../navigation";
import { userStore } from "../../stores";

const icon = require("./icon.png");

export function NewArticleButton() {
  const navigation = useNavigation<NavigationPropRootStack>();
  const { currentUser } = useConnect(userStore.getCurrentUser);

  const onPlusClick = useCallback(async () => {
    navigation.navigate(ScreenName.ArticleForm, {
      articleSlug: undefined,
    });
  }, [navigation]);

  if (!currentUser) {
    return null;
  }

  return (
    <View style={styles.button}>
      <TouchableHighlight underlayColor="#fff" onPress={onPlusClick}>
        <Image style={styles.image} source={icon} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    height: 50,
    width: 50,
  },
});
