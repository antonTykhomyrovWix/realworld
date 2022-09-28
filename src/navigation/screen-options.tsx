import React from "react";
import { UserPanel } from "../components/user-panel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/src/types";
import { ParamListBase } from "@react-navigation/native";

type ScreenOptionsProps = Readonly<{
  navigation: NativeStackNavigationProp<ParamListBase>;
}>;

export const screenOptions = ({ navigation }: ScreenOptionsProps) => ({
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "700" as const,
  },
  headerStyle: {
    backgroundColor: "#5CB85C",
  },
  headerRight: () => <UserPanel navigation={navigation} />,
});
