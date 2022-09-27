import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useConnect } from "remx";

import { RootStackParamList, screenName } from "../../navigation";
import { User } from "../../types";
import { userStore } from "../../stores";

type UserPanelProps = NativeStackScreenProps<RootStackParamList>;

export function UserPanel({ navigation }: UserPanelProps) {
  // TODO:check type error
  // @ts-ignore
  const currentUser = useConnect<User | undefined>(userStore.getCurrentUser);

  const goToSignIn = useCallback(
    () => navigation.navigate(screenName.signIn),
    [navigation]
  );

  const goToProfile = useCallback(() => {
    const username = currentUser!.username;
    navigation.navigate(screenName.profile, { username });
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
