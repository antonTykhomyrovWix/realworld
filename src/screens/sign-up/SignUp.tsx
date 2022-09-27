import React, { useCallback } from "react";
import { Text, View, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, screenName } from "../../navigation";

type SignUpProps = NativeStackScreenProps<
  RootStackParamList,
  screenName.signUp
>;

export function SignUp({ navigation }: SignUpProps) {
  const signUp = useCallback(() => {
    console.log("Sign Up");
    navigation.navigate(screenName.home);
  }, [navigation]);

  return (
    <View>
      <Text>Sign Up!</Text>
      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
}
