import React, { useCallback } from "react";
import { Text, View } from "react-native";

export function UserPanel({ navigation }) {
  const user = undefined;

  const goToSignIn = useCallback(
    () => navigation.navigate("SignIn"),
    [navigation]
  );

  const goToProfile = useCallback(
    () => navigation.navigate("Profile"),
    [navigation]
  );

  return (
    <View>
      {user ? (
        <Text onPress={goToProfile}>User Avatar</Text>
      ) : (
        <Text onPress={goToSignIn}>Sign In</Text>
      )}
    </View>
  );
}
