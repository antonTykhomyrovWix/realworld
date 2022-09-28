export const enum FeedType {
  Your,
  Global,
  Tag,
}

export type Feed = Readonly<{
  type: FeedType;
}>;
