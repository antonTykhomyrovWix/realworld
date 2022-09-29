import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/src/types";
import { useConnect } from "remx";

import { ScreenName } from "../../navigation";
import { userStore } from "../../stores";

type UserPanelProps = Readonly<{
  navigation: NativeStackNavigationProp<ParamListBase>;
}>;

export function UserPanel({ navigation }: UserPanelProps) {
  const { currentUser } = useConnect(userStore.getCurrentUser);

  const goToSignIn = useCallback(
    () => navigation.navigate(ScreenName.SignIn),
    [navigation]
  );

  const goToProfile = useCallback(() => {
    const username = currentUser!.username;
    navigation.navigate(ScreenName.Profile, { username });
  }, [currentUser, navigation]);

  return (
    <View>
      {currentUser ? (
        <Text onPress={goToProfile}>{currentUser.username}</Text>
      ) : (
        <Text onPress={goToSignIn}>Sign In</Text>
      )}
    </View>
  );
}
