import React from "react";
import { UserPanel } from "../components/user-panel";

export const screenOptions = ({ navigation }) => ({
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "700" as const,
  },
  headerStyle: {
    backgroundColor: "#5CB85C",
  },
  headerRight: () => <UserPanel navigation={navigation} />,
});
