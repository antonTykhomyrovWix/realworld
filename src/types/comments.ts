import { Profile } from "./profile";

export type Comment = Readonly<{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;
}>;
