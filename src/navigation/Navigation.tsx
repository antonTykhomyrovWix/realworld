import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/home";
import { Article } from "../screens/article";
import { SignIn } from "../screens/sign-in";
import { SignUp } from "../screens/sign-up";
import { Profile } from "../screens/profile";
import { screenOptions } from "./screen-options";
import { ScreenName, screenTitle, RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreenName.Home}
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name={ScreenName.Home}
          component={Home}
          options={{
            title: screenTitle[ScreenName.Home],
          }}
        />
        <Stack.Screen
          name={ScreenName.Article}
          component={Article}
          options={{
            title: screenTitle[ScreenName.Article],
          }}
        />
        <Stack.Screen
          name={ScreenName.SignIn}
          component={SignIn}
          options={{
            title: screenTitle[ScreenName.SignIn],
          }}
        />
        <Stack.Screen
          name={ScreenName.SignUp}
          component={SignUp}
          options={{
            title: screenTitle[ScreenName.SignUp],
          }}
        />
        <Stack.Screen
          name={ScreenName.Profile}
          component={Profile}
          options={{
            title: screenTitle[ScreenName.Profile],
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
