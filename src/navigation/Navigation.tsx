import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/home";
import { Article } from "../screens/article";
import { SignIn } from "../screens/sign-in";
import { SignUp } from "../screens/sign-up";
import { Profile } from "../screens/profile";
import { screenOptions } from "./screen-options";
import { screenName, screenTitle, RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenName.home}
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name={screenName.home}
          component={Home}
          options={{
            title: screenTitle[screenName.home],
          }}
        />
        <Stack.Screen
          name={screenName.article}
          component={Article}
          options={{
            title: screenTitle[screenName.article],
          }}
        />
        <Stack.Screen
          name={screenName.signIn}
          component={SignIn}
          options={{
            title: screenTitle[screenName.signIn],
          }}
        />
        <Stack.Screen
          name={screenName.signUp}
          component={SignUp}
          options={{
            title: screenTitle[screenName.signUp],
          }}
        />
        <Stack.Screen
          name={screenName.profile}
          component={Profile}
          options={{
            title: screenTitle[screenName.profile],
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
