export const enum InputsType {
  // User Form
  Username,
  Email,
  Password,
  Image,
  Bio,

  // Article Form,
  ArticleTitle,
  ArticleDescription,
  ArticleBody,
  ArticleTags,

  // Comments Form
  Comment,
}

export const inputsMaxLength: Record<InputsType, number> = {
  [InputsType.Username]: 12,
  [InputsType.Email]: 30,
  [InputsType.Password]: 25,
  [InputsType.Image]: 100,
  [InputsType.Bio]: 100,
  [InputsType.ArticleTitle]: 50,
  [InputsType.ArticleDescription]: 100,
  [InputsType.ArticleBody]: 5000,
  [InputsType.ArticleTags]: 60,
  [InputsType.Comment]: 200,
};
