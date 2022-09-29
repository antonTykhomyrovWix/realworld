import { NavigationProp } from "@react-navigation/core/src/types";

export const enum ScreenName {
  Article = "Article",
  Home = "Home",
  Profile = "Profile",
  SignIn = "SignIn",
  SignUp = "SignUp",
}

export type RootStackParamList = {
  [ScreenName.Article]: { articleSlug: string };
  [ScreenName.Home]: undefined;
  [ScreenName.SignIn]: undefined;
  [ScreenName.Profile]: { username: string };
  [ScreenName.SignUp]: undefined;
};

export type NavigationPropRootStack = NavigationProp<RootStackParamList>;

export const screenTitle: Record<ScreenName, string> = {
  [ScreenName.Article]: "Article",
  [ScreenName.Home]: "Home",
  [ScreenName.Profile]: "Profile",
  [ScreenName.SignIn]: "Sign In",
  [ScreenName.SignUp]: "Sign Up",
};
