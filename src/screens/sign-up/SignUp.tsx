import React from "react";
import { Text, View, Button } from "react-native";

export function SignUp({ navigation }) {
  return (
    <View>
      <Text>Sign Up!</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate("Article")} />
    </View>
  );
}
