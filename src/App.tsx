import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./pages/home";
import { Article } from "./pages/article";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { Profile } from "./pages/profile";
import { UserPanel } from "./components/user-panel";

const Stack = createNativeStackNavigator();

const screenOptions = ({ navigation }) => ({
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "700" as const,
  },
  headerStyle: {
    backgroundColor: "#5CB85C",
  },
  headerRight: () => <UserPanel navigation={navigation} />,
});

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Article" component={Article} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
