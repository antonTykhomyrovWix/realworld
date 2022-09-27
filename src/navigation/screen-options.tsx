import React from "react";
import { UserPanel } from "../components/user-panel";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types";

export const screenOptions = (props: NativeStackHeaderProps) => ({
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "700" as const,
  },
  headerStyle: {
    backgroundColor: "#5CB85C",
  },
  headerRight: () => <UserPanel {...props} />,
});
