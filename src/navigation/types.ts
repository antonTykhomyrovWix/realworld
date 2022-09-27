export const enum screenName {
  article = "Article",
  home = "Home",
  profile = "Profile",
  signIn = "SignIn",
  signUp = "SignUp",
}

export type RootStackParamList = {
  [screenName.article]: { articleId: string };
  [screenName.home]: undefined;
  [screenName.signIn]: undefined;
  [screenName.profile]: { username: string };
  [screenName.signUp]: undefined;
};

export const screenTitle: Record<screenName, string> = {
  [screenName.article]: "Article",
  [screenName.home]: "Home",
  [screenName.profile]: "Profile",
  [screenName.signIn]: "Sign In",
  [screenName.signUp]: "Sign Up",
};
